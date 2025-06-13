import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader, PageHeaderContent, PageHeaderActions } from '@/components/ui/page-header';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  Activity,
  Download,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';

const UsageMetricsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState("last-7-days");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for usage metrics
  const dailyUsageData = [
    { date: '2024-01-08', prompts: 245, responses: 238, activeUsers: 45 },
    { date: '2024-01-09', prompts: 312, responses: 305, activeUsers: 52 },
    { date: '2024-01-10', prompts: 198, responses: 192, activeUsers: 38 },
    { date: '2024-01-11', prompts: 387, responses: 381, activeUsers: 61 },
    { date: '2024-01-12', prompts: 423, responses: 415, activeUsers: 67 },
    { date: '2024-01-13', prompts: 356, responses: 348, activeUsers: 55 },
    { date: '2024-01-14', prompts: 289, responses: 281, activeUsers: 48 }
  ];

  const hourlyPatternData = [
    { hour: '00:00', usage: 12 },
    { hour: '06:00', usage: 45 },
    { hour: '09:00', usage: 132 },
    { hour: '12:00', usage: 187 },
    { hour: '15:00', usage: 156 },
    { hour: '18:00', usage: 98 },
    { hour: '21:00', usage: 67 }
  ];

  const topicsData = [
    { name: 'Development', value: 35, color: '#8884d8' },
    { name: 'Infrastructure', value: 25, color: '#82ca9d' },
    { name: 'Security', value: 20, color: '#ffc658' },
    { name: 'Analytics', value: 15, color: '#ff7300' },
    { name: 'Other', value: 5, color: '#0088fe' }
  ];

  const departmentUsage = [
    { department: 'Engineering', prompts: 1250, users: 34, avgSatisfaction: 4.2 },
    { department: 'Product', prompts: 890, users: 23, avgSatisfaction: 4.5 },
    { department: 'DevOps', prompts: 567, users: 12, avgSatisfaction: 4.3 },
    { department: 'Security', prompts: 234, users: 8, avgSatisfaction: 4.1 },
    { department: 'Marketing', prompts: 123, users: 6, avgSatisfaction: 4.0 }
  ];

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader>
        <PageHeaderContent>
          <h1 className="text-3xl font-bold text-foreground">Usage Metrics</h1>
          <p className="text-muted-foreground">
            Monitor system usage patterns and user engagement
          </p>
        </PageHeaderContent>
        <PageHeaderActions>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-24-hours">Last 24 Hours</SelectItem>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={isLoading} className="w-full sm:w-auto">
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </PageHeaderActions>
      </PageHeader>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,210</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last period
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
              <span className="text-green-600">-0.2s</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.3%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="patterns">
            <TrendingUp className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Usage Patterns</span>
          </TabsTrigger>
          <TabsTrigger value="departments">
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Departments</span>
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Activity className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Daily Usage Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Daily Usage Trend
                </CardTitle>
                <CardDescription>Prompts and responses over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="prompts" fill="#8884d8" name="Prompts" />
                    <Bar dataKey="responses" fill="#82ca9d" name="Responses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Topic Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="mr-2 h-4 w-4" />
                  Topic Distribution
                </CardTitle>
                <CardDescription>Most discussed topics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topicsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {topicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Active Users Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Active Users Timeline</CardTitle>
              <CardDescription>Number of active users per day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="activeUsers" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Active Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Usage Patterns</CardTitle>
              <CardDescription>Usage patterns throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={hourlyPatternData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage by Department</CardTitle>
              <CardDescription>Department-wise usage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentUsage.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{dept.department}</h4>
                      <p className="text-sm text-muted-foreground">{dept.users} users</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{dept.prompts}</div>
                        <p className="text-xs text-muted-foreground">Prompts</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{dept.avgSatisfaction}</div>
                        <p className="text-xs text-muted-foreground">Satisfaction</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>System performance and response times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Dashboard</h3>
                <p className="text-gray-500">Detailed performance metrics coming soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsageMetricsPage;
