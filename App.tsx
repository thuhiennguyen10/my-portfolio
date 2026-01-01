import React, { useState, useEffect } from 'react';
import { TabView, ProjectData } from './types';
import { PROJECTS, PROFILE } from './constants';
import ProjectCard from './components/ProjectCard';
import Dashboard from './components/dashboard';
import { Linkedin, FileText, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  // 1. Logic khởi tạo Tab từ URL Hash (để giữ vị trí trang khi F5)
  const [activeTab, setActiveTab] = useState<TabView>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'project2') return TabView.PROJECT_2;
    if (hash === 'project3') return TabView.PROJECT_3;
    return TabView.PROJECT_1;
  });

  // 2. Cập nhật Hash khi thay đổi Tab (Ví dụ: nhấn vào Prj 2 sẽ hiện .../#project2)
  useEffect(() => {
    const tabToHash: Record<string, string> = {
      [TabView.PROJECT_1]: 'project1',
      [TabView.PROJECT_2]: 'project2',
      [TabView.PROJECT_3]: 'project3',
    };
    window.location.hash = tabToHash[activeTab];
  }, [activeTab]);

  const activeProject: ProjectData = PROJECTS[activeTab];

  return (
    <div className="min-h-screen relative overflow-hidden text-slate-800 selection:bg-blue-100 font-sans">
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#f8fafc]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT SIDEBAR: Profile & Navigation */}
          <aside className="lg:w-1/3 xl:w-1/4 space-y-8">
             <div className="sticky top-8 space-y-8">
              
              {/* Profile Card */}
              <div className="bg-white/40 backdrop-blur-md border border-white p-6 rounded-3xl shadow-sm text-center">
                 <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full mb-4 flex items-center justify-center text-slate-400 border-2 border-white shadow-sm overflow-hidden">
                    <img 
                      src="https://api.dicebear.com/9.x/avataaars/svg?seed=Valentina&radius=25&backgroundColor=d1d4f9&accessories=round,sunglasses,wayfarers&clothesColor=25557c&clothing=collarAndSweater&clothingGraphic=bear,cumbia,deer,diamond,hola,pizza,resist,skull,skullOutline,bat&eyebrows=defaultNatural&eyes=default&mouth=twinkle&skinColor=ffdbb4" 
                      alt="avatar"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                 </div>
                 <h1 className="text-2xl font-bold text-slate-800">{PROFILE.name}</h1>
                 <p className="text-slate-500 text-sm mb-6">{PROFILE.role}</p>
                 
                 <div className="flex flex-col gap-3">
                    <a 
                      href={PROFILE.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors shadow-blue-200 shadow-lg"
                    >
                      <Linkedin size={16} />
                      LinkedIn Profile
                    </a>
                    
                    <a 
                      href={PROFILE.cvUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-medium transition-colors group"
                    >
                      <FileText size={16} className="text-slate-500 group-hover:text-slate-700" />
                      View CV
                      <ExternalLink size={12} className="opacity-50 group-hover:opacity-100 ml-1" />
                    </a>
                 </div>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-4">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Projects</h2>
                <div className="space-y-3">
                  {(Object.keys(PROJECTS) as TabView[]).map((tabKey) => (
                    <ProjectCard 
                      key={PROJECTS[tabKey].id} 
                      project={PROJECTS[tabKey]} 
                      isActive={activeTab === tabKey}
                      onClick={() => setActiveTab(tabKey)}
                    />
                  ))}
                </div>
              </div>

             </div>
          </aside>

          {/* RIGHT CONTENT: Dashboard */}
          <main className="flex-1 min-w-0">
              <Dashboard project={activeProject} />
          </main>
        </div>
      </div>

      <footer className="mt-24 py-8 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Thu Hien Nguyen. Built with React & Tailwind.</p>
      </footer>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default App;