import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "ek-flex ek-cursor-default ek-gap-2 ek-select-none ek-items-center ek-rounded-sm ek-px-2 ek-py-1.5 ek-text-sm ek-outline-none focus:ek-bg-accent data-[state=open]:ek-bg-accent [&_svg]:ek-pointer-events-none [&_svg]:ek-size-4 [&_svg]:ek-shrink-0",
      inset && "ek-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ek-ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "ek-z-50 ek-min-w-[8rem] ek-overflow-hidden ek-rounded-md ek-border ek-bg-popover ek-p-1 ek-text-popover-foreground ek-shadow-lg data-[state=open]:ek-animate-in data-[state=closed]:ek-animate-out data-[state=closed]:ek-fade-out-0 data-[state=open]:ek-fade-in-0 data-[state=closed]:ek-zoom-out-95 data-[state=open]:ek-zoom-in-95 data-[side=bottom]:ek-slide-in-from-top-2 data-[side=left]:ek-slide-in-from-right-2 data-[side=right]:ek-slide-in-from-left-2 data-[side=top]:ek-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "ek-z-50 ek-min-w-[8rem] ek-overflow-hidden ek-rounded-md ek-border ek-bg-popover ek-p-1 ek-text-popover-foreground ek-shadow-md",
        "data-[state=open]:ek-animate-in data-[state=closed]:ek-animate-out data-[state=closed]:ek-fade-out-0 data-[state=open]:ek-fade-in-0 data-[state=closed]:ek-zoom-out-95 data-[state=open]:ek-zoom-in-95 data-[side=bottom]:ek-slide-in-from-top-2 data-[side=left]:ek-slide-in-from-right-2 data-[side=right]:ek-slide-in-from-left-2 data-[side=top]:ek-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "ek-relative ek-flex ek-cursor-default ek-select-none ek-items-center ek-gap-2 ek-rounded-sm ek-px-2 ek-py-1.5 ek-text-sm ek-outline-none ek-transition-colors focus:ek-bg-accent focus:ek-text-accent-foreground data-[disabled]:ek-pointer-events-none data-[disabled]:ek-opacity-50 [&>svg]:ek-size-4 [&>svg]:ek-shrink-0",
      inset && "ek-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "ek-relative ek-flex ek-cursor-default ek-select-none ek-items-center ek-rounded-sm ek-py-1.5 ek-pl-8 ek-pr-2 ek-text-sm ek-outline-none ek-transition-colors focus:ek-bg-accent focus:ek-text-accent-foreground data-[disabled]:ek-pointer-events-none data-[disabled]:ek-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="ek-absolute ek-left-2 ek-flex ek-h-3.5 ek-w-3.5 ek-items-center ek-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="ek-h-4 ek-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "ek-relative ek-flex ek-cursor-default ek-select-none ek-items-center ek-rounded-sm ek-py-1.5 ek-pl-8 ek-pr-2 ek-text-sm ek-outline-none ek-transition-colors focus:ek-bg-accent focus:ek-text-accent-foreground data-[disabled]:ek-pointer-events-none data-[disabled]:ek-opacity-50",
      className
    )}
    {...props}
  >
    <span className="ek-absolute ek-left-2 ek-flex ek-h-3.5 ek-w-3.5 ek-items-center ek-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="ek-h-2 ek-w-2 ek-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "ek-px-2 ek-py-1.5 ek-text-sm ek-font-semibold",
      inset && "ek-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("ek--mx-1 ek-my-1 ek-h-px ek-bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ek-ml-auto ek-text-xs ek-tracking-widest ek-opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
