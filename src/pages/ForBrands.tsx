import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Sparkles, Target, Zap, ShieldCheck, Video, HelpCircle } from 'lucide-react';
import { BRAND_FAQS } from '../data/services';
import { CampaignForm } from '../components/CampaignForm';
import { MatchEngine } from '../components/MatchEngine';

interface ForBrandsPageProps {
  navigate: (path: string) => void;
}

export const ForBrands: React.FC<ForBrandsPageProps> = ({ navigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const campaignFormats = [
    {
      title: 'YouTube 60-90s Dedicated Integration',
      desc: 'Seamless organic segment baked natively into high-retention long-form videos with custom trackable discount links.'
    },
    {
      title: 'Exclusive Dedicated Video Spotlight',
      desc: 'An entire 10-15 minute video created specifically around your product launch, teardown, or tutorial.'
    },
    {
      title: 'Multi-Creator Coordinated Launch Wave',
      desc: '5-15 creators posting within a 48-hour synchronized window to dominate algorithmic feeds.'
    },
    {
      title: 'Viral Shorts & Reels Blitz',
      desc: 'High-velocity vertical video format engineered for top-of-funnel reach and viral trend jacking.'
    },
    {
      title: 'Long-Term Brand Ambassador Tier',
      desc: 'Quarterly and annual recurring integrations building deep, unquestioned brand association.'
    }
  ];

  return (
    <div id="for-brands-page" className="pt-32 pb-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-4">
            Built For Growth Teams & Brand Marketers
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F5F5F5] leading-[1.05] mb-6 max-w-4xl">
            Your Audience Is Already Watching. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F5] via-[#FFFFFF] to-[#4F7CFF]">
              Let's Make Sure They're Watching You.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1A1] max-w-2xl leading-relaxed mb-8">
            Traditional banner ads get skipped. Algorithmic creator endorsements get shared, trusted, and acted upon. CreatorsSyncMedia gives your brand direct access to India's most credible digital creators.
          </p>

          <button
            onClick={() => {
              const el = document.getElementById('campaign-lead-form-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#F5F5F5] hover:bg-[#4F7CFF] text-[#080808] hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xl"
          >
            <span>Start a Campaign Brief</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: Why Creator Marketing */}
        <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-[#101010] border border-[#262626]">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-widest">
              Shift In Consumer Attention
            </span>
            <h2 className="text-3xl font-black text-[#F5F5F5] mt-2">
              Why Creator Marketing Outperforms Standard Ads
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626]">
              <div className="text-3xl font-black text-[#4F7CFF] font-mono mb-2">4.7x</div>
              <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
                Higher Intent & Trust
              </h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Audiences perceive creator recommendations as authentic peer reviews rather than cold corporate advertisements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626]">
              <div className="text-3xl font-black text-[#4F7CFF] font-mono mb-2">100%</div>
              <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
                Ad-Block Proof Integration
              </h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Native long-form YouTube integrations are baked directly into the video file—permanently visible and unblockable.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626]">
              <div className="text-3xl font-black text-[#4F7CFF] font-mono mb-2">Evergreen</div>
              <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
                Long-Tail SEO Discovery
              </h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                YouTube videos rank in search and continue generating high-intent traffic for 12–24 months post-upload.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: How We Match */}
        <div className="mb-24">
          <MatchEngine />
        </div>

        {/* Section 3: Campaign Formats Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-widest">
              Custom Execution Models
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F5] mt-2">
              Flexible Campaign Formats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaignFormats.map((fmt, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl bg-[#101010] border border-[#262626] hover:border-[#4F7CFF]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center text-xs font-mono font-bold text-[#4F7CFF] mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
                    {fmt.title}
                  </h3>
                  <p className="text-xs text-[#A1A1A1] leading-relaxed">
                    {fmt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Brand FAQs */}
        <div className="mb-24 p-8 sm:p-14 rounded-3xl bg-[#101010] border border-[#262626]">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-widest">
              Common Questions
            </span>
            <h2 className="text-3xl font-extrabold text-[#F5F5F5] mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {BRAND_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#F5F5F5]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#4F7CFF] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed border-t border-[#1C1C1C]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 5: Campaign Form */}
        <CampaignForm />
      </div>
    </div>
  );
};
