import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { abbr } from '@/lib/address'
import { Collection } from '@/types'
import { Separator } from '@/components/ui/separator'
import { elementChains } from '@/constants/chains'
import chainIcons from '@/constants/chainIcons'
import AddressCopy from './AddressCopy'

type Props = {
  collection: Collection
}
function CollectionItem({ collection }: Props) {
  const { contracts, isVerified, name, imageUrl } = collection
  const contract = contracts?.[0] ?? {}
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20 border rounded-md my-2">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback className="rounded-md">
          {name?.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight gap-2">
        <div className="flex items-center gap-2">
          <span className="truncate font-semibold">{name}</span>
          {isVerified && (
            <img
              src="https://static.element.bid/build/img/verify-collection-b70c56f5.svg"
              alt="Verified"
            />
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4">
            {
              chainIcons[elementChains[contract.blockChain.chain]?.chainId]
                ?.color
            }
          </span>
          <span className="truncate text-xs">
            {elementChains[contract.blockChain.chain]?.title}
          </span>
          <Separator orientation="vertical" />
          <AddressCopy address={contract.address} />
        </div>
      </div>
    </div>
  )
}

export default CollectionItem
