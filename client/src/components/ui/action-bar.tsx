import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ActionBarProps {
  children?: React.ReactNode
  className?: string
  variant?: "default" | "mobile-stack"
}

interface ActionBarStatusProps {
  children: React.ReactNode
  className?: string
}

interface ActionBarActionsProps {
  children: React.ReactNode
  className?: string
}

const ActionBar = React.forwardRef<
  HTMLDivElement,
  ActionBarProps
>(({ className, variant = "default", children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between p-4 bg-muted/50 rounded-lg",
      variant === "mobile-stack" && "flex-col space-y-3 sm:flex-row sm:space-y-0",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
ActionBar.displayName = "ActionBar"

const ActionBarStatus = React.forwardRef<
  HTMLDivElement,
  ActionBarStatusProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center space-x-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
ActionBarStatus.displayName = "ActionBarStatus"

const ActionBarActions = React.forwardRef<
  HTMLDivElement,
  ActionBarActionsProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center space-x-2",
      "flex-col space-y-2 w-full sm:flex-row sm:space-y-0 sm:space-x-2 sm:w-auto",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
ActionBarActions.displayName = "ActionBarActions"

export { ActionBar, ActionBarStatus, ActionBarActions }
