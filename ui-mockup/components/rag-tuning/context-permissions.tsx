"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Users, Shield, Plus, Edit, Trash2, Download, Upload, Settings, Check, X } from "lucide-react"

interface ContextPermissionsProps {
  setHasChanges: (hasChanges: boolean) => void
}

const roles = [
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    description: "Full operational access with deployment and infrastructure management",
    permissions: {
      canRestartPod: true,
      canEditJenkinsJob: true,
      canViewLogs: true,
      canAccessSecrets: true,
      canModifyInfra: true,
    },
    userCount: 12,
  },
  {
    id: "software-engineer",
    name: "Software Engineer",
    description: "Development-focused access with limited operational permissions",
    permissions: {
      canRestartPod: false,
      canEditJenkinsJob: false,
      canViewLogs: true,
      canAccessSecrets: false,
      canModifyInfra: false,
    },
    userCount: 45,
  },
  {
    id: "qa-engineer",
    name: "QA Engineer",
    description: "Testing and quality assurance with read-only operational access",
    permissions: {
      canRestartPod: false,
      canEditJenkinsJob: false,
      canViewLogs: true,
      canAccessSecrets: false,
      canModifyInfra: false,
    },
    userCount: 8,
  },
  {
    id: "product-manager",
    name: "Product Manager",
    description: "Strategic oversight with limited technical access",
    permissions: {
      canRestartPod: false,
      canEditJenkinsJob: false,
      canViewLogs: false,
      canAccessSecrets: false,
      canModifyInfra: false,
    },
    userCount: 6,
  },
]

const permissionSets = [
  {
    id: "full-access",
    name: "Full Access",
    description: "Complete system access for administrators",
    permissions: ["restart-pods", "edit-jobs", "view-logs", "access-secrets", "modify-infrastructure"],
  },
  {
    id: "read-only",
    name: "Read Only",
    description: "View-only access to system information",
    permissions: ["view-logs"],
  },
  {
    id: "developer",
    name: "Developer",
    description: "Standard development permissions",
    permissions: ["view-logs", "edit-jobs"],
  },
]

export function ContextPermissions({ setHasChanges }: ContextPermissionsProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showRoleDialog, setShowRoleDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("roles")

  const handlePermissionChange = (roleId: string, permission: string, value: boolean) => {
    setHasChanges(true)
    console.log(`Updating ${roleId} - ${permission}: ${value}`)
  }

  const exportRoles = (format: string) => {
    console.log(`Exporting roles in ${format} format`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Context & Permissions</h3>
          <p className="text-sm text-muted-foreground">Manage roles and permissions for context-aware RAG responses</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => exportRoles("yaml")}>
            <Download className="mr-2 h-4 w-4" />
            Export YAML
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportRoles("csv")}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="permission-sets" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Permission Sets
          </TabsTrigger>
          <TabsTrigger value="mapping" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            RAG Mapping
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-6">
          {/* Role & Permission Manager */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Role & Permission Matrix
                  </CardTitle>
                  <CardDescription>Configure role-based access controls for RAG system integration</CardDescription>
                </div>
                <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Role</DialogTitle>
                      <DialogDescription>
                        Define a new role with specific permissions for the RAG system
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="role-name">Role Name</Label>
                        <Input id="role-name" placeholder="e.g., Senior Developer" />
                      </div>
                      <div>
                        <Label htmlFor="role-description">Description</Label>
                        <Textarea id="role-description" placeholder="Describe the role's responsibilities..." />
                      </div>
                      <div>
                        <Label>Permission Set</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a permission set" />
                          </SelectTrigger>
                          <SelectContent>
                            {permissionSets.map((set) => (
                              <SelectItem key={set.id} value={set.id}>
                                {set.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowRoleDialog(false)}>Create Role</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-center">Restart Pods</TableHead>
                    <TableHead className="text-center">Edit Jenkins Jobs</TableHead>
                    <TableHead className="text-center">View Logs & Metrics</TableHead>
                    <TableHead className="text-center">Access Secrets</TableHead>
                    <TableHead className="text-center">Modify Infrastructure</TableHead>
                    <TableHead className="text-center">Users</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{role.name}</div>
                          <div className="text-sm text-muted-foreground">{role.description}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {role.permissions.canRestartPod ? (
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {role.permissions.canEditJenkinsJob ? (
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {role.permissions.canViewLogs ? (
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {role.permissions.canAccessSecrets ? (
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {role.permissions.canModifyInfra ? (
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{role.userCount}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedRole(role.id)}>
                            <Edit className="h-4 w-4" />
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

          {/* Role Details */}
          {selectedRole && (
            <Card>
              <CardHeader>
                <CardTitle>Role Configuration</CardTitle>
                <CardDescription>
                  Fine-tune permissions and RAG behavior for {roles.find((r) => r.id === selectedRole)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-medium">System Permissions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="restart-pods">Can Restart Pods</Label>
                        <Switch
                          id="restart-pods"
                          checked={roles.find((r) => r.id === selectedRole)?.permissions.canRestartPod}
                          onCheckedChange={(checked) => handlePermissionChange(selectedRole, "canRestartPod", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="edit-jenkins">Can Edit Jenkins Jobs</Label>
                        <Switch
                          id="edit-jenkins"
                          checked={roles.find((r) => r.id === selectedRole)?.permissions.canEditJenkinsJob}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(selectedRole, "canEditJenkinsJob", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="view-logs">Can View Logs & Metrics</Label>
                        <Switch
                          id="view-logs"
                          checked={roles.find((r) => r.id === selectedRole)?.permissions.canViewLogs}
                          onCheckedChange={(checked) => handlePermissionChange(selectedRole, "canViewLogs", checked)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">RAG Content Filters</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="exclude-admin">Exclude Admin-Only Documents</Label>
                        <Switch id="exclude-admin" defaultChecked={selectedRole === "software-engineer"} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="restrict-readonly">Restrict to Read-Only Guides</Label>
                        <Switch id="restrict-readonly" defaultChecked={selectedRole === "software-engineer"} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="allow-operational">Allow Operational Documents</Label>
                        <Switch id="allow-operational" defaultChecked={selectedRole === "devops-engineer"} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="permission-sets" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Permission Sets
                  </CardTitle>
                  <CardDescription>Reusable permission templates for role assignment</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Set
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {permissionSets.map((set) => (
                  <Card key={set.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{set.name}</CardTitle>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>{set.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {set.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission.replace("-", " ")}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                RAG Behavior Mapping
              </CardTitle>
              <CardDescription>Configure how roles affect retrieval and generation behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Retrieval Behavior</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Document Filtering Rules</Label>
                      <Textarea
                        placeholder="Define role-based document filtering logic..."
                        className="mt-1"
                        defaultValue={`# Software Engineer Rules
exclude_tags: ["admin-only", "infrastructure"]
include_tags: ["development", "troubleshooting"]
max_security_level: "internal"

# DevOps Engineer Rules  
include_all: true
max_security_level: "confidential"`}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Generation Behavior</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Response Templates</Label>
                      <Textarea
                        placeholder="Define role-based response templates..."
                        className="mt-1"
                        defaultValue={`# Software Engineer Template
"Please contact DevOps for {action}. Meanwhile, you can {readonly_instructions}."

# DevOps Engineer Template
"You can perform {action} directly by running: {command}"`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
