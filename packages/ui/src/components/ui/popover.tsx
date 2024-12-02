import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "ek-z-50 ek-w-72 ek-rounded-md ek-border ek-bg-popover ek-p-4 ek-text-popover-foreground ek-shadow-md ek-outline-none data-[state=open]:ek-animate-in data-[state=closed]:ek-animate-out data-[state=closed]:ek-fade-out-0 data-[state=open]:ek-fade-in-0 data-[state=closed]:ek-zoom-out-95 data-[state=open]:ek-zoom-in-95 data-[side=bottom]:ek-slide-in-from-top-2 data-[side=left]:ek-slide-in-from-right-2 data-[side=right]:ek-slide-in-from-left-2 data-[side=top]:ek-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
