import { FC } from 'react'
import { Check } from 'lucide-react'
import { SUPPORTED_CHAINS } from '@/constants/constants'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import chainIcons from '@/constants/chainIcons'
import { elementChains } from '@/constants/chains'
import { useTheme } from '@/hooks/useTheme'

interface ChainSwitcherProps {
  currentChain?: string
  onChainChange: (chain: string) => void
  disabled?: boolean
}

export const ChainSwitcher: FC<ChainSwitcherProps> = ({
  currentChain,
  onChainChange,
  disabled = false
}) => {
  const { theme } = useTheme()
  const isDark = theme.mode === 'dark'
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2" disabled={disabled}>
          <span className="w-4 h-4">
            {currentChain
              ? chainIcons[
                  elementChains[currentChain].chainId as keyof typeof chainIcons
                ]?.['color'] //[isDark ? 'dark' : 'light']
              : ''}
          </span>
          <span>{currentChain?.toUpperCase() || 'Select Chain'}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px]">
        {SUPPORTED_CHAINS.map((chain) => (
          <DropdownMenuItem
            key={chain}
            onClick={() => onChainChange(chain)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="w-4 h-4">
                {
                  chainIcons[
                    elementChains[chain]?.chainId as keyof typeof chainIcons
                  ]?.['color']
                }
              </span>
              <span>{chain.toUpperCase()}</span>
            </div>
            {currentChain === chain && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
