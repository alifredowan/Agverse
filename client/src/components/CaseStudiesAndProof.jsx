import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ShieldCheck, ExternalLink } from 'lucide-react';

export default function CaseStudiesAndProof({ t }) {
  const certifications = t.caseStudies.certifications;

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="section-padding bg-[#F5F1E8] dark:bg-[#0B3D2E] transition-colors duration-300"
    >
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B3D2E] dark:text-[#8BC34A] mb-3">
            <Award className="w-4 h-4 text-[#8BC34A]" />
            <span>{t.caseStudies.title}</span>
          </div>
          <h2
            id="case-studies-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#14201B] dark:text-white tracking-tight"
          >
            {t.caseStudies.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#14201B]/80 dark:text-white/80">
            {t.caseStudies.subtitle}
          </p>
        </div>

        {/* 2 Pilot Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {t.caseStudies.items.map((pilot, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#14201B] rounded-2xl p-8 border border-black/5 dark:border-white/10 shadow-soft flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#0B3D2E] dark:text-[#8BC34A] font-semibold">
                    UAE Commercial Trial 0{idx + 1}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#8BC34A]/20 text-[#0B3D2E] dark:text-[#8BC34A]">
                    {t.caseStudies.verified}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl text-[#14201B] dark:text-white mb-2">
                  {pilot.farm}
                </h3>

                <div className="font-heading font-extrabold text-4xl text-[#0B3D2E] dark:text-[#8BC34A] my-4">
                  {pilot.metric}
                </div>

                <p className="text-sm text-[#14201B]/70 dark:text-white/70 leading-relaxed">
                  {pilot.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 flex items-center gap-2 text-xs text-[#0B3D2E] dark:text-[#8BC34A] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.caseStudies.evidence}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications and Compliance Banner */}
        <div className="bg-sand-surface dark:bg-[#06251C] rounded-2xl p-6 sm:p-8 border border-black/5 dark:border-white/10">
          <div className="text-xs font-mono uppercase tracking-wider text-[#14201B]/60 dark:text-white/60 mb-6 text-center font-semibold">
            {t.caseStudies.standards}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#8BC34A]/10 flex items-center justify-center mb-3">
                  <CheckCircle className="w-5 h-5 text-[#8BC34A]" />
                </div>
                <div className="font-heading font-bold text-sm text-[#14201B] dark:text-white mb-1">
                  {cert.label}
                </div>
                <span className="text-[11px] text-[#14201B]/60 dark:text-white/60">
                  {cert.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
