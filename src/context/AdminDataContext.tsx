import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  writeBatch,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';
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
  firestoreStatus: 'connected' | 'connecting' | 'error';
  firestoreError: string | null;
  addCreator: (creator: Creator) => Promise<void>;
  updateCreator: (id: string, updatedData: Partial<Creator>) => Promise<void>;
  deleteCreator: (id: string) => Promise<void>;
  addCampaign: (campaign: Campaign) => Promise<void>;
  updateCampaign: (id: string, updatedData: Partial<Campaign>) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
  setSectionVisibility: (section: 'creators' | 'campaigns', isVisible: boolean) => Promise<void>;
  updateSettings: (newSettings: Partial<SectionSettings>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => Promise<{ success: boolean; message: string }>;
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
  const [firestoreStatus, setFirestoreStatus] = useState<'connected' | 'connecting' | 'error'>('connecting');
  const [firestoreError, setFirestoreError] = useState<string | null>(null);

  // Local cache initialization for instantaneous first render
  const [creators, setCreators] = useState<Creator[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_creators`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse cached creators:', e);
    }
    return DEFAULT_CREATORS;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_campaigns`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse cached campaigns:', e);
    }
    return DEFAULT_CAMPAIGNS;
  });

  const [settings, setSettings] = useState<SectionSettings>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_settings`);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to parse cached settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Track whether we have seeded to prevent multiple seed runs
  const seedingCreatorsRef = useRef(false);
  const seedingCampaignsRef = useRef(false);
  const seedingSettingsRef = useRef(false);

  // 1. Real-time Firestore Listener for Section Settings (Visibility Switches & Titles)
  useEffect(() => {
    const settingsDocRef = doc(db, 'csm_settings', 'global');
    const unsubscribe = onSnapshot(
      settingsDocRef,
      (docSnap) => {
        setFirestoreStatus('connected');
        setFirestoreError(null);

        if (docSnap.exists()) {
          const data = docSnap.data() as Partial<SectionSettings>;
          const mergedSettings: SectionSettings = {
            ...DEFAULT_SETTINGS,
            ...data,
            // Explicitly preserve boolean flags from Firestore
            showCreatorsSection: data.showCreatorsSection !== undefined ? Boolean(data.showCreatorsSection) : true,
            showCampaignsSection: data.showCampaignsSection !== undefined ? Boolean(data.showCampaignsSection) : true,
          };
          setSettings(mergedSettings);
          try {
            localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(mergedSettings));
          } catch (e) {
            console.error(e);
          }
        } else {
          // If the global settings document does not exist in Firestore yet, seed it automatically
          if (!seedingSettingsRef.current) {
            seedingSettingsRef.current = true;
            setDoc(settingsDocRef, DEFAULT_SETTINGS, { merge: true }).catch((err) => {
              console.warn('Could not auto-seed settings document:', err);
            });
          }
        }
      },
      (error) => {
        // Handle permission-denied gracefully without throwing fatal console.error
        console.warn('Firestore settings listener:', error.message);
        setFirestoreStatus('error');
        setFirestoreError(error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. Real-time Firestore Listener for Creators
  useEffect(() => {
    const creatorsColRef = collection(db, 'csm_creators');
    const unsubscribe = onSnapshot(
      creatorsColRef,
      async (querySnapshot) => {
        setFirestoreStatus('connected');

        if (!querySnapshot.empty) {
          const fetchedCreators: Creator[] = [];
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data() as Creator;
            fetchedCreators.push({ ...data, id: docSnap.id || data.id });
          });
          setCreators(fetchedCreators);
          try {
            localStorage.setItem(`${STORAGE_KEY}_creators`, JSON.stringify(fetchedCreators));
          } catch (e) {
            console.error(e);
          }
        } else {
          // If creators collection is completely empty in Firestore, seed default creators
          if (!seedingCreatorsRef.current) {
            seedingCreatorsRef.current = true;
            try {
              const batch = writeBatch(db);
              DEFAULT_CREATORS.forEach((creator) => {
                const docRef = doc(db, 'csm_creators', creator.id);
                batch.set(docRef, creator);
              });
              await batch.commit();
            } catch (err) {
              console.warn('Could not auto-seed creators collection:', err);
            }
          }
        }
      },
      (error) => {
        // Handle permission-denied gracefully without throwing fatal console.error
        console.warn('Firestore creators listener:', error.message);
        setFirestoreStatus('error');
        setFirestoreError(error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  // 3. Real-time Firestore Listener for Campaigns
  useEffect(() => {
    const campaignsColRef = collection(db, 'csm_campaigns');
    const unsubscribe = onSnapshot(
      campaignsColRef,
      async (querySnapshot) => {
        setFirestoreStatus('connected');

        if (!querySnapshot.empty) {
          const fetchedCampaigns: Campaign[] = [];
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data() as Campaign;
            fetchedCampaigns.push({ ...data, id: docSnap.id || data.id });
          });
          setCampaigns(fetchedCampaigns);
          try {
            localStorage.setItem(`${STORAGE_KEY}_campaigns`, JSON.stringify(fetchedCampaigns));
          } catch (e) {
            console.error(e);
          }
        } else {
          // If campaigns collection is completely empty in Firestore, seed default campaigns
          if (!seedingCampaignsRef.current) {
            seedingCampaignsRef.current = true;
            try {
              const batch = writeBatch(db);
              DEFAULT_CAMPAIGNS.forEach((campaign) => {
                const docRef = doc(db, 'csm_campaigns', campaign.id);
                batch.set(docRef, campaign);
              });
              await batch.commit();
            } catch (err) {
              console.warn('Could not auto-seed campaigns collection:', err);
            }
          }
        }
      },
      (error) => {
        // Handle permission-denied gracefully without throwing fatal console.error
        console.warn('Firestore campaigns listener:', error.message);
        setFirestoreStatus('error');
        setFirestoreError(error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  // Creator Firestore Actions
  const addCreator = async (newCreator: Creator) => {
    // Optimistic local update
    setCreators((prev) => {
      const updated = [newCreator, ...prev.filter((c) => c.id !== newCreator.id)];
      try {
        localStorage.setItem(`${STORAGE_KEY}_creators`, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    try {
      const docRef = doc(db, 'csm_creators', newCreator.id);
      await setDoc(docRef, newCreator);
      setFirestoreError(null);
    } catch (err: any) {
      console.warn('Firestore addCreator:', err.message);
      setFirestoreError(err.message || 'Error saving creator to cloud');
    }
  };

  const updateCreator = async (id: string, updatedData: Partial<Creator>) => {
    // Optimistic local update
    setCreators((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c));
      try {
        localStorage.setItem(`${STORAGE_KEY}_creators`, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    try {
      const docRef = doc(db, 'csm_creators', id);
      await setDoc(docRef, updatedData, { merge: true });
      setFirestoreError(null);
    } catch (err: any) {
      console.warn('Firestore updateCreator:', err.message);
      setFirestoreError(err.message || 'Error updating creator in cloud');
    }
  };

  const deleteCreator = async (id: string) => {
    // Optimistic local update
    setCreators((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem(`${STORAGE_KEY}_creators`, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    try {
      const docRef = doc(db, 'csm_creators', id);
      await deleteDoc(docRef);
      setFirestoreError(null);
    } catch (err: any) {
      console.warn('Firestore deleteCreator:', err.message);
      setFirestoreError(err.message || 'Error deleting creator from cloud');
    }
  };

  // Campaign Firestore Actions
  const addCampaign = async (newCampaign: Campaign) => {
    // Optimistic local update
    setCampaigns((prev) => {
      const updated = [newCampaign, ...prev.filter((c) => c.id !== newCampaign.id)];
      try {
        localStorage.setItem(`${STORAGE_KEY}_campaigns`, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    try {
      const docRef = doc(db, 'csm_campaigns', newCampaign.id);
      await setDoc(docRef, newCampaign);
      setFirestoreError(null);
    } catch (err: any) {
      console.warn('Firestore addCampaign:', err.message);
      setFirestoreError(err.message || 'Error saving campaign to cloud');
    }
  };

  const updateCampaign = async (id: string, updatedData: Partial<Campaign>) => {
    // Optimistic local update
    setCampaigns((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c));
      try {
        localStorage.setItem(`${STORAGE_KEY}_campaigns`, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    try {
      const docRef = doc(db, 'csm_campaigns', id);
      await setDoc(docRef, updatedData, { merge: true });
      setFirestoreError(null);
    } catch (err: any) {
      console.warn('Firestore updateCampaign:', err.message);
      setFirestoreError(err.message || 'Error updating campaign in cloud');
    }
  };

  const deleteCampaign = async (id: string) => {
    // Optimistic local update
    setCampaigns((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem(`${STORAGE_KEY}_campaigns`, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    try {
      const docRef = doc(db, 'csm_campaigns', id);
      await deleteDoc(docRef);
      setFirestoreError(null);
    } catch (err: any) {
      console.warn('Firestore deleteCampaign:', err.message);
      setFirestoreError(err.message || 'Error deleting campaign from cloud');
    }
  };

  // Section Visibility Firestore Control (Saves to Firestore instantly for all devices/incognito tabs)
  const setSectionVisibility = async (section: 'creators' | 'campaigns', isVisible: boolean) => {
    const updatedKey = section === 'creators' ? 'showCreatorsSection' : 'showCampaignsSection';
    const nextSettings = {
      ...settings,
      [updatedKey]: isVisible
    };

    // Instant local state update
    setSettings(nextSettings);
    try {
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(nextSettings));
    } catch (e) {
      console.warn(e);
    }

    // Write to Firebase Firestore in real time
    try {
      const docRef = doc(db, 'csm_settings', 'global');
      await setDoc(docRef, { [updatedKey]: isVisible }, { merge: true });
      setFirestoreError(null);
    } catch (err: any) {
      console.warn('Firestore setSectionVisibility:', err.message);
      setFirestoreError(err.message || 'Error saving visibility setting to cloud');
    }
  };

  const updateSettings = async (newSettings: Partial<SectionSettings>) => {
    const next = { ...settings, ...newSettings };
    setSettings(next);
    try {
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(next));
    } catch (e) {
      console.warn(e);
    }

    try {
      const docRef = doc(db, 'csm_settings', 'global');
      await setDoc(docRef, newSettings, { merge: true });
      setFirestoreError(null);
    } catch (err: any) {
      console.warn('Firestore updateSettings:', err.message);
      setFirestoreError(err.message || 'Error saving settings to cloud');
    }
  };

  const resetToDefaults = async () => {
    setCreators(DEFAULT_CREATORS);
    setCampaigns(DEFAULT_CAMPAIGNS);
    setSettings(DEFAULT_SETTINGS);

    try {
      localStorage.removeItem(`${STORAGE_KEY}_creators`);
      localStorage.removeItem(`${STORAGE_KEY}_campaigns`);
      localStorage.removeItem(`${STORAGE_KEY}_settings`);

      // Reset in Firestore
      const settingsDocRef = doc(db, 'csm_settings', 'global');
      await setDoc(settingsDocRef, DEFAULT_SETTINGS);

      // Re-seed creators
      const creatorBatch = writeBatch(db);
      DEFAULT_CREATORS.forEach((creator) => {
        creatorBatch.set(doc(db, 'csm_creators', creator.id), creator);
      });
      await creatorBatch.commit();

      // Re-seed campaigns
      const campaignBatch = writeBatch(db);
      DEFAULT_CAMPAIGNS.forEach((camp) => {
        campaignBatch.set(doc(db, 'csm_campaigns', camp.id), camp);
      });
      await campaignBatch.commit();
      setFirestoreError(null);
    } catch (e: any) {
      console.warn('Firestore resetToDefaults:', e.message);
      setFirestoreError(e.message || 'Error resetting defaults in cloud');
    }
  };

  const exportDataJSON = () => {
    const data = {
      version: '2.0',
      source: 'Firebase Firestore Realtime Store',
      exportedAt: new Date().toISOString(),
      settings,
      creators,
      campaigns
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = async (jsonString: string): Promise<{ success: boolean; message: string }> => {
    try {
      const parsed = JSON.parse(jsonString);

      if (parsed.settings) {
        await updateSettings(parsed.settings);
      }

      if (Array.isArray(parsed.creators)) {
        for (const c of parsed.creators) {
          if (c && c.id) {
            await addCreator(c);
          }
        }
      }

      if (Array.isArray(parsed.campaigns)) {
        for (const camp of parsed.campaigns) {
          if (camp && camp.id) {
            await addCampaign(camp);
          }
        }
      }

      return { success: true, message: 'Data imported and synced to Firestore successfully!' };
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
        firestoreStatus,
        firestoreError,
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

