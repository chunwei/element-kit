import { Loader2 } from 'lucide-react'

const Spinner = ({ className = '', size = 'default' }) => {
  const sizeClasses: Record<string, string> = {
    default: 'w-4 h-4',
    sm: 'w-3 h-3',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  }

  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
    </div>
  )
}

export default Spinner
