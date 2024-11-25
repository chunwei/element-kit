import { WagmiProvider, createConfig, http } from 'wagmi'
import { bsc, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { useTheme } from '@/hooks/useTheme'

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, bsc],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(),
      [bsc.id]: http()
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

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme()
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider {...(theme && { mode: theme.mode as any })}>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
