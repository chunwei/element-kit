import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "ek-flex ek-h-9 ek-w-full ek-items-center ek-justify-between ek-whitespace-nowrap ek-rounded-md ek-border ek-border-input ek-bg-transparent ek-px-3 ek-py-2 ek-text-sm ek-shadow-sm ek-ring-offset-background placeholder:ek-text-muted-foreground focus:ek-outline-none focus:ek-ring-1 focus:ek-ring-ring disabled:ek-cursor-not-allowed disabled:ek-opacity-50 [&>span]:ek-line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="ek-h-4 ek-w-4 ek-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "ek-flex ek-cursor-default ek-items-center ek-justify-center ek-py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="ek-h-4 ek-w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "ek-flex ek-cursor-default ek-items-center ek-justify-center ek-py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="ek-h-4 ek-w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "ek-relative ek-z-50 ek-max-h-96 ek-min-w-[8rem] ek-overflow-hidden ek-rounded-md ek-border ek-bg-popover ek-text-popover-foreground ek-shadow-md data-[state=open]:ek-animate-in data-[state=closed]:ek-animate-out data-[state=closed]:ek-fade-out-0 data-[state=open]:ek-fade-in-0 data-[state=closed]:ek-zoom-out-95 data-[state=open]:ek-zoom-in-95 data-[side=bottom]:ek-slide-in-from-top-2 data-[side=left]:ek-slide-in-from-right-2 data-[side=right]:ek-slide-in-from-left-2 data-[side=top]:ek-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:ek-translate-y-1 data-[side=left]:ek--translate-x-1 data-[side=right]:ek-translate-x-1 data-[side=top]:ek--translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "ek-p-1",
          position === "popper" &&
            "ek-h-[var(--radix-select-trigger-height)] ek-w-full ek-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("ek-px-2 ek-py-1.5 ek-text-sm ek-font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "ek-relative ek-flex ek-w-full ek-cursor-default ek-select-none ek-items-center ek-rounded-sm ek-py-1.5 ek-pl-2 ek-pr-8 ek-text-sm ek-outline-none focus:ek-bg-accent focus:ek-text-accent-foreground data-[disabled]:ek-pointer-events-none data-[disabled]:ek-opacity-50",
      className
    )}
    {...props}
  >
    <span className="ek-absolute ek-right-2 ek-flex ek-h-3.5 ek-w-3.5 ek-items-center ek-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="ek-h-4 ek-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("ek--mx-1 ek-my-1 ek-h-px ek-bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
