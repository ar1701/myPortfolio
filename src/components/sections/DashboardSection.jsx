import React from 'react';
import { Activity, Code2, Award } from 'lucide-react';

const DashboardSection = () => {
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
};

export default DashboardSection;
