import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';

interface ServicesSectionProps {
  onSelectService?: (serviceId: string) => void;
  onViewAllServices?: () => void;
}

interface ServiceCardData {
  number: string;
  id: string;
  title: string;
  description: string;
}

const SERVICES_DECK: ServiceCardData[] = [
  {
    number: '01',
    id: 'creator-discovery',
    title: 'CREATOR DISCOVERY',
    description: 'Find the right creators for your audience, backed by demographic fit and genuine authority.'
  },
  {
    number: '02',
    id: 'youtube-campaigns',
    title: 'YOUTUBE CAMPAIGNS',
    description: 'Integrations, dedicated videos and Shorts engineered for high reach and evergreen performance.'
  },
  {
    number: '03',
    id: 'brand-partnerships',
    title: 'BRAND PARTNERSHIPS',
    description: 'Long-term partnerships that turn sponsorships into creator advocacy and compounding trust.'
  },
  {
    number: '04',
    id: 'campaign-management',
    title: 'CAMPAIGN MANAGEMENT',
    description: 'End-to-end operational execution: briefing, contracts, product sampling, approvals, and scheduling.'
  },
  {
    number: '05',
    id: 'creative-strategy',
    title: 'CREATIVE STRATEGY',
    description: 'Hooks, storytelling frameworks, and call-to-actions designed to turn passive viewers into active buyers.'
  },
  {
    number: '06',
    id: 'performance-reporting',
    title: 'PERFORMANCE & REPORTING',
    description: 'Transparent analytics, UTM attribution, retention heatmaps, and clear ROI calculations.'
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewAllServices
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFinalState, setIsFinalState] = useState<boolean>(false);

  // Monitor scroll progress across the pinned sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.18) {
      setActiveIndex(0);
      setIsFinalState(false);
    } else if (latest < 0.34) {
      setActiveIndex(1);
      setIsFinalState(false);
    } else if (latest < 0.50) {
      setActiveIndex(2);
      setIsFinalState(false);
    } else if (latest < 0.66) {
      setActiveIndex(3);
      setIsFinalState(false);
    } else if (latest < 0.82) {
      setActiveIndex(4);
      setIsFinalState(false);
    } else if (latest < 0.92) {
      setActiveIndex(5);
      setIsFinalState(false);
    } else {
      setActiveIndex(5);
      setIsFinalState(true);
    }
  });

  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetProgress = index === 0 ? 0.03 : 0.14 + (index - 1) * 0.16 + 0.08;
    const scrollTarget = containerTop + containerHeight * targetProgress;
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  };

  const handleCardClick = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    } else if (onViewAllServices) {
      onViewAllServices();
    }
  };

  return (
    <section
      ref={containerRef}
      id="services-section"
      className="relative h-[480vh] bg-[#080808] border-b border-[#222222]"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full flex items-center py-6 sm:py-10 md:py-14 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden z-10">
        
        {/* Subtle radial background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] h-[450px] sm:h-[650px] bg-[#4F7CFF]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* ── 2-COLUMN RESPONSIVE WRAPPER (Tablet/Desktop: Left Text, Right Cards) ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-16">

          {/* ── LEFT COLUMN: EDITORIAL HEADLINE & STAGE PROGRESS ── */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left flex-shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121212] border border-[#262626] text-[10px] sm:text-[11px] font-mono font-bold text-[#4F7CFF] uppercase tracking-[0.25em] mb-4 sm:mb-5">
              SERVICES
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-[40px] lg:text-[48px] xl:text-[54px] font-extrabold tracking-tight text-[#F5F5F5] uppercase leading-[1.08] mb-4 sm:mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
            >
              FROM CREATOR DISCOVERY <br />
              <span className="text-[#6E6E6E]">TO CAMPAIGN IMPACT.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#909090] max-w-md font-normal leading-relaxed mb-6 sm:mb-8 hidden md:block">
              A comprehensive deck of strategic capabilities built to turn creator integrations into authentic brand equity and measurable ROI.
            </p>

            {/* Step Indicators / Interactive Jump Buttons */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              {SERVICES_DECK.map((service, idx) => {
                const isActive = idx === activeIndex;
                const isPast = idx < activeIndex;
                return (
                  <button
                    key={service.id}
                    onClick={() => scrollToCard(idx)}
                    title={`Go to ${service.title}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? 'bg-[#4F7CFF] text-white border-[#4F7CFF] shadow-[0_0_12px_rgba(79,124,255,0.4)] scale-105'
                        : isPast
                        ? 'bg-[#181818] text-[#D0D0D0] border-[#303030] hover:border-[#4F7CFF]/50'
                        : 'bg-[#101010] text-[#666666] border-[#1F1F1F] hover:border-[#333333]'
                    }`}
                  >
                    {service.number}
                  </button>
                );
              })}
            </div>

            {/* ── FINAL TRANSITION STATE (CAMPAIGN IMPACT) ── */}
            <motion.div
              animate={{
                opacity: isFinalState || activeIndex === SERVICES_DECK.length - 1 ? 1 : 0.6,
                y: isFinalState ? [0, 3, 0] : 0
              }}
              transition={{
                y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
                opacity: { duration: 0.3 }
              }}
              className="flex items-center gap-3 pt-1"
            >
              <div className="w-7 h-7 rounded-full bg-[#121212] border border-[#262626] flex items-center justify-center text-xs text-[#A1A1A1] shadow-md shadow-black">
                ↓
              </div>

              <div
                className={`px-4 sm:px-5 py-1.5 rounded-full border text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isFinalState || activeIndex === SERVICES_DECK.length - 1
                    ? 'bg-[#141414] border-[#4F7CFF]/50 text-[#F5F5F5] shadow-[0_0_15px_rgba(79,124,255,0.25)]'
                    : 'bg-[#101010] border-[#222222] text-[#777777]'
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                CAMPAIGN IMPACT
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: PHYSICAL STACKED DECK CONTAINER ── */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-center">
            
            {/* Unified Card Container Stage */}
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] md:max-w-[480px] lg:max-w-[500px] h-[370px] sm:h-[400px] md:h-[420px] flex items-center justify-center">
              
              {/* Render each card: Card 01 starts in place; Cards 02-06 slide up from below */}
              {SERVICES_DECK.map((service, index) => (
                <ServiceDeckCard
                  key={service.id}
                  service={service}
                  index={index}
                  totalCards={SERVICES_DECK.length}
                  scrollYProgress={scrollYProgress}
                  isActive={index === activeIndex}
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
   SUBCOMPONENT: SERVICE DECK CARD
   - Card 01: Sits in place (y: -40px) at the start.
   - Cards 02..06: Start below the view (y: 130%, opacity: 0).
   - On scroll: The next card slides UP from below and covers ~80% of the previous card.
   - Settles with a 16px vertical offset so only a clean 16px edge of each previous card shows.
   - When covered, inner content (text, numbers, CTAs) smoothly fades out to 0 opacity.
   - Flat, matte, premium styling without heavy drop shadows.
   ───────────────────────────────────────────────────────────────────────────── */
interface ServiceDeckCardProps {
  service: ServiceCardData;
  index: number;
  totalCards: number;
  scrollYProgress: any;
  isActive: boolean;
  onClick: () => void;
}

const ServiceDeckCard: React.FC<ServiceDeckCardProps> = ({
  service,
  index,
  totalCards,
  scrollYProgress,
  isActive,
  onClick
}) => {
  // Target settled offsets:
  // Each card is offset by 16px Y, 4px X, and 0.25deg rotation
  const targetY = -40 + index * 16;
  const targetX = -10 + index * 4;
  const targetRotate = -0.6 + index * 0.25;

  // Scroll milestones for each card:
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

  // 4. Subtle Rotation:
  const rotate = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [0, enterStart, enterEnd, 1],
    index === 0
      ? [`${targetRotate}deg`, `${targetRotate}deg`]
      : ['0deg', '0deg', `${targetRotate}deg`, `${targetRotate}deg`]
  );

  // 5. Card Inner Content Opacity:
  // When a card gets covered by the next card, its inner text/UI fades to 0!
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

  // Z-index: Higher cards sit ON TOP of lower cards
  const zIndex = 10 + index * 10;

  return (
    <motion.div
      id={`deck-card-${service.id}`}
      onClick={onClick}
      style={{
        y,
        x,
        rotate,
        opacity: cardOpacity,
        zIndex,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
      className={`absolute w-full h-[310px] sm:h-[330px] md:h-[340px] rounded-2xl bg-[#111111] border transition-colors duration-200 cursor-pointer select-none overflow-hidden ${
        isActive
          ? 'border-[#333333] shadow-[0_4px_24px_rgba(0,0,0,0.45)]'
          : 'border-[#222222] shadow-[0_2px_12px_rgba(0,0,0,0.3)]'
      }`}
    >
      {/* Subtle top edge matte line for physical card separation */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl pointer-events-none" />

      {/* ── CARD INNER CONTENT: Fades to 0 when covered ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="w-full h-full p-6 sm:p-7 md:p-8 flex flex-col justify-between"
      >
        {/* ── CARD TOP: NUMBER ── */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-[#7A7A7A]">
            {service.number}
          </span>
          <span className="text-[10px] font-mono text-[#555555] uppercase tracking-widest">
            {index + 1} / {totalCards}
          </span>
        </div>

        {/* ── CARD MIDDLE: SERVICE NAME & DESCRIPTION ── */}
        <div className="my-auto py-2">
          <h3
            className="text-xl sm:text-2xl md:text-[24px] lg:text-[26px] font-bold tracking-tight text-[#F5F5F5] uppercase leading-tight mb-2.5 sm:mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm md:text-[14px] lg:text-[15px] text-[#A1A1A1] leading-relaxed font-normal">
            {service.description}
          </p>
        </div>

        {/* ── CARD BOTTOM: CORE CAPABILITY LINK ── */}
        <div className="pt-3 border-t border-[#1F1F1F] flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#757575] hover:text-[#4F7CFF] transition-colors flex items-center gap-1.5">
            CORE CAPABILITY <span className="text-[#4F7CFF]">↗</span>
          </span>
          <span className="text-[10px] font-mono text-[#444444] tracking-widest uppercase">
            {isActive ? 'CLICK TO EXPLORE' : 'STACKED'}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};


