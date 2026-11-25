import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2, User, Mail, Building, ArrowRight } from 'lucide-react';

export default function AuditCalendarModal({ isOpen, onClose, content }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const { dates: availableDates, times: availableTimes } = content;
  const date = availableDates.some((slot) => slot.val === selectedDate) ? selectedDate : availableDates[0]?.val;
  const time = availableTimes.includes(selectedTime) ? selectedTime : availableTimes[0];

  const handleBooking = (e) => {
    e.preventDefault();
    if (!name || !email || !date || !time) return;
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    setName('');
    setEmail('');
    onClose();
  };

  if (!isOpen) return null;

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
        className="relative w-full max-w-xl bg-[#0B3D2E] text-white rounded-2xl p-6 sm:p-8 border border-[#8BC34A]/30 shadow-2xl z-10"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#8BC34A]" />
            <h3 className="font-heading font-bold text-xl text-white">
              {content.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-[#8BC34A]/20 flex items-center justify-center mx-auto mb-4 text-[#8BC34A]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-bold text-2xl text-white mb-2">
              {content.confirmed}
            </h4>
            <p className="text-sm text-white/80 max-w-md mx-auto mb-6">
              {content.confirmation.replace(/\{(time|date|email)\}/g, (_, key) => ({ time, date, email })[key])}
            </p>
            <button
              onClick={handleReset}
              className="btn-primary text-xs !py-3 !px-8"
            >
              {content.done}
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-6">
            {/* Date Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2.5">
                {content.dateLabel}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {availableDates.map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setSelectedDate(item.val)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      date === item.val
                        ? 'bg-[#8BC34A] text-[#0B3D2E] border-[#8BC34A] font-bold shadow-md'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="text-[11px] uppercase">{item.day}</div>
                    <div className="text-sm font-semibold mt-0.5">{item.date}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2.5">
                {content.timeLabel}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {availableTimes.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 px-1 rounded-lg border text-center text-xs transition-all ${
                      time === slot
                        ? 'bg-[#8BC34A] text-[#0B3D2E] border-[#8BC34A] font-bold'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Attendee Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  {content.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={content.namePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  {content.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.emailPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-primary w-full text-sm !py-3.5 gap-2 shadow-glow-lime"
              >
                <span>{content.submitLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
