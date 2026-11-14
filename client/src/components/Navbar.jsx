import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenAudit }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Philosophy & Platform', href: '#about' },
    { name: 'Autonomous Technology', href: '#technology' },
    { name: 'Net-Zero Commitment', href: '#sustainability' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#021312]/95 backdrop-blur-md border-b border-[#ACD5D1]/15 py-3.5 shadow-xl shadow-black/30'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand identity & living operational node indicator */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <img
              src="/assets/Asset-1.svg"
              alt="AGVERSE"
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </a>

          {/* Environmental node indicator */}
          <div className="hidden xl:flex items-center gap-2 pl-6 border-l border-[#ACD5D1]/15 text-xs text-[#96B1AC]">
            <span className="w-2 h-2 rounded-full bg-[#2CC56F] inline-block animate-pulse" />
            <span>Dubai HQ · MENA Agritech Grid Active</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#96B1AC] hover:text-[#ACD5D1] transition-colors duration-200 tracking-wide"
            >
              {link.name}
            </a>
          ))}

          {/* Action Button */}
          <button
            onClick={onOpenAudit}
            className="ag-btn-solid text-xs uppercase tracking-wider font-bold py-2.5 px-5 group"
          >
            <span>Request Tech Audit</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onOpenAudit}
            className="ag-btn-solid text-xs py-2 px-3.5 font-bold"
          >
            Audit
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#06201D] border border-[#ACD5D1]/20 text-[#ACD5D1] hover:bg-[#0A2B27]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#021312] border-b border-[#ACD5D1]/20 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs text-[#96B1AC] pb-3 border-b border-[#ACD5D1]/10">
              <span className="w-2 h-2 rounded-full bg-[#2CC56F] inline-block animate-pulse" />
              <span>MENA Agritech Grid Active</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#F3F7F6] hover:text-[#ACD5D1] py-2 border-b border-[#ACD5D1]/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAudit();
              }}
              className="ag-btn-solid w-full mt-3 py-3 font-semibold"
            >
              Request a Tech Audit For Your Farm
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
