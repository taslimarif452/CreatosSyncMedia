import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { CREATORS } from '../data/creators';

interface CreatorNetworkSectionProps {
  onSelectCreator: (creatorId: string) => void;
  onExploreAll?: () => void;
}

export const CreatorNetworkSection: React.FC<CreatorNetworkSectionProps> = ({
  onSelectCreator
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Take top 6 creators for the featured roster display
  const featuredCreators = CREATORS.slice(0, 6);
  const currentCreator = featuredCreators[activeIndex] || featuredCreators[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? featuredCreators.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === featuredCreators.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="creator-network-section"
      className="py-20 md:py-24 bg-white border-b border-gray-200 scroll-mt-24 text-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-3">
              Vetted Creator Ecosystem
            </div>
            <h2
              className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-950 leading-[1.15]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              creators with influence. <br />
              <span className="text-gray-400">audiences with trust.</span>
            </h2>
          </div>

          <div className="text-xs text-gray-500 max-w-xs md:text-right font-medium leading-relaxed">
            Hand-picked, high-retention talent ready for high-converting brand collaborations.
          </div>
        </div>

        {/* TOP SHOWCASE BANNER (Matching image layout with clean light theme styling) */}
        <div
          id="featured-creator-showcase"
          className="rounded-2xl bg-white border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[440px] md:min-h-[480px] mb-4 shadow-xl shadow-gray-200/60 transition-all duration-300"
        >
          {/* Left Column: Quote & Big Stats */}
          <div className="lg:col-span-6 p-8 md:p-12 lg:p-14 flex flex-col justify-between bg-gray-50/70 border-b lg:border-b-0 lg:border-r border-gray-200">
            <div>
              {/* Tag / Eyebrow */}
              <div className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase mb-8 md:mb-12">
                IN THEIR WORDS
              </div>

              {/* Creator Quote in elegant serif lowercase */}
              <blockquote
                className="text-2xl sm:text-3xl md:text-4xl text-gray-900 font-light leading-snug tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "{currentCreator.quote || currentCreator.tagline || 'part of the creatorsync roster — reach engineered into recurring income.'}"
              </blockquote>
            </div>

            {/* Bottom Row: Followers Stat & Slider Arrows */}
            <div className="pt-8 md:pt-12 mt-6 border-t border-gray-200 flex items-end justify-between">
              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-950 tracking-tight font-sans">
                  {currentCreator.followersShort || currentCreator.subscribers.split(' ')[0]}
                </span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">
                  FOLLOWERS
                </span>
              </div>

              {/* Navigation Controls [ ← ] [ → ] */}
              <div className="flex items-center gap-2">
                <button
                  id="creator-prev-slide-btn"
                  onClick={handlePrev}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-white hover:bg-gray-100 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="Previous Creator"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  id="creator-next-slide-btn"
                  onClick={handleNext}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-white hover:bg-gray-100 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="Next Creator"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Creator Image */}
          <div className="lg:col-span-6 relative bg-gradient-to-br from-[#0c1f28] via-[#09151c] to-[#050C10] flex items-center justify-center overflow-hidden group min-h-[360px] lg:min-h-[480px]">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-radial from-[#1A4257]/30 via-transparent to-transparent pointer-events-none" />

            <img
              src={currentCreator.image}
              alt={currentCreator.name}
              className="w-full h-full object-cover object-center max-h-[520px] transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent hidden lg:block" />

            {/* Creator Name & Link Badge on Image */}
            <button
              onClick={() => onSelectCreator(currentCreator.id)}
              className="absolute bottom-6 left-6 inline-flex items-center gap-2 text-base md:text-lg font-bold text-white hover:text-white bg-black/70 hover:bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 transition-all cursor-pointer group/badge shadow-lg"
            >
              <span className="capitalize">{currentCreator.name}</span>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover/badge:text-white group-hover/badge:translate-x-0.5 group-hover/badge:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* BOTTOM THUMBNAIL ROSTER (Adapted for light mode with high-contrast text & borders) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {featuredCreators.map((creator, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={creator.id}
                id={`roster-thumb-${creator.id}`}
                onClick={() => setActiveIndex(index)}
                className={`relative text-left rounded-xl overflow-hidden aspect-[4/5] transition-all duration-200 group cursor-pointer bg-gray-100 ${
                  isActive
                    ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-white border-transparent shadow-lg shadow-emerald-500/20 scale-[1.02]'
                    : 'border border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100 shadow-sm'
                }`}
              >
                {/* Thumbnail Image */}
                <img
                  src={creator.image}
                  alt={creator.name}
                  className={`w-full h-full object-cover object-top transition-all duration-300 ${
                    isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette Bottom for legible white text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Name & Followers Label on Bottom */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-xs font-bold text-white truncate lowercase">
                    {creator.name}
                  </div>
                  <div className="text-[10px] font-medium text-gray-300 lowercase">
                    {creator.followersShort || creator.subscribers.split(' ')[0]}
                  </div>
                </div>

                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
