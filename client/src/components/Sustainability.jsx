import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Droplets, ShieldCheck, Leaf } from 'lucide-react';

export default function Sustainability({ t }) {
  const icons = [
    <Sun className="w-7 h-7 text-[#0B3D2E] dark:text-[#8BC34A]" />,
    <Droplets className="w-7 h-7 text-[#0B3D2E] dark:text-[#8BC34A]" />,
    <ShieldCheck className="w-7 h-7 text-[#0B3D2E] dark:text-[#8BC34A]" />
  ];

  return (
    <section
      id="sustainability"
      aria-labelledby="sustainability-heading"
      className="section-padding bg-[#F5F1E8] dark:bg-[#06251C] transition-colors duration-300"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B3D2E] dark:text-[#8BC34A] mb-3"
          >
            <Leaf className="w-4 h-4 text-[#8BC34A]" />
            <span>{t.sustainability.title}</span>
          </motion.div>
          <motion.h2
            id="sustainability-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#14201B] dark:text-white tracking-tight leading-tight"
          >
            {t.sustainability.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#14201B]/80 dark:text-white/80 leading-relaxed"
          >
            {t.sustainability.subtitle}
          </motion.p>
        </div>

        {/* 3 Sustainability Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.sustainability.pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-[#0B3D2E] rounded-2xl p-8 border border-black/5 dark:border-white/10 shadow-soft dark:shadow-soft-dark flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#F5F1E8] dark:bg-[#135340] flex items-center justify-center mb-6 border border-black/5 dark:border-white/10">
                  {icons[idx]}
                </div>

                <h3 className="font-heading font-bold text-xl text-[#14201B] dark:text-white mb-3">
                  {pillar.title}
                </h3>

                <p className="text-sm font-semibold text-[#0B3D2E] dark:text-[#8BC34A] mb-1">
                  {pillar.description}
                </p>

                {pillar.note && (
                  <span className="inline-block text-xs font-mono text-[#14201B]/60 dark:text-white/60 mb-3 italic">
                    {pillar.note}
                  </span>
                )}

                {pillar.detail && (
                  <p className="text-xs text-[#14201B]/70 dark:text-white/70 leading-relaxed mt-2">
                    {pillar.detail}
                  </p>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/10 text-xs font-mono text-[#14201B]/50 dark:text-white/50 flex items-center justify-between">
                <span>Pillar 0{idx + 1}</span>
                <span>{t.sustainability.targetLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
