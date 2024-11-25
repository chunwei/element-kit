import { ReactNode, ReactElement, useState, useCallback } from 'react'
import { BuyModalRenderer } from './BuyModalRenderer'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { PoweredBy } from '@/components/PowerdBy'
import NotAuthenticated from '@/components/NotAuthenticated'
import AssetItem from '@/components/AssetItem'
import KeyValueLine from '@/components/KeyValueLine'
import Price2L from '@/components/Price2L'
import { Separator } from '@/components/ui/separator'

const demoAsset = {
  name: 'Hasbulla #4751',
  imgUrl: 'https://i.nfte.ai/ia/l1/237778/7040216072890570765_1992252666.avif',
  collection: { name: 'HasbullaNFT' },
  floorPrice: {
    token: {
      symbol: 'ETH',
      icon: 'https://s.nfte.so/icon/currency/eth.svg'
    },
    price: 0.0389,
    priceUsd: 121.66
  },
  price: {
    token: {
      symbol: 'ETH',
      icon: 'https://s.nfte.so/icon/currency/eth.svg'
    },
    price: 0.0389,
    priceUsd: 121.66
  }
}

type Props = {
  trigger?: ReactNode
}
export function BuyModal({ trigger }: Props): ReactElement {
  const [showWarning, setsSowWarning] = useState(true)
  const handleConfirm = useCallback(() => {
    setsSowWarning(false)
  }, [])

  return (
    <BuyModalRenderer
      open={false}
      onConnectWallet={function (): void {
        throw new Error('Function not implemented.')
      }}
    >
      {(
        {
          /* loading, isFetchingPath  */
        }
      ) => {
        return (
          <>
            {/* <h3>BuyModal</h3>
            <div>
              {JSON.stringify({
                loading,
                isFetchingPath
              })}
            </div> */}
            <Dialog>
              <DialogTrigger asChild>
                {trigger ? trigger : <Button variant="outline">Buy Now</Button>}
              </DialogTrigger>
              {showWarning ? (
                <NotAuthenticated onConfirm={handleConfirm} />
              ) : (
                <DialogContent className="ek-themes-wrapper sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Buy</DialogTitle>
                  </DialogHeader>
                  <AssetItem asset={demoAsset} />
                  <KeyValueLine
                    k="Price"
                    v={<Price2L {...demoAsset.price} />}
                    className="items-start"
                  />
                  <Separator className="my-1" />
                  <KeyValueLine
                    k="You Pay"
                    v={<Price2L {...demoAsset.price} />}
                    className="items-start"
                  />
                  <DialogFooter>
                    <Button className="w-full" type="submit">
                      Buy
                    </Button>
                  </DialogFooter>
                  <PoweredBy />
                </DialogContent>
              )}
            </Dialog>
          </>
        )
      }}
    </BuyModalRenderer>
  )
}

BuyModal.Custom = BuyModalRenderer
