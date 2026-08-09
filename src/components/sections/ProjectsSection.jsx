import React from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { projectsData } from '../../data';

const ProjectsSection = () => {
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
};

export default ProjectsSection;
