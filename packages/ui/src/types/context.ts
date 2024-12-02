import type { WagmiConfig } from '@/wagmiConfig'
import type { ThemeConfig } from './theme'
import type { ComponentPropsWithoutRef } from 'react'
import type { SWRConfig } from 'swr'

export interface ElementKitConfig {
  theme?: ThemeConfig
  locale?: string
  debug?: boolean
  hiddenPoweredByElement?: boolean
  apiKey?: string
  // 可以添加更多全局配置
  swrOptions?: ComponentPropsWithoutRef<typeof SWRConfig>['value']
  wagmiConfig?: WagmiConfig
}

export interface ElementKitContextType {
  config: ElementKitConfig
  updateConfig: (config: Partial<ElementKitConfig>) => void
}
