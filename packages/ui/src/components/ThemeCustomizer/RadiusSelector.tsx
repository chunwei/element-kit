import { Input } from '../ui/input'
import { Button } from '../ui/button'

const RADIUS_PRESETS = [
  { label: '无', value: 0 },
  { label: '小', value: 0.3 },
  { label: '中', value: 0.5 },
  { label: '大', value: 0.75 },
  { label: '全圆', value: 1 }
]

interface RadiusSelectorProps {
  value: number
  onChange: (value: number) => void
}

export function RadiusSelector({ value, onChange }: RadiusSelectorProps) {
  return (
    <div className="ek-space-y-4">
      <div className="ek-flex ek-items-center ek-gap-2">
        {RADIUS_PRESETS.map((preset) => (
          <Button
            key={preset.value}
            variant={value === preset.value ? 'default' : 'outline'}
            onClick={() => onChange(preset.value)}
          >
            {preset.label}
          </Button>
        ))}
        {/* </div>
      <div className="ek-flex ek-items-center ek-gap-4"> */}
        {/* <Label>自定义圆角</Label> */}
        <Input
          type="number"
          min={0}
          max={1}
          step={0.1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
