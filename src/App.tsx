import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CampaignDetailModal } from './components/CampaignDetailModal';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ForBrands } from './pages/ForBrands';
import { ForCreators } from './pages/ForCreators';
import { Creators } from './pages/Creators';
import { CreatorProfile } from './pages/CreatorProfile';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Campaign } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);

  // Handle browser back/forward and initial path
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      if (path.startsWith('/creator/')) {
        const id = path.replace('/creator/', '');
        setSelectedCreatorId(id);
      } else {
        setSelectedCreatorId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);

    if (path.includes('#')) {
      const hash = path.substring(path.indexOf('#'));
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (path.startsWith('/creator/')) {
      const id = path.replace('/creator/', '');
      setSelectedCreatorId(id);
    } else {
      setSelectedCreatorId(null);
    }
  };

  const handleSelectCreator = (creatorId: string) => {
    setSelectedCreatorId(creatorId);
    navigate(`/creator/${creatorId}`);
  };

  const handleStartCampaignFromModal = () => {
    setSelectedCampaign(null);
    navigate('/for-brands');
  };

  const renderContent = () => {
    const basePath = currentPath.split('?')[0].split('#')[0];

    if (basePath.startsWith('/creator/') || selectedCreatorId) {
      return (
        <CreatorProfile
          creatorId={selectedCreatorId || 'tech-01'}
          onBack={() => navigate('/creators')}
          navigate={navigate}
        />
      );
    }

    switch (basePath) {
      case '/services':
        return <Services navigate={navigate} />;
      case '/for-brands':
        return <ForBrands navigate={navigate} />;
      case '/for-creators':
        return <ForCreators navigate={navigate} />;
      case '/creators':
        return (
          <Creators
            onSelectCreator={handleSelectCreator}
            navigate={navigate}
          />
        );
      case '/about':
        return <About navigate={navigate} />;
      case '/contact':
        return <Contact />;
      case '/':
      default:
        return (
          <Home
            navigate={navigate}
            onSelectCampaign={(c) => setSelectedCampaign(c)}
            onSelectCreator={handleSelectCreator}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] font-sans antialiased selection:bg-[#4F7CFF] selection:text-white flex flex-col justify-between">
      {/* Persistent Navigation */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Page Content */}
      <main className="flex-grow">{renderContent()}</main>

      {/* Persistent Footer */}
      <Footer navigate={navigate} />

      {/* Global Interactive Campaign Detail Modal */}
      <CampaignDetailModal
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        onStartCampaign={handleStartCampaignFromModal}
      />
    </div>
  );
}
