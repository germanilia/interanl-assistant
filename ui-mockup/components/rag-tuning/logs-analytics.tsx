"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, TrendingUp, Clock, Users, FileText, AlertCircle, CheckCircle, Download, Filter } from "lucide-react"
import { format } from "date-fns"

const performanceMetrics = {
  "software-engineer": {
    accuracy: 0.87,
    relevance: 0.92,
    responseTime: 1240,
    queries: 156,
  },
  "devops-engineer": {
    accuracy: 0.94,
    relevance: 0.96,
    responseTime: 980,
    queries: 89,
  },
  "qa-engineer": {
    accuracy: 0.89,
    relevance: 0.91,
    responseTime: 1100,
    queries: 34,
  },
}

const auditLogs = [
  {
    id: "1",
    timestamp: "2024-01-15T14:30:25Z",
    user: "john.doe@company.com",
    role: "software-engineer",
    query: "How do I restart backend pods?",
    action: "context_filter_applied",
    details: "Excluded admin-only documents, restricted to read-only guides",
    documentsRetrieved: 3,
    responseGenerated: true,
  },
  {
    id: "2",
    timestamp: "2024-01-15T14:28:15Z",
    user: "jane.smith@company.com",
    role: "devops-engineer",
    query: "Update production database credentials",
    action: "full_access_granted",
    details: "All operational documents included, admin privileges applied",
    documentsRetrieved: 7,
    responseGenerated: true,
  },
  {
    id: "3",
    timestamp: "2024-01-15T14:25:10Z",
    user: "bob.wilson@company.com",
    role: "qa-engineer",
    query: "How to access application logs?",
    action: "context_filter_applied",
    details: "Limited to monitoring and troubleshooting documents",
    documentsRetrieved: 4,
    responseGenerated: true,
  },
  {
    id: "4",
    timestamp: "2024-01-15T14:22:05Z",
    user: "alice.brown@company.com",
    role: "product-manager",
    query: "Deploy new feature to production",
    action: "access_denied",
    details: "Insufficient permissions for deployment operations",
    documentsRetrieved: 0,
    responseGenerated: false,
  },
]

const contextEffects = [
  {
    role: "software-engineer",
    totalQueries: 156,
    contextApplied: 142,
    improvementScore: 0.23,
    commonFilters: ["exclude-admin", "read-only-guides"],
  },
  {
    role: "devops-engineer",
    totalQueries: 89,
    contextApplied: 89,
    improvementScore: 0.31,
    commonFilters: ["full-access", "operational-docs"],
  },
  {
    role: "qa-engineer",
    totalQueries: 34,
    contextApplied: 32,
    improvementScore: 0.18,
    commonFilters: ["testing-docs", "monitoring-access"],
  },
]

export function LogsAnalytics() {
  const [selectedRole, setSelectedRole] = useState("all")
  const [timeRange, setTimeRange] = useState("24h")
  const [activeTab, setActiveTab] = useState("performance")

  const exportLogs = (format: string) => {
    console.log(`Exporting logs in ${format} format`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Logs & Analytics</h3>
          <p className="text-sm text-muted-foreground">Monitor performance and analyze context-awareness effects</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => exportLogs("csv")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Performance Metrics
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Audit Logs
          </TabsTrigger>
          <TabsTrigger value="context" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Context Effects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">279</div>
                <p className="text-xs text-muted-foreground">+12% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.1s</div>
                <p className="text-xs text-muted-foreground">-5% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Context Applied</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">+2% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">91.3%</div>
                <p className="text-xs text-muted-foreground">+3% from yesterday</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance by Role */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics by Role</CardTitle>
              <CardDescription>Accuracy, relevance, and response time breakdown by user role</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-center">Queries</TableHead>
                    <TableHead className="text-center">Accuracy</TableHead>
                    <TableHead className="text-center">Relevance</TableHead>
                    <TableHead className="text-center">Avg Response Time</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(performanceMetrics).map(([role, metrics]) => (
                    <TableRow key={role}>
                      <TableCell>
                        <div className="font-medium">{role.replace("-", " ")}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{metrics.queries}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <span className="mr-2">{Math.round(metrics.accuracy * 100)}%</span>
                          {metrics.accuracy > 0.9 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <span className="mr-2">{Math.round(metrics.relevance * 100)}%</span>
                          {metrics.relevance > 0.9 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{metrics.responseTime}ms</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">Healthy</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Audit Trail
                  </CardTitle>
                  <CardDescription>Detailed logs of context-awareness decisions and access controls</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="software-engineer">Software Engineer</SelectItem>
                      <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                      <SelectItem value="qa-engineer">QA Engineer</SelectItem>
                      <SelectItem value="product-manager">Product Manager</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Query</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs
                      .filter((log) => selectedRole === "all" || log.role === selectedRole)
                      .map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-sm">
                            {format(new Date(log.timestamp), "MMM dd, HH:mm:ss")}
                          </TableCell>
                          <TableCell className="text-sm">{log.user.split("@")[0]}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {log.role.replace("-", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <div className="truncate text-sm" title={log.query}>
                              {log.query}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm font-medium">{log.action.replace("_", " ")}</div>
                              <div className="text-xs text-muted-foreground">{log.details}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary">{log.documentsRetrieved}</Badge>
                          </TableCell>
                          <TableCell>
                            {log.responseGenerated ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="context" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Context-Awareness Impact Analysis
              </CardTitle>
              <CardDescription>How context applications improve performance and user experience</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-center">Total Queries</TableHead>
                    <TableHead className="text-center">Context Applied</TableHead>
                    <TableHead className="text-center">Improvement Score</TableHead>
                    <TableHead>Common Filters</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contextEffects.map((effect) => (
                    <TableRow key={effect.role}>
                      <TableCell>
                        <div className="font-medium">{effect.role.replace("-", " ")}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{effect.totalQueries}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <span className="mr-2">
                            {Math.round((effect.contextApplied / effect.totalQueries) * 100)}%
                          </span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span>+{Math.round(effect.improvementScore * 100)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {effect.commonFilters.map((filter) => (
                            <Badge key={filter} variant="outline" className="text-xs">
                              {filter.replace("-", " ")}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Context Effectiveness Chart */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Filter Application Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Exclude Admin Docs</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                      <span className="text-sm">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Read-Only Guides</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <span className="text-sm">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Operational Docs</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Response Quality Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Relevance Improvement</span>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium">+24%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Accuracy Improvement</span>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium">+18%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Satisfaction</span>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium">+31%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
