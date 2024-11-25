
const BASE_URL = 'https://api.element.market/openapi' // 替换为实际的 baseUrl

export const createFetcher = (apiKey?: string) => {
    if(!apiKey)throw new Error('Element ApiKey 未提供')
  return async (url: string) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    })
    
    if (!res.ok) throw new Error('请求失败')
    return res.json()
  }
} 