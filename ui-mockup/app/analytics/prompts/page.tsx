"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  Tag,
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  X,
  ExternalLink,
} from "lucide-react"
import { format } from "date-fns"

// Sample data
const promptsData = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30:22",
    user: "john.doe@company.com",
    userGroup: "Frontend Team",
    topic: "React",
    category: "Development",
    prompt: "How do I implement lazy loading for React components in our Next.js application?",
    response: "To implement lazy loading in Next.js, you can use React.lazy() with dynamic imports...",
    responseLength: 450,
    satisfaction: 4.5,
    relatedKB: ["React Performance", "Next.js Optimization"],
    conversationId: "conv_001",
  },
  {
    id: 2,
    timestamp: "2024-01-15 13:45:10",
    user: "jane.smith@company.com",
    userGroup: "DevOps Team",
    topic: "Kubernetes",
    category: "Infrastructure",
    prompt: "What's the best way to configure horizontal pod autoscaling for our microservices?",
    response: "Horizontal Pod Autoscaling (HPA) in Kubernetes can be configured using metrics like CPU, memory...",
    responseLength: 680,
    satisfaction: 5.0,
    relatedKB: ["Kubernetes Scaling", "Microservices Architecture"],
    conversationId: "conv_002",
  },
  {
    id: 3,
    timestamp: "2024-01-15 12:20:15",
    user: "mike.wilson@company.com",
    userGroup: "Backend Team",
    topic: "Database",
    category: "Development",
    prompt: "How can I optimize PostgreSQL queries that are running slowly in production?",
    response: "PostgreSQL query optimization involves several strategies including proper indexing...",
    responseLength: 520,
    satisfaction: 4.2,
    relatedKB: ["PostgreSQL Performance", "Database Optimization"],
    conversationId: "conv_003",
  },
  {
    id: 4,
    timestamp: "2024-01-15 11:15:30",
    user: "sarah.johnson@company.com",
    userGroup: "Product Team",
    topic: "Analytics",
    category: "Product",
    prompt: "What metrics should we track for user engagement in our mobile app?",
    response: "Key user engagement metrics for mobile apps include session duration, screen views...",
    responseLength: 380,
    satisfaction: 4.8,
    relatedKB: ["Mobile Analytics", "User Engagement"],
    conversationId: "conv_004",
  },
  {
    id: 5,
    timestamp: "2024-01-15 10:30:45",
    user: "alex.brown@company.com",
    userGroup: "Security Team",
    topic: "Security",
    category: "Security",
    prompt: "How do we implement OAuth 2.0 authentication with PKCE for our single-page application?",
    response: "OAuth 2.0 with PKCE (Proof Key for Code Exchange) is essential for SPAs...",
    responseLength: 720,
    satisfaction: 4.6,
    relatedKB: ["OAuth Implementation", "SPA Security"],
    conversationId: "conv_005",
  },
]

const conversationHistory = {
  conv_001: [
    {
      type: "user",
      content: "How do I implement lazy loading for React components in our Next.js application?",
      timestamp: "2024-01-15 14:30:22",
    },
    {
      type: "bot",
      content:
        "To implement lazy loading in Next.js, you can use React.lazy() with dynamic imports. Here's how:\n\n1. **Using React.lazy():**\n```jsx\nconst LazyComponent = React.lazy(() => import('./LazyComponent'));\n```\n\n2. **With Suspense:**\n```jsx\n<Suspense fallback={<div>Loading...</div>}>\n  <LazyComponent />\n</Suspense>\n```\n\n3. **Next.js dynamic imports:**\n```jsx\nimport dynamic from 'next/dynamic';\nconst DynamicComponent = dynamic(() => import('./Component'), {\n  loading: () => <p>Loading...</p>\n});\n```\n\nThis approach reduces initial bundle size and improves performance.",
      timestamp: "2024-01-15 14:30:25",
      relatedKB: ["React Performance", "Next.js Optimization"],
    },
    {
      type: "user",
      content: "Can you show me how to implement this with TypeScript?",
      timestamp: "2024-01-15 14:32:10",
    },
    {
      type: "bot",
      content:
        "Here's how to implement lazy loading with TypeScript:\n\n```tsx\n// LazyComponent.tsx\ninterface LazyComponentProps {\n  title: string;\n  data: any[];\n}\n\nconst LazyComponent: React.FC<LazyComponentProps> = ({ title, data }) => {\n  return (\n    <div>\n      <h2>{title}</h2>\n      {/* component content */}\n    </div>\n  );\n};\n\nexport default LazyComponent;\n```\n\n```tsx\n// Parent component\nimport { Suspense, lazy } from 'react';\n\nconst LazyComponent = lazy(() => import('./LazyComponent'));\n\nconst ParentComponent: React.FC = () => {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <LazyComponent title=\"My Title\" data={[]} />\n    </Suspense>\n  );\n};\n```",
      timestamp: "2024-01-15 14:32:15",
    },
  ],
}

const topics = ["React", "Kubernetes", "Database", "Analytics", "Security", "CI/CD", "API", "Testing"]
const categories = ["Development", "Infrastructure", "Product", "Security", "Design", "Operations"]
const userGroups = ["Frontend Team", "Backend Team", "DevOps Team", "Product Team", "Security Team", "Design Team"]

export default function PromptsAnalysisPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: "last-7-days",
    users: [],
    topics: [],
    categories: [],
  })
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("search")
  const [showFilters, setShowFilters] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredPrompts = promptsData.filter((prompt) => {
    if (searchQuery && !prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedFilters.topics.length > 0 && !selectedFilters.topics.includes(prompt.topic)) {
      return false
    }
    if (selectedFilters.categories.length > 0 && !selectedFilters.categories.includes(prompt.category)) {
      return false
    }
    return true
  })

  const paginatedPrompts = filteredPrompts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage)

  const clearFilters = () => {
    setSelectedFilters({
      dateRange: "last-7-days",
      users: [],
      topics: [],
      categories: [],
    })
    setSearchQuery("")
  }

  const exportData = (format: string) => {
    console.log(`Exporting data in ${format} format`)
    // Implementation for export functionality
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
                <h2 className="text-3xl font-bold tracking-tight">Prompts Analysis</h2>
                <p className="text-muted-foreground">
                  Search, analyze, and gain insights from user prompts and AI responses.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => exportData("csv")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button variant="outline" onClick={() => exportData("pdf")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Prompt Search
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  User History
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Reports & Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-4">
                  {/* Filtering Panel */}
                  <div className={`lg:col-span-1 ${showFilters ? "" : "hidden lg:block"}`}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                          </CardTitle>
                          <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Date Range */}
                        <div>
                          <Label className="text-sm font-medium">Date Range</Label>
                          <Select
                            value={selectedFilters.dateRange}
                            onValueChange={(value) => setSelectedFilters({ ...selectedFilters, dateRange: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="today">Today</SelectItem>
                              <SelectItem value="yesterday">Yesterday</SelectItem>
                              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                              <SelectItem value="custom">Custom Range</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* User/Group Filter */}
                        <div>
                          <Label className="text-sm font-medium">Users & Groups</Label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select users or groups" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all-users">All Users</SelectItem>
                              <Separator />
                              {userGroups.map((group) => (
                                <SelectItem key={group} value={group}>
                                  {group}
                                </SelectItem>
                              ))}
                              <Separator />
                              {promptsData.map((prompt) => (
                                <SelectItem key={prompt.user} value={prompt.user}>
                                  {prompt.user}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Topic Filter */}
                        <div>
                          <Label className="text-sm font-medium">Topics</Label>
                          <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                            {topics.map((topic) => (
                              <div key={topic} className="flex items-center space-x-2">
                                <Checkbox
                                  id={topic}
                                  checked={selectedFilters.topics.includes(topic)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedFilters({
                                        ...selectedFilters,
                                        topics: [...selectedFilters.topics, topic],
                                      })
                                    } else {
                                      setSelectedFilters({
                                        ...selectedFilters,
                                        topics: selectedFilters.topics.filter((t) => t !== topic),
                                      })
                                    }
                                  }}
                                />
                                <Label htmlFor={topic} className="text-sm">
                                  {topic}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                          <Label className="text-sm font-medium">Categories</Label>
                          <div className="mt-2 space-y-2">
                            {categories.map((category) => (
                              <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                  id={category}
                                  checked={selectedFilters.categories.includes(category)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedFilters({
                                        ...selectedFilters,
                                        categories: [...selectedFilters.categories, category],
                                      })
                                    } else {
                                      setSelectedFilters({
                                        ...selectedFilters,
                                        categories: selectedFilters.categories.filter((c) => c !== category),
                                      })
                                    }
                                  }}
                                />
                                <Label htmlFor={category} className="text-sm">
                                  {category}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
                          Clear Filters
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Main Content */}
                  <div className={`${showFilters ? "lg:col-span-3" : "lg:col-span-4"}`}>
                    {/* Search Bar */}
                    <Card className="mb-6">
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Search prompts..."
                              className="pl-10"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          {!showFilters && (
                            <Button variant="outline" onClick={() => setShowFilters(true)}>
                              <Filter className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        {(selectedFilters.topics.length > 0 || selectedFilters.categories.length > 0) && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {selectedFilters.topics.map((topic) => (
                              <Badge key={topic} variant="secondary" className="flex items-center gap-1">
                                {topic}
                                <X
                                  className="h-3 w-3 cursor-pointer"
                                  onClick={() =>
                                    setSelectedFilters({
                                      ...selectedFilters,
                                      topics: selectedFilters.topics.filter((t) => t !== topic),
                                    })
                                  }
                                />
                              </Badge>
                            ))}
                            {selectedFilters.categories.map((category) => (
                              <Badge key={category} variant="outline" className="flex items-center gap-1">
                                {category}
                                <X
                                  className="h-3 w-3 cursor-pointer"
                                  onClick={() =>
                                    setSelectedFilters({
                                      ...selectedFilters,
                                      categories: selectedFilters.categories.filter((c) => c !== category),
                                    })
                                  }
                                />
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Results Panel */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Search Results</CardTitle>
                          <Badge variant="secondary">{filteredPrompts.length} prompts found</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date/Time</TableHead>
                              <TableHead>User</TableHead>
                              <TableHead>Topic</TableHead>
                              <TableHead>Prompt</TableHead>
                              <TableHead>Response</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {paginatedPrompts.map((prompt) => (
                              <TableRow key={prompt.id} className="cursor-pointer hover:bg-gray-50">
                                <TableCell className="text-sm text-muted-foreground">
                                  {format(new Date(prompt.timestamp), "MMM dd, HH:mm")}
                                </TableCell>
                                <TableCell>
                                  <div>
                                    <div className="font-medium text-sm">{prompt.user.split("@")[0]}</div>
                                    <div className="text-xs text-muted-foreground">{prompt.userGroup}</div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col gap-1">
                                    <Badge variant="outline" className="text-xs">
                                      {prompt.topic}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                      {prompt.category}
                                    </Badge>
                                  </div>
                                </TableCell>
                                <TableCell className="max-w-xs">
                                  <div className="truncate" title={prompt.prompt}>
                                    {prompt.prompt}
                                  </div>
                                </TableCell>
                                <TableCell className="max-w-xs">
                                  <div className="text-sm text-muted-foreground">
                                    {prompt.responseLength} characters
                                  </div>
                                  <div className="flex items-center gap-1 mt-1">
                                    <span className="text-xs">Satisfaction:</span>
                                    <Badge variant="outline" className="text-xs">
                                      {prompt.satisfaction}/5
                                    </Badge>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="icon" onClick={() => setSelectedPrompt(prompt)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-sm text-muted-foreground">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                            {Math.min(currentPage * itemsPerPage, filteredPrompts.length)} of {filteredPrompts.length}{" "}
                            results
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              disabled={currentPage === 1}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm">
                              Page {currentPage} of {totalPages}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                              disabled={currentPage === totalPages}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-4">
                  {/* Conversation Threads Sidebar */}
                  <div className="lg:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Conversations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-96">
                          <div className="space-y-2">
                            {promptsData.map((prompt) => (
                              <div
                                key={prompt.conversationId}
                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                  selectedConversation === prompt.conversationId
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:bg-gray-50"
                                }`}
                                onClick={() => setSelectedConversation(prompt.conversationId)}
                              >
                                <div className="text-sm font-medium mb-1">
                                  {format(new Date(prompt.timestamp), "MMM dd, HH:mm")}
                                </div>
                                <div className="text-xs text-muted-foreground mb-2">{prompt.user.split("@")[0]}</div>
                                <div className="text-xs truncate">{prompt.prompt}</div>
                                <div className="flex items-center gap-1 mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {prompt.topic}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Conversation Detail */}
                  <div className="lg:col-span-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Conversation Details</CardTitle>
                        {selectedConversation && (
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Export
                            </Button>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Share
                            </Button>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        {selectedConversation ? (
                          <ScrollArea className="h-96">
                            <div className="space-y-4">
                              {conversationHistory[selectedConversation]?.map((message, index) => (
                                <div
                                  key={index}
                                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                                >
                                  <div
                                    className={`max-w-[80%] p-4 rounded-lg ${
                                      message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                                    }`}
                                  >
                                    <div className="whitespace-pre-wrap">{message.content}</div>
                                    <div
                                      className={`text-xs mt-2 ${
                                        message.type === "user" ? "text-blue-100" : "text-gray-500"
                                      }`}
                                    >
                                      {format(new Date(message.timestamp), "HH:mm")}
                                    </div>
                                    {message.relatedKB && (
                                      <div className="mt-2 flex flex-wrap gap-1">
                                        {message.relatedKB.map((kb, idx) => (
                                          <Badge key={idx} variant="outline" className="text-xs">
                                            {kb}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        ) : (
                          <div className="text-center py-12">
                            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Conversation</h3>
                            <p className="text-gray-500">Choose a conversation from the sidebar to view details.</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Usage Trends */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Usage Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm">Today</span>
                          <span className="font-medium">127 prompts</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">This Week</span>
                          <span className="font-medium">892 prompts</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">This Month</span>
                          <span className="font-medium">3,247 prompts</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          View Detailed Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Topics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Tag className="mr-2 h-4 w-4" />
                        Top Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {["React", "Kubernetes", "Database", "Security", "API"].map((topic, index) => (
                          <div key={topic} className="flex items-center justify-between">
                            <span className="text-sm">{topic}</span>
                            <Badge variant="secondary">{Math.floor(Math.random() * 100) + 50}</Badge>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          View All Topics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* User Engagement */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        User Engagement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm">Active Users</span>
                          <span className="font-medium">89</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg. Satisfaction</span>
                          <span className="font-medium">4.3/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Response Rate</span>
                          <span className="font-medium">94.2%</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Engagement Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Custom Report Builder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Report Builder</CardTitle>
                    <CardDescription>Create custom reports with specific filters and metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label>Time Period</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                            <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                            <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Metrics</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select metrics" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usage">Usage Statistics</SelectItem>
                            <SelectItem value="satisfaction">Satisfaction Scores</SelectItem>
                            <SelectItem value="topics">Topic Analysis</SelectItem>
                            <SelectItem value="users">User Activity</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Export Format</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF Report</SelectItem>
                            <SelectItem value="csv">CSV Data</SelectItem>
                            <SelectItem value="excel">Excel Workbook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button>Generate Report</Button>
                      <Button variant="outline">Preview</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
