import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { ThemeConfig, ThemeContextType, ThemeMode } from '../types/theme'
// import { ThemeStyle } from '@/themes/ThemeStyle'
import { safeLocalStorage } from '@/lib/safe-localstorage'
import { cn } from '@/lib/utils'
import {
  generateThemeStyles,
  themeColorsToCssVariables
} from '@/lib/theme-to-css'
import { getPresetThemeById } from '@/themes/themes'

const defaultTheme: ThemeConfig = {
  mode: 'dark',
  preset: 'default'
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

// 获取初始主题模式
const getInitialTheme = (
  storageKey: string,
  themeConfig: ThemeConfig
): ThemeConfig => {
  // 1. 尝试从本地存储获取
  const stored = safeLocalStorage.getItem(storageKey)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse stored theme:', e)
    }
  }

  // 2. 如果本地存储没有，则从系统偏好获取
  if (typeof window !== 'undefined') {
    const preset = getPresetThemeById(themeConfig.preset || defaultTheme.preset)
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    return {
      ...preset,
      ...defaultTheme,
      ...themeConfig,
      mode:
        themeConfig.mode && themeConfig.mode !== 'system'
          ? themeConfig.mode
          : isDarkMode
            ? 'dark'
            : 'light'
    }
  }

  return defaultTheme
}

// 管理 Style 标签的缓存
const styleCache = new Map<string, HTMLStyleElement>()

// 动态生成和更新样式
const injectStyles = (styles: string, namespace: string): void => {
  let styleElement = styleCache.get(namespace)

  if (!styleElement) {
    // 如果不存在对应的 <style> 标签，创建一个新的
    styleElement = document.createElement('style')
    styleElement.setAttribute('data-theme-namespace', namespace)
    document.head.appendChild(styleElement)
    styleCache.set(namespace, styleElement)
  }

  // 更新样式内容
  styleElement.textContent = styles
}

// 清理样式
const removeStyles = (namespace: string): void => {
  const styleElement = styleCache.get(namespace)
  if (styleElement) {
    document.head.removeChild(styleElement)
    styleCache.delete(namespace)
  }
}

export function ThemeProvider({
  children,
  themeConfig = defaultTheme,
  storageKey = 'ek-ui-theme'
}: {
  children: React.ReactNode
  themeConfig?: ThemeConfig
  storageKey?: string
}) {
  const themeWrapperRef = useRef<HTMLDivElement>(null)
  const [themeWrapper, setThemeWrapper] = useState<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    setThemeWrapper(themeWrapperRef.current)
  }, [])

  const namespaceRef = useRef(
    `ek-theme-ns-${Math.random().toString(36).slice(2, 9)}`
  )
  const namespace = namespaceRef.current

  // 使用 getInitialTheme 获取初始值
  const [theme, setThemeState] = useState<ThemeConfig>(() =>
    getInitialTheme(storageKey, themeConfig)
  )

  // Monitor changes in themeConfig prop
  useEffect(() => {
    // Merge incoming themeConfig with current theme, giving priority to incoming config
    const preset = getPresetThemeById(themeConfig.preset)
    const updatedTheme = {
      ...theme,
      ...preset,
      ...themeConfig,
      // Ensure mode is properly handled
      mode:
        themeConfig.mode && themeConfig.mode !== 'system'
          ? themeConfig.mode
          : theme.mode
    }
    console.log({ updatedTheme })
    // Only update if there are actual changes
    if (JSON.stringify(updatedTheme) !== JSON.stringify(theme)) {
      setThemeState(updatedTheme)
      safeLocalStorage.setItem(storageKey, JSON.stringify(updatedTheme))
    }
  }, [themeConfig, storageKey])

  // 监听系统主题变化
  useEffect(() => {
    if (theme.mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => {
        document.documentElement.classList.toggle('dark', mediaQuery.matches)
      }
      mediaQuery.addEventListener('change', handler)
      handler()
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [theme.mode])

  // 更新主题
  const setTheme = (newTheme: Partial<ThemeConfig>) => {
    const updatedTheme = { ...theme, ...newTheme }
    setThemeState(updatedTheme)
    safeLocalStorage.setItem(storageKey, JSON.stringify(updatedTheme))
  }

  // 设置模式
  const setMode = (mode: ThemeMode) => {
    const root = document.documentElement

    if (mode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', isDark)
      setTheme({ mode: isDark ? 'dark' : 'light' })
    } else {
      root.classList.toggle('dark', mode === 'dark')
      setTheme({ mode })
    }
  }

  // 初始化主题模式
  useEffect(() => {
    const root = document.documentElement
    if (theme.mode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', isDark)
      setTheme({ mode: isDark ? 'dark' : 'light' })
    } else {
      root.classList.toggle('dark', theme.mode === 'dark')
    }
  }, [])

  const styleVariables = themeColorsToCssVariables(
    theme.colors?.[theme.mode === 'dark' ? 'dark' : 'light'],
    namespace
  )

  useEffect(() => {
    // 动态生成 CSS
    const styles = generateThemeStyles(theme, namespace)
    injectStyles(styles, namespace)

    return () => {
      removeStyles(namespace)
    }
  }, [namespace, theme])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      theme,
      mode: theme.mode,
      setMode,
      setTheme,
      namespace,
      themeWrapper
    }),
    [theme, themeWrapper]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {/* <ThemeStyle /> */}
      <div
        ref={themeWrapperRef}
        // id={namespace}
        style={styleVariables}
        data-theme={namespace}
        data-ek-theme-mode={theme.mode}
        className={cn('ek-themes-wrapper', theme.mode)}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
