"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader, PageHeaderContent, PageHeaderActions } from '@/components/ui/page-header';
import { ButtonGroup } from '@/components/ui/button-group';
import { 
  Shield, 
  Search, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Download,
  RefreshCw,
  Users,
  Lock,
  Key,
  Database
} from 'lucide-react';

const ACLAnalyzerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState("all");
  const [selectedResource, setSelectedResource] = useState("all");

  const aclEntries = [
    {
      id: 1,
      user: "john.doe@company.com",
      resource: "/api/users",
      permission: "read",
      granted: true,
      source: "role:admin",
      lastChecked: "2024-01-15 14:30",
      riskLevel: "low"
    },
    {
      id: 2,
      user: "jane.smith@company.com",
      resource: "/api/analytics",
      permission: "write",
      granted: false,
      source: "role:user",
      lastChecked: "2024-01-15 13:45",
      riskLevel: "medium"
    },
    {
      id: 3,
      user: "mike.wilson@company.com",
      resource: "/admin/system",
      permission: "admin",
      granted: true,
      source: "role:moderator",
      lastChecked: "2024-01-15 12:20",
      riskLevel: "high"
    },
    {
      id: 4,
      user: "sarah.johnson@company.com",
      resource: "/api/reports",
      permission: "read",
      granted: true,
      source: "direct",
      lastChecked: "2024-01-14 16:15",
      riskLevel: "low"
    }
  ];

  const securityIssues = [
    {
      id: 1,
      type: "Excessive Permissions",
      severity: "high",
      description: "User has admin access to system resources without admin role",
      user: "mike.wilson@company.com",
      resource: "/admin/system",
      recommendation: "Review and restrict admin permissions"
    },
    {
      id: 2,
      type: "Orphaned Permission",
      severity: "medium",
      description: "Permission granted directly without role assignment",
      user: "sarah.johnson@company.com",
      resource: "/api/reports",
      recommendation: "Assign appropriate role instead of direct permission"
    },
    {
      id: 3,
      type: "Inactive User Access",
      severity: "medium",
      description: "Inactive user still has system access",
      user: "inactive.user@company.com",
      resource: "/api/data",
      recommendation: "Revoke access for inactive users"
    }
  ];

  const accessPatterns = [
    {
      resource: "/api/users",
      totalAccess: 1250,
      uniqueUsers: 45,
      avgDaily: 89,
      riskScore: 2.1
    },
    {
      resource: "/api/analytics",
      totalAccess: 890,
      uniqueUsers: 23,
      avgDaily: 67,
      riskScore: 3.4
    },
    {
      resource: "/admin/system",
      totalAccess: 156,
      uniqueUsers: 3,
      avgDaily: 12,
      riskScore: 8.7
    },
    {
      resource: "/api/reports",
      totalAccess: 2340,
      uniqueUsers: 78,
      avgDaily: 156,
      riskScore: 1.8
    }
  ];

  const getRiskBadge = (level: string) => {
    const variants = {
      low: "default",
      medium: "secondary",
      high: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[level as keyof typeof variants] || "secondary"}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </Badge>
    );
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredEntries = aclEntries.filter(entry => {
    if (searchQuery && !entry.user.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !entry.resource.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedUser !== "all" && entry.user !== selectedUser) {
      return false;
    }
    if (selectedResource !== "all" && !entry.resource.includes(selectedResource)) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader>
        <PageHeaderContent>
          <h1 className="text-3xl font-bold text-foreground">ACL Analyzer</h1>
          <p className="text-muted-foreground">
            Analyze access control lists and identify security risks
          </p>
        </PageHeaderContent>
        <PageHeaderActions>
          <Button variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Analysis
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList variant="mobile-scroll" className="w-full justify-start">
          <TabsTrigger
            value="overview"
            icon={<Shield className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Overview"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="permissions"
            icon={<Key className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Permissions"
          >
            Permissions
          </TabsTrigger>
          <TabsTrigger
            value="issues"
            icon={<AlertTriangle className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Security Issues"
          >
            Security Issues
          </TabsTrigger>
          <TabsTrigger
            value="patterns"
            icon={<Database className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Access Patterns"
          >
            Access Patterns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total ACL Entries</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{aclEntries.length}</div>
                <p className="text-xs text-muted-foreground">
                  {aclEntries.filter(e => e.granted).length} granted
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{securityIssues.length}</div>
                <p className="text-xs text-muted-foreground">
                  {securityIssues.filter(i => i.severity === 'high').length} high severity
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(aclEntries.map(e => e.user)).size}
                </div>
                <p className="text-xs text-muted-foreground">With permissions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resources</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(aclEntries.map(e => e.resource)).size}
                </div>
                <p className="text-xs text-muted-foreground">Protected resources</p>
              </CardContent>
            </Card>
          </div>

          {/* Security Issues Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Security Issues Summary</CardTitle>
              <CardDescription>
                Critical security issues that require immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityIssues.slice(0, 3).map((issue) => (
                  <div key={issue.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    {getSeverityIcon(issue.severity)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{issue.type}</h4>
                        {getRiskBadge(issue.severity)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        User: {issue.user} • Resource: {issue.resource}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {Array.from(new Set(aclEntries.map(e => e.user))).map((user) => (
                  <SelectItem key={user} value={user}>{user}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedResource} onValueChange={setSelectedResource}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="/api">API Resources</SelectItem>
                <SelectItem value="/admin">Admin Resources</SelectItem>
                <SelectItem value="/reports">Reports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ACL Table */}
          <Card>
            <CardHeader>
              <CardTitle>Access Control List</CardTitle>
              <CardDescription>
                Detailed view of all permission entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Permission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Last Checked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.user}</TableCell>
                      <TableCell>{entry.resource}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.permission}</Badge>
                      </TableCell>
                      <TableCell>
                        {entry.granted ? (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">Granted</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-red-600">Denied</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{entry.source}</TableCell>
                      <TableCell>{getRiskBadge(entry.riskLevel)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {entry.lastChecked}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Issues</CardTitle>
              <CardDescription>
                Identified security risks and recommended actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityIssues.map((issue) => (
                  <div key={issue.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        {getSeverityIcon(issue.severity)}
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{issue.type}</h4>
                            {getRiskBadge(issue.severity)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                          <div className="mt-2 text-xs text-muted-foreground">
                            <span>User: {issue.user}</span> • <span>Resource: {issue.resource}</span>
                          </div>
                          <div className="mt-3 p-2 bg-muted rounded text-sm">
                            <strong>Recommendation:</strong> {issue.recommendation}
                          </div>
                        </div>
                      </div>
                      <ButtonGroup variant="mobile-wrap">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          Resolve
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Patterns</CardTitle>
              <CardDescription>
                Analysis of resource access patterns and risk scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Total Access</TableHead>
                    <TableHead>Unique Users</TableHead>
                    <TableHead>Avg Daily</TableHead>
                    <TableHead>Risk Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessPatterns.map((pattern, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{pattern.resource}</TableCell>
                      <TableCell>{pattern.totalAccess.toLocaleString()}</TableCell>
                      <TableCell>{pattern.uniqueUsers}</TableCell>
                      <TableCell>{pattern.avgDaily}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${
                            pattern.riskScore > 7 ? 'text-red-600' :
                            pattern.riskScore > 4 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {pattern.riskScore.toFixed(1)}
                          </span>
                          {getRiskBadge(
                            pattern.riskScore > 7 ? 'high' :
                            pattern.riskScore > 4 ? 'medium' : 'low'
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ACLAnalyzerPage;
