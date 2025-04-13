import React from "react";
import HeroSection from "../../components/sections/HeroSection";
import FeaturesSection from "../../components/sections/FeaturesSection";
import ContactSection from "../../components/sections/ContactSection";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturesSection />
      <ContactSection />
    </div>
  );
};

export default Home;
