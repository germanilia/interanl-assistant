import * as React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  children?: React.ReactNode
  className?: string
}

interface PageHeaderContentProps {
  children: React.ReactNode
  className?: string
}

interface PageHeaderActionsProps {
  children: React.ReactNode
  className?: string
}

const PageHeader = React.forwardRef<
  HTMLDivElement,
  PageHeaderProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
PageHeader.displayName = "PageHeader"

const PageHeaderContent = React.forwardRef<
  HTMLDivElement,
  PageHeaderContentProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 min-w-0", className)}
    {...props}
  >
    {children}
  </div>
))
PageHeaderContent.displayName = "PageHeaderContent"

const PageHeaderActions = React.forwardRef<
  HTMLDivElement,
  PageHeaderActionsProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-2 w-full sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2 sm:w-auto",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
PageHeaderActions.displayName = "PageHeaderActions"

export { PageHeader, PageHeaderContent, PageHeaderActions }
