import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ActionItem {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: ActionItem[];
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button 
              key={index} 
              className="w-full justify-start" 
              variant="outline"
              onClick={action.onClick}
            >
              <Icon className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};