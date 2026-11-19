import React from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0B3D2E] text-white rounded-2xl p-6 sm:p-8 border border-[#8BC34A]/30 shadow-2xl z-10 max-h-[85vh] flex flex-col"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8BC34A]" />
            <h3 className="font-heading font-bold text-xl text-white">
              {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms of Service & Farm SLA'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto py-6 space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed pr-2">
          {isPrivacy ? (
            <>
              <p>
                <strong>1. Compliance Framework:</strong> AGverse adheres strictly to UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (PDPL) as well as the General Data Protection Regulation (GDPR).
              </p>
              <p>
                <strong>2. Agricultural Telemetry:</strong> All soil composition data, drone multispectral orthomosaics, and irrigation consumption metrics captured from client farms remain the exclusive property of the landowner.
              </p>
              <p>
                <strong>3. Information We Collect:</strong> We collect contact details provided via our audit request forms, technical inquiries, and automated IoT sensor heartbeats.
              </p>
              <p>
                <strong>4. Security & Encryption:</strong> All data transmitted between field rovers, docking hives, and the AGverse cloud engine is secured using AES-256 encryption.
              </p>
              <p>
                <strong>5. Inquiries:</strong> For inquiries regarding your farm data or erasure requests, contact privacy@agverse.ae.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Scope of Service:</strong> AGverse provides autonomous agricultural telemetry, robotic weed management, and predictive yield analytics.
              </p>
              <p>
                <strong>2. Airspace & UAE GCAA Compliance:</strong> All drone scout operations are performed in full accordance with UAE General Civil Aviation Authority (GCAA) regulations and licensed local airspace parameters.
              </p>
              <p>
                <strong>3. Hardware Reliability & SLAs:</strong> AGverse guarantees a 99.4% uptime for deployed field hives and automated subsurface irrigation controllers.
              </p>
              <p>
                <strong>4. Intellectual Property:</strong> The AGverse neural agronomy models, hardware end-effectors, and platform interfaces are proprietary trade secrets of AGverse Ltd. (Dubai, UAE).
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="btn-primary text-xs !py-2.5 !px-6"
          >
            Understood
          </button>
        </div>
      </motion.div>
    </div>
  );
}
