import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader, PageHeaderContent, PageHeaderActions } from '@/components/ui/page-header';
import { Search, Download, BarChart3, MessageSquare } from 'lucide-react';
// TODO: Create these components
// import { PromptFilters } from './PromptFilters';
// import { PromptTable } from './PromptTable';
// import { ConversationViewer } from './ConversationViewer';
// import { AnalyticsMetrics } from './AnalyticsMetrics';
// import { PromptData, FilterState, ConversationHistory } from './types';

// Temporary types until we create the proper types file
interface PromptData {
  id: number;
  timestamp: string;
  user: string;
  userGroup: string;
  topic: string;
  category: string;
  prompt: string;
  response: string;
  responseLength: number;
  satisfaction: number;
  relatedKB: string[];
  conversationId: string;
}

interface FilterState {
  dateRange: string;
  users: string[];
  topics: string[];
  categories: string[];
}

interface ConversationHistory {
  [key: string]: Array<{
    type: string;
    content: string;
    timestamp: string;
    relatedKB?: string[];
  }>;
}

// Sample data
const promptsData: PromptData[] = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30:22",
    user: "john.doe@company.com",
    userGroup: "Frontend Team",
    topic: "React",
    category: "Development",
    prompt: "How do I implement lazy loading for React components in our Next.js application?",
    response: "To implement lazy loading in Next.js, you can use React.lazy() with dynamic imports...",
    responseLength: 450,
    satisfaction: 4.5,
    relatedKB: ["React Performance", "Next.js Optimization"],
    conversationId: "conv_001",
  },
  {
    id: 2,
    timestamp: "2024-01-15 13:45:10",
    user: "jane.smith@company.com",
    userGroup: "DevOps Team",
    topic: "Kubernetes",
    category: "Infrastructure",
    prompt: "What's the best way to configure horizontal pod autoscaling for our microservices?",
    response: "Horizontal Pod Autoscaling (HPA) in Kubernetes can be configured using metrics like CPU, memory...",
    responseLength: 680,
    satisfaction: 5.0,
    relatedKB: ["Kubernetes Scaling", "Microservices Architecture"],
    conversationId: "conv_002",
  },
  {
    id: 3,
    timestamp: "2024-01-15 12:20:15",
    user: "mike.wilson@company.com",
    userGroup: "Backend Team",
    topic: "Database",
    category: "Development",
    prompt: "How can I optimize PostgreSQL queries that are running slowly in production?",
    response: "PostgreSQL query optimization involves several strategies including proper indexing...",
    responseLength: 520,
    satisfaction: 4.2,
    relatedKB: ["PostgreSQL Performance", "Database Optimization"],
    conversationId: "conv_003",
  },
  {
    id: 4,
    timestamp: "2024-01-15 11:15:30",
    user: "sarah.johnson@company.com",
    userGroup: "Product Team",
    topic: "Analytics",
    category: "Product",
    prompt: "What metrics should we track for user engagement in our mobile app?",
    response: "Key user engagement metrics for mobile apps include session duration, screen views...",
    responseLength: 380,
    satisfaction: 4.8,
    relatedKB: ["Mobile Analytics", "User Engagement"],
    conversationId: "conv_004",
  },
  {
    id: 5,
    timestamp: "2024-01-15 10:30:45",
    user: "alex.brown@company.com",
    userGroup: "Security Team",
    topic: "Security",
    category: "Security",
    prompt: "How do we implement OAuth 2.0 authentication with PKCE for our single-page application?",
    response: "OAuth 2.0 with PKCE (Proof Key for Code Exchange) is essential for SPAs...",
    responseLength: 720,
    satisfaction: 4.6,
    relatedKB: ["OAuth Implementation", "SPA Security"],
    conversationId: "conv_005",
  },
];

const conversationHistory: ConversationHistory = {
  conv_001: [
    {
      type: "user",
      content: "How do I implement lazy loading for React components in our Next.js application?",
      timestamp: "2024-01-15 14:30:22",
    },
    {
      type: "bot",
      content: "To implement lazy loading in Next.js, you can use React.lazy() with dynamic imports. Here's how:\n\n1. **Using React.lazy():**\n```jsx\nconst LazyComponent = React.lazy(() => import('./LazyComponent'));\n```\n\n2. **With Suspense:**\n```jsx\n<Suspense fallback={<div>Loading...</div>}>\n  <LazyComponent />\n</Suspense>\n```\n\n3. **Next.js dynamic imports:**\n```jsx\nimport dynamic from 'next/dynamic';\nconst DynamicComponent = dynamic(() => import('./Component'), {\n  loading: () => <p>Loading...</p>\n});\n```\n\nThis approach reduces initial bundle size and improves performance.",
      timestamp: "2024-01-15 14:30:25",
      relatedKB: ["React Performance", "Next.js Optimization"],
    },
  ],
};

export const PromptSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    dateRange: "last-7-days",
    users: [],
    topics: [],
    categories: [],
  });
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("search");
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPrompts = promptsData.filter((prompt) => {
    if (searchQuery && !prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedFilters.topics.length > 0 && !selectedFilters.topics.includes(prompt.topic)) {
      return false;
    }
    if (selectedFilters.categories.length > 0 && !selectedFilters.categories.includes(prompt.category)) {
      return false;
    }
    return true;
  });

  const paginatedPrompts = filteredPrompts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);

  const clearFilters = () => {
    setSelectedFilters({
      dateRange: "last-7-days",
      users: [],
      topics: [],
      categories: [],
    });
    setSearchQuery("");
  };

  const exportData = (format: string) => {
    console.log(`Exporting data in ${format} format`);
    // Implementation for export functionality
  };

  return (
    <div className="space-y-6">
      <PageHeader>
        <PageHeaderContent>
          <h1 className="text-3xl font-bold text-foreground">Prompts Analysis</h1>
          <p className="text-muted-foreground">
            Search, analyze, and gain insights from user prompts and AI responses.
          </p>
        </PageHeaderContent>
        <PageHeaderActions>
          <Button variant="outline" onClick={() => exportData("csv")} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportData("pdf")} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="search">
            <Search className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Prompt Search</span>
          </TabsTrigger>
          <TabsTrigger value="history">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">User History</span>
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Reports & Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-4">
              {/* Search Bar */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search prompts..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  {(selectedFilters.topics.length > 0 || selectedFilters.categories.length > 0) && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedFilters.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="flex items-center gap-1">
                          {topic}
                        </Badge>
                      ))}
                      {selectedFilters.categories.map((category) => (
                        <Badge key={category} variant="outline" className="flex items-center gap-1">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Simplified Prompt List */}
              <Card>
                <CardHeader>
                  <CardTitle>Prompts ({filteredPrompts.length})</CardTitle>
                  <CardDescription>Search results for user prompts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paginatedPrompts.map((prompt) => (
                      <div key={prompt.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex gap-2">
                            <Badge variant="secondary">{prompt.topic}</Badge>
                            <Badge variant="outline">{prompt.category}</Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">{prompt.timestamp}</span>
                        </div>
                        <p className="text-sm font-medium mb-2">{prompt.prompt}</p>
                        <p className="text-xs text-muted-foreground">
                          {prompt.user} • {prompt.userGroup}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversation History</CardTitle>
              <CardDescription>View detailed conversation threads</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conversation viewer coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>Detailed analytics and reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analytics metrics coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptSearchPage;
