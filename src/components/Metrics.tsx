import React, { useState, useEffect } from 'react';

interface MetricItem {
  id: string;
  value: string;
  targetNum: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export const Metrics: React.FC = () => {
  // Configurable business numbers
  const METRICS_DATA: MetricItem[] = [
    {
      id: 'creators-count',
      value: '500+',
      targetNum: 500,
      suffix: '+',
      label: 'Creators',
      sublabel: 'Vetted Category Leaders'
    },
    {
      id: 'audience-reach',
      value: '50M+',
      targetNum: 50,
      suffix: 'M+',
      label: 'Reach',
      sublabel: 'Engaged Monthly Impressions'
    },
    {
      id: 'campaigns-count',
      value: '100+',
      targetNum: 100,
      suffix: '+',
      label: 'Campaigns',
      sublabel: 'Delivered Across Verticals'
    },
    {
      id: 'network-span',
      value: 'PAN INDIA',
      targetNum: 0,
      suffix: '',
      label: 'Network',
      sublabel: 'Tier 1 & Tier 2 Regional Reach'
    }
  ];

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= 100) {
        setCounter(100);
        clearInterval(timer);
      } else {
        setCounter(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="metrics-section" className="py-16 md:py-24 bg-[#080808] border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-bold text-[#4F7CFF] uppercase tracking-widest mb-3.5">
            Our Network
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            where attention meets influence.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A1A1A1] max-w-xl mx-auto leading-relaxed">
            Direct relationships with top digital creators across India’s most influential consumer niches.
          </p>
        </div>

        {/* 4-Metric Container: 4-Column Grid on all screen sizes including mobile (No horizontal scrolling) */}
        <div className="grid grid-cols-4 rounded-none bg-black border border-[#222222]">
          {METRICS_DATA.map((item, index) => {
            // Calculate dynamic animated value if numerical
            let displayVal = item.value;
            if (item.targetNum > 0) {
              const currentNum = Math.floor((item.targetNum * counter) / 100);
              displayVal = `${currentNum}${item.suffix}`;
            }

            return (
              <div
                key={item.id}
                className={`group min-h-[110px] sm:min-h-[160px] md:min-h-[220px] p-2.5 sm:p-4 md:p-8 flex flex-col justify-between transition-all duration-200 hover:bg-[#0c0c0c] cursor-pointer ${
                  index !== 0 ? 'border-l border-[#1F1F1F]' : ''
                }`}
              >
                <div>
                  <div className="text-base min-[380px]:text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold sm:font-normal text-[#F5F5F5] group-hover:text-[#4F7CFF] transition-colors duration-200 tracking-tight mb-1 sm:mb-2">
                    {displayVal}
                  </div>
                  <div className="text-[10px] min-[380px]:text-[11px] sm:text-sm md:text-base font-medium sm:font-normal text-[#F5F5F5] group-hover:text-[#4F7CFF] transition-colors duration-200 uppercase tracking-tight sm:tracking-wider">
                    {item.label}
                  </div>
                </div>
                <div className="text-[9px] min-[380px]:text-[10px] sm:text-xs md:text-sm font-normal text-[#8A8A8A] leading-tight sm:leading-relaxed pt-1.5 sm:pt-2 border-t border-[#1a1a1a]/60 mt-2">
                  {item.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
