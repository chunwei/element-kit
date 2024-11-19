export interface Collection {
  id: string
  name: string
  description?: string
  imageUrl?: string
  bannerUrl?: string
  floorPrice?: number
  volumeTraded?: number
  itemCount?: number
  ownerCount?: number
  createdAt: string
  updatedAt: string
}
