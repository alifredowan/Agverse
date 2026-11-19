import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, BarChart3, Zap, ArrowUpRight } from 'lucide-react';

function Counter({ targetValue, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(targetValue, 10);
    if (isNaN(end)) return;

    const totalSteps = 60;
    const stepTime = (duration * 1000) / totalSteps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeOut);
      setCount(current);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setCount(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetValue, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About({ t }) {
  const icons = [
    <Target className="w-6 h-6 text-[#8BC34A]" />,
    <BarChart3 className="w-6 h-6 text-[#8BC34A]" />,
    <Zap className="w-6 h-6 text-[#8BC34A]" />
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding bg-[#F5F1E8] dark:bg-[#0B3D2E] transition-colors duration-300"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-bold uppercase tracking-wider text-[#0B3D2E] dark:text-[#8BC34A] mb-3"
          >
            {t.about.title}
          </motion.div>
          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#14201B] dark:text-white tracking-tight leading-tight"
          >
            {t.about.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#14201B]/80 dark:text-white/80 leading-relaxed"
          >
            {t.about.subtitle}
          </motion.p>
        </div>

        {/* Content Grid: 3 Feature Cards + Highlight Stat Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 3 Feature Cards (8 Cols on Desktop) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.about.cards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="ag-card flex flex-col justify-between group bg-white dark:bg-[#14201B]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0B3D2E]/10 dark:bg-[#8BC34A]/10 flex items-center justify-center mb-6 border border-[#0B3D2E]/15 dark:border-[#8BC34A]/20 group-hover:scale-105 transition-transform">
                    {icons[idx]}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#14201B] dark:text-white mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#14201B]/70 dark:text-white/70 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-[#0B3D2E] dark:text-[#8BC34A]">
                  <span>Pillar 0{idx + 1}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Highlight Stat Beside Cards (4 Cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 rounded-2xl bg-[#0B3D2E] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl border border-[#8BC34A]/25"
          >
            {/* Background Accent Graphics */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#8BC34A]/10 blur-2xl pointer-events-none" />
            <div className="absolute top-4 right-4 text-xs font-mono uppercase tracking-widest text-[#8BC34A]/70 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              Benchmark
            </div>

            <div>
              <div className="text-xs uppercase font-semibold text-[#8BC34A] tracking-wider mb-4">
                Field Acceleration
              </div>
              <div className="flex items-baseline font-heading font-extrabold text-7xl sm:text-8xl text-white tracking-tighter">
                <Counter targetValue={10} duration={1.8} />
                <span className="text-[#8BC34A]">x</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15">
              <p className="text-base sm:text-lg font-medium text-white/90 leading-snug">
                {t.about.statLabel}
              </p>
              <p className="text-xs text-white/60 mt-2">
                Derived from closed-loop automated sensing vs traditional manual sampling cycles in desert pilots.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
