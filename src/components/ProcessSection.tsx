import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import {
  Sparkles,
  Compass,
  FileCheck,
  Video,
  Zap,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  RotateCcw
} from 'lucide-react';

interface ProcessStep {
  number: string;
  stepCount: string;
  stepName: string;
  tag: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  outputBadge: string;
  icon: React.ElementType;
}

const STEPS_DATA: ProcessStep[] = [
  {
    number: '01',
    stepCount: '1/6',
    stepName: 'CREATOR DISCOVERY',
    tag: 'CORE CAPABILITY ↗',
    subtitle: 'Find the right creators for your audience.',
    description:
      'We audit and identify high-performing creators with hyper-relevant audience demographics, verified engagement rates, and authentic brand alignment.',
    deliverables: [
      'Audience Demographics & Geo Verification',
      'Historical Engagement & Video Retention Scoring',
      'Category & Direct Competitor Saturation Check'
    ],
    outputBadge: 'OUTPUT: Curated 15-Creator Roster with >95% ICP Match',
    icon: Compass
  },
  {
    number: '02',
    stepCount: '2/6',
    stepName: 'CAMPAIGN STRATEGY',
    tag: 'CREATIVE DIRECTION ↗',
    subtitle: 'Tailor bespoke integration hooks & narratives.',
    description:
      'We craft tailored talking points, organic integration angles, and high-retention storytelling frameworks designed to convert viewers without feeling like an ad.',
    deliverables: [
      'Bespoke Integration Angles & Narrative Hooks',
      'Offer Positioning & Call-to-Action Framing',
      'Custom Trackable URL & Promo Code Architecture'
    ],
    outputBadge: 'OUTPUT: Complete Creative Brief & Conversion Blueprint',
    icon: Sparkles
  },
  {
    number: '03',
    stepCount: '3/6',
    stepName: 'OUTREACH & NEGOTIATION',
    tag: 'TALENT MANAGEMENT ↗',
    subtitle: 'Direct talent contracting & locked-in rates.',
    description:
      'We manage creator pitching, deliverable scheduling, usage rights, paid whitelisting terms, and lock in preferential agency rates.',
    deliverables: [
      'Direct Creator & Management Outreach',
      'Usage Rights, Exclusivity & Whitelisting Terms',
      'Milestone-Based Escrow & Payment Protection'
    ],
    outputBadge: 'OUTPUT: 100% Locked Deliverables & Signed Creator Contracts',
    icon: FileCheck
  },
  {
    number: '04',
    stepCount: '4/6',
    stepName: 'CONTENT PRODUCTION',
    tag: 'QUALITY ASSURANCE ↗',
    subtitle: 'Brand safety & perfection before go-live.',
    description:
      'End-to-end quality assurance across video script checkpoints, draft previews, product messaging accuracy, FTC compliance, and brand revisions.',
    deliverables: [
      'Storyboard & Script Draft Review Checkpoints',
      'Frame-by-Frame Video Draft & Audio Inspection',
      'FTC Disclosures & Platform Compliance QA'
    ],
    outputBadge: 'OUTPUT: Fully Approved, Brand-Safe Video Ready for Release',
    icon: Video
  },
  {
    number: '05',
    stepCount: '5/6',
    stepName: 'LAUNCH & DISTRIBUTION',
    tag: 'OMNICHANNEL AMPLIFICATION ↗',
    subtitle: 'Coordinated rollouts & pinned engagement.',
    description:
      'Synchronized multi-creator release schedules, pinned comment tracking, community reaction monitoring, and multi-platform promotional amplification.',
    deliverables: [
      'Synchronized Multi-Creator Publishing Windows',
      'Top-Pinned Comment & Community Link Anchoring',
      'Real-Time Go-Live Monitoring & Link Routing QA'
    ],
    outputBadge: 'OUTPUT: Algorithmic Feed Dominance & Immediate Traffic Influx',
    icon: Zap
  },
  {
    number: '06',
    stepCount: '6/6',
    stepName: 'ANALYTICS & ATTRIBUTION',
    tag: 'MEASURE & SCALE ↗',
    subtitle: 'Full-funnel reporting & scalable ROI.',
    description:
      'Comprehensive post-campaign analytics covering reach, retention, click-through rates, customer acquisition cost, and long-tail evergreen traffic.',
    deliverables: [
      'Real-Time Views, CPM & Engagement Rate Reporting',
      'Down-Funnel Conversion & ROAS Attribution',
      'Evergreen Organic Discovery Tracking (90-Day Window)'
    ],
    outputBadge: 'OUTPUT: Executive ROI Dossier & Future Scaling Roadmap',
    icon: TrendingUp
  }
];

export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isFullyCompleted, setIsFullyCompleted] = useState<boolean>(false);

  // Monitor scroll progress across the full sticky timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.16) {
      setActiveStepIndex(0);
      setIsFullyCompleted(false);
    } else if (latest < 0.32) {
      setActiveStepIndex(1);
      setIsFullyCompleted(false);
    } else if (latest < 0.48) {
      setActiveStepIndex(2);
      setIsFullyCompleted(false);
    } else if (latest < 0.64) {
      setActiveStepIndex(3);
      setIsFullyCompleted(false);
    } else if (latest < 0.80) {
      setActiveStepIndex(4);
      setIsFullyCompleted(false);
    } else if (latest < 0.92) {
      setActiveStepIndex(5);
      setIsFullyCompleted(false);
    } else {
      setActiveStepIndex(5);
      setIsFullyCompleted(true);
    }
  });

  const scrollToStep = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetProgress = index === 6 ? 0.96 : (index * 0.155) + 0.05;
    const scrollTarget = containerTop + (containerHeight * targetProgress);
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  };

  const handleStartBrief = () => {
    const el = document.getElementById('campaign-lead-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/for-brands';
    }
  };

  return (
    <section
      ref={containerRef}
      id="process-section"
      className="relative bg-[#080808] border-b border-[#202020] text-[#F5F5F5] h-[550vh]"
    >
      {/* Background ambient lighting */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[550px] sm:w-[750px] h-[380px] sm:h-[550px] bg-[#2E5BFF]/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] sm:w-[650px] h-[320px] sm:h-[480px] bg-[#1E3A8A]/20 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-grid-subtle opacity-25" />
      </div>

      {/* Sticky Main Stage Container */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center items-center z-10 px-4 sm:px-6 lg:px-12 py-4 sm:py-8 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: EDITORIAL HEADLINE & STAGE PROGRESS
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-center select-none">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#262626] text-[10px] sm:text-[11px] font-mono font-bold text-[#4F7CFF] uppercase tracking-[0.25em] mb-4 w-fit shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] animate-pulse" />
              <span>THE PROCESS</span>
            </div>

            {/* Main Headline */}
            <h2
              className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#F5F5F5] uppercase leading-[1.08] mb-4 sm:mb-6"
              style={{ fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif" }}
            >
              FROM CREATOR DISCOVERY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#888888] via-[#BBBBBB] to-[#4F7CFF]">
                TO CAMPAIGN IMPACT.
              </span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed max-w-lg mb-5 sm:mb-7 font-normal">
              A high-precision execution sequence built for modern brands. Scroll to step through our complete 6-stage campaign management architecture.
            </p>

            {/* Interactive Step Tabs & Progress Bar */}
            <div className="space-y-3 mb-6 sm:mb-8 max-w-md">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#777777] mb-1">
                <span>STAGE {STEPS_DATA[activeStepIndex].number} OF 06</span>
                <span className="text-[#4F7CFF] font-semibold">{STEPS_DATA[activeStepIndex].stepName}</span>
              </div>

              {/* Progress Scrub Bar */}
              <div className="w-full h-1.5 bg-[#181818] rounded-full overflow-hidden border border-[#262626]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#3B71CA] via-[#4F7CFF] to-[#60A5FA]"
                  style={{
                    width: `${((activeStepIndex + 1) / 6) * 100}%`,
                    transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>

              {/* Step Buttons (01 - 06) */}
              <div className="grid grid-cols-6 gap-1.5 pt-1">
                {STEPS_DATA.map((step, idx) => {
                  const isActive = idx === activeStepIndex;
                  const isPast = idx < activeStepIndex;
                  return (
                    <button
                      key={step.number}
                      onClick={() => scrollToStep(idx)}
                      title={`Jump to ${step.stepName}`}
                      className={`group py-2 rounded-xl text-center font-mono text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer border ${
                        isActive
                          ? 'bg-[#3B71CA] text-white border-[#60A5FA] shadow-[0_0_15px_rgba(59,113,202,0.5)] scale-105'
                          : isPast
                          ? 'bg-[#18233C] text-[#93C5FD] border-[#254BA6] hover:border-[#60A5FA]'
                          : 'bg-[#0E0E0E] text-[#666666] border-[#1E1E1E] hover:border-[#333333] hover:text-[#999999]'
                      }`}
                    >
                      {step.number}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Button & Status */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleStartBrief}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg hover:shadow-white/10"
              >
                <span>Start Your Campaign</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="hidden sm:flex items-center gap-2 px-3.5 py-3 rounded-xl bg-[#121212] border border-[#242424] text-[11px] text-[#A1A1A1] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#4F7CFF] animate-pulse" />
                <span>100% Managed Execution</span>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: PHYSICAL STACKED-CARD DECK (MATCHING REFERENCE)
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full">
            
            {/* Card Deck Wrapper Container - Angled subtly like reference image (-4deg tilt) */}
            <div className="relative w-full max-w-[530px] h-[410px] sm:h-[440px] flex items-center justify-center -rotate-2 sm:-rotate-3 transition-transform duration-500">

              {/* ── 6 INDIVIDUAL SLIDING PHYSICAL DECK CARDS (01 TO 06) ── */}
              {STEPS_DATA.map((step, idx) => (
                <DeckCard
                  key={step.number}
                  step={step}
                  index={idx}
                  totalSteps={STEPS_DATA.length}
                  scrollYProgress={scrollYProgress}
                  activeStepIndex={activeStepIndex}
                />
              ))}

              {/* ── CAMPAIGN IMPACT CLIMAX FINISH ── */}
              <CampaignImpactClimax
                scrollYProgress={scrollYProgress}
                isVisible={isFullyCompleted}
                onAction={handleStartBrief}
                onReplay={() => scrollToStep(0)}
              />

            </div>

            {/* Scroll Indicator Prompt below deck */}
            <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-[#777777]">
              <ChevronDown className="w-3.5 h-3.5 text-[#4F7CFF] animate-bounce" />
              <span>Scroll down to slide next card from below</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   SUBCOMPONENT: PHYSICAL DECK CARD
   Styling inspired by the attached royal blue physical card reference.
   Card 01 starts in center; Cards 02-06 slide UP from underneath one by one,
   and settle with an offset forming the stacked fan shown in the reference image.
   ───────────────────────────────────────────────────────────────────────────── */
interface DeckCardProps {
  step: ProcessStep;
  index: number;
  totalSteps: number;
  scrollYProgress: any;
  activeStepIndex: number;
}

const DeckCard: React.FC<DeckCardProps> = ({
  step,
  index,
  totalSteps,
  scrollYProgress
}) => {
  const IconComponent = step.icon;

  // Scroll milestones for each of the 6 cards:
  // Step 01 (index 0): Active [0.00 -> 0.15]
  // Step 02 (index 1): Slides up from bottom [0.15 -> 0.28], active [0.28 -> 0.32]
  // Step 03 (index 2): Slides up from bottom [0.31 -> 0.44], active [0.44 -> 0.48]
  // Step 04 (index 3): Slides up from bottom [0.47 -> 0.60], active [0.60 -> 0.64]
  // Step 05 (index 4): Slides up from bottom [0.63 -> 0.76], active [0.76 -> 0.80]
  // Step 06 (index 5): Slides up from bottom [0.79 -> 0.91], active [0.91 -> 1.00]

  // Entry timing for this card:
  const enterStart = index === 0 ? 0 : 0.15 + (index - 1) * 0.16;
  const enterEnd = index === 0 ? 0 : enterStart + 0.13;

  // When card enters from below:
  // Y position: 135% (below deck) -> 0% (exact center active position)
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 0.16, 0.32, 0.48, 0.64, 0.80, 0.92, 1]
      : [0, Math.max(0, enterStart - 0.03), enterStart, enterEnd, 1],
    index === 0
      ? ['0px', '0px', '-10px', '-18px', '-26px', '-34px', '-40px', '-40px']
      : ['135%', '135%', '130%', '0%', '0%']
  );

  // X offset: Sits at 0px when entering/active. As subsequent cards enter, it shifts left (-6px per card)
  // to form the fanned stacked deck from the attached image!
  const x = useTransform(
    scrollYProgress,
    [0, enterEnd, enterEnd + 0.16, enterEnd + 0.32, enterEnd + 0.48, 1],
    ['0px', '0px', '-7px', '-14px', '-21px', `-${(totalSteps - 1 - index) * 7}px`]
  );

  // Rotation: Sits flat (0deg) when active. As cards stack on top, rotates slightly (-1deg per level)
  const rotate = useTransform(
    scrollYProgress,
    [0, enterEnd, enterEnd + 0.16, enterEnd + 0.32, 1],
    ['0deg', '0deg', '-0.8deg', '-1.6deg', `-${(totalSteps - 1 - index) * 0.8}deg`]
  );

  // Opacity: Invisible (0) until scroll nears its entry threshold, then 1
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [0, Math.max(0, enterStart - 0.04), enterStart, enterEnd, 1],
    index === 0
      ? [1, 1]
      : [0, 0, 0.4, 1, 1]
  );

  // Scale: 0.96 when in stack, 1 when active on top
  const scale = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 0.18, 0.90, 1]
      : [0, enterStart, enterEnd, 1],
    index === 0
      ? [1, 0.98, 0.95, 0.95]
      : [0.94, 0.95, 1, 1]
  );

  // Z-index: Higher index card slides ON TOP of previous cards
  const zIndex = 10 + index * 10;

  return (
    <motion.div
      style={{
        y,
        x,
        rotate,
        scale,
        opacity,
        zIndex
      }}
      className="absolute w-full h-[370px] sm:h-[400px] rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-[#3B71CA] via-[#2F61B8] to-[#1E428F] border-[2px] border-[#60A5FA]/80 p-6 sm:p-8 flex flex-col justify-between shadow-[0_22px_55px_rgba(0,0,0,0.85)] select-none overflow-hidden text-white"
    >
      {/* Top subtle inner specular highlight for physical card sheen */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* ── CARD TOP BAR ── */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          {/* Card Number 01 - 06 */}
          <div className="flex items-center gap-2.5">
            <span
              className="text-2xl sm:text-3xl font-mono font-black tracking-tight text-white drop-shadow-sm"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {step.number}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-blue-100 uppercase">
              PHASE {step.stepCount}
            </span>
          </div>

          {/* Capability Tag Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-mono font-bold text-white shadow-sm">
            <span>{step.tag}</span>
          </div>
        </div>

        {/* ── STEP NAME & SUBTITLE ── */}
        <h3
          className="text-xl sm:text-2xl lg:text-[26px] font-black text-white uppercase tracking-tight leading-snug mb-1 drop-shadow-sm"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {step.stepName}
        </h3>

        <div className="text-xs sm:text-sm font-semibold text-blue-100 mb-3 sm:mb-4">
          {step.subtitle}
        </div>

        {/* Crisp Card Divider */}
        <div className="w-full h-px bg-white/20 mb-3 sm:mb-4" />

        {/* Key Deliverables Bullet Points */}
        <div className="space-y-2 mb-2">
          {step.deliverables.map((item, dIdx) => (
            <div key={dIdx} className="flex items-center gap-2 text-xs text-blue-50 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-white flex-shrink-0" />
              <span className="leading-tight">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CARD FOOTER: OUTPUT BADGE ── */}
      <div className="pt-2.5 border-t border-white/20 flex items-center justify-between gap-3 bg-black/25 backdrop-blur-sm -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-3 rounded-b-[26px] sm:rounded-b-[30px]">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold text-blue-100 truncate">
            {step.outputBadge}
          </span>
        </div>

        <div className="w-7 h-7 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   SUBCOMPONENT: CAMPAIGN IMPACT CLIMAX FINALE
   Appears smoothly after Card 06 completes at the finish of the scroll sequence
   ───────────────────────────────────────────────────────────────────────────── */
interface CampaignImpactClimaxProps {
  scrollYProgress: any;
  isVisible: boolean;
  onAction: () => void;
  onReplay: () => void;
}

const CampaignImpactClimax: React.FC<CampaignImpactClimaxProps> = ({
  scrollYProgress,
  isVisible,
  onAction,
  onReplay
}) => {
  const opacity = useTransform(scrollYProgress, [0.91, 0.96, 1], [0, 0.95, 1]);
  const scale = useTransform(scrollYProgress, [0.91, 0.96, 1], [0.93, 1, 1]);
  const y = useTransform(scrollYProgress, [0.91, 0.96, 1], ['25px', '0px', '0px']);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        zIndex: 90,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      className="absolute inset-0 rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-[#0D1627] via-[#090F1C] to-[#04060A] border-[2px] border-[#3B71CA] p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_80px_rgba(59,113,202,0.45)] backdrop-blur-2xl"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B71CA]/20 border border-[#3B71CA]/50 text-[10px] font-mono font-bold text-[#60A5FA] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-ping" />
            FINAL DESTINATION
          </div>
          <span className="text-xs font-mono font-bold text-[#34D399]">ALL 6 STAGES READY</span>
        </div>

        {/* Climax Title */}
        <div className="text-center py-1">
          <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-[0.3em] mb-1">
            ↓
          </div>
          <h3
            className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase leading-none mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            CAMPAIGN IMPACT
          </h3>
          <p className="text-xs sm:text-sm text-[#A1A1A1] max-w-sm mx-auto leading-relaxed">
            From first creator discovery to measurable audience conversion, your brand's growth story is engineered with precision.
          </p>
        </div>

        {/* 3 Value Metrics */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#111A2E] border border-[#1E3056] text-center">
            <div className="text-base sm:text-lg font-black font-mono text-[#60A5FA]">100%</div>
            <div className="text-[9px] sm:text-[10px] text-[#93C5FD] uppercase font-bold">Brand Safe</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#111A2E] border border-[#1E3056] text-center">
            <div className="text-base sm:text-lg font-black font-mono text-[#93C5FD]">3.8x</div>
            <div className="text-[9px] sm:text-[10px] text-[#93C5FD] uppercase font-bold">Avg. ROAS</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#111A2E] border border-[#1E3056] text-center">
            <div className="text-base sm:text-lg font-black font-mono text-[#34D399]">Evergreen</div>
            <div className="text-[9px] sm:text-[10px] text-[#93C5FD] uppercase font-bold">Traffic Flow</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-[#1C2842]">
        <button
          onClick={onAction}
          className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#3B71CA] hover:bg-[#2F61B8] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg flex items-center justify-center gap-2"
        >
          <span>Launch Your Campaign Brief</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onReplay}
          className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#111A2E] hover:bg-[#1A2640] text-[#93C5FD] hover:text-white font-mono text-xs font-bold transition-colors cursor-pointer border border-[#23355C] flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Replay</span>
        </button>
      </div>
    </motion.div>
  );
};

