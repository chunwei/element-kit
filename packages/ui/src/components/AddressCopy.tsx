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
    <div className="ek-flex ek-items-center ek-gap-2">
      <span className="ek-text-xs ek-font-mono">{abbr(address)}</span>
      <button
        onClick={handleCopy}
        className="ek-p-1 hover:ek-bg-gray-100 ek-rounded-full ek-transition-colors ek-duration-200"
        aria-label={copied ? 'Copied!' : 'Copy address'}
      >
        {copied ? (
          <Check className="ek-w-3 ek-h-3 ek-text-green-500" />
        ) : (
          <Copy className="ek-w-3 ek-h-3 ek-text-gray-500" />
        )}
      </button>
    </div>
  )
}

export default AddressCopy
