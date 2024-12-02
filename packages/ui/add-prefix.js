const fs = require('fs')
const path = require('path')

// 配置目标目录
const targetDir = './src'

// 配置包含和排除规则
const includes = ['components', 'modals'] // 包含的目录（相对路径）
const excludes = ['components/ui'] // 排除的目录或文件名（相对路径）

/**
 * 检查文件路径是否应被处理
 * @param {string} filePath - 文件路径
 * @returns {boolean} 是否应被处理
 */
function shouldProcess(filePath) {
  // 转为相对路径，便于匹配
  const relativePath = path.relative(targetDir, filePath)
  // 如果在排除列表中，直接返回 false
  if (excludes.some((exclude) => relativePath.startsWith(exclude))) {
    return false
  }
  // 如果 includes 不为空，且不在包含列表中，返回 false
  if (
    includes.length > 0 &&
    !includes.some((include) => relativePath.startsWith(include))
  ) {
    return false
  }
  return true
}

/**
 * 递归获取目录下的所有文件
 * @param {string} dir - 目录路径
 * @returns {string[]} 文件路径列表
 */
function getFiles(dir) {
  let files = []
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getFiles(fullPath))
    } else if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
      files.push(fullPath)
    }
  })
  return files.filter(shouldProcess)
}

/**
 * 为 className 中的类名添加前缀
 * @param {string} file - 文件路径
 */
function addPrefixToClassNames(file) {
  const content = fs.readFileSync(file, 'utf-8')
  const updatedContent = content.replace(
    /className\s*=\s*["']([^"']*)["']/g,
    (match, classNames) => {
      const prefixed = classNames
        .split(/\s+/)
        .filter((cls) => cls && cls.trim().length > 0)
        .map((cls) => {
          // 跳过已经有前缀的类名
          if (cls.startsWith('ek-')) return cls

          // 如果是 Tailwind 的变种类（如 sm:max-w-[425px]）
          const parts = cls.split(':')
          if (parts.length > 1) {
            const variant = parts[0] // 变种前缀（如 sm）
            const coreClass = parts.slice(1).join(':') // 核心类名（如 max-w-[425px]）

            // 判断 coreClass 是否已带有前缀
            const prefixedCoreClass = coreClass.startsWith('ek-')
              ? coreClass
              : `ek-${coreClass}`
            return `${variant}:${prefixedCoreClass}`
          }

          // 普通类名直接加前缀
          return `ek-${cls}`
        })
        .join(' ')
      console.log('------')
      console.log(classNames, ' --> \n', prefixed)
      return `className="${prefixed}"`
    }
  )
  fs.writeFileSync(file, updatedContent, 'utf-8')
  console.log(`Processed: ${file}`)
}

// 开始处理
const files = getFiles(targetDir)
console.log(files)
files.forEach((file) => addPrefixToClassNames(file))
console.log('Prefix added to className in all files.')
