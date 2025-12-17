import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { DataPoint } from '../types';

interface MainChartProps {
  data: DataPoint[];
  color: string;
}

export const MainChart: React.FC<MainChartProps> = ({ data, color }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`color${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={3}
            fillOpacity={1} 
            fill={`url(#color${color})`} 
            animationDuration={1500}
          />
           <Area 
            type="monotone" 
            dataKey="secondaryValue" 
            stroke={color} 
            strokeOpacity={0.3}
            strokeWidth={2}
            fill="none"
            strokeDasharray="5 5"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

interface DistributionChartProps {
  data: DataPoint[];
  theme: 'blue' | 'purple' | 'green' | 'rose';
}

export const DistributionChart: React.FC<DistributionChartProps> = ({ data, theme }) => {
  const getColors = () => {
    if (theme === 'blue') return ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];
    if (theme === 'purple') return ['#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff'];
    if (theme === 'green') return ['#22c55e', '#4ade80', '#86efac', '#bbf7d0'];
    return ['#94a3b8', '#cbd5e1', '#e2e8f0', '#f1f5f9'];
  };
  
  const COLORS = getColors();

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', color: '#64748b' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
