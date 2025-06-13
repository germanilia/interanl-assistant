import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { AppLayout } from '@/components/layout/AppLayout';

// Import page components
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ConfirmSignUpPage from '@/pages/ConfirmSignUpPage';
import DashboardPage from '@/pages/DashboardPage';
import MCPServersPage from '@/pages/config/MCPServersPage';
import ConnectorsPage from '@/pages/config/ConnectorsPage';
import KnowledgeBasePage from '@/pages/KnowledgeBasePage';
import RAGTuningPage from '@/pages/RAGTuningPage';
import UsageMetricsPage from '@/pages/analytics/UsageMetricsPage';
import PromptSearchPage from '@/pages/analytics/PromptSearchPage';
import ReportsPage from '@/pages/analytics/ReportsPage';
import UsersAndRolesPage from '@/pages/user-management/UsersAndRolesPage';
import PermissionsPage from '@/pages/user-management/PermissionsPage';
import ACLAnalyzerPage from '@/pages/user-management/ACLAnalyzerPage';
import WorkflowsPage from '@/pages/WorkflowsPage';
import GuardrailsPage from '@/pages/GuardrailsPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
          <Routes>
            {/* Public routes (redirect to dashboard if authenticated) */}
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute requireAuth={false}>
                  <RegisterPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirm-signup"
              element={
                <ProtectedRoute requireAuth={false}>
                  <ConfirmSignUpPage />
                </ProtectedRoute>
              }
            />

            {/* Protected routes with layout */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <DashboardPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Configuration routes */}
            <Route
              path="/config/mcp-servers"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <MCPServersPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/config/connectors"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ConnectorsPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Knowledge Base route */}
            <Route
              path="/knowledge-base"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <KnowledgeBasePage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* RAG Tuning route */}
            <Route
              path="/rag-tuning"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <RAGTuningPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Analytics routes */}
            <Route
              path="/analytics/usage"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <UsageMetricsPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics/prompts"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <PromptSearchPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics/reports"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ReportsPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* User Management routes */}
            <Route
              path="/users/management"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <UsersAndRolesPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/permissions"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <PermissionsPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/acl"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ACLAnalyzerPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Workflows route */}
            <Route
              path="/workflows"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <WorkflowsPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Guardrails route */}
            <Route
              path="/guardrails"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <GuardrailsPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />



            {/* Default redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;