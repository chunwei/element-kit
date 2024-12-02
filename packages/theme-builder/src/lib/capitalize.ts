export function capitalizeFirstLetter(str: string) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function capitalizeWords(str: string) {
  return str
    .split(' ') // 按空格分割单词
    .map((word) => capitalizeFirstLetter(word)) // 每个单词首字母大写
    .join(' ') // 拼接回字符串
}
