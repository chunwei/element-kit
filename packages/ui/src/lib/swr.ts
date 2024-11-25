import { ComponentPropsWithoutRef } from 'react'
import { Cache, SWRConfig } from 'swr'
// import { version } from '../../package.json'

const BASE_URL = 'https://api.element.market/openapi'

// 处理URL
const processUrl = (resource: string): string => {
  // 如果已经是完整的URL，直接返回
  if (resource.startsWith('http://') || resource.startsWith('https://')) {
    return resource
  }

  // 确保BASE_URL末尾没有斜杠，resource开头有斜杠
  const baseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL
  const path = resource.startsWith('/') ? resource : `/${resource}`

  return `${baseUrl}${path}`
}

// 定义请求参数类型
type FetcherParams =
  | {
      url: string
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
      data?: any
      headers?: Record<string, string>
      apiKey?: string
    }
  | string[]
  | string

// 定义错误类型
class FetchError extends Error {
  status: number
  info: any

  constructor(message: string, status: number, info: any) {
    super(message)
    this.status = status
    this.info = info
  }
}

export const defaultHeaders = (apiKey?: string | null) => {
  const headers: HeadersInit = {
    // 'x-ekit-version': version,
    'Content-Type': 'application/json'
  }
  if (apiKey) {
    headers['x-api-key'] = apiKey
  }
  return headers
}

export const defaultFetcher = async (params: FetcherParams) => {
  let config: RequestInit = {}
  let resource: string
  let apiKey: string | undefined

  // 处理不同类型的参数
  if (typeof params === 'string') {
    resource = params
    config.method = 'GET'
  } else if (Array.isArray(params)) {
    resource = params[0]
    apiKey = params[1]
    config.method = 'GET'
  } else {
    resource = params.url
    config.method = params.method || 'GET'
    if (params.data) {
      config.body = JSON.stringify(params.data)
    }
    apiKey = params.apiKey
    config.headers = {
      ...defaultHeaders(apiKey),
      ...params.headers
    }
  }
  if (!config.headers) {
    config.headers = defaultHeaders(apiKey)
  }

  resource = processUrl(resource)
  try {
    const response = await fetch(resource, config)

    // 检查 deprecation 头
    const deprecation = response.headers.get('deprecation')
    if (deprecation === 'true') {
      console.warn(
        `Warning: API ${resource} is deprecated. Stability and performance may be affected.`
      )
    }

    // 解析响应
    const data = await response.json()

    // 处理错误状态
    if (!response.ok) {
      throw new FetchError(
        'An error occurred while fetching the data.',
        response.status,
        data
      )
    }

    return data
  } catch (error) {
    if (error instanceof FetchError) {
      throw error
    }

    // 处理网络错误或其他错误
    throw new FetchError('An error occurred while fetching the data.', 500, {
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

const CACHE_KEY = 'elementkit.swr.cache'
const CACHE_KEY_TTL = 'elementkit.swr.cache-TTL'

export const localStorageProvider = (): Cache<any> => {
  let map = new Map([])
  let cacheTTL: Record<string, number> = {}
  try {
    map =
      typeof window !== 'undefined'
        ? new Map(JSON.parse(localStorage.getItem(CACHE_KEY) || '[]'))
        : new Map([])
    cacheTTL =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem(CACHE_KEY_TTL) || '{}')
        : {}
    for (let key in cacheTTL) {
      const ttl: number = cacheTTL[key]
      const response = map.get(key) as any
      let purge = false

      if (Date.now() >= ttl) {
        purge = true
      } else if (
        response.value &&
        response.data &&
        response.data.some((data: any) => !data)
      ) {
        purge = true
      }

      if (purge) {
        map.delete(key)
        delete cacheTTL[key]
      }
    }
  } catch (e) {
    console.warn('Failed to rehydrate SWR cache')
  }

  //Handlers to set TTL:
  const mapSet = map.set.bind(map)
  map.set = (key: unknown, value: unknown) => {
    const url = key as string
    const coingeckoCoinsApi = '/api/v3/coins/list'
    if (url.includes(coingeckoCoinsApi)) {
      cacheTTL[url] = Date.now() + 7200000 //2hr
    } else {
      cacheTTL[url] = Date.now() + 60000 * 5 //5m
    }
    return mapSet(key, value)
  }

  // Before unloading the app, we write back all the data into `localStorage`.
  if (typeof window !== 'undefined') {
    //Allowlist of all domains or urls we want to cache locally
    window.addEventListener('beforeunload', () => {
      const cachedApis = [
        'api.coingecko.com',
        '/v1/quote/mainstream',
        '/v1/quote/batchquery',
        '/v1/market/infos'
      ]
      for (let url of map.keys()) {
        if (
          !cachedApis.some((cachedApi) => (url as string).includes(cachedApi))
        ) {
          map.delete(url)
        }
      }
      const appCache = JSON.stringify(Array.from(map.entries()))
      localStorage.setItem(CACHE_KEY_TTL, JSON.stringify(cacheTTL))
      localStorage.setItem(CACHE_KEY, appCache)
    })
  }

  // We still use the map for write & read for performance.
  return map as Cache<any>
}

export const swrDefaultOptions: ComponentPropsWithoutRef<typeof SWRConfig>['value'] = {
  revalidateOnFocus: false,
  provider: localStorageProvider,
  fetcher: defaultFetcher
}
