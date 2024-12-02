import { ThemeConfig } from '@/types/theme'

export function themeColorsToCssVariables(
  colors?: Record<string, string>,
  namespace?: string
): Record<string, string> {
  const cssVars = colors
    ? Object.fromEntries(
        Object.entries(colors).map(([name, value]) => {
          if (value === undefined) return []
          const cssName = themeColorNameToCssVariable(name, namespace)
          return [cssName, value]
        })
      )
    : {}

  // for (const key of Array.from({ length: 5 }, (_, index) => index)) {
  //   cssVars[`--chart-${key + 1}`] =
  //     cssVars[`--chart-${key + 1}`] ||
  //     `${cssVars["--primary"]} / ${100 - key * 20}%`
  // }

  return cssVars
}

export function themeColorNameToCssVariable(name: string, namespace?: string) {
  return `--${namespace ? namespace + '-' : ''}${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
}

// 动态生成 Scoped CSS 样式, 用于注入<style>
export const generateThemeStyles = (
  theme: ThemeConfig,
  namespace: string
): string => {
  return `
    [data-theme="${namespace}"] {
    --radius:${theme.radius}rem;
    ${Object.entries(theme?.colors?.light ?? {})
      .map(
        ([key, _]) =>
          `${themeColorNameToCssVariable(key)}: var(${themeColorNameToCssVariable(key, namespace)});`
      )
      .join('\n')}
        }
    }
    [data-theme="${namespace}"].dark {
       --radius:${theme.radius}rem;
    ${Object.entries(theme?.colors?.light ?? {})
      .map(
        ([key, _]) =>
          `${themeColorNameToCssVariable(key)}: var(${themeColorNameToCssVariable(key, namespace)});`
      )
      .join('\n')}
        }
    }
  `
}
