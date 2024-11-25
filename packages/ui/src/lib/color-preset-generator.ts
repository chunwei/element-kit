import { colors, colorMapping } from '@/themes/colors'
import { ThemeBase, ThemeColors } from '@/types'

type ColorScale = {
  scale: number
  hex: string
  rgb: string
  hsl: string
}

// 从 HSL 字符串中提取通道值并用空格分隔
export function extractHslChannel(hsl: string): string {
  return hsl.replace(
    /^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/,
    '$1 $2 $3'
  )
}

// 获取颜色的 HSL 通道值
function getHslFromColorScale(colorScales: ColorScale[], scale: number): string {
  const color = colorScales.find(c => c.scale === scale)
  if (!color) return ''
  return extractHslChannel(color.hsl)
}

// 将基础颜色转换为 HSL 通道格式
function convertToHsl(color: string): string {
  switch (color) {
    case 'white':
      return '0 0% 100%'
    case 'black':
      return '0 0% 0%'
    case 'transparent':
      return 'transparent'
    case 'inherit':
      return 'inherit'
    case 'currentColor':
      return 'currentColor'
    default:
      return color.includes('hsl') ? extractHslChannel(color) : color
  }
}

// 解析颜色映射中的变量
function parseColorValue(
  value: string,
  baseColor: string,
  colorScales: ColorScale[]
): string {
  if (value.includes('{{base}}')) {
    const scale = parseInt(value.split('-')[1])
    return getHslFromColorScale(colorScales, scale)
  }
  
  if (value.includes('-')) {
    const [colorName, scale] = value.split('-')
    const colorScales = colors[colorName as keyof typeof colors] as ColorScale[]
    if (Array.isArray(colorScales)) {
      return getHslFromColorScale(colorScales, parseInt(scale))
    }
  }

  return convertToHsl(value)
}

// 生成主题预设
export function generateThemePreset(
  name: string,
  baseColor: keyof typeof colors
): ThemeBase & { id: string; name: string } {
  const colorScales = colors[baseColor] as ColorScale[]
  if (!colorScales || !Array.isArray(colorScales)) {
    throw new Error(`Invalid base color: ${baseColor}`)
  }

  // 生成亮色主题颜色
  const lightColors = Object.entries(colorMapping.light).reduce<Partial<ThemeColors>>(
    (acc, [key, value]) => ({
      ...acc,
      [key.replace(/-([a-z])/g, (_, p1) => p1.toUpperCase())]: parseColorValue(value, baseColor, colorScales)
    }),
    {}
  )

  // 生成暗色主题颜色
  const darkColors = Object.entries(colorMapping.dark).reduce<Partial<ThemeColors>>(
    (acc, [key, value]) => ({
      ...acc,
      [key.replace(/-([a-z])/g, (_, p1) => p1.toUpperCase())]: parseColorValue(value, baseColor, colorScales)
    }),
    {}
  )

  return {
    id: baseColor,
    name,
    colors: {
      light: lightColors,
      dark: darkColors
    },
    radius: 0.5
  }
}

// 生成所有预设主题
export function generateAllThemePresets(): (ThemeBase & {
  id: string
  name: string
})[] {
  const baseColors = [
    { id: 'slate', name: 'Slate' },
    { id: 'gray', name: 'Gray' },
    { id: 'zinc', name: 'Zinc' },
    { id: 'neutral', name: 'Neutral' },
    { id: 'stone', name: 'Stone' }
  ]

  return baseColors.map(({ id, name }) =>
    generateThemePreset(name, id as keyof typeof colors)
  )
}

// 使用示例：
// const allPresets = generateAllThemePresets()
// const redTheme = generateThemePreset('Red', 'red') 
// console.log({redTheme})