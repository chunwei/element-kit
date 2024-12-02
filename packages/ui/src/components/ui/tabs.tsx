import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "ek-inline-flex ek-h-9 ek-items-center ek-justify-center ek-rounded-lg ek-bg-muted ek-p-1 ek-text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "ek-inline-flex ek-items-center ek-justify-center ek-whitespace-nowrap ek-rounded-md ek-px-3 ek-py-1 ek-text-sm ek-font-medium ek-ring-offset-background ek-transition-all focus-visible:ek-outline-none focus-visible:ek-ring-2 focus-visible:ek-ring-ring focus-visible:ek-ring-offset-2 disabled:ek-pointer-events-none disabled:ek-opacity-50 data-[state=active]:ek-bg-background data-[state=active]:ek-text-foreground data-[state=active]:ek-shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ek-mt-2 ek-ring-offset-background focus-visible:ek-outline-none focus-visible:ek-ring-2 focus-visible:ek-ring-ring focus-visible:ek-ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
