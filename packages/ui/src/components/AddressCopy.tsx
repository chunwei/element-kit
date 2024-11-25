import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { abbr } from '@/lib/address'

const AddressCopy = ({ address = '' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono">{abbr(address)}</span>
      <button
        onClick={handleCopy}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label={copied ? 'Copied!' : 'Copy address'}
      >
        {copied ? (
          <Check className="w-3 h-3 text-green-500" />
        ) : (
          <Copy className="w-3 h-3 text-gray-500" />
        )}
      </button>
    </div>
  )
}

export default AddressCopy
