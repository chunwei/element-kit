# Element-Kit UI 组件库

该库提供了一组可复用的 UI 组件，旨在帮助开发者快速构建NFT交易用户界面。

## 组件列表

- **ConnectKitButton**: 可单独使用的【连接钱包】按钮组件。
- **Modals**: 用于交易的弹出模态框组件。
  - **SweepModals**: 扫货模态框组件。

## 安装

在项目中安装 UI 组件库：
```bash
pnpm add @element-kit/ui
```

## 使用示例

```ts
import './App.css'

import {
  ElementKitProvider,
  Rankings,
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
        // locale: 'zh-CN',
        debug: process.env.NODE_ENV === 'development',
        apiKey: import.meta.env.VITE_ELEMENT_API_KEY,
        hiddenPoweredByElement: false
      }}
    >
      <div className="card">
        <Rankings />
      </div>
    </ElementKitProvider>
  )
}

export default App
```

## ElementKitProvider 参数说明

| 参数名                     | 类型                     | 默认值                | 描述                                                         |
|--------------------------|------------------------|---------------------|------------------------------------------------------------|
| `config`                 | `ElementKitConfig`     | -                   | 配置对象，包含主题、语言、调试模式等设置。                          |
| `config.theme`           | `ThemeConfig`          | -                   | 主题配置，包含主题预设和颜色模式。                                   |
| `config.theme.preset`    | `string`               | -                   | 主题预设名称，例如 'green'、'dark' 等。                           |
| `config.theme.mode`      | `string`               | 'system'            | 主题模式，支持 'light'、'dark' 和 'system'。                     |
| `config.locale`          | `string`               | 'en'                | 应用的语言设置，例如 'zh-CN' 表示中文。                           |
| `config.debug`           | `boolean`              | `false`             | 是否启用调试模式，通常用于开发环境。                               |
| `config.apiKey`          | `string`               | -                   | Element API 的密钥，用于身份验证和访问 API。                       |
| `config.hiddenPoweredByElement` | `boolean`       | `false`             | 是否隐藏 "Powered by Element" 的标识。                           |
| `swrOptions`             | `SWRConfiguration`     | -                   | SWR 的全局配置选项，允许自定义请求行为和缓存策略，详见 SWR 文档。    |
| `wagmiConfig`            | `WagmiConfig`          | -                   | 配置 WagmiProvider 的选项，用于 Web3 应用程序的集成.       |



You can also pass in `swrOptions` which allow you to further configure `swr` at a global level. And you can also pass in `wagmiConfig` configure `WagmiProvider` .

## ThemeConfig 配置

ThemeConfig 用于控制应用程序的外观，以下是其详细说明：
| 参数名	| 类型	| 默认值	| 描述
|-----------|---------------------------------------------|-------------|------------------------------------------------------------|
| `mode`	  | `light,dark,system`                         |`'dark'`     | 主题色系                                                      |
| `preset`	| `ThemePreset`	                              | `'default'`	| 主题预设名称，例如 `'sapphire'`、`'midnight'`。支持自定义。   |
| `colors`	|` { light: ThemeColors, dark: ThemeColors }`	| -	          | 自定义主题颜色配置。支持浅色模式和深色模式分别定义颜色。  |
| `radius`	| `number`	                                  | -	          | 全局边框圆角大小，控制按钮、卡片等组件的外观。    |

## ThemeColors 示例

```ts
const customColors: ThemeColors = {
  background: '#f0f0f0',
  foreground: '#333',
  primary: '#007bff',
  primaryForeground: '#ffffff',
  secondary: '#6c757d',
  secondaryForeground: '#ffffff',
  accent: '#17a2b8',
  accentForeground: '#ffffff',
  destructive: '#dc3545',
  destructiveForeground: '#ffffff',
  muted: '#f8f9fa',
  mutedForeground: '#6c757d',
  card: '#ffffff',
  cardForeground: '#333',
  border: '#ced4da',
  input: '#e9ecef',
  ring: '#007bff',
  'chart-1': '#20c997',
  'chart-2': '#ff8c00',
  'chart-3': '#dc3545',
  // 其他图表颜色配置
}
```

## 高级配置

### SWR 全局选项

通过 config.swrOptions 自定义 SWR 的行为。详细参考官方文档 [SWRConfig](https://swr.vercel.app/docs/global-configuration)
例如：
```ts
import { ElementKitProvider } from '@element-kit/ui'

const swrOptions = {
  fetcher: (url) => fetch(url).then((res) => res.json()),
  dedupingInterval: 10000,
}

<ElementKitProvider
  config={{
    swrOptions,
  }}
>
  <App />
</ElementKitProvider>
```

### Web3 集成

通过 config.wagmiConfig 配置 WagmiProvider，详细参考官方文档 [WagmiConfig](https://wagmi.sh/react/api/createConfig)
例如：
```ts
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

<ElementKitProvider
  config={{
    wagmiConfig
  }}
>
  <App />
</ElementKitProvider>
```