import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './components/ThemeToggle';
import AnimatedBackground from './components/AnimatedBackground';
import { aboutData, skillsData, experienceData, projectsData, achievementsData } from './data';
import { 
  Code2, 
  ExternalLink,
  Award,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Cpu,
  Database,
  BrainCircuit,
  FolderOpen,
  FileCode2,
  FileJson,
  FileText,
  Activity,
  User,
  History,
  LayoutDashboard,
  Download
} from 'lucide-react';

import DashboardSection from './components/sections/DashboardSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import AchievementsSection from './components/sections/AchievementsSection';

function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [terminalLogs, setTerminalLogs] = useState([
    { time: new Date().toLocaleTimeString(), text: 'System initialized. Loading kernel...' },
    { time: new Date().toLocaleTimeString(), text: 'Mounting /user/ayushraj/portfolio...' },
    { time: new Date().toLocaleTimeString(), text: 'Authentication successful. Access granted.' }
  ]);
  const terminalEndRef = useRef(null);

  const addLog = (text) => {
    setTerminalLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text }]);
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const handleTabChange = (tabId, label) => {
    setActiveTab(tabId);
    addLog(`cd /var/www/portfolio/${label.toLowerCase()}`);
    addLog(`Executing renderer for ${label}...`);
    
    // For mobile: smooth scroll to the section
    if (window.innerWidth <= 768) {
      const el = document.getElementById(tabId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const Footer = () => (
    <footer style={{ 
      padding: '48px 24px', 
      borderTop: '1px dashed var(--mat-border)', 
      textAlign: 'center',
      color: 'var(--text-secondary)',
      fontSize: '13px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      alignItems: 'center',
      marginTop: '24px'
    }}>
      <div style={{ display: 'flex', gap: '24px', fontSize: '20px', color: 'var(--text-primary)' }}>
        <a href="https://github.com/Ayushraj1701" target="_blank" rel="noreferrer" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'}>
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/ayush-raj-b5145b252/" target="_blank" rel="noreferrer" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'}>
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="mailto:ayushraj1701@gmail.com" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'}>
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', marginTop: '8px', fontSize: '15px' }}>
        <span style={{ color: 'var(--accent-primary)' }}>Ayush</span>_OS © {new Date().getFullYear()}
      </div>
      <div style={{ opacity: 0.6, fontSize: '12px', fontFamily: 'monospace' }}>
        System.exit(0); // Engineered with React & Vite
      </div>
    </footer>
  );

  const tabs = [
    { id: 'hero', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'about', label: 'About_Me.js', icon: <User size={16} /> },
    { id: 'skills', label: 'Skills.yml', icon: <FileCode2 size={16} /> },
    { id: 'experience', label: 'Experience.json', icon: <FileJson size={16} /> },
    { id: 'projects', label: 'Projects.tsx', icon: <FolderOpen size={16} /> },
    { id: 'achievements', label: 'Achievements.md', icon: <Award size={16} /> }
  ];

  const renderContentForTab = (tabId) => {
    switch(tabId) {
      case 'about':
        return <AboutSection />;
      case 'skills':
        return <SkillsSection />;
      
      case 'experience':
        return <ExperienceSection />;

      case 'projects':
        return <ProjectsSection />;

      case 'achievements':
        return <AchievementsSection />;

      case 'hero':
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div className="app-container">
      <AnimatedBackground />
      <div className="bg-glow" />
      
      {/* Mobile Sticky Navbar */}
      <div className="mobile-sticky-navbar" style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        padding: '16px 24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        borderBottom: '1px solid var(--mat-border)', 
        background: 'var(--nav-bg)', 
        backdropFilter: 'blur(12px)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={20} color="var(--accent-primary)" />
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '18px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Ayush_OS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
           <a href="/assets/docs/Ayush_Raj_Resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
             <Download size={14} /> Resume
           </a>
           <ThemeToggle />
        </div>
      </div>

      {/* Sidebar (Explorer) */}
      <div className="sidebar-explorer" style={{ 
        width: '260px', 
        background: 'var(--bg-secondary)', 
        borderRight: '1px solid var(--mat-border)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10
      }}>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--mat-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={20} color="var(--accent-primary)" />
            <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '18px', letterSpacing: '-0.02em' }}>Ayush_OS</span>
          </div>
          <ThemeToggle />
        </div>
        
        <div style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', paddingLeft: '12px' }}>
            Explorer
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id, tab.label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  background: activeTab === tab.id ? 'var(--mat-border)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  transition: 'all 0.2s ease',
                  width: '100%'
                }}
                onMouseOver={e => { if (activeTab !== tab.id) { e.currentTarget.style.background = 'var(--mat-surface)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
                onMouseOut={e => { if (activeTab !== tab.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px', borderTop: '1px solid var(--mat-border)' }}>
          <a href="/assets/docs/Ayush_Raj_Resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '8px' }}>
            <Download size={16} /> Open Resume
          </a>
        </div>
        
        <div style={{ padding: '16px', borderTop: '1px solid var(--mat-border)', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
          System Online
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content-area" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Topbar (Tabs) */}
        <div className="desktop-topbar" style={{ 
          height: '48px', 
          background: 'var(--bg-tertiary)', 
          borderBottom: '1px solid var(--mat-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: '4px'
        }}>
          {tabs.filter(t => t.id === activeTab).map(tab => (
            <div key={tab.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'var(--bg-primary)',
              borderTop: '2px solid var(--accent-primary)',
              borderLeft: '1px solid var(--mat-border)',
              borderRight: '1px solid var(--mat-border)',
              borderBottom: '1px solid transparent',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 500,
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              transform: 'translateY(1px)' // cover bottom border
            }}>
              {tab.icon} {tab.label}
            </div>
          ))}
        </div>

        {/* Desktop Content Viewer */}
        <div className="desktop-content-viewer" style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          <div style={{ minHeight: '100%' }}>
            {renderContentForTab(activeTab)}
          </div>
        </div>

        {/* Mobile Content Viewer (All Sections) */}
        <div className="mobile-content-viewer" style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          
          {tabs.map(tab => (
            <div key={tab.id} id={tab.id} style={{ borderBottom: '1px solid var(--mat-border)' }}>
              {renderContentForTab(tab.id)}
            </div>
          ))}
          
          <Footer />
        </div>

        {/* Integrated Terminal Panel */}
        <div className="terminal-panel" style={{ 
          height: '200px', 
          background: 'var(--terminal-bg)', 
          borderTop: '1px solid var(--mat-border)',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'monospace',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ padding: '8px 16px', background: 'var(--terminal-bg)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'var(--terminal-log)' }}>
             <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
             <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
             <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
             <span style={{ marginLeft: '12px' }}>system_logger.sh</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', color: 'var(--terminal-text)', fontSize: '13px', lineHeight: 1.6, textShadow: '0 0 5px rgba(74, 222, 128, 0.2)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {terminalLogs.map((log, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: 'var(--terminal-log)' }}>[{log.time}]</span>
                <span style={{ color: log.text.includes('Error') ? '#ef4444' : log.text.includes('granted') || log.text.includes('successful') ? '#10b981' : 'var(--terminal-text)' }}>
                  {log.text}
                </span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
              <span style={{ color: '#10b981' }}>➜</span>
              <span style={{ color: '#3b82f6' }}>~</span>
              <span className="cursor-blink" style={{ width: '8px', height: '15px', background: '#e4e4e7', display: 'inline-block' }}></span>
            </div>
            <div ref={terminalEndRef} />
          </div>
        </div>

      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        
        /* Custom Scrollbar for IDE */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        ::-webkit-scrollbar-track {
          background: var(--bg-primary);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--mat-border);
          border: 2px solid var(--bg-primary);
          border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--text-muted);
        }

        /* Mobile Adjustments Handled in index.css */
      `}</style>
    </div>
  );
}

export default App;
