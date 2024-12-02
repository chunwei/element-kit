import {
  ReactNode,
  ReactElement,
  useState,
  useEffect,
  useMemo,
  memo,
  useCallback
} from 'react'
import {
  useAccount,
  useBalance,
  useChainId,
  useConfig,
  useSendTransaction,
  useWaitForTransactionReceipt,
  type BaseError
} from 'wagmi'
import { getAccount, switchChain } from 'wagmi/actions'
// import { parseEther } from 'viem'
import { toast } from 'sonner'
import { SweepModalRenderer } from './SweepModalRenderer'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { PoweredBy } from '@/components/PowerdBy'

import KeyValueLine from '@/components/KeyValueLine'
import Price2L from '@/components/Price2L'
import { Separator } from '@/components/ui/separator'
import CollectionItem from '@/components/CollectionItem'
import { Slider } from '@/components/ui/slider'
import { useOrders } from '@/hooks/useOrders'
import { Collection } from '@/types'
import { RefreshCw } from 'lucide-react'
import {
  getToken,
  NativeTokenAddress,
  SupportedChainName
} from '@/constants/constants'
import { formatTokenAmount } from '@/lib/format'
import Spinner from '@/components/Spinner'
import { useEncode } from '@/hooks/useEncode'
import { ConnectKitButton, useModal as useConnectKitMoadl } from 'connectkit'
import Price from '@/components/Price'
import { elementChains } from '@/constants/chains'
import { formatUnits, parseUnits } from 'viem'
import AddressCopy from '@/components/AddressCopy'
import { MOCK_ORDERS } from '@/mocks/orders'
import { useTheme } from '@/hooks/useTheme'

type Props = {
  portalContainer?: HTMLElement | null
  trigger?: ReactNode
  collection: Collection
  contractAddress: string
  chain: string
  overlayClass?: string
  defaultOpen?: boolean
  dev?: boolean // 开发模式
}

// 提取价格显示组件并使用 memo
const PriceDisplay = memo(
  ({
    price,
    priceUsd,
    token
  }: {
    price: number
    priceUsd: number
    token: any
  }) => (
    <Price2L
      price={formatTokenAmount(price, token?.accuracy)}
      priceUsd={formatTokenAmount(priceUsd, 2)}
      token={
        token ?? {
          symbol: 'ETH',
          icon: 'https://s.nfte.so/icon/currency/eth.svg'
        }
      }
    />
  )
)
PriceDisplay.displayName = 'PriceDisplay'

export function SweepModal({
  portalContainer,
  overlayClass,
  dev = false,
  trigger,
  collection,
  contractAddress,
  chain,
  defaultOpen = false
}: Props): ReactElement {
  const { themeWrapper } = useTheme()
  const [dialogContainer, setDialogContainer] = useState(
    portalContainer || themeWrapper
  )

  useEffect(() => {
    console.log({ portalContainer, themeWrapper })
    if (portalContainer || themeWrapper) {
      setDialogContainer(portalContainer || themeWrapper)
    }
  }, [portalContainer, themeWrapper])

  const [open, setOpen] = useState(defaultOpen)
  const [quantity, setQuantity] = useState(1)

  const {
    orders,
    isLoading: isLoadingOrders,
    mutate
  } = useOrders(
    {
      chain: chain ?? 'eth',
      limit: 30,
      asset_contract_address: contractAddress,
      side: '1'
    },
    {
      disabled: !open || dev
    }
  )
  // asset chain info
  const chainx = elementChains[chain] ?? elementChains.eth
  const config = useConfig()
  const { address } = useAccount()
  const activeWalletChainId = useChainId()
  // const { /* chains, */ switchChainAsync } = useSwitchChain()
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
    reset: resetSendTransaction
  } = useSendTransaction()

  const [hasEnoughNativeCurrency, setHasEnoughNativeCurrency] = useState(false)

  const { data: balance } = useBalance({
    address: address,
    chainId: Number(chainx.chainId),
    query: {
      enabled: open
    }
  })
  const nativeOrders = useMemo(() => {
    return (
      (dev ? MOCK_ORDERS : orders)?.filter(
        (order) => order.paymentToken === NativeTokenAddress
      ) || []
    )
  }, [orders, quantity])

  const selectedOrders = useMemo(() => {
    return nativeOrders.slice(0, quantity) || []
  }, [nativeOrders, quantity])

  const paymentToken = useMemo(
    () => getToken(chain, selectedOrders?.[0]?.paymentToken),
    [chain, selectedOrders]
  )

  const {
    encodeData,
    isLoading: isLoadingEncode,
    isError: isEncodeError
  } = useEncode(
    {
      chain: (chain ?? 'eth') as SupportedChainName,
      taker: address || '',
      orderIdList: selectedOrders.map((order) => ({
        orderId: order.orderId,
        takeCount: 1,
        tokenId: order.tokenId
      }))
    },
    {
      disabled: dev || !address || selectedOrders.length === 0
    }
  )

  // 使用 useMemo 缓存价格计算
  const { avgPrice, avgPriceUsd, totalPrice, totalPriceUsd } = useMemo(() => {
    if (!selectedOrders || selectedOrders.length === 0 || quantity <= 0) {
      return {
        avgPrice: 0,
        avgPriceUsd: 0,
        totalPrice: 0,
        totalPriceUsd: 0
      }
    }

    const total = selectedOrders.reduce(
      (acc, order) => ({
        price: acc.price + order.price,
        priceUsd: acc.priceUsd + order.priceUSD
      }),
      { price: 0, priceUsd: 0 }
    )

    return {
      avgPrice: total.price / quantity,
      avgPriceUsd: total.priceUsd / quantity,
      totalPrice: total.price,
      totalPriceUsd: total.priceUsd
    }
  }, [selectedOrders, quantity])

  useEffect(() => {
    if (totalPrice >= 0) {
      if (
        !balance?.value ||
        balance.value < parseUnits(`${totalPrice}`, paymentToken?.decimal!)
      ) {
        setHasEnoughNativeCurrency(false)
      } else {
        setHasEnoughNativeCurrency(true)
      }
    }
  }, [balance, totalPrice])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (open && !dev) {
      intervalId = setInterval(() => {
        mutate()
      }, 15000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [open, dev, mutate])

  const maxQuantity = Math.min(30, nativeOrders?.length || 1)

  const handleSliderChange = (value: number[]) => {
    setQuantity(value[0])
  }

  // reset on close
  useEffect(() => {
    if (!open) {
      setQuantity(1)
      resetSendTransaction()
      // setHasEnoughNativeCurrency(false)
    }
  }, [open])

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseInt(e.target.value)
  //   if (!isNaN(value)) {
  //     setQuantity(Math.min(Math.max(1, value), maxQuantity))
  //   }
  // }

  const handleRefresh = () => {
    mutate()
  }

  const handlePay = async () => {
    if (!encodeData || !address) {
      toast.error('Error', {
        description: 'Please connect your wallet first'
      })
      return
    }

    if (isLoadingEncode || isEncodeError) {
      toast.error('Error', {
        description: 'Failed to encode transaction data'
      })
      return
    }

    let activeWalletChain = getAccount(config).chain
    console.log({
      activeWalletChainId,
      chainxId: Number(chainx.chainId)
    })
    if (Number(chainx.chainId) !== activeWalletChain?.id) {
      activeWalletChain = await switchChain(config, {
        chainId: Number(chainx.chainId) as number
      })
    }
    console.log({
      activeWalletChainId,
      chainxId: Number(chainx.chainId)
    })
    if (Number(chainx.chainId) !== activeWalletChain?.id) {
      toast.error('Error', {
        description: 'Mismatching chainIds'
      })
      throw error
    }

    try {
      // setIsSubmitting(true)

      sendTransaction({
        account: address,
        to: encodeData.to as `0x${string}`,
        data: encodeData.data as `0x${string}`,
        value: BigInt(encodeData.value) // parseEther(encodeData.value)
      })
      // console.log({ hash })
      toast.info('Go to your wallet', {
        duration: 5000,
        description:
          "You'll be asked to sign and confirm this purchase from your wallet."
      })

      // Close modal after successful submission
      // setOpen(false)

      // Optional: Track transaction status
      // You might want to add transaction tracking logic here
    } catch (error) {
      console.error('Transaction failed:', error)
      toast.error('Transaction Failed', {
        description:
          error instanceof Error ? error.message : 'Unknown error occurred'
      })
    } finally {
      // setIsSubmitting(false)
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash
    })

  const { open: connectKitMoadlOpen } = useConnectKitMoadl()

  const handleDialogOpenChange = useCallback(
    (open: boolean) => {
      // 当connectKitMoadl 打开的情况点击overlay不关闭弹窗
      setOpen(open || connectKitMoadlOpen || dev)
    },
    [connectKitMoadlOpen]
  )

  return (
    <SweepModalRenderer
      open={open}
      onConnectWallet={function (): void {
        throw new Error('Function not implemented.')
      }}
    >
      {({}) => (
        <Dialog open={open} onOpenChange={handleDialogOpenChange} modal={!dev}>
          <DialogTrigger asChild>
            {trigger ? trigger : <Button variant="outline">Sweep</Button>}
          </DialogTrigger>

          <DialogContent
            className="ek-themes-wrapper sm:ek-max-w-[425px]"
            aria-describedby={undefined}
            portalContainer={dialogContainer}
            overlayClass={overlayClass}
          >
            <DialogHeader>
              <DialogTitle>Sweep</DialogTitle>
            </DialogHeader>
            <CollectionItem collection={collection} />

            {isLoadingOrders ? (
              <div className="ek-flex ek-flex-col ek-items-center ek-justify-center ek-pb-16 ek-gap-4">
                <Spinner size="lg" />
                <p className="ek-text-muted-foreground">Loading orders ...</p>
              </div>
            ) : !nativeOrders || nativeOrders.length === 0 ? (
              <div className="ek-flex ek-flex-col ek-items-center ek-justify-center ek-pb-16 ek-gap-4">
                <p className="ek-text-muted-foreground">
                  No orders available, please try again later.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="ek-gap-2"
                >
                  <RefreshCw className="ek-h-4 ek-w-4" />
                  Refresh
                </Button>
              </div>
            ) : (
              <>
                <div className="ek-flex ek-flex-col ek-gap-4">
                  <div className="ek-flex ek-items-center ek-justify-between">
                    <span className="ek-font-semibold ek-text-sm">
                      Quantity
                      <span className="ek-text-muted-foreground ek-text-xs ek-ml-3">
                        {isLoadingOrders
                          ? 'loading'
                          : `${maxQuantity} items avaiable`}
                      </span>
                    </span>
                    <span className="ek-font-semibold">{quantity}</span>
                  </div>
                  <div className="ek-flex ek-items-center ek-gap-4 ek-flex-1">
                    <Slider
                      value={[quantity]}
                      onValueChange={handleSliderChange}
                      min={0}
                      max={maxQuantity}
                      step={1}
                      className="ek-flex-1 ek-cursor-pointer"
                    />
                  </div>
                </div>

                {quantity > 1 && (
                  <KeyValueLine
                    k="Avg Item Price"
                    v={
                      <PriceDisplay
                        price={avgPrice}
                        priceUsd={avgPriceUsd}
                        token={paymentToken}
                      />
                    }
                    className="ek-items-start ek-text-sm"
                  />
                )}
                <Separator className="ek-my-1" />
                <KeyValueLine
                  k="Total"
                  v={
                    <PriceDisplay
                      price={totalPrice}
                      priceUsd={totalPriceUsd}
                      token={paymentToken}
                    />
                  }
                  className="ek-items-start ek-font-semibold"
                />
                <DialogFooter>
                  <div className="ek-flex ek-flex-col ek-flex-1 ek-space-y-2">
                    {!address ? (
                      // <ConnectKitButton
                      //   {...(theme && { mode: theme.mode as any })}
                      // />
                      <ConnectKitButton.Custom>
                        {({ isConnected, show }) => {
                          return (
                            <Button onClick={show} className="ek-w-full">
                              {isConnected ? address : 'Connect Wallet'}
                            </Button>
                          )
                        }}
                      </ConnectKitButton.Custom>
                    ) : hasEnoughNativeCurrency ? (
                      <Button
                        className="ek-w-full"
                        onClick={handlePay}
                        disabled={
                          !address ||
                          isPending ||
                          isLoadingEncode ||
                          isEncodeError ||
                          selectedOrders.length === 0
                        }
                      >
                        {isPending ? (
                          <div className="ek-flex ek-items-center ek-gap-2">
                            <Spinner size="sm" />
                            Submitting...
                          </div>
                        ) : (
                          'Pay'
                        )}
                      </Button>
                    ) : (
                      <div className="ek-flex ek-items-center ek-justify-between ek-text-sm">
                        <span className="ek-text-destructive ek-text-sm">
                          Insufficient Balance
                        </span>
                        {balance && (
                          <Price
                            price={formatTokenAmount(
                              formatUnits(balance.value, balance.decimals),
                              paymentToken?.accuracy
                            )}
                            token={paymentToken}
                          />
                        )}
                      </div>
                    )}
                    <div className="ek-w-full ek-text-sm">
                      {hash && (
                        <div>
                          Transaction Hash: <AddressCopy address={hash} />
                        </div>
                      )}
                      {isConfirming && <div>Waiting for confirmation...</div>}
                      {isConfirmed && <div>Transaction confirmed.</div>}
                      {error && (
                        <div className="ek-text-destructive">
                          Error:
                          {(error as BaseError).shortMessage || error.message}
                        </div>
                      )}
                    </div>
                  </div>
                </DialogFooter>
              </>
            )}
            <PoweredBy />
          </DialogContent>
        </Dialog>
      )}
    </SweepModalRenderer>
  )
}

SweepModal.Custom = SweepModalRenderer

// 如果 SweepModal 作为子组件使用，也可以将整个组件 memo 化
export default memo(SweepModal)
