import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqAccordion({ t }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section-padding bg-[#F5F1E8] dark:bg-[#06251C] transition-colors duration-300"
    >
      <div className="section-container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B3D2E] dark:text-[#8BC34A] mb-3">
            <HelpCircle className="w-4 h-4 text-[#8BC34A]" />
            <span>{t.faq.title}</span>
          </div>
          <h2
            id="faq-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#14201B] dark:text-white tracking-tight"
          >
            {t.faq.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#14201B]/80 dark:text-white/80">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0B3D2E] rounded-2xl border border-black/5 dark:border-white/10 shadow-soft overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 focus-visible:ring-2 focus-visible:ring-[#8BC34A]"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-[#14201B] dark:text-white">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#F5F1E8] dark:bg-[#135340] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#8BC34A] dark:bg-[#8BC34A] text-[#0B3D2E]' : 'text-[#0B3D2E] dark:text-white'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-2 text-sm text-[#14201B]/80 dark:text-white/80 leading-relaxed border-t border-black/5 dark:border-white/10">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
