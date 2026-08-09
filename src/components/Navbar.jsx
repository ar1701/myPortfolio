import { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = 'hero';
      const scrollY = window.scrollY;
      
      navItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          if (scrollY >= offsetTop) {
            currentSection = item.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: '90%', maxWidth: '800px' }}>
        <div style={{
          background: 'var(--mat-surface)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--mat-border)',
          borderRadius: '999px',
          padding: '8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--mat-shadow-lg)',
          transition: 'all 0.3s ease'
        }}>
          
          <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <Terminal size={20} color="var(--text-primary)" />
            <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '18px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Ayush<span style={{ color: 'var(--accent-primary)' }}>Raj</span></span>
          </a>

          <nav className="hide-on-mobile" style={{ display: 'flex', gap: '4px' }}>
            {navItems.map(item => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    background: isActive ? 'var(--text-primary)' : 'transparent',
                    textDecoration: 'none',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '14px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={!isActive ? e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--mat-surface-hover)'; } : undefined}
                  onMouseOut={!isActive ? e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; } : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="hide-on-mobile"><ThemeToggle /></div>
            <button 
              className="show-on-mobile" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map(item => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                textDecoration: 'none',
                marginBottom: '16px'
              }}
            >
              {item.label}
            </a>
          );
        })}
        <div style={{ marginTop: '24px' }}>
          <ThemeToggle />
        </div>
      </div>

      <style>{`
        .show-on-mobile { display: none !important; }
        @media (max-width: 768px) {
          .hide-on-mobile { display: none !important; }
          .show-on-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
