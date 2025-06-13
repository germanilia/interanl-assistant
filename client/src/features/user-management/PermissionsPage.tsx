"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lock, 
  Shield, 
  Key, 
  Search,
  Settings,
  Users,
  Database,
  FileText,
  BarChart3,
  Cog,
  CheckCircle,
  XCircle
} from 'lucide-react';

const PermissionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const permissionCategories = [
    {
      id: 1,
      name: "User Management",
      icon: Users,
      description: "Permissions related to user account management",
      permissions: [
        { name: "view_users", label: "View Users", description: "Can view user profiles and lists" },
        { name: "create_users", label: "Create Users", description: "Can create new user accounts" },
        { name: "edit_users", label: "Edit Users", description: "Can modify user information" },
        { name: "delete_users", label: "Delete Users", description: "Can remove user accounts" },
        { name: "manage_roles", label: "Manage Roles", description: "Can assign and modify user roles" }
      ]
    },
    {
      id: 2,
      name: "Content Management",
      icon: FileText,
      description: "Permissions for content creation and management",
      permissions: [
        { name: "view_content", label: "View Content", description: "Can view all content" },
        { name: "create_content", label: "Create Content", description: "Can create new content" },
        { name: "edit_content", label: "Edit Content", description: "Can modify existing content" },
        { name: "delete_content", label: "Delete Content", description: "Can remove content" },
        { name: "publish_content", label: "Publish Content", description: "Can publish content to users" }
      ]
    },
    {
      id: 3,
      name: "Analytics & Reports",
      icon: BarChart3,
      description: "Permissions for analytics and reporting features",
      permissions: [
        { name: "view_analytics", label: "View Analytics", description: "Can view analytics dashboards" },
        { name: "export_reports", label: "Export Reports", description: "Can export reports and data" },
        { name: "create_reports", label: "Create Reports", description: "Can create custom reports" },
        { name: "manage_dashboards", label: "Manage Dashboards", description: "Can configure analytics dashboards" }
      ]
    },
    {
      id: 4,
      name: "System Administration",
      icon: Cog,
      description: "System-level administrative permissions",
      permissions: [
        { name: "system_config", label: "System Configuration", description: "Can modify system settings" },
        { name: "manage_integrations", label: "Manage Integrations", description: "Can configure external integrations" },
        { name: "view_logs", label: "View System Logs", description: "Can access system logs and audit trails" },
        { name: "backup_restore", label: "Backup & Restore", description: "Can perform backup and restore operations" }
      ]
    }
  ];

  const rolePermissions = [
    {
      role: "Admin",
      permissions: {
        view_users: true,
        create_users: true,
        edit_users: true,
        delete_users: true,
        manage_roles: true,
        view_content: true,
        create_content: true,
        edit_content: true,
        delete_content: true,
        publish_content: true,
        view_analytics: true,
        export_reports: true,
        create_reports: true,
        manage_dashboards: true,
        system_config: true,
        manage_integrations: true,
        view_logs: true,
        backup_restore: true
      }
    },
    {
      role: "Moderator",
      permissions: {
        view_users: true,
        create_users: false,
        edit_users: true,
        delete_users: false,
        manage_roles: false,
        view_content: true,
        create_content: true,
        edit_content: true,
        delete_content: true,
        publish_content: true,
        view_analytics: true,
        export_reports: true,
        create_reports: false,
        manage_dashboards: false,
        system_config: false,
        manage_integrations: false,
        view_logs: true,
        backup_restore: false
      }
    },
    {
      role: "User",
      permissions: {
        view_users: false,
        create_users: false,
        edit_users: false,
        delete_users: false,
        manage_roles: false,
        view_content: true,
        create_content: true,
        edit_content: false,
        delete_content: false,
        publish_content: false,
        view_analytics: true,
        export_reports: false,
        create_reports: false,
        manage_dashboards: false,
        system_config: false,
        manage_integrations: false,
        view_logs: false,
        backup_restore: false
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Permissions</h1>
          <p className="text-muted-foreground">
            Manage system permissions and access controls
          </p>
        </div>
        <Button>
          <Key className="mr-2 h-4 w-4" />
          Create Permission
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
            value="roles"
            icon={<Shield className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Role Permissions"
          >
            Role Permissions
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            icon={<Lock className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Permission Categories"
          >
            Permission Categories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Permissions</CardTitle>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {permissionCategories.reduce((acc, cat) => acc + cat.permissions.length, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Across all categories</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{permissionCategories.length}</div>
                <p className="text-xs text-muted-foreground">Permission groups</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Roles</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rolePermissions.length}</div>
                <p className="text-xs text-muted-foreground">With permissions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
                <Key className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Security policies</p>
              </CardContent>
            </Card>
          </div>

          {/* Permission Categories Overview */}
          <div className="grid gap-4 md:grid-cols-2">
            {permissionCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Permissions:</span>
                        <span className="font-medium">{category.permissions.length}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {category.permissions.slice(0, 3).map((permission) => (
                          <Badge key={permission.name} variant="secondary" className="text-xs">
                            {permission.label}
                          </Badge>
                        ))}
                        {category.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Permission Matrix</CardTitle>
              <CardDescription>
                View and manage permissions for each role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Permission</TableHead>
                      {rolePermissions.map((role) => (
                        <TableHead key={role.role} className="text-center">
                          {role.role}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissionCategories.map((category) =>
                      category.permissions.map((permission) => (
                        <TableRow key={permission.name}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{permission.label}</div>
                              <div className="text-sm text-muted-foreground">
                                {permission.description}
                              </div>
                            </div>
                          </TableCell>
                          {rolePermissions.map((role) => (
                            <TableCell key={role.role} className="text-center">
                              {role.permissions[permission.name as keyof typeof role.permissions] ? (
                                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search permissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Permission Categories Detail */}
          <div className="space-y-6">
            {permissionCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.permissions.map((permission) => (
                        <div key={permission.name} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{permission.label}</h4>
                            <p className="text-sm text-muted-foreground">{permission.description}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline">{permission.name}</Badge>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PermissionsPage;
