import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

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
      const totalDistance = Math.max(0, scrollWidth - clientWidth + 96);
      setScrollRange(totalDistance);
    }
  };

  useEffect(() => {
    updateDimensions();
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

  const handleCardClick = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    } else if (onViewAllServices) {
      onViewAllServices();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="relative bg-[#080808] border-b border-[#1E1E1E] text-[#F5F5F5] md:h-[260vh]"
    >
      {/* ── STICKY VIEWPORT CONTAINER (DESKTOP) ── */}
      <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col justify-center py-8 sm:py-12 overflow-hidden z-10">
        
        {/* Subtle centered radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[550px] bg-[#4F7CFF]/5 rounded-full blur-[150px] pointer-events-none" />

        {/* ── 1. SECTION HEADER (CENTERED EDITORIAL) ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center select-none mb-4 sm:mb-6 md:mb-8">
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

        {/* ── 2. SINGLE HORIZONTAL ROW OF ALL 6 SERVICE CARDS ── */}
        <div className="relative z-20 w-full flex items-center my-auto overflow-hidden">
          {isMobile ? (
            /* Mobile: Native Touch Swipe Track showing compact, nicely proportioned cards */
            <div className="w-full flex items-stretch gap-3 px-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2">
              {SERVICES_DECK.map((service, index) => (
                <div
                  key={service.id}
                  className="w-[215px] min-[380px]:w-[235px] sm:w-[275px] flex-shrink-0 snap-start"
                >
                  <ServiceHorizontalCard
                    service={service}
                    index={index}
                    onClick={() => handleCardClick(service.id)}
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
              {SERVICES_DECK.map((service, index) => (
                <div
                  key={service.id}
                  className="w-[320px] lg:w-[350px] flex-shrink-0"
                >
                  <ServiceHorizontalCard
                    service={service}
                    index={index}
                    onClick={() => handleCardClick(service.id)}
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
      className="group relative h-[215px] min-[380px]:h-[235px] sm:h-[320px] lg:h-[350px] w-full rounded-xl bg-[#0D0D0D] border border-[#202020] hover:border-[#383838] transition-all duration-300 ease-out p-4 min-[380px]:p-5 sm:p-7 flex flex-col justify-between cursor-pointer select-none overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
    >
      {/* Top subtle specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* ── CARD HEADER: LARGE 01-06 NUMBERING ── */}
      <div className="flex items-center justify-between">
        <span
          className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold tracking-tight text-[#555555] group-hover:text-[#4F7CFF] transition-colors duration-200"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {service.number}
        </span>
        <span className="text-[8px] min-[380px]:text-[9px] sm:text-[10px] font-mono font-semibold text-[#444444] uppercase tracking-widest">
          SERVICE {service.number}
        </span>
      </div>

      {/* ── CARD BODY: TITLE & DESCRIPTION ── */}
      <div className="mt-auto pt-1 sm:pt-2">
        <h3
          className="text-base min-[380px]:text-lg sm:text-2xl font-extrabold text-[#F5F5F5] group-hover:text-white uppercase tracking-tight leading-tight mb-1.5 sm:mb-2.5 transition-colors duration-200"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {service.title}
        </h3>
        <p className="text-[11px] min-[380px]:text-xs sm:text-sm text-[#959595] leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
          {service.description}
        </p>
      </div>
    </div>
  );
};
