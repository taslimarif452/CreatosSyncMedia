import React, { useRef, useState } from 'react';

interface ServicesSectionProps {
  onSelectService?: (serviceId: string) => void;
  onViewAllServices?: () => void;
}

interface ServiceCardData {
  number: string;
  id: string;
  title: string;
  description: string;
  tag: string;
}

const SERVICES_DECK: ServiceCardData[] = [
  {
    number: '01',
    id: 'creator-discovery',
    title: 'CREATOR DISCOVERY',
    description: 'Find the right creators for your audience, backed by demographic fit and verified authority.',
    tag: 'CORE CAPABILITY ↗'
  },
  {
    number: '02',
    id: 'youtube-campaigns',
    title: 'YOUTUBE CAMPAIGNS',
    description: 'Integrations, dedicated videos and Shorts engineered for high reach and evergreen performance.',
    tag: 'CORE CAPABILITY ↗'
  },
  {
    number: '03',
    id: 'brand-partnerships',
    title: 'BRAND PARTNERSHIPS',
    description: 'Long-term partnerships that turn sponsorships into creator advocacy and compounding trust.',
    tag: 'CORE CAPABILITY ↗'
  },
  {
    number: '04',
    id: 'campaign-management',
    title: 'CAMPAIGN MANAGEMENT',
    description: 'End-to-end execution from brief to live delivery: contracts, briefing, sampling and scheduling.',
    tag: 'CORE CAPABILITY ↗'
  },
  {
    number: '05',
    id: 'creative-strategy',
    title: 'CREATIVE STRATEGY',
    description: 'Hooks, storytelling frameworks, and call-to-actions designed to turn passive viewers into active buyers.',
    tag: 'CORE CAPABILITY ↗'
  },
  {
    number: '06',
    id: 'performance-reporting',
    title: 'PERFORMANCE & REPORTING',
    description: 'Transparent analytics, UTM attribution, retention heatmaps, and clear ROI calculations.',
    tag: 'CORE CAPABILITY ↗'
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewAllServices
}) => {
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

  const handleCardClick = (serviceId: string) => {
    if (isDragging) return;
    if (onSelectService) {
      onSelectService(serviceId);
    } else if (onViewAllServices) {
      onViewAllServices();
    }
  };

  return (
    <section
      id="services-section"
      className="relative bg-[#080808] border-b border-[#1E1E1E] text-[#F5F5F5] py-16 sm:py-24 overflow-hidden"
    >
      <div className="w-full flex flex-col justify-center overflow-hidden z-10">
        {/* Subtle centered radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[550px] bg-[#4F7CFF]/5 rounded-full blur-[150px] pointer-events-none" />

        {/* ── 1. SECTION HEADER (CENTERED EDITORIAL) ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center select-none mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#121212] border border-[#262626] text-[9px] sm:text-[10px] md:text-[11px] font-mono font-bold text-[#4F7CFF] uppercase tracking-[0.25em] mb-2 sm:mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] animate-pulse" />
            <span>SERVICES</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#F5F5F5] uppercase leading-[1.1] sm:leading-[1.08]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
          >
            FROM CREATOR DISCOVERY <br />
            <span className="text-[#666666]">TO CAMPAIGN IMPACT.</span>
          </h2>
        </div>

        {/* ── 2. SINGLE HORIZONTAL ROW OF ALL 6 SERVICE CARDS WITH HORIZONTAL SCROLL & DRAG ── */}
        <div className="relative z-20 w-full flex items-center overflow-hidden">
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`w-full flex items-stretch gap-2.5 sm:gap-6 px-3 sm:px-8 lg:px-16 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-3 sm:py-4 ${
              isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {SERVICES_DECK.map((service, index) => (
              <div
                key={service.id}
                className="w-[160px] min-[380px]:w-[175px] min-[420px]:w-[190px] sm:w-[320px] lg:w-[360px] flex-shrink-0 snap-start"
              >
                <ServiceHorizontalCard
                  service={service}
                  index={index}
                  onClick={() => handleCardClick(service.id)}
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
   SUBCOMPONENT: SERVICE HORIZONTAL CARD
   - Exact aesthetic matching wireframe
   - Dark matte background (#0D0D0D)
   - Clean 1px border (#202020 -> #383838 on hover)
   - Minimal 8-10px border radius
   - Large 01-06 numbering
   - High-contrast typography & subtle blue accent
   - Hover: 3-4px upward shift, border brightening, subtle arrow shift
   ───────────────────────────────────────────────────────────────────────────── */
interface ServiceHorizontalCardProps {
  service: ServiceCardData;
  index: number;
  onClick: () => void;
}

const ServiceHorizontalCard: React.FC<ServiceHorizontalCardProps> = ({
  service,
  index,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative h-[145px] min-[380px]:h-[155px] sm:h-[320px] lg:h-[350px] w-full rounded-lg sm:rounded-xl bg-[#0D0D0D] border border-[#202020] hover:border-[#383838] transition-all duration-300 ease-out p-3 min-[380px]:p-3.5 sm:p-7 flex flex-col justify-between cursor-pointer select-none overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
    >
      {/* Top subtle specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* ── CARD HEADER: LARGE 01-06 NUMBERING ── */}
      <div className="flex items-center justify-between">
        <span
          className="text-base min-[380px]:text-lg sm:text-2xl lg:text-3xl font-mono font-bold tracking-tight text-[#555555] group-hover:text-[#4F7CFF] transition-colors duration-200"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {service.number}
        </span>
        <span className="text-[7px] min-[380px]:text-[8px] sm:text-[10px] font-mono font-semibold text-[#444444] uppercase tracking-wider">
          S-{service.number}
        </span>
      </div>

      {/* ── CARD BODY: TITLE & DESCRIPTION ── */}
      <div className="mt-auto pt-1 sm:pt-2">
        <h3
          className="text-[11.5px] min-[380px]:text-[12.5px] sm:text-2xl font-extrabold text-[#F5F5F5] group-hover:text-white uppercase tracking-tight leading-tight mb-0.5 sm:mb-2.5 transition-colors duration-200 line-clamp-1 sm:line-clamp-none"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {service.title}
        </h3>
        <p className="text-[9.5px] min-[380px]:text-[10.5px] sm:text-sm text-[#959595] leading-tight sm:leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
          {service.description}
        </p>
      </div>
    </div>
  );
};
