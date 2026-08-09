import React from 'react';
import { aboutData } from '../../data';

const AboutSection = () => {
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
};

export default AboutSection;
