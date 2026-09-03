import React from 'react';
import { ArrowUpRight, Youtube, Instagram, Linkedin, Twitter, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-9 sm:h-10 w-9 sm:w-10 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://res.cloudinary.com/dbqmhnahl/image/upload/v1788333936/CSM_png_cirlce_uwvyan.png"
                    alt="CreatorsSyncMedia Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
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
              <div className="text-xs text-[#A1A1A1] max-w-sm leading-relaxed mb-6 space-y-2.5">
                <p>
                  At CreatorsSyncMedia, we bridge the gap between brands and creators to build collaborations that inspire, engage, and deliver real results.
                </p>
                <p>
                  We’re on a mission to empower creators, elevate brands, and shape the future of digital storytelling.
                </p>
              </div>
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
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => handleNav('/services')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Services & Strategy
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNav('/for-brands')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              For Brands
            </button>
            <button
              onClick={() => handleNav('/for-creators')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              For Creators
            </button>
          </div>

          {/* Quick Roster Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#F5F5F5] mb-2">
              Solutions
            </h4>
            <button
              onClick={handleCreatorsClick}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Creator Directory
            </button>
            <button
              onClick={() => handleNav('/for-brands')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Brand Campaign Brief
            </button>
            <button
              onClick={() => handleNav('/for-creators')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Join Talent Network
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="text-xs text-left text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Schedule Strategy Call
            </button>
          </div>

          {/* Direct Contact & Address */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#F5F5F5] mb-2">
              Contact Us
            </h4>

            {/* Email */}
            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#4F7CFF] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-[#737373] block uppercase font-medium">Email</span>
                <a
                  href="mailto:partnerships@creatorssyncmedia.in"
                  className="text-xs text-[#E5E5E5] hover:text-[#4F7CFF] transition-colors break-all"
                >
                  partnerships@creatorssyncmedia.in
                </a>
              </div>
            </div>

            {/* Call & WhatsApp */}
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-[#737373] block uppercase font-medium">Call & WhatsApp</span>
                <a
                  href="https://wa.me/918108975875"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#E5E5E5] hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-medium"
                >
                  <span>+91 8108975875</span>
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#4F7CFF] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-[#737373] block uppercase font-medium">Address</span>
                <p className="text-xs text-[#A1A1A1] leading-relaxed">
                  Ghatkopar West Mumbai Maharashtra 400086
                </p>
              </div>
            </div>

            {/* Quick WhatsApp CTA Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/918108975875"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-[#141414] hover:bg-emerald-500/20 border border-[#262626] hover:border-emerald-500/40 text-xs font-semibold text-emerald-400 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
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
