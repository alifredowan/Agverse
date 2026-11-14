import React, { useState } from 'react';
import { X, CheckCircle, Loader2, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuditModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    farmName: '',
    location: 'Dubai, UAE',
    farmSize: '50-250 Hectares',
    interest: 'Autonomous Robotics',
    notes: ''
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [auditReference, setAuditReference] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit audit request.');
      }

      setStatus('success');
      setAuditReference(data.referenceId || 'AGV-' + Math.floor(100000 + Math.random() * 900000));

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ACD5D1', '#2CC56F', '#E4D5BE', '#0B2D29']
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#021312]/85 backdrop-blur-sm transition-opacity"
        onClick={resetForm}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#06201D] border border-[#ACD5D1]/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black z-10 my-8">
        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#021312] text-[#96B1AC] hover:text-white hover:bg-[#0B2D29] transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#2CC56F]/20 border border-[#2CC56F]/40 flex items-center justify-center mx-auto mb-6 text-[#2CC56F]">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-manrope">
              Audit Request Registered
            </h3>

            <p className="text-sm font-mono text-[#ACD5D1] bg-[#021312] py-1.5 px-4 rounded-full inline-block mb-4 border border-[#ACD5D1]/30">
              Reference: #{auditReference}
            </p>

            <p className="text-[#96B1AC] text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
              Thank you, <strong className="text-white">{formData.fullName}</strong>. An AGverse agronomy and robotics specialist is reviewing your agricultural specifications for <strong className="text-[#ACD5D1]">{formData.farmName}</strong> and will follow up within 24 hours.
            </p>

            <button
              onClick={resetForm}
              className="ag-btn-solid px-8 py-3 text-sm font-bold uppercase tracking-wider"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-manrope">
                Request a Tech Audit For Your Farm
              </h2>
              <p className="text-[#96B1AC] text-xs sm:text-sm mt-1.5 leading-relaxed">
                Evaluate your land, soil salinity, and irrigation telemetry with our UAE engineering team.
              </p>
            </div>

            {status === 'error' && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center gap-2.5 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#D4EBE9] mb-1.5 font-mono uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Tariq Al-Mansoor"
                    className="w-full bg-[#021312] border border-[#ACD5D1]/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ACD5D1] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#D4EBE9] mb-1.5 font-mono uppercase tracking-wider">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tariq@agrifarm.ae"
                    className="w-full bg-[#021312] border border-[#ACD5D1]/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ACD5D1] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#D4EBE9] mb-1.5 font-mono uppercase tracking-wider">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-[#021312] border border-[#ACD5D1]/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ACD5D1] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#D4EBE9] mb-1.5 font-mono uppercase tracking-wider">
                    Farm / Enterprise Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="farmName"
                    value={formData.farmName}
                    onChange={handleChange}
                    placeholder="e.g. Al-Dhafra Agri Holdings"
                    className="w-full bg-[#021312] border border-[#ACD5D1]/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ACD5D1] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#D4EBE9] mb-1.5 font-mono uppercase tracking-wider">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Dubai, UAE"
                    className="w-full bg-[#021312] border border-[#ACD5D1]/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ACD5D1] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#D4EBE9] mb-1.5 font-mono uppercase tracking-wider">
                    Farm Size
                  </label>
                  <select
                    name="farmSize"
                    value={formData.farmSize}
                    onChange={handleChange}
                    className="w-full bg-[#021312] border border-[#ACD5D1]/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ACD5D1] transition-colors"
                  >
                    <option value="Under 20 Hectares">Under 20 Hectares</option>
                    <option value="20-100 Hectares">20-100 Hectares</option>
                    <option value="100-500 Hectares">100-500 Hectares</option>
                    <option value="500+ Hectares">500+ Hectares</option>
                    <option value="Greenhouse / Controlled Ag">Greenhouse / Controlled Ag</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#D4EBE9] mb-1.5 font-mono uppercase tracking-wider">
                    Primary Interest
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-[#021312] border border-[#ACD5D1]/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ACD5D1] transition-colors"
                  >
                    <option value="Autonomous Robotics">Autonomous Robotics</option>
                    <option value="Drone Multispectral Fleet">Drone Multispectral Fleet</option>
                    <option value="AI Brain & Soil Prediction">AI Brain & Soil Prediction</option>
                    <option value="Zero-Waste Irrigation">Zero-Waste Irrigation</option>
                    <option value="Full Mega-Platform Suite">Full Mega-Platform Suite</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#D4EBE9] mb-1.5 font-mono uppercase tracking-wider">
                  Specific Challenges or Soil Conditions (Optional)
                </label>
                <textarea
                  name="notes"
                  rows="2"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Specify soil salinity, crop type, water availability, or current machinery..."
                  className="w-full bg-[#021312] border border-[#ACD5D1]/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ACD5D1] transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="ag-btn-solid w-full py-3.5 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Farm Specs...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Tech Audit Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
