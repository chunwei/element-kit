import { describe, it, expect } from 'vitest'
import { generateThemePreset, generateAllThemePresets, extractHslChannel } from '../color-preset-generator'
import { colors } from '@/themes/colors'

describe('generateThemePreset', () => {
  it('应该生成有效的主题预设', () => {
    const theme = generateThemePreset('Blue', 'blue')
    
    // 检查基本结构
    expect(theme).toHaveProperty('id', 'blue')
    expect(theme).toHaveProperty('name', 'Blue')
    expect(theme).toHaveProperty('colors')
    expect(theme).toHaveProperty('radius', 0.5)
    expect(theme.colors).toHaveProperty('light')
    expect(theme.colors).toHaveProperty('dark')
  })

  it('应该包含所有必需的颜色键', () => {
    const theme = generateThemePreset('Red', 'red')
    const requiredKeys = [
      'background',
      'foreground',
      'primary',
      'primaryForeground',
      'secondary',
      'secondaryForeground',
      'accent',
      'accentForeground',
      'destructive',
      'destructiveForeground',
      'muted',
      'mutedForeground',
      'card',
      'cardForeground',
      'popover',
      'popoverForeground',
      'border',
      'input',
      'ring'
    ]

    requiredKeys.forEach(key => {
      expect(theme.colors.light).toHaveProperty(key)
      expect(theme.colors.dark).toHaveProperty(key)
    })
  })

  it('应该正确解析 HSL 颜色值', () => {
    const theme = generateThemePreset('Blue', 'blue')
    
    // 使用空格分隔的 HSL 通道格式
    const hslPattern = /^\d+(?:\.\d+)? \d+(?:\.\d+)?% \d+(?:\.\d+)?%$/
    Object.values(theme.colors.light).forEach(color => {
      if (typeof color === 'string' && 
          !['inherit', 'transparent', 'currentColor'].includes(color)) {
        expect(color).toMatch(hslPattern)
      }
    })
  })

  it('应该正确处理特殊颜色值', () => {
    const theme = generateThemePreset('Blue', 'blue')
    
    // 检查特殊颜色值转换
    expect(theme.colors.light.background).toBe('0 0% 100%') // white
    expect(theme.colors.dark.background).toMatch(/^\d{1,3}(?:\.\d+)? \d{1,3}% \d{1,3}%$/) // HSL 格式
  })

  it('应该正确处理基础颜色替换', () => {
    const theme = generateThemePreset('Blue', 'blue')
    const blueScale = colors.blue.find(c => c.scale === 900)
    
    if (blueScale) {
      const primaryHsl = extractHslChannel(blueScale.hsl)
      expect(theme.colors.light.primary).toBe(primaryHsl)
    }
  })

  it('应该为无效的基础颜色抛出错误', () => {
    expect(() => {
      generateThemePreset('Invalid', 'invalidColor' as keyof typeof colors)
    }).toThrow('Invalid base color: invalidColor')
  })

  it('应该生成不同的亮色和暗色模式', () => {
    const theme = generateThemePreset('Green', 'green')
    
    // 检查亮色和暗色模式是否有不同的值
    expect(theme.colors.light.background).not.toBe(theme.colors.dark.background)
    expect(theme.colors.light.primary).not.toBe(theme.colors.dark.primary)
  })

  it('应该正确处理图表颜色', () => {
    const theme = generateThemePreset('Purple', 'purple')
    
    // 检查图表颜色是否存在且格式正确
    for (let i = 1; i <= 5; i++) {
      const key = `chart-${i}` as keyof typeof theme.colors.light
      expect(theme.colors.light[key]).toBeDefined()
      expect(theme.colors.dark[key]).toBeDefined()
    }
  })
})

describe('generateAllThemePresets', () => {
  it('应该生成所有预设主题', () => {
    const presets = generateAllThemePresets()
    
    // 检查是否包含所有基础颜色
    const expectedColors = [
        'slate', 'gray', 'zinc', 'neutral', 'stone',
        // 'red', 'orange', 'amber', 'yellow', 'lime',
        // 'green', 'emerald', 'teal', 'cyan', 'sky',
        // 'blue', 'indigo', 'violet', 'purple', 'fuchsia',
        // 'pink', 'rose'
      ]
    // 检查是否生成了所有颜色的预设
    expect(presets).toHaveLength(expectedColors.length) // 根据实际的颜色数量调整
    
    
    
    expectedColors.forEach(color => {
      expect(presets.find(p => p.id === color)).toBeDefined()
    })
  })

  it('每个生成的预设都应该是有效的', () => {
    const presets = generateAllThemePresets()
    
    presets.forEach(preset => {
      expect(preset).toHaveProperty('id')
      expect(preset).toHaveProperty('name')
      expect(preset).toHaveProperty('colors')
      expect(preset).toHaveProperty('radius')
      expect(preset.colors).toHaveProperty('light')
      expect(preset.colors).toHaveProperty('dark')
    })
  })

  it('生成的预设应该有唯一的 ID', () => {
    const presets = generateAllThemePresets()
    const ids = presets.map(p => p.id)
    const uniqueIds = new Set(ids)
    
    expect(ids.length).toBe(uniqueIds.size)
  })
})

// 测试颜色值转换的辅助函数
describe('颜色值转换', () => {
  it('应该保持颜色值的一致性', () => {
    const theme1 = generateThemePreset('Blue', 'blue')
    const theme2 = generateThemePreset('Blue', 'blue')
    
    // 检查多次生成的主题是否产生相同的颜色值
    expect(theme1.colors.light).toEqual(theme2.colors.light)
    expect(theme1.colors.dark).toEqual(theme2.colors.dark)
  })
}) 