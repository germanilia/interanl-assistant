import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Server, Activity } from 'lucide-react';

interface StatusItemProps {
  name: string;
  status: 'online' | 'offline' | 'warning';
  details?: string;
}

interface SystemStatusCardProps {
  items: StatusItemProps[];
  performanceMetrics?: {
    name: string;
    value: number;
    max: number;
  }[];
  className?: string;
}

export const SystemStatusCard: React.FC<SystemStatusCardProps> = ({
  items,
  performanceMetrics,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {item.name.includes('Server') ? (
                <Server className="h-4 w-4" />
              ) : (
                <Activity className="h-4 w-4" />
              )}
              <span className="text-sm">{item.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.status === 'online' ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : item.status === 'warning' ? (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <Badge variant="secondary">
                {item.details || (item.status === 'online' ? 'Online' : item.status === 'warning' ? 'Warning' : 'Offline')}
              </Badge>
            </div>
          </div>
        ))}

        {performanceMetrics && performanceMetrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{metric.name}</span>
              <span>{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};