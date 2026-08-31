import React from 'react';
import { ArrowUpRight, Youtube, Instagram, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const handleNav = (path: string) => {
    navigate(path);
    if (!path.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCreatorsClick = () => {
    const section = document.getElementById('creator-network-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/#creator-network-section');
    }
  };

  return (
    <footer id="main-footer" className="bg-[#080808] border-t border-[#262626] text-[#A1A1A1] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#4F7CFF]" />
                </div>
                <span
                  className="text-xl font-extrabold tracking-tight text-[#F5F5F5]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
                >
                  Creators<span className="text-[#4F7CFF]">Sync</span>Media
                </span>
              </div>
              <p className="text-sm font-medium text-[#F5F5F5] max-w-sm mb-3">
                Big Brands. Real Creators. Bigger Impact.
              </p>
              <p className="text-xs text-[#A1A1A1] max-w-sm leading-relaxed mb-6">
                Premium creator & influencer marketing agency connecting ambitious consumer brands, tech enterprises, and startups with vetted Indian digital creators.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] border border-[#262626] hover:border-[#4F7CFF] hover:text-[#F5F5F5] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] border border-[#262626] hover:border-[#4F7CFF] hover:text-[#F5F5F5] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] border border-[#262626] hover:border-[#4F7CFF] hover:text-[#F5F5F5] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] border border-[#262626] hover:border-[#4F7CFF] hover:text-[#F5F5F5] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#F5F5F5] mb-2">
              Company
            </h4>
            <button
              onClick={() => handleNav('/about')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              About Agency
            </button>
            <button
              onClick={() => handleNav('/services')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              Services & Strategy
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              Contact & Enquiries
            </button>
          </div>

          {/* For Brands */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#F5F5F5] mb-2">
              For Brands
            </h4>
            <button
              onClick={() => handleNav('/for-brands')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              Brand Solutions
            </button>
            <button
              onClick={handleCreatorsClick}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Creator Directory
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              Let's Talk
            </button>
            <button
              onClick={() => handleNav('/services')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              Matching Process
            </button>
          </div>

          {/* For Creators */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#F5F5F5] mb-2">
              For Creators
            </h4>
            <button
              onClick={() => handleNav('/for-creators')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              Join Creator Network
            </button>
            <button
              onClick={() => handleNav('/for-creators')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              Monetization & Benefits
            </button>
            <button
              onClick={() => handleNav('/for-creators')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              Creator FAQs
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              Agency Representation
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A1A1A1]">
          <div>
            © {new Date().getFullYear()} CreatorsSyncMedia. All rights reserved. Registered Indian Media Agency.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#F5F5F5] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#F5F5F5] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#F5F5F5] cursor-pointer">ASCI Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
