import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageHeader, PageHeaderContent, PageHeaderActions } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  Target,
  Plus,
  Eye,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';

// Temporary types until we create the proper types file
interface ReportConfig {
  timePeriod: string;
  metrics: string[];
  format: string;
  filters: {
    dateRange: string;
    users: string[];
    topics: string[];
    categories: string[];
  };
}

interface SavedReport {
  id: string;
  name: string;
  description: string;
  config: ReportConfig;
  createdAt: string;
  lastRun: string;
  status: 'ready' | 'generating' | 'error';
}

const savedReports: SavedReport[] = [
  {
    id: '1',
    name: 'Weekly Usage Summary',
    description: 'Comprehensive weekly usage metrics and trends',
    config: {
      timePeriod: 'last-7-days',
      metrics: ['usage', 'satisfaction'],
      format: 'pdf',
      filters: {
        dateRange: 'last-7-days',
        users: [],
        topics: [],
        categories: []
      }
    },
    createdAt: '2024-01-10T10:00:00Z',
    lastRun: '2024-01-15T09:00:00Z',
    status: 'ready'
  },
  {
    id: '2',
    name: 'Topic Analysis Report',
    description: 'Detailed analysis of topic trends and user engagement',
    config: {
      timePeriod: 'last-30-days',
      metrics: ['topics', 'users'],
      format: 'excel',
      filters: {
        dateRange: 'last-30-days',
        users: [],
        topics: ['React', 'Kubernetes', 'Security'],
        categories: []
      }
    },
    createdAt: '2024-01-08T14:30:00Z',
    lastRun: '2024-01-14T16:45:00Z',
    status: 'ready'
  },
  {
    id: '3',
    name: 'User Satisfaction Dashboard',
    description: 'Monthly user satisfaction and feedback analysis',
    config: {
      timePeriod: 'last-30-days',
      metrics: ['satisfaction', 'users'],
      format: 'pdf',
      filters: {
        dateRange: 'last-30-days',
        users: [],
        topics: [],
        categories: []
      }
    },
    createdAt: '2024-01-05T11:15:00Z',
    lastRun: '2024-01-13T10:30:00Z',
    status: 'generating'
  }
];

export const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    timePeriod: 'last-7-days',
    metrics: [],
    format: 'pdf',
    filters: {
      dateRange: 'last-7-days',
      users: [],
      topics: [],
      categories: []
    }
  });
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const generateReport = (reportId?: string) => {
    if (reportId) {
      console.log(`Generating saved report: ${reportId}`);
    } else {
      console.log('Generating custom report with config:', reportConfig);
    }
  };

  const saveReport = () => {
    if (!reportName.trim()) {
      alert('Please enter a report name');
      return;
    }
    console.log('Saving report:', { name: reportName, description: reportDescription, config: reportConfig });
    // Reset form
    setReportName('');
    setReportDescription('');
    setReportConfig({
      timePeriod: 'last-7-days',
      metrics: [],
      format: 'pdf',
      filters: {
        dateRange: 'last-7-days',
        users: [],
        topics: [],
        categories: []
      }
    });
  };

  const deleteReport = (reportId: string) => {
    console.log(`Deleting report: ${reportId}`);
  };

  const getStatusBadge = (status: SavedReport['status']) => {
    switch (status) {
      case 'ready':
        return <Badge variant="secondary">Ready</Badge>;
      case 'generating':
        return <Badge variant="outline">Generating...</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader>
        <PageHeaderContent>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">
            Generate and manage custom reports for analytics and insights.
          </p>
        </PageHeaderContent>
        <PageHeaderActions>
          <Button variant="outline" onClick={() => console.log("Schedule Report clicked")}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button onClick={() => console.log("New Report clicked")}>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="saved">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Saved Reports</span>
          </TabsTrigger>
          <TabsTrigger value="builder">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Report Builder</span>
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>Manage your saved reports and generate new ones</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Created {format(new Date(report.createdAt), 'MMM dd, yyyy')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={report.description}>
                          {report.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(report.lastRun), 'MMM dd, HH:mm')}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(report.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateReport(report.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => console.log("Preview report", report.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteReport(report.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Report Builder</CardTitle>
                  <CardDescription>Configure your custom report parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Report Details */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reportName">Report Name</Label>
                      <Input
                        id="reportName"
                        placeholder="Enter report name"
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="reportDescription">Description</Label>
                      <Input
                        id="reportDescription"
                        placeholder="Enter report description"
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Time Period */}
                  <div>
                    <Label>Time Period</Label>
                    <Select 
                      value={reportConfig.timePeriod} 
                      onValueChange={(value) => setReportConfig({...reportConfig, timePeriod: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                        <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                        <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Metrics Selection */}
                  <div>
                    <Label>Metrics to Include</Label>
                    <div className="mt-2 space-y-2">
                      {[
                        { id: 'usage', label: 'Usage Statistics', icon: BarChart3 },
                        { id: 'satisfaction', label: 'Satisfaction Scores', icon: TrendingUp },
                        { id: 'topics', label: 'Topic Analysis', icon: MessageSquare },
                        { id: 'users', label: 'User Activity', icon: Users },
                        { id: 'performance', label: 'Performance Metrics', icon: Clock },
                        { id: 'engagement', label: 'Engagement Metrics', icon: Target }
                      ].map((metric) => {
                        const Icon = metric.icon;
                        return (
                          <div key={metric.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={metric.id}
                              checked={reportConfig.metrics.includes(metric.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setReportConfig({
                                    ...reportConfig,
                                    metrics: [...reportConfig.metrics, metric.id]
                                  });
                                } else {
                                  setReportConfig({
                                    ...reportConfig,
                                    metrics: reportConfig.metrics.filter(m => m !== metric.id)
                                  });
                                }
                              }}
                            />
                            <Icon className="h-4 w-4" />
                            <Label htmlFor={metric.id}>{metric.label}</Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Export Format */}
                  <div>
                    <Label>Export Format</Label>
                    <Select 
                      value={reportConfig.format} 
                      onValueChange={(value) => setReportConfig({...reportConfig, format: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                        <SelectItem value="csv">CSV Data</SelectItem>
                        <SelectItem value="excel">Excel Workbook</SelectItem>
                        <SelectItem value="json">JSON Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Report Preview</CardTitle>
                  <CardDescription>Preview of your report configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Time Period</Label>
                    <p className="text-sm text-muted-foreground">{reportConfig.timePeriod}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Metrics ({reportConfig.metrics.length})</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {reportConfig.metrics.map((metric) => (
                        <Badge key={metric} variant="secondary" className="text-xs">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Format</Label>
                    <p className="text-sm text-muted-foreground">{reportConfig.format.toUpperCase()}</p>
                  </div>
                  <div className="flex flex-col gap-2 pt-4">
                    <Button
                      onClick={() => generateReport()}
                      disabled={reportConfig.metrics.length === 0}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                    <Button
                      variant="outline"
                      onClick={saveReport}
                      className="w-full"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Save Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Pre-configured report templates for common use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Report Templates</h3>
                <p className="text-gray-500">Pre-built report templates coming soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
