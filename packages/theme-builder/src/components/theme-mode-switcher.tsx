import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

function ThemeModeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <Tabs
        value={theme.mode}
        defaultValue={theme.mode}
        onValueChange={(mode) => setTheme({ ...theme, mode })}
      >
        <TabsList className="h-7  gap-1.5 rounded-md  p-1">
          <TabsTrigger
            value="light"
            className="h-[22px] w-[22px] rounded-sm p-0"
          >
            <Sun className="h-3.5 w-3.5" />
          </TabsTrigger>
          <TabsTrigger
            value="dark"
            className="h-[22px] w-[22px] rounded-sm p-0"
          >
            <Moon className="h-3.5 w-3.5" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default ThemeModeSwitcher
