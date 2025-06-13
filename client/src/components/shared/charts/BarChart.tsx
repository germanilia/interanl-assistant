import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: Array<Record<string, any>>;
  dataKeys: string[];
  colors?: string[];
  xAxisKey: string;
  height?: number;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  dataKeys,
  colors = ['#8884d8', '#82ca9d', '#ffc658'],
  xAxisKey,
  height = 300,
  className,
}) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          {dataKeys.map((key, index) => (
            <Bar 
              key={key} 
              dataKey={key} 
              fill={colors[index % colors.length]} 
              name={key} 
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};