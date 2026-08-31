import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  Compass,
  Layers,
  ChevronRight
} from 'lucide-react';
import {
  BRAND_SERVICES,
  CREATOR_SERVICES,
  BRAND_CAMPAIGN_FLOW,
  CREATOR_JOURNEY_STEPS,
  WHY_US_PILLARS,
  ServiceDetail
} from '../data/services';

interface ServicesPageProps {
  navigate?: (path: string) => void;
}

export const Services: React.FC<ServicesPageProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'brands' | 'creators'>('brands');

  useEffect(() => {
    const checkParams = () => {
      const url = window.location.href;
      if (url.includes('tab=creators')) {
        setActiveTab('creators');
      } else if (url.includes('tab=brands')) {
        setActiveTab('brands');
      }

      if (window.location.hash) {
        const hash = window.location.hash;
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    };

    checkParams();
    window.addEventListener('popstate', checkParams);
    return () => window.removeEventListener('popstate', checkParams);
  }, []);

  const handleNav = (path: string) => {
    if (navigate) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div id="services-page" className="min-h-screen bg-[#080808] text-[#F5F5F5] pt-28 sm:pt-32 pb-24 overflow-x-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          01 — HERO SECTION
          ───────────────────────────────────────────────────────────── */}
      <section id="services-hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        {/* Top Breadcrumb / Agency Tag */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-10 sm:mb-14 text-xs font-mono tracking-widest text-[#A1A1A1]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4F7CFF] animate-pulse" />
            <span className="font-extrabold tracking-tight text-[#F5F5F5]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
              Creators<span className="text-[#4F7CFF]">Sync</span>Media.
            </span>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#141414] border border-[#262626] text-[#F5F5F5] font-bold">
            Services
          </span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Big Editorial Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101010] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] tracking-widest mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5" /> Full-Cycle Agency Capabilities
            </div>

            <h1
              className="text-2xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-[#EDEDED] leading-[1.25] mb-6 max-w-3xl"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Services That Turn <br />
              <span className="text-[#9A9A9A] font-light">Creator Influence</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E2E8F0] to-[#4F7CFF] font-medium">
                Into Brand Impact.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#A1A1A1] max-w-xl leading-relaxed mb-8 sm:mb-10 font-normal">
              From finding the right creator to managing the entire campaign — we engineer authentic creator integrations that build enduring customer trust and measurable revenue.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                id="hero-start-campaign-btn"
                onClick={() => handleNav('/contact')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-white/10"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-join-network-btn"
                onClick={() => handleNav('/for-creators')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#101010] hover:bg-[#161616] text-[#F5F5F5] border border-[#262626] hover:border-[#4F7CFF]/50 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                <span>Join Network</span>
                <ArrowUpRight className="w-4 h-4 text-[#A1A1A1]" />
              </button>
            </div>
          </div>

          {/* Right Column: Premium Creator Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-[#101010] border border-[#262626] p-3 shadow-2xl overflow-hidden group">
              {/* Background gradient blur */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#4F7CFF]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative aspect-[4/4.5] rounded-xl overflow-hidden bg-[#141414]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  alt="CreatorsSyncMedia Production"
                  className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/30" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080808]/90 backdrop-blur-md border border-[#262626] text-[11px] font-bold text-[#F5F5F5]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4F7CFF]" /> Verified Roster
                  </span>
                </div>

                {/* Bottom Overlay Metric */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#080808]/90 backdrop-blur-md border border-[#262626] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[#A1A1A1] tracking-wider mb-0.5">
                      Agency Network Reach
                    </div>
                    <div className="text-lg font-black text-[#F5F5F5] font-mono">
                      500+ Creators • 100M+ Views
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#4F7CFF]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          02 — AUDIENCE SWITCHER
          ───────────────────────────────────────────────────────────── */}
      <section id="audience-switcher-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-mono font-bold tracking-widest text-[#4F7CFF] mb-3">
            Who Are You?
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#F5F5F5] tracking-tight mb-6">
            Choose Your Collaboration Path
          </h2>

          {/* Interactive Switcher Pill */}
          <div
            id="audience-switcher-tabs"
            className="inline-flex p-1.5 rounded-2xl bg-[#101010] border border-[#262626] shadow-xl"
          >
            <button
              id="switch-to-brands-tab"
              type="button"
              onClick={() => setActiveTab('brands')}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'brands'
                  ? 'bg-white text-black shadow-md'
                  : 'text-[#A1A1A1] hover:text-[#F5F5F5]'
              }`}
            >
              <Zap className={`w-4 h-4 ${activeTab === 'brands' ? 'text-black' : 'text-[#4F7CFF]'}`} />
              <span>For Brands</span>
            </button>

            <button
              id="switch-to-creators-tab"
              type="button"
              onClick={() => setActiveTab('creators')}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'creators'
                  ? 'bg-white text-black shadow-md'
                  : 'text-[#A1A1A1] hover:text-[#F5F5F5]'
              }`}
            >
              <Users className={`w-4 h-4 ${activeTab === 'creators' ? 'text-black' : 'text-[#4F7CFF]'}`} />
              <span>For Creators</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          03, 04, 06 — FOR BRANDS VIEW
          ───────────────────────────────────────────────────────────── */}
      {activeTab === 'brands' && (
        <div id="brands-view-container" className="animate-fadeIn">
          {/* 03 — FOR BRANDS INTRO */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#101010] border border-[#262626] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F7CFF]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] tracking-widest mb-4">
                  For Brands
                </div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#EDEDED] tracking-tight leading-[1.25] mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  You Bring the Brand. <br />
                  <span className="text-[#9A9A9A] font-light">We Bring the Right Creators.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
                  Build campaigns that reach people through creators they already watch, trust, and follow. We eliminate guesswork with audited audience demographics and guaranteed deliverable management.
                </p>
              </div>
            </div>
          </section>

          {/* 04 & 05 — BRAND SERVICES (EDITORIAL ASYMMETRIC LAYOUT & HOVER) */}
          <section id="brand-services-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Row 1: Card 01 & 02 (Col 6 each) */}
              <div className="md:col-span-6">
                <ServiceCard service={BRAND_SERVICES[0]} onAction={() => handleNav('/contact')} />
              </div>
              <div className="md:col-span-6">
                <ServiceCard service={BRAND_SERVICES[1]} onAction={() => handleNav('/contact')} />
              </div>

              {/* Row 2: Card 03 & 04 (Col 6 each) */}
              <div className="md:col-span-6">
                <ServiceCard service={BRAND_SERVICES[2]} onAction={() => handleNav('/contact')} />
              </div>
              <div className="md:col-span-6">
                <ServiceCard service={BRAND_SERVICES[3]} onAction={() => handleNav('/contact')} />
              </div>

              {/* Row 3: Card 05 (Full-width Col 12) */}
              <div className="md:col-span-12">
                <WideServiceCard service={BRAND_SERVICES[4]} onAction={() => handleNav('/contact')} />
              </div>

              {/* Row 4: Card 06, 07, 08 (Col 4 each) */}
              <div className="md:col-span-4">
                <ServiceCard service={BRAND_SERVICES[5]} onAction={() => handleNav('/contact')} />
              </div>
              <div className="md:col-span-4">
                <ServiceCard service={BRAND_SERVICES[6]} onAction={() => handleNav('/contact')} />
              </div>
              <div className="md:col-span-4">
                <ServiceCard service={BRAND_SERVICES[7]} onAction={() => handleNav('/contact')} />
              </div>

            </div>
          </section>

          {/* 06 — BRAND CAMPAIGN FLOW */}
          <section id="brand-campaign-flow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="p-8 sm:p-14 rounded-3xl bg-[#101010] border border-[#262626]">
              {/* Flow Header */}
              <div className="mb-12 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] tracking-widest mb-3">
                  Workflow Precision
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#F5F5F5] tracking-tight">
                  From Brief to Campaign Impact
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1A1] mt-2">
                  A seamless 4-step execution architecture engineered for high return on ad spend.
                </p>
              </div>

              {/* 4 Flow Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative mb-12">
                {BRAND_CAMPAIGN_FLOW.map((step, idx) => (
                  <div
                    key={step.step}
                    className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#4F7CFF]/40 transition-colors flex flex-col justify-between relative group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl font-black font-mono text-[#4F7CFF]">
                          {step.step}
                        </span>
                        {idx < BRAND_CAMPAIGN_FLOW.length - 1 && (
                          <ChevronRight className="w-5 h-5 text-[#262626] hidden lg:block" />
                        )}
                      </div>
                      <h3 className="text-base font-bold text-[#F5F5F5] mb-1">
                        {step.title}
                      </h3>
                      <div className="text-xs font-semibold text-[#4F7CFF] mb-2">
                        {step.tagline}
                      </div>
                      <p className="text-xs text-[#A1A1A1] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Performance & Results Pathway */}
              <div className="p-6 rounded-2xl bg-[#080808] border border-[#262626] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#4F7CFF]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest text-[#F5F5F5]">
                      Campaign Execution Flow
                    </div>
                    <div className="text-xs text-[#A1A1A1]">
                      Brand → Campaign → Creator → Promotion → Results
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleNav('/contact')}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Brief Your Campaign →
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          07, 08, 09 — FOR CREATORS VIEW
          ───────────────────────────────────────────────────────────── */}
      {activeTab === 'creators' && (
        <div id="creators-view-container" className="animate-fadeIn">
          {/* 07 — FOR CREATORS INTRO */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#101010] border border-[#262626] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F7CFF]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] tracking-widest mb-4">
                  For Creators
                </div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#EDEDED] tracking-tight leading-[1.25] mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Your Audience Has Value. <br />
                  <span className="text-[#9A9A9A] font-light">Your Influence Has Value.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed mb-8">
                  We connect creators with brands looking for authentic voices and meaningful collaborations. Get verified brand deals, fair market compensation, and zero administrative headache.
                </p>

                <button
                  onClick={() => handleNav('/for-creators')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all duration-200 cursor-pointer shadow-lg"
                >
                  <span>Join Creator Network</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* 08 — CREATOR SERVICES (EDITORIAL LAYOUT) */}
          <section id="creator-services-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Row 1: Card 01 & 02 (Col 6 each) */}
              <div className="md:col-span-6">
                <ServiceCard service={CREATOR_SERVICES[0]} onAction={() => handleNav('/for-creators')} />
              </div>
              <div className="md:col-span-6">
                <ServiceCard service={CREATOR_SERVICES[1]} onAction={() => handleNav('/for-creators')} />
              </div>

              {/* Row 2: Card 03 & 04 (Col 6 each) */}
              <div className="md:col-span-6">
                <ServiceCard service={CREATOR_SERVICES[2]} onAction={() => handleNav('/for-creators')} />
              </div>
              <div className="md:col-span-6">
                <ServiceCard service={CREATOR_SERVICES[3]} onAction={() => handleNav('/for-creators')} />
              </div>

              {/* Row 3: Card 05 (Full-width Col 12) */}
              <div className="md:col-span-12">
                <WideServiceCard service={CREATOR_SERVICES[4]} onAction={() => handleNav('/for-creators')} />
              </div>

              {/* Row 4: Card 06 & 07 (Col 6 each) */}
              <div className="md:col-span-6">
                <ServiceCard service={CREATOR_SERVICES[5]} onAction={() => handleNav('/for-creators')} />
              </div>
              <div className="md:col-span-6">
                <ServiceCard service={CREATOR_SERVICES[6]} onAction={() => handleNav('/for-creators')} />
              </div>

            </div>
          </section>

          {/* 09 — CREATOR JOURNEY */}
          <section id="creator-journey-flow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="p-8 sm:p-14 rounded-3xl bg-[#101010] border border-[#262626]">
              {/* Journey Header */}
              <div className="mb-12 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] tracking-widest mb-3">
                  Roster Onboarding
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#F5F5F5] tracking-tight">
                  How Creators Work with Us
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1A1] mt-2">
                  A straightforward pathway to premium brand partnerships and recurring sponsorship deals.
                </p>
              </div>

              {/* 4 Journey Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {CREATOR_JOURNEY_STEPS.map((step, idx) => (
                  <div
                    key={step.step}
                    className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#4F7CFF]/40 transition-colors flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl font-black font-mono text-[#4F7CFF]">
                          {step.step}
                        </span>
                        {idx < CREATOR_JOURNEY_STEPS.length - 1 && (
                          <ChevronRight className="w-5 h-5 text-[#262626] hidden lg:block" />
                        )}
                      </div>
                      <h3 className="text-base font-bold text-[#F5F5F5] mb-1">
                        {step.title}
                      </h3>
                      <div className="text-xs font-semibold text-[#4F7CFF] mb-2">
                        {step.tagline}
                      </div>
                      <p className="text-xs text-[#A1A1A1] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Journey CTA Banner */}
              <div className="p-6 rounded-2xl bg-[#080808] border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-[#4F7CFF]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest text-[#F5F5F5]">
                      100% Free for Creators
                    </div>
                    <div className="text-xs text-[#A1A1A1]">
                      No sign-up fees • No exclusive lock-in • Prompt payouts
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleNav('/for-creators')}
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Join the Network →
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          10 — WHY CREATORSYNCMEDIA (DIFFERENTIATORS)
          ───────────────────────────────────────────────────────────── */}
      <section id="why-creatorsync-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#101010] border border-[#262626]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-[#4F7CFF] mb-2 block">
              Why Us?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight leading-tight">
              Not Just Connections. <br />
              <span className="text-[#A1A1A1]">The Right Connections.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_US_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-8 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#4F7CFF]/40 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="text-2xl font-mono font-black text-[#4F7CFF] mb-4">
                    {pillar.number}
                  </div>
                  <h3 className="text-lg font-bold text-[#F5F5F5] mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#4F7CFF] mb-3">
                    {pillar.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11 — FINAL CTA
          ───────────────────────────────────────────────────────────── */}
      <section id="final-services-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#121212] to-[#080808] border border-[#262626] text-center relative overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#4F7CFF]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#4F7CFF] mb-3 block">
              Ready to Make an Impact?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight mb-8">
              Have a Campaign in Mind?
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="services-final-start-campaign-btn"
                onClick={() => handleNav('/contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-white/10"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs font-bold text-[#A1A1A1] tracking-widest px-2">
                or
              </span>

              <button
                id="services-final-join-network-btn"
                onClick={() => handleNav('/for-creators')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#141414] hover:bg-[#1C1C1C] text-[#F5F5F5] border border-[#262626] hover:border-[#4F7CFF]/50 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                <span>Join Creator Network</span>
                <ArrowUpRight className="w-4 h-4 text-[#A1A1A1]" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

// Subcomponent: Standard Asymmetric Service Card with Interactive Hover State
interface ServiceCardProps {
  service: ServiceDetail;
  onAction?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onAction }) => {
  return (
    <div
      id={`service-${service.id}`}
      onClick={onAction}
      className="group relative rounded-2xl bg-[#101010] border border-[#262626] hover:border-[#4F7CFF]/60 p-7 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[300px] transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer shadow-lg"
    >
      {/* Background Image / Video Texture with Subtle Scale on Hover */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden pointer-events-none">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/80 to-transparent" />
      </div>

      {/* Top Meta */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-black font-mono text-[#4F7CFF] tracking-tight">
            {service.number}
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#141414] border border-[#262626] group-hover:border-[#4F7CFF]/50 flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4 text-[#A1A1A1] group-hover:text-[#4F7CFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] tracking-tight mb-2 group-hover:text-white transition-colors">
          {service.title}
        </h3>

        <div className="text-xs font-semibold text-[#4F7CFF] mb-3">
          {service.tagline}
        </div>

        <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Bottom Deliverables Pill Bar */}
      {service.deliverables && (
        <div className="relative z-10 pt-4 mt-4 border-t border-[#1C1C1C] flex flex-wrap gap-2">
          {service.deliverables.map((item, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold text-[#A1A1A1] bg-[#141414] px-2.5 py-1 rounded-md border border-[#262626]"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Subcomponent: Wide Asymmetric Service Card (e.g. Card 05)
const WideServiceCard: React.FC<ServiceCardProps> = ({ service, onAction }) => {
  return (
    <div
      id={`service-${service.id}`}
      onClick={onAction}
      className="group relative rounded-2xl bg-[#101010] border border-[#262626] hover:border-[#4F7CFF]/60 p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
    >
      {/* Background Image / Video Texture */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-500 overflow-hidden pointer-events-none">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101010] via-[#101010]/80 to-transparent" />
      </div>

      {/* Left Col (Col 7) */}
      <div className="relative z-10 lg:col-span-7">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl font-black font-mono text-[#4F7CFF] tracking-tight">
            {service.number}
          </span>
          {service.highlightBadge && (
            <span className="px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[10px] font-bold text-[#4F7CFF] tracking-wider">
              {service.highlightBadge}
            </span>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight mb-2 group-hover:text-white transition-colors">
          {service.title}
        </h3>

        <div className="text-xs font-semibold text-[#4F7CFF] mb-3">
          {service.tagline}
        </div>

        <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed max-w-xl">
          {service.description}
        </p>
      </div>

      {/* Right Col (Col 5): Deliverables Grid */}
      <div className="relative z-10 lg:col-span-5 flex flex-col justify-between h-full pt-4 lg:pt-0 lg:border-l lg:border-[#1C1C1C] lg:pl-8">
        <div className="text-xs font-bold uppercase tracking-widest text-[#F5F5F5] mb-3">
          Included Scope:
        </div>

        <div className="space-y-2">
          {service.deliverables?.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 text-xs text-[#A1A1A1] bg-[#141414]/90 p-2.5 rounded-lg border border-[#262626]"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7CFF] flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 flex items-center justify-end">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4F7CFF] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
            Inquire Details <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
