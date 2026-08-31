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

      {/* 05. Creator Network */}
      <CreatorNetworkSection
        onSelectCreator={onSelectCreator}
        onExploreAll={() => {
          navigate('/creators');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 06. How It Works / Process */}
      <ProcessSection />

      {/* 07. Campaign Showcase (Campaigns That Made Noise) */}
      <CampaignShowcase
        onSelectCampaign={onSelectCampaign}
      />

      {/* 08. For Brands CTA */}
      <BrandCTA onStartCampaign={scrollToCampaignForm} />

      {/* 10. For Creators CTA */}
      <CreatorCTA onJoinNetwork={handleJoinNetwork} />

      {/* 11. Campaign Lead Form */}
      <CampaignForm />
    </div>
  );
};
