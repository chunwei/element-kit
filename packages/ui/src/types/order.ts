export interface OrdersParams {
    chain?: string
    asset_contract_address?: string
    token_ids?: string
    sale_kind?: string
    side?: string
    maker?: string
    taker?: string
    payment_token?: string
    order_by?: 'created_date' | 'base_price'
    direction?: 'asc' | 'desc'
    listed_before?: string
    listed_after?: string
    limit?: number
    offset?: number
  }
  
  export  interface Order {
    chain: string
    chainId: string
    orderHash: string
    orderId: string
    expirationTime: number
    listingTime: number
    createTime: number
    maker: string
    taker: string
    side: number
    saleKind: number
    paymentToken: string
    quantity: string
    priceBase: number
    priceUSD: number
    price: number
    standard: string
    contractAddress: string
    tokenId: string
    schema: string
    extra: string
    exchangeData: string
  }
  
  export  interface OrdersResponse {
    code: number
    msg: string
    data: {
      orders: Order[]
    }
  }