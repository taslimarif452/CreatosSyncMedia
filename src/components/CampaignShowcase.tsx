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
    <section id="campaigns-showcase-section" className="py-24 bg-white border-b border-[#E5E7EB] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF4FF] border border-[#BFDBFE] text-[11px] font-bold text-[#2563EB] uppercase tracking-widest mb-3">
              Verified Case Studies
            </div>
            <h2
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] leading-[1.1]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              campaigns that <br />
              <span className="text-[#64748B]">made noise.</span>
            </h2>
          </div>
          <button
            id="view-all-work-top-btn"
            disabled
            type="button"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#64748B] cursor-default pointer-events-none select-none"
          >
            <span>View All Work ({CAMPAIGNS.length})</span>
            <ArrowRight className="w-4 h-4 text-[#64748B]" />
          </button>
        </div>

        {/* Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Large Spotlight Campaign (Col 7) */}
          <div
            id={`spotlight-campaign-${spotlightCampaign.id}`}
            className="lg:col-span-7 group rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden flex flex-col justify-between shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-[#CBD5E1] transition-all cursor-default"
          >
            {/* Visual Thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#F1F5F9]">
              <img
                src={spotlightCampaign.thumbnail}
                alt={spotlightCampaign.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Tag & View Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-white/90 backdrop-blur-md border border-white/60 text-xs font-bold text-[#2563EB] uppercase shadow-sm">
                  {spotlightCampaign.type}
                </span>
              </div>

              {/* Huge Views Banner */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-sm">
                  <Eye className="w-3.5 h-3.5 text-[#60A5FA]" />
                  <span>{spotlightCampaign.views}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs font-bold text-emerald-400 shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{spotlightCampaign.ctr}</span>
                </div>
              </div>
            </div>

            {/* Campaign Meta */}
            <div className="p-6 sm:p-8">
              <div className="text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-2">
                {spotlightCampaign.brand} × {spotlightCampaign.creatorName}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-3">
                {spotlightCampaign.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                {spotlightCampaign.description}
              </p>

              {/* Key Results Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#E2E8F0]">
                {spotlightCampaign.results.map((res, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-sm font-black text-[#0F172A]">{res.value}</span>
                    <span className="text-[10px] text-[#64748B] uppercase font-semibold">{res.metric}</span>
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
              className="group rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden flex flex-col justify-between shadow-md shadow-slate-200/40 hover:shadow-lg hover:border-[#CBD5E1] transition-all cursor-default"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#F1F5F9]">
                <img
                  src={secondaryCampaign1.thumbnail}
                  alt={secondaryCampaign1.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-white/60 text-[10px] font-bold text-[#2563EB] uppercase shadow-sm">
                    {secondaryCampaign1.type}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-sm">
                  {secondaryCampaign1.views}
                </div>
              </div>

              <div className="p-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  {secondaryCampaign1.brand} × {secondaryCampaign1.creatorName}
                </div>
                <h4 className="text-base font-bold text-[#0F172A] mb-2">
                  {secondaryCampaign1.title}
                </h4>
                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B]">
                  <span className="font-semibold text-emerald-600">{secondaryCampaign1.ctr}</span>
                  <span className="font-semibold text-[#64748B]">
                    Verified Case Study
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              id={`secondary-campaign-${secondaryCampaign2.id}`}
              className="group rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden flex flex-col justify-between shadow-md shadow-slate-200/40 hover:shadow-lg hover:border-[#CBD5E1] transition-all cursor-default"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#F1F5F9]">
                <img
                  src={secondaryCampaign2.thumbnail}
                  alt={secondaryCampaign2.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-white/60 text-[10px] font-bold text-[#2563EB] uppercase shadow-sm">
                    {secondaryCampaign2.type}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-sm">
                  {secondaryCampaign2.views}
                </div>
              </div>

              <div className="p-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  {secondaryCampaign2.brand} × {secondaryCampaign2.creatorName}
                </div>
                <h4 className="text-base font-bold text-[#0F172A] mb-2">
                  {secondaryCampaign2.title}
                </h4>
                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B]">
                  <span className="font-semibold text-[#2563EB]">{secondaryCampaign2.engagementRate} Engagement</span>
                  <span className="font-semibold text-[#64748B]">
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
            className="inline-flex items-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-wider bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1] hover:bg-[#E2E8F0] rounded-xl cursor-default pointer-events-none select-none transition-colors"
          >
            <span>View All Campaign Case Studies</span>
            <ArrowRight className="w-4 h-4 text-[#64748B]" />
          </button>
        </div>
      </div>
    </section>
  );
};
