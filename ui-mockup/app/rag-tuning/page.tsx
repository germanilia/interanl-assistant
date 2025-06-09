"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Database,
  Play,
  BarChart3,
  Save,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Lock,
} from "lucide-react"

import { RetrieverTuning } from "@/components/rag-tuning/retriever-tuning"
import { GeneratorTuning } from "@/components/rag-tuning/generator-tuning"
import { ContextPermissions } from "@/components/rag-tuning/context-permissions"
import { TestPreview } from "@/components/rag-tuning/test-preview"
import { LogsAnalytics } from "@/components/rag-tuning/logs-analytics"
import { RagOverview } from "@/components/rag-tuning/rag-overview"

export default function RagTuningPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [hasChanges, setHasChanges] = useState(false)

  const handleSaveChanges = () => {
    console.log("Saving changes...")
    setHasChanges(false)
    // Implementation for saving changes
  }

  const handleDiscardChanges = () => {
    console.log("Discarding changes...")
    setHasChanges(false)
    // Implementation for discarding changes
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">RAG Tuning</h2>
                <p className="text-muted-foreground">
                  Fine-tune retrieval-augmented generation with context-awareness and role-based permissions.
                </p>
              </div>
              {hasChanges && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-amber-500">Unsaved changes</span>
                </div>
              )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="retriever" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="hidden sm:inline">Retriever</span>
                </TabsTrigger>
                <TabsTrigger value="generator" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Generator</span>
                </TabsTrigger>
                <TabsTrigger value="context" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Context</span>
                </TabsTrigger>
                <TabsTrigger value="test" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  <span className="hidden sm:inline">Test</span>
                </TabsTrigger>
                <TabsTrigger value="logs" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Logs</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <RagOverview setHasChanges={setHasChanges} />
              </TabsContent>

              <TabsContent value="retriever">
                <RetrieverTuning setHasChanges={setHasChanges} />
              </TabsContent>

              <TabsContent value="generator">
                <GeneratorTuning setHasChanges={setHasChanges} />
              </TabsContent>

              <TabsContent value="context">
                <ContextPermissions setHasChanges={setHasChanges} />
              </TabsContent>

              <TabsContent value="test">
                <TestPreview />
              </TabsContent>

              <TabsContent value="logs">
                <LogsAnalytics />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              {hasChanges ? (
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-amber-500">Unsaved changes</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">All changes saved</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleDiscardChanges} disabled={!hasChanges}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Discard Changes
              </Button>
              <Button onClick={handleSaveChanges} disabled={!hasChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
