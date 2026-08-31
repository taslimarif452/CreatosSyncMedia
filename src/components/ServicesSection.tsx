import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';

interface ServicesSectionProps {
  onSelectService?: (serviceId: string) => void;
  onViewAllServices?: () => void;
}

interface ServiceCardData {
  number: string;
  id: string;
  stepCount: string;
  title: string;
  description: string;
  tag: string;
}

const SERVICES_DECK: ServiceCardData[] = [
  {
    number: '01',
    id: 'creator-discovery',
    stepCount: '1 / 6',
    title: 'CREATOR DISCOVERY',
    description: 'Find the right creators for your audience, backed by demographic fit and verified authority.',
    tag: 'CORE CAPABILITY ↗'
  },
  {
    number: '02',
    id: 'youtube-campaigns',
    stepCount: '2 / 6',
    title: 'YOUTUBE CAMPAIGNS',
    description: 'Integrations, dedicated videos and Shorts engineered for high reach and evergreen performance.',
    tag: 'CORE CAPABILITY ↗'
  },
  {
    number: '03',
    id: 'brand-partnerships',
    stepCount: '3 / 6',
    title: 'BRAND PARTNERSHIPS',
    description: 'Long-term partnerships that turn sponsorships into creator advocacy and compounding trust.',
    tag: 'CORE CAPABILITY ↗'
  },
  {
    number: '04',
    id: 'campaign-management',
    stepCount: '4 / 6',
    title: 'CAMPAIGN MANAGEMENT',
    description: 'End-to-end execution from brief to live delivery: contracts, briefing, sampling and scheduling.',
    tag: 'CORE CAPABILITY ↗'
  },
  {
    number: '05',
    id: 'creative-strategy',
    stepCount: '5 / 6',
    title: 'CREATIVE STRATEGY',
    description: 'Hooks, storytelling frameworks, and call-to-actions designed to turn passive viewers into active buyers.',
    tag: 'CORE CAPABILITY ↗'
  },
  {
    number: '06',
    id: 'performance-reporting',
    stepCount: '6 / 6',
    title: 'PERFORMANCE & REPORTING',
    description: 'Transparent analytics, UTM attribution, retention heatmaps, and clear ROI calculations.',
    tag: 'CORE CAPABILITY ↗'
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewAllServices
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.16) {
      setActiveIndex(0);
    } else if (latest < 0.32) {
      setActiveIndex(1);
    } else if (latest < 0.48) {
      setActiveIndex(2);
    } else if (latest < 0.64) {
      setActiveIndex(3);
    } else if (latest < 0.80) {
      setActiveIndex(4);
    } else {
      setActiveIndex(5);
    }
  });

  const handleCardClick = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    } else if (onViewAllServices) {
      onViewAllServices();
    }
  };

  const handleScrollToImpact = () => {
    const el = document.getElementById('campaign-lead-form-section') || document.getElementById('metrics-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="services-section"
      className="relative bg-[#080808] border-b border-[#1A1A1A] text-[#F5F5F5] h-[520vh]"
    >
      {/* Background ambient lighting */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] sm:h-[650px] bg-[#4F7CFF]/5 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* Sticky Main Stage Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10 px-6 sm:px-10 lg:px-16">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: EXACT EDITORIAL FROM SCREENSHOT
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-center select-none">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#222222] text-[10px] sm:text-[11px] font-mono font-semibold text-[#4F7CFF] uppercase tracking-[0.25em] mb-6 w-fit">
              <span>SERVICES</span>
            </div>

            {/* Main Headline with exact styling */}
            <h2
              className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white uppercase leading-[1.05] mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
            >
              FROM CREATOR <br />
              DISCOVERY <br />
              <span className="text-[#555555]">TO CAMPAIGN IMPACT.</span>
            </h2>

            {/* Description matching exact text */}
            <p className="text-sm sm:text-base text-[#888888] max-w-md font-normal leading-relaxed mb-10">
              A comprehensive deck of strategic capabilities built to turn creator integrations into authentic brand equity and measurable ROI.
            </p>

            {/* Bottom Left: ( ↓ ) [ CAMPAIGN IMPACT ] */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleScrollToImpact}
                className="w-9 h-9 rounded-full bg-[#111111] border border-[#262626] hover:border-[#383838] flex items-center justify-center text-xs text-[#888888] hover:text-white transition-all cursor-pointer"
                title="Scroll to Impact"
              >
                ↓
              </button>

              <button
                onClick={handleScrollToImpact}
                className="px-5 py-2 rounded-full bg-[#0E0E0E] border border-[#222222] text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#E0E0E0] shadow-[0_0_20px_rgba(79,124,255,0.18)] hover:shadow-[0_0_25px_rgba(79,124,255,0.35)] hover:border-[#4F7CFF]/50 transition-all cursor-pointer"
              >
                CAMPAIGN IMPACT
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: PHYSICAL STACKED DECK OF CARDS (AS IN IMAGE)
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full">
            
            {/* Card Deck Unified Container Stage */}
            <div className="relative w-full max-w-[540px] sm:max-w-[580px] h-[360px] sm:h-[390px] md:h-[410px] flex items-center justify-center">

              {/* ── 6 INDIVIDUAL PHYSICAL DECK CARDS (01 TO 06) ── */}
              {SERVICES_DECK.map((service, idx) => (
                <ImageMatchedDeckCard
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
   SUBCOMPONENT: EXACT IMAGE-MATCHED DECK CARD
   - Clean, minimal, zero slop/clutter!
   - Top-left: Number (e.g. 06)
   - Top-right: Step count (e.g. 6 / 6)
   - Center: Title & Short clean description
   - Bottom-left: CORE CAPABILITY ↗
   - Bottom-right: CLICK TO EXPLORE
   - Back cards layered with offset top-edges
   ───────────────────────────────────────────────────────────────────────────── */
interface ImageMatchedDeckCardProps {
  service: ServiceCardData;
  index: number;
  totalCards: number;
  scrollYProgress: any;
  isActive: boolean;
  onClick: () => void;
}

const ImageMatchedDeckCard: React.FC<ImageMatchedDeckCardProps> = ({
  service,
  index,
  totalCards,
  scrollYProgress,
  isActive,
  onClick
}) => {
  // Stacking offsets for the layered physical card edges:
  // Offset to reveal top/back card edges cleanly:
  const targetY = -24 + index * 8;
  const targetX = -10 + index * 4;
  const targetRotate = -1.5; // Top-right side higher, top-left side lower (counter-clockwise ↖)

  // Scroll milestones for each of the 6 cards:
  // Card 0 (01): Always present
  // Card 1 (02): Enters [0.14 -> 0.28]
  // Card 2 (03): Enters [0.30 -> 0.44]
  // Card 3 (04): Enters [0.46 -> 0.60]
  // Card 4 (05): Enters [0.62 -> 0.76]
  // Card 5 (06): Enters [0.78 -> 0.92]
  const enterStart = index === 0 ? 0 : 0.14 + (index - 1) * 0.16;
  const enterEnd = index === 0 ? 0 : enterStart + 0.14;
  const opacityStart = Math.max(0, enterStart - 0.02);
  const opacityFull = enterStart + 0.02;

  // When next card covers this card, its inner text fades away
  const nextCoverStart = enterEnd + 0.04;
  const nextCoverEnd = nextCoverStart + 0.12;

  // 1. Vertical Translation (Y):
  // Card starts off down below at 160% and translates smoothly up to targetY
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [0, enterStart, enterEnd, 1],
    index === 0
      ? [targetY, targetY]
      : ['160%', '160%', targetY, targetY]
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

  // 3. Subtle Mirrored Rotation (Top-right higher, Top-left lower):
  const rotate = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [0, enterStart, enterEnd, 1],
    index === 0
      ? [`${targetRotate}deg`, `${targetRotate}deg`]
      : [`${targetRotate}deg`, `${targetRotate}deg`, `${targetRotate}deg`, `${targetRotate}deg`]
  );

  // 4. Card Inner Content Opacity (fades to 0 when covered):
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
        zIndex,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
      className={`absolute w-full h-[320px] sm:h-[350px] md:h-[365px] rounded-2xl bg-[#0F0F0F] border select-none overflow-hidden text-white transition-colors duration-200 cursor-pointer ${
        isActive
          ? 'border-[#2D2D2D] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'border-[#1E1E1E] shadow-[0_2px_15px_rgba(0,0,0,0.4)]'
      }`}
    >
      {/* Top subtle inner specular highlight for physical card sheen */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Card Content exactly matching the screenshot design */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="w-full h-full p-7 sm:p-8 md:p-9 flex flex-col justify-between"
      >
        {/* ── CARD TOP BAR: 06 (left) & 6 / 6 (right) ── */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-[#777777]">
            {service.number}
          </span>
          <span className="text-xs sm:text-sm font-mono text-[#555555]">
            {service.stepCount}
          </span>
        </div>

        {/* ── CARD BODY: TITLE & MINIMAL DESCRIPTION ── */}
        <div className="my-auto py-2">
          <h3
            className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-white uppercase tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#8E8E8E] leading-relaxed max-w-lg font-normal">
            {service.description}
          </p>
        </div>

        {/* ── CARD FOOTER: CORE CAPABILITY ↗ (left) & CLICK TO EXPLORE (right) ── */}
        <div className="pt-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
          <span className="font-bold tracking-wider text-[#888888] uppercase hover:text-white transition-colors">
            CORE CAPABILITY <span className="text-[#4F7CFF]">↗</span>
          </span>
          <span className="font-medium tracking-widest text-[#444444] uppercase">
            CLICK TO EXPLORE
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
