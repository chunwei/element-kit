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

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const customThemes = JSON.parse(localStorage.getItem('custom-themes') || '[]')
  const isDark = theme.mode === 'dark'
  // 应用主题
  const applyTheme = (newTheme: Partial<ThemeConfig>) => {
    setTheme(newTheme)
  }

  // 获取主题预览色块
  const ThemePreview = ({ colors }: { colors: Record<string, string> }) => (
    <div className="flex gap-1">
      {
        // Object.values(colors).slice(0, 5)
        ['primary']
          .map((k) => colors[k])
          .map((color, i) => (
            <div
              key={i}
              className="h-4 w-4 rounded-full"
              style={{ background: `hsl(${color})` }}
            />
          ))
      }
    </div>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <div className="flex gap-1">
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

      <DropdownMenuContent align="end" className="w-[240px]">
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
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <ThemePreview colors={preset.colors[isDark ? 'dark' : 'light']} />
              <span>{preset.name}</span>
            </div>
            {theme.preset === preset.id && <Check className="h-4 w-4" />}
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
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <ThemePreview colors={customTheme.colors.light} />
                  <span>{customTheme.name}</span>
                </div>
                {theme.preset === customTheme.id && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
