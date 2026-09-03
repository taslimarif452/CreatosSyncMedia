import React, { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { TrustSection } from '../components/TrustSection';
import { Metrics } from '../components/Metrics';
import { ServicesSection } from '../components/ServicesSection';
import { CreatorNetworkSection } from '../components/CreatorNetworkSection';
import { CampaignShowcase } from '../components/CampaignShowcase';
import { ProcessSection } from '../components/ProcessSection';
import { BrandCTA } from '../components/BrandCTA';
import { CreatorCTA } from '../components/CreatorCTA';
import { CampaignForm } from '../components/CampaignForm';
import { Campaign } from '../types';
import { useAdminData } from '../context/AdminDataContext';

interface HomeProps {
  navigate: (path: string) => void;
  onSelectCampaign: (campaign: Campaign) => void;
  onSelectCreator: (creatorId: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  navigate,
  onSelectCampaign,
  onSelectCreator
}) => {
  const { settings } = useAdminData();

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash === '#creator-network-section' || hash === '#creators') {
        setTimeout(() => {
          const el = document.getElementById('creator-network-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  const scrollToCampaignForm = () => {
    const el = document.getElementById('campaign-lead-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };

  const handleJoinNetwork = () => {
    navigate('/for-creators');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="home-page-container" className="flex flex-col w-full">
      {/* 01. Hero */}
      <Hero
        onStartCampaign={scrollToCampaignForm}
        onJoinNetwork={handleJoinNetwork}
      />

      {/* Brand Partners Heading */}
      <h2
        id="our-brand-partners-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#F5F5F5] pt-10 sm:pt-14 pb-2 bg-transparent border-none"
      >
        Our Brand Partners 
      </h2>

      {/* 02. Trust / Social Proof */}
      <TrustSection />

      {/* 03. Metrics */}
      <Metrics />

      {/* 04. Services */}
      <ServicesSection
        onSelectService={() => {
          navigate('/services');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewAllServices={() => {
          navigate('/services');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 05. Creator Network (Conditionally rendered by Admin toggle) */}
      {settings.showCreatorsSection && (
        <CreatorNetworkSection
          onSelectCreator={onSelectCreator}
          onExploreAll={() => {
            navigate('/creators');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 06. How It Works / Process */}
      <ProcessSection />

      {/* 07. Campaign Showcase (Conditionally rendered by Admin toggle) */}
      {settings.showCampaignsSection && (
        <CampaignShowcase
          onSelectCampaign={onSelectCampaign}
        />
      )}

      {/* 08. For Brands CTA */}
      <BrandCTA onStartCampaign={scrollToCampaignForm} />

      {/* 10. For Creators CTA */}
      <CreatorCTA onJoinNetwork={handleJoinNetwork} />

      {/* 11. Campaign Lead Form */}
      <CampaignForm />
    </div>
  );
};
