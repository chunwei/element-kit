import { useState, useEffect } from 'react'
import type { Collection } from '../types/collection'
import { MOCK_COLLECTIONS } from '../mocks/collections'

interface UseCollectionsOptions {
  limit?: number
  offset?: number
  sortBy?: 'floorPrice' | 'volumeTraded' | 'createdAt'
  sortDirection?: 'asc' | 'desc'
}

export function useCollections(options: UseCollectionsOptions = {}) {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refreshFlag, setRefreshFlag] = useState(0)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // 模拟 API 请求延迟
        await new Promise(resolve => setTimeout(resolve, 1000))

        let result = [...MOCK_COLLECTIONS]

        // 实现排序
        if (options.sortBy) {
          result.sort((a, b) => {
            let aValue = a[options.sortBy!]||0
            let bValue = b[options.sortBy!]||0
            if(options.sortBy==='createdAt'){
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
              return options.sortDirection === 'desc' 
                ? bValue.localeCompare(aValue)
                : aValue.localeCompare(bValue);
            }
            if (options.sortDirection === 'desc') {
              return Number(bValue) - Number(aValue);
            }
            return Number(aValue) - Number(bValue);
          })
        }

        // 实现分页
        if (options.offset !== undefined || options.limit !== undefined) {
          const start = options.offset || 0
          const end = options.limit ? start + options.limit : undefined
          result = result.slice(start, end)
        }

        setCollections(result)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch collections'))
        setIsLoading(false)
      }
    }

    fetchCollections()
  }, [options.limit, options.offset, options.sortBy, options.sortDirection, refreshFlag])

  return {
    collections,
    isLoading,
    error,
    // 添加一些实用的方法
    refresh: () => {
      setIsLoading(true)
      setError(null)
      setCollections([])
      // 触发 useEffect 重新执行
      setRefreshFlag(prev => prev + 1)  // 更新 refreshFlag
    },
    isEmpty: collections.length === 0,
    totalCount: MOCK_COLLECTIONS.length
  }
}

useCollections.displayName = 'useCollections'
