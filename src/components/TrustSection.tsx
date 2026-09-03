import React, { useEffect, useRef, useState } from 'react';

export const TrustSection: React.FC = () => {
  const brandPartners = [
    {
      label: 'Unstop',
      image: 'https://play-lh.googleusercontent.com/QOWtHtuT-WAC1clJTeyrDhptb79ZCeQoeHNeHL7XHBsdc_Yl7w7j8XoWKbvhj4tkEMLDAhBPdOwWDbl24xrlyg'
    },
    {
      label: 'Internshala',
      image: 'https://internshala.com/blog/wp-content/themes/colormag/img/thumnail.jpg'
    },
    {
      label: 'CGC University',
      image: 'https://media.licdn.com/dms/image/v2/D5622AQGQvgihOSP-oA/feedshare-shrink_800/B56ZiYBtchHUAg-/0/1754897251006?e=2147483647&v=beta&t=8PkitTk07uFD6-6pz8JHCQT3x7eiH5y-hNMkiUHb5RM'
    },
    {
      label: 'Masai School',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHq_v_x3szNyVe0-PWkp2QnMnO6nRaaeW3X3BR2IsG06g7ty67EwNvotCT&s=10'
    },
    {
      label: 'Mirai School',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkaDh5M5wDLsik6f3hWKgiGUhHKqhACAvN_Jc9Oz0qxwmqdV-01rzBdT8&s=10'
    },
    {
      label: 'Coursera',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkzFKe5JSxzXcDw3fO3WLfPY9oV98mZ-kLuwIMD78lmw&s=10'
    },
    {
      label: 'Physics Wallah',
      image: 'https://pbs.twimg.com/media/GoKyfAXWoAAIGI8.png'
    },
    {
      label: 'Foundit',
      image: 'https://play-lh.googleusercontent.com/BKx438gbzWpEn23ELCB7Jc0o7qve1o8BhGkWHYlIzxvYWqNvq2TjLL2AufcVbt1eoEyVh_bTf1t6zybiKTa8QQ'
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
      {brandPartners.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center text-center shrink-0 select-none group px-8 sm:px-12 md:px-16 py-4 sm:py-6 border-r border-[#262626]"
        >
          <div className="h-20 sm:h-28 md:h-32 w-36 sm:w-52 md:w-60 flex items-center justify-center mb-3 sm:mb-4">
            <img
              src={item.image}
              alt={item.label}
              className="max-h-full max-w-full object-contain pointer-events-none drop-shadow-md rounded-lg group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              draggable={false}
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-[#E5E5E5] group-hover:text-white transition-colors leading-tight tracking-wide whitespace-nowrap">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section
      id="trust-section"
      className="py-10 sm:py-16 md:py-20 bg-[#080808] border-y border-[#262626] overflow-hidden flex items-center min-h-[160px] sm:min-h-[220px] md:min-h-[260px]"
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

