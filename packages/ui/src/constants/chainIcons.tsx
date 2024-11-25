import { elementChains } from './chains'
import MainnetIconDark from '../img/chains/MainnetIconDark'
import MainnetIconLight from '../img/chains/MainnetIconLight'
import MainnetIconColor from '@/img/chains/MainnetIconColor'
import PolygonIconDark from '../img/chains/PolygonIconDark'
import PolygonIconLight from '../img/chains/PolygonIconLight'
import PolygonIconColor from '../img/chains/PolygonIconColor'
import BaseIconDark from '../img/chains/BaseIconDark'
import BaseIconLight from '../img/chains/BaseIconLight'
import BaseIconColor from '../img/chains/BaseIconColor'
import ArbitrumIconDark from '../img/chains/ArbitrumIconDark'
import ArbitrumIconLight from '../img/chains/ArbitrumIconLight'
import ArbitrumIconColor from '../img/chains/ArbitrumIconColor'
import AvalancheIconDark from '../img/chains/AvalancheIconDark'
import AvalancheIconLight from '../img/chains/AvalancheIconLight'
import AvalancheIconColor from '../img/chains/AvalancheIconColor'
import BscIconDark from '../img/chains/BscIconDark'
import BscIconLight from '../img/chains/BscIconLight'
import BscIconColor from '../img/chains/BscIconColor'
import SepoliaIconDark from '../img/chains/SepoliaIconDark'
import SepoliaIconLight from '../img/chains/SepoliaIconLight'
import LineaIconDark from '../img/chains/LineaIconDark'
import LineaIconLight from '../img/chains/LineaIconLight'
import LineaIconColor from '../img/chains/LineaIconColor'
import OptimismIconDark from '../img/chains/OptimismIconDark'
import OptimismIconLight from '../img/chains/OptimismIconLight'
import OptimismIconColor from '../img/chains/OptimismIconColor'
import ScrollIconDark from '../img/chains/ScrollIconDark'
import ScrollIconLight from '../img/chains/ScrollIconLight'
import ScrollIconColor from '../img/chains/ScrollIconColor'
import ZksyncIconDark from '../img/chains/ZksyncIconDark'
import ZksyncIconLight from '../img/chains/ZksyncIconLight'
import ZksyncIconColor from '../img/chains/ZksyncIconColor'
import BlastSepoliaIconColor from '../img/chains/BlastSepoliaIconColor'
import BlastSepoliaIconLight from '../img/chains/BlastSepoliaIconLight'
import BlastSepoliaIconDark from '../img/chains/BlastSepoliaIconDark'
import BlastIconColor from '../img/chains/BlastIconColor'
import BlastIconDark from '../img/chains/BlastIconDark'
import BlastIconLight from '../img/chains/BlastIconLight'
import CyberIconLight from '../img/chains/CyberIconLight'
import CyberIconDark from '../img/chains/CyberIconDark'
import CyberIconColor from '../img/chains/CyberIconColor'
import MantaPacificIconLight from '@/img/chains/MantaPacificIconLight'
import MantaPacificIconDark from '@/img/chains/MantaPacificIconDark'
import MantaPacificIconColor from '@/img/chains/MantaPacificIconColor'
import MantleIconLight from '@/img/chains/MantleIconLight'
import MantleIconDark from '@/img/chains/MantleIconDark'
import MantleIconColor from '@/img/chains/MantleIconColor'
import ZkfairIconLight from '@/img/chains/ZkfairIconLight'
import ZkfairIconColor from '@/img/chains/ZkfairIconColor'
import ZkfairIconDark from '@/img/chains/ZkfairIconDark'
import MerlinIconLight from '@/img/chains/MerlinIconLight'
import MerlinIconDark from '@/img/chains/MerlinIconDark'
import MerlinIconColor from '@/img/chains/MerlinIconColor'
import ModeIconLight from '@/img/chains/ModeIconLight'
import ModeIconDark from '@/img/chains/ModeIconDark'
import ModeIconColor from '@/img/chains/ModeIconColor'
import BobIconLight from '@/img/chains/BobIconLight'
import BobIconColor from '@/img/chains/BobIconColor'
import BobIconDark from '@/img/chains/BobIconDark'
import LightlinkIconLight from '@/img/chains/LightlinkIconLight'
import LightlinkIconDark from '@/img/chains/LightlinkIconDark'
import LightlinkIconColor from '@/img/chains/LightlinkIconColor'

const chainIcons: Record<
  string,
  {
    light: any
    dark: any
    color: any
  }
> = {
  [elementChains.arbitrum.chainId]: {
    light: <ArbitrumIconDark />,
    dark: <ArbitrumIconLight />,
    color: <ArbitrumIconColor />
  },
  [elementChains.avalanche.chainId]: {
    light: <AvalancheIconDark />,
    dark: <AvalancheIconLight />,
    color: <AvalancheIconColor />
  },
  [elementChains.base.chainId]: {
    light: <BaseIconDark />,
    dark: <BaseIconLight />,
    color: <BaseIconColor />
  },
  [elementChains.basetest.chainId]: {
    light: <BaseIconDark />,
    dark: <BaseIconLight />,
    color: <BaseIconColor />
  },
  [elementChains.bsc.chainId]: {
    light: <BscIconDark />,
    dark: <BscIconLight />,
    color: <BscIconColor />
  },
  [elementChains.opbnb.chainId]: {
    light: <BscIconDark />,
    dark: <BscIconLight />,
    color: <BscIconColor />
  },
  [elementChains.sepolia.chainId]: {
    light: <SepoliaIconDark />,
    dark: <SepoliaIconLight />,
    color: null
  },
  [elementChains.linea.chainId]: {
    light: <LineaIconDark />,
    dark: <LineaIconLight />,
    color: <LineaIconColor />
  },
  [elementChains.eth.chainId]: {
    light: <MainnetIconDark />,
    dark: <MainnetIconLight />,
    color: <MainnetIconColor />
  },
  [elementChains.optimism.chainId]: {
    light: <OptimismIconDark />,
    dark: <OptimismIconLight />,
    color: <OptimismIconColor />
  },
  [elementChains.polygon.chainId]: {
    light: <PolygonIconDark />,
    dark: <PolygonIconLight />,
    color: <PolygonIconColor />
  },
  [elementChains.scroll.chainId]: {
    light: <ScrollIconDark />,
    dark: <ScrollIconLight />,
    color: <ScrollIconColor />
  },
  [elementChains.zksync.chainId]: {
    light: <ZksyncIconDark />,
    dark: <ZksyncIconLight />,
    color: <ZksyncIconColor />
  },
  [elementChains.blast_testnet.chainId]: {
    light: <BlastSepoliaIconDark />,
    dark: <BlastSepoliaIconLight />,
    color: <BlastSepoliaIconColor />
  },
  [elementChains.blast.chainId]: {
    light: <BlastIconLight />,
    dark: <BlastIconDark />,
    color: <BlastIconColor />
  },
  [elementChains.cyber.chainId]: {
    light: <CyberIconLight />,
    dark: <CyberIconDark />,
    color: <CyberIconColor />
  },
  [elementChains.mantle.chainId]: {
    light: <MantleIconLight />,
    dark: <MantleIconDark />,
    color: <MantleIconColor />
  },
  [elementChains.zkfair.chainId]: {
    light: <ZkfairIconLight />,
    dark: <ZkfairIconDark />,
    color: <ZkfairIconColor />
  },
  [elementChains.merlin.chainId]: {
    light: <MerlinIconLight />,
    dark: <MerlinIconDark />,
    color: <MerlinIconColor />
  },
  [elementChains.mode.chainId]: {
    light: <ModeIconLight />,
    dark: <ModeIconDark />,
    color: <ModeIconColor />
  },
  [elementChains.bob.chainId]: {
    light: <BobIconLight />,
    dark: <BobIconDark />,
    color: <BobIconColor />
  },
  [elementChains.lightlink.chainId]: {
    light: <LightlinkIconLight />,
    dark: <LightlinkIconDark />,
    color: <LightlinkIconColor />
  },
  [elementChains.manta_pacific.chainId]: {
    light: <MantaPacificIconLight />,
    dark: <MantaPacificIconDark />,
    color: <MantaPacificIconColor />
  }
}

export default chainIcons
