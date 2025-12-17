import React from 'react';
import { ProjectData } from '../types';
import { ChevronRight, BarChart2, TrendingUp, PieChart } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectData;
  isActive: boolean;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive, onClick }) => {
  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'blue': return 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100';
      case 'purple': return 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100';
      case 'green': return 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getActiveStyle = () => {
     if (!isActive) return 'opacity-70 hover:opacity-100 scale-95';
     return 'ring-2 ring-offset-2 ring-offset-white shadow-lg scale-100 opacity-100';
  }

  const getRingColor = (theme: string) => {
      switch (theme) {
        case 'blue': return 'ring-blue-400';
        case 'purple': return 'ring-purple-400';
        case 'green': return 'ring-green-400';
        default: return 'ring-gray-400';
      }
  }

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full text-left p-6 rounded-3xl transition-all duration-300 ease-out
        border backdrop-blur-sm
        ${getThemeColor(project.colorTheme)}
        ${getActiveStyle()}
        ${isActive ? getRingColor(project.colorTheme) : 'border-transparent'}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-white bg-opacity-60 shadow-sm`}>
          {project.colorTheme === 'blue' && <BarChart2 size={24} />}
          {project.colorTheme === 'purple' && <TrendingUp size={24} />}
          {project.colorTheme === 'green' && <PieChart size={24} />}
        </div>
        {isActive && <ChevronRight className="animate-pulse" />}
      </div>
      
      <h3 className="text-xl font-bold mb-1">{project.title}</h3>
      <p className="text-sm opacity-80 line-clamp-2 leading-relaxed">{project.description}</p>
    </button>
  );
};

export default ProjectCard;
