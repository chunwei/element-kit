export interface RankingParams {
  chain: string // 链名称
  level: string // 时间范围
  sortType: string // 'Top' | 'Trending' // 排序字段
  cursor?: string // 偏移量
  limit?: number // 每页数量
}

export interface PageInfo {
  startCursor: string
  endCursor: string
  hasPreviousPage: string
  hasNextPage: string
}
export interface StatsToken {
  id: string
  name: string
  address: string
  icon: string
  symbol: string
  decimal: number
  accuracy: number
}
export interface Contract {
  blockChain: {
    chain: string
    chainId: string
  }
  address: string
  alias: string
  category: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  featuredImageUrl: string
  facebookUrl: string
  contracts: Contract[]
  isVerified: boolean
  floorPrice?: number
  volume?: number
  itemCount?: number
  ownerCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface CollectionRank {
  collectionId: number
  ownerCount: number
  assetCount: number
  totalVolume: number
  usdTotalVolume: number
  totalListingCount: number
  floorPrice: number
  usdFloorPrice: number
  floorPriceRatio: number
  saleCount: number
  saleCountRatio: number
  uniqueBuyer: number
  uniqueBuyerRatio: number
  listingsCount: number
  listingsCountRatio: number
  volume: number
  volumeRatio: number
  usdVolume: number
  avgPrice: number
  avgPriceRatio: number
  usdAvgPrice: number
  whales: number
  statsToken: StatsToken
  collection: Collection
  volumeHistory: number[]
}

export interface RankingResponse {
  code: number
  data: {
    pageInfo: PageInfo
    rankingList: {
      cursor: string
      collectionRank: CollectionRank
    }[]
  }
}
