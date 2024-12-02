import useSWR from 'swr'
import { useRef } from 'react'
import { RankingParams, RankingResponse } from '@/types/collection'
import { useElementKit } from './useElementKit'

export function useRanking(params: RankingParams) {
  const context = useElementKit()
  const accumulatedList = useRef<RankingResponse['data']['rankingList']>([])

  if (!context) throw new Error('ElementKitContext 未提供')

  const {
    chain = 'eth',
    level = 'L1D',
    sortType = 'Top',
    cursor,
    limit = 50
  } = params

  const queryParams: Record<string, string> = {
    chain,
    level,
    sort_type: sortType,
    limit: `${limit}`
  }

  if (cursor) {
    queryParams.cursor = cursor
  }

  const queryString = new URLSearchParams(queryParams).toString()

  const { data, error, isLoading, mutate } = useSWR<RankingResponse>(
    [`/v1/collection/ranking?${queryString}`, context.config?.apiKey],
    null,
    {
      onSuccess: (newData) => {
        if (!cursor) {
          // 重置列表
          accumulatedList.current = newData.data.rankingList
        } else {
          // 累积新数据
          accumulatedList.current = [
            ...accumulatedList.current,
            ...newData.data.rankingList
          ]
        }
      }
    }
  )

  return {
    rankingList: accumulatedList.current,
    pageInfo: data?.data?.pageInfo,
    isLoading,
    isError: error,
    mutate
  }
}
