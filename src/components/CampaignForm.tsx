import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Sparkles, ShieldCheck, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import { CampaignLeadFormData } from '../types';
import { sendToWhatsApp, formatCampaignBriefMessage } from '../utils/whatsapp';

interface CampaignFormProps {
  initialCampaignType?: string;
  onSuccess?: () => void;
}

export const CampaignForm: React.FC<CampaignFormProps> = ({
  initialCampaignType,
  onSuccess
}) => {
  const campaignOptions = [
    'YouTube Integration',
    'Dedicated Video',
    'Shorts Campaign',
    'Multi-Creator Series',
    'Long-Term Ambassador'
  ];

  const budgetRanges = [
    '₹2 Lakh - ₹5 Lakh (Pilot Test)',
    '₹5 Lakh - ₹15 Lakh (Growth Push)',
    '₹15 Lakh - ₹50 Lakh (National Launch)',
    '₹50 Lakh+ (Omnichannel Blitz)'
  ];

  const timelineOptions = [
    'Immediately (Next 7-10 Days)',
    'Within this month',
    'Next quarter (Q3/Q4 planning)',
    'Exploring creator options'
  ];

  const [formData, setFormData] = useState<CampaignLeadFormData>({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    campaignType: initialCampaignType || 'YouTube Integration',
    budgetRange: '₹5 Lakh - ₹15 Lakh (Growth Push)',
    timeline: 'Within this month',
    campaignBrief: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CampaignLeadFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CampaignLeadFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = 'Please enter a valid work email';
    }
    if (!formData.companyName.trim()) newErrors.companyName = 'Company / Brand name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.campaignBrief.trim()) newErrors.campaignBrief = 'Please provide a brief overview of your campaign';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Format message & route directly to WhatsApp
    const formattedMsg = formatCampaignBriefMessage(formData);
    sendToWhatsApp(formattedMsg);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      workEmail: '',
      companyName: '',
      phone: '',
      campaignType: 'YouTube Integration',
      budgetRange: '₹5 Lakh - ₹15 Lakh (Growth Push)',
      timeline: 'Within this month',
      campaignBrief: ''
    });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section id="campaign-lead-form-section" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Header & Info */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-4">
              Direct Agency Brief
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F5F5F5] leading-[1.15]">
              Let's Build Something <br />
              <span className="text-[#A1A1A1]">People Want to Watch.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Submit your campaign requirements below. We will analyze our 500+ creator network and send you a custom creator match proposal within 24–48 hours.
            </p>

            <div className="mt-8 space-y-4 pt-6 border-t border-[#1C1C1C]">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#9CA3AF]">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span>Direct access to 500+ top verified creators</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#9CA3AF]">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span>Fast 24-48 hour turnaround on creator proposals</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#9CA3AF]">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span>End-to-end contracting, brief execution & reporting</span>
              </div>
            </div>

            {/* Direct Contact & Agency Office Info */}
            <div className="mt-8 p-5 bg-[#111111] border border-[#262626] rounded-2xl space-y-3">
              <span className="text-[10px] font-bold tracking-widest text-[#4F7CFF] uppercase block">
                Direct Contact Channels
              </span>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#4F7CFF] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#737373] block uppercase font-medium">Email</span>
                  <a
                    href="mailto:partnerships@creatorssyncmedia.in"
                    className="text-xs text-[#E5E5E5] hover:text-[#4F7CFF] transition-colors break-all"
                  >
                    partnerships@creatorssyncmedia.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#737373] block uppercase font-medium">Call & WhatsApp</span>
                  <a
                    href="https://wa.me/918108975875"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#E5E5E5] hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>+91 8108975875</span>
                    <MessageSquare className="w-3 h-3 text-emerald-400" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4F7CFF] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#737373] block uppercase font-medium">Address</span>
                  <p className="text-xs text-[#A1A1A1] leading-relaxed">
                    Ghatkopar West Mumbai Maharashtra 400086
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#F5F5F5] tracking-tight mb-2">
                  Campaign Brief Dispatched to WhatsApp
                </h3>
                <p className="text-sm text-[#9CA3AF] max-w-md mb-6 leading-relaxed">
                  Thank you, <strong className="text-[#F5F5F5]">{formData.fullName}</strong>. Your campaign brief for <strong className="text-[#4F7CFF]">{formData.companyName}</strong> has been transferred directly to our WhatsApp strategy line (<strong className="text-[#4F7CFF]">+91 8108975875</strong>) & email team (<strong className="text-[#4F7CFF]">partnerships@creatorssyncmedia.in</strong>).
                </p>
                <div className="p-4 bg-[#111111] border border-[#262626] text-xs text-[#9CA3AF] mb-6 max-w-md w-full text-left">
                  <div className="font-semibold text-[#F5F5F5] mb-1.5">Summary Details:</div>
                  <div>• Format: {formData.campaignType}</div>
                  <div>• Budget: {formData.budgetRange}</div>
                  <div>• Target Window: {formData.timeline}</div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => sendToWhatsApp(formatCampaignBriefMessage(formData))}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open WhatsApp Chat</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#111111] hover:bg-[#1A1A1A] text-[#E5E7EB] border border-[#262626] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Another Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 2-Column Fields for Name & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vikramaditya Singhal"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 sm:py-3.5 bg-[#111111] border ${
                        errors.fullName ? 'border-rose-500' : 'border-[#262626] focus:border-[#3B82F6]'
                      } text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-400 mt-1.5 block">{errors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Razer / boAt / CRED"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className={`w-full px-4 py-3 sm:py-3.5 bg-[#111111] border ${
                        errors.companyName ? 'border-rose-500' : 'border-[#262626] focus:border-[#3B82F6]'
                      } text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors`}
                    />
                    {errors.companyName && (
                      <span className="text-[11px] text-rose-400 mt-1.5 block">{errors.companyName}</span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. vikram@company.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className={`w-full px-4 py-3 sm:py-3.5 bg-[#111111] border ${
                      errors.workEmail ? 'border-rose-500' : 'border-[#262626] focus:border-[#3B82F6]'
                    } text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors`}
                  />
                  {errors.workEmail && (
                    <span className="text-[11px] text-rose-400 mt-1.5 block">{errors.workEmail}</span>
                  )}
                </div>

                {/* Phone Number with Country Indicator */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Phone Number *
                  </label>
                  <div
                    className={`flex items-center bg-[#111111] border ${
                      errors.phone ? 'border-rose-500' : 'border-[#262626] focus-within:border-[#3B82F6]'
                    } transition-colors overflow-hidden`}
                  >
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
                  {errors.phone && (
                    <span className="text-[11px] text-rose-400 mt-1.5 block">{errors.phone}</span>
                  )}
                </div>

                {/* What are you looking for? (Campaign Format) */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Campaign Format
                  </label>
                  <select
                    id="campaign-type-select"
                    value={formData.campaignType}
                    onChange={(e) => setFormData({ ...formData, campaignType: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] outline-none cursor-pointer transition-colors"
                  >
                    {campaignOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#111111] text-[#F3F4F6]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Campaign Budget & Timeline Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                      Campaign Budget Range
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] outline-none cursor-pointer"
                    >
                      {budgetRanges.map((b) => (
                        <option key={b} value={b} className="bg-[#111111] text-[#F3F4F6]">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                      Campaign Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] outline-none cursor-pointer"
                    >
                      {timelineOptions.map((t) => (
                        <option key={t} value={t} className="bg-[#111111] text-[#F3F4F6]">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Campaign Brief Textarea */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Message / Tell us what we can help you with *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what we can help you with (product details, goals, creator preferences)..."
                    value={formData.campaignBrief}
                    onChange={(e) => setFormData({ ...formData, campaignBrief: e.target.value })}
                    className={`w-full px-4 py-3 sm:py-3.5 bg-[#111111] border ${
                      errors.campaignBrief ? 'border-rose-500' : 'border-[#262626] focus:border-[#3B82F6]'
                    } text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors resize-none`}
                  />
                  {errors.campaignBrief && (
                    <span className="text-[11px] text-rose-400 mt-1.5 block">{errors.campaignBrief}</span>
                  )}
                </div>

                {/* Privacy Checkbox row matching image UI */}
                <div className="flex items-start gap-3 pt-2 select-none">
                  <input
                    type="checkbox"
                    id="campaign-form-terms"
                    defaultChecked
                    className="mt-1 w-4 h-4 bg-[#111111] border-[#333333] text-[#3B82F6] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#3B82F6]"
                  />
                  <label htmlFor="campaign-form-terms" className="text-xs sm:text-[13px] text-[#9CA3AF] leading-relaxed cursor-pointer">
                    I'd like to receive more information about company, I understand and agree to the{' '}
                    <span className="text-[#3B82F6] hover:underline">Privacy Policy</span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-campaign-brief-btn"
                    className="w-full py-3.5 sm:py-4 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
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
    </section>
  );
};
