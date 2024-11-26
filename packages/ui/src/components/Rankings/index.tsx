import { useCallback, useEffect, useState } from 'react'
import { useRanking } from '@/hooks/useRanking'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { RankingLevel } from '@/constants/constants'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { SweepModal } from '@/modals/sweep/SweepModal'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RankingParams } from '@/types'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { ChainSwitcher } from '../ChainSwitcher'
import CollectionImage from '../CollectionImage'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { safeLocalStorage } from '@/lib/safe-localstorage'

const levels = RankingLevel.map((level) => ({
  value: level,
  label: level
}))

const STORAGE_KEY = 'rankings_preferences'

// 从 localStorage 获取保存的参数
const getSavedPreferences = (): Partial<RankingParams> => {
  try {
    const saved = safeLocalStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return {}
  }
}

// 保存参数到 localStorage
const savePreferences = (params: Partial<RankingParams>) => {
  try {
    safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(params))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export function Rankings() {
  // 获取保存的参数，如果没有则使用默认值
  const savedPreferences = getSavedPreferences()
  const [params, setParams] = useState<RankingParams>({
    chain: savedPreferences.chain || 'eth',
    level: savedPreferences.level || 'L1D',
    sortType: savedPreferences.sortType || 'Trending',
    limit: 50,
    cursor: undefined
  })

  const [chain, setChain] = useState(savedPreferences.chain || 'eth')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const { rankingList, pageInfo, isLoading } = useRanking(params)
  const totalPages = Math.ceil(rankingList.length / pageSize)

  const currentPageData = rankingList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  // 当参数改变时保存到 localStorage
  useEffect(() => {
    const preferencesToSave = {
      chain: params.chain,
      level: params.level,
      sortType: params.sortType
    }
    savePreferences(preferencesToSave)
  }, [params.chain, params.level, params.sortType])

  const handleChainChange = useCallback((value: string) => {
    setChain(value)
    setParams((prev) => ({
      ...prev,
      chain: value as RankingParams['chain'],
      cursor: undefined // 重置 cursor
    }))
    setCurrentPage(1)
  }, [])

  const handleLevelChange = useCallback((value: string) => {
    setParams((prev) => ({
      ...prev,
      level: value as RankingParams['level'],
      cursor: undefined // 重置 cursor
    }))
    setCurrentPage(1)
  }, [])

  const handleSortByChange = useCallback((value: string) => {
    setParams((prev) => ({
      ...prev,
      sortType: value as RankingParams['sortType'],
      cursor: undefined // 重置 cursor
    }))
    setCurrentPage(1)
  }, [])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    } else if (pageInfo?.hasNextPage) {
      setParams((prev) => ({ ...prev, cursor: pageInfo.endCursor }))
      // 不重置页码，让它继续增长
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
    // 由于数据是累积的，不需要处理向前加载更多数据的情况
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label className="font-bold">Ranking</Label>
        <Select value={params.sortType} onValueChange={handleSortByChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择排序" />
          </SelectTrigger>
          <SelectContent>
            {['Top', 'Trending'].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={params.level} onValueChange={handleLevelChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择时间范围" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ChainSwitcher currentChain={chain} onChainChange={handleChainChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentPageData.map(({ collectionRank }) => {
          const { collection, statsToken } = collectionRank
          return (
            <Card key={collection.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <CollectionImage
                  collection={collection}
                  className="w-full h-full"
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8 rounded-full">
                    <AvatarImage
                      src={collection.imageUrl}
                      alt={collection.name}
                    />
                    <AvatarFallback className="rounded-md">
                      {collection.name?.substr(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {/* <img
                    src={collection.imageUrl}
                    alt={collection.name}
                    className="w-8 h-8 rounded-full"
                  /> */}
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{collection.name}</p>
                    {/* <p className="text-sm text-gray-500">排名 #{realIndex + 1}</p> */}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">底价</p>
                    <p>
                      {collectionRank.floorPrice.toFixed(4)} {statsToken.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500  text-xs">交易量</p>
                    <p>
                      {collectionRank.volume.toFixed(2)} {statsToken.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500  text-xs">持有人数</p>
                    <p>{collectionRank.ownerCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500  text-xs">变化</p>
                    <p
                      className={
                        collectionRank.volumeRatio > 0
                          ? 'text-green-500'
                          : 'text-red-500'
                      }
                    >
                      {collectionRank.volumeRatio > 0 ? '+' : ''}
                      {collectionRank.volumeRatio.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <SweepModal
                  trigger={<Button className="w-full">Sweep</Button>}
                  contractAddress={collection.contracts?.[0]?.address}
                  chain={collection.contracts?.[0]?.blockChain.chain}
                  collection={collection}
                />
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-end mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevPage}
                className={cn(
                  'cursor-pointer',
                  (currentPage === 1 /* && !pageInfo?.hasPreviousPage */ ||
                    isLoading) &&
                    'pointer-events-none opacity-50'
                )}
              />
            </PaginationItem>

            {[...Array(Math.ceil(rankingList.length / pageSize))].map(
              (_, index) => {
                const pageNumber = index + 1
                if (
                  pageNumber === 1 ||
                  pageNumber === Math.ceil(rankingList.length / pageSize) ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={pageNumber === currentPage}
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(pageNumber)
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                }
                if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        ...
                      </PaginationLink>
                    </PaginationItem>
                  )
                }
                return null
              }
            )}

            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className={cn(
                  'cursor-pointer',
                  ((currentPage === Math.ceil(rankingList.length / pageSize) &&
                    !pageInfo?.hasNextPage) ||
                    isLoading) &&
                    'pointer-events-none opacity-50'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {isLoading && <div className="text-center">加载中...</div>}
    </div>
  )
}
