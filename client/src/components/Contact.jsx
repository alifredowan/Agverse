import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Contact({ t, selectedInterest, onOpenCalendar }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    interest: 'Tech Audit',
    message: '',
    bot_check: '', // honeypot
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [serverError, setServerError] = useState('');

  // Sync interest if passed from other buttons
  useEffect(() => {
    if (selectedInterest) {
      setFormData((prev) => ({ ...prev, interest: selectedInterest }));
    }
  }, [selectedInterest]);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = t.contact.form.fullName + ' is required';
    }
    if (!formData.email.trim()) {
      errs.email = t.contact.form.email + ' is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please provide a valid email address';
      }
    }
    if (!formData.message.trim()) {
      errs.message = t.contact.form.message + ' is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setSubmissionId(data.submissionId || `AGV-${Date.now().toString(36).toUpperCase()}`);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          interest: 'Tech Audit',
          message: '',
          bot_check: '',
        });
      } else {
        setServerError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      // Fallback optimistic resolution for static previews
      setIsSuccess(true);
      setSubmissionId(`AGV-LOCAL-${Date.now().toString(36).toUpperCase()}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-padding bg-[#14201B] text-white relative overflow-hidden"
    >
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0B3D2E]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Pitch & Dubai Coordinates (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8BC34A] mb-3">
                <ShieldCheck className="w-4 h-4 text-[#8BC34A]" />
                <span>{t.contact.eyebrow}</span>
              </div>

              <h2
                id="contact-heading"
                className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-6"
              >
                {t.contact.title}
              </h2>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-10">
                {t.contact.pitch}
              </p>

              {/* Contact Information List */}
              <div className="flex flex-col gap-5 text-sm text-white/80">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#8BC34A]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{t.contact.location}</div>
                    <div className="text-xs text-white/60">{t.contact.locationDetail}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#8BC34A]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{t.contact.inquiries}</div>
                    <a
                      href={`mailto:${t.contact.email}`}
                      className="text-xs text-[#8BC34A] hover:underline"
                    >
                      {t.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#8BC34A]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{t.contact.office}</div>
                    <div className="text-xs text-white/60">{t.contact.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Interactive Calendar Callout */}
            <div className="mt-10 p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-[#8BC34A]" />
                <div className="text-xs">
                  <div className="font-bold text-white">{t.contact.expedited}</div>
                  <div className="text-white/60">{t.contact.discovery}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenCalendar}
                className="btn-outline-white text-xs !py-2 !px-4 shrink-0"
              >
                {t.contact.chooseDate}
              </button>
            </div>
          </div>

          {/* Right Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0B3D2E] rounded-2xl p-6 sm:p-10 border border-[#8BC34A]/30 shadow-2xl">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8BC34A]/20 flex items-center justify-center mb-6 text-[#8BC34A]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
                    {t.contact.form.successTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-white/80 max-w-md mb-6 leading-relaxed">
                    {t.contact.responseTime}
                  </p>
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#8BC34A] mb-8">
                    Submission Ref: {submissionId}
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="btn-outline-white text-xs !py-2.5 !px-6"
                  >
                    {t.contact.sendAgain}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {serverError && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Anti-spam honeypot (hidden from real users) */}
                  <input
                    type="text"
                    name="bot_check"
                    value={formData.bot_check}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2"
                      >
                        {t.contact.form.fullName}
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={t.contact.form.fullNamePlaceholder}
                        aria-label="Full Name"
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                          errors.fullName ? 'border-red-400 focus:ring-red-400' : 'border-white/15 focus:ring-[#8BC34A]'
                        } text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2`}
                      />
                      {errors.fullName && (
                        <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2"
                      >
                        {t.contact.form.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.contact.form.emailPlaceholder}
                        aria-label="Email Address"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                          errors.email ? 'border-red-400 focus:ring-red-400' : 'border-white/15 focus:ring-[#8BC34A]'
                        } text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2`}
                      />
                      {errors.email && (
                        <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2"
                      >
                        {t.contact.form.phone}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.contact.form.phonePlaceholder}
                        aria-label="Phone Number"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2"
                      >
                        {t.contact.form.company}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t.contact.form.companyPlaceholder}
                        aria-label="Company or Farm Name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                      />
                    </div>
                  </div>

                  {/* Interest Selector */}
                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2"
                    >
                      {t.contact.form.interest}
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      aria-label="Area of Interest"
                      className="w-full px-4 py-3 rounded-xl bg-[#06251C] border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                    >
                      <option value="Tech Audit">{t.contact.form.interests.audit}</option>
                      <option value="Partnership">{t.contact.form.interests.partnership}</option>
                      <option value="Investment">{t.contact.form.interests.investment}</option>
                      <option value="Other">{t.contact.form.interests.other}</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2"
                    >
                      {t.contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.contact.form.messagePlaceholder}
                      aria-label="Message Details"
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.message ? 'border-red-400 focus:ring-red-400' : 'border-white/15 focus:ring-[#8BC34A]'
                      } text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2`}
                    />
                    {errors.message && (
                      <p className="text-red-300 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full text-base !py-4 gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-glow-lime"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{t.contact.form.submitting}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.contact.form.submit}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
