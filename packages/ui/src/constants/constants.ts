import type { TypeFromArrayValues } from '@/types'
export const SUPPORTED_CHAINS = [
  'eth',
  'bsc',
  'polygon',
  'avalanche',
  'arbitrum',
  'zksync',
  'linea',
  'opbnb',
  'base',
  'scroll',
  'manta_pacific',
  'optimism',
  'mantle',
  'zkfair',
  'blast',
  'mode',
  'cyber',
  'bob',
  'lightlink'
  // 'starknet',
  // 'merlin',
] as const

export type SupportedChainName = TypeFromArrayValues<typeof SUPPORTED_CHAINS>

export const RankingLevel = [
  'L5M',
  'L15M',
  'L30M',
  'L1H',
  'L3H',
  'L12H',
  'L1D',
  'L3D',
  'L7D',
  'L30D'
]

export const ChainDefaulPaymentTokens = [
  {
    chain: 'btc',
    chainId: '0xbc1',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/btc.svg',
    name: 'BTC',
    symbol: 'btc',
    decimal: 8,
    accuracy: 8,
    id: 6001
  },
  {
    chain: 'bsc',
    chainId: '0x38',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/bnb.svg',
    name: 'BNB',
    symbol: 'bnb',
    decimal: 18,
    accuracy: 6,
    id: 2079
  },
  {
    chain: 'bsc',
    chainId: '0x38',
    address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    icon: 'https://s.nfte.so/icon/currency/bnb.svg',
    name: 'WBNB',
    symbol: 'wbnb',
    decimal: 18,
    accuracy: 6,
    id: 1957
  },
  {
    chain: 'bsc',
    chainId: '0x38',
    address: '0x12bb890508c125661e03b09ec06e404bc9289040',
    icon: 'https://s.nfte.so/icon/currency/raca.svg',
    name: 'RACA',
    symbol: 'raca',
    decimal: 18,
    accuracy: 2,
    id: 2080
  },
  {
    chain: 'bsc',
    chainId: '0x38',
    address: '0x55d398326f99059ff775485246999027b3197955',
    icon: 'https://s.nfte.so/icon/currency/usdt.svg',
    name: 'USDT',
    symbol: 'usdt',
    decimal: 18,
    accuracy: 4,
    id: 1964
  },
  {
    chain: 'bsc',
    chainId: '0x38',
    address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    icon: 'https://s.nfte.so/icon/currency/busd.svg',
    name: 'BUSD',
    symbol: 'busd',
    decimal: 18,
    accuracy: 4,
    id: 1959
  },
  {
    chain: 'eth',
    chainId: '0x1',
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 4,
    id: 817
  },
  {
    chain: 'eth',
    chainId: '0x1',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 4,
    id: 1631
  },
  {
    chain: 'zksync',
    chainId: '0x144',
    address: '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 5,
    id: 5002
  },
  {
    chain: 'zksync',
    chainId: '0x144',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 5001
  },
  {
    chain: 'zksync',
    chainId: '0x144',
    address: '0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'USDC',
    symbol: 'usdc',
    decimal: 6,
    accuracy: 4,
    id: 5003
  },
  {
    chain: 'arbitrum',
    chainId: '0xa4b1',
    address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 5,
    id: 4002
  },
  {
    chain: 'arbitrum',
    chainId: '0xa4b1',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 4001
  },
  {
    chain: 'arbitrum',
    chainId: '0xa4b1',
    address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'USDC',
    symbol: 'usdc',
    decimal: 6,
    accuracy: 4,
    id: 14596
  },
  {
    chain: 'arbitrum',
    chainId: '0xa4b1',
    address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'USDC.e',
    symbol: 'usdc',
    decimal: 6,
    accuracy: 4,
    id: 4003
  },
  {
    chain: 'polygon',
    chainId: '0x89',
    address: '0x838c9634de6590b96aeadc4bc6db5c28fd17e3c2',
    icon: 'https://s.nfte.so/icon/currency/fire.svg',
    name: 'FIRE',
    symbol: 'FIRE',
    decimal: 18,
    accuracy: 4,
    id: 17822
  },
  {
    chain: 'polygon',
    chainId: '0x89',
    address: '0xbed0b9240bdbcc8e33f66d2ca650a5ef60a5bab0',
    icon: 'https://s.nfte.so/icon/currency/max.svg',
    name: 'Matr1x',
    symbol: 'max',
    decimal: 18,
    accuracy: 4,
    id: 18148
  },
  {
    chain: 'polygon',
    chainId: '0x89',
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'USDC',
    symbol: 'usdc',
    decimal: 6,
    accuracy: 4,
    id: 2082
  },
  {
    chain: 'polygon',
    chainId: '0x89',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/matic.svg',
    name: 'MATIC',
    symbol: 'matic',
    decimal: 18,
    accuracy: 4,
    id: 1956
  },
  {
    chain: 'polygon',
    chainId: '0x89',
    address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    icon: 'https://s.nfte.so/icon/currency/matic.svg',
    name: 'WMATIC',
    symbol: 'wmatic',
    decimal: 18,
    accuracy: 4,
    id: 2081
  },
  {
    chain: 'polygon',
    chainId: '0x89',
    address: '0x714db550b574b3e927af3d93e26127d15721d4c2',
    icon: 'https://s.nfte.so/icon/currency/stepn.svg',
    name: 'GMT',
    symbol: 'GMT',
    decimal: 8,
    accuracy: 4,
    id: 13383
  },
  {
    chain: 'polygon',
    chainId: '0x89',
    address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    icon: 'https://s.nfte.so/icon/currency/ethonpolygon2.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 1955
  },
  {
    chain: 'base',
    chainId: '0x2105',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 8001
  },
  {
    chain: 'base',
    chainId: '0x2105',
    address: '0x4200000000000000000000000000000000000006',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 8002
  },
  {
    chain: 'linea',
    chainId: '0xe708',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 7001
  },
  {
    chain: 'linea',
    chainId: '0xe708',
    address: '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 5,
    id: 7002
  },
  {
    chain: 'opbnb',
    chainId: '0xcc',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/bnb.svg',
    name: 'BNB',
    symbol: 'bnb',
    decimal: 18,
    accuracy: 6,
    id: 10001
  },
  {
    chain: 'opbnb',
    chainId: '0xcc',
    address: '0x4200000000000000000000000000000000000006',
    icon: 'https://s.nfte.so/icon/currency/bnb.svg',
    name: 'WBNB',
    symbol: 'wbnb',
    decimal: 18,
    accuracy: 6,
    id: 10002
  },
  {
    chain: 'avalanche',
    chainId: '0xa86a',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/avax.svg',
    name: 'AVAX',
    symbol: 'avax',
    decimal: 18,
    accuracy: 4,
    id: 3006
  },
  {
    chain: 'avalanche',
    chainId: '0xa86a',
    address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
    icon: 'https://s.nfte.so/icon/currency/avax.svg',
    name: 'WAVAX',
    symbol: 'wavax',
    decimal: 18,
    accuracy: 4,
    id: 3007
  },
  {
    chain: 'starknet',
    chainId: '0xaaee1',
    address:
      '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
    icon: 'https://s.nfte.so/icon/currency/starknet.svg',
    name: 'STRK',
    symbol: 'STRK',
    decimal: 18,
    accuracy: 2,
    id: 17608
  },
  {
    chain: 'starknet',
    chainId: '0xaaee1',
    address:
      '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 9001
  },
  {
    chain: 'starknet',
    chainId: '0xaaee1',
    address:
      '0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'USDC',
    symbol: 'usdc',
    decimal: 6,
    accuracy: 4,
    id: 9002
  },
  {
    chain: 'optimism',
    chainId: '0xa',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 15001
  },
  {
    chain: 'optimism',
    chainId: '0xa',
    address: '0x4200000000000000000000000000000000000006',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 5,
    id: 15002
  },
  {
    chain: 'optimism',
    chainId: '0xa',
    address: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'USDC',
    symbol: 'usdc',
    decimal: 6,
    accuracy: 4,
    id: 15003
  },
  {
    chain: 'manta_pacific',
    chainId: '0xa9',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 12001
  },
  {
    chain: 'manta_pacific',
    chainId: '0xa9',
    address: '0x0dc808adce2099a9f62aa87d9670745aba741746',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 5,
    id: 12002
  },
  {
    chain: 'manta_pacific',
    chainId: '0xa9',
    address: '0xb73603c5d87fa094b7314c74ace2e64d165016fb',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'USDC',
    symbol: 'usdc',
    decimal: 6,
    accuracy: 4,
    id: 12003
  },
  {
    chain: 'zkfair',
    chainId: '0xa70e',
    address: '0xd33db7ec50a98164cc865dfaa64666906d79319c',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'WUSDC',
    symbol: 'wusdc',
    decimal: 18,
    accuracy: 2,
    id: 16973
  },
  {
    chain: 'zkfair',
    chainId: '0xa70e',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'USDC',
    symbol: 'usdc',
    decimal: 18,
    accuracy: 4,
    id: 5
  },
  {
    chain: 'mantle',
    chainId: '0x1388',
    address: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 5,
    id: 16002
  },
  {
    chain: 'mantle',
    chainId: '0x1388',
    address: '0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'USDC',
    symbol: 'usdc',
    decimal: 6,
    accuracy: 4,
    id: 16003
  },
  {
    chain: 'mantle',
    chainId: '0x1388',
    address: '0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8',
    icon: 'https://s.nfte.so/icon/currency/mantle.svg',
    name: 'WMNT',
    symbol: 'wmnt',
    decimal: 18,
    accuracy: 5,
    id: 16004
  },
  {
    chain: 'mantle',
    chainId: '0x1388',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/mantle.svg',
    name: 'MNT',
    symbol: 'mnt',
    decimal: 18,
    accuracy: 5,
    id: 16001
  },
  {
    chain: 'blast',
    chainId: '0x13e31',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 4,
    id: 17597
  },
  {
    chain: 'blast',
    chainId: '0x13e31',
    address: '0x4300000000000000000000000000000000000004',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 4,
    id: 17598
  },
  {
    chain: 'blast',
    chainId: '0x13e31',
    address: '0x4300000000000000000000000000000000000003',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'USDB',
    symbol: 'usdb',
    decimal: 18,
    accuracy: 4,
    id: 17599
  },
  {
    chain: 'merlin',
    chainId: '0x1068',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/btc.svg',
    name: 'BTC',
    symbol: 'btc',
    decimal: 18,
    accuracy: 8,
    id: 17531
  },
  {
    chain: 'merlin',
    chainId: '0x1068',
    address: '0xf6d226f9dc15d9bb51182815b320d3fbe324e1ba',
    icon: 'https://s.nfte.so/icon/currency/btc.svg',
    name: 'WBTC',
    symbol: 'wbtc',
    decimal: 18,
    accuracy: 8,
    id: 17532
  },
  {
    chain: 'mode',
    chainId: '0x868b',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 17643
  },
  {
    chain: 'mode',
    chainId: '0x868b',
    address: '0x4200000000000000000000000000000000000006',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 5,
    id: 17644
  },
  {
    chain: 'mode',
    chainId: '0x868b',
    address: '0xd988097fb8612cc24eeC14542bC03424c656005f',
    icon: 'https://s.nfte.so/icon/currency/usdc.svg',
    name: 'USDC',
    symbol: 'usdc',
    decimal: 6,
    accuracy: 4,
    id: 17645
  },
  {
    chain: 'cyber',
    chainId: '0x1d88',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 17896
  },
  {
    chain: 'cyber',
    chainId: '0x1d88',
    address: '0x4200000000000000000000000000000000000006',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 5,
    id: 17897
  },
  {
    chain: 'bob',
    chainId: '0xed88',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 17978
  },
  {
    chain: 'bob',
    chainId: '0xed88',
    address: '0x4200000000000000000000000000000000000006',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 5,
    id: 17979
  },
  {
    chain: 'bob',
    chainId: '0xed88',
    address: '0x05d032ac25d322df992303dca074ee7392c117b9',
    icon: 'https://s.nfte.so/icon/currency/usdt.svg',
    name: 'USDT',
    symbol: 'usdt',
    decimal: 6,
    accuracy: 4,
    id: 17980
  },
  {
    chain: 'lightlink',
    chainId: '0x762',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/eth.svg',
    name: 'ETH',
    symbol: 'eth',
    decimal: 18,
    accuracy: 5,
    id: 18056
  },
  {
    chain: 'lightlink',
    chainId: '0x762',
    address: '0x7ebef2a4b1b09381ec5b9df8c5c6f2dbeca59c73',
    icon: 'https://s.nfte.so/icon/currency/weth.svg',
    name: 'WETH',
    symbol: 'weth',
    decimal: 18,
    accuracy: 5,
    id: 18057
  },
  {
    chain: 'ckb',
    chainId: '0xc1b',
    address: '0x0000000000000000000000000000000000000000',
    icon: 'https://s.nfte.so/icon/currency/nervos-network.svg',
    name: 'CKB',
    symbol: 'CKB',
    decimal: 8,
    accuracy: 4,
    id: 18140
  }
]
export const NativeTokenAddress = '0x0000000000000000000000000000000000000000'
export function getToken(chain: string, address: string) {
  return ChainDefaulPaymentTokens.find(
    (t) => t.chain === chain && t.address === address
  )
}
