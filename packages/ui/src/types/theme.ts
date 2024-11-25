export type ThemeMode = 'light' | 'dark' | 'system'
export type ThemePreset =
  | 'default'
  | 'palette'
  | 'sapphire'
  | 'ruby'
  | 'emerald'
  | 'daylight'
  | 'midnight'
  | string
export interface ThemeColors {
  background: string
  foreground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  muted: string
  mutedForeground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  border: string
  input: string
  ring: string
  'chart-1': string
  'chart-2': string
  'chart-3': string
  'chart-4': string
  'chart-5': string
}
export interface ThemeBase {
  colors: {
    light: Partial<ThemeColors>
    dark: Partial<ThemeColors>
  }
  radius: number
  // fontFamily: string
}
export interface ThemeConfig extends Partial<ThemeBase> {
  mode: ThemeMode
  preset: ThemePreset
}
export interface Theme extends ThemeBase {
  id: string
  name: string
}

export interface ThemeContextType {
  theme: ThemeConfig
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  setTheme: (theme: Partial<ThemeConfig>) => void
}
