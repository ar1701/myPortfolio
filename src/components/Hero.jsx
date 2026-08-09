import { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div 
        className="hero-content"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >
        <div className="holographic-container">
          <h1 className="holographic-text">AYUSH RAJ</h1>
        </div>
        
        <div className="hero-subtitle glass">
          <p className="text-gradient">Computer Science Engineer @ CUSAT'26</p>
          <p className="text-accent">Specializing in AI-ML & Full Stack</p>
        </div>
        
        <div className="social-links-container glass">
          <a href="https://github.com/ar1701" target="_blank" rel="noreferrer" className="social-link glass-interactive">
            GH
          </a>
          <a href="https://linkedin.com/in/ayush-raj17" target="_blank" rel="noreferrer" className="social-link glass-interactive">
            IN
          </a>
          <a href="mailto:ayushrajj30@gmail.com" className="social-link glass-interactive">
            EM
          </a>
          <a href="https://leetcode.com/ayushrajj/" target="_blank" rel="noreferrer" className="social-link glass-interactive">
            LC
          </a>
        </div>
      </div>
      
      <div className="hero-image-container glass">
        <img src="/assets/images/coder.gif" alt="Coding Animation" className="hero-gif" />
      </div>
    </section>
  );
};

export default Hero;
