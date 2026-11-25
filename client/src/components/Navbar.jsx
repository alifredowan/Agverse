import { safeLink } from './CmsMedia';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, Moon, Sun, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ lang, setLang, t, isDark, setIsDark, onOpenAudit, solid, children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const navLinks = t.nav.links;

  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#8BC34A] text-[#0B3D2E] font-bold rounded-lg shadow-lg"
      >
        {t.nav.skipToContent}
      </a>

      <header
        className={`${children ? 'sticky' : 'fixed'} top-0 inset-x-0 z-40 transition-colors duration-300 ${
          children
            ? 'bg-[#0B3D2E] dark:bg-[#06251C]'
            : isScrolled || solid
              ? 'bg-[#0B3D2E]/90 dark:bg-[#06251C]/95 backdrop-blur-md shadow-lg border-b border-white/10'
              : 'bg-transparent'
        }`}
      >
        <div className={`section-container flex items-center justify-between gap-3 ${children || isScrolled || solid ? 'py-3.5' : 'py-5 sm:py-6'}`}>
          {/* Logo */}
          <a
            href={t.homeHref}
            className="flex shrink-0 items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-[#8BC34A] rounded-full px-2 py-1"
            aria-label={t.brand}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0B3D2E] to-[#135340] dark:from-[#135340] dark:to-[#8BC34A] flex items-center justify-center p-1.5 border border-[#8BC34A]/40 shadow-sm transition-transform group-hover:scale-105">
              {safeLink(t.logo) ? <img src={safeLink(t.logo)} alt={t.logoAlt} className="w-full h-full object-contain" /> : <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-[#8BC34A]"
              >
                <circle cx="20" cy="20" r="18" stroke="#8BC34A" strokeWidth="2.5" strokeDasharray="3 3" />
                <path
                  d="M12 28C14 20 20 13 28 12C28 20 22 27 12 28Z"
                  fill="#8BC34A"
                  fillOpacity="0.85"
                />
                <path
                  d="M14 26C18 24 23 20 26 14"
                  stroke="#0B3D2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>}
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center">
                {t.brand === "AGverse" ? <>AG<span className="text-[#8BC34A]">verse</span></> : t.brand}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap lg:flex xl:gap-4 2xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={safeLink(link.href?.startsWith("#") && t.homeHref.startsWith("/") ? "/" + link.href : link.href)}
                className="text-sm font-medium text-white/80 hover:text-[#8BC34A] transition-colors focus-visible:ring-1 focus-visible:ring-[#8BC34A] rounded px-1.5 py-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-2 whitespace-nowrap lg:flex xl:gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
              aria-label="Toggle language between English and Arabic"
            >
              <Globe className="w-3.5 h-3.5 text-[#8BC34A]" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle dark and light theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#8BC34A]" /> : <Moon className="w-4 h-4 text-[#8BC34A]" />}
            </button>

            {/* Contact Us CTA Button */}
            <a
              href={t.homeHref.startsWith("/") ? "/#contact" : "#contact"}
              className="btn-primary text-xs !py-2.5 !px-5 gap-1.5"
            >
              <span>{t.nav.contact}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20"
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'العربية' : 'EN'}
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#8BC34A]" /> : <Moon className="w-4 h-4 text-[#8BC34A]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#8BC34A]"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        {children}
      </header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 bottom-0 ${
                lang === 'ar' ? 'left-0' : 'right-0'
              } w-4/5 max-w-sm z-50 bg-[#0B3D2E] text-white p-6 shadow-2xl flex flex-col justify-between border-l border-white/10 lg:hidden`}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="font-heading font-bold text-xl text-white flex items-center gap-2">
                    {t.brand === "AGverse" ? <>AG<span className="text-[#8BC34A]">verse</span></> : t.brand}
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="mt-8 flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={safeLink(link.href?.startsWith("#") && t.homeHref.startsWith("/") ? "/" + link.href : link.href)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-white/90 hover:text-[#8BC34A] transition-colors py-1"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={t.homeHref.startsWith("/") ? "/#contact" : "#contact"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  {t.nav.contact}
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAudit) onOpenAudit();
                  }}
                  className="btn-outline-white w-full text-center text-xs py-2.5"
                >
                  <ShieldCheck className="w-4 h-4 mr-1 inline" />
                  {t.nav.techAudit}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
