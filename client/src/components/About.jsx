import React, { useState, useEffect, useRef } from 'react';
import { Target, Brain, TrendingUp, Compass, Check } from 'lucide-react';

export default function About() {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = 10;
          const duration = 1600;
          const stepTime = Math.floor(duration / end);
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const pillars = [
    {
      icon: Target,
      tag: 'Closed-Loop Sensing',
      title: 'Precision Farming',
      desc: 'Every seed is monitored. Every drop of water is calculated.',
      metric: 'Single-seed granularity'
    },
    {
      icon: Brain,
      tag: 'Predictive Agronomy',
      title: 'Data-Driven Decisions',
      desc: 'Our AI predicts the future of the harvest before the first sprout appears.',
      metric: 'Sub-soil moisture telemetry'
    },
    {
      icon: TrendingUp,
      tag: 'Ecosystem Scaling',
      title: 'Maximum Efficiency',
      desc: 'Scaling food production at 10x the traditional speed.',
      metric: '10x growth acceleration'
    }
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36 bg-[#021312] border-t border-[#ACD5D1]/10 overflow-hidden">
      {/* Background imagery with subtle organic texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
        style={{ backgroundImage: "url('/assets/about-img.jpeg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#021312] via-[#021312]/90 to-[#021312]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Heading without generic kicker badge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20 items-end">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              <span className="block font-manrope font-extrabold text-white">
                One Platform.
              </span>
              <span className="block font-marcellus font-normal text-[#ACD5D1]">
                Infinite Growth.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-[#96B1AC] leading-relaxed">
              AGverse is more than a farm; it is a mega-platform. We bridge the gap between advanced technology and nature to solve the global food crisis. By combining real-time data with autonomous hardware, we ensure maximum yield with minimum environmental impact.
            </p>
          </div>
        </div>

        {/* Asymmetric Triad Layout - Breaking the 3 identical cards rut */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="ag-field-surface rounded-2xl p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#0B2D29] border border-[#ACD5D1]/25 flex items-center justify-center text-[#ACD5D1] group-hover:bg-[#ACD5D1] group-hover:text-[#021312] transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#96B1AC] border-b border-[#ACD5D1]/20 pb-0.5">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ACD5D1] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#96B1AC] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-[#ACD5D1]/10 flex items-center gap-2 text-xs text-[#ACD5D1] font-mono">
                  <Check className="w-3.5 h-3.5 text-[#2CC56F]" />
                  <span>{item.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integrated Agronomic Benchmark Instrument */}
        <div
          ref={counterRef}
          className="rounded-2xl bg-[#06201D] border border-[#ACD5D1]/25 p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 text-center lg:text-left flex items-baseline justify-center lg:justify-start gap-2">
              <span className="text-7xl sm:text-8xl lg:text-9xl font-black font-manrope text-[#ACD5D1] tracking-tight">
                {count}
              </span>
              <span className="text-4xl sm:text-5xl font-marcellus text-white">x</span>
            </div>

            <div className="lg:col-span-7 space-y-2 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-manrope">
                Faster than traditional farming methods
              </h3>
              <p className="text-sm sm:text-base text-[#96B1AC] max-w-xl leading-relaxed">
                Autonomous robotic field orchestration and real-time AI simulations compress crop testing and production cycles from seasonal cycles into continuous automated flows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
