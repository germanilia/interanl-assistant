"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Download, TrendingUp, Users, MessageSquare, Clock } from "lucide-react"

const usageData = [
  { date: "2024-01-01", prompts: 1200, responses: 1150, users: 45 },
  { date: "2024-01-02", prompts: 1900, responses: 1850, users: 52 },
  { date: "2024-01-03", prompts: 3000, responses: 2900, users: 68 },
  { date: "2024-01-04", prompts: 2800, responses: 2750, users: 71 },
  { date: "2024-01-05", prompts: 3500, responses: 3400, users: 89 },
  { date: "2024-01-06", prompts: 2000, responses: 1950, users: 56 },
  { date: "2024-01-07", prompts: 1500, responses: 1450, users: 43 },
]

const topicDistribution = [
  { name: "CI/CD", value: 35, color: "#8884d8" },
  { name: "Kubernetes", value: 25, color: "#82ca9d" },
  { name: "Database", value: 20, color: "#ffc658" },
  { name: "Security", value: 12, color: "#ff7300" },
  { name: "Monitoring", value: 8, color: "#00ff00" },
]

const responseTimeData = [
  { hour: "00", avgTime: 1.2, p95: 2.1, p99: 3.5 },
  { hour: "04", avgTime: 0.8, p95: 1.5, p99: 2.8 },
  { hour: "08", avgTime: 2.1, p95: 3.2, p99: 5.1 },
  { hour: "12", avgTime: 1.8, p95: 2.8, p99: 4.2 },
  { hour: "16", avgTime: 2.5, p95: 3.8, p99: 6.1 },
  { hour: "20", avgTime: 1.4, p95: 2.3, p99: 3.8 },
]

export default function UsageMetricsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Usage Metrics</h2>
                <p className="text-muted-foreground">Detailed analytics and insights into system usage patterns.</p>
              </div>

              <div className="flex items-center space-x-2">
                <Select defaultValue="7d">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15,847</div>
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
                  <div className="text-2xl font-bold">324</div>
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
                    <span className="text-green-600">-0.3s</span> from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2.1%</span> from last period
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Usage Trends */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Usage Trends Over Time</CardTitle>
                <CardDescription>Daily prompts, responses, and active users</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="prompts"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="Prompts"
                    />
                    <Area
                      type="monotone"
                      dataKey="responses"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Responses"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 mb-6">
              {/* Topic Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Support Topics Distribution</CardTitle>
                  <CardDescription>Breakdown of support requests by topic category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={topicDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {topicDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Response Time Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Analysis</CardTitle>
                  <CardDescription>Average, P95, and P99 response times by hour</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="avgTime" stroke="#8884d8" strokeWidth={2} name="Average" />
                      <Line type="monotone" dataKey="p95" stroke="#82ca9d" strokeWidth={2} name="P95" />
                      <Line type="monotone" dataKey="p99" stroke="#ffc658" strokeWidth={2} name="P99" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Metrics Table */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Metrics</CardTitle>
                <CardDescription>Comprehensive breakdown of system performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">User Engagement</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Daily Active Users:</span>
                        <span>89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weekly Active Users:</span>
                        <span>324</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Active Users:</span>
                        <span>1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Session Duration:</span>
                        <span>12.5 min</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">System Performance</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uptime:</span>
                        <span>99.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Error Rate:</span>
                        <span>0.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timeout Rate:</span>
                        <span>0.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Peak Concurrent Users:</span>
                        <span>156</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Content Quality</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Satisfaction Score:</span>
                        <span>4.2/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">First Response Rate:</span>
                        <span>94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Escalation Rate:</span>
                        <span>5.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Knowledge Base Hits:</span>
                        <span>78.3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
