import React, { useState } from 'react';
import { Search, MapPin, Eye, ArrowRight, CheckCircle2, SlidersHorizontal, Youtube } from 'lucide-react';
import { CREATORS } from '../data/creators';
import { CreatorCategory } from '../types';

interface CreatorsPageProps {
  onSelectCreator: (creatorId: string) => void;
  navigate: (path: string) => void;
}

export const Creators: React.FC<CreatorsPageProps> = ({ onSelectCreator, navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CreatorCategory>('All');
  const [tierFilter, setTierFilter] = useState<'all' | 'mega' | 'macro' | 'rising'>('all');

  const categories: CreatorCategory[] = [
    'All',
    'Technology',
    'Gaming',
    'Finance',
    'Education',
    'Lifestyle',
    'Beauty',
    'Fitness',
    'Comedy'
  ];

  const filteredCreators = CREATORS.filter((creator) => {
    // Search query filter
    const matchesSearch =
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === 'All' || creator.category === selectedCategory;

    // Tier filter
    let matchesTier = true;
    const subCountRaw = creator.subscribers;
    if (tierFilter === 'mega') {
      matchesTier = subCountRaw.includes('M');
    } else if (tierFilter === 'macro') {
      matchesTier = subCountRaw.includes('K') && parseInt(subCountRaw) >= 400;
    } else if (tierFilter === 'rising') {
      matchesTier = subCountRaw.includes('K') && parseInt(subCountRaw) < 400;
    }

    return matchesSearch && matchesCategory && matchesTier;
  });

  return (
    <div id="creators-directory-page" className="pt-32 pb-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-4">
            Creator Directory & Talent Roster
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F5F5F5] leading-[1.05] mb-4">
            Find the Voices <br />
            <span className="text-[#A1A1A1]">Your Audience Trusts.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1A1] max-w-2xl leading-relaxed">
            Browse our vetted roster of 500+ top Indian YouTube creators across Technology, Finance, Gaming, Lifestyle, and Education.
          </p>
        </div>

        {/* Search Bar & Tier Filter Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-[#A1A1A1] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search creator by name, handle, niche, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#101010] border border-[#262626] focus:border-[#4F7CFF] text-sm text-[#F5F5F5] placeholder-[#555] outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A1A1A1] whitespace-nowrap">
              Tier:
            </span>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as any)}
              className="px-4 py-3.5 rounded-xl bg-[#101010] border border-[#262626] focus:border-[#4F7CFF] text-xs font-bold uppercase text-[#F5F5F5] outline-none cursor-pointer"
            >
              <option value="all">All Tiers (500+)</option>
              <option value="mega">Mega (1M+ Subs)</option>
              <option value="macro">Macro (400K - 1M)</option>
              <option value="rising">Rising (100K - 400K)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#4F7CFF] text-white shadow-md shadow-[#4F7CFF]/20'
                    : 'bg-[#101010] text-[#A1A1A1] border border-[#262626] hover:text-[#F5F5F5] hover:border-[#383838]'
                }`}
              >
                [{cat.toUpperCase()}]
              </button>
            );
          })}
        </div>

        {/* Creator Results Summary */}
        <div className="flex items-center justify-between text-xs text-[#A1A1A1] mb-6">
          <span>
            Showing <strong className="text-[#F5F5F5]">{filteredCreators.length}</strong> vetted creators
          </span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setTierFilter('all');
              }}
              className="text-[#4F7CFF] hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Creator Cards Grid */}
        {filteredCreators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCreators.map((creator) => (
              <div
                key={creator.id}
                id={`directory-creator-card-${creator.id}`}
                className="group relative rounded-2xl bg-[#101010] border border-[#262626] overflow-hidden flex flex-col justify-between cursor-default"
              >
                {/* Visual Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#141414]">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent opacity-80" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-[#080808]/85 backdrop-blur-md border border-[#262626] text-[10px] font-extrabold text-[#4F7CFF] uppercase">
                      {creator.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#080808]/85 backdrop-blur-md border border-[#262626] text-[10px] font-bold text-[#F5F5F5]">
                      {creator.engagement}
                    </span>
                  </div>

                  {/* Floating Footer info */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#F5F5F5]">
                    <div className="flex items-center gap-1.5 bg-[#080808]/70 px-2 py-1 rounded-md backdrop-blur-sm">
                      <MapPin className="w-3 h-3 text-[#A1A1A1]" />
                      <span className="text-[11px] text-[#A1A1A1]">{creator.location.split(',')[0]}</span>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-400 bg-[#080808]/70 px-2 py-1 rounded-md backdrop-blur-sm">
                      {creator.averageViews}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-[#F5F5F5] truncate">
                        {creator.name}
                      </h3>
                      <CheckCircle2 className="w-4 h-4 text-[#4F7CFF] flex-shrink-0" />
                    </div>
                    <div className="text-xs font-semibold text-[#A1A1A1] mb-2 font-mono">
                      {creator.subscribers} • {creator.handle}
                    </div>
                    <p className="text-xs text-[#A1A1A1] line-clamp-2 leading-relaxed">
                      {creator.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A1A1]">
                      Verified Roster Creator
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7CFF]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-[#101010] border border-[#262626] text-center">
            <p className="text-base font-bold text-[#F5F5F5] mb-2">No creators found matching your criteria.</p>
            <p className="text-xs text-[#A1A1A1] mb-4">Try searching for other keywords or categories.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setTierFilter('all');
              }}
              className="px-5 py-2.5 bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] text-xs font-bold text-[#F5F5F5] uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Creator Onboarding Callout */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#101010] border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">
              Are you a YouTube Creator?
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1A1]">
              Get listed in our verified agency directory and receive direct sponsor inquiries.
            </p>
          </div>
          <button
            onClick={() => {
              navigate('/for-creators');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-7 py-4 bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-[#4F7CFF]/20"
          >
            Apply To Join Directory →
          </button>
        </div>
      </div>
    </div>
  );
};
