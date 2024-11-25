import React, { createContext, useEffect, useState } from 'react'
import { ThemeConfig, ThemeContextType, ThemeMode } from '../types/theme'
import { ThemeStyle } from '@/themes/ThemeStyle'

const defaultTheme: ThemeConfig = {
  mode: 'system',
  preset: 'default'
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

// 获取初始主题模式
const getInitialTheme = (storageKey: string): ThemeConfig => {
  // 1. 尝试从本地存储获取
  const stored = localStorage.getItem(storageKey)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse stored theme:', e)
    }
  }

  // 2. 如果本地存储没有，则从系统偏好获取
  if (typeof window !== 'undefined') {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    return {
      ...defaultTheme,
      mode: isDarkMode ? 'dark' : 'light'
    }
  }

  return defaultTheme
}

export function ThemeProvider({
  children,
  //   defaultConfig = defaultTheme,
  storageKey = 'ui-theme'
}: {
  children: React.ReactNode
  defaultConfig?: ThemeConfig
  storageKey?: string
}) {
  // 使用 getInitialTheme 获取初始值
  const [theme, setThemeState] = useState<ThemeConfig>(() =>
    getInitialTheme(storageKey)
  )

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
    localStorage.setItem(storageKey, JSON.stringify(updatedTheme))

    // 更新 CSS 变量
    // const root = document.documentElement
    // Object.entries(updatedTheme.colors).forEach(([key, value]) => {
    //   // 解析 hsl 值
    //   const match = value.match(/hsl\(var\((.*?)\)\)/)
    //   if (match) {
    //     const cssVar = match[1]
    //     const currentValue = getComputedStyle(root).getPropertyValue(cssVar)
    //     root.style.setProperty(cssVar, currentValue)
    //   } else {
    //     // 直接设置颜色值
    //     root.style.setProperty(`--${key}`, value)
    //   }
    // })
  }

  // 设置模式
  const setMode = (mode: ThemeMode) => {
    setTheme({ mode })
    const root = document.documentElement

    if (mode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', isDark)
    } else {
      root.classList.toggle('dark', mode === 'dark')
    }
  }

  // 初始化主题模式
  useEffect(() => {
    const root = document.documentElement
    if (theme.mode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', isDark)
    } else {
      root.classList.toggle('dark', theme.mode === 'dark')
    }
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode: theme.mode,
        setMode,
        setTheme
      }}
    >
      <ThemeStyle />
      <div className="ek-themes-wrapper">{children}</div>
    </ThemeContext.Provider>
  )
}
