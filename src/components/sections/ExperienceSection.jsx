import React, { useState } from 'react';
import { Award, ChevronDown } from 'lucide-react';
import { experienceData } from '../../data';

const ExperienceSection = () => {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIdx(prev => prev === idx ? null : idx);
  };

  return (
    <div className="fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', margin: 0 }}>{">"} Work_History</h2>
      <div className="timeline-container">
        {experienceData.map((exp, idx) => (
          <div key={idx} className="timeline-node" onClick={() => toggleExpand(idx)}>
            <div className={`glass-card timeline-card ${expandedIdx === idx ? 'expanded' : ''}`} style={{ display: 'flex', flexDirection: 'column', background: 'var(--mat-surface)' }}>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {exp.cert && (
                      <a href={exp.cert} target="_blank" rel="noreferrer" style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }} onClick={(e) => e.stopPropagation()}>
                        <Award size={14} /> View Certificate
                      </a>
                    )}
                    <button 
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
                      aria-label="Toggle Details"
                    >
                      <ChevronDown size={20} style={{ transform: expandedIdx === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="timeline-details">
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--mat-border)' }}>
                  <ul style={{ paddingLeft: '24px', margin: 0, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.6 }}>
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
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
};

export default ExperienceSection;
