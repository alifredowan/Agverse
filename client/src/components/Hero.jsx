import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Activity, Cpu, Droplet, Radio } from 'lucide-react';

export default function Hero({ onOpenAudit }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTelemetry, setActiveTelemetry] = useState(0);

  // Parallax tracking on the agricultural landscape
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const telemetryFeed = [
    {
      title: 'Subsurface Irrigation Telemetry',
      value: '99.4%',
      label: 'Evaporation Loss Reduced',
      status: 'Optimal Flow',
      icon: Droplet
    },
    {
      title: 'Multispectral Canopy Scan',
      value: '3,840 ha',
      label: 'Mapped with Drone Fleet',
      status: 'Live Airborne Feed',
      icon: Radio
    },
    {
      title: 'Neural Soil Optimization',
      value: '10x Speed',
      label: 'Crop Simulation Cycle',
      status: 'Model Trained on Arid Strata',
      icon: Cpu
    }
  ];

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-28 pb-20 bg-topo-subtle">
      {/* Background with restrained agricultural depth */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105"
        style={{
          backgroundImage: "url('/assets/banner-img.jpeg')",
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#021312] via-[#021312]/85 to-[#021312]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021312] via-transparent to-[#021312]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              <span className="block font-manrope font-extrabold text-white">
                The Intelligence
              </span>
              <span className="block font-marcellus font-normal text-[#ACD5D1] mt-1">
                of the Earth.
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#D4EBE9] max-w-2xl leading-snug">
              The future of Global food producing operating system.
            </p>

            <p className="text-base text-[#96B1AC] max-w-xl leading-relaxed">
              AGverse integrates AI, robotics, drones and data-driven precision to build world’s most efficient, Compliant, zero waste food production ecosystem.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenAudit}
                className="ag-btn-solid text-sm font-bold uppercase tracking-wider px-8 py-4 group"
              >
                <span>Request a Tech Audit For Your Farm</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <a
                href="#technology"
                className="ag-btn-ghost text-sm font-medium px-6 py-4"
              >
                Explore Technology
              </a>
            </div>
          </div>

          {/* Right Column: Agronomic Telemetry Panel */}
          <div className="lg:col-span-5">
            <div className="ag-field-surface rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between pb-4 border-b border-[#ACD5D1]/15">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#2CC56F]" />
                  <span className="text-xs uppercase tracking-widest text-[#F3F7F6] font-semibold">
                    Live Field Operations Grid
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#96B1AC] bg-[#021312] px-2.5 py-1 rounded border border-[#ACD5D1]/15">
                  LAT 25.2°N
                </span>
              </div>

              {/* Dynamic Telemetry Slices */}
              <div className="space-y-3">
                {telemetryFeed.map((feed, idx) => {
                  const Icon = feed.icon;
                  const isCurrent = activeTelemetry === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveTelemetry(idx)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                        isCurrent
                          ? 'bg-[#0B2D29] border-[#ACD5D1]/40 text-white'
                          : 'bg-[#021312]/60 border-[#ACD5D1]/10 text-[#96B1AC] hover:border-[#ACD5D1]/25'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#ACD5D1]' : 'text-[#96B1AC]'}`} />
                          <span className="text-xs font-semibold tracking-wide text-white">
                            {feed.title}
                          </span>
                        </div>
                        <span className="text-lg font-bold font-manrope text-[#ACD5D1]">
                          {feed.value}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-[11px]">
                        <span>{feed.label}</span>
                        <span className="text-[#2CC56F] font-mono">{feed.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Callout */}
              <div className="pt-2 text-xs text-[#96B1AC] flex items-center justify-between">
                <span>Autonomous Robotics Fleet Active</span>
                <span className="text-white font-semibold">24 / 7 Solar Cycle</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2.5 rounded-full bg-[#06201D] border border-[#ACD5D1]/20 text-[#ACD5D1] hover:text-white transition-colors duration-200 hover:translate-y-1"
        aria-label="Navigate to About section"
      >
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
}
