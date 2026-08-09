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
        return (
          <div className="omni-block fade-in" style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: '24px', background: 'var(--mat-surface)' }}>
            <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-heading)' }}>{">"} About_Me</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6, marginBottom: '16px' }}>{aboutData.text1}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>{aboutData.text2}</p>
              </div>
              <div className="glass-card" style={{ background: 'rgba(99, 102, 241, 0.05)', borderColor: 'var(--accent-primary)' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--text-primary)' }}>Beyond Tech</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>{aboutData.beyondTech}</p>
              </div>
            </div>
            <div className="glass-card" style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
              <img className="coder-gif" src="/assets/images/coder.gif" alt="Coding Animation" style={{ height: '200px', objectFit: 'contain' }} />
            </div>
          </div>
        );
      
      case 'skills':
        return (
          <div className="fade-in" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', marginBottom: '32px' }}>{">"} System_Capabilities</h2>
            <div className="bento-grid">
              {skillsData.map((skillGroup, idx) => (
                <div key={idx} className="bento-card">
                  <i className={`${skillGroup.icon} bento-icon-bg`}></i>
                  <h3 style={{ fontSize: '20px', marginBottom: '24px', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <i className={skillGroup.icon} style={{ color: 'var(--accent-primary)' }}></i> 
                    {skillGroup.category}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', position: 'relative', zIndex: 2 }}>
                    {skillGroup.items.map((item, i) => (
                      <span key={i} className="skill-tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'experience':
        return (
          <div className="fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', margin: 0 }}>{">"} Work_History</h2>
            <div className="timeline-container">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="glass-card timeline-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--mat-surface)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img src={exp.image} alt={exp.company} style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover', background: '#fff' }} />
                        <div>
                          <h3 style={{ fontSize: '22px', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>{exp.title}</h3>
                          <div style={{ fontSize: '16px', color: 'var(--accent-primary)', fontWeight: 500 }}>{exp.company}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <span className="badge badge-info">{exp.period}</span>
                        {exp.cert && (
                          <a href={exp.cert} target="_blank" rel="noreferrer" style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                            <Award size={14} /> View Certificate
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="timeline-details">
                      <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--mat-border)' }}>
                        <ul style={{ paddingLeft: '24px', margin: 0, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.6 }}>
                          {exp.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="fade-in" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', marginBottom: '32px' }}>{">"} ls ./projects</h2>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button 
                onClick={() => document.getElementById('projects-gallery').scrollBy({ left: -340, behavior: 'smooth' })}
                style={{ 
                  position: 'absolute', 
                  left: '-20px', 
                  zIndex: 10, 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'var(--mat-surface)', 
                  border: '1px solid var(--mat-border)',
                  color: 'var(--text-primary)',
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--mat-shadow-lg)'
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--mat-border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              >
                <ChevronLeft size={20} />
              </button>

              <div id="projects-gallery" className="gallery-container" style={{ flex: 1 }}>
                {projectsData.map((proj, idx) => (
                  <div key={idx} className="omni-block gallery-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', background: 'var(--mat-surface)', flexShrink: 0 }}>
                    <div style={{ height: '200px', width: '100%', overflow: 'hidden', borderBottom: '1px solid var(--mat-border)' }}>
                      <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform='scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform='scale(1)'} />
                    </div>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{proj.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, flex: 1 }}>{proj.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '16px 0' }}>
                        {proj.tags.map((tag, i) => (
                          <span key={i} className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontSize: '11px' }}>{tag}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {proj.demo && (
                          <a href={proj.demo} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1, padding: '8px', fontSize: '13px', justifyContent: 'center' }}>Visit <ExternalLink size={14}/></a>
                        )}
                        {proj.repo && (
                          <a href={proj.repo} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1, padding: '8px', fontSize: '13px', justifyContent: 'center' }}>Source <i className="fab fa-github"></i></a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => document.getElementById('projects-gallery').scrollBy({ left: 340, behavior: 'smooth' })}
                style={{ 
                  position: 'absolute', 
                  right: '-20px', 
                  zIndex: 10, 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'var(--mat-surface)', 
                  border: '1px solid var(--mat-border)',
                  color: 'var(--text-primary)',
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--mat-shadow-lg)'
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--mat-border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="fade-in" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', marginBottom: '32px' }}>{">"} cat hall_of_fame.log</h2>
            <div className="achievements-grid">
              {achievementsData.map((ach, idx) => (
                <div key={idx} className="achievement-card" style={{ '--card-color': ach.color }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="achievement-icon">
                      <i className={`fas ${ach.icon}`}></i>
                    </div>
                    <h3 style={{ fontSize: '20px', margin: 0, lineHeight: 1.3 }}>{ach.title}</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                    {ach.details.map((detail, i) => (
                      <div key={i} className="achievement-detail-item">
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'hero':
      default:
        return (
          <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '48px', gap: '32px' }}>
            <div className="hero-text" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', position: 'relative' }}>
              <span style={{ display: 'block', color: 'var(--text-secondary)' }}>System Status:</span>
              <span className="text-gradient" style={{ display: 'block' }}>Operational.</span>
              <div className="system-stats" style={{ position: 'absolute', top: '-20px', right: '0', fontSize: '14px', color: 'var(--accent-primary)', fontFamily: 'monospace', opacity: 0.7 }}>
                [CPU: 18%] [MEM: 2.1GB]<br/>
                UPTIME: 99.99%<br/>
                USER: ROOT
              </div>
            </div>
            
            <div className="bento-grid" style={{ marginTop: 'auto', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className="bento-item" style={{ alignItems: 'center', textAlign: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.05)' }}>
                <Activity size={32} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '24px', margin: 0 }}>150+</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Problems Solved</p>
              </div>
              <div className="bento-item" style={{ alignItems: 'center', textAlign: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.05)' }}>
                <Code2 size={32} color="#10b981" />
                <h3 style={{ fontSize: '24px', margin: 0 }}>5</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Major Projects</p>
              </div>
              <div className="bento-item" style={{ alignItems: 'center', textAlign: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.05)' }}>
                <Award size={32} color="#f59e0b" />
                <h3 style={{ fontSize: '24px', margin: 0 }}>9+</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>GPA Maintained</p>
              </div>
            </div>

            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-primary)', padding: '2px', flexShrink: 0 }}>
                  <img src="/assets/images/Ayush_Raj_CodeCrew.png" alt="Ayush Raj" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', margin: '0 0 4px 0' }}>Ayush Raj</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>AI-ML, Robotics & Full Stack Developer</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
                <a href="https://github.com/ar1701" target="_blank" rel="noreferrer" className="btn btn-secondary" title="GitHub"><i className="fab fa-github" style={{fontSize: '18px'}}></i></a>
                <a href="https://linkedin.com/in/ayush-raj17" target="_blank" rel="noreferrer" className="btn btn-secondary" title="LinkedIn"><i className="fab fa-linkedin" style={{fontSize: '18px'}}></i></a>
                <a href="https://www.instagram.com/ayushraj_17/" target="_blank" rel="noreferrer" className="btn btn-secondary" title="Instagram"><i className="fab fa-instagram" style={{fontSize: '18px'}}></i></a>
                <a href="https://leetcode.com/u/ayush_17_/" target="_blank" rel="noreferrer" className="btn btn-secondary" title="LeetCode"><i className="fas fa-code" style={{fontSize: '18px'}}></i></a>
                <a href="https://www.hackerrank.com/profile/ayushrajj30" target="_blank" rel="noreferrer" className="btn btn-secondary" title="HackerRank"><i className="fab fa-hackerrank" style={{fontSize: '18px'}}></i></a>
                <a href="mailto:ayushrajj30@gmail.com" className="btn btn-secondary" title="Email"><i className="fas fa-envelope" style={{fontSize: '18px'}}></i></a>
              </div>
            </div>
          </div>
        );
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
        background: 'rgba(10, 10, 10, 0.85)', 
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
