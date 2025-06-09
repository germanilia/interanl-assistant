"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Code, FileText, Settings, Copy, Check } from "lucide-react"

export function GeneratorTuning({ setHasChanges }) {
  const [activeTab, setActiveTab] = useState("templates")
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Response Templates
          </TabsTrigger>
          <TabsTrigger value="conditional" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Conditional Logic
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Generator Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Response Template Editor</CardTitle>
              <CardDescription>Create and edit role-specific response templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">Software Engineer Template</h3>
                      <Badge variant="outline">Default</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Textarea
                    className="min-h-[200px] font-mono text-sm"
                    defaultValue={`{% if action_requires_admin_permission %}
Please contact DevOps for {{ action }}. Meanwhile, you can {{ read_only_instructions }}.

For more information, check the documentation at {{ documentation_link }}.
{% else %}
You can perform {{ action }} by following these steps:

1. {{ step_1 }}
2. {{ step_2 }}
3. {{ step_3 }}

For more details, see {{ documentation_link }}.
{% endif %}`}
                    onChange={() => setHasChanges(true)}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="se-default" defaultChecked onChange={() => setHasChanges(true)} />
                      <Label htmlFor="se-default">Set as default for Software Engineers</Label>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                      Test Template
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">DevOps Engineer Template</h3>
                      <Badge variant="outline">Default</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Textarea
                    className="min-h-[200px] font-mono text-sm"
                    defaultValue={`You can perform {{ action }} directly by running:

\`\`\`bash
{{ command }}
\`\`\`

{% if has_caution %}
⚠️ **Caution**: {{ caution_message }}
{% endif %}

For more information, check the documentation at {{ documentation_link }}.

{% if has_related_commands %}
Related commands:
{% for cmd in related_commands %}
- \`{{ cmd }}\`
{% endfor %}
{% endif %}`}
                    onChange={() => setHasChanges(true)}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="devops-default" defaultChecked onChange={() => setHasChanges(true)} />
                      <Label htmlFor="devops-default">Set as default for DevOps Engineers</Label>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                      Test Template
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Template
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variable Placeholders</CardTitle>
              <CardDescription>Define and manage variable placeholders for templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label>Action Variables</Label>
                    <div className="space-y-2 mt-2">
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm">action</div>
                        <div className="text-xs text-muted-foreground">The action being performed</div>
                      </div>
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm">command</div>
                        <div className="text-xs text-muted-foreground">Command to execute</div>
                      </div>
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm">read_only_instructions</div>
                        <div className="text-xs text-muted-foreground">Instructions for read-only users</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Documentation Variables</Label>
                    <div className="space-y-2 mt-2">
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm">documentation_link</div>
                        <div className="text-xs text-muted-foreground">Link to documentation</div>
                      </div>
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm">related_commands</div>
                        <div className="text-xs text-muted-foreground">List of related commands</div>
                      </div>
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm">caution_message</div>
                        <div className="text-xs text-muted-foreground">Warning message for actions</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Conditional Variables</Label>
                    <div className="space-y-2 mt-2">
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm">action_requires_admin_permission</div>
                        <div className="text-xs text-muted-foreground">Boolean for admin permission</div>
                      </div>
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm">has_caution</div>
                        <div className="text-xs text-muted-foreground">Boolean for caution message</div>
                      </div>
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm">has_related_commands</div>
                        <div className="text-xs text-muted-foreground">Boolean for related commands</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Variable
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conditional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conditional Logic Editor</CardTitle>
              <CardDescription>Define conditional logic for response generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Role-Based Response Logic</h3>
                    <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea
                    className="min-h-[200px] font-mono text-sm"
                    defaultValue={`def generate_response(user_role, action, context):
    if user_role == "Software Engineer":
        if action in ["restart_pod", "scale_deployment", "update_config"]:
            return templates.get("software_engineer_restricted").render(
                action=action,
                read_only_instructions=get_readonly_instructions(action),
                documentation_link=get_documentation_link(action)
            )
        else:
            return templates.get("software_engineer_default").render(
                action=action,
                step_1=get_step(action, 1),
                step_2=get_step(action, 2),
                step_3=get_step(action, 3),
                documentation_link=get_documentation_link(action)
            )
    
    elif user_role == "DevOps Engineer":
        command = get_command_for_action(action)
        has_caution = is_caution_needed(action)
        
        return templates.get("devops_engineer_default").render(
            action=action,
            command=command,
            has_caution=has_caution,
            caution_message=get_caution_message(action) if has_caution else "",
            documentation_link=get_documentation_link(action),
            has_related_commands=has_related_commands(action),
            related_commands=get_related_commands(action) if has_related_commands(action) else []
        )`}
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Permission-Based Response Logic</h3>
                    <Button variant="outline" size="sm" onClick={() => setHasChanges(true)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea
                    className="min-h-[200px] font-mono text-sm"
                    defaultValue={`def check_permissions(user, action, resource):
    # Check if user has permission for the action on the resource
    if not has_permission(user, action, resource):
        if action == "view":
            return templates.get("permission_denied_view").render(
                resource=resource,
                request_access_link=get_access_request_link(resource)
            )
        elif action in ["edit", "delete", "create"]:
            return templates.get("permission_denied_modify").render(
                action=action,
                resource=resource,
                alternative_action=get_alternative_action(action, resource),
                request_access_link=get_access_request_link(resource)
            )
        else:
            return templates.get("permission_denied_generic").render(
                action=action,
                resource=resource,
                contact=get_resource_owner(resource)
            )
    
    # User has permission, proceed with normal response
    return None  # Continue with normal response generation`}
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Logic Block
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Helper Functions</CardTitle>
              <CardDescription>Define helper functions for conditional logic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Permission Helpers</Label>
                    <Textarea
                      className="min-h-[150px] mt-1 font-mono text-sm"
                      defaultValue={`def has_permission(user, action, resource):
    # Check user permissions against resource ACLs
    return user.permissions.get(resource, {}).get(action, False)

def get_resource_owner(resource):
    # Return the owner/contact for a resource
    return resource_metadata.get(resource, {}).get("owner", "support@company.com")

def get_access_request_link(resource):
    # Generate access request link
    return f"https://access.company.com/request?resource={resource}"`}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <Label>Content Helpers</Label>
                    <Textarea
                      className="min-h-[150px] mt-1 font-mono text-sm"
                      defaultValue={`def get_command_for_action(action):
    # Return command for specific action
    commands = {
        "restart_pod": "kubectl rollout restart deployment/{deployment}",
        "scale_deployment": "kubectl scale deployment/{deployment} --replicas={count}",
        "update_config": "kubectl apply -f {config_file}"
    }
    return commands.get(action, "echo 'Command not found'")

def get_documentation_link(action):
    # Return documentation link for action
    docs = {
        "restart_pod": "https://docs.company.com/kubernetes/restart",
        "scale_deployment": "https://docs.company.com/kubernetes/scale",
        "update_config": "https://docs.company.com/kubernetes/config"
    }
    return docs.get(action, "https://docs.company.com/search?q=" + action)`}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Helper Function
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generator Settings</CardTitle>
              <CardDescription>Configure global settings for the response generator</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-medium">Response Format</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="markdown">Enable Markdown</Label>
                      <Switch id="markdown" defaultChecked onChange={() => setHasChanges(true)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="code-blocks">Syntax Highlighting</Label>
                      <Switch id="code-blocks" defaultChecked onChange={() => setHasChanges(true)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emojis">Allow Emojis</Label>
                      <Switch id="emojis" defaultChecked onChange={() => setHasChanges(true)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Maximum Response Length</Label>
                    <Select defaultValue="2000" onValueChange={() => setHasChanges(true)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000">1000 characters</SelectItem>
                        <SelectItem value="2000">2000 characters</SelectItem>
                        <SelectItem value="5000">5000 characters</SelectItem>
                        <SelectItem value="10000">10000 characters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Permission Handling</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="strict-permissions">Strict Permission Checking</Label>
                      <Switch id="strict-permissions" defaultChecked onChange={() => setHasChanges(true)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="permission-warnings">Show Permission Warnings</Label>
                      <Switch id="permission-warnings" defaultChecked onChange={() => setHasChanges(true)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="alternative-actions">Suggest Alternative Actions</Label>
                      <Switch id="alternative-actions" defaultChecked onChange={() => setHasChanges(true)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Response Mode</Label>
                    <Select defaultValue="helpful" onValueChange={() => setHasChanges(true)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strict">Strict (Deny by default)</SelectItem>
                        <SelectItem value="helpful">Helpful (Suggest alternatives)</SelectItem>
                        <SelectItem value="permissive">Permissive (Allow with warnings)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>\
