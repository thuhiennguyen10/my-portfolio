  import React from 'react';
  import { ArrowUpRight } from 'lucide-react';
  import { MainChart, DistributionChart, Table, CustomBarChart, CustomScatterPlot, ContinentChart, TFIDFChart, RoomTypeChart, RMSEComparisonChart, DonutChart, GradientBarChart, AUCComparisonChart } from './charts';
  import { BoxPlotDataPoint, ProjectData } from '../types';

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
        case 'project-youtube':
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
                <div className="bg-white p-6 rounded-3xl shadow-sm min-h-[300px] flex flex-col">
                  <div className="flex-1 overflow-auto">
                  <Table data={project.tableData} />
                  </div>
                </div>
              </section>
            </div>
          );

        case 'project-airbnb':
          return (
            <div className="space-y-8">
              <section>
                <h3 className="font-semibold text-slate-700 mb-4">Visualization and Analysis</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-white">
              <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">Chicago Airbnb Interactive Map</p>
              {/* Use iframe from embed Leaflet map from R */}
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
                <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              
                  {/* Table Comparison */}
            <div className="w-full lg:w-1/2 bg-white p-8 rounded-3xl shadow-sm border border-slate-50 flex flex-col">
      <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">
        RMSE Metrics by Model
      </p>
      <div className="flex-1 overflow-auto">
        <Table data={project.tableData} />
      </div>
    </div>

            {/* Clustered Bar Chart */}
            <div className="w-full lg:w-1/2 bg-white p-8 rounded-3xl shadow-sm border border-slate-50 flex flex-col min-h-[300px]">
      <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">
        Training vs Validation RMSE
      </p>
      <div className="flex-1 flex items-center justify-center w-full">
        <RMSEComparisonChart data={project.chartDataMain} color={color} />
      </div>
    </div>

          </div>
              </section>
            </div>
          );

        case 'project-churn':
          return (
            <div className="space-y-8">
              <section>
                <h3 className="font-semibold text-slate-700 mb-4">Visualization and Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* 1. Donut Chart */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-white">
              <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">Churn Distribution by Active Membership</p>
              <DonutChart data={project.chartDataDistribution} />
            </div>

            {/* 2. Column Chart */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-white flex flex-col min-h-[350px]">
              <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">Churn Rate by Product Number</p>
              <div className="flex-1 flex items-center justify-center"> <GradientBarChart data={project.chartDataMain} /> </div>
              
            </div>
                
  {/* 3. Box Plot */}
<div className="bg-white p-6 rounded-3xl shadow-sm border border-white min-h-[350px] flex flex-col">
  <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">
    Age Distribution by Churn Status
  </p>
  
  {/* Nhúng file HTML thông qua iframe */}
  <div className="flex-1 flex items-center justify-center w-full overflow-hidden rounded-xl">
    <iframe 
      src="./boxplot_age.html" 
      className="w-full h-full border-none"
      title="Age Box Plot"
      
    />
  </div>
</div>

                </div>
              </section>
              <section>
                <h3 className="font-semibold text-slate-700 mb-4">Model Performance Comparison</h3>
                <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                  {/* AUC Table */}
    <div className="w-full lg:w-1/2 bg-white p-8 rounded-3xl shadow-sm border border-slate-50 flex flex-col">
    <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">
      AUC Metrics by Model
    </p>
    <div className="flex-1 overflow-auto">
       <Table data={project.tableData} />
    </div>
  </div>

    {/* AUC graph */}

    <div className="w-full lg:w-1/2 bg-white p-8 rounded-3xl shadow-sm border border-slate-50 flex flex-col min-h-[450px]">
    <p className="text-xs text-slate-400 mb-4 text-center font-medium uppercase tracking-wider">
      Training vs Validation AUC
    </p>
    {/* flex-1 đảm bảo biểu đồ chiếm hết không gian còn lại và tự giãn dòng */}
    <div className="flex-1 w-full">
      <AUCComparisonChart data={project.aucData || []} color={color} />
    </div>
  </div>
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