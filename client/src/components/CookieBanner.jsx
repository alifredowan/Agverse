import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check } from 'lucide-react';

export default function CookieBanner({ onOpenPrivacy, content }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('agverse_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('agverse_cookie_consent', 'all');
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('agverse_cookie_consent', 'necessary');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#0B3D2E]/95 backdrop-blur-md text-white p-5 rounded-2xl border border-[#8BC34A]/30 shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#8BC34A]/20 flex items-center justify-center shrink-0 text-[#8BC34A]">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="font-heading font-bold text-sm text-white mb-1">
              {content.title}
            </div>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              {content.body}{' '}
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-[#8BC34A] underline hover:text-white"
              >
                {content.privacy}
              </button>.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="btn-primary text-xs !py-2 !px-4"
              >
                {content.acceptAll}
              </button>
              <button
                type="button"
                onClick={acceptNecessary}
                className="btn-outline-white text-xs !py-2 !px-3"
              >
                {content.essentialOnly}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
