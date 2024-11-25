interface ChainInfo {
  mainnet: boolean
  chain: string
  chainId: string
  chainName: string
  chainMId: number
  title: string
  netName: string

  rpcUrlOffical: string
  explorePrefixUrlCN: string
  explorePrefixUrlEN: string

  exploreName: string
  coin: {
    primary: string
    secondary: string
  }
}
export const elementChains: Record<string, ChainInfo> = {
  // -----------------> ethereum <-----------------
  eth: {
    mainnet: true,
    chain: 'eth',
    chainId: '0x1',
    chainName: 'ethereum',
    chainMId: 1,
    title: 'Ethereum',
    netName: 'Mainnet',

    rpcUrlOffical:
      'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    explorePrefixUrlCN: 'https://cn.etherscan.com',
    explorePrefixUrlEN: 'https://etherscan.io',

    exploreName: 'Etherscan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  sepolia: {
    mainnet: false,
    chain: 'eth',
    chainId: '0xaa36a7', // 十进制：11155111
    chainName: 'sepolia',
    chainMId: 6,
    title: 'Sepolia',
    netName: 'Sepolia',

    rpcUrlOffical:
      'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    explorePrefixUrlCN: 'https://sepolia.etherscan.io',
    explorePrefixUrlEN: 'https://sepolia.etherscan.io',

    exploreName: 'Etherscan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  // -----------------> polygon <-----------------
  polygon: {
    mainnet: true,
    chain: 'polygon',
    chainId: '0x89',
    chainName: 'polygon',
    chainMId: 101,
    title: 'Polygon',
    netName: 'Polygon',

    rpcUrlOffical: 'https://polygon-rpc.com/',
    explorePrefixUrlCN: 'https://polygonscan.com',
    explorePrefixUrlEN: 'https://polygonscan.com',

    exploreName: 'Polygonscan',
    coin: {
      primary: 'matic',
      secondary: 'wmatic'
    }
  },
  mumbai: {
    mainnet: false,
    chain: 'polygon',
    chainId: '0x13881',
    chainName: 'mumbai',
    chainMId: 102,
    title: 'Mumbai',
    netName: 'Mumbai',

    rpcUrlOffical: 'https://matic-mumbai.chainstacklabs.com',
    explorePrefixUrlCN: 'https://mumbai.polygonscan.com',
    explorePrefixUrlEN: 'https://mumbai.polygonscan.com',

    exploreName: 'Polygonscan',
    coin: {
      primary: 'matic',
      secondary: 'wmatic'
    }
  },
  // -----------------> bsc <-----------------
  bsc: {
    mainnet: true,
    chain: 'bsc',
    chainId: '0x38',
    chainName: 'bsc',
    chainMId: 201,
    title: 'BNB Chain',
    netName: 'BSC',

    rpcUrlOffical: 'https://bsc-dataseed1.binance.org',
    explorePrefixUrlCN: 'https://bscscan.com',
    explorePrefixUrlEN: 'https://bscscan.com',

    exploreName: 'Bscscan',
    coin: {
      primary: 'bnb',
      secondary: 'wbnb'
    }
  },
  bsctest: {
    mainnet: false,
    chain: 'bsc',
    chainId: '0x61',
    chainName: 'bsctest',
    chainMId: 202,
    title: 'BNB Test',
    netName: 'BNB Test',

    rpcUrlOffical: 'https://data-seed-prebsc-1-s3.binance.org:8545/',
    explorePrefixUrlCN: 'https://testnet.bscscan.com',
    explorePrefixUrlEN: 'https://testnet.bscscan.com',

    exploreName: 'Bscscan',
    coin: {
      primary: 'bnb',
      secondary: 'wbnb'
    }
  },
  // -----------------> avalanche <-----------------
  avalanche: {
    mainnet: true,
    chain: 'avalanche',
    chainId: '0xa86a',
    chainName: 'avalanche',
    chainMId: 401,
    title: 'Avalanche',
    netName: 'Avalanche',

    rpcUrlOffical: 'https://api.avax.network/ext/bc/C/rpc',
    explorePrefixUrlCN: 'https://snowtrace.io',
    explorePrefixUrlEN: 'https://snowtrace.io',

    exploreName: 'Snowtrace',
    coin: {
      primary: 'avax',
      secondary: 'wavax'
    }
  },
  avalanchetest: {
    mainnet: false,
    chain: 'avalanche',
    chainId: '0xa869',
    chainName: 'avalanchetest',
    chainMId: 402,
    title: 'Avalanche Test',
    netName: 'Avalanche Test',

    rpcUrlOffical: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorePrefixUrlCN: 'https://testnet.snowtrace.io',
    explorePrefixUrlEN: 'https://testnet.snowtrace.io',

    exploreName: 'Snowtrace',
    coin: {
      primary: 'avax',
      secondary: 'wavax'
    }
  },
  // -----------------> arbitrum <-----------------
  arbitrum: {
    mainnet: true,
    chain: 'arbitrum',
    chainId: '0xa4b1',
    chainName: 'arbitrum',
    chainMId: 601,
    title: 'Arbitrum',
    netName: 'Arbitrum',

    rpcUrlOffical: 'https://arb1.arbitrum.io/rpc',
    explorePrefixUrlCN: 'https://arbiscan.io',
    explorePrefixUrlEN: 'https://arbiscan.io',

    exploreName: 'Arbiscan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  arbitrumtest: {
    mainnet: false,
    chain: 'arbitrum',
    chainId: '0x66eed',
    chainName: 'arbitrumtest',
    chainMId: 602,
    title: 'Arbitrum Goerli',
    netName: 'Arbitrum Goerli',

    rpcUrlOffical: 'https://goerli-rollup.arbitrum.io/rpc',
    explorePrefixUrlCN: 'https://goerli.arbiscan.io',
    explorePrefixUrlEN: 'https://goerli.arbiscan.io',

    exploreName: 'Arbiscan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  // -----------------> zksync <-----------------
  zksync: {
    mainnet: true,
    chain: 'zksync',
    chainId: '0x144',
    chainName: 'zksync',
    chainMId: 701,
    title: 'zkSync',
    netName: 'zksync',

    rpcUrlOffical: 'https://mainnet.era.zksync.io',
    explorePrefixUrlCN: 'https://era.zksync.network',
    explorePrefixUrlEN: 'https://era.zksync.network',

    exploreName: 'Zksync Explorer',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  zksynctest: {
    mainnet: false,
    chain: 'zksync',
    chainId: '0x118',
    chainName: 'zksynctest',
    chainMId: 702,
    title: 'zkSync Test',
    netName: 'zkSync Test',

    rpcUrlOffical: 'https://zksync2-testnet.zksync.dev',
    explorePrefixUrlCN: 'https://goerli.explorer.zksync.io',
    explorePrefixUrlEN: 'https://goerli.explorer.zksync.io',

    exploreName: 'Zksync Explorer',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  // -----------------> btc <-----------------
  btc: {
    mainnet: true,
    chain: 'btc',
    chainId: '0xbc1',
    chainName: 'btc',
    chainMId: 801,
    title: 'Bitcoin',
    netName: 'BTC',

    rpcUrlOffical: 'null',
    explorePrefixUrlCN: 'https://mempool.space',
    explorePrefixUrlEN: 'https://mempool.space',

    exploreName: 'Mempool',
    coin: {
      primary: 'btc',
      secondary: 'wbtc'
    }
  },
  btctest: {
    mainnet: false,
    chain: 'btc',
    chainId: '0xbc2',
    chainName: 'btctest',
    chainMId: 802,
    title: 'Bitcoin Test',
    netName: 'BTC Test',

    rpcUrlOffical: 'null',
    explorePrefixUrlCN: `https://mempool.space/testnet`,
    explorePrefixUrlEN: `https://mempool.space/testnet`,

    exploreName: 'Mempool',
    coin: {
      primary: 'btc',
      secondary: 'wbtc'
    }
  },
  rgbpp: {
    mainnet: true,
    chain: 'btc',
    chainId: '0xbc3',
    chainName: 'rgbpp',
    chainMId: 803,
    title: 'Bitcoin',
    netName: 'BTC',

    rpcUrlOffical: 'null',
    explorePrefixUrlCN: 'https://mempool.space',
    explorePrefixUrlEN: 'https://mempool.space',

    exploreName: 'Mempool',
    coin: {
      primary: 'btc',
      secondary: 'wbtc'
    }
  },
  rgbpptest: {
    mainnet: false,
    chain: 'btc',
    chainId: '0xbc4',
    chainName: 'rgbpptest',
    chainMId: 804,
    title: 'Bitcoin Test',
    netName: 'BTC Test',

    rpcUrlOffical: 'null',
    explorePrefixUrlCN: `https://mempool.space/testnet`,
    explorePrefixUrlEN: `https://mempool.space/testnet`,

    exploreName: 'Mempool',
    coin: {
      primary: 'btc',
      secondary: 'wbtc'
    }
  },
  // -----------------> optimism <-----------------
  optimism: {
    mainnet: true,
    chain: 'optimism',
    chainId: '0xa', // 10
    chainName: 'optimism',
    chainMId: 1501,
    title: 'Optimism',
    netName: 'optimism',

    rpcUrlOffical: 'https://optimism-mainnet.infura.io',
    explorePrefixUrlCN: 'https://optimistic.etherscan.io',
    explorePrefixUrlEN: 'https://optimistic.etherscan.io',

    exploreName: 'Optimistic Etherscan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  // -----------------> linea <-----------------
  linea: {
    mainnet: true,
    chain: 'linea',
    chainId: '0xe708', // 10
    chainName: 'linea',
    chainMId: 901,
    title: 'Linea',
    netName: 'Linea',

    rpcUrlOffical: 'https://rpc.linea.build',
    explorePrefixUrlCN: 'https://lineascan.build',
    explorePrefixUrlEN: 'https://lineascan.build',

    exploreName: 'Lineascan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  lineatest: {
    mainnet: false,
    chain: 'linea',
    chainId: '0xe705',
    chainName: 'lineatest',
    chainMId: 902,
    title: 'Linea Test',
    netName: 'Linea Test',
    rpcUrlOffical: 'https://rpc.sepolia.linea.build',
    explorePrefixUrlCN: 'https://sepolia.lineascan.build',
    explorePrefixUrlEN: 'https://sepolia.lineascan.build',
    exploreName: 'Linea Explorer',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  // -----------------> base <-----------------
  base: {
    mainnet: true,
    chain: 'base',
    chainId: '0x2105', // 10
    chainName: 'base',
    chainMId: 1201,
    title: 'Base',
    netName: 'Base',

    rpcUrlOffical: 'https://mainnet.base.org',
    explorePrefixUrlCN: 'https://basescan.org',
    explorePrefixUrlEN: 'https://basescan.org',

    exploreName: 'Basescan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  basetest: {
    mainnet: false,
    chain: 'base',
    chainId: '0x14a33',
    chainName: 'basetest',
    chainMId: 1202,
    title: 'Base Test',
    netName: 'Base Test',

    rpcUrlOffical: 'https://goerli.base.org',
    explorePrefixUrlCN: 'https://basescan.org',
    explorePrefixUrlEN: 'https://basescan.org',

    exploreName: 'Basescan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  // -----------------> opbnb <-----------------
  opbnb: {
    mainnet: true,
    chain: 'opbnb',
    chainId: '0xcc', // 10
    chainName: 'opbnb',
    chainMId: 1101,
    title: 'opBNB',
    netName: 'opBNB',

    rpcUrlOffical: 'https://opbnb-mainnet-rpc.bnbchain.org',
    explorePrefixUrlCN: 'http://mainnet.opbnbscan.com',
    explorePrefixUrlEN: 'http://mainnet.opbnbscan.com',

    exploreName: 'opBNBscan',
    coin: {
      primary: 'bnb',
      secondary: 'wbnb'
    }
  },
  // -----------------> starknet <-----------------
  starknet: {
    mainnet: true,
    chain: 'starknet',
    chainId: '0xaaee1', // '0x534e5f4d41494e',
    chainName: 'starknet',
    chainMId: 1001,
    title: 'Starknet',
    netName: 'Starknet',

    rpcUrlOffical: 'https://alpha-mainnet.starknet.io',
    explorePrefixUrlCN: 'https://starkscan.co',
    explorePrefixUrlEN: 'https://starkscan.co',

    exploreName: 'Starkscan',
    coin: {
      primary: 'eth',
      secondary: 'eth' // eth本身就是 wrapped
    }
  },
  starknettest: {
    mainnet: false,
    chain: 'starknet',
    chainId: '0xaaee2', // '0x534e5f474f45524c49',
    chainName: 'starknettest',
    chainMId: 1002,
    title: 'Starknet Goerli',
    netName: 'Starknet Goerli',

    rpcUrlOffical: 'https://alpha4.starknet.io',
    explorePrefixUrlCN: 'https://testnet.starkscan.co',
    explorePrefixUrlEN: 'https://testnet.starkscan.co',

    exploreName: 'Starkscan',
    coin: {
      primary: 'eth',
      secondary: 'eth' // eth本身就是 wrapped
    }
  },
  // -----------------> scroll <-----------------
  scroll: {
    mainnet: true,
    chain: 'scroll',
    chainId: '0x82750', // '0x534e5f4d41494e',
    chainName: 'scroll',
    chainMId: 1301,
    title: 'Scroll',
    netName: 'Scroll',

    rpcUrlOffical: 'https://rpc.scroll.io/',
    explorePrefixUrlCN: 'https://scrollscan.com',
    explorePrefixUrlEN: 'https://scrollscan.com',

    exploreName: 'Scrollscan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  // -----------------> Manta Pacific <-----------------
  manta_pacific: {
    mainnet: true,
    chain: 'manta_pacific',
    chainId: '0xa9', // '0x534e5f4d41494e',
    chainName: 'manta-pacific',
    chainMId: 1401,
    title: 'Manta Pacific',
    netName: 'Manta Pacific',

    rpcUrlOffical: 'https://pacific-rpc.manta.network/http',
    explorePrefixUrlCN: 'https://pacific-explorer.manta.network',
    explorePrefixUrlEN: 'https://pacific-explorer.manta.network',

    exploreName: 'Pacific Explorer',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  // -----------------> Manta Pacific <-----------------
  mantle: {
    mainnet: true,
    chain: 'mantle',
    chainId: '0x1388', // '5000',
    chainName: 'mantle',
    chainMId: 1601,
    title: 'Mantle',
    netName: 'Mantle',

    rpcUrlOffical: 'https://rpc.mantle.xyz',
    explorePrefixUrlCN: 'https://explorer.mantle.xyz',
    explorePrefixUrlEN: 'https://explorer.mantle.xyz',

    exploreName: 'Mantle Explorer',
    coin: {
      primary: 'mnt',
      secondary: 'wmnt'
    }
  },
  // -----------------> Manta Pacific <-----------------
  zkfair: {
    mainnet: true,
    chain: 'zkfair',
    chainId: '0xa70e', // '42766',
    chainName: 'zkfair',
    chainMId: 1701,
    title: 'ZKFair',
    netName: 'ZKFair',

    rpcUrlOffical: 'https://rpc.zkfair.io',
    explorePrefixUrlCN: 'https://scan.zkfair.io',
    explorePrefixUrlEN: 'https://scan.zkfair.io',

    exploreName: 'Zkfair Explorer',
    coin: {
      primary: 'usdc',
      secondary: 'wusdc'
    }
  },
  // -----------------> Blast Mainnet <-----------------
  blast: {
    mainnet: true,
    chain: 'blast',
    chainId: '0x13e31', // 81457
    chainName: 'blast',
    chainMId: 1801,
    title: 'Blast',
    netName: 'Blast',

    rpcUrlOffical: 'https://blast.blockpi.network/v1/rpc/public',
    explorePrefixUrlCN: 'https://blastscan.io',
    explorePrefixUrlEN: 'https://blastscan.io',

    exploreName: 'Blastscan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  // -----------------> Blast Sepolia <-----------------
  blast_testnet: {
    mainnet: true,
    chain: 'blast_testnet',
    chainId: '0xa0c71fd', // 168587773
    chainName: 'blast_testnet',
    chainMId: 1802,
    title: 'Blast Testnet',
    netName: 'Blast Testnet',

    rpcUrlOffical: 'https://sepolia.blast.io',
    explorePrefixUrlCN: 'https://testnet.blastscan.io',
    explorePrefixUrlEN: 'https://testnet.blastscan.io',

    exploreName: 'Blastscan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  merlin: {
    mainnet: true,
    chain: 'merlin',
    chainId: '0x1068',
    chainName: 'merlin',
    chainMId: 1901,
    title: 'Merlin',
    netName: 'Merlin',

    rpcUrlOffical: 'https://rpc.merlinchain.io',
    explorePrefixUrlCN: 'https://scan.merlinchain.io',
    explorePrefixUrlEN: 'https://scan.merlinchain.io',

    exploreName: 'Merlin Explorer',
    coin: {
      primary: 'btc',
      secondary: 'wbtc'
    }
  },
  mode: {
    mainnet: true,
    chain: 'mode',
    chainId: '0x868b',
    chainName: 'mode',
    chainMId: 2001,
    title: 'Mode',
    netName: 'Mode',

    rpcUrlOffical: 'https://mainnet.mode.network',
    explorePrefixUrlCN: 'https://explorer.mode.network',
    explorePrefixUrlEN: 'https://explorer.mode.network',

    exploreName: 'Mode Explorer',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  cyber: {
    mainnet: true,
    chain: 'cyber',
    chainId: '0x1d88',
    chainName: 'cyber',
    chainMId: 2101,
    title: 'Cyber',
    netName: 'Cyber',

    rpcUrlOffical: 'https://cyber.alt.technology',
    explorePrefixUrlCN: 'https://cyberscan.co',
    explorePrefixUrlEN: 'https://cyberscan.co',

    exploreName: 'Cyberscan',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  bob: {
    mainnet: true,
    chain: 'bob',
    chainId: '0xed88',
    chainName: 'bob',
    chainMId: 2201,
    title: 'BOB',
    netName: 'BOB',

    rpcUrlOffical: 'https://rpc.gobob.xyz',
    explorePrefixUrlCN: 'https://explorer.gobob.xyz',
    explorePrefixUrlEN: 'https://explorer.gobob.xyz',

    exploreName: 'Bob Explorer',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  // -----------------> Lightlink Mainnet <-----------------
  lightlink: {
    mainnet: true,
    chain: 'lightlink',
    chainId: '0x762', // 1890
    chainName: 'lightlink',
    chainMId: 2301,
    title: 'Lightlink',
    netName: 'Lightlink',

    rpcUrlOffical: 'https://endpoints.omniatech.io/v1/lightlink/phoenix/public',
    explorePrefixUrlCN: 'https://phoenix.lightlink.io',
    explorePrefixUrlEN: 'https://phoenix.lightlink.io',

    exploreName: 'Phoenix',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  },
  ckb: {
    mainnet: true,
    chain: 'ckb',
    chainId: '0xc1b',
    chainName: 'ckb',
    chainMId: 2401,
    title: 'CKB',
    netName: 'CKB',

    rpcUrlOffical: 'https://mainnet.ckbapp.dev',
    explorePrefixUrlCN: 'https://explorer.nervos.org',
    explorePrefixUrlEN: 'https://explorer.nervos.org',

    exploreName: 'Nervos Explorer',
    coin: {
      primary: 'ckb',
      secondary: 'ckb'
    }
  },
  ckbtest: {
    mainnet: true,
    chain: 'ckb',
    chainId: '0xc1c',
    chainName: 'ckbtest',
    chainMId: 2402,
    title: 'CKB Testnet',
    netName: 'CKB Testnet',

    rpcUrlOffical: 'https://testnet.ckbapp.dev',
    explorePrefixUrlCN: 'https://pudge.explorer.nervos.org',
    explorePrefixUrlEN: 'https://pudge.explorer.nervos.org',

    exploreName: 'Pudge Explorer',
    coin: {
      primary: 'ckb',
      secondary: 'ckb'
    }
  },
  // -----------------> nanon Mainnet <-----------------
  nanon: {
    mainnet: true,
    chain: 'nanon',
    chainId: '0xabc',
    chainName: 'nanon',
    chainMId: 2501,
    title: 'Nanon',
    netName: 'Nanon',
    rpcUrlOffical: 'https://rpc.nanon.network',
    explorePrefixUrlCN: 'https://explorer.nanon.network',
    explorePrefixUrlEN: 'https://explorer.nanon.network',

    exploreName: 'Nanon explorer',
    coin: {
      primary: 'eth',
      secondary: 'weth'
    }
  }
}
