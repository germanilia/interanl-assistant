# Client Structure Overview

This document outlines the new feature-first architecture implemented in the client application.

## Directory Structure

```
client/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Layout components (AppLayout, Header, Sidebar)
│   │   └── shared/          # Other shared components (charts, etc.)
│   ├── features/            # Feature-based modules (flattened structure)
│   │   ├── auth/            # LoginForm, RegisterForm, ProtectedRoute, index.ts
│   │   ├── analytics/       # UsageMetricsPage, PromptSearchPage, ReportsPage, index.ts
│   │   ├── config/          # MCPServersPage, ConnectorsPage, index.ts
│   │   ├── dashboard/       # Dashboard, MetricCard, QuickActions, etc.
│   │   ├── user-management/ # UsersAndRolesPage, PermissionsPage, ACLAnalyzerPage
│   │   ├── knowledge-base/  # KnowledgeBasePage
│   │   ├── rag-tuning/      # RAGTuningPage
│   │   ├── workflows/       # WorkflowsPage
│   │   └── guardrails/      # GuardrailsPage
│   ├── pages/               # Route-level page components
│   │   ├── analytics/       # Analytics page wrappers
│   │   ├── config/          # Config page wrappers
│   │   ├── user-management/ # User management page wrappers
│   │   ├── DashboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── ...
│   ├── contexts/            # React contexts
│   ├── hooks/               # Global custom hooks
│   ├── services/            # API services
│   ├── lib/                 # Utilities, config
│   ├── types/               # Global types
│   └── App.tsx
├── tests/                   # Playwright tests
│   ├── unit/                # Unit tests
│   │   └── components/      # Component tests
│   ├── integration/         # Integration tests
│   └── utils/               # Test utilities
└── playwright.config.ts     # Playwright configuration
```

## Architecture Principles

### Features vs Components vs Pages

- **Features**: Business domain modules containing everything needed for a specific functionality
- **Components**: Reusable UI elements that focus on presentation
- **Pages**: Route-level components that compose features and handle routing

### Key Changes Made

1. **Fixed Header**: Header is now fixed position and always visible
2. **Feature Organization**: Moved domain-specific components to feature folders
3. **Flattened Structure**: Removed nested `components/` folders within features
4. **Page Wrappers**: Created page components that import from features
5. **Clean Imports**: Updated App.tsx to use new page structure
6. **Removed Duplicates**: Eliminated duplicate components from old structure
7. **Proper Testing**: Converted Jest tests to Playwright tests
8. **Index Files**: Added index.ts files for cleaner feature imports

## Benefits

- **Scalability**: Each feature is self-contained
- **Maintainability**: Related code stays together
- **Team Collaboration**: Different developers can work on different features
- **Code Reuse**: Clear separation between feature-specific and shared components
- **Better UX**: Fixed header improves navigation experience

## Next Steps

1. Create proper TypeScript interfaces for each feature
2. Add feature-specific hooks and services
3. Implement proper error boundaries
4. Add feature-specific tests
5. Create shared component library documentation
