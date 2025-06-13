import * as React from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { LucideIcon } from "lucide-react"

/**
 * Button Style Guide and Helper Components
 * 
 * This file defines consistent button styling patterns across the application:
 * 
 * 1. Primary actions: Use 'default' variant (blue background)
 * 2. Secondary actions: Use 'outline' variant (border with transparent background)
 * 3. Destructive actions: Use 'destructive' variant (red background)
 * 4. Icon-only actions: Use 'ghost' variant with size="icon"
 * 5. Table row actions: Use 'ghost' variant with size="sm"
 * 6. Header actions: Use 'default' for primary, 'outline' for secondary
 */

// Standard button combinations for common use cases

interface ActionButtonsProps {
  onPrimary?: () => void
  onSecondary?: () => void
  onCancel?: () => void
  primaryLabel?: string
  secondaryLabel?: string
  cancelLabel?: string
  primaryIcon?: LucideIcon
  secondaryIcon?: LucideIcon
  disabled?: boolean
  loading?: boolean
}

/**
 * Standard action buttons for dialogs and forms
 * Primary action (default variant) + Secondary action (outline variant) + Cancel (outline variant)
 */
export const DialogActionButtons: React.FC<ActionButtonsProps> = ({
  onPrimary,
  onSecondary,
  onCancel,
  primaryLabel = "Save",
  secondaryLabel,
  cancelLabel = "Cancel",
  primaryIcon: PrimaryIcon,
  secondaryIcon: SecondaryIcon,
  disabled = false,
  loading = false
}) => {
  return (
    <ButtonGroup>
      {onCancel && (
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          {cancelLabel}
        </Button>
      )}
      {onSecondary && secondaryLabel && (
        <Button variant="outline" onClick={onSecondary} disabled={disabled || loading}>
          {SecondaryIcon && <SecondaryIcon className="mr-2 h-4 w-4" />}
          {secondaryLabel}
        </Button>
      )}
      {onPrimary && (
        <Button onClick={onPrimary} disabled={disabled || loading}>
          {PrimaryIcon && <PrimaryIcon className="mr-2 h-4 w-4" />}
          {primaryLabel}
        </Button>
      )}
    </ButtonGroup>
  )
}

interface HeaderActionButtonsProps {
  primaryAction?: {
    label: string
    icon?: LucideIcon
    onClick: () => void
  }
  secondaryActions?: Array<{
    label: string
    icon?: LucideIcon
    onClick: () => void
  }>
}

/**
 * Standard header action buttons
 * Primary action (default variant) + Secondary actions (outline variant)
 */
export const HeaderActionButtons: React.FC<HeaderActionButtonsProps> = ({
  primaryAction,
  secondaryActions = []
}) => {
  return (
    <ButtonGroup variant="mobile-wrap">
      {secondaryActions.map((action, index) => {
        const Icon = action.icon
        return (
          <Button
            key={index}
            variant="outline"
            className="w-full sm:w-auto"
            onClick={action.onClick}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {action.label}
          </Button>
        )
      })}
      {primaryAction && (
        <Button className="w-full sm:w-auto" onClick={primaryAction.onClick}>
          {primaryAction.icon && <primaryAction.icon className="mr-2 h-4 w-4" />}
          {primaryAction.label}
        </Button>
      )}
    </ButtonGroup>
  )
}

interface TableActionButtonsProps {
  actions: Array<{
    icon: LucideIcon
    onClick: () => void
    tooltip?: string
    variant?: "ghost" | "destructive"
  }>
}

/**
 * Standard table row action buttons
 * All actions use ghost variant with small size for compact display
 */
export const TableActionButtons: React.FC<TableActionButtonsProps> = ({
  actions
}) => {
  return (
    <ButtonGroup variant="mobile-wrap">
      {actions.map((action, index) => {
        const Icon = action.icon
        return (
          <Button
            key={index}
            variant={action.variant || "ghost"}
            size="sm"
            onClick={action.onClick}
            title={action.tooltip}
          >
            <Icon className="h-4 w-4" />
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

interface CardActionButtonsProps {
  actions: Array<{
    label: string
    icon?: LucideIcon
    onClick: () => void
    variant?: "default" | "outline" | "destructive"
    disabled?: boolean
  }>
}

/**
 * Standard card action buttons
 * Mixed variants based on action importance
 */
export const CardActionButtons: React.FC<CardActionButtonsProps> = ({
  actions
}) => {
  return (
    <ButtonGroup variant="mobile-wrap">
      {actions.map((action, index) => {
        const Icon = action.icon
        return (
          <Button
            key={index}
            variant={action.variant || "outline"}
            size="sm"
            onClick={action.onClick}
            disabled={action.disabled}
            className="flex-shrink-0"
          >
            {Icon && <Icon className="h-4 w-4 sm:mr-1" />}
            <span className="hidden sm:inline">{action.label}</span>
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

// Export button styling constants for reference
export const BUTTON_STYLES = {
  PRIMARY: "default",
  SECONDARY: "outline", 
  DESTRUCTIVE: "destructive",
  GHOST: "ghost",
  ICON_ONLY: { variant: "ghost", size: "icon" },
  TABLE_ACTION: { variant: "ghost", size: "sm" }
} as const
