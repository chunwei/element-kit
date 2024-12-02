import { hexToHsl, hslToHex } from '@/lib/hsl-hex'
import { Input } from '@/components/ui/input'

function ColorPicker({
  value,
  onChange
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-2 p-1 border rounded-md">
      <input
        type="color"
        value={hslToHex(value)}
        onChange={(e) => onChange(hexToHsl(e.target.value))}
        className="h-6 w-6 rounded-sm border appearance-none cursor-pointer"
      />

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 h-6 border-none shadow-none"
      />
    </div>
  )
}

export default ColorPicker
