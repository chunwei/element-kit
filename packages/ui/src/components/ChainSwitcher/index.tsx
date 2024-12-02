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
        <Button variant="outline" className="ek-flex ek-gap-2" disabled={disabled}>
          <span className="ek-w-4 ek-h-4">
            {currentChain
              ? chainIcons[
                  elementChains[currentChain].chainId as keyof typeof chainIcons
                ]?.['color'] //[isDark ? 'dark' : 'light']
              : ''}
          </span>
          <span>{currentChain?.toUpperCase() || 'Select Chain'}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="ek-w-[200px]">
        {SUPPORTED_CHAINS.map((chain) => (
          <DropdownMenuItem
            key={chain}
            onClick={() => onChainChange(chain)}
            className="ek-flex ek-items-center ek-justify-between"
          >
            <div className="ek-flex ek-items-center ek-justify-between ek-gap-3">
              <span className="ek-w-4 ek-h-4">
                {
                  chainIcons[
                    elementChains[chain]?.chainId as keyof typeof chainIcons
                  ]?.['color']
                }
              </span>
              <span>{chain.toUpperCase()}</span>
            </div>
            {currentChain === chain && <Check className="ek-h-4 ek-w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
