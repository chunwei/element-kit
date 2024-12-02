import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Price from './Price'

type Props = { asset: any }
function AssetItem({ asset }: Props) {
  return (
    <div className="ek-flex ek-items-center ek-space-x-4">
      <Avatar className="ek-h-20 ek-w-20 ek-rounded-md ek-my-4">
        <AvatarImage src={asset.imgUrl} alt={asset.name} />
        <AvatarFallback className="ek-rounded-md">
          {asset.name?.substr(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="ek-grid ek-flex-1 ek-text-left ek-text-sm ek-leading-tight ek-gap-2">
        <span className="ek-truncate ek-font-semibold">{asset.name}</span>
        <span className="ek-truncate ek-text-xs">{asset.collection.name}</span>
        <span className="ek-truncate ek-flex ek-items-center ek-space-x-2">
          <span className="ek-text-muted-foreground">Floor Price</span>
          <Price {...asset.floorPrice} />
        </span>
      </div>
    </div>
  )
}

export default AssetItem
