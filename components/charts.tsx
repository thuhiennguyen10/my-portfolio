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

export const RMSEComparisonChart: React.FC<{ data: any[], color: string }> = ({ data, color }) => (
  <div className="h-[400px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={data} margin={{ left: 40, right: 40, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" /> 
        <XAxis type="number" tick={{fontSize: 10}} label={{ value: 'RMSE', position: 'insideBottom', offset: -5 }} />
        <YAxis dataKey="name" type="category" tick={{fontSize: 10}} width={100} />
        <Tooltip cursor={{fill: '#f8fafc'}} />
        <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
        
        {/* Validation RMSE */}
        <Bar name="Validation RMSE" dataKey="value" fill={color} radius={[0, 4, 4, 0]} barSize={15} />
        
        {/* Training RMSE - Lighter color */}
        <Bar name="Training RMSE" dataKey="secondaryValue" fill={`${color}60`} radius={[0, 4, 4, 0]} barSize={15} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const DonutChart: React.FC<{ data: any[] }> = ({ data }) => {
  const GREEN_PALETTE = ['#15803d', '#22c55e', '#86efac', '#dcfce7'];
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60} // Space inside for Donut
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={GREEN_PALETTE[index % GREEN_PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value}%`, 'Percentage']} />
            <Legend 
            verticalAlign="bottom" 
            iconType="circle" 
            wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GradientBarChart: React.FC<{ data: any[] }> = ({ data }) => {
  const BAR_COLORS = ['#166534', '#15803d', '#22c55e', '#4ade80']; // Palette xanh từ đậm đến nhạt

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(v) => `${v}%`} />
          <Tooltip cursor={{fill: '#f8fafc'}} formatter={(v) => [`${v}%`, 'Tỷ lệ Churn']} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const RenderBoxPlotShape = (props: any) => {
  const { x, width, low, q1, median, q3, high, yAxisScale } = props;
  
  // Chuyển đổi giá trị data sang tọa độ pixel trên biểu đồ
  const yLow = yAxisScale(low);
  const yQ1 = yAxisScale(q1);
  const yMedian = yAxisScale(median);
  const yQ3 = yAxisScale(q3);
  const yHigh = yAxisScale(high);
  const center = x + width / 2;

  return (
    <g stroke="#15803d" strokeWidth={2} fill="none">
      {/* 1. Vẽ Whisker (Râu) - Đường thẳng từ cực thấp đến cực cao */}
      <line x1={center} y1={yLow} x2={center} y2={yHigh} strokeDasharray="4 4" />
      <line x1={center - 10} y1={yLow} x2={center + 10} y2={yLow} /> {/* Chốt dưới */}
      <line x1={center - 10} y1={yHigh} x2={center + 10} y2={yHigh} /> {/* Chốt trên */}

      {/* 2. Vẽ Box (Từ Q1 đến Q3) */}
      <rect 
        x={x} 
        y={yQ3} 
        width={width} 
        height={Math.abs(yQ3 - yQ1)} 
        fill="#bbf7d0" 
        stroke="#15803d" 
      />

      {/* 3. Vẽ đường Median (Trung vị) */}
      <line x1={x} y1={yMedian} x2={x + width} y2={yMedian} stroke="#166534" strokeWidth={3} />
    </g>
  );
};

export const CustomBoxPlot: React.FC<{ data: any[] }> = ({ data }) => (
  <div className="h-[350px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar 
          dataKey="q3" 
          shape={(props: any) => <RenderBoxPlotShape {...props} yAxisScale={props.yScale} />} 
          // Truyền các giá trị thống kê vào để shape xử lý
        />
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
