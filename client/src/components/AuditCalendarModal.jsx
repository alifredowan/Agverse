import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2, User, Mail, Building, ArrowRight } from 'lucide-react';

export default function AuditCalendarModal({ isOpen, onClose }) {
  const [selectedDate, setSelectedDate] = useState('2026-11-24');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const availableDates = [
    { day: 'Mon', date: '24 Nov', val: '2026-11-24' },
    { day: 'Tue', date: '25 Nov', val: '2026-11-25' },
    { day: 'Wed', date: '26 Nov', val: '2026-11-26' },
    { day: 'Thu', date: '27 Nov', val: '2026-11-27' },
  ];

  const availableTimes = [
    '09:00 AM',
    '10:30 AM',
    '01:00 PM',
    '03:30 PM',
    '05:00 PM',
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    if (!name || !email) return;
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
              Schedule Farm Tech Audit Call
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
              Discovery Call Confirmed!
            </h4>
            <p className="text-sm text-white/80 max-w-md mx-auto mb-6">
              We have reserved <strong>{selectedTime}</strong> on <strong>{selectedDate}</strong> (GST Dubai Time). A calendar invitation with Google Meet link has been sent to <strong>{email}</strong>.
            </p>
            <button
              onClick={handleReset}
              className="btn-primary text-xs !py-3 !px-8"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-6">
            {/* Date Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2.5">
                Select Date (Gulf Standard Time)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {availableDates.map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setSelectedDate(item.val)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedDate === item.val
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
                Select Time Slot (30 Mins)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {availableTimes.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 px-1 rounded-lg border text-center text-xs transition-all ${
                      selectedTime === slot
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
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sultan Al Nuaimi"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sultan@agriholdings.ae"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-primary w-full text-sm !py-3.5 gap-2 shadow-glow-lime"
              >
                <span>Confirm Call with Senior Agronomist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
