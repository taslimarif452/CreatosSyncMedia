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
  // Configurable business numbers matching user specifications
  const METRICS_DATA: MetricItem[] = [
    {
      id: 'brands-served',
      value: '40+',
      targetNum: 40,
      suffix: '+',
      label: 'Brands Served',
      sublabel: 'Direct Brand Partnerships'
    },
    {
      id: 'creators-onboard',
      value: '200+',
      targetNum: 200,
      suffix: '+',
      label: 'Creators Onboard',
      sublabel: 'Vetted Category Leaders'
    },
    {
      id: 'campaigns-executed',
      value: '500+',
      targetNum: 500,
      suffix: '+',
      label: 'Campaigns Executed',
      sublabel: 'Delivered Across Verticals'
    },
    {
      id: 'pan-india',
      value: 'PAN INDIA',
      targetNum: 0,
      suffix: '',
      label: 'NETWORK',
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
    <section id="metrics-section" className="pt-14 sm:pt-16 md:pt-20 pb-0 bg-[#080808] border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14">
        <div className="text-center max-w-3xl mx-auto">
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
      </div>

      {/* 4-Metric Container: 2 Cards visible at once on Mobile (horizontal scroll), 4-Col Grid on Desktop */}
      <div className="w-full border-t border-[#222222] bg-black">
        <div className="w-full flex lg:grid lg:grid-cols-4 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
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
                className={`group w-1/2 min-w-[50%] max-w-[50%] lg:w-auto lg:min-w-0 lg:max-w-none flex-shrink-0 lg:flex-shrink snap-start min-h-[150px] sm:min-h-[190px] md:min-h-[240px] lg:min-h-[280px] p-3.5 min-[380px]:p-4 sm:p-6 lg:p-4 xl:p-8 2xl:p-10 flex flex-col justify-between text-left items-start transition-all duration-200 hover:bg-[#0a0a0a] cursor-pointer ${
                  index !== 0 ? 'border-l border-[#1F1F1F]' : ''
                }`}
              >
                {/* Top Section: Large Number + Uppercase Label */}
                <div className="w-full text-left">
                  <div className="text-[22px] min-[360px]:text-[25px] min-[390px]:text-[28px] sm:text-[38px] md:text-[50px] lg:text-[60px] font-bold text-[#FFFFFF] group-hover:text-[#4F7CFF] transition-colors duration-200 tracking-tighter sm:tracking-tight leading-none whitespace-nowrap">
                    {displayVal}
                  </div>
                  <div className="text-[10px] min-[360px]:text-[11px] sm:text-xs md:text-sm font-medium text-[#F5F5F5] group-hover:text-[#4F7CFF] transition-colors duration-200 uppercase tracking-wider mt-2 sm:mt-3.5">
                    {item.label}
                  </div>
                </div>

                {/* Bottom Section: Clean Sublabel without underline/border */}
                <div className="w-full mt-3 sm:mt-6">
                  <div className="text-[10px] min-[360px]:text-[11px] sm:text-xs md:text-sm text-[#737373] group-hover:text-[#A3A3A3] transition-colors duration-200 leading-snug">
                    {item.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
