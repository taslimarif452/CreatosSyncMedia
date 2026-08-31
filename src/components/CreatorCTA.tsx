import React from 'react';
import { ArrowRight, Youtube, Check, DollarSign, Shield, Zap } from 'lucide-react';

interface CreatorCTAProps {
  onJoinNetwork: () => void;
}

export const CreatorCTA: React.FC<CreatorCTAProps> = ({ onJoinNetwork }) => {
  return (
    <section id="creator-cta-section" className="py-24 bg-[#080808] border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#101010] border border-[#262626]">
          {/* Left Content (Col 7) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-6">
              <Youtube className="w-3.5 h-3.5" />
              <span>For Digital & YouTube Creators</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F5F5] uppercase leading-[1.1] mb-6 font-heading-premium">
              ARE YOU A CREATOR? <br />
              <span className="text-[#A1A1A1]">TURN YOUR AUDIENCE</span> <br />
              <span className="text-white">INTO OPPORTUNITIES.</span>
            </h2>

            <p className="text-base text-[#A1A1A1] max-w-lg mb-8 leading-relaxed">
              Join our creator network and get discovered by premier Indian and global brands. We handle the contract negotiation, brand briefs, and prompt payments so you can focus entirely on creating great content.
            </p>

            {/* Creator Perks List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full max-w-lg">
              <div className="flex items-center gap-2.5 text-xs text-[#F5F5F5] bg-[#141414] p-3 rounded-xl border border-[#262626]">
                <Check className="w-4 h-4 text-[#4F7CFF] flex-shrink-0" />
                <span>Zero Sign-Up Fees</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F5F5F5] bg-[#141414] p-3 rounded-xl border border-[#262626]">
                <Check className="w-4 h-4 text-[#4F7CFF] flex-shrink-0" />
                <span>Protected Creative Voice</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F5F5F5] bg-[#141414] p-3 rounded-xl border border-[#262626]">
                <Check className="w-4 h-4 text-[#4F7CFF] flex-shrink-0" />
                <span>Premium Paid Brand Deals</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F5F5F5] bg-[#141414] p-3 rounded-xl border border-[#262626]">
                <Check className="w-4 h-4 text-[#4F7CFF] flex-shrink-0" />
                <span>On-Time Direct Payouts</span>
              </div>
            </div>

            <button
              id="join-creator-network-cta-btn"
              onClick={onJoinNetwork}
              className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-wider bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-[#4F7CFF]/20"
            >
              <span>Join Creator Network</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Creator Visual (Col 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/4.5] rounded-2xl overflow-hidden bg-[#141414] border border-[#262626] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
                alt="Creator with camera microphone producing video content"
                className="w-full h-full object-cover object-center filter contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#080808]/90 backdrop-blur-md border border-[#262626]">
                <div className="text-[10px] font-bold text-[#4F7CFF] uppercase tracking-wider mb-0.5">
                  Creator Representation
                </div>
                <div className="text-sm font-bold text-[#F5F5F5]">
                  Over ₹12+ Crore In Creator Brand Payouts Facilitated
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
