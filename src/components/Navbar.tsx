import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Zap,
  Users,
  Target,
  Megaphone,
  ShoppingBag,
  HeartHandshake,
  Sliders,
  Youtube,
  Tv,
  Compass,
  DollarSign,
  Briefcase,
  Crown,
  Shield,
  FileCheck,
  ArrowUpRight
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  onOpenCampaignForm?: () => void;
}

interface DropdownItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  navigate,
  onOpenCampaignForm
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // 01 — BRAND SERVICES LIST
  const BRAND_DROPDOWN_ITEMS: DropdownItem[] = [
    {
      title: 'Influencer Marketing',
      path: '/services?tab=brands#service-influencer-marketing',
      icon: Megaphone
    },
    {
      title: 'Creator Campaigns',
      path: '/services?tab=brands#service-creator-campaigns',
      icon: Target
    },
    {
      title: 'Brand Promotions',
      path: '/services?tab=brands#service-brand-promotions',
      icon: ShoppingBag
    },
    {
      title: 'Creator Partnerships',
      path: '/services?tab=brands#service-creator-partnerships',
      icon: HeartHandshake
    },
    {
      title: 'Campaign Management',
      path: '/services?tab=brands#service-campaign-management',
      icon: Sliders
    },
    {
      title: 'YouTube Promotions',
      path: '/services?tab=brands#service-youtube-promotions',
      icon: Youtube
    },
    {
      title: 'Sponsored Content',
      path: '/services?tab=brands#service-sponsored-content',
      icon: Tv
    },
    {
      title: 'Creator Discovery & Matching',
      path: '/services?tab=brands#service-creator-discovery',
      icon: Compass
    }
  ];

  // 02 — CREATOR SERVICES LIST
  const CREATOR_DROPDOWN_ITEMS: DropdownItem[] = [
    {
      title: 'Brand Collaborations',
      path: '/services?tab=creators#service-brand-collaborations',
      icon: HeartHandshake
    },
    {
      title: 'Sponsored Campaigns',
      path: '/services?tab=creators#service-sponsored-campaigns',
      icon: DollarSign
    },
    {
      title: 'Brand Deals',
      path: '/services?tab=creators#service-brand-deals',
      icon: Briefcase
    },
    {
      title: 'Creator Partnerships',
      path: '/services?tab=creators#service-creator-partnerships-talent',
      icon: Crown
    },
    {
      title: 'Campaign Opportunities',
      path: '/services?tab=creators#service-campaign-opportunities',
      icon: Compass
    },
    {
      title: 'Creator Representation',
      path: '/services?tab=creators#service-creator-support',
      icon: Shield
    },
    {
      title: 'Deal Management',
      path: '/services?tab=creators#service-deal-management',
      icon: FileCheck
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleNavClick = (path: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreatorsClick = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    const basePath = currentPath.split('?')[0].split('#')[0];
    if (basePath === '/' || basePath === '') {
      const section = document.getElementById('creator-network-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate('/#creator-network-section');
  };

  const handleSubItemClick = (path: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleStartCampaign = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onOpenCampaignForm) {
      onOpenCampaignForm();
    } else {
      navigate('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleMobileAccordion = (section: string) => {
    setMobileExpandedSection(mobileExpandedSection === section ? null : section);
  };

  const isServicesActive = currentPath.startsWith('/services');
  const isForBrandsActive = currentPath.startsWith('/for-brands');
  const isForCreatorsActive = currentPath.startsWith('/for-creators');

  return (
    <>
      <header
        ref={navRef}
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#262626] py-3.5'
            : 'bg-[#080808]/80 backdrop-blur-sm border-b border-[#1A1A1A] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            aria-label="CreatorsSyncMedia Home"
          >
            <div className="h-9 sm:h-10 w-9 sm:w-10 flex items-center justify-center flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dbqmhnahl/image/upload/v1788333936/CSM_png_cirlce_uwvyan.png"
                alt="CreatorsSyncMedia Logo"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-lg font-extrabold tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
              >
                Creators<span className="text-[#4F7CFF]">Sync</span>Media
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            
            {/* 1. SERVICES MENU (MEGA DROPDOWN) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-link-services"
                onClick={() => handleNavClick('/services')}
                className={`inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors py-1 cursor-pointer ${
                  isServicesActive
                    ? 'text-[#F5F5F5]'
                    : 'text-[#A1A1A1] hover:text-[#F5F5F5]'
                }`}
                aria-expanded={activeDropdown === 'services'}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#A1A1A1] transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180 text-[#4F7CFF]' : ''
                  }`}
                />
                {isServicesActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4F7CFF] rounded-full" />
                )}
              </button>

              {/* Services Mega Dropdown Panel */}
              {activeDropdown === 'services' && (
                <div
                  id="services-mega-dropdown"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[620px] rounded-none bg-black border border-[#222222] shadow-2xl p-0 grid grid-cols-2 divide-x divide-[#1A1A1A] animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  {/* Left Column: For Brands */}
                  <div className="flex flex-col p-4">
                    <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#1A1A1A] px-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-[#4F7CFF]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
                          For Brands
                        </span>
                      </div>
                      <button
                        onClick={() => handleNavClick('/services?tab=brands')}
                        className="text-[11px] font-semibold text-[#4F7CFF] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        All <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="space-y-0 -mx-4">
                      {BRAND_DROPDOWN_ITEMS.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.title}
                            onClick={() => handleSubItemClick(item.path)}
                            className="w-full text-left py-2.5 px-6 rounded-none bg-black hover:bg-[#141414] group transition-colors flex items-center justify-between cursor-pointer border-l-2 border-transparent hover:border-[#4F7CFF]"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <IconComponent className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#4F7CFF] transition-colors flex-shrink-0" />
                              <span className="text-xs font-medium text-[#D4D4D4] group-hover:text-white transition-colors truncate">
                                {item.title}
                              </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#404040] group-hover:text-[#4F7CFF] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: For Creators */}
                  <div className="flex flex-col p-4">
                    <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#1A1A1A] px-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#4F7CFF]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
                          For Creators
                        </span>
                      </div>
                      <button
                        onClick={() => handleNavClick('/services?tab=creators')}
                        className="text-[11px] font-semibold text-[#4F7CFF] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        All <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="space-y-0 -mx-4">
                      {CREATOR_DROPDOWN_ITEMS.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.title}
                            onClick={() => handleSubItemClick(item.path)}
                            className="w-full text-left py-2.5 px-6 rounded-none bg-black hover:bg-[#141414] group transition-colors flex items-center justify-between cursor-pointer border-l-2 border-transparent hover:border-[#4F7CFF]"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <IconComponent className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#4F7CFF] transition-colors flex-shrink-0" />
                              <span className="text-xs font-medium text-[#D4D4D4] group-hover:text-white transition-colors truncate">
                                {item.title}
                              </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#404040] group-hover:text-[#4F7CFF] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. FOR BRANDS MENU DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('for-brands')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-link-for-brands"
                onClick={() => handleNavClick('/for-brands')}
                className={`inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors py-1 cursor-pointer ${
                  isForBrandsActive
                    ? 'text-[#F5F5F5]'
                    : 'text-[#A1A1A1] hover:text-[#F5F5F5]'
                }`}
                aria-expanded={activeDropdown === 'for-brands'}
              >
                <span>For Brands</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#A1A1A1] transition-transform duration-200 ${
                    activeDropdown === 'for-brands' ? 'rotate-180 text-[#4F7CFF]' : ''
                  }`}
                />
                {isForBrandsActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4F7CFF] rounded-full" />
                )}
              </button>

              {/* For Brands Dropdown Panel */}
              {activeDropdown === 'for-brands' && (
                <div
                  id="brands-dropdown-panel"
                  className="absolute top-full left-0 mt-3 w-[290px] rounded-none bg-black border border-[#222222] shadow-2xl p-0 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  <div className="px-5 py-3 border-b border-[#1A1A1A] flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1]">
                      Brand Solutions
                    </span>
                    <button
                      onClick={() => handleNavClick('/for-brands')}
                      className="text-[10px] font-bold text-[#4F7CFF] hover:underline cursor-pointer"
                    >
                      Overview →
                    </button>
                  </div>

                  <div className="space-y-0">
                    {BRAND_DROPDOWN_ITEMS.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.title}
                          onClick={() => handleSubItemClick(item.path)}
                          className="w-full text-left py-2.5 px-5 rounded-none bg-black hover:bg-[#141414] group transition-colors flex items-center justify-between cursor-pointer border-l-2 border-transparent hover:border-[#4F7CFF]"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <IconComponent className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#4F7CFF] transition-colors flex-shrink-0" />
                            <span className="text-xs font-medium text-[#D4D4D4] group-hover:text-white transition-colors truncate">
                              {item.title}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#404040] group-hover:text-[#4F7CFF] opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3 border-t border-[#1A1A1A]">
                    <button
                      onClick={handleStartCampaign}
                      className="w-full py-2 px-3 rounded-none bg-[#111111] hover:bg-[#4F7CFF] text-[#F5F5F5] hover:text-white border border-[#262626] hover:border-[#4F7CFF] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Brief a Campaign</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. FOR CREATORS MENU DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('for-creators')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-link-for-creators"
                onClick={() => handleNavClick('/for-creators')}
                className={`inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors py-1 cursor-pointer ${
                  isForCreatorsActive
                    ? 'text-[#F5F5F5]'
                    : 'text-[#A1A1A1] hover:text-[#F5F5F5]'
                }`}
                aria-expanded={activeDropdown === 'for-creators'}
              >
                <span>For Creators</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#A1A1A1] transition-transform duration-200 ${
                    activeDropdown === 'for-creators' ? 'rotate-180 text-[#4F7CFF]' : ''
                  }`}
                />
                {isForCreatorsActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4F7CFF] rounded-full" />
                )}
              </button>

              {/* For Creators Dropdown Panel */}
              {activeDropdown === 'for-creators' && (
                <div
                  id="creators-dropdown-panel"
                  className="absolute top-full left-0 mt-3 w-[290px] rounded-none bg-black border border-[#222222] shadow-2xl p-0 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  <div className="px-5 py-3 border-b border-[#1A1A1A] flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1]">
                      Creator Opportunities
                    </span>
                    <button
                      onClick={() => handleNavClick('/for-creators')}
                      className="text-[10px] font-bold text-[#4F7CFF] hover:underline cursor-pointer"
                    >
                      Overview →
                    </button>
                  </div>

                  <div className="space-y-0">
                    {CREATOR_DROPDOWN_ITEMS.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.title}
                          onClick={() => handleSubItemClick(item.path)}
                          className="w-full text-left py-2.5 px-5 rounded-none bg-black hover:bg-[#141414] group transition-colors flex items-center justify-between cursor-pointer border-l-2 border-transparent hover:border-[#4F7CFF]"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <IconComponent className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#4F7CFF] transition-colors flex-shrink-0" />
                            <span className="text-xs font-medium text-[#D4D4D4] group-hover:text-white transition-colors truncate">
                              {item.title}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#404040] group-hover:text-[#4F7CFF] opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3 border-t border-[#1A1A1A]">
                    <button
                      onClick={() => handleNavClick('/for-creators')}
                      className="w-full py-2 px-3 rounded-none bg-[#111111] hover:bg-[#4F7CFF] text-[#F5F5F5] hover:text-white border border-[#262626] hover:border-[#4F7CFF] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Join Talent Roster</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. CREATORS ROSTER */}
            <button
              id="nav-link-creators"
              onClick={handleCreatorsClick}
              className={`text-sm font-medium tracking-wide transition-colors relative py-1 cursor-pointer ${
                currentPath.includes('#creator-network-section') || currentPath === '/creators'
                  ? 'text-[#F5F5F5]'
                  : 'text-[#A1A1A1] hover:text-[#F5F5F5]'
              }`}
            >
              Creators
              {(currentPath.includes('#creator-network-section') || currentPath === '/creators') && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4F7CFF] rounded-full" />
              )}
            </button>

            {/* 5. ABOUT */}
            <button
              id="nav-link-about"
              onClick={() => handleNavClick('/about')}
              className={`text-sm font-medium tracking-wide transition-colors relative py-1 cursor-pointer ${
                currentPath === '/about'
                  ? 'text-[#F5F5F5]'
                  : 'text-[#A1A1A1] hover:text-[#F5F5F5]'
              }`}
            >
              About
              {currentPath === '/about' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4F7CFF] rounded-full" />
              )}
            </button>

            {/* 6. CONTACT */}
            <button
              id="nav-link-contact"
              onClick={() => handleNavClick('/contact')}
              className={`text-sm font-medium tracking-wide transition-colors relative py-1 cursor-pointer ${
                currentPath === '/contact'
                  ? 'text-[#F5F5F5]'
                  : 'text-[#A1A1A1] hover:text-[#F5F5F5]'
              }`}
            >
              Contact
              {currentPath === '/contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4F7CFF] rounded-full" />
              )}
            </button>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="desktop-start-campaign-cta"
              onClick={handleStartCampaign}
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#F5F5F5] text-[#080808] hover:bg-[#4F7CFF] hover:text-white rounded-full transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[#4F7CFF]/20"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#141414] border border-[#262626] text-[#F5F5F5] hover:text-[#4F7CFF] focus:outline-none transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-40 bg-[#080808] pt-24 pb-8 px-6 flex flex-col justify-between overflow-y-auto lg:hidden animate-in fade-in duration-200"
        >
          <div className="flex flex-col gap-3 pt-2">
            <div className="text-xs font-semibold tracking-widest text-[#4F7CFF] uppercase mb-1">
              Navigation Menu
            </div>

            {/* Mobile Accordion: Services */}
            <div className="border-b border-[#1A1A1A] pb-3">
              <div className="flex items-center justify-between py-2">
                <button
                  onClick={() => handleNavClick('/services')}
                  className="text-xl font-bold tracking-tight text-[#F5F5F5] hover:text-[#4F7CFF] text-left cursor-pointer"
                >
                  Services
                </button>
                <button
                  onClick={() => toggleMobileAccordion('services')}
                  className="p-2 rounded-lg bg-[#141414] border border-[#262626] text-[#A1A1A1] cursor-pointer"
                  aria-label="Expand Services"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExpandedSection === 'services' ? 'rotate-180 text-[#4F7CFF]' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileExpandedSection === 'services' && (
                <div className="mt-2 space-y-4 py-2 bg-black rounded-none p-3 border border-[#202020] animate-in fade-in duration-150">
                  {/* For Brands Section */}
                  <div>
                    <div className="text-[11px] font-bold uppercase text-[#4F7CFF] tracking-wider mb-2 flex items-center gap-1.5 px-2">
                      <Zap className="w-3 h-3" /> For Brands
                    </div>
                    <div className="grid grid-cols-1 gap-0">
                      {BRAND_DROPDOWN_ITEMS.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.title}
                            onClick={() => handleSubItemClick(item.path)}
                            className="text-left py-2.5 px-3 rounded-none bg-black hover:bg-[#141414] text-xs font-medium text-[#C0C0C0] hover:text-white flex items-center justify-between group transition-colors border-l-2 border-transparent hover:border-[#4F7CFF]"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <IconComponent className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#4F7CFF] transition-colors flex-shrink-0" />
                              <span className="truncate">{item.title}</span>
                            </div>
                            <ChevronRight className="w-3 h-3 text-[#505050]" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* For Creators Section */}
                  <div className="pt-2 border-t border-[#1C1C1C]">
                    <div className="text-[11px] font-bold uppercase text-[#4F7CFF] tracking-wider mb-2 flex items-center gap-1.5 px-2">
                      <Users className="w-3 h-3" /> For Creators
                    </div>
                    <div className="grid grid-cols-1 gap-0">
                      {CREATOR_DROPDOWN_ITEMS.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.title}
                            onClick={() => handleSubItemClick(item.path)}
                            className="text-left py-2.5 px-3 rounded-none bg-black hover:bg-[#141414] text-xs font-medium text-[#C0C0C0] hover:text-white flex items-center justify-between group transition-colors border-l-2 border-transparent hover:border-[#4F7CFF]"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <IconComponent className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#4F7CFF] transition-colors flex-shrink-0" />
                              <span className="truncate">{item.title}</span>
                            </div>
                            <ChevronRight className="w-3 h-3 text-[#505050]" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Accordion: For Brands */}
            <div className="border-b border-[#1A1A1A] pb-3">
              <div className="flex items-center justify-between py-2">
                <button
                  onClick={() => handleNavClick('/for-brands')}
                  className="text-xl font-bold tracking-tight text-[#F5F5F5] hover:text-[#4F7CFF] text-left cursor-pointer"
                >
                  For Brands
                </button>
                <button
                  onClick={() => toggleMobileAccordion('for-brands')}
                  className="p-2 rounded-none bg-[#141414] border border-[#262626] text-[#A1A1A1] cursor-pointer"
                  aria-label="Expand For Brands"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExpandedSection === 'for-brands' ? 'rotate-180 text-[#4F7CFF]' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileExpandedSection === 'for-brands' && (
                <div className="mt-2 space-y-0 py-1 bg-black rounded-none p-2 border border-[#202020] animate-in fade-in duration-150">
                  {BRAND_DROPDOWN_ITEMS.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.title}
                        onClick={() => handleSubItemClick(item.path)}
                        className="w-full text-left py-2.5 px-3 rounded-none bg-black hover:bg-[#141414] text-xs font-medium text-[#C0C0C0] hover:text-white flex items-center justify-between group transition-colors border-l-2 border-transparent hover:border-[#4F7CFF]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <IconComponent className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#4F7CFF] transition-colors flex-shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-[#505050]" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Accordion: For Creators */}
            <div className="border-b border-[#1A1A1A] pb-3">
              <div className="flex items-center justify-between py-2">
                <button
                  onClick={() => handleNavClick('/for-creators')}
                  className="text-xl font-bold tracking-tight text-[#F5F5F5] hover:text-[#4F7CFF] text-left cursor-pointer"
                >
                  For Creators
                </button>
                <button
                  onClick={() => toggleMobileAccordion('for-creators')}
                  className="p-2 rounded-none bg-[#141414] border border-[#262626] text-[#A1A1A1] cursor-pointer"
                  aria-label="Expand For Creators"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExpandedSection === 'for-creators' ? 'rotate-180 text-[#4F7CFF]' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileExpandedSection === 'for-creators' && (
                <div className="mt-2 space-y-0 py-1 bg-black rounded-none p-2 border border-[#202020] animate-in fade-in duration-150">
                  {CREATOR_DROPDOWN_ITEMS.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.title}
                        onClick={() => handleSubItemClick(item.path)}
                        className="w-full text-left py-2.5 px-3 rounded-none bg-black hover:bg-[#141414] text-xs font-medium text-[#C0C0C0] hover:text-white flex items-center justify-between group transition-colors border-l-2 border-transparent hover:border-[#4F7CFF]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <IconComponent className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#4F7CFF] transition-colors flex-shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-[#505050]" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other Mobile Nav Links */}
            <button
              onClick={handleCreatorsClick}
              className="text-xl font-bold tracking-tight text-left flex items-center justify-between py-3 border-b border-[#1A1A1A] text-[#F5F5F5] hover:text-[#4F7CFF] cursor-pointer"
            >
              <span>Creators</span>
              <ArrowRight className="w-4 h-4 text-[#707070]" />
            </button>

            <button
              onClick={() => handleNavClick('/about')}
              className="text-xl font-bold tracking-tight text-left flex items-center justify-between py-3 border-b border-[#1A1A1A] text-[#F5F5F5] hover:text-[#4F7CFF] cursor-pointer"
            >
              <span>About</span>
              <ArrowRight className="w-4 h-4 text-[#707070]" />
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className="text-xl font-bold tracking-tight text-left flex items-center justify-between py-3 border-b border-[#1A1A1A] text-[#F5F5F5] hover:text-[#4F7CFF] cursor-pointer"
            >
              <span>Contact</span>
              <ArrowRight className="w-4 h-4 text-[#707070]" />
            </button>
          </div>

          <div className="pt-6 border-t border-[#262626] flex flex-col gap-4 mt-6">
            <button
              id="mobile-start-campaign-cta"
              onClick={handleStartCampaign}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#4F7CFF] text-white font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-lg shadow-[#4F7CFF]/20"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-center text-[#A1A1A1]">
              Big Brands. Real Creators. Bigger Impact.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
