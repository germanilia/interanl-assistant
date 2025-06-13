"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PageHeader, PageHeaderContent, PageHeaderActions } from '@/components/ui/page-header';
import { ButtonGroup } from '@/components/ui/button-group';
import { Plus, Search, Github, FileText, MessageSquare, RefreshCw, Edit, Trash2 } from 'lucide-react';

const knowledgeSources = [
  {
    id: 1,
    name: "Frontend Repository",
    type: "github",
    source: "company/frontend-app",
    lastSync: "2 minutes ago",
    status: "active",
    documents: 1247,
  },
  {
    id: 2,
    name: "API Documentation",
    type: "confluence",
    source: "Engineering Space",
    lastSync: "15 minutes ago",
    status: "active",
    documents: 89,
  },
  {
    id: 3,
    name: "Engineering Team Chat",
    type: "slack",
    source: "#engineering",
    lastSync: "30 seconds ago",
    status: "active",
    documents: 15420,
  },
];

export const KnowledgeBasePage: React.FC = () => {
  const [sources, setSources] = useState(knowledgeSources);
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSources = sources.filter((source) =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader>
        <PageHeaderContent>
          <h1 className="text-3xl font-bold text-foreground">Knowledge Base Management</h1>
          <p className="text-muted-foreground">
            Manage content sources, metadata filtering, and knowledge organization.
          </p>
        </PageHeaderContent>
        <PageHeaderActions>
          <Dialog open={isAddSourceOpen} onOpenChange={setIsAddSourceOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Source
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Knowledge Source</DialogTitle>
                <DialogDescription>
                  Connect a new content source to your knowledge base.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setIsAddSourceOpen(false)}>
                  Add Source
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PageHeaderActions>
      </PageHeader>

      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Sync All
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Knowledge Sources</CardTitle>
          <CardDescription>
            Manage and organize your knowledge base sources with advanced metadata filtering.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {source.type === "github" ? (
                        <Github className="h-4 w-4" />
                      ) : source.type === "slack" ? (
                        <MessageSquare className="h-4 w-4" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                      <div>
                        <div className="font-medium">{source.name}</div>
                        <div className="text-sm text-muted-foreground">{source.source}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{source.type}</Badge>
                  </TableCell>
                  <TableCell>{source.documents.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={source.status === "active" ? "default" : "secondary"}>
                      {source.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{source.lastSync}</TableCell>
                  <TableCell>
                    <ButtonGroup variant="mobile-wrap">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
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
    </div>
  );
};

export default KnowledgeBasePage;