import { ReactNode ,FC} from "react"
import { useTokens } from "../../hooks/useTokens"


type Token = NonNullable<NonNullable<ReturnType<typeof useTokens>>['data']>[0]

type ChildrenProps = {
    loading: boolean
    isFetchingPath: boolean
    tokenData?: Token
}
type Props = {
    open: boolean
    token?: string
    orderId?: string
    chainId?: number
    defaultQuantity?: number
    feesOnTopBps?: string[] | null
    feesOnTopUsd?: string[] | null
    normalizeRoyalties?: boolean
    onConnectWallet: () => void
    children: (props: ChildrenProps) => ReactNode
    // walletClient?: ReservoirWallet | WalletClient
    // executeBuyOptions?: Omit<
    //   NonNullable<BuyTokenBodyParameters>,
    //   'items' | 'feesOnTop' | 'taker'
    // >
  }

export const BuyModalRenderer: FC<Props> = ({children})=>{
    return (
        <>
          {children({
              loading: false,
              isFetchingPath: false
          })}
          </>)
} 