# Button Styling Guide

This document outlines the standardized button styling patterns implemented across the application to ensure visual consistency.

## Button Style Standards

### 1. Primary Actions
- **Variant**: `default` (blue background)
- **Usage**: Main call-to-action buttons, submit buttons, primary workflow actions
- **Examples**: "Create Workflow", "Save Changes", "Generate Report"

### 2. Secondary Actions  
- **Variant**: `outline` (border with transparent background)
- **Usage**: Secondary actions, cancel alternatives, supporting actions
- **Examples**: "Schedule Report", "Preview", "Edit"

### 3. Destructive Actions
- **Variant**: `destructive` (red background)
- **Usage**: Delete, remove, or other potentially harmful actions
- **Examples**: "Delete", "Remove", "Reset"

### 4. Icon-Only Actions
- **Variant**: `ghost` with `size="icon"`
- **Usage**: Compact icon buttons in toolbars or tight spaces
- **Examples**: Edit icons, more actions icons

### 5. Table Row Actions
- **Variant**: `ghost` with `size="sm"`
- **Usage**: Action buttons within table rows for compact display
- **Examples**: Edit, view, delete actions in data tables

## Helper Components

### HeaderActionButtons
Standardized header action buttons with primary and secondary actions.

```tsx
<HeaderActionButtons
  primaryAction={{
    label: "Create Item",
    icon: Plus,
    onClick: handleCreate
  }}
  secondaryActions={[
    {
      label: "Import",
      icon: Upload,
      onClick: handleImport
    }
  ]}
/>
```

### TableActionButtons
Compact action buttons for table rows.

```tsx
<TableActionButtons
  actions={[
    {
      icon: Edit,
      onClick: () => handleEdit(id),
      tooltip: "Edit Item"
    },
    {
      icon: Trash2,
      onClick: () => handleDelete(id),
      tooltip: "Delete Item",
      variant: "destructive"
    }
  ]}
/>
```

### DialogActionButtons
Standard dialog footer buttons with consistent ordering.

```tsx
<DialogActionButtons
  onCancel={handleCancel}
  onPrimary={handleSave}
  primaryLabel="Save Changes"
  cancelLabel="Cancel"
/>
```

### CardActionButtons
Action buttons for card components with responsive behavior.

```tsx
<CardActionButtons
  actions={[
    {
      label: "Edit",
      icon: Edit,
      onClick: handleEdit,
      variant: "outline"
    },
    {
      label: "Delete", 
      icon: Trash2,
      onClick: handleDelete,
      variant: "destructive"
    }
  ]}
/>
```

## Implementation Status

### ✅ Updated Components
- **ReportsPage.tsx**: Header actions, table actions, dialog buttons
- **WorkflowsPage.tsx**: Header actions, card actions, dialog buttons  
- **UsersAndRolesPage.tsx**: Header actions, table actions, card actions
- **GuardrailsPage.tsx**: Action bar buttons
- **AnalyticsMetrics.tsx**: Report generation buttons

### 🎯 Key Benefits
1. **Visual Consistency**: All buttons follow the same styling patterns
2. **Improved UX**: Clear visual hierarchy with primary/secondary distinction
3. **Mobile Responsive**: Consistent behavior across device sizes
4. **Maintainable**: Centralized styling logic in reusable components
5. **Accessible**: Proper button variants for different action types

### 📋 Usage Guidelines
1. Always use `HeaderActionButtons` for page header actions
2. Use `TableActionButtons` for compact table row actions
3. Use `DialogActionButtons` for modal/dialog footers
4. Use `CardActionButtons` for card-based action groups
5. Follow the variant guidelines for consistent visual hierarchy

### 🔧 Future Enhancements
- Add loading states to action button components
- Implement keyboard navigation patterns
- Add animation transitions for state changes
- Create additional specialized button groups as needed
