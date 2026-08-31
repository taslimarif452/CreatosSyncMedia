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
      className="relative min-h-[68vh] sm:min-h-[75vh] md:min-h-[80vh] pt-44 sm:pt-52 md:pt-56 pb-20 sm:pb-28 flex items-center justify-center bg-[#080808] border-none overflow-hidden"
    >
      {/* Hero Background Image - Naturally responsive and positioned slightly upwards */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#080808]">
        {/* Background artwork */}
        <img
          src="https://images.openai.com/static-rsc-4/OL9BZxze2qZUj9IuBKrWtyganvryT8iMs6IiPtfO0tx1_QbUxmt7mBwL3ZRq43FshFvW-1-pw5Wh9v91Di0r-D0mJvkceaid2DClfoP-v4LmfoK0WCSRR6HwOLynaTAwdr7KwW4Nk9lskEHZo3gqNJOEuKTkjuosk5WwWt_8MsD2N4hWMU23__cspsj5wTIS?purpose=fullsize"
          alt="Hero Atmosphere Background"
          className="w-full h-full min-w-full min-h-full object-cover object-[center_top] sm:object-[center_5%] md:object-[center_8%]"
          referrerPolicy="no-referrer"
        />

        {/* Soft edge darkening & Vignette overlays */}
        <div className="absolute inset-0 bg-black/60 md:bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-[#080808]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-[#080808]/90" />
      </div>

      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#4F7CFF]/15 blur-[130px] rounded-full pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-5xl xl:max-w-6xl mx-auto flex flex-col justify-center items-center text-center">
          {/* Editorial Headline */}
          <h1 className="flex flex-col items-center text-center tracking-tight mb-10 sm:mb-16 md:mb-20 max-w-full px-2">
            <span
              className="text-3xl min-[380px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] 2xl:text-[104px] font-black text-white leading-[1.1] sm:leading-none mb-8 sm:mb-12 md:mb-16 tracking-tight max-w-full sm:whitespace-nowrap select-none"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.03em' }}
            >
              CreatorsSyncMedia<span className="text-[#4F7CFF]">.</span>
            </span>
            <span
              className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-base sm:text-2xl md:text-4xl lg:text-5xl font-normal text-[#C4C4C4] tracking-wide"
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
