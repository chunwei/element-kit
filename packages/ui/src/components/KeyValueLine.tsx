import { cn } from '@/lib/utils'

interface Props {
  k: string
  v: React.ReactNode
  className?: string
}
const KeyValueLine = (props: Props) => {
  const { k, v, className } = props
  return (
    <div
      className={cn('flex items-center justify-between space-x-4', className)}
    >
      <div className="ek-text-muted-foreground">{k}</div>
      <div className="ek-font-semibold">{v}</div>
    </div>
  )
}

export default KeyValueLine
