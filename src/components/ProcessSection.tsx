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

  const handleStartBrief = () => {
    const el = document.getElementById('campaign-lead-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/for-brands';
    }
  };

  const handleReplay = () => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    window.scrollTo({ top: containerTop, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="process-section"
      className="relative bg-[#080808] border-b border-[#222222] text-[#F5F5F5] h-[520vh]"
    >
      {/* Background ambient lighting matching ServicesSection */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] h-[450px] sm:h-[650px] bg-[#4F7CFF]/5 rounded-full blur-[140px] pointer-events-none" />
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
              className="text-3xl sm:text-4xl md:text-[40px] lg:text-[46px] font-extrabold tracking-tight text-[#F5F5F5] uppercase leading-[1.08] mb-4 sm:mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
            >
              FROM CREATOR DISCOVERY <br />
              <span className="text-[#6E6E6E]">TO CAMPAIGN IMPACT.</span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#909090] max-w-md font-normal leading-relaxed mb-6 sm:mb-8">
              A high-precision execution sequence built for modern brands. Scroll to step through our complete 6-stage campaign management architecture.
            </p>

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
            
            {/* Card Deck Unified Container Stage */}
            <div className="relative w-full max-w-[500px] sm:max-w-[530px] h-[390px] sm:h-[430px] md:h-[450px] flex items-center justify-center">

              {/* ── 6 INDIVIDUAL SLIDING PHYSICAL DECK CARDS (01 TO 06) ── */}
              {STEPS_DATA.map((step, idx) => (
                <DeckCard
                  key={step.number}
                  step={step}
                  index={idx}
                  totalSteps={STEPS_DATA.length}
                  scrollYProgress={scrollYProgress}
                  isActive={idx === activeStepIndex}
                />
              ))}

              {/* ── CAMPAIGN IMPACT CLIMAX FINISH ── */}
              <CampaignImpactClimax
                scrollYProgress={scrollYProgress}
                isVisible={isFullyCompleted}
                onAction={handleStartBrief}
                onReplay={handleReplay}
              />

            </div>

            {/* Scroll Indicator Prompt below deck */}
            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-[#777777]">
              <ChevronDown className="w-3.5 h-3.5 text-[#4F7CFF] animate-bounce" />
              <span>Scroll down to stack the next stage</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   SUBCOMPONENT: PHYSICAL DECK CARD
   Styling inspired by royal blue physical card reference.
   Card 01 starts in place; Cards 02-06 slide UP from underneath one by one,
   and settle with an offset forming the clean stacked card edges shown in reference.
   Covered cards smoothly fade out their inner text/content to 0.
   ───────────────────────────────────────────────────────────────────────────── */
interface DeckCardProps {
  step: ProcessStep;
  index: number;
  totalSteps: number;
  scrollYProgress: any;
  isActive: boolean;
}

const DeckCard: React.FC<DeckCardProps> = ({
  step,
  index,
  totalSteps,
  scrollYProgress,
  isActive
}) => {
  const IconComponent = step.icon;

  // Target settled offsets:
  // Each card is offset by 16px Y, 4px X, and consistent -1.5deg tilt (top-right higher, top-left lower)
  const targetY = -40 + index * 16;
  const targetX = -10 + index * 4;
  const targetRotate = -1.5;

  // Scroll milestones for each of the 6 cards:
  // Card 0 (01): Always present
  // Card 1 (02): Enters [0.14 -> 0.28], covers Card 01
  // Card 2 (03): Enters [0.30 -> 0.44], covers Card 02
  // Card 3 (04): Enters [0.46 -> 0.60], covers Card 03
  // Card 4 (05): Enters [0.62 -> 0.76], covers Card 04
  // Card 5 (06): Enters [0.78 -> 0.92], covers Card 05
  const enterStart = index === 0 ? 0 : 0.14 + (index - 1) * 0.16;
  const enterEnd = index === 0 ? 0 : enterStart + 0.14;
  const opacityStart = Math.max(0, enterStart - 0.02);
  const opacityFull = enterStart + 0.02;

  // Next card cover timing (when this card gets covered by index + 1):
  const nextCoverStart = enterEnd + 0.04;
  const nextCoverEnd = nextCoverStart + 0.12;

  // 1. Vertical Translation (Y):
  // Starts at '135%' (below container) and smoothly slides up to targetY
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [0, opacityStart, enterStart, enterEnd, 1],
    index === 0
      ? [`${targetY}px`, `${targetY}px`]
      : ['135%', '135%', '125%', `${targetY}px`, `${targetY}px`]
  );

  // 2. Horizontal Translation (X):
  const x = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [0, enterStart, enterEnd, 1],
    index === 0
      ? [`${targetX}px`, `${targetX}px`]
      : ['0px', '0px', `${targetX}px`, `${targetX}px`]
  );

  // 3. Overall Card Opacity:
  const cardOpacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [0, opacityStart, opacityFull, 1],
    index === 0
      ? [1, 1]
      : [0, 0, 1, 1]
  );

  // 4. Subtle Rotation: Consistent -1.5deg counter-clockwise tilt across all stacked cards
  const rotate = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [0, enterStart, enterEnd, 1],
    index === 0
      ? [`${targetRotate}deg`, `${targetRotate}deg`]
      : [`${targetRotate}deg`, `${targetRotate}deg`, `${targetRotate}deg`, `${targetRotate}deg`]
  );

  // 5. Card Inner Content Opacity:
  // When a card gets covered by the next card, its inner text/UI fades out to 0!
  const contentOpacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 0.16, 0.26, 1]
      : index === totalSteps - 1
      ? [0, enterStart, enterEnd, 1]
      : [0, enterStart, enterEnd, nextCoverStart, nextCoverEnd, 1],
    index === 0
      ? [1, 1, 0, 0]
      : index === totalSteps - 1
      ? [0, 0, 1, 1]
      : [0, 0, 1, 1, 0, 0]
  );

  // Z-index: Higher cards sit ON TOP of lower cards
  const zIndex = 10 + index * 10;

  return (
    <motion.div
      style={{
        y,
        x,
        rotate,
        opacity: cardOpacity,
        zIndex,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
      className={`absolute w-full h-[330px] sm:h-[360px] md:h-[370px] rounded-2xl sm:rounded-[22px] bg-[#111111] border select-none overflow-hidden text-white transition-colors duration-200 ${
        isActive
          ? 'border-[#333333] shadow-[0_4px_24px_rgba(0,0,0,0.45)]'
          : 'border-[#222222] shadow-[0_2px_12px_rgba(0,0,0,0.3)]'
      }`}
    >
      {/* Top subtle inner specular highlight for physical card sheen */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl pointer-events-none" />

      {/* ── CARD INNER CONTENT: Fades to 0 when covered by the next card ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="w-full h-full p-6 sm:p-7 md:p-8 flex flex-col justify-between"
      >
        {/* ── CARD TOP BAR ── */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            {/* Card Number 01 - 06 */}
            <div className="flex items-center gap-2.5">
              <span
                className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-[#F5F5F5]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {step.number}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#444444]" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#7A7A7A] uppercase">
                PHASE {step.stepCount}
              </span>
            </div>

            {/* Capability Tag Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#2D2D2D] text-[10px] sm:text-[11px] font-mono font-bold text-[#4F7CFF] shadow-sm">
              <span>{step.tag}</span>
            </div>
          </div>

          {/* ── STEP NAME & SUBTITLE ── */}
          <h3
            className="text-xl sm:text-2xl lg:text-[24px] font-bold text-[#F5F5F5] uppercase tracking-tight leading-snug mb-1"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {step.stepName}
          </h3>

          <div className="text-xs sm:text-sm font-medium text-[#A1A1A1] mb-3 sm:mb-4">
            {step.subtitle}
          </div>

          {/* Crisp Card Divider */}
          <div className="w-full h-px bg-[#1F1F1F] mb-3 sm:mb-4" />

          {/* Key Deliverables Bullet Points */}
          <div className="space-y-1.5 sm:space-y-2 mb-2">
            {step.deliverables.map((item, dIdx) => (
              <div key={dIdx} className="flex items-center gap-2 text-xs text-[#CCCCCC] font-normal">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7CFF] flex-shrink-0" />
                <span className="leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CARD FOOTER: OUTPUT BADGE ── */}
        <div className="pt-2.5 border-t border-[#1F1F1F] flex items-center justify-between gap-3 bg-[#0D0D0D]/90 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-3 rounded-b-2xl">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-2 h-2 rounded-full bg-[#4F7CFF] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#A1A1A1] truncate">
              {step.outputBadge}
            </span>
          </div>

          <div className="w-7 h-7 rounded-lg bg-[#181818] border border-[#2D2D2D] flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-3.5 h-3.5 text-[#4F7CFF]" />
          </div>
        </div>
      </motion.div>
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
        rotate: '-1.5deg',
        zIndex: 90,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      className="absolute inset-0 rounded-2xl sm:rounded-[22px] bg-[#111111] border border-[#333333] p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2D2D2D] text-[10px] font-mono font-bold text-[#4F7CFF] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#4F7CFF] animate-ping" />
            FINAL DESTINATION
          </div>
          <span className="text-xs font-mono font-bold text-[#34D399]">ALL 6 STAGES READY</span>
        </div>

        {/* Climax Title */}
        <div className="text-center py-1">
          <div className="text-xs font-mono font-bold text-[#4F7CFF] uppercase tracking-[0.3em] mb-1">
            ↓
          </div>
          <h3
            className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] uppercase leading-none mb-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            CAMPAIGN IMPACT
          </h3>
          <p className="text-xs sm:text-sm text-[#A1A1A1] max-w-sm mx-auto leading-relaxed">
            From first creator discovery to measurable audience conversion, your brand's growth story is engineered with precision.
          </p>
        </div>

        {/* 3 Value Metrics */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3">
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#161616] border border-[#262626] text-center">
            <div className="text-base sm:text-lg font-bold font-mono text-[#4F7CFF]">100%</div>
            <div className="text-[9px] sm:text-[10px] text-[#888888] uppercase font-bold">Brand Safe</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#161616] border border-[#262626] text-center">
            <div className="text-base sm:text-lg font-bold font-mono text-[#4F7CFF]">3.8x</div>
            <div className="text-[9px] sm:text-[10px] text-[#888888] uppercase font-bold">Avg. ROAS</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#161616] border border-[#262626] text-center">
            <div className="text-base sm:text-lg font-bold font-mono text-[#34D399]">Evergreen</div>
            <div className="text-[9px] sm:text-[10px] text-[#888888] uppercase font-bold">Traffic Flow</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-[#1F1F1F]">
        <button
          onClick={onAction}
          className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#4F7CFF] hover:bg-[#3B6AE8] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
        >
          <span>Launch Your Campaign Brief</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onReplay}
          className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#161616] hover:bg-[#202020] text-[#A1A1A1] hover:text-white font-mono text-xs font-bold transition-colors cursor-pointer border border-[#262626] flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Replay</span>
        </button>
      </div>
    </motion.div>
  );
};

