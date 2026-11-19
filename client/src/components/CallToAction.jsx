import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function CallToAction({ t, onSelectInterest }) {
  const handleClick = () => {
    if (onSelectInterest) {
      onSelectInterest('Tech Audit');
    }
  };

  return (
    <section
      aria-label="Call to Action"
      className="py-20 sm:py-24 bg-gradient-to-r from-[#0B3D2E] via-[#0E4434] to-[#0B3D2E] text-white relative overflow-hidden"
    >
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#8BC34A_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#8BC34A]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#8BC34A]/20 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight"
        >
          {t.ctaBanner.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-base sm:text-xl text-white/80 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          {t.ctaBanner.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={handleClick}
            className="btn-primary text-base !py-4 !px-9 gap-2 group shadow-glow-lime"
          >
            <ShieldCheck className="w-5 h-5 text-[#0B3D2E]" />
            <span>{t.ctaBanner.button}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
