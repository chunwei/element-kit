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
    <div className="ek-flex ek-items-center ek-space-x-4">
      <Avatar className="ek-h-20 ek-w-20 ek-border ek-rounded-md ek-my-2">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback className="ek-rounded-md">
          {name?.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="ek-grid ek-flex-1 ek-text-left ek-text-sm ek-leading-tight ek-gap-2">
        <div className="ek-flex ek-items-center ek-gap-2">
          <span className="ek-truncate ek-font-semibold">{name}</span>
          {isVerified && (
            <img
              src="https://static.element.bid/build/img/verify-collection-b70c56f5.svg"
              alt="Verified"
            />
          )}
        </div>
        <div className="ek-flex ek-items-center ek-gap-1">
          <span className="ek-w-4 ek-h-4">
            {
              chainIcons[elementChains[contract.blockChain.chain]?.chainId]
                ?.color
            }
          </span>
          <span className="ek-truncate ek-text-xs">
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
