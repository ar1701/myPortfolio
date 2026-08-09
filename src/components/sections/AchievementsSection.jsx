import React from 'react';
import { achievementsData } from '../../data';

const AchievementsSection = () => {
  return (
    <div className="fade-in" style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', marginBottom: '32px' }}>{">"} cat hall_of_fame.log</h2>
      <div className="achievements-grid">
        {achievementsData.map((ach, idx) => (
          <div key={idx} className="achievement-card" style={{ '--card-color': ach.color }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="achievement-icon" style={{ fontSize: ach.icon.startsWith('fa-') ? 'inherit' : '24px' }}>
                {ach.icon.startsWith('fa-') ? <i className={`fas ${ach.icon}`}></i> : <span>{ach.icon}</span>}
              </div>
              <h3 style={{ fontSize: '20px', margin: 0, lineHeight: 1.3 }}>{ach.title}</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              {ach.details.map((detail, i) => (
                <div key={i} className="achievement-detail-item" dangerouslySetInnerHTML={{ __html: detail }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
