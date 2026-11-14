import React from 'react';
import { MapPin } from 'lucide-react';

export default function Footer({ onOpenAudit }) {
  return (
    <footer className="relative bg-[#010D0C] border-t border-[#ACD5D1]/15 pt-16 pb-12 text-[#96B1AC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#ACD5D1]/10">
          {/* Logo & Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="inline-block transition-opacity hover:opacity-90">
              <img
                src="/assets/Asset-1.svg"
                alt="AGVERSE"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-[#96B1AC] max-w-md leading-relaxed">
              Global food producing operating system integrating artificial intelligence, robotics, drones, and precision data to establish zero-waste agriculture.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#ACD5D1] font-mono pt-2">
              <MapPin className="w-4 h-4 text-[#ACD5D1]" />
              <span>Dubai, UAE</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-mono mb-4">
              Platform
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#about" className="hover:text-[#ACD5D1] transition-colors">
                  Philosophy & About
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-[#ACD5D1] transition-colors">
                  Autonomous Technology
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-[#ACD5D1] transition-colors">
                  Sustainability Promise
                </a>
              </li>
            </ul>
          </div>

          {/* Action Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-mono mb-4">
              Evaluation
            </h4>
            <p className="text-xs text-[#96B1AC] leading-relaxed mb-4">
              Receive a comprehensive technological audit of your farm soil, topography, and irrigation infrastructure.
            </p>
            <button
              onClick={onOpenAudit}
              className="ag-btn-solid w-full text-xs py-3 font-bold uppercase tracking-wider"
            >
              Request a Tech Audit
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono">
          <p>© 2026 AGverse. All Rights Reserved.</p>

          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#06201D] border border-[#ACD5D1]/15 flex items-center justify-center text-[#ACD5D1] hover:bg-[#ACD5D1] hover:text-[#021312] transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 320 512">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#06201D] border border-[#ACD5D1]/15 flex items-center justify-center text-[#ACD5D1] hover:bg-[#ACD5D1] hover:text-[#021312] transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 512 512">
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#06201D] border border-[#ACD5D1]/15 flex items-center justify-center text-[#ACD5D1] hover:bg-[#ACD5D1] hover:text-[#021312] transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 448 512">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
