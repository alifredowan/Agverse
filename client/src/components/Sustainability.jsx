import React from 'react';
import { Leaf, Droplets, ShieldCheck } from 'lucide-react';

export default function Sustainability() {
  const pillars = [
    {
      title: 'Minimum Carbon Footprint',
      desc: 'Optimized logistics and solar-powered automation for sustainable operations.',
      metric: 'Bifacial Solar Grid',
      icon: Leaf
    },
    {
      title: 'Resource Conservation',
      desc: 'Reducing water and fertilizer usage by up to 90% through hyper-targeted application.',
      metric: 'Up to 90% Water Saved',
      icon: Droplets
    },
    {
      title: 'Climate Resilience',
      desc: 'Developing crops and systems that thrive in the toughest conditions on Earth.',
      metric: 'Arid Climate Calibrated',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="sustainability" className="relative py-28 sm:py-36 bg-[#031816] overflow-hidden">
      {/* Background imagery */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
        style={{ backgroundImage: "url('/assets/secrtion-2.jpeg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#031816] via-[#031816]/90 to-[#031816]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            <span className="block font-manrope font-extrabold text-white">
              Cultivating a
            </span>
            <span className="block font-marcellus font-normal text-[#ACD5D1]">
              Net-Zero Future.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#96B1AC] leading-relaxed">
            Efficiency and ecology are no longer at odds. AGverse is built on a “green-first” philosophy.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="ag-field-surface rounded-2xl p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#0B2D29] border border-[#ACD5D1]/20 flex items-center justify-center text-[#ACD5D1] group-hover:bg-[#ACD5D1] group-hover:text-[#021312] transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#2CC56F] border-b border-[#2CC56F]/20 pb-0.5">
                      {pillar.metric}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-manrope mb-3 group-hover:text-[#ACD5D1] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#96B1AC] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-[#ACD5D1]/10 text-xs text-[#96B1AC] font-mono">
                  Sustainability Promise
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
