import React, { useState } from 'react';
import { Cpu, Bot, Radio, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function Technology({ onOpenAudit }) {
  const [activeTab, setActiveTab] = useState(0);

  const technologies = [
    {
      id: 'ai-brain',
      role: 'The “Brain” of AGverse',
      title: 'AI & Machine Learning',
      description: 'Our algorithms analyze soil, weather, and crop health to optimize growth cycles instantly.',
      image: '/assets/AI-brain.jpeg',
      icon: Cpu,
      specs: [
        { label: 'Analytical Engine', value: 'Multi-layer Agronomic Neural Net' },
        { label: 'Input Channels', value: 'Soil Moisture, NPK Levels, Evapotranspiration' },
        { label: 'Decision Latency', value: '< 240ms Subsurface Valve Modulation' }
      ]
    },
    {
      id: 'robotics',
      role: 'The “Hands” of the operation.',
      title: 'Autonomous Robotics',
      description: 'Sleek, solar-powered robots handle planting, weeding, and harvesting with 100% precision.',
      image: '/assets/AI-brain-2.jpeg',
      icon: Bot,
      specs: [
        { label: 'Power Architecture', value: 'High-Efficiency Bifacial Solar Array' },
        { label: 'Navigation Accuracy', value: 'RTK-GNSS with Millimeter Real-Time Correction' },
        { label: 'Operational Window', value: 'Continuous 24/7 Day/Night Cultivation' }
      ]
    },
    {
      id: 'drones',
      role: 'The “Eyes” in the sky',
      title: 'Advanced Drone Fleet',
      description: 'Multi-spectral sensors map thousands of hectares in minutes, identifying issues before they become problems.',
      image: '/assets/AI-brain-3.jpeg',
      icon: Radio,
      specs: [
        { label: 'Sensor Suite', value: '5-Band Multispectral + Thermal Infrared' },
        { label: 'Daily Survey Scope', value: 'Up to 5,000 Hectares per Squadron' },
        { label: 'Anomaly Detection', value: 'Early Canopy Stress, Water Deficit, Chlorophyll Drop' }
      ]
    }
  ];

  const current = technologies[activeTab];
  const CurrentIcon = current.icon;

  return (
    <section id="technology" className="relative py-28 sm:py-36 bg-[#041A18] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            <span className="block font-manrope font-extrabold text-white">
              Hardware Meets
            </span>
            <span className="block font-marcellus font-normal text-[#ACD5D1]">
              Infinite Growth.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#96B1AC] leading-relaxed">
            We deploy the world’s most advanced technologies to the field.
          </p>
        </div>

        {/* Interactive Master-Detail Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Controls (Brain, Hands, Eyes) */}
          <div className="lg:col-span-4 space-y-3">
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              const isSelected = activeTab === idx;
              return (
                <button
                  key={tech.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#06201D] border-[#ACD5D1] shadow-xl'
                      : 'bg-[#021312]/60 border-[#ACD5D1]/15 hover:border-[#ACD5D1]/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#ACD5D1] text-[#021312]' : 'bg-[#0B2D29] text-[#ACD5D1]'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#96B1AC] uppercase tracking-wider mb-0.5">
                        {tech.role}
                      </div>
                      <div className="text-lg font-bold text-white font-manrope">
                        {tech.title}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${
                    isSelected ? 'text-[#ACD5D1] translate-x-1' : 'text-[#96B1AC] opacity-40'
                  }`} />
                </button>
              );
            })}

            {/* Quick action card */}
            <div className="p-6 rounded-2xl bg-[#0B2D29]/60 border border-[#ACD5D1]/20 mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">Deploy for Your Land</h4>
              <p className="text-xs text-[#96B1AC] mb-4 leading-relaxed">
                Experience precision robotics and autonomous mapping customized for your exact climate and crop varieties.
              </p>
              <button
                onClick={onOpenAudit}
                className="ag-btn-solid w-full text-xs py-2.5 font-bold uppercase tracking-wider"
              >
                Request a Tech Audit
              </button>
            </div>
          </div>

          {/* Active Blueprint & Live Visual Plate */}
          <div className="lg:col-span-8">
            <div className="ag-field-surface rounded-2xl overflow-hidden border border-[#ACD5D1]/30 shadow-2xl">
              {/* High-res authentic image viewport */}
              <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06201D] via-transparent to-transparent" />
                
                {/* Active Role Floating Tag */}
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#021312]/85 backdrop-blur-md border border-[#ACD5D1]/30 text-xs font-mono text-[#ACD5D1]">
                  <CurrentIcon className="w-3.5 h-3.5 text-[#ACD5D1]" />
                  <span>{current.role}</span>
                </div>
              </div>

              {/* Technical Description & Specs */}
              <div className="p-8 sm:p-10 space-y-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-manrope mb-3">
                    {current.title}
                  </h3>
                  <p className="text-base text-[#96B1AC] leading-relaxed max-w-2xl">
                    {current.description}
                  </p>
                </div>

                {/* Engineering Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#ACD5D1]/15">
                  {current.specs.map((spec, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#021312]/70 border border-[#ACD5D1]/10">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#96B1AC] mb-1">
                        {spec.label}
                      </div>
                      <div className="text-sm font-semibold text-white font-manrope">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
