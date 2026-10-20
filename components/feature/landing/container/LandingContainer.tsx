import React from "react";
import HeroSection from "../section/HeroSection";
import FeaturesSection from "../section/FeaturesSection";
import StepProcessSection from "../section/StepProcessSection";
import CtaSection from "../section/CtaSection";
import FaqSection from "../section/FaqSection";
import FooterSection from "../section/FooterSection";

export const LandingContainer: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas flex flex-col selection:bg-primary-100 selection:text-primary-900">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection /> 
        <StepProcessSection />
        <CtaSection />
        <FaqSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default LandingContainer;
