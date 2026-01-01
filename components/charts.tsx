import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
  ScatterChart, Scatter, ZAxis,
  LabelList, ComposedChart, ErrorBar, ReferenceLine, ReferenceArea
} from 'recharts';
import { DataPoint, ScatterPoint, ScatterPlotData, BoxPlotDataPoint } from '../types';

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
          <Tooltip formatter={(value: number, name: string) => [`${value}%`, name.replace(':', ' - ')]} />
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
  const BAR_COLORS = ['#166534', '#15803d', '#22c55e', '#4ade80']; // Green Palette 

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 25, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(v) => `${v}%`} />
          
          <Tooltip 
            cursor={{fill: '#f8fafc'}} 
            labelFormatter={(value) => `Product ${value}`} 
            formatter={(v) => [`${v}%`, 'Churn Rate']} 
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {/* Thêm Label trên đầu cột */}
            <LabelList dataKey="value" position="top" formatter={(v: any) => `${v}%`} style={{ fontSize: 11, fill: '#64748b' }} />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CustomBoxPlot = ({ data }: { data: BoxPlotDataPoint[] }) => {
  if (!data || data.length === 0) return null;

  // 🔑 tooltip CHỈ hoạt động nếu có x + y
  const plotData = data.map((d, i) => ({
    ...d,
    x: i,
    y: d.median, // anchor cho tooltip
  }));

  return (
    <div style={{ width: "100%", height: 360 }}>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* X AXIS */}
          <XAxis
            type="number"
            dataKey="x"
            domain={[-0.5, plotData.length - 0.5]}
            ticks={plotData.map(d => d.x)}
            tickFormatter={(v) => plotData[v]?.name}
            axisLine={false}
            tickLine={false}
          />

          {/* Y AXIS: 20 - 30 - 40 - ... */}
          <YAxis
            type="number"
            domain={[0, 100]}
            ticks={[0,10,20,30,40,50,60,70,80,90,100]}
            axisLine={false}
            tickLine={false}
          />

          {/* 🔥 TOOLTIP */}
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div style={{
                    background: "white",
                    padding: 10,
                    border: "1px solid #e5e7eb",
                    fontSize: 12
                  }}>
                    <strong>{d.name}</strong>
                    <div>High: {d.high}</div>
                    <div>Q3: {d.q3}</div>
                    <div><b>Median: {d.median}</b></div>
                    <div>Q1: {d.q1}</div>
                    <div>Low: {d.low}</div>
                  </div>
                );
              }
              return null;
            }}
          />

          {/* BOX + WHISKERS */}
          {plotData.map(d => (
            <g key={d.x}>
              {/* whisker */}
              <ReferenceLine
                segment={[
                  { x: d.x, y: d.low },
                  { x: d.x, y: d.high },
                ]}
                stroke="#166534"
              />

              {/* caps */}
              <ReferenceLine segment={[{ x: d.x - 0.1, y: d.high }, { x: d.x + 0.1, y: d.high }]} />
              <ReferenceLine segment={[{ x: d.x - 0.1, y: d.low }, { x: d.x + 0.1, y: d.low }]} />

              {/* box Q1-Q3 */}
              <ReferenceArea
                x1={d.x - 0.25}
                x2={d.x + 0.25}
                y1={Math.min(d.q1, d.q3)}
                y2={Math.max(d.q1, d.q3)}
                fill="#bbf7d0"
                stroke="#166534"
              />

              {/* median */}
              <ReferenceLine
                segment={[
                  { x: d.x - 0.25, y: d.median },
                  { x: d.x + 0.25, y: d.median },
                ]}
                stroke="#14532d"
                strokeWidth={3}
              />

              {/* 🔴 OUTLIERS */}
              {d.outliers?.map((v, i) => (
                <Scatter
                  key={`${d.x}-o-${i}`}
                  data={[{ x: d.x, y: v }]}
                  fill="#1f2937"
                  r={3}
                />
              ))}
            </g>
          ))}

          {/* 🔑 scatter vô hình để tooltip trigger */}
          <Scatter
            data={plotData}
            dataKey="y"
            fill="transparent"
          />
        </ScatterChart>
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
              {columns.map(col => {
                let value = row[col];
                if (typeof value === 'number' && col.toLowerCase().includes('auc')) {
                  value = `${(value * 100).toFixed(2)}%`;
                }
                return <td key={col} className="py-3 px-4">{value}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const AUCComparisonChart: React.FC<{ data: any[], color: string }> = ({ data, color }) => (
  <div className="h-[450px] w-full"> {/* Tăng chiều cao một chút vì có tới 10 model */}
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={data} margin={{ top: 5, right: 45, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
        <XAxis 
          type="number" 
          domain={[0, 100]} 
          tickFormatter={(v) => `${v}%`} 
          tick={{fontSize: 10}}
        />
        <YAxis 
          dataKey="name" 
          type="category" 
          tick={{fontSize: 9}} 
          width={110} 
          axisLine={false} 
          tickLine={false} 
        />
        <Tooltip 
          formatter={(v: number) => [`${(v * 100).toFixed(2)}%`]} 
          labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
        />
        <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px', fontSize: '11px' }} />
        
        {/* Chuyển dataKey sang giá trị đã nhân 100 nếu bạn muốn vẽ dựa trên thang 100 */}
        <Bar name="Validation AUC" dataKey="value" fill={color} radius={[0, 4, 4, 0]} barSize={10}>
          {/* Nhân 100 trực tiếp trong lúc vẽ nếu data gốc là 0.89 */}
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={color} />)}
        </Bar>
        <Bar name="Training AUC" dataKey="secondaryValue" fill={`${color}40`} radius={[0, 4, 4, 0]} barSize={10} />
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



