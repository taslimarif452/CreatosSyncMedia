import React from 'react';
import { X, Eye, TrendingUp, ArrowRight, CheckCircle, Sparkles, Youtube } from 'lucide-react';
import { Campaign } from '../types';

interface CampaignDetailModalProps {
  campaign: Campaign | null;
  onClose: () => void;
  onStartCampaign: () => void;
}

export const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  campaign,
  onClose,
  onStartCampaign
}) => {
  if (!campaign) return null;

  return (
    <div
      id="campaign-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#101010] border border-[#262626] text-[#F5F5F5] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#262626] flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-md bg-[#080808] border border-[#262626] text-xs font-bold text-[#4F7CFF] uppercase">
              {campaign.type}
            </div>
            <span className="text-xs text-[#A1A1A1]">•</span>
            <span className="text-xs font-bold text-[#A1A1A1] uppercase tracking-wider">
              {campaign.brandCategory}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#101010] border border-[#262626] hover:text-[#4F7CFF] hover:border-[#4F7CFF] text-[#A1A1A1] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Hero Media + Headline */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#141414] border border-[#262626]">
            <img
              src={campaign.thumbnail}
              alt={campaign.title}
              className="w-full h-full object-cover filter contrast-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-black/30" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="px-3.5 py-1.5 rounded-xl bg-[#080808]/90 backdrop-blur-md border border-[#262626] text-sm font-bold text-[#F5F5F5] flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#4F7CFF]" />
                <span>{campaign.views}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-[#080808]/90 backdrop-blur-md border border-[#262626] text-sm font-bold text-emerald-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>{campaign.ctr}</span>
              </div>
            </div>
          </div>

          {/* Title & Brand Alignment */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#4F7CFF] mb-2">
              {campaign.brand} × {campaign.creatorName} ({campaign.creatorHandle})
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] uppercase tracking-tight">
              {campaign.title}
            </h3>
            <p className="mt-3 text-sm text-[#A1A1A1] leading-relaxed">
              {campaign.description}
            </p>
          </div>

          {/* Results Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1] mb-4">
              Verified Campaign Performance
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {campaign.results.map((res, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#141414] border border-[#262626] flex flex-col"
                >
                  <span className="text-2xl font-black text-[#4F7CFF]">{res.value}</span>
                  <span className="text-xs font-bold text-[#F5F5F5] uppercase mt-1">{res.metric}</span>
                  <span className="text-[11px] text-[#A1A1A1] mt-1">{res.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Objective, Strategy, Execution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#262626]">
            <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626]">
              <span className="text-[10px] font-bold tracking-widest text-[#4F7CFF] uppercase block mb-2">
                01 • Objective
              </span>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                {campaign.objective}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626]">
              <span className="text-[10px] font-bold tracking-widest text-[#4F7CFF] uppercase block mb-2">
                02 • Strategy
              </span>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                {campaign.strategy}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626]">
              <span className="text-[10px] font-bold tracking-widest text-[#4F7CFF] uppercase block mb-2">
                03 • Execution
              </span>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                {campaign.execution}
              </p>
            </div>
          </div>

          {/* Testimonial if available */}
          {campaign.testimonial && (
            <div className="p-6 rounded-2xl bg-[#141414] border border-[#4F7CFF]/30 relative">
              <p className="text-sm italic text-[#F5F5F5] mb-3">
                "{campaign.testimonial.quote}"
              </p>
              <div className="text-xs text-[#A1A1A1]">
                <strong className="text-[#F5F5F5]">{campaign.testimonial.author}</strong> — {campaign.testimonial.role}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom CTA */}
        <div className="p-6 border-t border-[#262626] bg-[#141414] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#A1A1A1]">
            Want similar creator-driven results for your brand?
          </span>
          <button
            onClick={() => {
              onClose();
              onStartCampaign();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-[#4F7CFF]/20"
          >
            <span>Start a Similar Campaign</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
