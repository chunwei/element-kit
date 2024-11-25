'use client'

import {
  ElementKitProvider,
  Rankings,
  ThemeSelector,
  ThemeToggle,
  AdvancedThemeSelector,
  ThemeCustomizer,
  ConnectKitButton
} from '@element-kit/ui'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <ElementKitProvider
            config={{
              theme: {
                mode: 'system',
                colors: { light: {}, dark: {} }
              },
              locale: 'zh-CN',
              debug: process.env.NODE_ENV === 'development',
              apiKey: process.env.NEXT_PUBLIC_ELEMENT_API_KEY
            }}
          >
            <div className="card">
              <Rankings />
            </div>
            <div className="logos-bar w-full flex justify-between">
              <div className="flex space-x-4 items-center">
                <a href="https://element.market" target="_blank">
                  <img
                    src="https://static.element.bid/resource/images/favicon-180.png"
                    className="logo element"
                    alt="Element"
                  />
                </a>
              </div>
              <div className="flex space-x-4 items-center">
                <ThemeSelector /> {/* 简单的下拉选择器 */}
                <AdvancedThemeSelector /> {/* 高级主题管理器 */}
                <ThemeCustomizer />
                <ThemeToggle />
                <ConnectKitButton />
              </div>
            </div>
          </ElementKitProvider>
        </div>
      </main>
    </div>
  )
}
