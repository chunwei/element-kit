import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from './ui/slider'

const RADIUS_PRESETS = [
  { label: '无', value: 0 },
  { label: '小', value: 0.25 },
  { label: '中', value: 0.5 },
  { label: '大', value: 0.75 },
  { label: '全', value: 1 }
]

interface RadiusSelectorProps {
  value: number
  onChange: (value: number) => void
}

export function RadiusSelector({ value, onChange }: RadiusSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <RadioGroup
          defaultValue={`${value}`}
          onValueChange={(v) => onChange(Number(v))}
          className="grid grid-cols-5 gap-2"
        >
          {RADIUS_PRESETS.map(({ value, label }) => (
            <div className="text-center">
              <RadioGroupItem
                value={`${value}`}
                id={label}
                className="peer sr-only"
              />
              <Label
                htmlFor={label}
                className="mb-1 flex flex-col items-center justify-between  cursor-pointer rounded-sm border border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                {/* 圆角预览方块 */}
                <div
                  className="min-w-8 min-h-8  border-gray-400  border-2"
                  style={{ borderRadius: `${Number(value) * 1}rem` }}
                ></div>
              </Label>
              {label}
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex items-center gap-2">
        <Slider
          className="flex-1 cursor-pointer "
          // type="number"
          min={0}
          max={3}
          step={0.1}
          value={[value]}
          onValueChange={(value) => onChange(Number(value))}
        />
        <span>{value} rem</span>
      </div>
    </div>
  )
}
