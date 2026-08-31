import React, { useEffect, useRef, useState } from 'react';

export const TrustSection: React.FC = () => {
  const ecosystemPillars = [
    {
      label: 'Consumer Tech & Hardware',
      image: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/RWCZER-Legal-IP-Trademarks-CP-MS-logo-740x417-1?wid=406&hei=230&fit=crop&resSharp=1'
    },
    {
      label: 'FinTech & Wealth Apps',
      image: 'https://play-lh.googleusercontent.com/p2zsSptkexyDWZdo0zVjxSDUDDri_dYiKS4SJXh8NlF7Gy3SUJH9HA5kFbmU13YIIk8GZ0yyBF5oqGSoMmBT-78=w480-h960-rw'
    },
    {
      label: 'Next-Gen Gaming & Esports',
      image: 'https://pbs.twimg.com/profile_images/1560936388916350976/w28u0jR4_400x400.jpg'
    },
    {
      label: 'EdTech & Professional Skills',
      image: 'https://i0.wp.com/lawbhoomi.com/wp-content/uploads/2025/06/Grynow.jpg?fit=1200%2C800&ssl=1'
    }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const singleSetRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);
  const [, setHoverState] = useState<boolean>(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animId: number;
    const autoSpeed = 3.8; // Increased speed in pixels per frame

    const step = () => {
      if (container && !isHoveredRef.current) {
        const singleWidth = singleSetRef.current ? singleSetRef.current.offsetWidth : 0;
        if (singleWidth > 0) {
          container.scrollLeft += autoSpeed;
          if (container.scrollLeft >= singleWidth) {
            container.scrollLeft -= singleWidth;
          }
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    // Mouse wheel event: horizontal scroll & pause marquee on hover
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const singleWidth = singleSetRef.current ? singleSetRef.current.offsetWidth : 0;
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      
      container.scrollLeft += delta * 1.2;

      if (singleWidth > 0) {
        if (container.scrollLeft >= singleWidth * 2) {
          container.scrollLeft -= singleWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += singleWidth;
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setHoverState(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setHoverState(false);
  };

  const renderSet = (ref?: React.RefObject<HTMLDivElement>) => (
    <div ref={ref} className="flex items-stretch shrink-0">
      {ecosystemPillars.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center text-center shrink-0 select-none group px-8 sm:px-12 md:px-16 py-4 border-r border-[#262626]"
        >
          <img
            src={item.image}
            alt={item.label}
            className="h-28 sm:h-36 md:h-44 max-w-[280px] object-contain mb-4 pointer-events-none drop-shadow-md"
            loading="lazy"
            draggable={false}
            referrerPolicy="no-referrer"
          />
          <span className="text-sm sm:text-base md:text-lg font-medium text-[#D4D4D4] group-hover:text-white transition-colors leading-tight whitespace-nowrap">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section
      id="trust-section"
      className="py-14 sm:py-16 md:py-20 bg-[#080808] border border-[#262626] overflow-hidden flex items-center min-h-[160px] sm:min-h-[200px]"
    >
      <div className="w-full">
        <div className="flex flex-col items-center text-center">
          {/* Horizontal Scroll & Marquee Container */}
          <div
            className="w-full overflow-hidden relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Fade Gradients at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

            <div
              ref={scrollContainerRef}
              className="flex items-center overflow-x-hidden no-scrollbar w-full select-none cursor-grab active:cursor-grabbing"
              style={{ scrollBehavior: 'auto' }}
            >
              {/* Set 1 (measured for seamless infinite loop offset) */}
              {renderSet(singleSetRef)}

              {/* Set 2 */}
              {renderSet()}

              {/* Set 3 */}
              {renderSet()}

              {/* Set 4 */}
              {renderSet()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

