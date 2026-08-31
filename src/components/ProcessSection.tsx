import React, { useRef, useState } from 'react';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleStartBrief = () => {
    if (isDragging) return;
    const el = document.getElementById('campaign-lead-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/for-brands';
    }
  };

  return (
    <section
      id="process-section"
      className="relative bg-[#080808] border-b border-[#1E1E1E] text-[#F5F5F5] py-16 sm:py-24 overflow-hidden"
    >
      <div className="w-full flex flex-col justify-center overflow-hidden z-10">
        {/* Subtle centered radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[850px] h-[350px] md:h-[500px] bg-[#4F7CFF]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* ── 1. SECTION HEADER (CENTERED EDITORIAL - COMPACT & CRISP) ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center select-none mb-8 sm:mb-12">
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

        {/* ── 2. SINGLE HORIZONTAL ROW OF ALL 4 PROCESS CARDS WITH HORIZONTAL SCROLL & DRAG ── */}
        <div className="relative z-20 w-full flex items-center overflow-hidden">
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`w-full flex items-stretch gap-4 sm:gap-6 px-4 sm:px-8 lg:px-16 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 ${
              isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {STEPS_DATA.map((step, index) => (
              <div
                key={step.number}
                className="w-[240px] min-[380px]:w-[260px] sm:w-[320px] lg:w-[350px] flex-shrink-0 snap-start"
              >
                <ProcessHorizontalCard
                  step={step}
                  index={index}
                  onClick={handleStartBrief}
                />
              </div>
            ))}
          </div>
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
