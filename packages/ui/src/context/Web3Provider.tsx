import { WagmiProvider, createConfig, http, Config as WagmiConfig } from 'wagmi'
import {
  arbitrum,
  bsc,
  linea,
  mainnet,
  polygon,
  scroll,
  opBNB as opbnb,
  base,
  zksync,
  manta,
  zkFair,
  blast,
  mode,
  bob,
  optimism,
  mantle,
  lightlinkPhoenix,
  avalanche
} from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { useTheme } from '@/hooks/useTheme'

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [
      mainnet,
      bsc,
      polygon,
      arbitrum,
      zksync,
      linea,
      opbnb,
      base,
      scroll,
      manta,
      zkFair,
      blast,
      mode,
      bob,
      optimism,
      mantle,
      avalanche,
      lightlinkPhoenix
    ],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(),
      [bsc.id]: http(),
      [polygon.id]: http(),
      [arbitrum.id]: http(),
      [zksync.id]: http(),
      [linea.id]: http(),
      [opbnb.id]: http(),
      [base.id]: http(),
      [scroll.id]: http(),
      [manta.id]: http(),
      [zkFair.id]: http(),
      [mode.id]: http(),
      [blast.id]: http(),
      [bob.id]: http(),
      [optimism.id]: http(),
      [mantle.id]: http(),
      [avalanche.id]: http(),
      [lightlinkPhoenix.id]: http()
    },

    // Required API Keys
    walletConnectProjectId: '', // process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: 'Element Kit',

    // Optional App Info
    appDescription:
      'The largest NFT marketplace of Layer 2 network.  Buy & Sell NFTs across market, Trade to EarnElement Marketplace for',
    appUrl: 'https://element.market', // your app's url
    appIcon: 'https://static.element.bid/resource/images/favicon-180.png' // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
)

const queryClient = new QueryClient()

export const Web3Provider = ({ children, wagmiConfig }: { children: React.ReactNode, wagmiConfig?: WagmiConfig }) => {
  const { theme } = useTheme()
  return (
    <WagmiProvider config={{ ...config, ...wagmiConfig }}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider {...(theme && { mode: theme.mode as any })}>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
