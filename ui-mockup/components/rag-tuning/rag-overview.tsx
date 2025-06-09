"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Database, FileText, ArrowRight, Github, BookOpen, FileCode, MessageSquare, Lock } from "lucide-react"

export function RagOverview({ setHasChanges }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retrieval Accuracy</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.4%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last tuning</p>
            <Progress value={87.4} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Relevance</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.3%</div>
            <p className="text-xs text-muted-foreground">+1.5% from last tuning</p>
            <Progress value={92.3} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permission Accuracy</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">+0.2% from last tuning</p>
            <Progress value={99.8} className="h-2 mt-3" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>RAG Tuning Overview</CardTitle>
          <CardDescription>
            Fine-tune your retrieval-augmented generation system with context-awareness and role-based permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Retriever Tuning</h3>
                  <p className="text-sm text-muted-foreground">Configure context-aware retrieval</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Indexed Sources</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role-Based Filters</span>
                  <span>8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>2 days ago</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setHasChanges(true)}>
                Configure Retriever
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Generator Tuning</h3>
                  <p className="text-sm text-muted-foreground">Customize response generation</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Templates</span>
                  <span>6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Conditional Logic Rules</span>
                  <span>14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>1 week ago</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setHasChanges(true)}>
                Configure Generator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Context & Permissions</h3>
                  <p className="text-sm text-muted-foreground">Manage role-based access</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Defined Roles</span>
                  <span>5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Permission Sets</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>3 days ago</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setHasChanges(true)}>
                Configure Permissions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Knowledge Sources</CardTitle>
          <CardDescription>Connected knowledge sources for retrieval-augmented generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5" />
                <div>
                  <h4 className="font-medium">GitHub Repositories</h4>
                  <p className="text-sm text-muted-foreground">12 repositories connected</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600">
                Active
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5" />
                <div>
                  <h4 className="font-medium">Confluence Spaces</h4>
                  <p className="text-sm text-muted-foreground">8 spaces connected</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600">
                Active
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileCode className="h-5 w-5" />
                <div>
                  <h4 className="font-medium">Jira Projects</h4>
                  <p className="text-sm text-muted-foreground">5 projects connected</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600">
                Active
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" />
                <div>
                  <h4 className="font-medium">Google Drive</h4>
                  <p className="text-sm text-muted-foreground">3 shared drives connected</p>
                </div>
              </div>
              <Badge variant="outline" className="text-amber-600">
                Partial
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
