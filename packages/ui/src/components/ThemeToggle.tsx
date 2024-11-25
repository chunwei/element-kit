import { useTheme } from '../hooks/useTheme'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { mode, setMode } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {mode === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}