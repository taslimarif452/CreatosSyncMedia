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
import { Admin } from './pages/Admin';
import { AdminDataProvider } from './context/AdminDataContext';
import { Campaign } from './types';

const getNormalizedPath = (): string => {
  if (typeof window === 'undefined') return '/';

  // 1. Check search parameter (e.g. ?page=admin or ?path=/admin)
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page') || urlParams.get('path');
  if (pageParam) {
    return pageParam.startsWith('/') ? pageParam : `/${pageParam}`;
  }

  // 2. Check hash route (e.g. #/admin or #admin)
  const hash = window.location.hash;
  if (hash && hash.startsWith('#/')) {
    return hash.substring(1);
  }
  if (hash && hash.startsWith('#')) {
    const cleanHash = hash.substring(1);
    if (['admin', 'services', 'for-brands', 'for-creators', 'creators', 'about', 'contact'].includes(cleanHash) || cleanHash.startsWith('creator/')) {
      return `/${cleanHash}`;
    }
  }

  // 3. Standard pathname
  return window.location.pathname || '/';
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => getNormalizedPath());
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(() => {
    const initPath = getNormalizedPath();
    if (initPath.startsWith('/creator/')) {
      return initPath.replace('/creator/', '');
    }
    return null;
  });

  // Handle browser back/forward and hash changes
  useEffect(() => {
    const syncLocation = () => {
      const path = getNormalizedPath();
      setCurrentPath(path);
      if (path.startsWith('/creator/')) {
        const id = path.replace('/creator/', '');
        setSelectedCreatorId(id);
      } else {
        setSelectedCreatorId(null);
      }
    };

    // Run on initial mount
    syncLocation();

    window.addEventListener('popstate', syncLocation);
    window.addEventListener('hashchange', syncLocation);
    return () => {
      window.removeEventListener('popstate', syncLocation);
      window.removeEventListener('hashchange', syncLocation);
    };
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

  const basePath = currentPath.split('?')[0].split('#')[0];
  const isAdminPage = basePath === '/admin';

  const renderContent = () => {
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
      case '/admin':
        return <Admin navigate={navigate} />;
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
    <AdminDataProvider>
      <div className="min-h-screen bg-[#080808] text-[#F5F5F5] font-sans antialiased selection:bg-[#4F7CFF] selection:text-white flex flex-col justify-between">
        {/* Persistent Navigation (Hidden on standalone admin screen for clean workspace) */}
        {!isAdminPage && <Navbar currentPath={currentPath} navigate={navigate} />}

        {/* Main Page Content */}
        <main className={`flex-grow ${isAdminPage ? 'min-h-screen' : ''}`}>{renderContent()}</main>

        {/* Persistent Footer (Hidden on standalone admin screen) */}
        {!isAdminPage && <Footer navigate={navigate} />}

        {/* Global Interactive Campaign Detail Modal */}
        <CampaignDetailModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onStartCampaign={handleStartCampaignFromModal}
        />
      </div>
    </AdminDataProvider>
  );
}
