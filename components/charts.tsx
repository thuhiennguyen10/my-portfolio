import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { DataPoint, ScatterPoint, ScatterPlotData } from '../types';

// Component Scatter Plot
export const CustomScatterPlot: React.FC<{ data: ScatterPlotData | any; color: string; xTitle?: string; yTitle?: string }> = ({ 
  data, 
  color, 
  xTitle = "X Axis", 
  yTitle = "Y Axis" 
}) => {
  if (!data || !data.points) return null;

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
          <XAxis 
            type="number" 
            dataKey="x" 
            axisLine={{ stroke: '#e2e8f0' }} 
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 10 }}
            // X axis title
            label={{ value: xTitle, position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 12, fontWeight: 500 }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            axisLine={{ stroke: '#e2e8f0' }} 
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 10 }}
            // Y axis title
            label={{ value: yTitle, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12, fontWeight: 500 } }}
          />
          <ZAxis type="number" range={[60, 400]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          
          <Scatter name="Data" data={data.points} fill={color} fillOpacity={0.6} />
          
          <Scatter 
            name="Regression Line" 
            data={data.line} 
            fill="#8b0000" 
            line={{ stroke: '#8b0000', strokeWidth: 2 }} 
            shape={<rect width={0} height={0} />} 
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

interface ChartProps {
  data: DataPoint[];
  color?: string;
}

// Continent Earnings (Column Chart)
export const ContinentChart: React.FC<{ data: any[], color: string }> = ({ data, color }) => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} tick={{fontSize: 12}} />
        <YAxis tickFormatter={(value) => `$${value/1000}k`} tick={{fontSize: 12}} />
        <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Median Earnings"]} />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// TF-IDF
export const TFIDFChart: React.FC<{ data: any[], color: string }> = ({ data, color }) => {
  const types = Array.from(new Set(data.map(d => d.channel_type)));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {types.map(type => (
        <div key={type} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <p className="text-[10px] font-bold text-center mb-1 text-slate-500 uppercase">{type}</p>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data.filter(d => d.channel_type === type)}>
                <XAxis type="number" hide />
                <YAxis dataKey="word" type="category" tick={{fontSize: 9}} width={50} />
                <Tooltip />
                <Bar dataKey="tf_idf" fill={color} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

// Room Type Chart (Horizontal Bar Chart)
export const RoomTypeChart: React.FC<{ data: any[], color: string }> = ({ data, color }) => (
  <div className="h-[400px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      {/* Sử dụng layout="vertical" để vẽ cột ngang như coord_flip() trong R */}
      <BarChart layout="vertical" data={data} margin={{ left: 40, right: 40 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis type="number" hide /> 
        <YAxis 
          dataKey="name" 
          type="category" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }}
        />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]} label={{ position: 'right', fontSize: 12, fill: '#64748b' }} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);



export const MainChart: React.FC<ChartProps> = ({ data, color = "#3b82f6" }) => {
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
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fillOpacity={1} fill={`url(#color${color})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};


export const CustomBarChart: React.FC<ChartProps> = ({ data, color = "#3b82f6" }) => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);


export const DistributionChart: React.FC<{data: DataPoint[], theme: string}> = ({ data, theme }) => {
  const COLORS = theme === 'blue' ? ['#3b82f6', '#60a5fa', '#93c5fd'] : ['#a855f7', '#c084fc', '#d8b4fe'];
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};


export const Table: React.FC<{ data: any[] }> = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-slate-400 text-sm">No data available</p>;
  const columns = Object.keys(data[0]).filter(k => k !== 'id');
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map(col => <th key={col} className="py-3 px-4 font-semibold text-slate-700 capitalize">{col.replace(/_/g, ' ')}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              {columns.map(col => <td key={col} className="py-3 px-4">{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
