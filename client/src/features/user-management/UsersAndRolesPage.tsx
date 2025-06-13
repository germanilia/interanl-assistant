"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader, PageHeaderContent, PageHeaderActions } from '@/components/ui/page-header';
import { HeaderActionButtons, TableActionButtons, CardActionButtons } from '@/components/ui/button-style-guide';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  Users,
  Shield,
  Crown,
  User
} from 'lucide-react';

const UsersAndRolesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-06-13 14:30",
      department: "Engineering",
      joinDate: "2023-06-15",
      avatar: "JD"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "user",
      status: "active",
      lastLogin: "2024-06-13 13:45",
      department: "Product",
      joinDate: "2023-08-22",
      avatar: "JS"
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
      role: "moderator",
      status: "active",
      lastLogin: "2024-06-12 16:20",
      department: "DevOps",
      joinDate: "2023-04-10",
      avatar: "MW"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "user",
      status: "inactive",
      lastLogin: "2024-06-10 09:15",
      department: "Marketing",
      joinDate: "2023-09-05",
      avatar: "SJ"
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex.brown@company.com",
      role: "user",
      status: "active",
      lastLogin: "2024-06-13 10:22",
      department: "Engineering",
      joinDate: "2024-01-15",
      avatar: "AB"
    },
    {
      id: 6,
      name: "Lisa Chen",
      email: "lisa.chen@company.com",
      role: "moderator",
      status: "active",
      lastLogin: "2024-06-13 09:30",
      department: "Support",
      joinDate: "2023-11-20",
      avatar: "LC"
    }
  ]);

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Full system access with all permissions",
      userCount: 1,
      permissions: ["read", "write", "delete", "manage_users", "system_config", "audit_logs"],
      color: "red",
      createdDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Moderator",
      description: "Can moderate content and manage basic settings",
      userCount: 2,
      permissions: ["read", "write", "moderate_content", "manage_tickets"],
      color: "yellow",
      createdDate: "2023-01-20"
    },
    {
      id: 3,
      name: "User",
      description: "Standard user with basic access permissions",
      userCount: 3,
      permissions: ["read", "write", "create_tickets"],
      color: "green",
      createdDate: "2023-01-10"
    },
    {
      id: 4,
      name: "Viewer",
      description: "Read-only access to system resources",
      userCount: 0,
      permissions: ["read"],
      color: "blue",
      createdDate: "2023-02-01"
    }
  ]);

  // Helper functions
  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleToggleUserStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleEditUser = (userId: number) => {
    setSelectedUser(userId);
    setShowEditUserDialog(true);
  };

  const departments = [...new Set(users.map(user => user.department))];
  const uniqueRoles = [...new Set(users.map(user => user.role))];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-red-500" />;
      case 'moderator':
        return <Shield className="h-4 w-4 text-yellow-500" />;
      case 'user':
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "destructive",
      moderator: "secondary",
      user: "default",
      viewer: "outline"
    } as const;
    
    return (
      <Badge variant={variants[role as keyof typeof variants] || "outline"}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'active' ? 'default' : 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader>
        <PageHeaderContent>
          <h1 className="text-3xl font-bold text-foreground">Users & Roles</h1>
          <p className="text-muted-foreground">
            Manage user accounts and role assignments
          </p>
        </PageHeaderContent>
        <PageHeaderActions>
          <HeaderActionButtons
            primaryAction={{
              label: "Add User",
              icon: Plus,
              onClick: () => console.log("Add User clicked")
            }}
          />
        </PageHeaderActions>
      </PageHeader>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList variant="mobile-scroll" className="w-full justify-start">
          <TabsTrigger
            value="users"
            icon={<Users className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Users"
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            value="roles"
            icon={<Shield className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Roles"
          >
            Roles
          </TabsTrigger>
          <TabsTrigger
            value="permissions"
            icon={<Crown className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Permissions"
          >
            Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">
                  {users.filter(u => u.status === 'active').length} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">Currently active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admins</CardTitle>
                <Crown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.role === 'admin').length}
                </div>
                <p className="text-xs text-muted-foreground">System administrators</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Departments</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(users.map(u => u.department)).size}
                </div>
                <p className="text-xs text-muted-foreground">Active departments</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage user accounts and their access levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(user.role)}
                          {getRoleBadge(user.role)}
                        </div>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell>
                        <TableActionButtons
                          actions={[
                            {
                              icon: Edit,
                              onClick: () => console.log("Edit user", user.id),
                              tooltip: "Edit User"
                            },
                            {
                              icon: MoreHorizontal,
                              onClick: () => console.log("More actions", user.id),
                              tooltip: "More Actions"
                            }
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <PageHeader>
            <PageHeaderContent>
              <h3 className="text-lg font-medium">Role Management</h3>
              <p className="text-sm text-muted-foreground">
                Define and manage user roles and their permissions
              </p>
            </PageHeaderContent>
            <PageHeaderActions>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </Button>
            </PageHeaderActions>
          </PageHeader>

          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{role.userCount} users</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium mb-2">Permissions</h5>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardActionButtons
                      actions={[
                        {
                          label: "Edit",
                          icon: Edit,
                          onClick: () => console.log("Edit role", role.id),
                          variant: "outline"
                        },
                        {
                          label: "More",
                          icon: MoreHorizontal,
                          onClick: () => console.log("More actions", role.id),
                          variant: "outline"
                        }
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                Overview of permissions assigned to each role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Permission matrix coming soon...</p>
                <p className="text-sm">Detailed permission management interface</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersAndRolesPage;
