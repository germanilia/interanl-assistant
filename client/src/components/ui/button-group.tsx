import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "mobile-stack" | "mobile-wrap"
}

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  ButtonGroupProps
>(({ className, variant = "default", children, ...props }, ref) => {
  const baseClasses = "flex items-center"
  
  const variantClasses = {
    default: "space-x-2",
    "mobile-stack": "flex-col space-y-2 w-full sm:flex-row sm:space-y-0 sm:space-x-2 sm:w-auto",
    "mobile-wrap": "flex-wrap gap-2"
  }

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
