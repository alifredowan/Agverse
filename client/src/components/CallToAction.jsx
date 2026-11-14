import React from 'react';
import { ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export default function CallToAction({ onOpenAudit }) {
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background imagery */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/Guess.jpeg')" }}
      >
        <div className="absolute inset-0 bg-[#021312]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021312] via-transparent to-[#021312]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          <span className="block font-manrope font-extrabold text-white">
            Stop Guessing.
          </span>
          <span className="block font-marcellus font-normal text-[#ACD5D1] mt-1">
            Start Growing with 100% Certainty.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-[#D4EBE9] max-w-2xl leading-relaxed mb-10 font-normal">
          Don’t let climate volatility dictate your harvest. Bring the AGverse Mega-Platform to your land and watch your efficiency skyrocket.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onOpenAudit}
            className="ag-btn-solid text-sm font-bold uppercase tracking-wider px-9 py-4 group"
          >
            <span>Request a Tech Audit For Your Farm</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Reassurance points */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-[#96B1AC] font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2CC56F]" />
            <span>Complimentary Engineering Assessment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#ACD5D1]" />
            <span>Direct Site Visit by UAE Agronomists</span>
          </div>
        </div>
      </div>
    </section>
  );
}
