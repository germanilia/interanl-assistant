"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Play,
  Pause,
  Edit,
  Trash2,
  GitBranch,
  AlertTriangle,
  CheckCircle,
  Users,
  ArrowRight,
  HelpCircle,
  Ticket,
} from "lucide-react"

const workflows = [
  {
    id: 1,
    name: "Incident Response",
    description: "Automated incident detection and escalation workflow",
    status: "active",
    triggers: ["slack_mention", "keyword_detection"],
    actions: ["create_ticket", "notify_team", "escalate"],
    lastRun: "5 minutes ago",
    successRate: 98.5,
  },
  {
    id: 2,
    name: "Knowledge Base Update",
    description: "Automatically update KB based on resolved tickets",
    status: "active",
    triggers: ["ticket_resolved"],
    actions: ["extract_solution", "update_kb", "notify_team"],
    lastRun: "2 hours ago",
    successRate: 95.2,
  },
  {
    id: 3,
    name: "User Onboarding",
    description: "Guide new users through system setup",
    status: "draft",
    triggers: ["new_user_signup"],
    actions: ["send_welcome", "create_tutorial", "schedule_followup"],
    lastRun: "Never",
    successRate: 0,
  },
  {
    id: 4,
    name: "Unanswered Question Escalation",
    description: "Triage unanswered questions for human intervention or ticket creation",
    status: "active",
    triggers: ["no_response_found", "low_confidence_answer", "user_unsatisfied"],
    actions: ["assess_complexity", "route_to_human", "create_ticket", "notify_experts"],
    lastRun: "1 minute ago",
    successRate: 92.8,
    escalationPath: {
      enabled: true,
      timeoutMinutes: 5,
      confidenceThreshold: 0.7,
      humanReviewRequired: true,
    },
  },
]

const escalationSteps = [
  {
    id: 1,
    name: "Question Analysis",
    description: "Analyze question complexity and available knowledge",
    icon: HelpCircle,
    conditions: ["No matching KB articles", "Confidence < 70%", "User feedback negative"],
  },
  {
    id: 2,
    name: "Triage Decision",
    description: "Determine if question needs human review or ticket creation",
    icon: GitBranch,
    conditions: ["Technical complexity assessment", "Urgency evaluation", "Domain expertise required"],
  },
  {
    id: 3,
    name: "Human Review",
    description: "Route to subject matter expert for ad-hoc response",
    icon: Users,
    conditions: ["Quick answer possible", "Expert available", "Low complexity"],
  },
  {
    id: 4,
    name: "Ticket Creation",
    description: "Create support ticket for complex or time-intensive issues",
    icon: Ticket,
    conditions: ["High complexity", "Research required", "No expert available"],
  },
]

export default function WorkflowsPage() {
  const [workflowList, setWorkflowList] = useState(workflows)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEscalationDialogOpen, setIsEscalationDialogOpen] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null)

  const escalationWorkflow = workflowList.find((w) => w.id === 4)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Workflows</h2>
                <p className="text-muted-foreground">Create and manage no-code/low-code automation workflows.</p>
              </div>

              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Workflow
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Workflow</DialogTitle>
                    <DialogDescription>Design an automated workflow for your ChatOps system.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="workflow-name" className="text-right">
                        Name
                      </Label>
                      <Input id="workflow-name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="workflow-desc" className="text-right">
                        Description
                      </Label>
                      <Textarea id="workflow-desc" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="trigger-type" className="text-right">
                        Trigger
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select trigger type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slack_mention">Slack Mention</SelectItem>
                          <SelectItem value="keyword_detection">Keyword Detection</SelectItem>
                          <SelectItem value="ticket_created">Ticket Created</SelectItem>
                          <SelectItem value="no_response_found">No Response Found</SelectItem>
                          <SelectItem value="schedule">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => setIsCreateDialogOpen(false)}>
                      Create Workflow
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Escalation Path Highlight */}
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-blue-600" />
                      Unanswered Question Escalation Path
                    </CardTitle>
                    <CardDescription>
                      Automated triage system for questions that cannot be answered by the AI system
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Active</Badge>
                    <Dialog open={isEscalationDialogOpen} onOpenChange={setIsEscalationDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                          <DialogTitle>Configure Escalation Path</DialogTitle>
                          <DialogDescription>
                            Set up automated triage for unanswered questions and failed responses
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label htmlFor="timeout">Response Timeout (minutes)</Label>
                              <Input id="timeout" type="number" defaultValue="5" />
                            </div>
                            <div>
                              <Label htmlFor="confidence">Confidence Threshold</Label>
                              <Input id="confidence" type="number" step="0.1" defaultValue="0.7" />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label className="text-base font-medium">Escalation Triggers</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Switch id="no-response" defaultChecked />
                                <Label htmlFor="no-response">No response found in knowledge base</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id="low-confidence" defaultChecked />
                                <Label htmlFor="low-confidence">Low confidence answer (below threshold)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id="user-unsatisfied" defaultChecked />
                                <Label htmlFor="user-unsatisfied">User marked response as unsatisfactory</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id="complex-query" />
                                <Label htmlFor="complex-query">Complex multi-part questions</Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label className="text-base font-medium">Triage Rules</Label>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <Label htmlFor="human-review-criteria">Human Review Criteria</Label>
                                <Textarea
                                  id="human-review-criteria"
                                  placeholder="Quick questions, clarifications, simple how-to queries..."
                                  className="min-h-[80px]"
                                />
                              </div>
                              <div>
                                <Label htmlFor="ticket-creation-criteria">Ticket Creation Criteria</Label>
                                <Textarea
                                  id="ticket-creation-criteria"
                                  placeholder="Complex technical issues, feature requests, bugs..."
                                  className="min-h-[80px]"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label className="text-base font-medium">Expert Assignment</Label>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <Label htmlFor="domain-experts">Domain Experts</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select expert group" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="frontend-team">Frontend Team</SelectItem>
                                    <SelectItem value="backend-team">Backend Team</SelectItem>
                                    <SelectItem value="devops-team">DevOps Team</SelectItem>
                                    <SelectItem value="product-team">Product Team</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="escalation-channel">Escalation Channel</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Slack channel" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="#support-escalation">#support-escalation</SelectItem>
                                    <SelectItem value="#engineering-help">#engineering-help</SelectItem>
                                    <SelectItem value="#product-questions">#product-questions</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={() => setIsEscalationDialogOpen(false)}>
                            Save Configuration
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-muted-foreground">
                    Last 24 hours: <span className="font-medium">23 questions escalated</span> •
                    <span className="font-medium"> 18 resolved by humans</span> •
                    <span className="font-medium"> 5 tickets created</span>
                  </div>
                  <Badge variant="secondary">92.8% Success Rate</Badge>
                </div>

                {/* Escalation Flow Visualization */}
                <div className="grid gap-4 md:grid-cols-4">
                  {escalationSteps.map((step, index) => (
                    <div key={step.id} className="relative">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          <step.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-sm mb-1">{step.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                        <div className="space-y-1">
                          {step.conditions.map((condition, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {index < escalationSteps.length - 1 && (
                        <ArrowRight className="absolute top-6 -right-2 h-4 w-4 text-gray-400 hidden md:block" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              {workflowList.map((workflow) => (
                <Card key={workflow.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {workflow.name}
                          <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                            {workflow.status}
                          </Badge>
                          {workflow.id === 4 && (
                            <Badge variant="outline" className="text-orange-600 border-orange-200">
                              Escalation Path
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{workflow.description}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          {workflow.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <GitBranch className="mr-2 h-4 w-4" />
                          Triggers
                        </h4>
                        <div className="space-y-1">
                          {workflow.triggers.map((trigger, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {trigger.replace("_", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Actions
                        </h4>
                        <div className="space-y-1">
                          {workflow.actions.map((action, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {action.replace("_", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Performance</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Run:</span>
                            <span>{workflow.lastRun}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Success Rate:</span>
                            <span>{workflow.successRate}%</span>
                          </div>
                          {workflow.id === 4 && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Human Reviews:</span>
                                <span>18 today</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Tickets Created:</span>
                                <span>5 today</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Builder</CardTitle>
                  <CardDescription>Visual workflow designer for complex automation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <GitBranch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Visual Workflow Designer</h3>
                    <p className="text-gray-500 mb-4">Drag and drop components to build complex workflows</p>
                    <Button>Open Builder</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Escalation Analytics</CardTitle>
                  <CardDescription>Monitor escalation path performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Questions Escalated Today</span>
                      <Badge variant="secondary">23</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg. Human Response Time</span>
                      <Badge variant="secondary">12 min</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ticket Resolution Rate</span>
                      <Badge variant="secondary">89%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">User Satisfaction</span>
                      <Badge variant="secondary">4.2/5</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
