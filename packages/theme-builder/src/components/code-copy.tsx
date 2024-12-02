import { useState } from 'react'
import { Clipboard, ClipboardCheck } from 'lucide-react'
import { cn } from '@element-kit/ui'

const CodeCopy = ({ code = '', className = '' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        onClick={handleCopy}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label={copied ? 'Copied!' : 'Copy address'}
      >
        {copied ? (
          <ClipboardCheck className="w-3 h-3 text-green-500" />
        ) : (
          <Clipboard className="w-3 h-3 text-gray-500" />
        )}
      </button>
    </div>
  )
}

export default CodeCopy
