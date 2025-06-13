"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PageHeader, PageHeaderContent, PageHeaderActions } from '@/components/ui/page-header';
import { HeaderActionButtons, CardActionButtons, DialogActionButtons } from '@/components/ui/button-style-guide';
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
  Ticket
} from 'lucide-react';

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
];

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
];

export const WorkflowsPage: React.FC = () => {
  const [workflowList, setWorkflowList] = useState(workflows);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEscalationDialogOpen, setIsEscalationDialogOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Debug log to verify component is loading with new code
  console.log('WorkflowsPage loaded with button handlers');

  // Handler functions
  const handleToggleWorkflow = (workflowId: number) => {
    setWorkflowList(prev => prev.map(workflow =>
      workflow.id === workflowId
        ? { ...workflow, status: workflow.status === 'active' ? 'paused' : 'active' }
        : workflow
    ));
  };

  const handleEditWorkflow = (workflow: any) => {
    setSelectedWorkflow(workflow);
    setIsEditDialogOpen(true);
  };

  const handleDeleteWorkflow = (workflowId: number) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      setWorkflowList(prev => prev.filter(workflow => workflow.id !== workflowId));
    }
  };

  const handleOpenBuilder = () => {
    alert('Opening Visual Workflow Builder...\n\nThis would open a drag-and-drop interface for building complex workflows.');
  };

  const escalationWorkflow = workflowList.find((w) => w.id === 4);

  return (
    <div className="w-full max-w-none space-y-6">
      <PageHeader>
        <PageHeaderContent>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Workflows</h1>
          <p className="text-muted-foreground">
            Create and manage no-code/low-code automation workflows.
          </p>
        </PageHeaderContent>
        <PageHeaderActions>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <div>
                <HeaderActionButtons
                  primaryAction={{
                    label: "Create Workflow",
                    icon: Plus,
                    onClick: () => setIsCreateDialogOpen(true)
                  }}
                />
              </div>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
              <DialogDescription>
                Design an automated workflow for your ChatOps system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                <Label htmlFor="name" className="sm:text-right">
                  Name
                </Label>
                <Input id="name" className="sm:col-span-3" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                <Label htmlFor="description" className="sm:text-right">
                  Description
                </Label>
                <Textarea id="description" className="sm:col-span-3" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                <Label htmlFor="trigger-type" className="sm:text-right">
                  Trigger
                </Label>
                <Select>
                  <SelectTrigger className="sm:col-span-3">
                    <SelectValue placeholder="Select trigger type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slack_mention">Slack Mention</SelectItem>
                    <SelectItem value="keyword_detection">Keyword Detection</SelectItem>
                    <SelectItem value="ticket_created">Ticket Created</SelectItem>
                    <SelectItem value="no_response_found">No Response Found</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogActionButtons
                onCancel={() => setIsCreateDialogOpen(false)}
                onPrimary={() => {
                  // Here you would create the new workflow
                  alert('New workflow created successfully!');
                  setIsCreateDialogOpen(false);
                }}
                primaryLabel="Create Workflow"
                cancelLabel="Cancel"
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </PageHeaderActions>
      </PageHeader>

      {/* Edit Workflow Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Workflow</DialogTitle>
            <DialogDescription>
              Modify the workflow configuration and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
              <Label htmlFor="edit-name" className="sm:text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                className="sm:col-span-3"
                defaultValue={selectedWorkflow?.name || ''}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
              <Label htmlFor="edit-description" className="sm:text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                className="sm:col-span-3"
                defaultValue={selectedWorkflow?.description || ''}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
              <Label htmlFor="edit-status" className="sm:text-right">
                Status
              </Label>
              <Select defaultValue={selectedWorkflow?.status || 'draft'}>
                <SelectTrigger className="sm:col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogActionButtons
              onCancel={() => setIsEditDialogOpen(false)}
              onPrimary={() => {
                // Here you would save the changes
                alert('Workflow updated successfully!');
                setIsEditDialogOpen(false);
              }}
              primaryLabel="Save Changes"
              cancelLabel="Cancel"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Escalation Path Highlight */}
      <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
        <CardHeader>
          <PageHeader>
            <PageHeaderContent>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <span>Unanswered Question Escalation Path</span>
              </CardTitle>
              <CardDescription>
                Automated triage system for questions that cannot be answered by the AI system
              </CardDescription>
            </PageHeaderContent>
            <PageHeaderActions>
              <Badge variant="default" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                Active
              </Badge>
              <Dialog open={isEscalationDialogOpen} onOpenChange={setIsEscalationDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Configure Escalation Path</DialogTitle>
                    <DialogDescription>
                      Set up automated triage for unanswered questions and failed responses
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                      <Label htmlFor="timeout" className="sm:text-right">
                        Response Timeout (minutes)
                      </Label>
                      <Input id="timeout" defaultValue="5" className="sm:col-span-3" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                      <Label htmlFor="confidence" className="sm:text-right">
                        Confidence Threshold
                      </Label>
                      <Input id="confidence" defaultValue="0.7" className="sm:col-span-3" />
                    </div>
                    <div>
                      <Label className="text-base font-medium">Escalation Triggers</Label>
                      <div className="mt-2 space-y-2">
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
                          <Switch id="complex-question" />
                          <Label htmlFor="complex-question">Complex multi-part questions</Label>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-base font-medium">Triage Rules</Label>
                        <div className="mt-2">
                          <Label htmlFor="human-review-criteria">Human Review Criteria</Label>
                          <Textarea
                            id="human-review-criteria"
                            placeholder="Define criteria for routing to human review..."
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mt-2">
                          <Label htmlFor="ticket-creation-criteria">Ticket Creation Criteria</Label>
                          <Textarea
                            id="ticket-creation-criteria"
                            placeholder="Define criteria for creating support tickets..."
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Expert Assignment</Label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <Label>Domain Experts</Label>
                          <div className="mt-2 space-y-2">
                            {["Frontend Team", "Backend Team", "DevOps Team", "Product Team"].map((team) => (
                              <div key={team} className="flex items-center space-x-2">
                                <Switch id={team.toLowerCase().replace(" ", "-")} />
                                <Label htmlFor={team.toLowerCase().replace(" ", "-")}>{team}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Escalation Channel</Label>
                          <Select defaultValue="support-escalation">
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="support-escalation">#support-escalation</SelectItem>
                              <SelectItem value="engineering-help">#engineering-help</SelectItem>
                              <SelectItem value="product-questions">#product-questions</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogActionButtons
                      onCancel={() => setIsEscalationDialogOpen(false)}
                      onPrimary={() => {
                        // Here you would save the escalation configuration
                        alert('Escalation configuration saved successfully!');
                        setIsEscalationDialogOpen(false);
                      }}
                      primaryLabel="Save Configuration"
                      cancelLabel="Cancel"
                    />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </PageHeaderActions>
          </PageHeader>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            Last 24 hours: 23 questions escalated • 18 resolved by humans • 5 tickets created
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium">92.8% Success Rate</span>
          </div>
        </CardContent>
      </Card>

      {/* Escalation Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Escalation Flow</CardTitle>
          <CardDescription>
            Visual representation of the question escalation process
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Flow View */}
          <div className="hidden lg:flex items-start justify-between gap-4">
            {escalationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center space-y-3 w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-center w-full">
                    <h4 className="font-medium text-sm mb-1">{step.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {step.conditions.map((condition, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                {index < escalationSteps.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Flow View */}
          <div className="lg:hidden space-y-4">
            {escalationSteps.map((step, index) => (
              <div key={step.id}>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{step.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {step.conditions.map((condition, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                {index < escalationSteps.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow List */}
      <div className="grid gap-4">
        {workflowList.map((workflow) => (
          <Card key={workflow.id}>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <GitBranch className="h-5 w-5 text-primary mt-1" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <CardTitle className="text-lg">{workflow.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={workflow.status === "active" ? "default" : workflow.status === "draft" ? "secondary" : "outline"}>
                          {workflow.status}
                        </Badge>
                        {workflow.id === 4 && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
                            Escalation Path
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardDescription className="mt-1">{workflow.description}</CardDescription>
                  </div>
                </div>
                <CardActionButtons
                  actions={[
                    {
                      label: workflow.status === "active" ? "Pause" : "Activate",
                      icon: workflow.status === "active" ? Pause : Play,
                      onClick: () => handleToggleWorkflow(workflow.id),
                      variant: "outline"
                    },
                    {
                      label: "Edit",
                      icon: Edit,
                      onClick: () => handleEditWorkflow(workflow),
                      variant: "outline"
                    },
                    {
                      label: "Delete",
                      icon: Trash2,
                      onClick: () => handleDeleteWorkflow(workflow.id),
                      variant: "destructive"
                    }
                  ]}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                <div>
                  <h4 className="font-medium mb-2">Triggers</h4>
                  <div className="flex flex-wrap gap-1">
                    {workflow.triggers.map((trigger, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {trigger.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Actions</h4>
                  <div className="flex flex-wrap gap-1">
                    {workflow.actions.map((action, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {action.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Last Run:</span>
                      <span className="font-medium">{workflow.lastRun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="font-medium">{workflow.successRate}%</span>
                    </div>
                    {workflow.id === 4 && (
                      <>
                        <div className="flex justify-between">
                          <span>Human Reviews:</span>
                          <span className="font-medium">18 today</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tickets Created:</span>
                          <span className="font-medium">5 today</span>
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

      {/* Additional Cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workflow Builder</CardTitle>
            <CardDescription>
              Visual workflow designer for complex automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <GitBranch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Visual Workflow Designer</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop components to build complex workflows
              </p>
              <Button onClick={handleOpenBuilder}>
                <GitBranch className="mr-2 h-4 w-4" />
                Open Builder
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Escalation Analytics</CardTitle>
            <CardDescription>
              Monitor escalation path performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Questions Escalated Today</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg. Human Response Time</span>
                <span className="font-medium">12 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Ticket Resolution Rate</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">User Satisfaction</span>
                <span className="font-medium">4.2/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowsPage;