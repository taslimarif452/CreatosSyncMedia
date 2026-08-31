import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, Send, ShieldCheck, MessageSquare } from 'lucide-react';
import { Creator } from '../types';
import { sendToWhatsApp, formatCreatorCollabMessage } from '../utils/whatsapp';

interface CreatorCollabModalProps {
  creator: Creator | null;
  onClose: () => void;
}

export const CreatorCollabModal: React.FC<CreatorCollabModalProps> = ({
  creator,
  onClose
}) => {
  if (!creator) return null;

  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('₹5 Lakh - ₹15 Lakh');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !email.trim()) {
      setError('Please fill in your Brand Name and Work Email.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const formattedMsg = formatCreatorCollabMessage({
      creatorName: creator.name,
      creatorHandle: creator.handle,
      brandName,
      email,
      budget,
      details
    });
    sendToWhatsApp(formattedMsg);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div
      id="creator-collab-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-[#101010] border border-[#262626] text-[#F5F5F5] shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#141414] border border-[#262626] hover:text-[#4F7CFF] hover:border-[#4F7CFF] text-[#A1A1A1] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">
              Request Sent to WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xs mx-auto mb-6 leading-relaxed">
              Your inquiry for <strong className="text-[#F5F5F5]">{creator.name}</strong> has been transferred to our WhatsApp team (<strong className="text-[#4F7CFF]">+91 81089 75875</strong>).
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                onClick={() => {
                  const msg = formatCreatorCollabMessage({
                    creatorName: creator.name,
                    creatorHandle: creator.handle,
                    brandName,
                    email,
                    budget,
                    details
                  });
                  sendToWhatsApp(msg);
                }}
                className="w-full sm:w-auto px-5 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-[#202020]">
              <img
                src={creator.image}
                alt={creator.name}
                className="w-12 h-12 rounded-xl object-cover border border-[#262626]"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-[10px] font-bold text-[#4F7CFF] uppercase tracking-widest">
                  Request Collaboration
                </span>
                <h3 className="text-base font-bold text-[#F5F5F5]">
                  {creator.name} <span className="text-xs text-[#A1A1A1]">({creator.handle})</span>
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                  Brand / Company Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. OnePlus / Swiggy / Zerodha"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                  Work Email *
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] placeholder-[#555555] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                  Estimated Campaign Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] outline-none transition-colors cursor-pointer"
                >
                  <option value="₹2 Lakh - ₹5 Lakh" className="bg-[#111111] text-[#F3F4F6]">₹2 Lakh - ₹5 Lakh (Integration)</option>
                  <option value="₹5 Lakh - ₹15 Lakh" className="bg-[#111111] text-[#F3F4F6]">₹5 Lakh - ₹15 Lakh (Dedicated Video)</option>
                  <option value="₹15 Lakh+" className="bg-[#111111] text-[#F3F4F6]">₹15 Lakh+ (Multi-Month Ambassador)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#E5E7EB] mb-2">
                  Brief Pitch / Target Dates
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your product launch, desired integration angles, and timeline..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#262626] focus:border-[#3B82F6] text-sm text-[#F3F4F6] placeholder-[#555555] outline-none resize-none transition-colors"
                />
              </div>

              {/* Privacy Checkbox row matching image UI */}
              <div className="flex items-start gap-3 pt-1 select-none">
                <input
                  type="checkbox"
                  id="collab-form-terms"
                  defaultChecked
                  className="mt-1 w-4 h-4 rounded bg-[#111111] border-[#333333] text-[#3B82F6] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#3B82F6]"
                />
                <label htmlFor="collab-form-terms" className="text-xs text-[#9CA3AF] leading-relaxed cursor-pointer">
                  I'd like to receive more information about company, I understand and agree to the{' '}
                  <span className="text-[#3B82F6] hover:underline">Privacy Policy</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/25"
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
          </div>
        )}
      </div>
    </div>
  );
};
