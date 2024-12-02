import { useState, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { THEMEPRESETS } from '@/themes/themes'
import { ThemeBase, ThemeColors, ThemePreset } from '@/types/theme'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ColorPicker } from './ColorPicker'
import { RadiusSelector } from './RadiusSelector'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { safeLocalStorage } from '@/lib/safe-localstorage'

interface CustomTheme extends ThemeBase {
  name: string
  id: string
}

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme()
  const [selectedPreset, setSelectedPreset] = useState(theme.preset)
  const [customTheme, setCustomTheme] = useState<CustomTheme | null>(null)
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([])

  const isDark = theme.mode === 'dark'

  // 加载自定义主题
  useEffect(() => {
    const stored = safeLocalStorage.getItem('custom-themes')
    if (stored) {
      try {
        setCustomThemes(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to load custom themes:', e)
      }
    }
  }, [])

  // 选择预设主题
  const handlePresetSelect = (presetId: ThemePreset) => {
    const preset = THEMEPRESETS.find((t) => t.id === presetId)
    if (!preset) return
    setSelectedPreset(presetId)
    setCustomTheme({
      ...preset,
      name: '',
      id: `custom-${Date.now()}`
    })
  }

  // 更新颜色
  const updateColor = (
    mode: 'light' | 'dark',
    key: keyof ThemeColors,
    value: string
  ) => {
    if (!customTheme) return
    setCustomTheme({
      ...customTheme,
      colors: {
        ...customTheme.colors,
        [mode]: {
          ...customTheme.colors[mode],
          [key]: value
        }
      }
    })
  }

  // 保存自定义主题
  const saveCustomTheme = (name: string) => {
    if (!customTheme || !name) return

    const newTheme = { ...customTheme, name }
    const updatedThemes = [...customThemes, newTheme]
    setCustomThemes(updatedThemes)
    safeLocalStorage.setItem('custom-themes', JSON.stringify(updatedThemes))

    setTheme({
      preset: newTheme.id,
      colors: newTheme.colors,
      radius: newTheme.radius
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">自定义主题</Button>
      </DialogTrigger>
      <DialogContent className="ek-max-w-2xl">
        <DialogHeader>
          <DialogTitle>主题定制</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="presets">
          <TabsList>
            <TabsTrigger value="presets">预设主题</TabsTrigger>
            <TabsTrigger value="customize">定制</TabsTrigger>
            <TabsTrigger value="custom">我的主题</TabsTrigger>
          </TabsList>

          <TabsContent value="presets">
            <div className="ek-grid ek-grid-cols-3 ek-gap-4">
              {THEMEPRESETS.map((preset) => (
                <Button
                  key={preset.id}
                  variant={selectedPreset === preset.id ? 'default' : 'outline'}
                  onClick={() => handlePresetSelect(preset.id)}
                  className="ek-h-auto ek-p-2"
                >
                  <div className="ek-space-y-2">
                    <div className="ek-text-sm ek-font-semibold">{preset.name}</div>
                    <div className="ek-grid ek-grid-cols-12 ek-gap-1">
                      {Object.values(preset.colors[isDark ? 'dark' : 'light'])
                        // .slice(0, 5)
                        .map((color, i) => (
                          <div
                            key={i}
                            className="ek-h-3 ek-w-3 ek-border"
                            style={{ background: `hsl(${color})` }}
                          />
                        ))}
                    </div>
                    {/* <div className="ek-grid ek-grid-cols-12 ek-gap-1">
                      {Object.values(preset.colors.dark)
                        // .slice(0, 5)
                        .map((color, i) => (
                          <div
                            key={i}
                            className="ek-h-3 ek-w-3 ek-border"
                            style={{ background: `hsl(${color})` }}
                          />
                        ))}
                    </div> */}
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="customize">
            {customTheme && (
              <ScrollArea className="ek-h-[500px]">
                <div className="ek-space-y-6 ek-p-2">
                  <div className="ek-flex ek-space-x-4 ek-p-2">
                    <div className="ek-space-y-4">
                      <Label>亮色模式颜色</Label>
                      {Object.entries(customTheme.colors.light || {}).map(
                        ([key, value]) => (
                          <div key={key} className="ek-flex ek-items-center ek-gap-4">
                            <Label className="ek-w-32">{key}</Label>
                            <ColorPicker
                              value={value}
                              onChange={(v) =>
                                updateColor(
                                  'light',
                                  key as keyof ThemeColors,
                                  v
                                )
                              }
                            />
                            <Input
                              value={value}
                              onChange={(e) =>
                                updateColor(
                                  'light',
                                  key as keyof ThemeColors,
                                  e.target.value
                                )
                              }
                              className="ek-flex-1"
                            />
                          </div>
                        )
                      )}
                    </div>

                    <div className="ek-space-y-4">
                      <Label>暗色模式颜色</Label>
                      {Object.entries(customTheme.colors.dark || {}).map(
                        ([key, value]) => (
                          <div key={key} className="ek-flex ek-items-center ek-gap-4">
                            {/* <Label className="ek-w-32">{key}</Label> */}
                            <ColorPicker
                              value={value}
                              onChange={(v) =>
                                updateColor('dark', key as keyof ThemeColors, v)
                              }
                            />
                            <Input
                              value={value}
                              onChange={(e) =>
                                updateColor(
                                  'dark',
                                  key as keyof ThemeColors,
                                  e.target.value
                                )
                              }
                              className="ek-flex-1"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="ek-space-y-4">
                    <Label>圆角</Label>
                    <RadiusSelector
                      value={customTheme.radius}
                      onChange={(v) =>
                        setCustomTheme({ ...customTheme, radius: v })
                      }
                    />
                  </div>

                  <div className="ek-flex ek-items-center ek-gap-4">
                    <Input
                      placeholder="主题名称"
                      value={customTheme.name}
                      onChange={(e) =>
                        setCustomTheme({ ...customTheme, name: e.target.value })
                      }
                    />
                    <Button
                      onClick={() => saveCustomTheme(customTheme.name)}
                      disabled={!customTheme.name}
                    >
                      保存主题
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="custom">
            <div className="ek-grid ek-grid-cols-3 ek-gap-4">
              {customThemes.map((custom) => (
                <Button
                  key={custom.id}
                  variant="outline"
                  onClick={() =>
                    setTheme({
                      preset: custom.id,
                      colors: custom.colors,
                      radius: custom.radius
                    })
                  }
                  className="ek-h-auto ek-p-4"
                >
                  <div className="ek-space-y-2">
                    <div className="ek-text-sm ek-font-semibold">{custom.name}</div>
                    <div className="ek-grid ek-grid-cols-12 ek-gap-1">
                      {Object.values(
                        custom.colors[isDark ? 'dark' : 'light'] || {}
                      )
                        // .slice(0, 5)
                        .map((color, i) => (
                          <div
                            key={i}
                            className="ek-h-3 ek-w-3 ek-border"
                            style={{ background: `hsl(${color})` }}
                          />
                        ))}
                    </div>
                    {/* <div className="ek-grid ek-grid-cols-12 ek-gap-1">
                      {Object.values(custom.colors.dark || {})
                        // .slice(0, 5)
                        .map((color, i) => (
                          <div
                            key={i}
                            className="ek-h-3 ek-w-3 ek-border"
                            style={{ background: `hsl(${color})` }}
                          />
                        ))}
                    </div> */}
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
