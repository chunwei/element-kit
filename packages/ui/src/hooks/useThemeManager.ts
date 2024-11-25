import { useCallback, useEffect, useState } from 'react'
import { Theme, ThemeConfig } from '@/types'
import { useTheme } from './useTheme'
// import { generateThemePreset } from '@/lib/color-preset-generator'

const CUSTOM_THEMES_KEY = 'custom-themes'

export function useThemeManager() {
  const { theme: currentTheme, setTheme } = useTheme()
  const [customThemes, setCustomThemes] = useState<Theme[]>([])

  // 加载自定义主题
  useEffect(() => {
    const savedThemes = localStorage.getItem(CUSTOM_THEMES_KEY)
    if (savedThemes) {
      try {
        setCustomThemes(JSON.parse(savedThemes))
      } catch (e) {
        console.error('Failed to parse custom themes:', e)
      }
    }
  }, [])

  // 保存自定义主题
  const saveCustomTheme = useCallback((theme: Theme) => {
    setCustomThemes(prev => {
      const newThemes = [...prev, theme]
      localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(newThemes))
      return newThemes
    })
  }, [])

  // 删除自定义主题
  const deleteCustomTheme = useCallback((themeId: string) => {
    setCustomThemes(prev => {
      const newThemes = prev.filter(t => t.id !== themeId)
      localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(newThemes))
      return newThemes
    })
  }, [])

  // 应用主题
  const applyTheme = useCallback((themeConfig: Partial<ThemeConfig>) => {
    setTheme(themeConfig)
  }, [setTheme])

//   // 创建新主题
//   const createCustomTheme = useCallback((name: string, baseColor: string) => {
//     const theme = {
//       ...generateThemePreset(name, baseColor),
//       id: `custom-${Date.now()}` // 确保 ID 唯一
//     }
//     saveCustomTheme(theme)
//     return theme
//   }, [saveCustomTheme])

  return {
    currentTheme,
    customThemes,
    saveCustomTheme,
    deleteCustomTheme,
    applyTheme,
    // createCustomTheme
  }
} 