import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PageHeader, PageHeaderContent, PageHeaderActions } from '@/components/ui/page-header';
import { ButtonGroup } from '@/components/ui/button-group';
import { Plus, Settings, Trash2, Play, Pause } from 'lucide-react';

const mcpServers = [
  {
    id: 1,
    name: "Primary MCP Server",
    endpoint: "https://mcp-primary.company.com",
    status: "active",
    version: "v2.1.0",
    lastSeen: "2 minutes ago",
    connections: 45,
  },
  {
    id: 2,
    name: "Secondary MCP Server",
    endpoint: "https://mcp-secondary.company.com",
    status: "active",
    version: "v2.1.0",
    lastSeen: "5 minutes ago",
    connections: 23,
  },
  {
    id: 3,
    name: "Development MCP Server",
    endpoint: "https://mcp-dev.company.com",
    status: "inactive",
    version: "v2.0.8",
    lastSeen: "2 hours ago",
    connections: 0,
  },
];

export const MCPServersPage: React.FC = () => {
  const [servers, setServers] = useState(mcpServers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const toggleServerStatus = (id: number) => {
    setServers(
      servers.map((server) =>
        server.id === id
          ? { ...server, status: server.status === "active" ? "inactive" : "active" }
          : server,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader>
        <PageHeaderContent>
          <h1 className="text-3xl font-bold text-foreground">MCP Servers</h1>
          <p className="text-muted-foreground">
            Manage your Model Context Protocol servers and their configurations.
          </p>
        </PageHeaderContent>
        <PageHeaderActions>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Server
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add MCP Server</DialogTitle>
              <DialogDescription>
                Configure a new Model Context Protocol server.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endpoint" className="text-right">
                  Endpoint
                </Label>
                <Input id="endpoint" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="version" className="text-right">
                  Version
                </Label>
                <Input id="version" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Server
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </PageHeaderActions>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Server Configuration</CardTitle>
          <CardDescription>
            Monitor and manage your MCP server instances.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Connections</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servers.map((server) => (
                <TableRow key={server.id}>
                  <TableCell className="font-medium">{server.name}</TableCell>
                  <TableCell>{server.endpoint}</TableCell>
                  <TableCell>
                    <Badge variant={server.status === "active" ? "default" : "secondary"}>
                      {server.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{server.version}</TableCell>
                  <TableCell>{server.lastSeen}</TableCell>
                  <TableCell>{server.connections}</TableCell>
                  <TableCell>
                    <ButtonGroup variant="mobile-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleServerStatus(server.id)}
                      >
                        {server.status === "active" ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Server Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>CPU Usage</span>
              <span>45%</span>
            </div>
            <div className="flex justify-between">
              <span>Memory Usage</span>
              <span>62%</span>
            </div>
            <div className="flex justify-between">
              <span>Active Connections</span>
              <span>68</span>
            </div>
            <div className="flex justify-between">
              <span>Uptime</span>
              <span>99.8%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuration Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-scaling">Auto Scaling</Label>
              <Switch id="auto-scaling" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="load-balancing">Load Balancing</Label>
              <Switch id="load-balancing" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="health-checks">Health Checks</Label>
              <Switch id="health-checks" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="detailed-logging">Detailed Logging</Label>
              <Switch id="detailed-logging" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MCPServersPage;