import { Theme, ThemeMode, THEMEPRESETS } from '@/themes/themes'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

interface ThemeContextType {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<any>>
  setMode: (mode: ThemeMode) => void
  setGlobalMode: (mode: ThemeMode) => void
  globalMode: ThemeMode
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const previousModeRef = useRef<ThemeMode | undefined>()
  const [globalMode, setGlobalModeState] = useState<ThemeMode>('system') // 初始化主题状态
  const [theme, setTheme] = useState<Theme>({
    ...THEMEPRESETS[0],
    mode: 'system'
  })
  // 设置编辑中的主题模式
  const setMode = useCallback((mode: ThemeMode) => {
    setTheme((theme) => ({ ...theme, mode }))
  }, [])

  // 初始化、监听 编辑中的主题模式
  useEffect(() => {
    if (!theme.mode || theme?.mode === 'system') {
      const oldMode = previousModeRef.current
      if (oldMode && oldMode !== 'system') {
        setMode(oldMode)
      } else {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setMode(isDark ? 'dark' : 'light')
      }
    }
    // 更新
    previousModeRef.current = theme?.mode
  }, [theme?.mode])

  // 设置全局模式
  const setGlobalMode = useCallback(
    (mode: ThemeMode) => {
      const root = document.documentElement
      if (mode === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        root.classList.toggle('dark', isDark)
        setGlobalModeState(isDark ? 'dark' : 'light')
      } else {
        root.classList.toggle('dark', mode === 'dark')
        setGlobalModeState(mode)
      }
    },
    [setGlobalModeState]
  )

  // 初始化全局主题模式
  useEffect(() => {
    setGlobalMode('system')
  }, [setGlobalMode])

  const contextValue = useMemo(
    () => ({ theme, setTheme, setMode, setGlobalMode, globalMode }),
    [theme, setTheme, setMode, setGlobalMode, globalMode]
  )
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
