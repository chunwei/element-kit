import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Price from './Price'

type Props = { asset: any }
function AssetItem({ asset }: Props) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20 rounded-md my-4">
        <AvatarImage src={asset.imgUrl} alt={asset.name} />
        <AvatarFallback className="rounded-md">
          {asset.name?.substr(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight gap-2">
        <span className="truncate font-semibold">{asset.name}</span>
        <span className="truncate text-xs">{asset.collection.name}</span>
        <span className="truncate flex items-center space-x-2">
          <span className="text-muted-foreground">Floor Price</span>
          <Price {...asset.floorPrice} />
        </span>
      </div>
    </div>
  )
}

export default AssetItem
