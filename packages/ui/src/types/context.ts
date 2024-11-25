import type { WagmiConfig } from '@/wagmiConfig'
import { ThemeConfig } from './theme'

export interface ElementKitConfig {
  theme?: Partial<ThemeConfig>
  locale?: string
  debug?: boolean
  apiKey?: string
  // 可以添加更多全局配置
  wagmiConfig?: WagmiConfig
}

export interface ElementKitContextType {
  config: ElementKitConfig
  updateConfig: (config: Partial<ElementKitConfig>) => void
}
