"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Database, Plus, Github, BookOpen, FileCode, FileText, Settings, RefreshCw, Filter, Tag } from "lucide-react"

export function RetrieverTuning({ setHasChanges }) {
  const [activeTab, setActiveTab] = useState("indexing")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="indexing" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Indexing Configuration
          </TabsTrigger>
          <TabsTrigger value="context" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Context-Aware Retrieval
          </TabsTrigger>
          <TabsTrigger value="metadata" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Metadata Tagging
          </TabsTrigger>
        </TabsList>

        <TabsContent value="indexing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Source Selection</CardTitle>
              <CardDescription>Select and configure knowledge sources for indexing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">GitHub</h4>
                      <p className="text-sm text-muted-foreground">Code repositories and documentation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600">
                      Connected
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Confluence</h4>
                      <p className="text-sm text-muted-foreground">Documentation and knowledge base</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600">
                      Connected
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileCode className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Jira</h4>
                      <p className="text-sm text-muted-foreground">Project management and issue tracking</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600">
                      Connected
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Google Drive</h4>
                      <p className="text-sm text-muted-foreground">Documents and spreadsheets</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-amber-600">
                      Partial
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                      Configure
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Source
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metadata Fields Mapping</CardTitle>
              <CardDescription>Configure how metadata fields are mapped from source systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label>GitHub Repository</Label>
                    <Input
                      placeholder="repo"
                      defaultValue="repository"
                      className="mt-1"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <Label>Code Owners</Label>
                    <Input
                      placeholder="codeowners"
                      defaultValue="code_owners"
                      className="mt-1"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <Label>Labels</Label>
                    <Input
                      placeholder="labels"
                      defaultValue="github_labels"
                      className="mt-1"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label>Confluence Space</Label>
                    <Input
                      placeholder="space"
                      defaultValue="confluence_space"
                      className="mt-1"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <Label>Space Key</Label>
                    <Input
                      placeholder="spaceKey"
                      defaultValue="space_key"
                      className="mt-1"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <Label>Labels</Label>
                    <Input
                      placeholder="labels"
                      defaultValue="confluence_labels"
                      className="mt-1"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label>Jira Project</Label>
                    <Input
                      placeholder="project"
                      defaultValue="jira_project"
                      className="mt-1"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <Label>Issue Type</Label>
                    <Input
                      placeholder="issueType"
                      defaultValue="issue_type"
                      className="mt-1"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <Label>Labels</Label>
                    <Input
                      placeholder="labels"
                      defaultValue="jira_labels"
                      className="mt-1"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Regex Patterns</CardTitle>
              <CardDescription>Define custom regex patterns for filtering content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Confluence Space Filter</Label>
                  <Input
                    placeholder="Enter regex pattern"
                    defaultValue="(ENG|DEVOPS|SECURITY)"
                    className="mt-1"
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Filter spaces by name pattern</p>
                </div>
                <div>
                  <Label>GitHub Repository Filter</Label>
                  <Input
                    placeholder="Enter regex pattern"
                    defaultValue="^(frontend|backend|api)-.*"
                    className="mt-1"
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Filter repositories by name pattern</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Label Filter</Label>
                  <Input
                    placeholder="Enter regex pattern"
                    defaultValue="(public|internal|documentation)"
                    className="mt-1"
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Filter content by label pattern</p>
                </div>
                <div>
                  <Label>Content Exclusion</Label>
                  <Input
                    placeholder="Enter regex pattern"
                    defaultValue="(confidential|secret|internal-only)"
                    className="mt-1"
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Exclude content matching pattern</p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add New Pattern
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="context" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Filters</CardTitle>
              <CardDescription>Define explicit role-based access rules for content retrieval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Software Engineer</h3>
                    <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="se-admin" defaultChecked onChange={() => setHasChanges(true)} />
                      <Label htmlFor="se-admin">Exclude "admin-only" documents</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="se-readonly" defaultChecked onChange={() => setHasChanges(true)} />
                      <Label htmlFor="se-readonly">Restrict retrieval to read-only guides</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="se-public" defaultChecked onChange={() => setHasChanges(true)} />
                      <Label htmlFor="se-public">Include public documentation only</Label>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm">Allowed Repositories</Label>
                      <Input
                        placeholder="Comma-separated list"
                        defaultValue="frontend-app, shared-libs, documentation"
                        className="mt-1"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Allowed Confluence Spaces</Label>
                      <Input
                        placeholder="Comma-separated list"
                        defaultValue="ENG, FRONTEND, PUBLIC"
                        className="mt-1"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">DevOps Engineer</h3>
                    <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="devops-admin" onChange={() => setHasChanges(true)} />
                      <Label htmlFor="devops-admin">Exclude "admin-only" documents</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="devops-readonly" defaultChecked onChange={() => setHasChanges(true)} />
                      <Label htmlFor="devops-readonly">Allow all operational documents</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="devops-public" onChange={() => setHasChanges(true)} />
                      <Label htmlFor="devops-public">Include infrastructure documentation</Label>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm">Allowed Repositories</Label>
                      <Input
                        placeholder="Comma-separated list"
                        defaultValue="infrastructure, devops, monitoring, deployment"
                        className="mt-1"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Allowed Confluence Spaces</Label>
                      <Input
                        placeholder="Comma-separated list"
                        defaultValue="DEVOPS, INFRA, OPS, SECURITY"
                        className="mt-1"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Role
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conditional Content Selection</CardTitle>
              <CardDescription>Configure advanced conditional rules for content retrieval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Permission-Based Rules</Label>
                  <Textarea
                    placeholder="Enter conditional rules"
                    className="min-h-[150px] mt-1 font-mono text-sm"
                    defaultValue={`if user.role == "Software Engineer":
  exclude_content(label="admin-only")
  restrict_to(permission="read")
  
if user.role == "DevOps Engineer":
  include_content(label="infrastructure")
  allow_content(permission="write")`}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div>
                  <Label>Content Type Rules</Label>
                  <Textarea
                    placeholder="Enter conditional rules"
                    className="min-h-[150px] mt-1 font-mono text-sm"
                    defaultValue={`if content.type == "runbook":
  require_role("DevOps Engineer", "SRE")
  
if content.type == "api-doc":
  allow_role("Software Engineer", "Product Manager")
  
if content.label == "security-sensitive":
  require_permission("security-access")`}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metadata Tagging</CardTitle>
              <CardDescription>Associate or tag KB articles/documents with role-specific metadata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Automatic Metadata Tagging</Label>
                  <Switch defaultChecked onChange={() => setHasChanges(true)} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Role-Based Tags</Label>
                    <Textarea
                      placeholder="Enter tag mapping"
                      className="min-h-[150px] mt-1 font-mono text-sm"
                      defaultValue={`# Role to tag mapping
Software Engineer: frontend, api, development, coding
DevOps Engineer: infrastructure, deployment, monitoring
Security Engineer: security, compliance, audit
Product Manager: roadmap, requirements, features
QA Engineer: testing, quality, automation`}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <Label>Permission-Based Tags</Label>
                    <Textarea
                      placeholder="Enter permission mapping"
                      className="min-h-[150px] mt-1 font-mono text-sm"
                      defaultValue={`# Permission to tag mapping
read-only: documentation, guide, tutorial
read-write: configuration, setup
admin: security-config, infrastructure-admin
restricted: confidential, internal-only, sensitive`}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Tag Document Collections</h3>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span className="font-medium">Kubernetes Deployment Guides</span>
                      </div>
                      <Badge variant="outline">15 documents</Badge>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label className="text-sm">Role Tags</Label>
                        <Input
                          placeholder="Enter role tags"
                          defaultValue="DevOps Engineer, SRE"
                          className="mt-1"
                          onChange={() => setHasChanges(true)}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Permission Tags</Label>
                        <Input
                          placeholder="Enter permission tags"
                          defaultValue="read-write, admin"
                          className="mt-1"
                          onChange={() => setHasChanges(true)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span className="font-medium">Frontend Development Guidelines</span>
                      </div>
                      <Badge variant="outline">23 documents</Badge>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label className="text-sm">Role Tags</Label>
                        <Input
                          placeholder="Enter role tags"
                          defaultValue="Software Engineer, UI Designer"
                          className="mt-1"
                          onChange={() => setHasChanges(true)}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Permission Tags</Label>
                        <Input
                          placeholder="Enter permission tags"
                          defaultValue="read-only"
                          className="mt-1"
                          onChange={() => setHasChanges(true)}
                        />
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Document Collection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metadata Extraction Rules</CardTitle>
              <CardDescription>Configure rules for extracting metadata from documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>GitHub Metadata Extraction</Label>
                    <Textarea
                      placeholder="Enter extraction rules"
                      className="min-h-[100px] mt-1 font-mono text-sm"
                      defaultValue={`extract:
  repository: path[0]
  owner: from(CODEOWNERS)
  language: file_extension
  team: from(CODEOWNERS, teams)`}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <Label>Confluence Metadata Extraction</Label>
                    <Textarea
                      placeholder="Enter extraction rules"
                      className="min-h-[100px] mt-1 font-mono text-sm"
                      defaultValue={`extract:
  space: page.space.key
  creator: page.creator.name
  last_updated: page.lastModified
  labels: page.labels`}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Run Metadata Extraction</Label>
                  <Button variant="outline" onClick={() => setHasChanges(true)}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Run Extraction
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
