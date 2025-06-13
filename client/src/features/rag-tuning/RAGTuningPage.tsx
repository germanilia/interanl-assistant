"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActionBar, ActionBarStatus, ActionBarActions } from '@/components/ui/action-bar';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Database,
  Play,
  BarChart3,
  Save,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Lock
} from 'lucide-react';

export const RAGTuningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [hasChanges, setHasChanges] = useState(false);

  const handleSaveChanges = () => {
    console.log("Saving changes...");
    setHasChanges(false);
  };

  const handleDiscardChanges = () => {
    console.log("Discarding changes...");
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">RAG Tuning</h1>
          <p className="text-muted-foreground">
            Fine-tune retrieval-augmented generation with context-awareness and role-based permissions.
          </p>
        </div>
        {hasChanges && (
          <Badge variant="destructive" className="flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>Unsaved changes</span>
          </Badge>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
            value="retriever"
            icon={<Database className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Retriever"
          >
            Retriever
          </TabsTrigger>
          <TabsTrigger
            value="generator"
            icon={<Brain className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Generator"
          >
            Generator
          </TabsTrigger>
          <TabsTrigger
            value="context"
            icon={<Lock className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Context"
          >
            Context
          </TabsTrigger>
          <TabsTrigger
            value="test"
            icon={<Play className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Test"
          >
            Test
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            icon={<MessageSquare className="h-4 w-4" />}
            hideTextOnMobile={true}
            tooltipContent="Logs"
          >
            Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>RAG Overview</CardTitle>
              <CardDescription>
                Monitor and configure your RAG system performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                RAG overview interface coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retriever" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Retriever Configuration</CardTitle>
              <CardDescription>
                Configure document retrieval parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                Retriever tuning interface coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generator Configuration</CardTitle>
              <CardDescription>
                Configure response generation parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                Generator tuning interface coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="context" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Context Permissions</CardTitle>
              <CardDescription>
                Configure role-based context access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                Context permissions interface coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test & Preview</CardTitle>
              <CardDescription>
                Test your RAG configuration with sample queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                Test interface coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logs & Analytics</CardTitle>
              <CardDescription>
                View RAG performance logs and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                Logs and analytics interface coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Action Bar */}
      <ActionBar variant="mobile-stack">
        <ActionBarStatus>
          {hasChanges ? (
            <>
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">Unsaved changes</span>
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">All changes saved</span>
            </>
          )}
        </ActionBarStatus>
        <ActionBarActions>
          <Button
            variant="outline"
            onClick={handleDiscardChanges}
            disabled={!hasChanges}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Discard Changes</span>
            <span className="sm:hidden">Discard</span>
          </Button>
          <Button
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            className="w-full sm:w-auto"
          >
            <Save className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Save Changes</span>
            <span className="sm:hidden">Save</span>
          </Button>
        </ActionBarActions>
      </ActionBar>
    </div>
  );
};

export default RAGTuningPage;