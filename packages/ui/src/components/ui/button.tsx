import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "ek-inline-flex ek-items-center ek-justify-center ek-gap-2 ek-whitespace-nowrap ek-rounded-md ek-text-sm ek-font-medium ek-transition-colors focus-visible:ek-outline-none focus-visible:ek-ring-1 focus-visible:ek-ring-ring disabled:ek-pointer-events-none disabled:ek-opacity-50 [&_svg]:ek-pointer-events-none [&_svg]:ek-size-4 [&_svg]:ek-shrink-0",
  {
    variants: {
      variant: {
        default:
          "ek-bg-primary ek-text-primary-foreground ek-shadow hover:ek-bg-primary/90",
        destructive:
          "ek-bg-destructive ek-text-destructive-foreground ek-shadow-sm hover:ek-bg-destructive/90",
        outline:
          "ek-border ek-border-input ek-bg-background ek-shadow-sm hover:ek-bg-accent hover:ek-text-accent-foreground",
        secondary:
          "ek-bg-secondary ek-text-secondary-foreground ek-shadow-sm hover:ek-bg-secondary/80",
        ghost: "hover:ek-bg-accent hover:ek-text-accent-foreground",
        link: "ek-text-primary ek-underline-offset-4 hover:ek-underline",
      },
      size: {
        default: "ek-h-9 ek-px-4 ek-py-2",
        sm: "ek-h-8 ek-rounded-md ek-px-3 ek-text-xs",
        lg: "ek-h-10 ek-rounded-md ek-px-8",
        icon: "ek-h-9 ek-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
