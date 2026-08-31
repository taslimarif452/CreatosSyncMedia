import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, Send, Loader2, MessageSquare, Sparkles } from 'lucide-react';
import { sendToWhatsApp, formatContactInquiryMessage } from '../utils/whatsapp';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: 'Brand Campaign Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in your Name, Email, and Message.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    // Format message & trigger WhatsApp transfer
    const formattedMsg = formatContactInquiryMessage(formData);
    sendToWhatsApp(formattedMsg);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div id="contact-page" className="pt-32 pb-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-4">
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F5F5F5] leading-[1.05] mb-4">
            Let's Talk.
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1A1] max-w-2xl leading-relaxed">
            Have a campaign in mind? Looking to book a creator roster? Or want to join our talent network? Let's build something people want to watch.
          </p>
        </div>

        {/* 2-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Col: Contact Information (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#101010] border border-[#262626]">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-6">
                Agency Headquarters
              </h3>

              <div className="space-y-6 text-xs text-[#A1A1A1]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0 text-[#4F7CFF]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#F5F5F5] block text-sm mb-0.5">Bengaluru Hub (HQ)</strong>
                    <span>Indiranagar 100ft Road, Bengaluru, Karnataka 560038</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0 text-[#4F7CFF]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#F5F5F5] block text-sm mb-0.5">Mumbai Creator Studio</strong>
                    <span>Bandra West, Mumbai, Maharashtra 400050</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0 text-[#4F7CFF]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#F5F5F5] block text-sm mb-0.5">Direct Enquiries</strong>
                    <span className="text-[#4F7CFF]">partnerships@creatorssyncmedia.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#F5F5F5] block text-sm mb-0.5">WhatsApp & Direct Line</strong>
                    <a
                      href="https://wa.me/918108975875"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4F7CFF] hover:underline inline-flex items-center gap-1.5"
                    >
                      +91 81089 75875
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note Card */}
            <div className="p-8 rounded-3xl bg-[#101010] border border-[#4F7CFF]/30">
              <div className="flex items-center gap-2 text-xs font-bold text-[#4F7CFF] uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Fast Agency Response</span>
              </div>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                All campaign briefs and creator partnership inquiries are reviewed by our senior partners within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Col: Contact Form (Col 7) */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">
                  Inquiry Dispatched to WhatsApp
                </h3>
                <p className="text-sm text-[#9CA3AF] max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-[#F5F5F5]">{formData.name}</strong>. Your details have been formatted and routed to our official WhatsApp line (<strong className="text-[#4F7CFF]">+91 81089 75875</strong>).
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => sendToWhatsApp(formatContactInquiryMessage(formData))}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open WhatsApp Chat Again</span>
                  </button>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                    Send Direct Agency Message
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
                    Fill out the form below and we will get back to you promptly.
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                    {error}
                  </div>
                )}

                {/* Name & Company row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                      First & Last Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Brand / Creator Handle"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors"
                  />
                </div>

                {/* Phone Number with Prefix */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Phone Number
                  </label>
                  <div className="flex items-center bg-[#111111] border border-[#262626] focus-within:border-[#3B82F6] transition-colors overflow-hidden">
                    <div className="flex items-center gap-1.5 px-3.5 py-3 sm:py-3.5 border-r border-[#262626] bg-[#0E0E0E] text-xs text-[#E5E7EB] select-none flex-shrink-0">
                      <span className="text-sm">🇮🇳</span>
                      <span className="text-[11px] font-mono text-[#9CA3AF]">+91</span>
                      <span className="text-[10px] text-[#666666]">▾</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="(+91) 98765-43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 sm:py-3.5 bg-transparent text-sm text-[#F3F4F6] placeholder-[#555555] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] outline-none cursor-pointer transition-colors"
                  >
                    <option value="Brand Campaign Inquiry" className="bg-[#111111] text-[#F3F4F6]">Brand Campaign Inquiry (Hire Creators)</option>
                    <option value="Creator Representation" className="bg-[#111111] text-[#F3F4F6]">Creator Roster Application (I'm a Creator)</option>
                    <option value="Strategic Partnership" className="bg-[#111111] text-[#F3F4F6]">Agency Partnership / Press</option>
                    <option value="General Inquiry" className="bg-[#111111] text-[#F3F4F6]">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what we can help you with"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] placeholder-[#555555] outline-none resize-none transition-colors"
                  />
                </div>

                {/* Privacy Checkbox row matching image UI */}
                <div className="flex items-start gap-3 pt-2 select-none">
                  <input
                    type="checkbox"
                    id="contact-form-terms"
                    defaultChecked
                    className="mt-1 w-4 h-4 bg-[#111111] border-[#333333] text-[#3B82F6] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#3B82F6]"
                  />
                  <label htmlFor="contact-form-terms" className="text-xs sm:text-[13px] text-[#9CA3AF] leading-relaxed cursor-pointer">
                    I'd like to receive more information about company, I understand and agree to the{' '}
                    <span className="text-[#3B82F6] hover:underline">Privacy Policy</span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
