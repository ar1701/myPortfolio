import React from 'react';
import { skillsData } from '../../data';

const SkillsSection = () => {
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
};

export default SkillsSection;
