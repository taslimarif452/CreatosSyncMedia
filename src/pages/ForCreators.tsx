import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, DollarSign, Shield, Youtube, Zap, Sparkles, Loader2, Send, MessageSquare } from 'lucide-react';
import { sendToWhatsApp, formatCreatorApplicationMessage } from '../utils/whatsapp';

interface ForCreatorsPageProps {
  navigate: (path: string) => void;
}

export const ForCreators: React.FC<ForCreatorsPageProps> = ({ navigate }) => {
  const [formData, setFormData] = useState({
    creatorName: '',
    email: '',
    phone: '',
    youtubeUrl: '',
    subscriberCount: '50K - 100K',
    niche: 'Technology',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.creatorName || !formData.email || !formData.youtubeUrl) {
      setError('Please fill in your Creator Name, Email, and YouTube Channel Link.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const formattedMsg = formatCreatorApplicationMessage(formData);
    sendToWhatsApp(formattedMsg);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const scrollToApplication = () => {
    const el = document.getElementById('creator-apply-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="for-creators-page" className="pt-32 pb-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-4">
            Creator Representation & Brand Deals
          </div>
          <h1
            className="text-2xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-[#EDEDED] leading-[1.25] mb-6 max-w-3xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Your Audience Has Value. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E2E8F0] to-[#4F7CFF] font-medium">
              Your Influence Has Value.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1A1] max-w-2xl leading-relaxed mb-8">
            Stop dealing with low-ball sponsor emails and chasing late invoices. Join CreatorsSyncMedia and get matched with tier-one brands that value your authentic storytelling and audience trust.
          </p>

          <button
            onClick={scrollToApplication}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-[#4F7CFF]/20"
          >
            <span>Apply To Join Network</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="p-7 rounded-2xl bg-[#101010] border border-[#262626] hover:border-[#4F7CFF]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5 text-[#4F7CFF]" />
            </div>
            <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
              Premium Brand Budgets
            </h3>
            <p className="text-xs text-[#A1A1A1] leading-relaxed">
              We negotiate transparent, industry-leading CPM payouts. No hidden agency cuts.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#101010] border border-[#262626] hover:border-[#4F7CFF]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-[#4F7CFF]" />
            </div>
            <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
              Creative Control First
            </h3>
            <p className="text-xs text-[#A1A1A1] leading-relaxed">
              You maintain complete editorial veto. We ensure brands respect your unique narrative voice.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#101010] border border-[#262626] hover:border-[#4F7CFF]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-[#4F7CFF]" />
            </div>
            <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
              Zero Admin Friction
            </h3>
            <p className="text-xs text-[#A1A1A1] leading-relaxed">
              We handle contracts, briefing decks, review iterations, and prompt milestone payments.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#101010] border border-[#262626] hover:border-[#4F7CFF]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center mb-4">
              <Youtube className="w-5 h-5 text-[#4F7CFF]" />
            </div>
            <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
              Long-Term Retainers
            </h3>
            <p className="text-xs text-[#A1A1A1] leading-relaxed">
              High-performing creators unlock multi-month retainers and direct ambassador contracts.
            </p>
          </div>
        </div>

        {/* Application Form Section */}
        <div id="creator-apply-form" className="max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-3">
              Creator Network Application
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5]">
              Join the CreatorsSyncMedia Roster
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2">
              Free to join. 100% creator-friendly. We review channel statistics and respond within 48 hours.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">
                Application Transferred to WhatsApp
              </h3>
              <p className="text-sm text-[#9CA3AF] max-w-md mx-auto mb-6">
                Thank you for applying, <strong className="text-[#F5F5F5]">{formData.creatorName}</strong>! Your channel application has been routed directly to our talent acquisition team on WhatsApp (<strong className="text-[#4F7CFF]">+91 81089 75875</strong>).
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => sendToWhatsApp(formatCreatorApplicationMessage(formData))}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Chat</span>
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider cursor-pointer"
                >
                  Submit Another Channel
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Creator / Channel Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rohit Sharma"
                    value={formData.creatorName}
                    onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Primary Email *
                  </label>
                  <input
                    type="email"
                    placeholder="business@yourchannel.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    YouTube Channel Link *
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/@yourchannel"
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Phone Number / WhatsApp
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Subscriber Tier
                  </label>
                  <select
                    value={formData.subscriberCount}
                    onChange={(e) => setFormData({ ...formData, subscriberCount: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] outline-none cursor-pointer transition-colors"
                  >
                    <option value="10K - 50K" className="bg-[#111111] text-[#F3F4F6]">10K - 50K (Rising Creator)</option>
                    <option value="50K - 200K" className="bg-[#111111] text-[#F3F4F6]">50K - 200K (Mid-Tier Influence)</option>
                    <option value="200K - 1M" className="bg-[#111111] text-[#F3F4F6]">200K - 1M (Macro Leader)</option>
                    <option value="1M+" className="bg-[#111111] text-[#F3F4F6]">1M+ (Mega Authority)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                    Primary Content Niche
                  </label>
                  <select
                    value={formData.niche}
                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] outline-none cursor-pointer transition-colors"
                  >
                    <option value="Technology" className="bg-[#111111] text-[#F3F4F6]">Technology & Hardware</option>
                    <option value="Gaming" className="bg-[#111111] text-[#F3F4F6]">Gaming & Esports</option>
                    <option value="Finance" className="bg-[#111111] text-[#F3F4F6]">Finance & Investing</option>
                    <option value="Lifestyle" className="bg-[#111111] text-[#F3F4F6]">Lifestyle & Fashion</option>
                    <option value="Education" className="bg-[#111111] text-[#F3F4F6]">Education & EdTech</option>
                    <option value="Fitness" className="bg-[#111111] text-[#F3F4F6]">Fitness & Health</option>
                    <option value="Beauty" className="bg-[#111111] text-[#F3F4F6]">Beauty & Skincare</option>
                    <option value="Comedy" className="bg-[#111111] text-[#F3F4F6]">Comedy & Entertainment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                  Message / Tell us what we can help you with
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what we can help you with (views per video, sponsor preferences, audience demographic)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] placeholder-[#555555] outline-none resize-none transition-colors"
                />
              </div>

              {/* Privacy Checkbox row matching image UI */}
              <div className="flex items-start gap-3 pt-2 select-none">
                <input
                  type="checkbox"
                  id="creator-apply-terms"
                  defaultChecked
                  className="mt-1 w-4 h-4 bg-[#111111] border-[#333333] text-[#3B82F6] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#3B82F6]"
                />
                <label htmlFor="creator-apply-terms" className="text-xs sm:text-[13px] text-[#9CA3AF] leading-relaxed cursor-pointer">
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
                      <span>Submitting Application...</span>
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
  );
};
