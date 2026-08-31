import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Eye, MapPin, Youtube, ExternalLink, Sparkles, Send, Play, BarChart3, Users, Globe } from 'lucide-react';
import { CREATORS } from '../data/creators';
import { CreatorCollabModal } from '../components/CreatorCollabModal';

interface CreatorProfileProps {
  creatorId: string;
  onBack: () => void;
  navigate: (path: string) => void;
}

export const CreatorProfile: React.FC<CreatorProfileProps> = ({ creatorId, onBack, navigate }) => {
  const creator = CREATORS.find((c) => c.id === creatorId) || CREATORS[0];
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);

  return (
    <div id="creator-profile-page" className="pt-28 pb-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A1A1A1] hover:text-[#4F7CFF] mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>

        {/* Profile Header Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#101010] border border-[#262626] mb-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            {/* Avatar + Main Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-[#141414] border-2 border-[#262626] flex-shrink-0">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#141414] border border-[#262626] text-[10px] font-bold text-[#4F7CFF] uppercase tracking-wider">
                    {creator.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#141414] border border-[#262626] text-[10px] font-bold text-[#F5F5F5] uppercase">
                    {creator.location}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#141414] border border-[#262626] text-[10px] font-bold text-[#A1A1A1] uppercase">
                    {creator.language}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F5F5F5] tracking-tight">
                    {creator.name}
                  </h1>
                  <CheckCircle2 className="w-5 h-5 text-[#4F7CFF] flex-shrink-0" />
                </div>

                <div className="text-xs sm:text-sm font-semibold text-[#A1A1A1] font-mono mb-3">
                  {creator.handle} • {creator.subscribers} Subscribers
                </div>

                <p className="text-xs sm:text-sm text-[#A1A1A1] max-w-xl leading-relaxed">
                  {creator.tagline}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => setIsCollabModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-[#4F7CFF]/20 flex items-center justify-center gap-2"
              >
                <span>Request Collaboration</span>
                <Send className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  navigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#141414] hover:bg-[#1C1C1C] text-[#F5F5F5] border border-[#262626] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
              >
                Agency Inquiry
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-[#101010] border border-[#262626]">
            <span className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-wider block mb-1">
              Subscribers
            </span>
            <div className="text-xl sm:text-2xl font-black text-[#F5F5F5]">
              {creator.subscribers}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#101010] border border-[#262626]">
            <span className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-wider block mb-1">
              Average Views
            </span>
            <div className="text-xl sm:text-2xl font-black text-[#4F7CFF]">
              {creator.averageViews}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#101010] border border-[#262626]">
            <span className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-wider block mb-1">
              Engagement Rate
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">
              {creator.engagement}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#101010] border border-[#262626]">
            <span className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-wider block mb-1">
              Location / Tier
            </span>
            <div className="text-sm sm:text-base font-bold text-[#F5F5F5] truncate mt-1">
              {creator.location}
            </div>
          </div>
        </div>

        {/* Main Content Grid: Demographics + Content Portfolio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Col: Audience Demographics (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101010] border border-[#262626]">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-[#4F7CFF]" />
                <h3 className="text-base font-bold text-[#F5F5F5]">
                  Audience Demographics
                </h3>
              </div>

              {/* Age Split */}
              <div className="mb-6">
                <span className="text-xs font-bold text-[#A1A1A1] uppercase tracking-wider block mb-2">
                  Primary Demographic
                </span>
                <div className="p-3 rounded-xl bg-[#141414] border border-[#262626] text-xs font-bold text-[#F5F5F5] mb-4">
                  {creator.audience.primaryAge}
                </div>
              </div>

              {/* Gender Split */}
              <div className="mb-6 pt-6 border-t border-[#1C1C1C]">
                <span className="text-xs font-bold text-[#A1A1A1] uppercase tracking-wider block mb-3">
                  Gender Ratio
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#141414] border border-[#262626] text-center">
                    <span className="text-xs text-[#A1A1A1] block">Male</span>
                    <span className="text-lg font-black text-[#F5F5F5]">{creator.audience.genderSplit.male}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#141414] border border-[#262626] text-center">
                    <span className="text-xs text-[#A1A1A1] block">Female</span>
                    <span className="text-lg font-black text-[#F5F5F5]">{creator.audience.genderSplit.female}%</span>
                  </div>
                </div>
              </div>

              {/* Top Geographic Hubs */}
              <div className="pt-6 border-t border-[#1C1C1C]">
                <span className="text-xs font-bold text-[#A1A1A1] uppercase tracking-wider block mb-3">
                  Top Audience Locations
                </span>
                <div className="flex flex-wrap gap-2">
                  {creator.audience.topLocations.map((loc) => (
                    <span
                      key={loc}
                      className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs font-medium text-[#F5F5F5]"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Interests */}
              <div className="pt-6 border-t border-[#1C1C1C]">
                <span className="text-xs font-bold text-[#A1A1A1] uppercase tracking-wider block mb-3">
                  Audience Affinity
                </span>
                <div className="flex flex-wrap gap-2">
                  {creator.audience.topInterests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs font-medium text-[#4F7CFF]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Past Brand Partners */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101010] border border-[#262626]">
              <h3 className="text-base font-bold text-[#F5F5F5] mb-4">
                Verified Past Brand Sponsors
              </h3>
              <div className="flex flex-wrap gap-2">
                {creator.pastBrands.map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs font-bold text-[#4F7CFF]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Video Showcase (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101010] border border-[#262626]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-[#4F7CFF]" />
                  <h3 className="text-base font-bold text-[#F5F5F5]">
                    Sample Brand Integrations
                  </h3>
                </div>
                <span className="text-xs text-[#A1A1A1]">Verified Uploads</span>
              </div>

              <div className="space-y-4">
                {creator.sampleVideos.map((vid, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#4F7CFF]/40 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#080808] border border-[#262626] flex items-center justify-center flex-shrink-0 text-[#4F7CFF]">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#F5F5F5] line-clamp-1">
                          {vid.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#A1A1A1] mt-0.5">
                          <span>{vid.duration}</span>
                          <span>•</span>
                          <span className="text-[#4F7CFF]">{vid.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-[#080808] px-2.5 py-1 rounded-md border border-[#262626]">
                        <Eye className="w-3 h-3" />
                        <span>{vid.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agency Assurance Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101010] border border-[#4F7CFF]/30">
              <div className="text-xs font-bold text-[#4F7CFF] uppercase tracking-widest mb-1">
                CreatorsSyncMedia Representation
              </div>
              <h4 className="text-lg font-bold text-[#F5F5F5] mb-2">
                Guaranteed Campaign Delivery & Brand Safety
              </h4>
              <p className="text-xs text-[#A1A1A1] leading-relaxed mb-4">
                All collaborations with {creator.name} are managed end-to-end by CreatorsSyncMedia, including custom scripts, FTC-compliant sponsorship disclaimers, high-res video drafts, and certified post-campaign metrics reports.
              </p>
              <button
                onClick={() => setIsCollabModalOpen(true)}
                className="px-6 py-2.5 bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
              >
                Inquire For Rates & Dates →
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        <CreatorCollabModal
          creator={creator}
          onClose={() => setIsCollabModalOpen(false)}
        />
      </div>
    </div>
  );
};
