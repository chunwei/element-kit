/**
 * 根据 token accuracy 控制数字显示精度
 * @param value 需要格式化的数字
 * @param accuracy 精度位数
 * @param options 额外配置选项
 * @returns 格式化后的字符串
 */
export function formatTokenAmount(
  value: number | string,
  accuracy: number = 5,
  options: {
    keepTrailingZeros?: boolean; // 是否保留末尾的0
    roundingMode?: 'floor' | 'ceil' | 'round'; // 舍入模式
  } = {}
): string {
  const { keepTrailingZeros = false, roundingMode = 'round' } = options
  
  // 转换为数字
  const num = typeof value === 'string' ? parseFloat(value) : value
  
  if (isNaN(num)) return '0'
  
  // 根据舍入模式选择处理方法
  let rounded: number
  const multiplier = Math.pow(10, accuracy)
  
  switch (roundingMode) {
    case 'floor':
      rounded = Math.floor(num * multiplier) / multiplier
      break
    case 'ceil':
      rounded = Math.ceil(num * multiplier) / multiplier
      break
    default:
      rounded = Math.round(num * multiplier) / multiplier
  }
  
  if (keepTrailingZeros) {
    // 保留末尾0
    return rounded.toFixed(accuracy)
  }
  
  // 不保留末尾0
  return rounded.toString()
}

// 使用示例:
/*
formatTokenAmount(1.23456789, 4) // "1.2346"
formatTokenAmount(1.23456789, 4, { keepTrailingZeros: true }) // "1.2346"
formatTokenAmount(1.2, 4, { keepTrailingZeros: true }) // "1.2000"
formatTokenAmount(1.23456789, 4, { roundingMode: 'floor' }) // "1.2345"
*/ 