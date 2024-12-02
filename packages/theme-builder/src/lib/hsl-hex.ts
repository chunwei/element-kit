/** 将 HSL 转换为 hex */
export const hslToHex = (hsl: string) => {
  const [h, s, l] = hsl.split(' ').map((v) => parseFloat(v))
  const sPercent = s / 100
  const lPercent = l / 100

  const c = (1 - Math.abs(2 * lPercent - 1)) * sPercent
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lPercent - c / 2
  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  const rHex = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, '0')
  const gHex = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, '0')
  const bHex = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, '0')

  return `#${rHex}${gHex}${bHex}`
}

/** 将 hex 转换为 HSL */
export const hexToHsl = (hex: string) => {
  // 移除 # 号
  hex = hex.replace('#', '')

  // 转换为 RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h *= 60
  }

  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}
