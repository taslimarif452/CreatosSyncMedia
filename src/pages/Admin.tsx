import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  RefreshCw,
  Download,
  Upload,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Copy,
  Search,
  Layers,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Database,
  Image as ImageIcon,
  Lock,
  LogIn,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useAuth, ALLOWED_ADMIN_EMAILS } from '../context/AuthContext';
import { Creator, Campaign, CreatorCategory, CampaignType } from '../types';
import { compressAndConvertToBase64 } from '../utils/imageCompressor';

interface AdminProps {
  navigate: (path: string) => void;
}

type AdminTab = 'overview' | 'creators' | 'campaigns' | 'visibility' | 'backup';

const CATEGORIES: CreatorCategory[] = [
  'Technology',
  'Gaming',
  'Finance',
  'Education',
  'Lifestyle',
  'Entertainment',
  'Fitness',
  'Beauty',
  'Business',
  'Comedy'
];

const CAMPAIGN_TYPES: CampaignType[] = [
  'YouTube Integration',
  'Dedicated Video',
  'Shorts Campaign',
  'Multi-Creator Series',
  'Long-Term Ambassador'
];

export const Admin: React.FC<AdminProps> = ({ navigate }) => {
  const { user, loading: authLoading, isAdmin, signInWithGoogle, signOut } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const {
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
  } = useAdminData();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadingImageField, setUploadingImageField] = useState<string | null>(null);

  // Handle direct file upload into Base64 (Saved straight into Firestore Database document)
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetField: 'creator-image' | 'creator-cover' | 'campaign-thumb'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImageField(targetField);
      const base64 = await compressAndConvertToBase64(file);
      if (targetField === 'creator-image') {
        setCreatorForm((prev) => ({ ...prev, image: base64 }));
        showToast('Profile image optimized and loaded for Firestore!');
      } else if (targetField === 'creator-cover') {
        setCreatorForm((prev) => ({ ...prev, coverImage: base64 }));
        showToast('Cover image optimized and loaded for Firestore!');
      } else if (targetField === 'campaign-thumb') {
        setCampaignForm((prev) => ({ ...prev, thumbnail: base64 }));
        showToast('Thumbnail image optimized and loaded for Firestore!');
      }
    } catch (err: any) {
      console.error('Image upload error:', err);
      showToast('Image processing failed: ' + (err?.message || 'Error'));
    } finally {
      setUploadingImageField(null);
      e.target.value = '';
    }
  };

  // Search & Filter States
  const [creatorSearch, setCreatorSearch] = useState('');
  const [creatorCategoryFilter, setCreatorCategoryFilter] = useState<string>('All');
  const [campaignSearch, setCampaignSearch] = useState('');

  // Modals
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [editingCreator, setEditingCreator] = useState<Creator | null>(null);

  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [previewCreator, setPreviewCreator] = useState<Creator | null>(null);
  const [previewCampaign, setPreviewCampaign] = useState<Campaign | null>(null);

  // Creator Form State
  const initialCreatorFormData: Omit<Creator, 'id'> = {
    name: '',
    handle: '',
    category: 'Technology',
    subscribers: '500K Subscribers',
    followersShort: '500K+',
    subscribersCount: 500000,
    location: 'Mumbai, India',
    language: 'Hindi & English',
    engagement: '8.5% ER',
    averageViews: '250K / video',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
    tagline: 'High-converting video reviews and deep-dive technical tutorials.',
    quote: 'reach engineered into high-impact organic brand trust.',
    description: 'Premier digital creator creating high retention videos and authentic storytelling.',
    verified: true,
    tier: 'Macro',
    platforms: {
      youtube: 'https://youtube.com',
      instagram: 'https://instagram.com',
      twitter: ''
    },
    audience: {
      primaryAge: '18 - 32 years (82%)',
      genderSplit: { male: 75, female: 25 },
      topLocations: ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Pune'],
      topInterests: ['Tech Reviews', 'Gadgets', 'Productivity', 'Smart Home']
    },
    pastBrands: ['Samsung', 'Google', 'OnePlus', 'Boat'],
    sampleVideos: [
      {
        id: 'v1',
        title: 'Complete Setup & In-Depth Review',
        views: '350K Views',
        duration: '14:20',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
        type: 'Dedicated'
      }
    ]
  };

  const [creatorForm, setCreatorForm] = useState<Omit<Creator, 'id'>>(initialCreatorFormData);
  const [pastBrandsString, setPastBrandsString] = useState('');
  const [topLocationsString, setTopLocationsString] = useState('');
  const [topInterestsString, setTopInterestsString] = useState('');

  // Campaign Form State
  const initialCampaignFormData: Omit<Campaign, 'id'> = {
    title: '',
    brand: '',
    brandCategory: 'Consumer Tech',
    creatorName: '',
    creatorHandle: '@creator',
    creatorId: 'tech-01',
    category: 'Technology',
    type: 'YouTube Integration',
    views: '1.5M Views',
    viewsCount: 1500000,
    engagementRate: '7.8%',
    ctr: '5.2% CTR',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    videoPreviewUrl: '',
    badge: 'Verified Case Study',
    description: 'High performance influencer campaign driving immediate product adoption and sales.',
    objective: 'Drive brand aspiration, conversions and search volume lift.',
    strategy: 'Organic storytelling combined with targeted discount code in video description and pinned comment.',
    execution: 'Dedicated 12-minute review video accompanied by 3 coordinated YouTube Shorts.',
    results: [
      { metric: 'Total Reach', value: '1.5M+', detail: 'Verified impressions across target demographic' },
      { metric: 'Link CTR', value: '5.2%', detail: 'Qualified direct visits to store' },
      { metric: 'Conversions', value: '12,500 Units', detail: 'Tracked via custom creator affiliate promo' },
      { metric: 'Brand Lift', value: '+45%', detail: 'Increase in organic brand searches' }
    ],
    testimonial: {
      quote: 'CreatorsSyncMedia helped us achieve record ROI in our product launch week.',
      author: 'Marketing Director',
      role: 'Brand Growth Lead'
    }
  };

  const [campaignForm, setCampaignForm] = useState<Omit<Campaign, 'id'>>(initialCampaignFormData);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Open Creator Modal for Add/Edit
  const handleOpenCreatorModal = (creatorToEdit?: Creator) => {
    if (creatorToEdit) {
      setEditingCreator(creatorToEdit);
      setCreatorForm({
        name: creatorToEdit.name,
        handle: creatorToEdit.handle,
        category: creatorToEdit.category,
        subscribers: creatorToEdit.subscribers,
        followersShort: creatorToEdit.followersShort || creatorToEdit.subscribers.split(' ')[0],
        subscribersCount: creatorToEdit.subscribersCount,
        location: creatorToEdit.location,
        language: creatorToEdit.language,
        engagement: creatorToEdit.engagement,
        averageViews: creatorToEdit.averageViews,
        image: creatorToEdit.image,
        coverImage: creatorToEdit.coverImage || '',
        tagline: creatorToEdit.tagline,
        quote: creatorToEdit.quote || '',
        description: creatorToEdit.description,
        verified: creatorToEdit.verified,
        tier: creatorToEdit.tier,
        platforms: creatorToEdit.platforms || {},
        audience: creatorToEdit.audience || {
          primaryAge: '18 - 30 years',
          genderSplit: { male: 70, female: 30 },
          topLocations: ['Mumbai', 'Delhi'],
          topInterests: ['Tech', 'Gaming']
        },
        pastBrands: creatorToEdit.pastBrands || [],
        sampleVideos: creatorToEdit.sampleVideos || []
      });
      setPastBrandsString((creatorToEdit.pastBrands || []).join(', '));
      setTopLocationsString((creatorToEdit.audience?.topLocations || []).join(', '));
      setTopInterestsString((creatorToEdit.audience?.topInterests || []).join(', '));
    } else {
      setEditingCreator(null);
      setCreatorForm(initialCreatorFormData);
      setPastBrandsString('Samsung, OnePlus, Boat, Lenovo');
      setTopLocationsString('Mumbai, Delhi NCR, Bengaluru, Pune');
      setTopInterestsString('Tech, Gadgets, Gaming, Reviews');
    }
    setIsCreatorModalOpen(true);
  };

  // Save Creator
  const handleSaveCreator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorForm.name || !creatorForm.handle) {
      alert('Please provide at least a creator name and handle');
      return;
    }

    const pastBrandsArray = pastBrandsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const topLocationsArray = topLocationsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const topInterestsArray = topInterestsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const finalData: Omit<Creator, 'id'> = {
      ...creatorForm,
      pastBrands: pastBrandsArray,
      audience: {
        ...creatorForm.audience,
        topLocations: topLocationsArray.length ? topLocationsArray : ['Delhi', 'Mumbai'],
        topInterests: topInterestsArray.length ? topInterestsArray : ['Tech', 'Entertainment']
      }
    };

    if (editingCreator) {
      updateCreator(editingCreator.id, finalData);
      showToast(`Creator "${finalData.name}" updated successfully!`);
    } else {
      const generatedId = creatorForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
      addCreator({
        id: generatedId,
        ...finalData
      });
      showToast(`New creator "${finalData.name}" added to roster!`);
    }

    setIsCreatorModalOpen(false);
  };

  // Open Campaign Modal for Add/Edit
  const handleOpenCampaignModal = (campaignToEdit?: Campaign) => {
    if (campaignToEdit) {
      setEditingCampaign(campaignToEdit);
      setCampaignForm({
        title: campaignToEdit.title,
        brand: campaignToEdit.brand,
        brandCategory: campaignToEdit.brandCategory,
        creatorName: campaignToEdit.creatorName,
        creatorHandle: campaignToEdit.creatorHandle,
        creatorId: campaignToEdit.creatorId,
        category: campaignToEdit.category,
        type: campaignToEdit.type,
        views: campaignToEdit.views,
        viewsCount: campaignToEdit.viewsCount,
        engagementRate: campaignToEdit.engagementRate,
        ctr: campaignToEdit.ctr,
        thumbnail: campaignToEdit.thumbnail,
        videoPreviewUrl: campaignToEdit.videoPreviewUrl || '',
        badge: campaignToEdit.badge || 'Verified Case Study',
        description: campaignToEdit.description,
        objective: campaignToEdit.objective,
        strategy: campaignToEdit.strategy,
        execution: campaignToEdit.execution,
        results: campaignToEdit.results || [],
        testimonial: campaignToEdit.testimonial || {
          quote: '',
          author: '',
          role: ''
        }
      });
    } else {
      setEditingCampaign(null);
      setCampaignForm(initialCampaignFormData);
    }
    setIsCampaignModalOpen(true);
  };

  // Save Campaign
  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignForm.title || !campaignForm.brand) {
      alert('Please provide at least a campaign title and brand name');
      return;
    }

    if (editingCampaign) {
      updateCampaign(editingCampaign.id, campaignForm);
      showToast(`Campaign "${campaignForm.title}" updated successfully!`);
    } else {
      const generatedId = 'campaign-' + campaignForm.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
      addCampaign({
        id: generatedId,
        ...campaignForm
      });
      showToast(`New campaign "${campaignForm.title}" published!`);
    }

    setIsCampaignModalOpen(false);
  };

  // Import JSON handler
  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    const res = importDataJSON(importJsonText);
    if (res.success) {
      showToast('Data imported successfully!');
      setImportJsonText('');
    } else {
      alert(res.message);
    }
  };

  const filteredCreators = creators.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(creatorSearch.toLowerCase()) ||
      c.handle.toLowerCase().includes(creatorSearch.toLowerCase()) ||
      c.tagline.toLowerCase().includes(creatorSearch.toLowerCase());
    const matchesCategory =
      creatorCategoryFilter === 'All' || c.category === creatorCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredCampaigns = campaigns.filter((c) => {
    return (
      c.title.toLowerCase().includes(campaignSearch.toLowerCase()) ||
      c.brand.toLowerCase().includes(campaignSearch.toLowerCase()) ||
      c.creatorName.toLowerCase().includes(campaignSearch.toLowerCase())
    );
  });

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    const res = await signInWithGoogle();
    setIsSigningIn(false);
    if (!res.success && res.error) {
      setAuthError(res.error);
    }
  };

  // 1. Loading State while checking Firebase Auth status
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080808] text-[#F5F5F5] flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-center shadow-lg">
            <RefreshCw className="w-6 h-6 text-[#4F7CFF] animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">Verifying Admin Access</h3>
            <p className="text-xs text-[#8E8E93]">Checking secure Google credentials with Firebase...</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated OR Non-Admin Account: Show Clean Google Sign-In Gate
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#080808] text-[#F5F5F5] flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-[#101010] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#4F7CFF]/10 blur-3xl pointer-events-none rounded-full" />

          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-8 relative z-10">
            <div className="h-14 w-14 flex items-center justify-center bg-[#141414] rounded-2xl border border-[#2a2a2a] p-2 shadow-inner mb-4">
              <img
                src="https://res.cloudinary.com/dbqmhnahl/image/upload/v1788333936/CSM_png_cirlce_uwvyan.png"
                alt="CreatorsSyncMedia"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-lg font-extrabold text-white tracking-tight">
              Creators<span className="text-[#4F7CFF]">Sync</span>Media
            </div>
            <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2a2a2a]">
              <Lock className="w-3.5 h-3.5 text-[#4F7CFF]" />
              <span className="text-[11px] font-semibold text-[#D4D4D4] uppercase tracking-wider">
                Restricted Admin Access
              </span>
            </div>
          </div>

          {/* Unauthorized Signed-in State Warning */}
          {user && !isAdmin && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-left space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>Unauthorized Google Account</span>
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                Signed in as <span className="font-semibold text-white underline">{user.email}</span>. This account does not have administrator privileges.
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => signOut()}
                  className="text-xs font-semibold text-rose-300 hover:text-white underline cursor-pointer"
                >
                  Sign Out & Try Another Account
                </button>
              </div>
            </div>
          )}

          {/* Auth Error Banner */}
          {authError && (
            <div className="mb-6 p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 text-left flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google Sign-In Action */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-[#F0F0F0] active:scale-[0.99] text-black font-semibold text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSigningIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Connecting to Google...</span>
                </>
              ) : (
                <>
                  {/* Google Vector Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            {/* Allowed Admins Guidance Info */}
            <div className="p-4 rounded-xl bg-[#141414] border border-[#222222] text-left">
              <div className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider mb-2">
                Authorized Admin Accounts:
              </div>
              <ul className="text-xs text-[#CCCCCC] space-y-1.5 font-mono">
                {ALLOWED_ADMIN_EMAILS.map((email) => (
                  <li key={email} className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{email}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-[#737373] mt-2.5 leading-normal">
                Only the verified accounts listed above will be granted full write & manage permissions in the Admin Panel.
              </p>
            </div>
          </div>

          {/* Return to Website Button */}
          <div className="mt-6 pt-6 border-t border-[#222222]">
            <button
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] text-xs font-semibold text-[#A1A1A1] hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Live Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] flex flex-col md:flex-row">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#4F7CFF] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="text-xs font-bold uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* ======================= SIDEBAR ======================= */}
      <aside className="w-full md:w-64 lg:w-72 bg-[#101010] border-r border-[#262626] flex flex-col justify-between p-5 md:min-h-screen z-30">
        <div>
          {/* Admin Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#262626] mb-6">
            <div className="h-10 w-10 flex items-center justify-center flex-shrink-0 bg-[#141414] rounded-xl border border-[#333] p-1.5">
              <img
                src="https://res.cloudinary.com/dbqmhnahl/image/upload/v1788333936/CSM_png_cirlce_uwvyan.png"
                alt="Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight text-[#F5F5F5]">
                Creators<span className="text-[#4F7CFF]">Sync</span>Media
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  Admin Panel
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#4F7CFF] text-white shadow-lg shadow-[#4F7CFF]/20'
                  : 'text-[#A1A1A1] hover:bg-[#141414] hover:text-[#F5F5F5]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('creators')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'creators'
                  ? 'bg-[#4F7CFF] text-white shadow-lg shadow-[#4F7CFF]/20'
                  : 'text-[#A1A1A1] hover:bg-[#141414] hover:text-[#F5F5F5]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Creators Section</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-black/40 text-[10px] font-bold">
                {creators.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('campaigns')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'campaigns'
                  ? 'bg-[#4F7CFF] text-white shadow-lg shadow-[#4F7CFF]/20'
                  : 'text-[#A1A1A1] hover:bg-[#141414] hover:text-[#F5F5F5]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Megaphone className="w-4 h-4" />
                <span>Campaigns Section</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-black/40 text-[10px] font-bold">
                {campaigns.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('visibility')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'visibility'
                  ? 'bg-[#4F7CFF] text-white shadow-lg shadow-[#4F7CFF]/20'
                  : 'text-[#A1A1A1] hover:bg-[#141414] hover:text-[#F5F5F5]'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Section Visibility</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'backup'
                  ? 'bg-[#4F7CFF] text-white shadow-lg shadow-[#4F7CFF]/20'
                  : 'text-[#A1A1A1] hover:bg-[#141414] hover:text-[#F5F5F5]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Backup & JSON</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-[#262626] mt-6 space-y-2.5">
          {/* Firestore Database Sync Badge */}
          <div className="p-3 rounded-xl bg-[#141414] border border-[#262626] mb-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-[#A1A1A1] uppercase tracking-wider mb-1.5">
              <span>Cloud Storage</span>
              <span className="flex items-center gap-1 text-[#4F7CFF]">
                <Database className="w-3 h-3" /> Firestore
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {firestoreStatus === 'connected' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400 font-bold">Live Synced (All Devices)</span>
                </>
              ) : firestoreStatus === 'connecting' ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                  <span className="text-amber-400 font-medium">Connecting...</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-rose-400" />
                  <span className="text-rose-400 font-medium">Rules needed</span>
                </>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#141414] border border-[#262626] mb-3">
            <div className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-wider mb-1">
              Live Visibility Status
            </div>
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-gray-300">Creators Sec:</span>
              <span className={settings.showCreatorsSection ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {settings.showCreatorsSection ? 'VISIBLE' : 'HIDDEN'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium mt-1">
              <span className="text-gray-300">Campaigns Sec:</span>
              <span className={settings.showCampaignsSection ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {settings.showCampaignsSection ? 'VISIBLE' : 'HIDDEN'}
              </span>
            </div>
          </div>

          {/* Logged in Admin User Card */}
          {user && (
            <div className="p-3 rounded-xl bg-[#141414] border border-[#262626] mb-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 overflow-hidden">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Admin'}
                    className="w-7 h-7 rounded-full object-cover border border-[#333] flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#4F7CFF]/20 border border-[#4F7CFF]/40 text-[#4F7CFF] flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {user.email?.charAt(0).toUpperCase() || 'A'}
                  </div>
                )}
                <div className="overflow-hidden text-left">
                  <div className="text-xs font-semibold text-white truncate">
                    {user.displayName || 'Admin'}
                  </div>
                  <div className="text-[10px] text-[#A1A1A1] truncate font-mono">
                    {user.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                title="Sign Out"
                className="p-1.5 rounded-lg hover:bg-[#222] text-[#8E8E93] hover:text-rose-400 transition-colors cursor-pointer flex-shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-3 px-3.5 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] text-xs font-bold uppercase tracking-wider text-[#F5F5F5] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#4F7CFF]" />
            <span>Go to Live Website</span>
          </button>
        </div>
      </aside>

      {/* ======================= MAIN CONTENT ======================= */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        
        {/* ======================= TAB 1: OVERVIEW ======================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight">
                    Agency Control Center
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                    <Database className="w-3.5 h-3.5" />
                    Firestore Live DB
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#A1A1A1] mt-1">
                  Manage real-time Creator rosters, Campaign case studies & dynamic section visibility stored on Firebase Firestore.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenCreatorModal()}
                  className="px-4 py-2.5 bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-[#4F7CFF]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Creator</span>
                </button>
                <button
                  onClick={() => handleOpenCampaignModal()}
                  className="px-4 py-2.5 bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] text-[#F5F5F5] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 text-[#4F7CFF]" />
                  <span>Add Campaign</span>
                </button>
              </div>
            </div>

            {/* Firestore Status Alert / Rules Notice if needed */}
            {firestoreError && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 text-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <div className="font-bold text-amber-300 text-sm">
                        Action Required: Update Firestore Security Rules in Firebase Console
                      </div>
                      <p className="text-gray-300 mt-1 text-xs max-w-3xl leading-relaxed">
                        Firebase default rules block public read/write access (<span className="text-amber-300 font-mono">Missing or insufficient permissions</span>). 
                        To enable live cloud sync across all devices, open your Firebase Console Rules tab and paste the rule below, then click <strong className="text-white">Publish</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        const ruleText = `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if true;\n    }\n  }\n}`;
                        navigator.clipboard.writeText(ruleText);
                        showToast('Firestore Rule copied to clipboard!');
                      }}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Firestore Rule</span>
                    </button>
                    <a
                      href="https://console.firebase.google.com/u/0/project/creatorssync-media/firestore/rules"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-[#1c1c1c] hover:bg-[#252525] border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open Firebase Console</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-amber-500/20 flex flex-wrap items-center gap-4 text-[11px] text-gray-400">
                  <span>💡 <strong>Note:</strong> App is safely functioning with local cache right now. Changes will sync to cloud once rules are published.</span>
                </div>
              </div>
            )}

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat 1 */}
              <div className="p-5 rounded-2xl bg-[#101010] border border-[#262626]">
                <div className="flex items-center justify-between text-[#A1A1A1] mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Total Creators</span>
                  <Users className="w-4 h-4 text-[#4F7CFF]" />
                </div>
                <div className="text-3xl font-black text-[#F5F5F5]">{creators.length}</div>
                <div className="text-[11px] text-gray-400 mt-1">Active on Directory & Home</div>
              </div>

              {/* Stat 2 */}
              <div className="p-5 rounded-2xl bg-[#101010] border border-[#262626]">
                <div className="flex items-center justify-between text-[#A1A1A1] mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Total Campaigns</span>
                  <Megaphone className="w-4 h-4 text-[#4F7CFF]" />
                </div>
                <div className="text-3xl font-black text-[#F5F5F5]">{campaigns.length}</div>
                <div className="text-[11px] text-gray-400 mt-1">Case Studies Published</div>
              </div>

              {/* Stat 3 */}
              <div className="p-5 rounded-2xl bg-[#101010] border border-[#262626]">
                <div className="flex items-center justify-between text-[#A1A1A1] mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Creators Section</span>
                  {settings.showCreatorsSection ? (
                    <Eye className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <div className={`text-xl font-extrabold ${settings.showCreatorsSection ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {settings.showCreatorsSection ? 'ACTIVE / VISIBLE' : 'TEMPORARILY HIDDEN'}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">"creators with influence..."</div>
              </div>

              {/* Stat 4 */}
              <div className="p-5 rounded-2xl bg-[#101010] border border-[#262626]">
                <div className="flex items-center justify-between text-[#A1A1A1] mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Campaigns Section</span>
                  {settings.showCampaignsSection ? (
                    <Eye className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <div className={`text-xl font-extrabold ${settings.showCampaignsSection ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {settings.showCampaignsSection ? 'ACTIVE / VISIBLE' : 'TEMPORARILY HIDDEN'}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">"campaigns that made noise..."</div>
              </div>
            </div>

            {/* Quick Visibility Switcher Card */}
            <div className="p-6 rounded-3xl bg-[#101010] border border-[#262626]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#F5F5F5]">
                    Quick Section Visibility Switcher
                  </h3>
                  <p className="text-xs text-[#A1A1A1] mt-0.5">
                    Toggle to instantly show or temporary hide either section from the live homepage.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('visibility')}
                  className="text-xs font-bold text-[#4F7CFF] hover:underline cursor-pointer flex items-center gap-1"
                >
                  Advanced Controls <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Switch 1 */}
                <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-between">
                  <div className="pr-4">
                    <span className="text-xs font-bold text-[#F5F5F5] block">
                      Creators Section
                    </span>
                    <span className="text-[11px] text-[#888] block">
                      "creators with influence. audiences with trust."
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSectionVisibility('creators', !settings.showCreatorsSection);
                      showToast(
                        `Creators section is now ${!settings.showCreatorsSection ? 'VISIBLE' : 'HIDDEN'} on website`
                      );
                    }}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors cursor-pointer ${
                      settings.showCreatorsSection ? 'bg-emerald-500' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        settings.showCreatorsSection ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Switch 2 */}
                <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-between">
                  <div className="pr-4">
                    <span className="text-xs font-bold text-[#F5F5F5] block">
                      Campaigns Section
                    </span>
                    <span className="text-[11px] text-[#888] block">
                      "campaigns that made noise."
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSectionVisibility('campaigns', !settings.showCampaignsSection);
                      showToast(
                        `Campaigns section is now ${!settings.showCampaignsSection ? 'VISIBLE' : 'HIDDEN'} on website`
                      );
                    }}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors cursor-pointer ${
                      settings.showCampaignsSection ? 'bg-emerald-500' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        settings.showCampaignsSection ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Creators */}
              <div className="p-6 rounded-3xl bg-[#101010] border border-[#262626]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#4F7CFF]" />
                    <span>Roster Talent ({creators.length})</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('creators')}
                    className="text-xs font-semibold text-[#4F7CFF] hover:underline cursor-pointer"
                  >
                    Manage All →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {creators.slice(0, 5).map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#F5F5F5] truncate capitalize">
                            {c.name}
                          </div>
                          <div className="text-[10px] text-[#888] truncate font-mono">
                            {c.subscribers} • {c.handle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenCreatorModal(c)}
                          className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] text-[#A1A1A1] hover:text-[#4F7CFF] transition-colors cursor-pointer"
                          title="Edit Creator"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Campaigns */}
              <div className="p-6 rounded-3xl bg-[#101010] border border-[#262626]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-wider flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-[#4F7CFF]" />
                    <span>Case Studies ({campaigns.length})</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('campaigns')}
                    className="text-xs font-semibold text-[#4F7CFF] hover:underline cursor-pointer"
                  >
                    Manage All →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {campaigns.slice(0, 5).map((camp) => (
                    <div
                      key={camp.id}
                      className="p-3 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={camp.thumbnail}
                          alt={camp.title}
                          className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#F5F5F5] truncate">
                            {camp.brand} × {camp.creatorName}
                          </div>
                          <div className="text-[10px] text-[#888] truncate font-mono">
                            {camp.views} • {camp.ctr}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenCampaignModal(camp)}
                          className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] text-[#A1A1A1] hover:text-[#4F7CFF] transition-colors cursor-pointer"
                          title="Edit Campaign"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 2: CREATORS MANAGEMENT ======================= */}
        {activeTab === 'creators' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-2">
                  Section: creators with influence. audiences with trust.
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight">
                  Creator Network Management
                </h1>
                <p className="text-xs text-[#A1A1A1] mt-1">
                  Add, edit, or remove creators. Any updates show immediately in the Home slider, roster thumbnails, and directory.
                </p>
              </div>

              <button
                onClick={() => handleOpenCreatorModal()}
                className="px-5 py-3 bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-[#4F7CFF]/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Creator</span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-grow w-full">
                <Search className="w-4 h-4 text-[#888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search creators by name, handle, or tagline..."
                  value={creatorSearch}
                  onChange={(e) => setCreatorSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#101010] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                />
              </div>

              <select
                value={creatorCategoryFilter}
                onChange={(e) => setCreatorCategoryFilter(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#101010] border border-[#262626] focus:border-[#4F7CFF] text-xs font-bold uppercase text-[#F5F5F5] outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Creators Grid / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCreators.map((c, index) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl bg-[#101010] border border-[#262626] hover:border-[#383838] transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-14 h-14 rounded-xl object-cover border border-[#262626] flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-[#F5F5F5] capitalize">
                              {c.name}
                            </h3>
                            {c.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7CFF]" />}
                          </div>
                          <div className="text-xs font-mono text-[#888]">{c.handle}</div>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#141414] text-[10px] font-bold text-[#4F7CFF] uppercase">
                            {c.category}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-1 rounded bg-[#181818] border border-[#2a2a2a] text-[10px] font-bold text-gray-300">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Stats pills */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#141414] border border-[#262626] mb-3 text-center">
                      <div>
                        <span className="text-[9px] text-[#888] uppercase block">Subs</span>
                        <span className="text-xs font-bold text-[#F5F5F5]">{c.followersShort || c.subscribers.split(' ')[0]}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#888] uppercase block">Avg Views</span>
                        <span className="text-xs font-bold text-[#4F7CFF]">{c.averageViews.split(' ')[0]}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#888] uppercase block">ER</span>
                        <span className="text-xs font-bold text-emerald-400">{c.engagement}</span>
                      </div>
                    </div>

                    {/* Quote / Tagline preview */}
                    <p className="text-xs text-[#A1A1A1] line-clamp-2 italic mb-2">
                      "{c.quote || c.tagline}"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between">
                    <button
                      onClick={() => {
                        navigate(`/creator/${c.id}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-[11px] font-bold text-[#A1A1A1] hover:text-[#4F7CFF] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCreatorModal(c)}
                        className="px-3 py-1.5 bg-[#181818] hover:bg-[#252525] border border-[#2a2a2a] text-xs font-bold text-[#F5F5F5] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3 text-[#4F7CFF]" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove ${c.name} from the roster?`)) {
                            deleteCreator(c.id);
                            showToast(`Creator "${c.name}" removed.`);
                          }
                        }}
                        className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-lg transition-colors cursor-pointer"
                        title="Delete Creator"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB 3: CAMPAIGNS MANAGEMENT ======================= */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-2">
                  Section: campaigns that made noise.
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight">
                  Campaign Showcase Management
                </h1>
                <p className="text-xs text-[#A1A1A1] mt-1">
                  Add, edit, or remove campaign case studies. The top item serves as the main Spotlight banner on the website.
                </p>
              </div>

              <button
                onClick={() => handleOpenCampaignModal()}
                className="px-5 py-3 bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-[#4F7CFF]/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Campaign</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-[#888] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search campaigns by brand, creator, or title..."
                value={campaignSearch}
                onChange={(e) => setCampaignSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#101010] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
              />
            </div>

            {/* Campaign Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCampaigns.map((camp, index) => (
                <div
                  key={camp.id}
                  className="p-6 rounded-3xl bg-[#101010] border border-[#262626] hover:border-[#383838] transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail & Badges */}
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#141414] mb-4 border border-[#262626]">
                      <img
                        src={camp.thumbnail}
                        alt={camp.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#4F7CFF] uppercase border border-white/10">
                          {camp.type}
                        </span>
                        {index === 0 && (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-[10px] font-extrabold text-black uppercase shadow-sm">
                            ★ Top Spotlight on Home
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                        <span className="font-bold bg-black/70 px-2.5 py-1 rounded-md border border-white/10">
                          {camp.views}
                        </span>
                        <span className="font-bold text-emerald-400 bg-black/70 px-2.5 py-1 rounded-md border border-white/10">
                          {camp.ctr}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wider text-[#4F7CFF] mb-1">
                      {camp.brand} × {camp.creatorName}
                    </div>

                    <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">
                      {camp.title}
                    </h3>

                    <p className="text-xs text-[#A1A1A1] line-clamp-2 mb-4 leading-relaxed">
                      {camp.description}
                    </p>

                    {/* Results metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#1C1C1C] mb-4">
                      {camp.results.slice(0, 4).map((r, i) => (
                        <div key={i} className="p-2 rounded-xl bg-[#141414] text-center border border-[#222]">
                          <span className="text-xs font-black text-[#F5F5F5] block">{r.value}</span>
                          <span className="text-[9px] text-[#888] uppercase truncate block">{r.metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                    <span className="text-[11px] text-[#888] font-mono">
                      ID: {camp.id}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCampaignModal(camp)}
                        className="px-3.5 py-1.5 bg-[#181818] hover:bg-[#252525] border border-[#2a2a2a] text-xs font-bold text-[#F5F5F5] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#4F7CFF]" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete case study "${camp.title}"?`)) {
                            deleteCampaign(camp.id);
                            showToast(`Campaign "${camp.title}" deleted.`);
                          }
                        }}
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-lg transition-colors cursor-pointer"
                        title="Delete Campaign"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB 4: SECTION VISIBILITY ======================= */}
        {activeTab === 'visibility' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header */}
            <div className="pb-6 border-b border-[#262626]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-2">
                Section Display Architecture
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight">
                Live Section Visibility & Temporary Hide
              </h1>
              <p className="text-xs sm:text-sm text-[#A1A1A1] mt-1 max-w-2xl">
                Yaha se aap dono major sections ko ek click me live website se temporary hide ya show kr skte hain.
                Changes instantly reflect on the public website.
              </p>
            </div>

            {/* Visibility Card 1: Creators Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101010] border border-[#262626] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#262626]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#141414] border border-[#262626] text-[#4F7CFF] mt-1">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-[#F5F5F5]">
                        1. Creators Section
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          settings.showCreatorsSection
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {settings.showCreatorsSection ? '● Live on Website' : '● Hidden from Website'}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-gray-400 mt-1">
                      Headline: "creators with influence. audiences with trust."
                    </p>
                    <p className="text-xs text-[#A1A1A1] mt-2 max-w-xl leading-relaxed">
                      Jab ye toggle OFF hoga, to website ke Home page se ye pura section (Quote banner, followers counter, slider, and roster thumbnails) bilkul hide ho jayega.
                    </p>
                  </div>
                </div>

                {/* Big Switch */}
                <div className="flex flex-col items-center sm:items-end gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      setSectionVisibility('creators', !settings.showCreatorsSection);
                      showToast(`Creators section is now ${!settings.showCreatorsSection ? 'VISIBLE' : 'HIDDEN'}`);
                    }}
                    className={`relative inline-flex h-9 w-20 items-center rounded-full transition-colors cursor-pointer ${
                      settings.showCreatorsSection ? 'bg-emerald-500' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform ${
                        settings.showCreatorsSection ? 'translate-x-12' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {settings.showCreatorsSection ? 'Enabled (Show)' : 'Disabled (Hide)'}
                  </span>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-6 flex items-center justify-between text-xs text-[#A1A1A1]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Currently displaying {creators.length} creators when enabled.</span>
                </div>
                <button
                  onClick={() => setActiveTab('creators')}
                  className="text-xs font-bold text-[#4F7CFF] hover:underline cursor-pointer"
                >
                  Edit Creators Roster →
                </button>
              </div>
            </div>

            {/* Visibility Card 2: Campaigns Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101010] border border-[#262626] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#262626]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#141414] border border-[#262626] text-[#4F7CFF] mt-1">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-[#F5F5F5]">
                        2. Campaigns Section
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          settings.showCampaignsSection
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {settings.showCampaignsSection ? '● Live on Website' : '● Hidden from Website'}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-gray-400 mt-1">
                      Headline: "campaigns that made noise."
                    </p>
                    <p className="text-xs text-[#A1A1A1] mt-2 max-w-xl leading-relaxed">
                      Jab ye toggle OFF hoga, to website ke Home page se ye pura section (Spotlight campaign card, secondary case studies stack, verified results) hide ho jayega.
                    </p>
                  </div>
                </div>

                {/* Big Switch */}
                <div className="flex flex-col items-center sm:items-end gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      setSectionVisibility('campaigns', !settings.showCampaignsSection);
                      showToast(`Campaigns section is now ${!settings.showCampaignsSection ? 'VISIBLE' : 'HIDDEN'}`);
                    }}
                    className={`relative inline-flex h-9 w-20 items-center rounded-full transition-colors cursor-pointer ${
                      settings.showCampaignsSection ? 'bg-emerald-500' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform ${
                        settings.showCampaignsSection ? 'translate-x-12' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {settings.showCampaignsSection ? 'Enabled (Show)' : 'Disabled (Hide)'}
                  </span>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-6 flex items-center justify-between text-xs text-[#A1A1A1]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Currently displaying {campaigns.length} case studies when enabled.</span>
                </div>
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className="text-xs font-bold text-[#4F7CFF] hover:underline cursor-pointer"
                >
                  Edit Campaigns →
                </button>
              </div>
            </div>

            {/* Live Test Action Banner */}
            <div className="p-6 rounded-3xl bg-[#141414] border border-[#4F7CFF]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#F5F5F5]">
                  Ready to test on live website?
                </h4>
                <p className="text-xs text-[#A1A1A1]">
                  Click below to open the home page and verify visibility states.
                </p>
              </div>

              <button
                onClick={() => {
                  navigate('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-md shadow-[#4F7CFF]/20"
              >
                Preview Live Home Page →
              </button>
            </div>
          </div>
        )}

        {/* ======================= TAB 5: BACKUP & JSON TOOLS ======================= */}
        {activeTab === 'backup' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header */}
            <div className="pb-6 border-b border-[#262626]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[11px] font-bold text-[#4F7CFF] uppercase tracking-widest mb-2">
                Data Persistence & Sync
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight">
                Backup, Export & JSON Import
              </h1>
              <p className="text-xs sm:text-sm text-[#A1A1A1] mt-1">
                Save your custom creators, campaigns, and settings as JSON or restore factory defaults anytime.
              </p>
            </div>

            {/* Firestore Cloud Database Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101010] border border-[#262626]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#4F7CFF]" />
                    <h3 className="text-base font-bold text-[#F5F5F5]">
                      Firebase Firestore Cloud Sync
                    </h3>
                  </div>
                  <p className="text-xs text-[#A1A1A1] mt-1">
                    All website section visibility, creators roster, and campaigns are synchronized in real-time across all devices & incognito windows.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181818] border border-[#333] text-xs font-semibold">
                  {firestoreStatus === 'connected' ? (
                    <span className="flex items-center gap-2 text-emerald-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Connected (creatorssync-media)
                    </span>
                  ) : firestoreStatus === 'connecting' ? (
                    <span className="flex items-center gap-2 text-amber-400">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Connecting to Firestore...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Offline / Rules Check
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#262626] text-xs">
                <div className="p-3.5 rounded-xl bg-[#141414] border border-[#262626]">
                  <span className="text-[#888] text-[10px] uppercase font-bold block mb-1">Firestore Collections</span>
                  <div className="font-mono text-gray-300 space-y-0.5">
                    <div>• csm_settings (Visibility)</div>
                    <div>• csm_creators (Roster)</div>
                    <div>• csm_campaigns (Cases)</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#141414] border border-[#262626]">
                  <span className="text-[#888] text-[10px] uppercase font-bold block mb-1">Image Storage Strategy</span>
                  <div className="text-gray-300">
                    Direct Base64 document payload (No Firebase Cloud Storage bucket needed).
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#141414] border border-[#262626]">
                  <span className="text-[#888] text-[10px] uppercase font-bold block mb-1">Security Rules</span>
                  <div className="font-mono text-emerald-400 text-[11px]">
                    allow read, write: if true;
                  </div>
                </div>
              </div>
            </div>

            {/* Export / Copy Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101010] border border-[#262626]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#F5F5F5]">
                    Export Current Data (JSON)
                  </h3>
                  <p className="text-xs text-[#A1A1A1] mt-0.5">
                    Download or copy all currently configured creators and campaigns.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const json = exportDataJSON();
                    navigator.clipboard.writeText(json);
                    showToast('Full JSON copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-[#181818] hover:bg-[#222] border border-[#333] text-xs font-bold text-[#F5F5F5] rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-[#4F7CFF]" />
                  <span>Copy JSON</span>
                </button>
              </div>

              <textarea
                readOnly
                value={exportDataJSON()}
                rows={7}
                className="w-full p-4 rounded-xl bg-[#080808] border border-[#262626] text-xs font-mono text-gray-400 outline-none select-all"
              />
            </div>

            {/* Import Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101010] border border-[#262626]">
              <h3 className="text-base font-bold text-[#F5F5F5] mb-1">
                Import Data (JSON)
              </h3>
              <p className="text-xs text-[#A1A1A1] mb-4">
                Paste valid JSON data containing `creators` and `campaigns` arrays to restore or bulk upload.
              </p>

              <textarea
                placeholder='Paste valid JSON here...'
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                rows={5}
                className="w-full p-4 rounded-xl bg-[#080808] border border-[#262626] focus:border-[#4F7CFF] text-xs font-mono text-[#F5F5F5] outline-none mb-4"
              />

              <button
                onClick={handleImportJson}
                disabled={!importJsonText.trim()}
                className="px-6 py-3 bg-[#4F7CFF] hover:bg-[#3D6CE5] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Apply Imported JSON</span>
              </button>
            </div>

            {/* Factory Reset */}
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-500/30">
              <h3 className="text-base font-bold text-rose-400 mb-1">
                Reset to Default Data
              </h3>
              <p className="text-xs text-rose-200/70 mb-4 max-w-xl leading-relaxed">
                This will reset all creators, campaigns, and visibility toggles back to the default agency setup.
              </p>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all data to default templates?')) {
                    resetToDefaults();
                    showToast('Data reset to default templates successfully.');
                  }
                }}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset All to Defaults</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ======================= MODAL: ADD / EDIT CREATOR ======================= */}
      {isCreatorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#101010] border border-[#262626] rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#262626] mb-6">
              <div>
                <span className="text-[10px] font-bold text-[#4F7CFF] uppercase tracking-widest block">
                  Creator Roster Management
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#F5F5F5]">
                  {editingCreator ? `Edit: ${editingCreator.name}` : 'Add New Creator to Roster'}
                </h2>
              </div>
              <button
                onClick={() => setIsCreatorModalOpen(false)}
                className="p-2 rounded-xl bg-[#141414] hover:bg-[#202020] text-[#A1A1A1] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveCreator} className="space-y-6">
              {/* Row 1: Name & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Creator / Channel Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Avi Sharma"
                    value={creatorForm.name}
                    onChange={(e) => setCreatorForm({ ...creatorForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    YouTube Handle *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. @careerwithavi"
                    value={creatorForm.handle}
                    onChange={(e) => setCreatorForm({ ...creatorForm, handle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Category, Tier, Location, Language */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Category
                  </label>
                  <select
                    value={creatorForm.category}
                    onChange={(e) => setCreatorForm({ ...creatorForm, category: e.target.value as CreatorCategory })}
                    className="w-full px-3 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs font-bold text-[#F5F5F5] outline-none cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Tier
                  </label>
                  <select
                    value={creatorForm.tier}
                    onChange={(e) => setCreatorForm({ ...creatorForm, tier: e.target.value as any })}
                    className="w-full px-3 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs font-bold text-[#F5F5F5] outline-none cursor-pointer"
                  >
                    <option value="Mega">Mega (1M+)</option>
                    <option value="Macro">Macro (400K - 1M)</option>
                    <option value="Mid-Tier">Mid-Tier (100K - 400K)</option>
                    <option value="Rising Star">Rising Star</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, India"
                    value={creatorForm.location}
                    onChange={(e) => setCreatorForm({ ...creatorForm, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Language
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hindi & English"
                    value={creatorForm.language}
                    onChange={(e) => setCreatorForm({ ...creatorForm, language: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Stats (Subscribers, Short Stat, ER, Avg Views) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#141414] border border-[#262626]">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#A1A1A1] mb-1">
                    Subscribers Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 450K Subscribers"
                    value={creatorForm.subscribers}
                    onChange={(e) => setCreatorForm({ ...creatorForm, subscribers: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#080808] border border-[#262626] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#A1A1A1] mb-1">
                    Followers Short (Big Stat)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 450K+"
                    value={creatorForm.followersShort}
                    onChange={(e) => setCreatorForm({ ...creatorForm, followersShort: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#080808] border border-[#262626] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#A1A1A1] mb-1">
                    Engagement Rate
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 8.4% ER"
                    value={creatorForm.engagement}
                    onChange={(e) => setCreatorForm({ ...creatorForm, engagement: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#080808] border border-[#262626] text-xs text-emerald-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#A1A1A1] mb-1">
                    Avg Views
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 190K / video"
                    value={creatorForm.averageViews}
                    onChange={(e) => setCreatorForm({ ...creatorForm, averageViews: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#080808] border border-[#262626] text-xs text-[#4F7CFF] outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#A1A1A1]">
                      Profile Image (High Res) *
                    </label>
                    <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] text-[11px] font-bold text-[#4F7CFF] cursor-pointer transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>{uploadingImageField === 'creator-image' ? 'Processing...' : 'Upload from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'creator-image')}
                        disabled={uploadingImageField !== null}
                      />
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    {creatorForm.image && (
                      <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#333] flex-shrink-0 bg-black">
                        <img
                          src={creatorForm.image}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <input
                      type="text"
                      required
                      placeholder="https://... or click Upload from Device"
                      value={creatorForm.image}
                      onChange={(e) => setCreatorForm({ ...creatorForm, image: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 block mt-1">
                    Direct Firestore DB upload (Auto-optimized base64 payload)
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#A1A1A1]">
                      Cover Image (Optional)
                    </label>
                    <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] text-[11px] font-bold text-[#4F7CFF] cursor-pointer transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>{uploadingImageField === 'creator-cover' ? 'Processing...' : 'Upload Cover'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'creator-cover')}
                        disabled={uploadingImageField !== null}
                      />
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    {creatorForm.coverImage && (
                      <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#333] flex-shrink-0 bg-black">
                        <img
                          src={creatorForm.coverImage}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="https://... or click Upload Cover"
                      value={creatorForm.coverImage}
                      onChange={(e) => setCreatorForm({ ...creatorForm, coverImage: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 block mt-1">
                    Direct Firestore DB upload
                  </span>
                </div>
              </div>

              {/* Row 5: Quote (displayed on the main website banner) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                  "In Their Words" Quote (Displayed in the Top Banner) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. reach engineered into high-impact recurring income."
                  value={creatorForm.quote}
                  onChange={(e) => setCreatorForm({ ...creatorForm, quote: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                />
              </div>

              {/* Row 6: Tagline & Full Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                  Short Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tech career roadmaps, job interview preparation & software engineering insights."
                  value={creatorForm.tagline}
                  onChange={(e) => setCreatorForm({ ...creatorForm, tagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Bio and background details..."
                  value={creatorForm.description}
                  onChange={(e) => setCreatorForm({ ...creatorForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                />
              </div>

              {/* Row 7: Past Brands */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                  Past Brand Sponsors (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Google, Samsung, Boat, Zerodha"
                  value={pastBrandsString}
                  onChange={(e) => setPastBrandsString(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-[#262626] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatorModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] text-xs font-bold uppercase tracking-wider text-[#A1A1A1] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#4F7CFF]/20"
                >
                  {editingCreator ? 'Update Creator' : 'Save & Publish Creator'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: ADD / EDIT CAMPAIGN ======================= */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#101010] border border-[#262626] rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#262626] mb-6">
              <div>
                <span className="text-[10px] font-bold text-[#4F7CFF] uppercase tracking-widest block">
                  Campaign Case Study Management
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#F5F5F5]">
                  {editingCampaign ? `Edit: ${editingCampaign.title}` : 'Add New Campaign Case Study'}
                </h2>
              </div>
              <button
                onClick={() => setIsCampaignModalOpen(false)}
                className="p-2 rounded-xl bg-[#141414] hover:bg-[#202020] text-[#A1A1A1] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveCampaign} className="space-y-6">
              {/* Row 1: Title & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Campaign Headline / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next-Gen Esports Rig Launch: High-Frames Challenge"
                    value={campaignForm.title}
                    onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asus ROG India"
                    value={campaignForm.brand}
                    onChange={(e) => setCampaignForm({ ...campaignForm, brand: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Creator Name & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Creator Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kabir Sengupta"
                    value={campaignForm.creatorName}
                    onChange={(e) => setCampaignForm({ ...campaignForm, creatorName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Creator Handle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. @PixelKabir"
                    value={campaignForm.creatorHandle}
                    onChange={(e) => setCampaignForm({ ...campaignForm, creatorHandle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Category, Campaign Type, Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Category
                  </label>
                  <select
                    value={campaignForm.category}
                    onChange={(e) => setCampaignForm({ ...campaignForm, category: e.target.value as CreatorCategory })}
                    className="w-full px-3 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs font-bold text-[#F5F5F5] outline-none cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Campaign Format
                  </label>
                  <select
                    value={campaignForm.type}
                    onChange={(e) => setCampaignForm({ ...campaignForm, type: e.target.value as CampaignType })}
                    className="w-full px-3 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs font-bold text-[#F5F5F5] outline-none cursor-pointer"
                  >
                    {CAMPAIGN_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Featured Case Study"
                    value={campaignForm.badge}
                    onChange={(e) => setCampaignForm({ ...campaignForm, badge: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-[#141414] border border-[#262626]">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#A1A1A1] mb-1">
                    Views Display
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3.8M Views"
                    value={campaignForm.views}
                    onChange={(e) => setCampaignForm({ ...campaignForm, views: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#080808] border border-[#262626] text-xs text-[#F5F5F5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#A1A1A1] mb-1">
                    Engagement Rate
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 8.7%"
                    value={campaignForm.engagementRate}
                    onChange={(e) => setCampaignForm({ ...campaignForm, engagementRate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#080808] border border-[#262626] text-xs text-[#4F7CFF] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#A1A1A1] mb-1">
                    CTR / Conversion
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4.9% Link CTR"
                    value={campaignForm.ctr}
                    onChange={(e) => setCampaignForm({ ...campaignForm, ctr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#080808] border border-[#262626] text-xs text-emerald-400 outline-none"
                  />
                </div>
              </div>

              {/* Row 5: Thumbnail URL */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#A1A1A1]">
                    Visual Thumbnail Image *
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] text-[11px] font-bold text-[#4F7CFF] cursor-pointer transition-colors">
                    <Upload className="w-3 h-3" />
                    <span>{uploadingImageField === 'campaign-thumb' ? 'Processing...' : 'Upload from Device'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'campaign-thumb')}
                      disabled={uploadingImageField !== null}
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {campaignForm.thumbnail && (
                    <div className="w-14 h-10 rounded-xl overflow-hidden border border-[#333] flex-shrink-0 bg-black">
                      <img
                        src={campaignForm.thumbnail}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <input
                    type="text"
                    required
                    placeholder="https://... or click Upload from Device"
                    value={campaignForm.thumbnail}
                    onChange={(e) => setCampaignForm({ ...campaignForm, thumbnail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none font-mono"
                  />
                </div>
                <span className="text-[10px] text-gray-500 block mt-1">
                  Saved directly inside Firestore document payload (No separate Cloud Storage bucket needed)
                </span>
              </div>

              {/* Row 6: Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                  Campaign Summary / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Summary of campaign goal and execution..."
                  value={campaignForm.description}
                  onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#4F7CFF] text-xs text-[#F5F5F5] outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-[#262626] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] text-xs font-bold uppercase tracking-wider text-[#A1A1A1] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-[#4F7CFF] hover:bg-[#3D6CE5] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#4F7CFF]/20"
                >
                  {editingCampaign ? 'Update Campaign' : 'Save & Publish Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
