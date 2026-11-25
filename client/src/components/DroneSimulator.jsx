import React, { useState } from 'react';
import { safeLink } from './CmsMedia';
import { motion } from 'framer-motion';
import { Plane, Eye, Activity, MapPin, Zap } from 'lucide-react';

export default function DroneSimulator({ t }) {
  const [mode, setMode] = useState('ndvi'); // 'rgb' or 'ndvi'
  const [activeHotspot, setActiveHotspot] = useState(0);

  const hotspots = t.ndviDemo.hotspots;
  const active = hotspots.find((spot) => spot.id === activeHotspot) ?? hotspots[0];

  return (
    <section
      id="drone-sim"
      aria-label={t.ndviDemo.telemetryLabel}
      className="section-padding bg-[#14201B] text-white relative overflow-hidden"
    >
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8BC34A] mb-3">
            <Plane className="w-4 h-4 text-[#8BC34A]" />
            <span>{t.ndviDemo.title}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            {t.ndviDemo.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            {t.ndviDemo.subtitle}
          </p>
        </div>

        {/* Simulator Container */}
        <div className="rounded-2xl bg-[#0B251D] border border-white/10 p-4 sm:p-6 shadow-2xl relative">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8BC34A] animate-pulse" />
              <span className="text-xs font-mono text-[#8BC34A] uppercase tracking-wider">
                {t.ndviDemo.flightLabel}
              </span>
            </div>

            {/* Toggle Modes */}
            <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setMode('rgb')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  mode === 'rgb'
                    ? 'bg-[#8BC34A] text-[#0B3D2E]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.ndviDemo.modeRgb}</span>
              </button>
              <button
                onClick={() => setMode('ndvi')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  mode === 'ndvi'
                    ? 'bg-[#8BC34A] text-[#0B3D2E]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>{t.ndviDemo.modeNdvi}</span>
              </button>
            </div>
          </div>

          {/* Map Viewer Display */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-black/50 border border-white/10 select-none">
            {/* Aerial Photography Layer */}
            <img
              src={safeLink(t.ndviDemo.image)}
              alt={t.ndviDemo.alt}
              className={`w-full h-full object-cover transition-all duration-700 ${
                mode === 'ndvi' ? 'filter saturate-200 hue-rotate-60 contrast-125' : ''
              }`}
            />

            {/* NDVI False-Color Thermal / Chlorophyll Overlay */}
            {mode === 'ndvi' && (
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/30 via-lime-500/25 to-amber-500/25 mix-blend-color pointer-events-none" />
            )}

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Hotspots on Map */}
            {hotspots.map((spot, idx) => (
              <div
                key={spot.id}
                style={{ left: spot.x, top: spot.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                onClick={() => setActiveHotspot(idx)}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-[#8BC34A]/30 animate-ping" />
                  <span className="w-4 h-4 rounded-full bg-[#8BC34A] border-2 border-white shadow-lg flex items-center justify-center text-[9px] font-bold text-[#0B3D2E]">
                    {idx + 1}
                  </span>
                </div>
              </div>
            ))}

            {/* Active Telemetry Overlay Card */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-[#0B3D2E]/90 backdrop-blur-md p-4 rounded-xl border border-[#8BC34A]/40 shadow-2xl z-30">
              <div className="flex items-center justify-between text-xs text-[#8BC34A] font-mono mb-1">
                <span>{active?.label}</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#8BC34A]" /> AI Resolved
                </span>
              </div>
              <div className="text-sm font-bold text-white mb-1">
                {active?.reading}
              </div>
              <div className="text-xs text-white/80">
                {t.ndviDemo.actionLabel} {active?.action}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
