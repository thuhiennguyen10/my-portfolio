import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MainChart, DistributionChart, Table, CustomBarChart, CustomScatterPlot, ContinentChart, TFIDFChart, RoomTypeChart, RMSEComparisonChart } from './charts';
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
    <div className="mb-8">
    <h3 className="font-semibold text-slate-700 mb-4">Project Summary</h3> 
    <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm">
      <p className="text-slate-600 leading-relaxed text-justify w-full max-w-none">
        {project.projectSummary}
      </p>
    </div>
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
            {/* Scatter 1: Subs vs Earnings */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
            <p className="text-xs text-slate-400 mb-2 text-center font-medium uppercase tracking-wider">Subs vs Earnings</p>
            <CustomScatterPlot 
                data={project.scatterData1 || { points: [], line: [] }} 
                color={color} 
                xTitle="Subscribers (Mil)" 
                yTitle="Monthly Earnings (Mil)"
                />
          </div>
          {/* Scatter 2: Views vs Earnings */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
             <p className="text-xs text-slate-400 mb-2 text-center font-medium uppercase tracking-wider">Views vs Earnings</p>
            <CustomScatterPlot 
              data={project.scatterData2 || { points: [], line: [] }} 
              color={color} 
              xTitle="Views (Mil)" 
              yTitle="Monthly Earnings (Mil)"
              />
          </div>
          {/* Scatter 3: Views vs Subs */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
             <p className="text-xs text-slate-400 mb-2 text-center font-medium uppercase tracking-wider">Views vs Subs</p>
            <CustomScatterPlot 
              data={project.scatterData3 || { points: [], line: [] }} 
              color={color} 
              xTitle="Views (Mil)" 
              yTitle="Subscribers (Mil)"
              />
          </div>
        </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
      <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">Median Earnings by Continent</p>
      <ContinentChart data={project.chartDataMain} color={color} />
    </div>
  <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
      <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">Top Words per Channel Type (tf-idf)</p>
      <TFIDFChart data={project.tfidfData || []} color={color} />
    </div>
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

                <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-white">
            <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">Chicago Airbnb Interactive Map</p>
            {/* Sử dụng iframe để nhúng bản đồ Leaflet từ R */}
            <iframe 
              src="./airbnb_map.html" 
              className="w-full h-[400px] rounded-2xl border-none shadow-inner" 
              title="Airbnb Map"
            />
          </div>

          {/* 2. Room Type Bar Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-white">
            <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">Avg Price by Room Type</p>
            <RoomTypeChart data={project.chartDataSecondary || []} color={color} />
          </div>

              </div>
            </section>
            <section>
              <h3 className="font-semibold text-slate-700 mb-4">Model Performance Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Table Comparison */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-white overflow-hidden">
            <p className="text-xs text-slate-400 mb-6 text-center font-medium uppercase">RMSE Metrics by Model</p>
            <Table data={project.tableData} />
          </div>

          {/* Clustered Bar Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-white">
            <p className="text-xs text-slate-400 mb-6 text-center font-medium uppercase">Training vs Validation RMSE</p>
            <RMSEComparisonChart data={project.chartDataMain} color={color} />
          </div>
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
      <h2 className="text-3xl font-bold text-slate-800 mb-6">{project.title}</h2>
      
      {renderSummary()}
      
      {renderLayout()}

      {project.reportPath && (
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-700 mb-4">Detailed Code</h3>
            <a 
              href={project.reportPath} 
              target="_blank" 
              rel="noreferrer" 
              className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs flex items-center gap-1 font-medium transition-colors hover:bg-blue-100"
            >
              Open in full tab <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm">
            <iframe 
              src={project.reportPath} 
              className="w-full h-[800px] rounded-xl border-none shadow-inner bg-white" 
              title={project.title} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;