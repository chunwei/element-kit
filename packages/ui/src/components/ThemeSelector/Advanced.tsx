import { Check, Trash2 } from 'lucide-react'
import { useThemeManager } from '@/hooks/useThemeManager'
import { THEMEPRESETS } from '@/themes/themes'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { ThemeCustomizer } from '../ThemeCustomizer'

export function AdvancedThemeSelector() {
  const { currentTheme, customThemes, deleteCustomTheme, applyTheme } =
    useThemeManager()

  const isDark = currentTheme.mode === 'dark'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">主题设置</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>主题设置</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">预设主题</h3>
              <div className="grid grid-cols-3 gap-4">
                {THEMEPRESETS.map((preset) => (
                  <Button
                    key={preset.id}
                    variant={
                      currentTheme.preset === preset.id ? 'default' : 'outline'
                    }
                    onClick={() =>
                      applyTheme({
                        preset: preset.id,
                        colors: preset.colors,
                        radius: preset.radius
                      })
                    }
                    className="h-auto p-4 justify-start"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {
                          /* {Object.values(preset.colors.light).slice(0, 5) */
                          ['primary', 'secondary', 'accent']
                            .map(
                              (k) =>
                                preset.colors[isDark ? 'dark' : 'light'][
                                  k as keyof typeof preset.colors.light
                                ]
                            )
                            .map((color, i) => (
                              <div
                                key={i}
                                className="h-4 w-4 rounded-full"
                                style={{ background: `hsl(${color})` }}
                              />
                            ))
                        }
                      </div>
                      <span>{preset.name}</span>
                      {currentTheme.preset === preset.id && (
                        <Check className="h-4 w-4 ml-auto" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {customThemes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">自定义主题</h3>
                <div className="grid grid-cols-3 gap-4">
                  {customThemes.map((customTheme) => (
                    <div key={`${customTheme.id}-${Date.now()}`} className="relative group">
                      <Button
                        variant={
                          currentTheme.preset === customTheme.id
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() =>
                          applyTheme({
                            preset: customTheme.id,
                            colors: customTheme.colors,
                            radius: customTheme.radius
                          })
                        }
                        className="w-full h-auto p-4 justify-start"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {Object.values(customTheme.colors.light)
                              .slice(0, 5)
                              .map((color, i) => (
                                <div
                                  key={i}
                                  className="h-4 w-4 rounded-full"
                                  style={{ background: `hsl(${color})` }}
                                />
                              ))}
                          </div>
                          <span>{customTheme.name}</span>
                          {currentTheme.preset === customTheme.id && (
                            <Check className="h-4 w-4 ml-auto" />
                          )}
                        </div>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteCustomTheme(customTheme.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">创建新主题</h3>
              <ThemeCustomizer />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
