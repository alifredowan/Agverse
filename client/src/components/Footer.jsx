import React from 'react';
import { Globe, ArrowUp } from 'lucide-react';

export default function Footer({ t, onOpenPrivacy, onOpenTerms }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.technology, href: '#technology' },
    { label: t.nav.sustainability, href: '#sustainability' },
    { label: t.nav.roi, href: '#roi' },
    { label: t.nav.proof, href: '#case-studies' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-[#0D1512] text-white/80 pt-16 pb-12 border-t border-white/10">
      <div className="section-container">
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          {/* Logo & Tagline (5 cols) */}
          <div className="md:col-span-5">
            <a
              href="#home"
              className="inline-flex items-center gap-2.5 mb-4 group"
              aria-label="AGverse Home"
            >
              <div className="w-8 h-8 rounded-full bg-[#0B3D2E] flex items-center justify-center p-1.5 border border-[#8BC34A]/40 shadow-sm">
                <svg
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
                </svg>
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                AG<span className="text-[#8BC34A]">verse</span>
              </span>
            </a>

            <p className="text-sm text-white/70 max-w-sm mb-4">
              {t.footer.tagline}
            </p>

            <div className="text-xs text-white/50">
              {t.footer.location}
            </div>
          </div>

          {/* Nav links (4 cols) */}
          <div className="md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#8BC34A] font-semibold mb-4">
              Navigation
            </div>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#8BC34A] transition-colors py-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Back to Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between">
            <div className="flex items-center gap-3 mb-6">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/agverse-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8BC34A] hover:text-[#0B3D2E] flex items-center justify-center transition-colors border border-white/10"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.4 9.74V9.93H5.06v8.57h2.8z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/agverse_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8BC34A] hover:text-[#0B3D2E] flex items-center justify-center transition-colors border border-white/10"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/agverse.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8BC34A] hover:text-[#0B3D2E] flex items-center justify-center transition-colors border border-white/10"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/agverse.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8BC34A] hover:text-[#0B3D2E] flex items-center justify-center transition-colors border border-white/10"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5c0-.988.243-1.49 1.348-1.49h2.652V2.14S15.426 2 13.926 2c-3.197 0-5.128 1.954-5.128 5.5v2.01H6v3.98h2.8v8.01z" />
                </svg>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-[#8BC34A] transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div>{t.footer.copyright}</div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              {t.footer.privacy}
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              {t.footer.terms}
            </button>
            <span>Dubai Silicon Oasis · UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
