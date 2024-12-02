import { Check } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { THEMEPRESETS } from '@/themes/themes'
import { ThemeConfig } from '@/types/theme'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { safeLocalStorage } from '@/lib/safe-localstorage'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const customThemes = JSON.parse(
    safeLocalStorage.getItem('custom-themes') || '[]'
  )
  const isDark = theme.mode === 'dark'
  // 应用主题
  const applyTheme = (newTheme: Partial<ThemeConfig>) => {
    setTheme(newTheme)
  }

  // 获取主题预览色块
  const ThemePreview = ({ colors }: { colors: Record<string, string> }) => (
    <div className="ek-flex ek-gap-1">
      {
        // Object.values(colors).slice(0, 5)
        ['primary']
          .map((k) => colors[k])
          .map((color, i) => (
            <div
              key={i}
              className="ek-h-4 ek-w-4 ek-rounded-full"
              style={{ background: `hsl(${color})` }}
            />
          ))
      }
    </div>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ek-flex ek-gap-2">
          <div className="ek-flex ek-gap-1">
            {THEMEPRESETS.find((t) => t.id === theme.preset)?.colors.light && (
              <ThemePreview
                colors={
                  THEMEPRESETS.find((t) => t.id === theme.preset)!.colors.light
                }
              />
            )}
          </div>
          <span>主题</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="ek-w-[240px]">
        <DropdownMenuLabel>预设主题</DropdownMenuLabel>
        {THEMEPRESETS.map((preset) => (
          <DropdownMenuItem
            key={preset.id}
            onClick={() =>
              applyTheme({
                preset: preset.id,
                colors: preset.colors,
                radius: preset.radius
              })
            }
            className="ek-flex ek-items-center ek-justify-between"
          >
            <div className="ek-flex ek-items-center ek-gap-2">
              <ThemePreview colors={preset.colors[isDark ? 'dark' : 'light']} />
              <span>{preset.name}</span>
            </div>
            {theme.preset === preset.id && <Check className="ek-h-4 ek-w-4" />}
          </DropdownMenuItem>
        ))}

        {customThemes.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>自定义主题</DropdownMenuLabel>
            {customThemes.map((customTheme: any) => (
              <DropdownMenuItem
                key={customTheme.id}
                onClick={() =>
                  applyTheme({
                    preset: customTheme.id,
                    colors: customTheme.colors,
                    radius: customTheme.radius
                  })
                }
                className="ek-flex ek-items-center ek-justify-between"
              >
                <div className="ek-flex ek-items-center ek-gap-2">
                  <ThemePreview colors={customTheme.colors.light} />
                  <span>{customTheme.name}</span>
                </div>
                {theme.preset === customTheme.id && (
                  <Check className="ek-h-4 ek-w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
