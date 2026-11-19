import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function Hero({ t, onSelectInterest }) {
  const handleAuditClick = () => {
    if (onSelectInterest) {
      onSelectInterest('Tech Audit');
    }
  };

  return (
    <section
      id="home"
      aria-label="Hero Section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B3D2E]"
    >
      {/* Background with Dark Green Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src="/images/hero-farm.jpg"
            alt="Cinematic aerial view of AGverse monitored agricultural land"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </motion.div>
        {/* Layered Gradient Overlay: Deep forest green to dark charcoal */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D2E]/90 via-[#0B3D2E]/75 to-[#14201B]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B3D2E]/40 to-[#06251C]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 section-container pt-32 pb-20 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#8BC34A]/40 text-[#8BC34A] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8BC34A]" />
          <span>{t.hero.eyebrow}</span>
        </motion.div>

        {/* H1 Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.1] max-w-4xl"
        >
          {t.hero.title}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl font-normal leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <a
            href="#contact"
            onClick={handleAuditClick}
            className="btn-primary w-full sm:w-auto gap-2 group text-base !py-4 !px-8 shadow-glow-lime"
          >
            <ShieldCheck className="w-5 h-5 text-[#0B3D2E]" />
            <span>{t.hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          {/* Secondary CTA */}
          <a
            href="#technology"
            className="btn-outline-white w-full sm:w-auto text-base !py-4 !px-8"
          >
            <span>{t.hero.secondaryCta}</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <a
          href="#about"
          className="flex flex-col items-center group focus:outline-none"
          aria-label={t.hero.scrollDown}
        >
          <span className="text-xs uppercase tracking-widest text-white/60 mb-1 group-hover:text-[#8BC34A] transition-colors">
            {t.hero.scrollDown}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5"
          >
            <ArrowDown className="w-4 h-4 text-[#8BC34A]" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
