'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'ek-fixed ek-inset-0 ek-z-50 ek-bg-black/80 ek- data-[state=open]:ek-animate-in data-[state=closed]:ek-animate-out data-[state=closed]:ek-fade-out-0 data-[state=open]:ek-fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    portalContainer?: HTMLElement | null
    overlayClass?: string
  }
>(({ className, children, portalContainer, overlayClass, ...props }, ref) => (
  <DialogPortal container={portalContainer}>
    <DialogOverlay
      className={cn(
        'shadcn-dialog-overlay',
        overlayClass,
        portalContainer ? 'ek-absolute' : 'ek-fixed'
      )}
    />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        portalContainer ? 'ek-absolute' : 'ek-fixed',
        'ek-left-[50%] ek-top-[50%] ek-z-50 ek-grid ek-w-full ek-max-w-lg ek-translate-x-[-50%] ek-translate-y-[-50%] ek-gap-4 ek-border ek-bg-background ek-p-6 ek-shadow-lg ek-duration-200 data-[state=open]:ek-animate-in data-[state=closed]:ek-animate-out data-[state=closed]:ek-fade-out-0 data-[state=open]:ek-fade-in-0 data-[state=closed]:ek-zoom-out-95 data-[state=open]:ek-zoom-in-95 data-[state=closed]:ek-slide-out-to-left-1/2 data-[state=closed]:ek-slide-out-to-top-[48%] data-[state=open]:ek-slide-in-from-left-1/2 data-[state=open]:ek-slide-in-from-top-[48%] sm:ek-rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="ek-absolute ek-right-4 ek-top-4 ek-rounded-sm ek-opacity-70 ek-ring-offset-background ek-transition-opacity hover:ek-opacity-100 focus:ek-outline-none focus:ek-ring-2 focus:ek-ring-ring focus:ek-ring-offset-2 disabled:ek-pointer-events-none data-[state=open]:ek-bg-accent data-[state=open]:ek-text-muted-foreground">
        <X className="ek-h-4 ek-w-4" />
        <span className="ek-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ek-flex ek-flex-col ek-space-y-1.5 ek-text-center sm:ek-text-left',
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ek-flex ek-flex-col-reverse sm:ek-flex-row sm:ek-justify-end sm:ek-space-x-2',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'ek-text-lg ek-font-semibold ek-leading-none ek-tracking-tight',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('ek-text-sm ek-text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
}
