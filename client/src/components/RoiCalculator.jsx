import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Droplets, Clock, TrendingUp, DollarSign } from 'lucide-react';

export default function RoiCalculator({ t, onSelectInterest }) {
  const [hectares, setHectares] = useState(50);
  const [cropType, setCropType] = useState('dates');
  const [waterCost, setWaterCost] = useState(120000);
  const farmAreaInputId = useId();
  const cropCategoryInputId = useId();

  // Dynamic calculations based on inputs
  const cropMultipliers = {
    dates: { waterSavingPct: 0.82, laborHoursPerHa: 42, yieldGain: 24, paybackMonths: 13 },
    greenhouse: { waterSavingPct: 0.90, laborHoursPerHa: 85, yieldGain: 34, paybackMonths: 10 },
    citrus: { waterSavingPct: 0.78, laborHoursPerHa: 36, yieldGain: 22, paybackMonths: 15 },
    fodder: { waterSavingPct: 0.85, laborHoursPerHa: 28, yieldGain: 19, paybackMonths: 14 },
  };

  const selectedCrop = cropMultipliers[cropType] || cropMultipliers.dates;
  const estimatedWaterSavedAED = Math.round(waterCost * selectedCrop.waterSavingPct);
  const estimatedWaterVolumeLiters = Math.round(hectares * 18500 * (selectedCrop.waterSavingPct * 100));
  const automatedLaborHours = Math.round(hectares * selectedCrop.laborHoursPerHa);
  const projectedYieldGain = selectedCrop.yieldGain;
  const paybackPeriod = selectedCrop.paybackMonths;

  const handleCta = () => {
    if (onSelectInterest) {
      onSelectInterest('Tech Audit');
    }
  };

  return (
    <section
      id="roi"
      aria-labelledby="roi-heading"
      className="section-padding bg-sand-light dark:bg-[#0B3D2E]/90 transition-colors duration-300"
    >
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B3D2E] dark:text-[#8BC34A] mb-3">
            <Calculator className="w-4 h-4 text-[#8BC34A]" />
            <span>{t.roi.title}</span>
          </div>
          <h2
            id="roi-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#14201B] dark:text-white tracking-tight"
          >
            {t.roi.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#14201B]/80 dark:text-white/80">
            {t.roi.subtitle}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#14201B] p-6 sm:p-8 rounded-2xl border border-black/5 dark:border-white/10 shadow-soft">
            <h3 className="font-heading font-bold text-xl text-[#14201B] dark:text-white mb-6">
              Farm Parameters
            </h3>

            {/* Farm Area Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={farmAreaInputId} className="text-xs font-semibold uppercase tracking-wider text-[#14201B]/70 dark:text-white/70">
                  {t.roi.farmSize}
                </label>
                <span className="font-mono font-bold text-base text-[#0B3D2E] dark:text-[#8BC34A]">
                  {hectares} ha
                </span>
              </div>
              <input
                id={farmAreaInputId}
                type="range"
                min="10"
                max="500"
                step="5"
                value={hectares}
                onChange={(e) => setHectares(Number(e.target.value))}
                aria-label={t.roi.farmSize}
                className="w-full accent-[#8BC34A] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#14201B]/50 dark:text-white/50 mt-1">
                <span>10 ha (Pilot)</span>
                <span>250 ha</span>
                <span>500+ ha (Commercial)</span>
              </div>
            </div>

            {/* Crop Category Selector */}
            <div className="mb-6">
              <label htmlFor={cropCategoryInputId} className="block text-xs font-semibold uppercase tracking-wider text-[#14201B]/70 dark:text-white/70 mb-2">
                {t.roi.cropType}
              </label>
              <select
                id={cropCategoryInputId}
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                aria-label={t.roi.cropType}
                className="w-full px-4 py-3 rounded-xl bg-sand-light dark:bg-[#0B3D2E] text-[#14201B] dark:text-white border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
              >
                <option value="dates">{t.roi.crops.dates}</option>
                <option value="greenhouse">{t.roi.crops.greenhouse}</option>
                <option value="citrus">{t.roi.crops.citrus}</option>
                <option value="fodder">{t.roi.crops.fodder}</option>
              </select>
            </div>

            {/* Annual Water Spend Estimate */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="water-cost-input" className="text-xs font-semibold uppercase tracking-wider text-[#14201B]/70 dark:text-white/70">
                  {t.roi.waterCost}
                </label>
                <span className="font-mono font-bold text-base text-[#0B3D2E] dark:text-[#8BC34A]">
                  AED {waterCost.toLocaleString()}
                </span>
              </div>
              <input
                id="water-cost-input"
                type="range"
                min="20000"
                max="500000"
                step="10000"
                value={waterCost}
                onChange={(e) => setWaterCost(Number(e.target.value))}
                aria-label={t.roi.waterCost}
                className="w-full accent-[#8BC34A] cursor-pointer"
              />
            </div>
          </div>

          {/* Results Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#0B3D2E] text-white p-6 sm:p-8 rounded-2xl border border-[#8BC34A]/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8BC34A]">
                  Live Yield & Savings Projections
                </span>
                <span className="text-xs text-white/60">Based on pilot data</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Result 1: Water Saved */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-[#8BC34A] mb-1">
                    <Droplets className="w-4 h-4" />
                    <span>{t.roi.results.waterSaved}</span>
                  </div>
                  <div className="font-heading font-extrabold text-2xl text-white">
                    AED {estimatedWaterSavedAED.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-white/60">
                    ~{(estimatedWaterVolumeLiters / 1000000).toFixed(1)}M liters saved / yr
                  </span>
                </div>

                {/* Result 2: Labor Hours Saved */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-[#8BC34A] mb-1">
                    <Clock className="w-4 h-4" />
                    <span>{t.roi.results.laborSaved}</span>
                  </div>
                  <div className="font-heading font-extrabold text-2xl text-white">
                    {automatedLaborHours.toLocaleString()} hrs
                  </div>
                  <span className="text-[11px] text-white/60">
                    Autonomous laser weeding & scouting
                  </span>
                </div>

                {/* Result 3: Yield Gain */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-[#8BC34A] mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{t.roi.results.yieldGain}</span>
                  </div>
                  <div className="font-heading font-extrabold text-2xl text-[#8BC34A]">
                    +{projectedYieldGain}%
                  </div>
                  <span className="text-[11px] text-white/60">
                    Higher grade harvest classification
                  </span>
                </div>

                {/* Result 4: Payback Period */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-[#8BC34A] mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{t.roi.results.payback}</span>
                  </div>
                  <div className="font-heading font-extrabold text-2xl text-white">
                    ~{paybackPeriod} Months
                  </div>
                  <span className="text-[11px] text-white/60">
                    Fast capital amortization
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/70 max-w-sm">
                Projections calibrated against UAE pilot conditions and regional electricity/water tariffs.
              </p>
              <a
                href="#contact"
                onClick={handleCta}
                className="btn-primary w-full sm:w-auto text-xs !py-3 !px-6 gap-2"
              >
                <span>{t.roi.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
