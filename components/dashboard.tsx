import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MainChart, DistributionChart, Table, CustomBarChart, CustomScatterPlot } from './charts';
import { ProjectData } from '../types';

const Dashboard = ({ project }: { project: ProjectData }) => {
  const getThemeColor = () => {
    switch(project.colorTheme) {
      case 'blue': return '#3b82f6';
      case 'purple': return '#a855f7';
      case 'green': return '#22c55e';
      default: return '#3b82f6';
    }
  };

  const renderSummary = () => (
    <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm mb-8">
      <h3 className="font-semibold text-slate-700 mb-2">Project Summary</h3>
      <p className="text-slate-600 leading-relaxed text-justify w-full max-w-none">
        {project.projectSummary}
      </p>
    </div>
  );

  const renderLayout = () => {
    const color = getThemeColor();
    switch (project.id) {
      case 'youtube-r':
        return (
          <div className="space-y-8">
            <section>
              <h3 className="font-semibold text-slate-700 mb-4">Visualization and Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
            <p className="text-xs text-slate-400 mb-2 text-center font-medium uppercase tracking-wider">Views vs Earnings</p>
            <CustomScatterPlot data={project.scatterData1 || []} color={color} />
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
             <p className="text-xs text-slate-400 mb-2 text-center font-medium uppercase tracking-wider">Subs vs Earnings</p>
            <CustomScatterPlot data={project.scatterData2 || []} color={color} />
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
             <p className="text-xs text-slate-400 mb-2 text-center font-medium uppercase tracking-wider">Uploads vs Views</p>
            <CustomScatterPlot data={project.scatterData3 || []} color={color} />
          </div>
        </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm"><MainChart data={project.chartDataMain} color={color} /></div>
                <div className="bg-white p-4 rounded-2xl shadow-sm"><MainChart data={project.chartDataMain} color={color} /></div>
                <div className="bg-white p-4 rounded-2xl shadow-sm"><MainChart data={project.chartDataMain} color={color} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm"><CustomBarChart data={project.chartDataMain} color={color} /></div>
                <div className="bg-white p-6 rounded-3xl shadow-sm"><CustomBarChart data={project.chartDataMain} color={color} /></div>
              </div>
            </section>
            <section>
              <h3 className="font-semibold text-slate-700 mb-4">Model Performance Comparison</h3>
              <div className="bg-white p-6 rounded-3xl shadow-sm"><Table data={project.tableData} /></div>
            </section>
          </div>
        );

      case 'airbnb-r':
        return (
          <div className="space-y-8">
            <section>
              <h3 className="font-semibold text-slate-700 mb-4">Visualization and Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm"><MainChart data={project.chartDataMain} color={color} /></div>
                <div className="bg-white p-6 rounded-3xl shadow-sm"><CustomBarChart data={project.chartDataMain} color={color} /></div>
              </div>
            </section>
            <section>
              <h3 className="font-semibold text-slate-700 mb-4">Model Performance Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm"><Table data={project.tableData} /></div>
                <div className="bg-white p-6 rounded-3xl shadow-sm"><CustomBarChart data={project.chartDataMain} color={color} /></div>
              </div>
            </section>
          </div>
        );

      case 'churn-py':
        return (
          <div className="space-y-8">
            <section>
              <h3 className="font-semibold text-slate-700 mb-4">Visualization and Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm"><DistributionChart data={project.chartDataDistribution} theme={project.colorTheme} /></div>
                <div className="bg-white p-4 rounded-2xl shadow-sm"><CustomBarChart data={project.chartDataMain} color={color} /></div>
                <div className="bg-white p-4 rounded-2xl shadow-sm"><CustomBarChart data={project.chartDataMain} color={color} /></div>
              </div>
            </section>
            <section>
              <h3 className="font-semibold text-slate-700 mb-4">Model Performance Comparison</h3>
              <div className="bg-white p-6 rounded-3xl shadow-sm mb-6"><Table data={project.tableData} /></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm"><MainChart data={project.chartDataMain} color={color} /></div>
                <div className="bg-white p-4 rounded-2xl shadow-sm"><MainChart data={project.chartDataMain} color={color} /></div>
                <div className="bg-white p-4 rounded-2xl shadow-sm"><MainChart data={project.chartDataMain} color={color} /></div>
              </div>
            </section>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-slate-800">{project.title}</h2>
      {renderSummary()}
      {renderLayout()}
      {project.reportPath && (
        <div className="mt-8 bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-700">Detailed Code</h3>
            <a href={project.reportPath} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs flex items-center gap-1 font-medium transition-colors hover:bg-blue-100">
              Open in full tab <ArrowUpRight size={14} />
            </a>
          </div>
          <iframe src={project.reportPath} className="w-full h-[800px] rounded-xl border-none shadow-inner bg-white" title="Technical Report" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;