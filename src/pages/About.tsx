import React from 'react';
import { ArrowRight, CheckCircle2, Flame, Layers, ShieldCheck, Sparkles, Target, Users, Zap, MapPin, Mail, Phone, MessageSquare } from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const About: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div id="about-page" className="pt-32 pb-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-4">
            Agency Philosophy & Identity
          </div>
          <h1
            className="text-2xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-[#EDEDED] leading-[1.25] mb-6 max-w-3xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            We Believe the Best Marketing <br />
            <span className="text-[#9A9A9A] font-light">Doesn't Feel Like</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E2E8F0] to-[#4F7CFF] font-medium">
              Marketing.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1A1] max-w-2xl leading-relaxed">
            CreatorsSync Media is a creator-led growth and marketing studio helping ambitious brands and education businesses turn digital attention into meaningful business outcomes. We bring together strategy, creators, content, and distribution to build campaigns that connect with the right audience and drive real action.
          </p>
        </div>

        {/* Core Mission Block */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-widest block mb-2">
              Our Core Thesis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5] leading-snug mb-4">
              Attention Has Migrated to Creators. Influence Has Migrated to Trust.
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed mb-4">
              Consumers no longer trust billboard banners or generic programmatic popups. They buy because a creator they have watched for five years demonstrated how a laptop performs under pressure, explained why a financial app simplified their taxes, or integrated a product into their genuine daily routine.
            </p>
            <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
              We eliminate the chaos of creator marketing—handling vetted talent matching, contract negotiations, script framing, production oversight, and verified conversion metrics.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-black text-[#4F7CFF] mb-1">500+</div>
              <div className="text-xs font-bold text-[#F5F5F5]">Vetted Creators</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-black text-[#4F7CFF] mb-1">50M+</div>
              <div className="text-xs font-bold text-[#F5F5F5]">Monthly Reach</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-black text-[#4F7CFF] mb-1">100+</div>
              <div className="text-xs font-bold text-[#F5F5F5]">Live Campaigns</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-black text-[#4F7CFF] mb-1">Pan-India</div>
              <div className="text-xs font-bold text-[#F5F5F5]">Regional Reach</div>
            </div>
          </div>
        </div>

        {/* 4 Guiding Principles */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-widest">
              Standard Of Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F5] mt-2">
              Our Agency Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-2xl bg-[#101010] border border-[#262626]">
              <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-[#4F7CFF]" />
              </div>
              <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
                Zero Vanity Metrics
              </h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                We measure genuine retention, verified link clicks, conversions, and brand recall—not shallow bot impressions.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#101010] border border-[#262626]">
              <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-[#4F7CFF]" />
              </div>
              <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
                Brand Safety Vetting
              </h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Every creator on our roster is audited for past controversies, organic sentiment, and category exclusivity.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#101010] border border-[#262626]">
              <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-[#4F7CFF]" />
              </div>
              <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
                Narrative Integration
              </h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                We refuse boring cookie-cutter scripts. We craft natural story arcs that integrate your product seamlessly into creator content.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#101010] border border-[#262626]">
              <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-[#4F7CFF]" />
              </div>
              <h3 className="text-base font-bold text-[#F5F5F5] mb-2">
                Velocity & Execution
              </h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Rapid turnaround from initial campaign brief to creator sign-off in under 10 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Agency Office & Contact Details */}
        <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-[#101010] border border-[#262626]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-widest">
              Direct Contact & Headquarters
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5] mt-2">
              Our Location & Communication Channels
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1A1] mt-2">
              Have an urgent inquiry, partnership request, or campaign brief? Connect with our leadership and creator team directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] flex items-center justify-center text-[#4F7CFF] mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] block mb-1">
                  Email
                </span>
                <a
                  href="mailto:partnerships@creatorssyncmedia.in"
                  className="text-sm font-semibold text-[#F5F5F5] hover:text-[#4F7CFF] transition-colors break-all block"
                >
                  partnerships@creatorssyncmedia.in
                </a>
              </div>
              <a
                href="mailto:partnerships@creatorssyncmedia.in"
                className="mt-4 text-xs font-medium text-[#4F7CFF] hover:underline inline-flex items-center gap-1"
              >
                <span>Send Email</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] flex items-center justify-center text-emerald-400 mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] block mb-1">
                  Call & WhatsApp
                </span>
                <a
                  href="tel:+918108975875"
                  className="text-sm font-semibold text-[#F5F5F5] hover:text-[#4F7CFF] transition-colors block"
                >
                  +91 8108975875
                </a>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://wa.me/918108975875"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp Chat</span>
                </a>
                <span className="text-[#333333]">•</span>
                <a
                  href="tel:+918108975875"
                  className="text-xs font-medium text-[#9CA3AF] hover:text-white"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] flex items-center justify-center text-[#4F7CFF] mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] block mb-1">
                  Address
                </span>
                <p className="text-sm font-semibold text-[#F5F5F5] leading-snug">
                  Ghatkopar West Mumbai Maharashtra 400086
                </p>
              </div>
              <span className="mt-4 text-xs text-[#737373]">
                Mumbai, Maharashtra, India
              </span>
            </div>
          </div>
        </div>

        {/* CTA Block */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#101010] border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">
              Ready to Collaborate with CreatorsSyncMedia?
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1A1]">
              Whether you are a global brand or an ambitious Indian startup, we are ready to scale your influence.
            </p>
          </div>
          <button
            onClick={() => {
              navigate('/contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-[#4F7CFF]/20"
          >
            Schedule Strategy Call →
          </button>
        </div>
      </div>
    </div>
  );
};
