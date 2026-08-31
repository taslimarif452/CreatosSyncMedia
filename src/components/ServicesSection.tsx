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
  ChevronDown
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService?: (serviceId: string) => void;
  onViewAllServices?: () => void;
}

interface ServiceCardData {
  number: string;
  id: string;
  stepCount: string;
  title: string;
  tag: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  outputBadge: string;
  icon: React.ElementType;
}

const SERVICES_DECK: ServiceCardData[] = [
  {
    number: '01',
    id: 'creator-discovery',
    stepCount: '1/6',
    title: 'CREATOR DISCOVERY',
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
    id: 'campaign-strategy',
    stepCount: '2/6',
    title: 'YOUTUBE CAMPAIGNS',
    tag: 'CREATIVE DIRECTION ↗',
    subtitle: 'Integrations, dedicated videos & Shorts.',
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
    id: 'brand-partnerships',
    stepCount: '3/6',
    title: 'BRAND PARTNERSHIPS',
    tag: 'TALENT MANAGEMENT ↗',
    subtitle: 'Long-term partnerships that build advocacy.',
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
    id: 'campaign-management',
    stepCount: '4/6',
    title: 'CAMPAIGN MANAGEMENT',
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
    id: 'creative-strategy',
    stepCount: '5/6',
    title: 'CREATIVE STRATEGY',
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
    id: 'performance-reporting',
    stepCount: '6/6',
    title: 'PERFORMANCE & REPORTING',
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

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewAllServices
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullyStacked, setIsFullyStacked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.16) {
      setActiveIndex(0);
      setIsFullyStacked(false);
    } else if (latest < 0.32) {
      setActiveIndex(1);
      setIsFullyStacked(false);
    } else if (latest < 0.48) {
      setActiveIndex(2);
      setIsFullyStacked(false);
    } else if (latest < 0.64) {
      setActiveIndex(3);
      setIsFullyStacked(false);
    } else if (latest < 0.80) {
      setActiveIndex(4);
      setIsFullyStacked(false);
    } else if (latest < 0.92) {
      setActiveIndex(5);
      setIsFullyStacked(false);
    } else {
      setActiveIndex(5);
      setIsFullyStacked(true);
    }
  });

  const handleCardClick = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    } else if (onViewAllServices) {
      onViewAllServices();
    }
  };

  const handleStartBrief = () => {
    const el = document.getElementById('campaign-lead-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="services-section"
      className="relative bg-[#080808] border-b border-[#222222] text-[#F5F5F5] h-[520vh]"
    >
      {/* Background ambient lighting */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] h-[450px] sm:h-[650px] bg-[#4F7CFF]/5 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Sticky Main Stage Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: EDITORIAL HEADLINE
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-center select-none">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121212] border border-[#262626] text-[10px] sm:text-[11px] font-mono font-bold text-[#4F7CFF] uppercase tracking-[0.25em] mb-4 w-fit shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] animate-pulse" />
              <span>SERVICES</span>
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
              A comprehensive deck of strategic capabilities built to turn creator integrations into authentic brand equity and measurable ROI.
            </p>

            {/* Quick Action Button & Status */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleStartBrief}
                className="px-5 py-2.5 rounded-xl bg-[#4F7CFF] hover:bg-[#3B6BE8] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_4px_20px_rgba(79,124,255,0.3)] hover:shadow-[0_6px_25px_rgba(79,124,255,0.45)] hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Campaign</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111111] border border-[#222222] text-xs font-mono text-[#888888]">
                <ChevronDown className="w-3.5 h-3.5 text-[#4F7CFF] animate-bounce" />
                <span>SCROLL TO UNPACK DECK</span>
              </div>
            </div>

            {/* ── FINAL TRANSITION STATE (CAMPAIGN IMPACT) ── */}
            <motion.div
              animate={{
                opacity: isFullyStacked ? 1 : 0,
                y: isFullyStacked ? 0 : 12
              }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 rounded-xl bg-[#111111] border border-[#2D2D2D] max-w-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#F5F5F5] uppercase tracking-wider">
                    DECK FULLY UNPACKED
                  </span>
                </div>
                <button
                  onClick={onViewAllServices}
                  className="text-xs font-mono font-bold text-[#4F7CFF] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>VIEW ALL SERVICES</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: 6 PHYSICAL STACKED & COVERED CARDS
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full">
            
            {/* Card Deck Unified Container Stage */}
            <div className="relative w-full max-w-[500px] sm:max-w-[530px] h-[390px] sm:h-[430px] md:h-[450px] flex items-center justify-center">

              {/* ── 6 INDIVIDUAL SLIDING PHYSICAL DECK CARDS (01 TO 06) ── */}
              {SERVICES_DECK.map((service, idx) => (
                <PhysicalServiceCard
                  key={service.id}
                  service={service}
                  index={idx}
                  totalCards={SERVICES_DECK.length}
                  scrollYProgress={scrollYProgress}
                  isActive={idx === activeIndex}
                  onClick={() => handleCardClick(service.id)}
                />
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   SUBCOMPONENT: PHYSICAL STACK SERVICE CARD
   - Card 01 starts in place
   - Cards 02-06 slide UP from underneath one by one
   - Settles with offset forming the clean stacked card edges
   - Covered cards smoothly fade out inner text/content to 0
   - Uniform -1.5deg counter-clockwise tilt (top-right higher, top-left lower)
   ───────────────────────────────────────────────────────────────────────────── */
interface PhysicalServiceCardProps {
  service: ServiceCardData;
  index: number;
  totalCards: number;
  scrollYProgress: any;
  isActive: boolean;
  onClick: () => void;
}

const PhysicalServiceCard: React.FC<PhysicalServiceCardProps> = ({
  service,
  index,
  totalCards,
  scrollYProgress,
  isActive,
  onClick
}) => {
  const IconComponent = service.icon;

  // Target settled offsets:
  // Each card is offset by 16px Y, 4px X, and consistent -1.5deg tilt
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
      : [0, enterStart, enterEnd, 1],
    index === 0
      ? [targetY, targetY]
      : ['135%', '135%', targetY, targetY]
  );

  // 2. Horizontal Translation (X):
  const x = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [0, enterStart, enterEnd, 1],
    index === 0
      ? [targetX, targetX]
      : [0, 0, targetX, targetX]
  );

  // 3. Card Entry Opacity:
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
  // When the card is active/top, content is 1. When covered by next card, content smoothly fades to 0!
  const contentOpacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 0.16, 0.26, 1]
      : index === totalCards - 1
      ? [0, enterStart, enterEnd, 1]
      : [0, enterStart, enterEnd, nextCoverStart, nextCoverEnd, 1],
    index === 0
      ? [1, 1, 0, 0]
      : index === totalCards - 1
      ? [0, 0, 1, 1]
      : [0, 0, 1, 1, 0, 0]
  );

  const zIndex = 20 + index * 5;

  return (
    <motion.div
      onClick={onClick}
      style={{
        y,
        x,
        rotate,
        opacity: cardOpacity,
        zIndex,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
      className={`absolute w-full h-[330px] sm:h-[360px] md:h-[370px] rounded-2xl sm:rounded-[22px] bg-[#111111] border select-none overflow-hidden text-white transition-colors duration-200 cursor-pointer ${
        isActive
          ? 'border-[#333333] shadow-[0_4px_24px_rgba(0,0,0,0.45)]'
          : 'border-[#222222] shadow-[0_2px_12px_rgba(0,0,0,0.3)]'
      }`}
    >
      {/* Top subtle inner specular highlight for physical card sheen */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none" />

      {/* Card Body Content (Smoothly fades to 0 when covered) */}
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
                {service.number}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#444444]" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#7A7A7A] uppercase">
                PHASE {service.stepCount}
              </span>
            </div>

            {/* Capability Tag Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#2D2D2D] text-[10px] sm:text-[11px] font-mono font-bold text-[#4F7CFF] shadow-sm">
              <span>{service.tag}</span>
            </div>
          </div>

          {/* ── SERVICE TITLE & SUBTITLE ── */}
          <h3
            className="text-xl sm:text-2xl lg:text-[24px] font-bold text-[#F5F5F5] uppercase tracking-tight leading-snug mb-1"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {service.title}
          </h3>

          <div className="text-xs sm:text-sm font-medium text-[#A1A1A1] mb-3 sm:mb-4">
            {service.subtitle}
          </div>

          {/* Crisp Card Divider */}
          <div className="w-full h-px bg-[#1F1F1F] mb-3 sm:mb-4" />

          {/* Key Deliverables Bullet Points */}
          <div className="space-y-1.5 sm:space-y-2 mb-2">
            {service.deliverables.map((item, dIdx) => (
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
              {service.outputBadge}
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
