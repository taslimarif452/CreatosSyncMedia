import React from 'react';
import { ArrowRight, ArrowUpRight, Play, Eye, TrendingUp, Sparkles } from 'lucide-react';
import { CAMPAIGNS } from '../data/campaigns';
import { Campaign } from '../types';

interface CampaignShowcaseProps {
  onSelectCampaign: (campaign: Campaign) => void;
  onViewAllWork?: () => void;
}

export const CampaignShowcase: React.FC<CampaignShowcaseProps> = ({
  onSelectCampaign
}) => {
  const spotlightCampaign = CAMPAIGNS[0]; // Asus ROG Gaming
  const secondaryCampaign1 = CAMPAIGNS[1]; // Fintech CRED
  const secondaryCampaign2 = CAMPAIGNS[2]; // boAt Audio

  return (
    <section id="campaigns-showcase-section" className="py-24 bg-[#080808] border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-3">
              Verified Case Studies
            </div>
            <h2
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              campaigns that <br />
              <span className="text-[#A1A1A1]">made noise.</span>
            </h2>
          </div>
          <button
            id="view-all-work-top-btn"
            disabled
            type="button"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A1A1A1] cursor-default pointer-events-none select-none"
          >
            <span>View All Work ({CAMPAIGNS.length})</span>
            <ArrowRight className="w-4 h-4 text-[#A1A1A1]" />
          </button>
        </div>

        {/* Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Large Spotlight Campaign (Col 7) */}
          <div
            id={`spotlight-campaign-${spotlightCampaign.id}`}
            className="lg:col-span-7 group rounded-2xl bg-[#101010] border border-[#262626] overflow-hidden flex flex-col justify-between shadow-2xl cursor-default"
          >
            {/* Visual Thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#141414]">
              <img
                src={spotlightCampaign.thumbnail}
                alt={spotlightCampaign.title}
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-black/30" />

              {/* Tag & View Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#080808]/90 backdrop-blur-md border border-[#262626] text-xs font-bold text-[#4F7CFF] uppercase">
                  {spotlightCampaign.type}
                </span>
              </div>

              {/* Huge Views Banner */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#080808]/90 backdrop-blur-md border border-[#262626] text-xs font-bold text-[#F5F5F5]">
                  <Eye className="w-3.5 h-3.5 text-[#4F7CFF]" />
                  <span>{spotlightCampaign.views}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#080808]/90 backdrop-blur-md border border-[#262626] text-xs font-bold text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{spotlightCampaign.ctr}</span>
                </div>
              </div>
            </div>

            {/* Campaign Meta */}
            <div className="p-6 sm:p-8">
              <div className="text-xs font-bold uppercase tracking-widest text-[#4F7CFF] mb-2">
                {spotlightCampaign.brand} × {spotlightCampaign.creatorName}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#F5F5F5] mb-3">
                {spotlightCampaign.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed mb-6">
                {spotlightCampaign.description}
              </p>

              {/* Key Results Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#1C1C1C]">
                {spotlightCampaign.results.map((res, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-sm font-black text-[#F5F5F5]">{res.value}</span>
                    <span className="text-[10px] text-[#A1A1A1] uppercase font-semibold">{res.metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Stack (Col 5 - Asymmetric Offset) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Card 2 */}
            <div
              id={`secondary-campaign-${secondaryCampaign1.id}`}
              className="group rounded-2xl bg-[#101010] border border-[#262626] overflow-hidden flex flex-col justify-between cursor-default"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#141414]">
                <img
                  src={secondaryCampaign1.thumbnail}
                  alt={secondaryCampaign1.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#080808]/85 backdrop-blur-md border border-[#262626] text-[10px] font-bold text-[#4F7CFF] uppercase">
                    {secondaryCampaign1.type}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#080808]/85 backdrop-blur-md border border-[#262626] text-xs font-bold text-[#F5F5F5]">
                  {secondaryCampaign1.views}
                </div>
              </div>

              <div className="p-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1] mb-1">
                  {secondaryCampaign1.brand} × {secondaryCampaign1.creatorName}
                </div>
                <h4 className="text-base font-bold text-[#F5F5F5] mb-2">
                  {secondaryCampaign1.title}
                </h4>
                <div className="flex items-center justify-between pt-3 border-t border-[#1C1C1C] text-xs text-[#A1A1A1]">
                  <span>{secondaryCampaign1.ctr}</span>
                  <span className="font-semibold text-[#A1A1A1]">
                    Verified Case Study
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              id={`secondary-campaign-${secondaryCampaign2.id}`}
              className="group rounded-2xl bg-[#101010] border border-[#262626] overflow-hidden flex flex-col justify-between cursor-default"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#141414]">
                <img
                  src={secondaryCampaign2.thumbnail}
                  alt={secondaryCampaign2.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#080808]/85 backdrop-blur-md border border-[#262626] text-[10px] font-bold text-[#4F7CFF] uppercase">
                    {secondaryCampaign2.type}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#080808]/85 backdrop-blur-md border border-[#262626] text-xs font-bold text-[#F5F5F5]">
                  {secondaryCampaign2.views}
                </div>
              </div>

              <div className="p-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1] mb-1">
                  {secondaryCampaign2.brand} × {secondaryCampaign2.creatorName}
                </div>
                <h4 className="text-base font-bold text-[#F5F5F5] mb-2">
                  {secondaryCampaign2.title}
                </h4>
                <div className="flex items-center justify-between pt-3 border-t border-[#1C1C1C] text-xs text-[#A1A1A1]">
                  <span>{secondaryCampaign2.engagementRate} Engagement</span>
                  <span className="font-semibold text-[#A1A1A1]">
                    Verified Case Study
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Work CTA */}
        <div className="mt-14 text-center">
          <button
            id="view-all-work-bottom-btn"
            disabled
            type="button"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-wider bg-[#101010] text-[#A1A1A1] border border-[#262626] rounded-xl cursor-default pointer-events-none select-none"
          >
            <span>View All Campaign Case Studies</span>
            <ArrowRight className="w-4 h-4 text-[#A1A1A1]" />
          </button>
        </div>
      </div>
    </section>
  );
};
