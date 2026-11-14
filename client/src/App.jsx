import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Technology from './components/Technology';
import Statistics from './components/Statistics';
import CallToAction from './components/CallToAction';
import Sustainability from './components/Sustainability';
import Footer from './components/Footer';
import AuditModal from './components/AuditModal';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const handleOpenAudit = () => {
    setIsAuditModalOpen(true);
  };

  const handleCloseAudit = () => {
    setIsAuditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#001B1A] text-white flex flex-col selection:bg-[#ACD5D1] selection:text-[#001B1A]">
      {/* Sticky Glass Navbar */}
      <Navbar onOpenAudit={handleOpenAudit} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenAudit={handleOpenAudit} />
        <About />
        <Technology onOpenAudit={handleOpenAudit} />
        <Statistics />
        <CallToAction onOpenAudit={handleOpenAudit} />
        <Sustainability />
      </main>

      {/* Footer */}
      <Footer onOpenAudit={handleOpenAudit} />

      {/* Interactive Tech Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAudit}
      />
    </div>
  );
}
