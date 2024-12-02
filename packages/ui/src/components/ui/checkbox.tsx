import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "ek-peer ek-h-4 ek-w-4 ek-shrink-0 ek-rounded-sm ek-border ek-border-primary ek-shadow focus-visible:ek-outline-none focus-visible:ek-ring-1 focus-visible:ek-ring-ring disabled:ek-cursor-not-allowed disabled:ek-opacity-50 data-[state=checked]:ek-bg-primary data-[state=checked]:ek-text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("ek-flex ek-items-center ek-justify-center ek-text-current")}
    >
      <Check className="ek-h-4 ek-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
