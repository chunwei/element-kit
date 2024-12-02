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
      <DialogContent className="ek-max-w-2xl">
        <DialogHeader>
          <DialogTitle>主题设置</DialogTitle>
        </DialogHeader>

        <ScrollArea className="ek-h-[600px] ek-pr-4">
          <div className="ek-space-y-6">
            <div className="ek-space-y-4">
              <h3 className="ek-text-lg ek-font-semibold">预设主题</h3>
              <div className="ek-grid ek-grid-cols-3 ek-gap-4">
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
                    className="ek-h-auto ek-p-4 ek-justify-start"
                  >
                    <div className="ek-flex ek-items-center ek-gap-2">
                      <div className="ek-flex ek-gap-1">
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
                                className="ek-h-4 ek-w-4 ek-rounded-full"
                                style={{ background: `hsl(${color})` }}
                              />
                            ))
                        }
                      </div>
                      <span>{preset.name}</span>
                      {currentTheme.preset === preset.id && (
                        <Check className="ek-h-4 ek-w-4 ek-ml-auto" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {customThemes.length > 0 && (
              <div className="ek-space-y-4">
                <h3 className="ek-text-lg ek-font-semibold">自定义主题</h3>
                <div className="ek-grid ek-grid-cols-3 ek-gap-4">
                  {customThemes.map((customTheme) => (
                    <div key={`${customTheme.id}-${Date.now()}`} className="ek-relative ek-group">
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
                        className="ek-w-full ek-h-auto ek-p-4 ek-justify-start"
                      >
                        <div className="ek-flex ek-items-center ek-gap-2">
                          <div className="ek-flex ek-gap-1">
                            {Object.values(customTheme.colors.light)
                              .slice(0, 5)
                              .map((color, i) => (
                                <div
                                  key={i}
                                  className="ek-h-4 ek-w-4 ek-rounded-full"
                                  style={{ background: `hsl(${color})` }}
                                />
                              ))}
                          </div>
                          <span>{customTheme.name}</span>
                          {currentTheme.preset === customTheme.id && (
                            <Check className="ek-h-4 ek-w-4 ek-ml-auto" />
                          )}
                        </div>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ek-absolute ek-right-2 ek-top-1/2 ek--translate-y-1/2 ek-opacity-0 group-hover:ek-opacity-100 ek-transition-opacity"
                        onClick={() => deleteCustomTheme(customTheme.id)}
                      >
                        <Trash2 className="ek-h-4 ek-w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="ek-space-y-4">
              <h3 className="ek-text-lg ek-font-semibold">创建新主题</h3>
              <ThemeCustomizer />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
