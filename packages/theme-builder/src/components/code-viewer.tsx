import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import React from 'react'
import CodeCopy from './code-copy'

function CodeViewer({ className }: { className?: string }) {
  const { theme } = useTheme()
  const themeCode = React.useMemo(() => {
    const { name, id, mode, ...other } = theme
    return JSON.stringify(other, null, 2)
  }, [theme])

  return (
    <div
      data-rehype-pretty-code-fragment
      className={cn(
        'relative w-full h-full px-6 overflow-auto rounded-lg bg-zinc-800  py-6',
        className
      )}
    >
      <CodeCopy className="absolute top-4 right-4" code={themeCode} />
      <pre className="py-4 h-full overflow-auto bg-zinc-800 font-mono text-sm leading-relaxed">
        <code data-line-numbers="">
          <span className="line text-gray-400">{`/* ${theme.name} */`}</span>
          {/* {themeCode} */}
          {themeCode.split('\n').map((line, index) => {
            // 正则匹配 JSON 的 key 和 value 结构
            const match = line.match(/^\s*(?:"(.*?)")?\s*(?::)?\s*(.*)?$/)
            if (!match) {
              // 返回普通行（如 `{`, `}` 等）
              return (
                <span
                  className="line block whitespace-pre font-mono"
                  key={index}
                >
                  {line}
                </span>
              )
            }

            const [, rawKey, rawValue] = match
            const key = rawKey ? (
              <span className="text-sky-300">{rawKey}</span>
            ) : null
            const colon = rawKey ? (
              <span className="text-gray-400">:</span>
            ) : null
            let value: React.ReactNode = rawValue

            if (rawValue) {
              // 判断 value 的类型
              if (
                rawValue.startsWith('"') &&
                (rawValue.endsWith('"') || rawValue.endsWith('",'))
              ) {
                const hasTrailingComma = rawValue.endsWith('",')
                const innerValue = hasTrailingComma
                  ? rawValue.slice(1, -2) // 去掉双引号和逗号
                  : rawValue.slice(1, -1) // 去掉双引号

                value = (
                  <>
                    <span className="text-gray-400">"</span>
                    <span className="text-emerald-500">{innerValue}</span>
                    <span className="text-gray-400">"</span>
                    {hasTrailingComma && (
                      <span className="text-gray-400">,</span>
                    )}
                  </>
                )
              } else if (/^\d+$|true|false|null/.test(rawValue.trim())) {
                // 数字、布尔值、null
                value = (
                  <span className="text-emerald-500">{rawValue.trim()}</span>
                )
              }
            }

            return (
              <span className="line block whitespace-pre font-mono" key={index}>
                {line.match(/^\s*/)?.[0]} {/* 保留缩进 */}
                {key}
                {colon && ' '}
                {colon}
                {colon && ' '}
                {value}
              </span>
            )
          })}
        </code>
      </pre>
    </div>
  )
}

export default CodeViewer
