import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ek-flex ek-h-9 ek-w-full ek-rounded-md ek-border ek-border-input ek-bg-transparent ek-px-3 ek-py-1 ek-text-base ek-shadow-sm ek-transition-colors file:ek-border-0 file:ek-bg-transparent file:ek-text-sm file:ek-font-medium file:ek-text-foreground placeholder:ek-text-muted-foreground focus-visible:ek-outline-none focus-visible:ek-ring-1 focus-visible:ek-ring-ring disabled:ek-cursor-not-allowed disabled:ek-opacity-50 md:ek-text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
