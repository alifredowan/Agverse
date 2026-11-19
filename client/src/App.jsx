import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Technology from './components/Technology';
import Statistics from './components/Statistics';
import CallToAction from './components/CallToAction';
import Sustainability from './components/Sustainability';
import RoiCalculator from './components/RoiCalculator';
import DroneSimulator from './components/DroneSimulator';
import CaseStudiesAndProof from './components/CaseStudiesAndProof';
import FaqAccordion from './components/FaqAccordion';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuditCalendarModal from './components/AuditCalendarModal';
import LegalModal from './components/LegalModal';
import CookieBanner from './components/CookieBanner';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('en');
  const [isDark, setIsDark] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('Tech Audit');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: 'privacy' });

  // Update dark mode class on html root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const t = translations[lang] || translations.en;

  const handleSelectInterest = (interestName) => {
    setSelectedInterest(interestName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] dark:bg-[#0B3D2E] text-[#14201B] dark:text-[#F5F1E8] flex flex-col transition-colors duration-300">
      {/* Sticky Navigation Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenAudit={() => setIsCalendarOpen(true)}
      />

      {/* Main Content Sections (Strict Order as Specified) */}
      <main id="main-content" className="flex-1">
        {/* 4.1 Hero */}
        <Hero
          t={t}
          onSelectInterest={handleSelectInterest}
        />

        {/* 4.2 About */}
        <About
          t={t}
        />

        {/* 4.3 Technology */}
        <Technology
          t={t}
        />

        {/* 4.4 Stats Band */}
        <Statistics
          t={t}
        />

        {/* 4.5 CTA Banner */}
        <CallToAction
          t={t}
          onSelectInterest={handleSelectInterest}
        />

        {/* 4.6 Sustainability */}
        <Sustainability
          t={t}
        />

        {/* Part B Enhancements: ROI Calculator */}
        <RoiCalculator
          t={t}
          onSelectInterest={handleSelectInterest}
        />

        {/* Part B Enhancements: Drone NDVI Multispectral Simulator */}
        <DroneSimulator
          t={t}
        />

        {/* Part B Enhancements: Verified Case Studies & Regional Proof */}
        <CaseStudiesAndProof
          t={t}
        />

        {/* Part B Enhancements: FAQ Accordion */}
        <FaqAccordion
          t={t}
        />

        {/* 4.7 Contact Section */}
        <Contact
          t={t}
          selectedInterest={selectedInterest}
          onOpenCalendar={() => setIsCalendarOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        t={t}
        onOpenPrivacy={() => setLegalModalState({ isOpen: true, type: 'privacy' })}
        onOpenTerms={() => setLegalModalState({ isOpen: true, type: 'terms' })}
      />

      {/* Interactive Modals & Banners */}
      <AuditCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        type={legalModalState.type}
        onClose={() => setLegalModalState({ isOpen: false, type: 'privacy' })}
      />

      <CookieBanner
        onOpenPrivacy={() => setLegalModalState({ isOpen: true, type: 'privacy' })}
      />
    </div>
  );
}
