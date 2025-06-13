"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Settings,
  Plug,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  BarChart3,
  ShoppingCart
} from 'lucide-react';

const ConnectorsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const connectors = [
    {
      id: 1,
      name: "Slack Integration",
      type: "Communication",
      status: "active",
      description: "Connect with Slack channels for notifications and commands",
      version: "v2.1.0",
      lastSync: "2024-01-15 14:30",
      config: {
        webhook_url: "https://hooks.slack.com/services/...",
        channels: ["#general", "#dev-alerts"],
        enabled: true
      }
    },
    {
      id: 2,
      name: "GitHub Integration",
      type: "Development",
      status: "active",
      description: "Integrate with GitHub repositories for issue tracking and PR management",
      version: "v1.8.2",
      lastSync: "2024-01-15 13:45",
      config: {
        api_token: "ghp_****",
        repositories: ["org/repo1", "org/repo2"],
        enabled: true
      }
    },
    {
      id: 3,
      name: "Jira Connector",
      type: "Project Management",
      status: "warning",
      description: "Connect with Jira for ticket management and project tracking",
      version: "v3.0.1",
      lastSync: "2024-01-14 09:20",
      config: {
        server_url: "https://company.atlassian.net",
        project_keys: ["PROJ", "DEV"],
        enabled: true
      }
    },
    {
      id: 4,
      name: "Email Notifications",
      type: "Communication",
      status: "inactive",
      description: "Send email notifications for important events and alerts",
      version: "v1.5.0",
      lastSync: "2024-01-10 16:15",
      config: {
        smtp_server: "smtp.company.com",
        port: 587,
        enabled: false
      }
    }
  ];

  const connectorTypes = [
    { name: "Communication", count: 2, icon: "💬" },
    { name: "Development", count: 1, icon: "🔧" },
    { name: "Project Management", count: 1, icon: "📋" },
    { name: "Analytics", count: 0, icon: "📊" },
    { name: "Security", count: 0, icon: "🔒" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      warning: "secondary",
      inactive: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredConnectors = connectors.filter(connector =>
    connector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connector.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Connectors</h1>
          <p className="text-muted-foreground">
            Manage external integrations and data connectors
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Connector
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList variant="mobile-scroll" className="w-full justify-start">
          <TabsTrigger
            value="overview"
            icon={<BarChart3 className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Overview"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="connectors"
            icon={<Plug className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="All Connectors"
          >
            All Connectors
          </TabsTrigger>
          <TabsTrigger
            value="marketplace"
            icon={<ShoppingCart className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Marketplace"
          >
            Marketplace
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Connectors</CardTitle>
                <Plug className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{connectors.length}</div>
                <p className="text-xs text-muted-foreground">
                  {connectors.filter(c => c.status === 'active').length} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {connectors.filter(c => c.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">Running normally</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Warnings</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {connectors.filter(c => c.status === 'warning').length}
                </div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inactive</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {connectors.filter(c => c.status === 'inactive').length}
                </div>
                <p className="text-xs text-muted-foreground">Not running</p>
              </CardContent>
            </Card>
          </div>

          {/* Connector Types */}
          <Card>
            <CardHeader>
              <CardTitle>Connector Types</CardTitle>
              <CardDescription>
                Overview of connector categories and their usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                {connectorTypes.map((type) => (
                  <div key={type.name} className="text-center p-4 border rounded-lg">
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <h4 className="font-medium">{type.name}</h4>
                    <p className="text-sm text-muted-foreground">{type.count} connectors</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connectors" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search connectors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Connectors List */}
          <div className="grid gap-4">
            {filteredConnectors.map((connector) => (
              <Card key={connector.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <Plug className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{connector.name}</CardTitle>
                        <CardDescription>{connector.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(connector.status)}
                      {getStatusBadge(connector.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <p className="font-medium">{connector.type}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Version:</span>
                        <p className="font-medium">{connector.version}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Sync:</span>
                        <p className="font-medium">{connector.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connector Marketplace</CardTitle>
              <CardDescription>
                Discover and install new connectors for your system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Plug className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Connector marketplace coming soon...</p>
                <p className="text-sm">Browse and install connectors from our catalog</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectorsPage;
