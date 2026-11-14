import React from 'react';
import { Flame, Droplets, Eye, Leaf } from 'lucide-react';

export default function Statistics() {
  const benchmarks = [
    {
      metric: '10x',
      title: 'Faster Simulation & Breeding',
      description: 'Faster Crop Simulation & Breeding.',
      subtext: 'Virtual climate stress testing reduces physical multi-year crop trials into weeks.',
      icon: Flame,
      color: 'text-[#E2C99A]'
    },
    {
      metric: 'ZERO',
      title: 'Waste Irrigation Systems',
      description: 'Waste Irrigation Systems.',
      subtext: 'Targeted sub-surface moisture delivery eliminates surface runoff and evaporative waste.',
      icon: Droplets,
      color: 'text-[#ACD5D1]'
    },
    {
      metric: '24/7',
      title: 'Autonomous Robotics Monitoring',
      description: 'Autonomous Robotics Monitoring.',
      subtext: 'Uninterrupted diurnal and nocturnal field inspection with solar battery reserves.',
      icon: Eye,
      color: 'text-white'
    },
    {
      metric: 'NET-ZERO',
      title: 'Carbon Goal for 2030',
      description: 'Carbon Goal for 2030.',
      subtext: 'Full transition to electric autonomous implements aligned with UAE Net Zero 2050.',
      icon: Leaf,
      color: 'text-[#2CC56F]'
    }
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-[#021312] border-t border-[#ACD5D1]/10 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            <span className="block font-manrope font-extrabold text-white">
              The AGverse Advantage
            </span>
            <span className="block font-marcellus font-normal text-[#ACD5D1]">
              by the Numbers
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#96B1AC] leading-relaxed">
            Quantifiable impact across yield velocity, water conservation, and resource circularity.
          </p>
        </div>

        {/* 4 Agronomic Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benchmarks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="ag-field-surface rounded-2xl p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0B2D29] border border-[#ACD5D1]/20 flex items-center justify-center text-[#ACD5D1] mb-6 group-hover:bg-[#ACD5D1] group-hover:text-[#021312] transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className={`text-4xl sm:text-5xl font-black font-manrope tracking-tight mb-2 ${item.color}`}>
                    {item.metric}
                  </div>

                  <h3 className="text-base font-bold text-white font-manrope mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#96B1AC] leading-relaxed">
                    {item.subtext}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#ACD5D1]/10 text-[11px] font-mono text-[#ACD5D1]">
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
