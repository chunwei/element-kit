import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "ek-relative ek-flex ek-w-full ek-touch-none ek-select-none ek-items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="ek-relative ek-h-1.5 ek-w-full ek-grow ek-overflow-hidden ek-rounded-full ek-bg-primary/20">
      <SliderPrimitive.Range className="ek-absolute ek-h-full ek-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="ek-block ek-h-4 ek-w-4 ek-rounded-full ek-border ek-border-primary/50 ek-bg-background ek-shadow ek-transition-colors focus-visible:ek-outline-none focus-visible:ek-ring-1 focus-visible:ek-ring-ring disabled:ek-pointer-events-none disabled:ek-opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
