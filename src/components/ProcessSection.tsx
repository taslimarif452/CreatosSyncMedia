import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ProcessStep {
  number: string;
  stepName: string;
  subtitle: string;
  description: string;
  phaseTag: string;
}

const STEPS_DATA: ProcessStep[] = [
  {
    number: '01',
    stepName: 'BRIEF',
    subtitle: 'Define the Goal',
    description: 'Share your audience, budget, timeline and campaign objective.',
    phaseTag: 'PHASE 01 / 04'
  },
  {
    number: '02',
    stepName: 'MATCH',
    subtitle: 'Precision Selection',
    description: 'We shortlist the right creators based on audience fit and engagement.',
    phaseTag: 'PHASE 02 / 04'
  },
  {
    number: '03',
    stepName: 'LAUNCH',
    subtitle: 'Flawless Execution',
    description: 'We manage briefing, content, approvals and campaign go-live.',
    phaseTag: 'PHASE 03 / 04'
  },
  {
    number: '04',
    stepName: 'IMPACT',
    subtitle: 'Measure & Scale',
    description: 'Track views, clicks, conversions and campaign performance.',
    phaseTag: 'PHASE 04 / 04'
  }
];

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Measure total horizontal track translation distance accurately
  const updateDimensions = () => {
    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);

    if (trackRef.current) {
      const scrollWidth = trackRef.current.scrollWidth;
      const clientWidth = window.innerWidth;
      // Calculate how far we need to translate to show card 04 completely aligned with right padding
      const totalDistance = Math.max(0, scrollWidth - clientWidth + 96);
      setScrollRange(totalDistance);
    }
  };

  useEffect(() => {
    updateDimensions();
    // Re-check after font loading and render
    const timer = setTimeout(updateDimensions, 200);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Track vertical scroll progress inside the pinned section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
    restDelta: 0.001
  });

  // Dynamically translate track horizontally based on vertical scroll
  const xTranslate = useTransform(smoothProgress, (val) => -val * scrollRange);

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
      ref={sectionRef}
      id="process-section"
      className="relative bg-[#080808] border-b border-[#1E1E1E] text-[#F5F5F5] md:h-[220vh]"
    >
      {/* ── STICKY VIEWPORT CONTAINER (DESKTOP) ── */}
      <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col justify-center py-8 sm:py-12 overflow-hidden z-10">
        
        {/* Subtle centered radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[850px] h-[350px] md:h-[500px] bg-[#4F7CFF]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* ── 1. SECTION HEADER (CENTERED EDITORIAL - COMPACT & CRISP) ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center select-none mb-4 sm:mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#121212] border border-[#262626] text-[9px] sm:text-[10px] md:text-[11px] font-mono font-bold text-[#4F7CFF] uppercase tracking-[0.25em] mb-2 sm:mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] animate-pulse" />
            <span>PROCESS</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#F5F5F5] uppercase leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
          >
            FROM BRIEF <br />
            <span className="text-[#666666]">TO BRAND IMPACT.</span>
          </h2>
        </div>

        {/* ── 2. SINGLE HORIZONTAL ROW OF EXACTLY 4 PROCESS CARDS ── */}
        <div className="relative z-20 w-full flex items-center my-auto overflow-hidden">
          {isMobile ? (
            /* Mobile: Native Touch Swipe Track showing compact, nicely proportioned cards */
            <div className="w-full flex items-stretch gap-3 px-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2">
              {STEPS_DATA.map((step, index) => (
                <div
                  key={step.number}
                  className="w-[215px] min-[380px]:w-[235px] sm:w-[275px] flex-shrink-0 snap-start"
                >
                  <ProcessHorizontalCard
                    step={step}
                    index={index}
                    onClick={handleStartBrief}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Desktop / Tablet: Smooth Scroll-Driven Horizontal Translation Track */
            <motion.div
              ref={trackRef}
              style={{ x: xTranslate }}
              className="flex items-center gap-5 px-8 lg:px-16 w-max select-none"
            >
              {STEPS_DATA.map((step, index) => (
                <div
                  key={step.number}
                  className="w-[300px] lg:w-[330px] flex-shrink-0"
                >
                  <ProcessHorizontalCard
                    step={step}
                    index={index}
                    onClick={handleStartBrief}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   SUBCOMPONENT: PROCESS HORIZONTAL CARD
   - Compact height (~260px - 280px) ensuring 100% visibility of all text
   - Dark matte background (#0D0D0D)
   - Clean 1px border (#202020 -> #383838 on hover)
   - Minimal border radius (~8-10px)
   - Large 01-04 numbering
   - High-contrast typography & blue subtitle accent
   - Hover: 3-4px subtle translation + indicator shift
   ───────────────────────────────────────────────────────────────────────────── */
interface ProcessHorizontalCardProps {
  step: ProcessStep;
  index: number;
  onClick: () => void;
}

const ProcessHorizontalCard: React.FC<ProcessHorizontalCardProps> = ({
  step,
  index,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative h-[215px] min-[380px]:h-[230px] sm:h-[270px] lg:h-[280px] w-full rounded-xl bg-[#0D0D0D] border border-[#202020] hover:border-[#383838] transition-all duration-300 ease-out p-4 min-[380px]:p-5 sm:p-6 flex flex-col justify-between cursor-pointer select-none overflow-hidden hover:-translate-y-1 hover:shadow-[0_6px_25px_rgba(0,0,0,0.5)]"
    >
      {/* Top subtle specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* ── CARD HEADER: LARGE 01-04 NUMBERING ── */}
      <div className="flex items-center justify-between">
        <span
          className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold tracking-tight text-[#555555] group-hover:text-[#4F7CFF] transition-colors duration-200"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {step.number}
        </span>
        <span className="text-[8px] min-[380px]:text-[9px] sm:text-[10px] font-mono font-semibold text-[#444444] uppercase tracking-widest">
          STEP {step.number}
        </span>
      </div>

      {/* ── CARD BODY: NAME, SUBTITLE & SHORT DESCRIPTION ── */}
      <div className="mt-auto py-1">
        <h3
          className="text-base min-[380px]:text-lg sm:text-2xl font-extrabold text-[#F5F5F5] group-hover:text-white uppercase tracking-tight leading-tight mb-0.5 sm:mb-1 transition-colors duration-200"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {step.stepName}
        </h3>
        <div className="text-[11px] min-[380px]:text-xs sm:text-[13px] font-semibold text-[#4F7CFF] mb-1.5 sm:mb-2">
          {step.subtitle}
        </div>
        <p className="text-[11px] min-[380px]:text-xs sm:text-[13px] text-[#959595] leading-snug font-normal line-clamp-3">
          {step.description}
        </p>
      </div>
    </div>
  );
};
