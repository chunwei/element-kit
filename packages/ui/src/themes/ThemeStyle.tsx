'use client'

import { useTheme } from '@/hooks/useTheme'
import { themeColorNameToCssVariable } from '@/lib/theme-to-css'

export function ThemeStyle() {
  const { theme } = useTheme()

  if (!theme) {
    return null
  }

  return theme.colors ? (
    <style>
      {`
        #element-kit-root.ek-themes-wrapper,
        [data-chart] {
        --radius:${theme.radius}rem;
        ${Object.entries(theme.colors.light ?? {})
          .map(
            ([key, value]) => `${themeColorNameToCssVariable(key)}: ${value};`
          )
          .join('\n')}
        }

        .dark #element-kit-root.ek-themes-wrapper,
        #element-kit-root.ek-themes-wrapper.dark ,
        .dark [data-chart] {
        --radius:${theme.radius}rem;
        ${Object.entries(theme.colors.dark ?? {})
          .map(
            ([key, value]) => `${themeColorNameToCssVariable(key)}: ${value};`
          )
          .join('\n')}
        }
        `}
    </style>
  ) : null
}
