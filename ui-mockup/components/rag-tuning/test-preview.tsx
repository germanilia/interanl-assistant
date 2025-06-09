"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Play, RefreshCw, FileText, MessageSquare, Clock, CheckCircle, User, Bot } from "lucide-react"

const testScenarios = [
  {
    id: "restart-pods",
    name: "Pod Restart Request",
    query: "How do I restart the backend pods?",
    roles: ["software-engineer", "devops-engineer"],
  },
  {
    id: "jenkins-config",
    name: "Jenkins Configuration",
    query: "How do I modify the CI/CD pipeline configuration?",
    roles: ["software-engineer", "devops-engineer"],
  },
  {
    id: "log-analysis",
    name: "Log Analysis",
    query: "How can I check application logs for errors?",
    roles: ["software-engineer", "devops-engineer", "qa-engineer"],
  },
  {
    id: "secret-management",
    name: "Secret Management",
    query: "How do I update the database password in production?",
    roles: ["devops-engineer"],
  },
]

const mockDocuments = {
  "software-engineer": [
    {
      title: "Troubleshooting Guide for Developers",
      source: "confluence",
      relevance: 0.92,
      tags: ["development", "troubleshooting"],
    },
    {
      title: "Application Monitoring Best Practices",
      source: "github",
      relevance: 0.87,
      tags: ["monitoring", "development"],
    },
  ],
  "devops-engineer": [
    {
      title: "Pod Management Operations Guide",
      source: "confluence",
      relevance: 0.95,
      tags: ["operations", "kubernetes"],
    },
    {
      title: "Infrastructure Automation Scripts",
      source: "github",
      relevance: 0.89,
      tags: ["automation", "infrastructure"],
    },
    {
      title: "Production Deployment Procedures",
      source: "confluence",
      relevance: 0.84,
      tags: ["deployment", "production"],
    },
  ],
}

const mockResponses = {
  "software-engineer": {
    "restart-pods":
      "Please contact DevOps to restart backend pods. Meanwhile, you can check the application logs to identify any issues that might be causing problems. Here are the troubleshooting steps you can follow...",
    "jenkins-config":
      "Modifying CI/CD pipeline configuration requires DevOps permissions. Please submit a request through the proper channels. However, you can review the current pipeline configuration in the repository...",
    "log-analysis":
      "You can check application logs using the monitoring dashboard. Here's how to access and analyze logs for your applications...",
  },
  "devops-engineer": {
    "restart-pods":
      "You can restart backend pods directly using kubectl. Here are the commands: `kubectl rollout restart deployment/backend-app -n production`. Make sure to check pod status after restart...",
    "jenkins-config":
      "You can modify the CI/CD pipeline by editing the Jenkinsfile in the repository. Here's the step-by-step process for updating pipeline configuration...",
    "log-analysis":
      "You have full access to all logging systems. Use the following commands to analyze logs: `kubectl logs -f deployment/backend-app -n production` or access the centralized logging dashboard...",
  },
}

export function TestPreview() {
  const [selectedRole, setSelectedRole] = useState("software-engineer")
  const [customQuery, setCustomQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("simulator")

  const runTest = async (query: string) => {
    setIsLoading(true)
    setTestResults(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const documents = mockDocuments[selectedRole as keyof typeof mockDocuments] || []
    const response =
      mockResponses[selectedRole as keyof typeof mockResponses]?.[
        query as keyof (typeof mockResponses)[keyof typeof mockResponses]
      ] || "I don't have specific information about that topic for your role."

    setTestResults({
      query,
      role: selectedRole,
      documents,
      response,
      timestamp: new Date().toISOString(),
      processingTime: Math.random() * 1000 + 500,
    })

    setIsLoading(false)
  }

  const runScenario = (scenario: any) => {
    setCustomQuery(scenario.query)
    runTest(scenario.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Test & Preview</h3>
          <p className="text-sm text-muted-foreground">Interactive testing of context-aware RAG responses by role</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="simulator" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Query Simulator
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Test Scenarios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simulator" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Query Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Query Simulator
                </CardTitle>
                <CardDescription>Test queries with different user roles to see context-aware responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="role-select">User Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger id="role-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software-engineer">Software Engineer</SelectItem>
                      <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                      <SelectItem value="qa-engineer">QA Engineer</SelectItem>
                      <SelectItem value="product-manager">Product Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="query-input">Query</Label>
                  <Textarea
                    id="query-input"
                    placeholder="Enter your question here..."
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={() => runTest(customQuery)}
                  disabled={!customQuery.trim() || isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Test
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="mr-2 h-5 w-5" />
                  Test Results
                </CardTitle>
                <CardDescription>Real-time preview of retrieved documents and generated responses</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                    <span>Processing query...</span>
                  </div>
                ) : testResults ? (
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {/* Query Info */}
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{testResults.role.replace("-", " ")}</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {Math.round(testResults.processingTime)}ms
                          </div>
                        </div>
                        <p className="text-sm font-medium">{testResults.query}</p>
                      </div>

                      {/* Retrieved Documents */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Retrieved Documents ({testResults.documents.length})
                        </h4>
                        <div className="space-y-2">
                          {testResults.documents.map((doc: any, index: number) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{doc.title}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {Math.round(doc.relevance * 100)}%
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {doc.source}
                                </Badge>
                                {doc.tags.map((tag: string) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Generated Response */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Generated Response
                        </h4>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">{testResults.response}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Enter a query and select a role to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Pre-configured Test Scenarios
              </CardTitle>
              <CardDescription>Run common scenarios to validate role-based behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {testScenarios.map((scenario) => (
                  <Card key={scenario.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{scenario.name}</CardTitle>
                        <Button size="sm" onClick={() => runScenario(scenario)}>
                          <Play className="mr-2 h-3 w-3" />
                          Run
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{scenario.query}</p>
                      <div className="flex flex-wrap gap-1">
                        {scenario.roles.map((role) => (
                          <Badge key={role} variant="outline" className="text-xs">
                            {role.replace("-", " ")}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scenario Results */}
          {testResults && (
            <Card>
              <CardHeader>
                <CardTitle>Scenario Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Context Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Documents Retrieved</span>
                        <Badge variant="secondary">{testResults.documents.length}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Processing Time</span>
                        <Badge variant="secondary">{Math.round(testResults.processingTime)}ms</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Role Applied</span>
                        <Badge variant="outline">{testResults.role.replace("-", " ")}</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Quality Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Relevance Score</span>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm">High</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Context Awareness</span>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm">Applied</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Permission Check</span>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm">Passed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
