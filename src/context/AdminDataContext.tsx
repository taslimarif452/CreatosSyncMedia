import React, { createContext, useContext, useState, useEffect } from 'react';
import { Creator, Campaign } from '../types';
import { CREATORS as DEFAULT_CREATORS } from '../data/creators';
import { CAMPAIGNS as DEFAULT_CAMPAIGNS } from '../data/campaigns';

export interface SectionSettings {
  showCreatorsSection: boolean;
  showCampaignsSection: boolean;
  creatorsSectionTitle?: string;
  creatorsSectionSubtitle?: string;
  campaignsSectionTitle?: string;
  campaignsSectionSubtitle?: string;
}

interface AdminDataContextType {
  creators: Creator[];
  campaigns: Campaign[];
  settings: SectionSettings;
  addCreator: (creator: Creator) => void;
  updateCreator: (id: string, updatedData: Partial<Creator>) => void;
  deleteCreator: (id: string) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, updatedData: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  setSectionVisibility: (section: 'creators' | 'campaigns', isVisible: boolean) => void;
  updateSettings: (newSettings: Partial<SectionSettings>) => void;
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => { success: boolean; message: string };
}

const STORAGE_KEY = 'csm_admin_data_store_v2';

const DEFAULT_SETTINGS: SectionSettings = {
  showCreatorsSection: true,
  showCampaignsSection: true,
  creatorsSectionTitle: 'creators with influence.',
  creatorsSectionSubtitle: 'audiences with trust.',
  campaignsSectionTitle: 'campaigns that',
  campaignsSectionSubtitle: 'made noise.'
};

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [creators, setCreators] = useState<Creator[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_creators`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored creators:', e);
    }
    return DEFAULT_CREATORS;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_campaigns`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored campaigns:', e);
    }
    return DEFAULT_CAMPAIGNS;
  });

  const [settings, setSettings] = useState<SectionSettings>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_settings`);
      let base = DEFAULT_SETTINGS;
      if (stored) {
        const parsed = JSON.parse(stored);
        base = { ...DEFAULT_SETTINGS, ...parsed };
      }

      // Check explicit single flags as well (handles cases where boolean false was overwritten or lost)
      const storedShowCreators = localStorage.getItem(`${STORAGE_KEY}_show_creators`);
      if (storedShowCreators !== null) {
        base.showCreatorsSection = storedShowCreators === 'true';
      }
      const storedShowCampaigns = localStorage.getItem(`${STORAGE_KEY}_show_campaigns`);
      if (storedShowCampaigns !== null) {
        base.showCampaignsSection = storedShowCampaigns === 'true';
      }

      return base;
    } catch (e) {
      console.error('Failed to parse stored settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Listen to window storage event for real-time synchronization across browser tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key) return;
      if (e.key === `${STORAGE_KEY}_settings` && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setSettings((prev) => ({ ...prev, ...parsed }));
        } catch (err) {
          console.error(err);
        }
      } else if (e.key === `${STORAGE_KEY}_show_creators` && e.newValue !== null) {
        setSettings((prev) => ({ ...prev, showCreatorsSection: e.newValue === 'true' }));
      } else if (e.key === `${STORAGE_KEY}_show_campaigns` && e.newValue !== null) {
        setSettings((prev) => ({ ...prev, showCampaignsSection: e.newValue === 'true' }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_creators`, JSON.stringify(creators));
    } catch (e) {
      console.error('Failed to save creators:', e);
    }
  }, [creators]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_campaigns`, JSON.stringify(campaigns));
    } catch (e) {
      console.error('Failed to save campaigns:', e);
    }
  }, [campaigns]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings]);

  // Creator Actions
  const addCreator = (newCreator: Creator) => {
    setCreators((prev) => [newCreator, ...prev]);
  };

  const updateCreator = (id: string, updatedData: Partial<Creator>) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
  };

  const deleteCreator = (id: string) => {
    setCreators((prev) => prev.filter((c) => c.id !== id));
  };

  // Campaign Actions
  const addCampaign = (newCampaign: Campaign) => {
    setCampaigns((prev) => [newCampaign, ...prev]);
  };

  const updateCampaign = (id: string, updatedData: Partial<Campaign>) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  // Visibility Controls
  const setSectionVisibility = (section: 'creators' | 'campaigns', isVisible: boolean) => {
    setSettings((prev) => {
      const next = {
        ...prev,
        ...(section === 'creators'
          ? { showCreatorsSection: isVisible }
          : { showCampaignsSection: isVisible })
      };
      try {
        localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(next));
        // Also persist standalone boolean keys for bulletproof persistence across page refreshes
        if (section === 'creators') {
          localStorage.setItem(`${STORAGE_KEY}_show_creators`, String(isVisible));
        } else {
          localStorage.setItem(`${STORAGE_KEY}_show_campaigns`, String(isVisible));
        }
      } catch (e) {
        console.error('Failed to immediately save section visibility:', e);
      }
      return next;
    });
  };

  const updateSettings = (newSettings: Partial<SectionSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...newSettings };
      try {
        localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(next));
        if (newSettings.showCreatorsSection !== undefined) {
          localStorage.setItem(`${STORAGE_KEY}_show_creators`, String(newSettings.showCreatorsSection));
        }
        if (newSettings.showCampaignsSection !== undefined) {
          localStorage.setItem(`${STORAGE_KEY}_show_campaigns`, String(newSettings.showCampaignsSection));
        }
      } catch (e) {
        console.error('Failed to immediately save settings:', e);
      }
      return next;
    });
  };

  const resetToDefaults = () => {
    setCreators(DEFAULT_CREATORS);
    setCampaigns(DEFAULT_CAMPAIGNS);
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(`${STORAGE_KEY}_creators`);
      localStorage.removeItem(`${STORAGE_KEY}_campaigns`);
      localStorage.removeItem(`${STORAGE_KEY}_settings`);
      localStorage.removeItem(`${STORAGE_KEY}_show_creators`);
      localStorage.removeItem(`${STORAGE_KEY}_show_campaigns`);
    } catch (e) {
      console.error(e);
    }
  };

  const exportDataJSON = () => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      settings,
      creators,
      campaigns
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonString: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.creators)) {
        setCreators(parsed.creators);
      }
      if (Array.isArray(parsed.campaigns)) {
        setCampaigns(parsed.campaigns);
      }
      if (parsed.settings) {
        setSettings({ ...DEFAULT_SETTINGS, ...parsed.settings });
      }
      return { success: true, message: 'Data imported successfully!' };
    } catch (err: any) {
      return { success: false, message: `Invalid JSON format: ${err?.message || 'Error'}` };
    }
  };

  return (
    <AdminDataContext.Provider
      value={{
        creators,
        campaigns,
        settings,
        addCreator,
        updateCreator,
        deleteCreator,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        setSectionVisibility,
        updateSettings,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
