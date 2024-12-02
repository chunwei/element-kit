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
import github from '@/public/github.svg'
import Image from 'next/image'

export default function Home() {
  // const [isClient, setIsClient] = useState(false)

  // useEffect(() => {
  //   setIsClient(true)
  // }, [])

  // if (!isClient) return null // 或者返回一个加载占位符
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-12 gap-8 sm:px-44 sm:py-8 font-[family-name:var(--font-geist-sans)]">
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
                  {/*  eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://static.element.bid/resource/images/favicon-180.png"
                    className="logo element"
                    alt="Element"
                  />
                </a>
              </div>
              <div className="flex space-x-4 items-center">
                <a
                  href="https://github.com/chunwei/element-kit"
                  target="_blank"
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <svg
                    width="16"
                    height="16"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    version="1.1"
                    data-view-component="true"
                  >
                    <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z" />
                  </svg>
                  Github
                </a>
                <a
                  href="https://element-kit-theme-builder.vercel.app/"
                  target="_blank"
                >
                  Theme Builder
                </a>
                <ThemeSelector /> {/* 简单的下拉选择器 */}
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
