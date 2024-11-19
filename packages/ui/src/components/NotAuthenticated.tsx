import { ShieldAlert } from 'lucide-react'
import AssetItem from './AssetItem'
import CollectionStatsBase from './CollectionStatsBase'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { PoweredBy } from './PowerdBy'

interface Props {
  onConfirm: () => void
}

function NotAuthenticated({ onConfirm }: Props) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Not Authenticated</DialogTitle>
        <DialogDescription>
          <div className="flex items-center justify-center text-yellow-500 my-4">
            <ShieldAlert size={64} />
          </div>
          <p className="text-muted-foreground">
            The NFT you are currently purchasing belongs to a collection that
            has not been officially certified by Element. Please confirm the
            authenticity of the current collection to avoid unnecessary losses.
          </p>
        </DialogDescription>
      </DialogHeader>

      <AssetItem
        asset={{
          name: 'Hasbulla #4751',
          imgUrl:
            'https://i.nfte.ai/ia/l1/237778/7040216072890570765_1992252666.avif',
          collection: { name: 'HasbullaNFT' },
          floorPrice: {
            token: {
              symbol: 'ETH',
              icon: 'https://s.nfte.so/icon/currency/eth.svg'
            },
            price: 0.0389,
            priceUsd: 121.66
          }
        }}
      />
      <CollectionStatsBase
        {...{
          contractAddress: '0x8bc9224253e37cd221c7f510acc42cb6e734db57',
          items: 10000,
          owners: 3561,
          royalty: 1
        }}
      />
      <div className="flex items-center justify-center space-x-2 my-4">
        <Checkbox id="auth" />
        <Label
          htmlFor="auth"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Don't warn me about this collection
        </Label>
      </div>
      <DialogFooter>
        <Button className="w-full" type="submit" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogFooter>
      <PoweredBy />
    </DialogContent>
  )
}

export default NotAuthenticated
