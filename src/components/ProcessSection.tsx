import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

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

  // Measure total horizontal track translation distance
  useEffect(() => {
    const handleResize = () => {
      const mobileCheck = window.innerWidth < 768;
      setIsMobile(mobileCheck);

      if (trackRef.current) {
        const scrollWidth = trackRef.current.scrollWidth;
        const clientWidth = window.innerWidth;
        const totalDistance = Math.max(0, scrollWidth - clientWidth + 96);
        setScrollRange(totalDistance);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track vertical scroll progress inside the pinned section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001
  });

  // Translate track horizontally based on vertical scroll
  const xTranslate = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!sectionRef.current) return;
    const currentScroll = window.scrollY;
    const scrollStep = window.innerHeight * 0.45;
    window.scrollTo({
      top: direction === 'right' ? currentScroll + scrollStep : currentScroll - scrollStep,
      behavior: 'smooth'
    });
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
      ref={sectionRef}
      id="process-section"
      className="relative bg-[#080808] border-b border-[#202020] text-[#F5F5F5] md:h-[300vh]"
    >
      {/* ── STICKY VIEWPORT CONTAINER (DESKTOP) ── */}
      <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col justify-between py-12 md:py-16 overflow-hidden z-10">
        
        {/* Subtle centered radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[600px] bg-[#4F7CFF]/5 rounded-full blur-[150px] pointer-events-none" />

        {/* ── 1. SECTION HEADER (CENTERED EDITORIAL) ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center select-none mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121212] border border-[#262626] text-[10px] sm:text-[11px] font-mono font-bold text-[#4F7CFF] uppercase tracking-[0.25em] mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] animate-pulse" />
            <span>SERVICES</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-[#F5F5F5] uppercase leading-[1.08] mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
          >
            FROM BRIEF <br />
            <span className="text-[#6E6E6E]">TO BRAND IMPACT.</span>
          </h2>
        </div>

        {/* ── 2. SINGLE HORIZONTAL ROW OF EXACTLY 4 PROCESS CARDS ── */}
        <div className="relative z-20 w-full flex-1 flex items-center my-auto overflow-hidden">
          {isMobile ? (
            /* Mobile: Native Touch Swipe Track showing ~1.1-1.2 cards */
            <div className="w-full flex items-stretch gap-4 px-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4">
              {STEPS_DATA.map((step, index) => (
                <div
                  key={step.number}
                  className="w-[290px] sm:w-[320px] flex-shrink-0 snap-start"
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
              className="flex items-center gap-6 px-8 lg:px-16 w-max select-none"
            >
              {STEPS_DATA.map((step, index) => (
                <div
                  key={step.number}
                  className="w-[330px] lg:w-[360px] flex-shrink-0"
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

        {/* ── 3. BOTTOM FOOTER MILESTONE: BRAND IMPACT ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 mt-8 md:mt-10 flex items-center justify-between">
          
          {/* Left / Desktop Navigation Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleManualScroll('left')}
              title="Previous Step"
              className="w-8 h-8 rounded-lg bg-[#121212] border border-[#242424] hover:border-[#383838] flex items-center justify-center text-[#888888] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              title="Next Step"
              className="w-8 h-8 rounded-lg bg-[#121212] border border-[#242424] hover:border-[#383838] flex items-center justify-center text-[#888888] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-[#666666] uppercase tracking-wider pl-2">
              SCROLL OR SWIPE TO EXPLORE
            </span>
          </div>

          {/* Center/Destination Milestone */}
          <div className="flex items-center gap-3 mx-auto md:mx-0">
            <div className="w-6 h-6 rounded-full bg-[#121212] border border-[#262626] flex items-center justify-center text-xs text-[#4F7CFF] shadow-sm">
              ↓
            </div>
            <div
              className="px-4 py-1 rounded-full bg-[#111111] border border-[#262626] text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#999999]"
            >
              BRAND IMPACT
            </div>
          </div>

          {/* Right Progress indicator on Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#555555]">01</span>
            <div className="w-24 h-1 bg-[#181818] rounded-full overflow-hidden border border-[#242424]">
              <motion.div
                className="h-full bg-[#4F7CFF]"
                style={{ width: useTransform(smoothProgress, [0, 1], ['25%', '100%']) }}
              />
            </div>
            <span className="text-[11px] font-mono text-[#555555]">04</span>
          </div>

        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   SUBCOMPONENT: PROCESS HORIZONTAL CARD
   - Premium creative agency aesthetic
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
      className="group relative h-[340px] sm:h-[360px] lg:h-[370px] w-full rounded-xl bg-[#0D0D0D] border border-[#202020] hover:border-[#383838] transition-all duration-300 ease-out p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
    >
      {/* Top subtle specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* ── CARD HEADER: LARGE 01-04 NUMBERING ── */}
      <div className="flex items-center justify-between">
        <span
          className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#555555] group-hover:text-[#4F7CFF] transition-colors duration-200"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {step.number}
        </span>
        <span className="text-[10px] font-mono font-semibold text-[#444444] uppercase tracking-widest">
          STEP {step.number}
        </span>
      </div>

      {/* ── CARD BODY: NAME, SUBTITLE & DESCRIPTION ── */}
      <div className="my-auto py-2">
        <h3
          className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5] group-hover:text-white uppercase tracking-tight leading-tight mb-2 transition-colors duration-200"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {step.stepName}
        </h3>
        <div className="text-sm sm:text-base font-semibold text-[#4F7CFF] mb-3">
          {step.subtitle}
        </div>
        <p className="text-xs sm:text-sm text-[#999999] leading-relaxed font-normal">
          {step.description}
        </p>
      </div>

      {/* ── CARD FOOTER: PHASE 0X / 04 ── */}
      <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
        <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#777777] uppercase group-hover:text-[#AAAAAA] transition-colors duration-200">
          {step.phaseTag}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#333333] group-hover:bg-[#4F7CFF] transition-colors duration-200" />
      </div>
    </div>
  );
};
