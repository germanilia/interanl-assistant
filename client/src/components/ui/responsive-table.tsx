import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ResponsiveTableProps {
  children: React.ReactNode
  className?: string
  mobileCardView?: boolean
}

interface MobileCardProps {
  children: React.ReactNode
  className?: string
}

const ResponsiveTable = React.forwardRef<
  HTMLDivElement,
  ResponsiveTableProps
>(({ className, mobileCardView = false, children, ...props }, ref) => {
  if (mobileCardView) {
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            {children}
          </Table>
        </div>
        {/* Mobile Card View - will be handled by parent component */}
        <div className="md:hidden">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className={cn("relative w-full", className)} {...props}>
      {/* Horizontal scroll for mobile */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          {children}
        </Table>
      </div>
    </div>
  )
})
ResponsiveTable.displayName = "ResponsiveTable"

const MobileCard = React.forwardRef<
  HTMLDivElement,
  MobileCardProps
>(({ className, children, ...props }, ref) => (
  <Card ref={ref} className={cn("md:hidden", className)} {...props}>
    <CardContent className="p-4">
      {children}
    </CardContent>
  </Card>
))
MobileCard.displayName = "MobileCard"

const MobileCardField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    label: string
    value: React.ReactNode
  }
>(({ className, label, value, ...props }, ref) => (
  <div ref={ref} className={cn("flex justify-between items-start py-2 border-b border-border last:border-b-0", className)} {...props}>
    <span className="text-sm font-medium text-muted-foreground min-w-0 flex-shrink-0 mr-4">
      {label}:
    </span>
    <div className="text-sm text-right min-w-0 flex-1">
      {value}
    </div>
  </div>
))
MobileCardField.displayName = "MobileCardField"

export { ResponsiveTable, MobileCard, MobileCardField }
