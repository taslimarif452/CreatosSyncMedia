import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';

interface BrandCTAProps {
  onStartCampaign: () => void;
}

export const BrandCTA: React.FC<BrandCTAProps> = ({ onStartCampaign }) => {
  return (
    <section id="brand-cta-section" className="py-24 bg-[#080808] border-b border-[#262626] relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#4F7CFF]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-[#101010] border border-[#262626] text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>For Modern Brands & Growth Teams</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F5] uppercase leading-[1.05] mb-6 max-w-3xl font-heading-premium">
              GOT A BRAND? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F5] via-[#FFFFFF] to-[#4F7CFF]">
                LET’S PUT IT IN THE CONVERSATION.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#A1A1A1] max-w-xl mx-auto mb-10 leading-relaxed">
              Tell us what you're building. We'll help you find the creators who can make people care, watch, and convert.
            </p>

            <button
              id="brand-cta-start-campaign-btn"
              onClick={onStartCampaign}
              className="group inline-flex items-center gap-3 px-9 py-4.5 text-xs font-bold uppercase tracking-wider bg-[#F5F5F5] text-[#080808] hover:bg-[#4F7CFF] hover:text-white rounded-full transition-all duration-200 cursor-pointer shadow-xl"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Guarantees */}
            <div className="mt-10 pt-8 border-t border-[#1C1C1C] flex flex-wrap items-center justify-center gap-6 text-xs text-[#A1A1A1]">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#4F7CFF]" />
                Direct Creator Access
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#4F7CFF]" />
                Audited Performance Reports
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#4F7CFF]" />
                Fast 10-Day Turnaround
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
