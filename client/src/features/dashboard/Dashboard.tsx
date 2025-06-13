"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Activity,
  Users,
  MessageSquare,
  TrendingUp,
  Server,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Sample data for charts
const usageData = [
  { name: "Mon", prompts: 120, responses: 115 },
  { name: "Tue", prompts: 190, responses: 185 },
  { name: "Wed", prompts: 300, responses: 290 },
  { name: "Thu", prompts: 280, responses: 275 },
  { name: "Fri", prompts: 350, responses: 340 },
  { name: "Sat", prompts: 200, responses: 195 },
  { name: "Sun", prompts: 150, responses: 145 },
];

const topicData = [
  { name: "CI/CD", value: 35, color: "#8884d8" },
  { name: "Kubernetes", value: 25, color: "#82ca9d" },
  { name: "Database", value: 20, color: "#ffc658" },
  { name: "Security", value: 12, color: "#ff7300" },
  { name: "Other", value: 8, color: "#00ff00" },
];

const responseTimeData = [
  { time: "00:00", avgTime: 1.2 },
  { time: "04:00", avgTime: 0.8 },
  { time: "08:00", avgTime: 2.1 },
  { time: "12:00", avgTime: 1.8 },
  { time: "16:00", avgTime: 2.5 },
  { time: "20:00", avgTime: 1.4 },
];

export const Dashboard: React.FC = () => {
  const { isLoading } = useAuth();



  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your GenAI ChatOps system performance and metrics.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+180</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.3s</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">MCP Servers</span>
              </div>
              <Badge variant="secondary">5/5 Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Connectors</span>
              </div>
              <Badge variant="secondary">3/4 Active</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>RAG Performance</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">New workflow deployed</p>
                  <p className="text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">Slack connector updated</p>
                  <p className="text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">RAG tuning completed</p>
                  <p className="text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center space-y-1">
                <Server className="h-4 w-4" />
                <span className="text-xs">Configure MCP Server</span>
              </Button>
              <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center space-y-1">
                <Activity className="h-4 w-4" />
                <span className="text-xs">Add Connector</span>
              </Button>
              <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center space-y-1">
                <Users className="h-4 w-4" />
                <span className="text-xs">Manage Users</span>
              </Button>
              <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center space-y-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
            <CardDescription>Daily prompts and responses over the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="prompts" fill="#8884d8" />
                <Bar dataKey="responses" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Topics</CardTitle>
            <CardDescription>Distribution of support requests by topic</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topicData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Response Time Trends</CardTitle>
          <CardDescription>Average response times throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avgTime" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
};
