import React from 'react';
import { Paragraphs } from './CmsContent';
import { motion } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, type, content }) {
  if (!isOpen) return null;

  const policy = content[type];

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
              {policy.title}
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
          <Paragraphs body={policy.body} />
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="btn-primary text-xs !py-2.5 !px-6"
          >
            {content.close}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
