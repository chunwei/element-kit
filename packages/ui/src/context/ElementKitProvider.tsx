import React, { ComponentPropsWithoutRef, createContext, useMemo } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from './ThemeProvider'
import { Web3Provider } from './Web3Provider'
import { ElementKitConfig, ElementKitContextType } from '../types/context'
import { ElementKitErrorBoundary } from '@/components/ElementKitErrorBoundary'
import { SWRConfig } from 'swr'
import { swrDefaultOptions } from '@/lib/swr'

export const ElementKitContext = createContext<
  ElementKitContextType | undefined
>(undefined)

const defaultConfig: ElementKitConfig = {
  locale: 'en',
  debug: false
}

export interface ElementKitProviderProps {
  children: React.ReactNode
  config?: ElementKitConfig
  storagePrefix?: string
  swrOptions?: ComponentPropsWithoutRef<typeof SWRConfig>['value']
}

export function ElementKitProvider({
  children,
  config: userConfig,
  storagePrefix = 'element-kit',
  swrOptions = {}
}: ElementKitProviderProps) {
  const config = useMemo(
    () => ({
      ...defaultConfig,
      ...userConfig
    }),
    [userConfig]
  )

  const updateConfig = (newConfig: Partial<ElementKitConfig>) => {
    // 实现配置更新逻辑
    console.log({ newConfig })
  }

  const contextValue = useMemo(
    () => ({
      config,
      updateConfig
    }),
    [config]
  )

  return (
    <ElementKitErrorBoundary>
      <ThemeProvider
        // defaultConfig={config.theme}
        storageKey={`${storagePrefix}-theme`}
      >
        <Web3Provider>
          <ElementKitContext.Provider value={contextValue}>
            <SWRConfig value={{ ...swrDefaultOptions, ...swrOptions }}>
              {children}
              <Toaster richColors />
            </SWRConfig>
          </ElementKitContext.Provider>
        </Web3Provider>
      </ThemeProvider>
    </ElementKitErrorBoundary>
  )
}
