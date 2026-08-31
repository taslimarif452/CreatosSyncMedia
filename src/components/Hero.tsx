import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onStartCampaign: () => void;
  onJoinNetwork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCampaign, onJoinNetwork }) => {
  return (
    <section
      id="hero-section"
      className="relative pt-36 sm:pt-44 md:pt-48 pb-14 sm:pb-18 flex items-center bg-[#080808] border-none overflow-hidden bg-grid-subtle"
    >
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#4F7CFF]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col justify-center items-center text-center">
          {/* Editorial Headline */}
          <h1 className="flex flex-col items-center text-center tracking-tight mb-16 sm:mb-20">
            <span
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[112px] font-black text-white leading-[1.05] mb-12 sm:mb-16 tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.03em' }}
            >
              CreatorsSyncMedia<span className="text-[#4F7CFF]">.</span>
            </span>
            <span
              className="flex flex-col gap-3 sm:gap-4 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#C4C4C4] tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span>we sync brands</span>
              <span>with creators.</span>
            </span>
          </h1>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <button
              id="hero-start-campaign-cta"
              onClick={onStartCampaign}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-wider bg-[#F5F5F5] text-[#080808] hover:bg-[#4F7CFF] hover:text-white rounded-full transition-all duration-200 cursor-pointer shadow-lg shadow-black/50"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-join-network-cta"
              onClick={onJoinNetwork}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider bg-[#141414] hover:bg-[#1C1C1C] text-[#F5F5F5] border border-[#262626] hover:border-[#4F7CFF] rounded-full transition-all duration-200 cursor-pointer"
            >
              <span>Join Our Creator Network</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
