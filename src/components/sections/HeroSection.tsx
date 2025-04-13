import React from 'react';
import { Link } from 'react-router-dom';
import './Sections.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Track Your Running Journey</h1>
        <p>Join our community of runners and achieve your fitness goals</p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/features" className="btn btn-secondary">Learn More</Link>
        </div>
      </div>
      <div className="hero-image">
        {/* You can add an image here */}
        <div className="placeholder-image">Running Image</div>
      </div>
    </section>
  );
};

export default HeroSection;