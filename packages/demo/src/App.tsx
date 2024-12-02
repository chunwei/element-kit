import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Collections from './components/Collections'
import {
  ElementKitProvider,
  ThemeToggle,
  ThemeCustomizer,
  ThemeSelector,
  AdvancedThemeSelector,
  Rankings,
  ConnectKitButton
} from '@element-kit/ui'

function App() {
  return (
    <ElementKitProvider
      config={{
        theme: {
          preset: 'green',
          mode: 'system'
          // colors: { light: {}, dark: {} }
        },
        locale: 'zh-CN',
        debug: process.env.NODE_ENV === 'development',
        apiKey: import.meta.env.VITE_ELEMENT_API_KEY
      }}
    >
      <div className="card">
        <Rankings />
      </div>
      <div className="card">
        <Collections />
      </div>
      <div className="logos-bar w-full flex justify-between">
        <div className="left flex space-x-4 items-center">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React" />
          </a>
          <a href="https://element.market" target="_blank">
            <img
              src="https://static.element.bid/resource/images/favicon-180.png"
              className="logo element"
              alt="Element"
            />
          </a>
        </div>
        <div className="right flex space-x-4 items-center">
          <ThemeSelector /> {/* 简单的下拉选择器 */}
          <AdvancedThemeSelector /> {/* 高级主题管理器 */}
          <ThemeCustomizer />
          <ThemeToggle />
          <ConnectKitButton />
        </div>
      </div>
    </ElementKitProvider>
  )
}

export default App
