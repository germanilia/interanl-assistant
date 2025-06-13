"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActionBar, ActionBarActions } from '@/components/ui/action-bar';
import { Separator } from '@/components/ui/separator';
import { HeaderActionButtons } from '@/components/ui/button-style-guide';
import {
  Shield,
  Eye,
  AlertTriangle,
  FileText,
  BarChart3,
  Settings,
  Save,
  RotateCcw,
  History,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

const guardrailCategories = [
  {
    id: "pii-masking",
    name: "PII/Secret Masking",
    icon: Eye,
    enabled: true,
    description: "Mask sensitive information in queries and responses",
  },
  {
    id: "prompt-injection",
    name: "Prompt Injection Prevention",
    icon: Shield,
    enabled: true,
    description: "Detect and prevent malicious prompt injection attempts",
  },
  {
    id: "harmful-content",
    name: "Harmful Content Filtering",
    icon: AlertTriangle,
    enabled: true,
    description: "Filter out harmful, inappropriate, or offensive content",
  },
];

const piiTypes = [
  { id: "email", label: "Email Addresses", enabled: true },
  { id: "ip", label: "IP Addresses", enabled: true },
  { id: "credit-card", label: "Credit Card Numbers", enabled: true },
  { id: "api-keys", label: "API Keys", enabled: true },
  { id: "ssn", label: "Social Security Numbers", enabled: false },
  { id: "phone", label: "Phone Numbers", enabled: false },
  { id: "addresses", label: "Physical Addresses", enabled: false },
];

const harmfulCategories = [
  { id: "hate-speech", label: "Hate Speech", action: "block", enabled: true },
  { id: "violence", label: "Violence", action: "block", enabled: true },
  { id: "political", label: "Sensitive Political Content", action: "warn", enabled: false },
  { id: "adult", label: "Adult Content", action: "block", enabled: true },
  { id: "harassment", label: "Harassment", action: "block", enabled: true },
  { id: "misinformation", label: "Misinformation", action: "warn", enabled: false },
];

export const GuardrailsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("pii-masking");
  const [sensitivityLevel, setSensitivityLevel] = useState([2]);
  const [testPrompt, setTestPrompt] = useState("");
  const [previewText, setPreviewText] = useState(
    "My email is john.doe@company.com and my API key is sk-1234567890abcdef. Please help me with this issue."
  );
  const [customRegex, setCustomRegex] = useState("");

  const maskedPreview = previewText
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[EMAIL_MASKED]")
    .replace(/sk-[a-zA-Z0-9]{32,}/g, "[API_KEY_MASKED]");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">MCP Guardrails</h1>
          <p className="text-muted-foreground">
            Configure and enforce guardrails to enhance data security, compliance, and safety.
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList variant="mobile-scroll" className="w-full justify-start">
          <TabsTrigger
            value="general"
            icon={<Settings className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="General Settings"
          >
            General Settings
          </TabsTrigger>
          <TabsTrigger
            value="guardrails"
            icon={<Shield className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Guardrails"
          >
            Guardrails
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            icon={<BarChart3 className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Analytics"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            icon={<FileText className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Logs"
          >
            Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Guardrail Settings</CardTitle>
              <CardDescription>
                Configure global settings for all guardrails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Enable All Guardrails</Label>
                  <p className="text-sm text-muted-foreground">Master switch for all guardrail functionality</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">Log all guardrail actions for compliance</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Real-time Alerts</Label>
                  <p className="text-sm text-muted-foreground">Send alerts when guardrails are triggered</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guardrails" className="space-y-4">
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Guardrails Overview</CardTitle>
              <CardDescription>
                Configure and enforce guardrails to enhance data security, compliance, and safety for your MCP queries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {guardrailCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      activeCategory === category.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        {category.enabled ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Panel - Guardrail Configurations */}
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Sidebar - Guardrail Categories */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {guardrailCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <category.icon className="mr-2 h-4 w-4" />
                      {category.name}
                      {category.enabled && <CheckCircle className="ml-auto h-4 w-4" />}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Configuration Panel */}
            <div className="lg:col-span-3">
              {activeCategory === "pii-masking" && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="h-5 w-5" />
                          PII/Secret Masking
                        </CardTitle>
                        <CardDescription>Automatically detect and mask sensitive information in queries and responses</CardDescription>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Advanced Masking Rules */}
                    <div>
                      <Label className="text-base font-medium">Advanced Masking Rules</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select which types of sensitive information to automatically mask
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        {piiTypes.map((type) => (
                          <div key={type.id} className="flex items-center space-x-2">
                            <Checkbox defaultChecked={type.enabled} />
                            <Label>{type.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Custom Regex Patterns */}
                    <div>
                      <Label className="text-base font-medium">Custom Regex Patterns</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Define custom patterns for additional sensitive data types
                      </p>
                      <div className="space-y-3">
                        <Input
                          placeholder="Enter custom regex pattern..."
                          value={customRegex}
                          onChange={(e) => setCustomRegex(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Example - SSN Pattern: \b\d{3}-\d{2}-\d{4}\b
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Preview */}
                    <div>
                      <Label className="text-base font-medium">Preview</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        See how masking rules are applied to sample text
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-sm">Original Text</Label>
                          <Textarea
                            value={previewText}
                            onChange={(e) => setPreviewText(e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Masked Text</Label>
                          <div className="p-3 bg-gray-50 border rounded-md min-h-[80px]">
                            <code className="text-sm">{maskedPreview}</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeCategory === "prompt-injection" && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Prompt Injection Prevention
                        </CardTitle>
                        <CardDescription>Detect and prevent malicious prompt injection attempts</CardDescription>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Sensitivity Level */}
                    <div>
                      <Label className="text-base font-medium">Sensitivity Level</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Adjust how strictly the system detects potential prompt injections
                      </p>
                      <div className="space-y-3">
                        <Slider
                          value={sensitivityLevel}
                          onValueChange={setSensitivityLevel}
                          max={3}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                        </div>
                        <div className="text-sm">
                          Current level:{" "}
                          <Badge variant="outline">
                            {sensitivityLevel[0] === 1 ? "Low" : sensitivityLevel[0] === 2 ? "Medium" : "High"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Custom Detection Rules */}
                    <div>
                      <Label className="text-base font-medium">Custom Detection Rules</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Define advanced criteria for detecting prompt injection attempts
                      </p>
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Enter custom detection rules or patterns..."
                          className="min-h-[100px]"
                        />
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Import Predefined Rules
                          </Button>
                          <Button variant="outline" size="sm">
                            Export Rules
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Test Prompt Box */}
                    <div>
                      <Label className="text-base font-medium">Test Prompt</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Test sample prompts to evaluate guardrail effectiveness
                      </p>
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Enter a test prompt to check for injection attempts..."
                          value={testPrompt}
                          onChange={(e) => setTestPrompt(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex gap-2">
                          <Button>Test Prompt</Button>
                          <Button variant="outline">Clear</Button>
                        </div>
                        {testPrompt && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800">Safe Prompt</span>
                            </div>
                            <p className="text-sm text-green-700 mt-1">
                              No prompt injection patterns detected in this input.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeCategory === "harmful-content" && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Harmful Content Filtering
                        </CardTitle>
                        <CardDescription>Filter out harmful, inappropriate, or offensive content</CardDescription>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Category Management */}
                    <div>
                      <Label className="text-base font-medium">Content Categories</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Configure how different types of harmful content are handled
                      </p>
                      <div className="space-y-3">
                        {harmfulCategories.map((category) => (
                          <div
                            key={category.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <Checkbox defaultChecked={category.enabled} />
                              <Label className="font-medium">{category.label}</Label>
                            </div>
                            <Select defaultValue={category.action}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="allow">Allow</SelectItem>
                                <SelectItem value="warn">Warn</SelectItem>
                                <SelectItem value="block">Block</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Custom Categories */}
                    <div>
                      <Label className="text-base font-medium">Custom Categories</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add custom content categories or upload category lists
                      </p>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input placeholder="Enter custom category name..." />
                          <Button variant="outline">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          Upload Category List
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Preview Responses */}
                    <div>
                      <Label className="text-base font-medium">Preview Responses</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Test how guardrails handle potentially harmful content requests
                      </p>
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Enter a test query to see how content filtering responds..."
                          className="min-h-[100px]"
                        />
                        <Button>Test Content Filter</Button>
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">Content Warning</span>
                          </div>
                          <p className="text-sm text-yellow-700 mt-1">
                            This content may contain sensitive material. Proceed with caution.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guardrail Analytics</CardTitle>
              <CardDescription>Monitor guardrail performance and effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-500">Detailed analytics and reporting coming soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guardrail Logs</CardTitle>
              <CardDescription>View detailed logs of all guardrail actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Audit Logs</h3>
                <p className="text-gray-500">Comprehensive logging and audit trail coming soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Actions Panel */}
      <ActionBar variant="mobile-stack">
        <ActionBarActions>
          <HeaderActionButtons
            primaryAction={{
              label: "Save Changes",
              icon: Save,
              onClick: () => console.log("Save changes")
            }}
            secondaryActions={[
              {
                label: "View Logs",
                icon: History,
                onClick: () => console.log("View logs")
              },
              {
                label: "Reset to Default",
                icon: RotateCcw,
                onClick: () => console.log("Reset to default")
              }
            ]}
          />
        </ActionBarActions>
      </ActionBar>
    </div>
  );
};

export default GuardrailsPage;