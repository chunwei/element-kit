import type { SupportedChainName } from '@/constants/constants'

export interface EncodeOrder {
  orderId: string
  takeCount: number
  tokenId?: string
}

export interface EncodeParams {
  chain: SupportedChainName
  taker: string
  orderIdList: EncodeOrder[]
}

export interface EncodeResponse {
  code: number
  msg: string
  data: {
    to: string
    data: string
    value: string
    flags: boolean[]
  }
}
