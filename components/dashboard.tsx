import React from 'react';
import { ProjectData } from '../types';
import { MainChart, DistributionChart } from './charts';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface DashboardProps {
  project: ProjectData;
}

const Dashboard: React.FC<DashboardProps> = ({ project }) => {
  const getThemeHex = () => {
    switch (project.colorTheme) {
      case 'blue': return '#3b82f6';
      case 'purple': return '#a855f7';
      case 'green': return '#22c55e';
      default: return '#64748b';
    }
  };

  const themeHex = getThemeHex();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col justify-start gap-4 border-b border-slate-200/50 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{project.title}</h2>
          <p className="text-slate-500 mt-2 text-lg leading-relaxed max-w-full text-justify">{project.description}</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {project.kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white bg-opacity-60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all group">
            <p className="text-slate-500 text-sm font-medium mb-1 group-hover:text-slate-700 transition-colors">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-slate-800">{kpi.value}</h3>
              <span className={`flex items-center text-sm font-semibold px-2 py-1 rounded-full ${
                kpi.trend === 'up' ? 'text-green-600 bg-green-50' :
                kpi.trend === 'down' ? 'text-red-600 bg-red-50' : 'text-slate-600 bg-slate-50'
              }`}>
                {kpi.trend === 'up' && <ArrowUpRight size={14} className="mr-1" />}
                {kpi.trend === 'down' && <ArrowDownRight size={14} className="mr-1" />}
                {kpi.trend === 'neutral' && <Minus size={14} className="mr-1" />}
                {kpi.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white bg-opacity-60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-700">Performance Trend</h3>
            <div className="flex gap-2 items-center">
                 <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeHex }}></span>
                 <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Current Period</span>
            </div>
          </div>
          <MainChart data={project.chartDataMain} color={themeHex} />
        </div>

        {/* Distribution Chart */}
        <div className="bg-white bg-opacity-60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm">
          <h3 className="font-semibold text-slate-700 mb-6">Distribution</h3>
          <DistributionChart data={project.chartDataDistribution} theme={project.colorTheme} />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white bg-opacity-60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm overflow-hidden">
        <h3 className="font-semibold text-slate-700 mb-6">Detailed Report</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                {Object.keys(project.tableData[0]).filter(k => k !== 'id').map(key => (
                  <th key={key} className="px-6 py-4 capitalize tracking-wide">{key.replace('_', ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {project.tableData.map((row) => (
                <tr key={row.id} className="border-b border-slate-50 hover:bg-white/80 transition-colors">
                  {Object.keys(row).filter(k => k !== 'id').map((key, i) => (
                    <td key={key} className={`px-6 py-4 ${i === 0 ? 'font-medium text-slate-800' : ''}`}>
                      {row[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Embedded Report */}
            {project.reportPath && (
  <div className="bg-white bg-opacity-60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm mt-8">
    <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold text-slate-700 mb-4">Detailed Code</h3>
    {/* full screen button */}
      <a 
        href={project.reportPath} 
        target="_blank" 
        rel="noreferrer" 
        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors flex items-center gap-1"
      >
        Open in full tab <ArrowUpRight size={14} />
      </a>
    </div>

    {/* increase height to 1000px for scrollbar */}
    <div className="w-full h-[1000px] rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-white">
      <iframe 
        src={project.reportPath} 
        title="Technical Report"
        className="w-full h-full"
        frameBorder="0"
      ></iframe>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
