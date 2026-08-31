import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Sparkles, ShieldCheck, MessageSquare } from 'lucide-react';
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#101010] border border-[#262626] shadow-2xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-3">
              Direct Agency Brief
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F5F5F5] leading-[1.15]">
              Let's Build Something <br />
              <span className="text-[#A1A1A1]">People Want to Watch.</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#A1A1A1]">
              Submit your campaign requirements below. We will analyze our 500+ creator network and send you a custom creator match proposal within 24–48 hours.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#F5F5F5] tracking-tight mb-2">
                Campaign Brief Dispatched to WhatsApp
              </h3>
              <p className="text-sm text-[#A1A1A1] max-w-md mb-6 leading-relaxed">
                Thank you, <strong className="text-[#F5F5F5]">{formData.fullName}</strong>. Your campaign brief for <strong className="text-[#4F7CFF]">{formData.companyName}</strong> has been transferred directly to our WhatsApp strategy line (<strong className="text-[#4F7CFF]">+91 81089 75875</strong>).
              </p>
              <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] text-xs text-[#A1A1A1] mb-6 max-w-md w-full text-left">
                <div className="font-bold text-[#F5F5F5] mb-1">Summary Details:</div>
                <div>• Format: {formData.campaignType}</div>
                <div>• Budget: {formData.budgetRange}</div>
                <div>• Target Window: {formData.timeline}</div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => sendToWhatsApp(formatCampaignBriefMessage(formData))}
                  className="px-6 py-3 rounded-xl bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#4F7CFF]/20 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Chat</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] text-[#F5F5F5] border border-[#262626] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit Another Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 2-Column Fields for Basic Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vikramaditya Singhal"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#141414] border ${
                      errors.fullName ? 'border-rose-500' : 'border-[#262626] focus:border-[#4F7CFF]'
                    } text-sm text-[#F5F5F5] placeholder-[#555] outline-none transition-colors`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. vikram@brand.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#141414] border ${
                      errors.workEmail ? 'border-rose-500' : 'border-[#262626] focus:border-[#4F7CFF]'
                    } text-sm text-[#F5F5F5] placeholder-[#555] outline-none transition-colors`}
                  />
                  {errors.workEmail && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.workEmail}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                    Company / Brand *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Razer / boAt / CRED"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#141414] border ${
                      errors.companyName ? 'border-rose-500' : 'border-[#262626] focus:border-[#4F7CFF]'
                    } text-sm text-[#F5F5F5] placeholder-[#555] outline-none transition-colors`}
                  />
                  {errors.companyName && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.companyName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#141414] border ${
                      errors.phone ? 'border-rose-500' : 'border-[#262626] focus:border-[#4F7CFF]'
                    } text-sm text-[#F5F5F5] placeholder-[#555] outline-none transition-colors`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* What are you looking for? (Dropdown Menu) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                  What are you looking for?
                </label>
                <select
                  id="campaign-type-select"
                  value={formData.campaignType}
                  onChange={(e) => setFormData({ ...formData, campaignType: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-sm text-[#F5F5F5] outline-none cursor-pointer transition-colors"
                >
                  {campaignOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#141414] text-[#F5F5F5]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campaign Budget & Timeline Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                    Campaign Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-sm text-[#F5F5F5] outline-none cursor-pointer"
                  >
                    {budgetRanges.map((b) => (
                      <option key={b} value={b} className="bg-[#141414] text-[#F5F5F5]">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                    Campaign Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-sm text-[#F5F5F5] outline-none cursor-pointer"
                  >
                    {timelineOptions.map((t) => (
                      <option key={t} value={t} className="bg-[#141414] text-[#F5F5F5]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Campaign Brief Textarea */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                  Tell us about your campaign *
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details about your product, target audience, ideal creator categories, or any specific campaign goals..."
                  value={formData.campaignBrief}
                  onChange={(e) => setFormData({ ...formData, campaignBrief: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-xl bg-[#141414] border ${
                    errors.campaignBrief ? 'border-rose-500' : 'border-[#262626] focus:border-[#4F7CFF]'
                  } text-sm text-[#F5F5F5] placeholder-[#555] outline-none transition-colors resize-none`}
                />
                {errors.campaignBrief && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.campaignBrief}</span>
                )}
              </div>

              {/* Submit CTA & Reassurance */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#A1A1A1] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#4F7CFF]" />
                  <span>We'll get back to you within 1–2 business days.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-campaign-brief-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 text-xs font-bold uppercase tracking-wider bg-[#F5F5F5] text-[#080808] hover:bg-[#4F7CFF] hover:text-white disabled:opacity-50 rounded-xl transition-all duration-200 cursor-pointer shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Matching Creators...</span>
                    </>
                  ) : (
                    <>
                      <span>Start My Campaign</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
