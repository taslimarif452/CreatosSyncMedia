import React, { useState } from 'react';
import { ArrowDown, Check, RefreshCw, Sparkles, Sliders, ShieldCheck, Target } from 'lucide-react';

export const MatchEngine: React.FC = () => {
  const [activeNiche, setActiveNiche] = useState<'tech' | 'fintech' | 'gaming' | 'lifestyle'>('tech');
  const [activeGoal, setActiveGoal] = useState<'conversion' | 'launch' | 'awareness'>('launch');
  const [isSimulating, setIsSimulating] = useState(false);

  const matchData = {
    tech: {
      brand: 'Consumer Tech Brand',
      goalLabel: activeGoal === 'launch' ? 'Flagship Product Launch' : activeGoal === 'conversion' ? 'High-Intent E-Com Sales' : 'Long-Term Authority',
      creator: 'Rohit Sharma (@TechInsightsIN)',
      creatorCat: 'Hardware & Mobile',
      audienceFit: 96,
      contentFit: 94,
      brandFit: 92,
      reachEst: '1.4M Subscribers',
      highlight: 'High audience overlap in Tier 1 Indian metros (78% 18-34 demographic).'
    },
    fintech: {
      brand: 'WealthTech / Credit App',
      goalLabel: activeGoal === 'launch' ? 'New Feature Adoption' : activeGoal === 'conversion' ? 'KYC Verified Accounts' : 'Financial Trust Building',
      creator: 'Ananya Verma (@FinDecoded)',
      creatorCat: 'Personal Finance & Tax',
      audienceFit: 98,
      contentFit: 95,
      brandFit: 94,
      reachEst: '920K Subscribers',
      highlight: 'Zero negative sponsor fatigue; 82% corporate salaried audience.'
    },
    gaming: {
      brand: 'Esports Rig / Energy Drink',
      goalLabel: activeGoal === 'launch' ? 'Tournament Livestream Integration' : activeGoal === 'conversion' ? 'Hardware Pre-Orders' : 'Community Virality',
      creator: 'Kabir Sengupta (@PixelKabir)',
      creatorCat: 'Competitive Esports',
      audienceFit: 95,
      contentFit: 97,
      brandFit: 90,
      reachEst: '2.1M Subscribers',
      highlight: '8.2% Engagement rate with deeply engaged Gen-Z gaming discord.'
    },
    lifestyle: {
      brand: 'Clean Skincare / D2C Apparel',
      goalLabel: activeGoal === 'launch' ? 'Seasonal Line Drop' : activeGoal === 'conversion' ? 'Direct Checkout via Promo' : 'Aesthetic Lifestyle Placement',
      creator: 'Tanya Kapoor (@GlowWithTanya)',
      creatorCat: 'Clean Beauty & Routine',
      audienceFit: 94,
      contentFit: 96,
      brandFit: 93,
      reachEst: '650K Subscribers',
      highlight: '9.3% engagement rate with audited non-sponsored tone credibility.'
    }
  };

  const currentMatch = matchData[activeNiche];

  const handleNicheChange = (niche: 'tech' | 'fintech' | 'gaming' | 'lifestyle') => {
    setIsSimulating(true);
    setActiveNiche(niche);
    setTimeout(() => {
      setIsSimulating(false);
    }, 300);
  };

  return (
    <section id="match-engine-section" className="py-24 bg-[#080808] border-b border-[#262626]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-3">
            Algorithmic + Editorial Curation
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            The Right Creator <br />
            <span className="text-[#A1A1A1]">Changes Everything.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A1A1A1] max-w-xl mx-auto">
            We don't match brands with the biggest creators. <br className="hidden sm:block" />
            <span className="text-[#F5F5F5] font-semibold">We match them with the right creators.</span>
          </p>
        </div>

        {/* Interactive Simulation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#101010] border border-[#262626] mb-12">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A1A1A1]">
              Select Niche:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(['tech', 'fintech', 'gaming', 'lifestyle'] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => handleNicheChange(n)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    activeNiche === n
                      ? 'bg-[#4F7CFF] text-white'
                      : 'bg-[#141414] text-[#A1A1A1] hover:text-[#F5F5F5] border border-[#262626]'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A1A1A1]">
              Goal:
            </span>
            <div className="flex gap-1.5">
              {(['launch', 'conversion', 'awareness'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGoal(g)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    activeGoal === g
                      ? 'bg-[#F5F5F5] text-[#080808]'
                      : 'bg-[#141414] text-[#A1A1A1] hover:text-[#F5F5F5] border border-[#262626]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The Animated Pipeline Flow */}
        <div className="relative flex flex-col items-center max-w-lg mx-auto">
          {/* Step 1: YOUR BRAND */}
          <div className="w-full p-5 rounded-2xl bg-[#101010] border border-[#262626] text-center shadow-lg transition-all">
            <span className="text-[10px] font-bold tracking-widest text-[#A1A1A1] uppercase block mb-1">
              Step 01
            </span>
            <div className="text-lg font-bold text-[#F5F5F5] tracking-wide">
              Your Brand ({currentMatch.brand})
            </div>
          </div>

          {/* Connector Arrow */}
          <div className="flex flex-col items-center my-2 text-[#4F7CFF]">
            <div className="w-px h-6 bg-[#262626]" />
            <ArrowDown className="w-4 h-4 text-[#4F7CFF] my-0.5" />
          </div>

          {/* Step 2: CAMPAIGN GOAL */}
          <div className="w-full p-5 rounded-2xl bg-[#101010] border border-[#262626] text-center shadow-lg transition-all">
            <span className="text-[10px] font-bold tracking-widest text-[#A1A1A1] uppercase block mb-1">
              Step 02
            </span>
            <div className="text-base font-bold text-[#F5F5F5] tracking-wide">
              Campaign Goal: <span className="text-[#4F7CFF]">{currentMatch.goalLabel}</span>
            </div>
          </div>

          {/* Connector Arrow */}
          <div className="flex flex-col items-center my-2 text-[#4F7CFF]">
            <div className="w-px h-6 bg-[#262626]" />
            <ArrowDown className="w-4 h-4 text-[#4F7CFF] my-0.5" />
          </div>

          {/* Step 3: CREATORSYNCMEDIA MATCH ENGINE */}
          <div className="w-full p-6 rounded-2xl bg-[#141414] border border-[#4F7CFF]/40 text-center shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[#4F7CFF]/5" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080808] border border-[#262626] text-[10px] font-extrabold text-[#4F7CFF] uppercase tracking-widest mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Proprietary Algorithm</span>
              </div>
              <div className="text-xl font-extrabold text-[#F5F5F5] tracking-tight">
                CreatorsSyncMedia Match Engine
              </div>
              <p className="text-xs text-[#A1A1A1] mt-1 max-w-sm mx-auto">
                Auditing demographic alignment, historical video retention & non-sponsored sentiment.
              </p>
            </div>
          </div>

          {/* Connector Arrow */}
          <div className="flex flex-col items-center my-2 text-[#4F7CFF]">
            <div className="w-px h-6 bg-[#262626]" />
            <ArrowDown className="w-4 h-4 text-[#4F7CFF] my-0.5" />
          </div>

          {/* Step 4: PERFECT CREATOR MATCH */}
          <div
            className={`w-full p-6 sm:p-7 rounded-2xl bg-[#101010] border ${
              isSimulating ? 'border-[#262626] opacity-60' : 'border-emerald-500/40'
            } shadow-2xl transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#262626]">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#A1A1A1] uppercase">
                  Optimal Match
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-[#F5F5F5]">
                  {currentMatch.creator}
                </h4>
                <span className="text-xs text-[#4F7CFF] font-medium">
                  {currentMatch.creatorCat} • {currentMatch.reachEst}
                </span>
              </div>

              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Check className="w-3.5 h-3.5" />
                <span>PERFECT MATCH</span>
              </div>
            </div>

            {/* Fit Metrics Breakdown */}
            <div className="space-y-3 mb-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#F5F5F5] mb-1">
                  <span>Audience Demographics Fit</span>
                  <span className="text-[#4F7CFF]">{currentMatch.audienceFit}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#141414] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4F7CFF] rounded-full transition-all duration-700"
                    style={{ width: `${currentMatch.audienceFit}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#F5F5F5] mb-1">
                  <span>Content & Editorial Fit</span>
                  <span className="text-[#4F7CFF]">{currentMatch.contentFit}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#141414] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4F7CFF] rounded-full transition-all duration-700"
                    style={{ width: `${currentMatch.contentFit}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#F5F5F5] mb-1">
                  <span>Brand Safety & Category Exclusivity</span>
                  <span className="text-[#4F7CFF]">{currentMatch.brandFit}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#141414] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4F7CFF] rounded-full transition-all duration-700"
                    style={{ width: `${currentMatch.brandFit}%` }}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-[#A1A1A1] bg-[#141414] p-3 rounded-lg border border-[#262626]">
              <strong className="text-[#F5F5F5]">Rationale:</strong> {currentMatch.highlight}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
