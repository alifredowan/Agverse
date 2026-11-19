import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CheckCircle2, Cpu, Bot, Plane, Layers } from 'lucide-react';

export default function Technology({ t }) {
  const [activeModalItem, setActiveModalItem] = useState(null);

  const icons = [
    <Cpu className="w-5 h-5 text-[#8BC34A]" />,
    <Bot className="w-5 h-5 text-[#8BC34A]" />,
    <Plane className="w-5 h-5 text-[#8BC34A]" />
  ];

  return (
    <section
      id="technology"
      aria-labelledby="tech-heading"
      className="section-padding bg-[#14201B] text-white relative overflow-hidden"
    >
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#0B3D2E]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#8BC34A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#8BC34A] text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Layers className="w-3.5 h-3.5 text-[#8BC34A]" />
            <span>{t.technology.title}</span>
          </motion.div>
          <motion.h2
            id="tech-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight"
          >
            {t.technology.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            {t.technology.subtitle}
          </motion.p>
        </div>

        {/* 3 Alternating Image/Text Rows */}
        <div className="flex flex-col gap-24 lg:gap-32">
          {t.technology.items.map((item, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image Column (6 cols) */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-6 ${isReversed ? 'lg:col-start-7' : ''}`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group aspect-[4/3] bg-[#0E1713]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14201B]/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                      <span className="font-mono uppercase tracking-wider text-[#8BC34A]">
                        System Layer 0{index + 1}
                      </span>
                      <span>Verified UAE Field Spec</span>
                    </div>
                  </div>
                </motion.div>

                {/* Text Column (6 cols) */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isReversed ? 'lg:col-start-1' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    {icons[index]}
                  </div>

                  <span className="text-xs font-mono font-bold tracking-widest text-[#8BC34A] uppercase mb-2">
                    0{index + 1} · Architecture
                  </span>

                  <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight mb-4">
                    {item.title}
                  </h3>

                  <p className="text-base text-white/80 leading-relaxed mb-8">
                    {item.description}
                  </p>

                  <div>
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#8BC34A] hover:text-[#9CCC65] transition-all group py-1 border-b border-[#8BC34A]/40 hover:border-[#8BC34A]"
                    >
                      <span>{t.technology.learnMore}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technology Detail Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="relative w-full max-w-lg bg-[#0B3D2E] text-white rounded-2xl p-6 sm:p-8 border border-[#8BC34A]/30 shadow-2xl z-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase text-[#8BC34A] tracking-wider">
                    {t.technology.modalTitle}
                  </span>
                  <h4 id="modal-title" className="font-heading font-bold text-xl sm:text-2xl text-white mt-1">
                    {activeModalItem.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label={t.technology.modalClose}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 3 Detailed Technical Bullets */}
              <div className="py-6 flex flex-col gap-4">
                {activeModalItem.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 bg-white/5 p-3.5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-[#8BC34A] shrink-0 mt-0.5" />
                    <p className="text-sm text-white/90 leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="btn-primary text-xs !py-2.5 !px-6"
                >
                  {t.technology.modalClose}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
