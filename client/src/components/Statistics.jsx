import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ endValue, duration = 2 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(endValue, 10);
    if (isNaN(end)) return;

    const totalSteps = 60;
    const stepTime = (duration * 1000) / totalSteps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeOut);
      setValue(current);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setValue(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, endValue, duration]);

  return <span ref={ref}>{value}</span>;
}

export default function Statistics({ t }) {
  const stats = t.stats.items;

  return (
    <section
      aria-label="Key Performance Indicators"
      className="py-16 bg-[#0B3D2E] text-white border-y border-white/10 relative overflow-hidden"
    >
      {/* Background glow lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          {/* Stat 1: 10x */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center p-4"
          >
            <div className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-2 flex items-baseline">
              <AnimatedCounter endValue={stats[0].value} duration={1.6} />
              <span className="text-[#8BC34A]">{stats[0].suffix}</span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 max-w-[200px] leading-snug">
              {stats[0].label}
            </p>
          </motion.div>

          {/* Stat 2: Zero (Waste irrigation) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center p-4"
          >
            <div className="font-heading font-extrabold text-4xl sm:text-6xl text-[#8BC34A] tracking-tight mb-2">
              {stats[1].display || 'Zero'}
            </div>
            <p className="text-xs sm:text-sm text-white/80 max-w-[200px] leading-snug">
              {stats[1].label}
            </p>
          </motion.div>

          {/* Stat 3: 24/7 (Autonomous Monitoring) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center p-4"
          >
            <div className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-2">
              {stats[2].display || '24/7'}
            </div>
            <p className="text-xs sm:text-sm text-white/80 max-w-[200px] leading-snug">
              {stats[2].label}
            </p>
          </motion.div>

          {/* Stat 4: 2030 (Net-zero target) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center p-4"
          >
            <div className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-2">
              <AnimatedCounter endValue={stats[3].value} duration={2} />
            </div>
            <p className="text-xs sm:text-sm text-white/80 max-w-[200px] leading-snug">
              {stats[3].label}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
