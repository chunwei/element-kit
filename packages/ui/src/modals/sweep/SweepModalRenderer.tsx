import { ReactNode, FC } from 'react'
import { useTokens } from '../../hooks/useTokens'
import { useTheme } from '@/hooks/useTheme'
import { ThemeConfig } from '@/types'

type Token = NonNullable<NonNullable<ReturnType<typeof useTokens>>['data']>[0]

type ChildrenProps = {
  loading: boolean
  isFetchingPath: boolean
  tokenData?: Token
  theme?: ThemeConfig
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

export const SweepModalRenderer: FC<Props> = ({ children }) => {
  const { theme } = useTheme()
  return (
    <>
      {children({
        loading: false,
        isFetchingPath: false,
        theme
      })}
    </>
  )
}
