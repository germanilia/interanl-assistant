"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Plus,
  Search,
  Filter,
  Github,
  FileText,
  Settings,
  Trash2,
  Edit,
  RefreshCw,
  Link,
  BookOpen,
  MessageSquare,
} from "lucide-react"

const knowledgeSources = [
  {
    id: 1,
    name: "Frontend Repository",
    type: "github",
    source: "company/frontend-app",
    codeOwners: ["@frontend-team", "@john.doe"],
    lastSync: "2 minutes ago",
    status: "active",
    documents: 1247,
    metadata: {
      repository: "company/frontend-app",
      branch: "main",
      path: "/docs",
      codeOwners: ["@frontend-team", "@john.doe"],
    },
  },
  {
    id: 2,
    name: "API Documentation",
    type: "confluence",
    source: "Engineering Space",
    labels: ["api", "backend", "documentation"],
    lastSync: "15 minutes ago",
    status: "active",
    documents: 89,
    metadata: {
      space: "ENG",
      spaceKey: "engineering",
      labels: ["api", "backend", "documentation"],
      parentPage: "API Documentation",
    },
  },
  {
    id: 3,
    name: "DevOps Runbooks",
    type: "confluence",
    source: "DevOps Space",
    labels: ["devops", "runbooks", "k8s", "ci-cd"],
    lastSync: "1 hour ago",
    status: "syncing",
    documents: 156,
    metadata: {
      space: "DEVOPS",
      spaceKey: "devops",
      labels: ["devops", "runbooks", "k8s", "ci-cd"],
      parentPage: "Runbooks",
    },
  },
  {
    id: 4,
    name: "Backend Services",
    type: "github",
    source: "company/backend-services",
    codeOwners: ["@backend-team", "@jane.smith"],
    lastSync: "5 minutes ago",
    status: "active",
    documents: 892,
    metadata: {
      repository: "company/backend-services",
      branch: "main",
      path: "/",
      codeOwners: ["@backend-team", "@jane.smith"],
    },
  },
  {
    id: 5,
    name: "Engineering Team Chat",
    type: "slack",
    source: "#engineering",
    channels: ["#engineering", "#backend", "#frontend", "#devops"],
    lastSync: "30 seconds ago",
    status: "active",
    documents: 15420,
    metadata: {
      workspace: "company-workspace",
      channels: ["#engineering", "#backend", "#frontend", "#devops"],
      dateRange: "last-90-days",
      includeThreads: true,
    },
  },
  {
    id: 6,
    name: "Support Conversations",
    type: "slack",
    source: "#support",
    channels: ["#support", "#customer-success"],
    lastSync: "1 minute ago",
    status: "active",
    documents: 8934,
    metadata: {
      workspace: "company-workspace",
      channels: ["#support", "#customer-success"],
      dateRange: "last-30-days",
      includeThreads: true,
    },
  },
  {
    id: 7,
    name: "Product Requirements",
    type: "google-docs",
    source: "Product Team Drive",
    folders: ["PRDs", "Specifications", "User Stories"],
    lastSync: "10 minutes ago",
    status: "active",
    documents: 234,
    metadata: {
      driveId: "product-team-drive",
      folders: ["PRDs", "Specifications", "User Stories"],
      sharedWith: ["product-team@company.com"],
      fileTypes: ["document", "presentation"],
    },
  },
  {
    id: 8,
    name: "Engineering Documentation",
    type: "google-docs",
    source: "Engineering Drive",
    folders: ["Architecture", "Design Docs", "RFCs"],
    lastSync: "25 minutes ago",
    status: "active",
    documents: 167,
    metadata: {
      driveId: "engineering-drive",
      folders: ["Architecture", "Design Docs", "RFCs"],
      sharedWith: ["engineering@company.com"],
      fileTypes: ["document", "spreadsheet"],
    },
  },
]

const filterPresets = [
  {
    name: "Frontend Issues",
    filters: {
      type: "github",
      repository: "company/frontend-app",
      codeOwners: ["@frontend-team"],
    },
  },
  {
    name: "API Documentation",
    filters: {
      type: "confluence",
      space: "ENG",
      labels: ["api"],
    },
  },
  {
    name: "DevOps Runbooks",
    filters: {
      type: "confluence",
      space: "DEVOPS",
      labels: ["runbooks", "k8s"],
    },
  },
  {
    name: "Support Conversations",
    filters: {
      type: "slack",
      workspace: "company-workspace",
      channels: ["#support"],
    },
  },
  {
    name: "Product Requirements",
    filters: {
      type: "google-docs",
      driveId: "product-team-drive",
      folders: ["PRDs"],
    },
  },
]

export default function KnowledgeBasePage() {
  const [sources, setSources] = useState(knowledgeSources)
  const [selectedFilters, setSelectedFilters] = useState<any>({ type: "all" })
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSources = sources.filter((source) => {
    if (searchQuery && !source.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedFilters.type !== "all" && source.type !== selectedFilters.type) {
      return false
    }
    if (selectedFilters.repository && source.metadata.repository !== selectedFilters.repository) {
      return false
    }
    if (selectedFilters.space && source.metadata.space !== selectedFilters.space) {
      return false
    }
    return true
  })

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Knowledge Base Management</h2>
                <p className="text-muted-foreground">
                  Manage content sources, metadata filtering, and knowledge organization.
                </p>
              </div>

              <Dialog open={isAddSourceOpen} onOpenChange={setIsAddSourceOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Source
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add Knowledge Source</DialogTitle>
                    <DialogDescription>Connect a new content source to your knowledge base.</DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="github" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="github">GitHub</TabsTrigger>
                      <TabsTrigger value="confluence">Confluence</TabsTrigger>
                      <TabsTrigger value="slack">Slack</TabsTrigger>
                      <TabsTrigger value="google-docs">Google Docs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="github" className="space-y-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="repo-name" className="text-right">
                          Repository
                        </Label>
                        <Input id="repo-name" placeholder="owner/repository" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="branch" className="text-right">
                          Branch
                        </Label>
                        <Input id="branch" placeholder="main" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="path" className="text-right">
                          Path
                        </Label>
                        <Input id="path" placeholder="/docs" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="code-owners" className="text-right">
                          Code Owners
                        </Label>
                        <Input id="code-owners" placeholder="@team, @user" className="col-span-3" />
                      </div>
                    </TabsContent>
                    <TabsContent value="confluence" className="space-y-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="space-key" className="text-right">
                          Space Key
                        </Label>
                        <Input id="space-key" placeholder="ENG" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="space-name" className="text-right">
                          Space Name
                        </Label>
                        <Input id="space-name" placeholder="Engineering Space" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="parent-page" className="text-right">
                          Parent Page
                        </Label>
                        <Input id="parent-page" placeholder="Documentation" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="labels" className="text-right">
                          Labels
                        </Label>
                        <Input id="labels" placeholder="api, backend, docs" className="col-span-3" />
                      </div>
                    </TabsContent>
                    <TabsContent value="slack" className="space-y-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="workspace" className="text-right">
                          Workspace
                        </Label>
                        <Input id="workspace" placeholder="company-workspace" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="channels" className="text-right">
                          Channels
                        </Label>
                        <Input id="channels" placeholder="#engineering, #support" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date-range" className="text-right">
                          Date Range
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select date range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="last-7-days">Last 7 days</SelectItem>
                            <SelectItem value="last-30-days">Last 30 days</SelectItem>
                            <SelectItem value="last-90-days">Last 90 days</SelectItem>
                            <SelectItem value="all-time">All time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="include-threads" className="text-right">
                          Include Threads
                        </Label>
                        <div className="col-span-3">
                          <Switch id="include-threads" defaultChecked />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="google-docs" className="space-y-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="drive-id" className="text-right">
                          Drive ID
                        </Label>
                        <Input id="drive-id" placeholder="team-drive-id" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="folders" className="text-right">
                          Folders
                        </Label>
                        <Input id="folders" placeholder="PRDs, Specifications" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shared-with" className="text-right">
                          Shared With
                        </Label>
                        <Input id="shared-with" placeholder="team@company.com" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file-types" className="text-right">
                          File Types
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select file types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="document">Documents</SelectItem>
                            <SelectItem value="spreadsheet">Spreadsheets</SelectItem>
                            <SelectItem value="presentation">Presentations</SelectItem>
                            <SelectItem value="all">All types</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <DialogFooter>
                    <Button type="submit" onClick={() => setIsAddSourceOpen(false)}>
                      Add Source
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
              {/* Filters & Tagging Panel */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters & Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="search">Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="search"
                          placeholder="Search sources..."
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="github">
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center">
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3">
                          <div>
                            <Label className="text-xs">Repository</Label>
                            <Select
                              value={selectedFilters.repository || "all"}
                              onValueChange={(value) => setSelectedFilters({ ...selectedFilters, repository: value })}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All repositories" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All repositories</SelectItem>
                                <SelectItem value="company/frontend-app">company/frontend-app</SelectItem>
                                <SelectItem value="company/backend-services">company/backend-services</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs">Code Owners</Label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All owners" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="@frontend-team">@frontend-team</SelectItem>
                                <SelectItem value="@backend-team">@backend-team</SelectItem>
                                <SelectItem value="@john.doe">@john.doe</SelectItem>
                                <SelectItem value="@jane.smith">@jane.smith</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="confluence">
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            Confluence
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3">
                          <div>
                            <Label className="text-xs">Space (Regex)</Label>
                            <Input
                              placeholder="ENG|DEVOPS"
                              className="h-8"
                              value={selectedFilters.spaceRegex || ""}
                              onChange={(e) => setSelectedFilters({ ...selectedFilters, spaceRegex: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Space</Label>
                            <Select
                              value={selectedFilters.space || "all"}
                              onValueChange={(value) => setSelectedFilters({ ...selectedFilters, space: value })}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All spaces" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All spaces</SelectItem>
                                <SelectItem value="ENG">Engineering (ENG)</SelectItem>
                                <SelectItem value="DEVOPS">DevOps (DEVOPS)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs">Labels</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {["api", "backend", "devops", "runbooks", "k8s", "ci-cd", "documentation"].map(
                                (label) => (
                                  <Badge
                                    key={label}
                                    variant="outline"
                                    className="text-xs cursor-pointer hover:bg-blue-50"
                                  >
                                    {label}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="slack">
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Slack
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3">
                          <div>
                            <Label className="text-xs">Workspace</Label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All workspaces" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="company-workspace">Company Workspace</SelectItem>
                                <SelectItem value="engineering-workspace">Engineering Workspace</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs">Channels</Label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All channels" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="#engineering">#engineering</SelectItem>
                                <SelectItem value="#support">#support</SelectItem>
                                <SelectItem value="#backend">#backend</SelectItem>
                                <SelectItem value="#frontend">#frontend</SelectItem>
                                <SelectItem value="#devops">#devops</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs">Date Range</Label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                                <SelectItem value="all-time">All time</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="google-docs">
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            Google Docs
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3">
                          <div>
                            <Label className="text-xs">Drive</Label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All drives" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="product-team-drive">Product Team Drive</SelectItem>
                                <SelectItem value="engineering-drive">Engineering Drive</SelectItem>
                                <SelectItem value="company-drive">Company Drive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs">Folders</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {["PRDs", "Specifications", "Architecture", "Design Docs", "RFCs", "User Stories"].map(
                                (folder) => (
                                  <Badge
                                    key={folder}
                                    variant="outline"
                                    className="text-xs cursor-pointer hover:bg-blue-50"
                                  >
                                    {folder}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs">File Types</Label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All types" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="document">Documents</SelectItem>
                                <SelectItem value="spreadsheet">Spreadsheets</SelectItem>
                                <SelectItem value="presentation">Presentations</SelectItem>
                                <SelectItem value="all">All types</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div>
                      <Label className="text-sm font-medium">Filter Presets</Label>
                      <div className="space-y-2 mt-2">
                        {filterPresets.map((preset, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-xs"
                            onClick={() => setSelectedFilters(preset.filters)}
                          >
                            <BookOpen className="mr-2 h-3 w-3" />
                            {preset.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedFilters({ type: "all" })}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Knowledge Sources</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sync All
                        </Button>
                        <Badge variant="secondary">{filteredSources.length} sources</Badge>
                      </div>
                    </div>
                    <CardDescription>
                      Manage and organize your knowledge base sources with advanced metadata filtering.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Source</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Metadata</TableHead>
                          <TableHead>Documents</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Sync</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSources.map((source) => (
                          <TableRow key={source.id}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {source.type === "github" ? (
                                  <Github className="h-4 w-4" />
                                ) : source.type === "slack" ? (
                                  <MessageSquare className="h-4 w-4" />
                                ) : (
                                  <FileText className="h-4 w-4" />
                                )}
                                <div>
                                  <div className="font-medium">{source.name}</div>
                                  <div className="text-sm text-muted-foreground">{source.source}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{source.type}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {source.type === "github" && (
                                  <>
                                    <div className="text-xs">
                                      <span className="font-medium">Repo:</span> {source.metadata.repository}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {source.codeOwners?.map((owner, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {owner}
                                        </Badge>
                                      ))}
                                    </div>
                                  </>
                                )}
                                {source.type === "confluence" && (
                                  <>
                                    <div className="text-xs">
                                      <span className="font-medium">Space:</span> {source.metadata.space}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {source.labels?.map((label, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {label}
                                        </Badge>
                                      ))}
                                    </div>
                                  </>
                                )}
                                {source.type === "slack" && (
                                  <>
                                    <div className="text-xs">
                                      <span className="font-medium">Workspace:</span> {source.metadata.workspace}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {source.channels?.map((channel, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {channel}
                                        </Badge>
                                      ))}
                                    </div>
                                  </>
                                )}
                                {source.type === "google-docs" && (
                                  <>
                                    <div className="text-xs">
                                      <span className="font-medium">Drive:</span> {source.metadata.driveId}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {source.folders?.map((folder, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {folder}
                                        </Badge>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{source.documents.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  source.status === "active"
                                    ? "default"
                                    : source.status === "syncing"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {source.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{source.lastSync}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Button variant="ghost" size="icon">
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Dynamic Mapping Configuration */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Link className="mr-2 h-4 w-4" />
                      Dynamic Response Mapping
                    </CardTitle>
                    <CardDescription>
                      Configure how bot responses are mapped based on metadata and context.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Query Context Mapping</Label>
                          <Textarea
                            placeholder="Define rules for mapping queries to specific knowledge sources based on metadata..."
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Response Priority Rules</Label>
                          <Textarea
                            placeholder="Set priority rules for responses based on code ownership, space relevance, etc..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-mapping" />
                        <Label htmlFor="auto-mapping">Enable automatic metadata-based response mapping</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="ownership-priority" defaultChecked />
                        <Label htmlFor="ownership-priority">Prioritize responses from code owners</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
