import { useState, useEffect } from 'react';
import './FloatingDock.css';

const FloatingDock = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`floating-dock-container ${scrolled ? 'scrolled' : ''}`}>
      <nav className="floating-dock glass">
        <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="dock-link">About</a>
        <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="dock-link">Skills</a>
        <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="dock-link">Experience</a>
        <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="dock-link">Projects</a>
        <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="dock-link">Contact</a>
      </nav>
    </div>
  );
};

export default FloatingDock;
