export type CreatorCategory =
  | 'All'
  | 'Technology'
  | 'Gaming'
  | 'Finance'
  | 'Education'
  | 'Lifestyle'
  | 'Entertainment'
  | 'Fitness'
  | 'Beauty'
  | 'Business'
  | 'Comedy';

export interface CreatorVideo {
  id: string;
  title: string;
  views: string;
  duration: string;
  thumbnail: string;
  type: 'Integration' | 'Dedicated' | 'Shorts';
  url?: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  category: CreatorCategory;
  subscribers: string;
  subscribersCount: number; // for numerical sorting
  location: string;
  language: string;
  engagement: string;
  averageViews: string;
  image: string;
  coverImage?: string;
  tagline: string;
  quote?: string;
  followersShort?: string;
  description: string;
  verified: boolean;
  tier: 'Mega' | 'Macro' | 'Mid-Tier' | 'Rising Star';
  platforms: {
    youtube?: string;
    instagram?: string;
    twitter?: string;
  };
  audience: {
    primaryAge: string;
    genderSplit: { male: number; female: number };
    topLocations: string[];
    topInterests: string[];
  };
  sampleVideos: CreatorVideo[];
  pastBrands: string[];
}

export type CampaignType =
  | 'All'
  | 'YouTube Integration'
  | 'Dedicated Video'
  | 'Shorts Campaign'
  | 'Multi-Creator Series'
  | 'Long-Term Ambassador';

export interface Campaign {
  id: string;
  title: string;
  brand: string;
  brandCategory: string;
  creatorName: string;
  creatorHandle: string;
  creatorId: string;
  category: CreatorCategory;
  type: CampaignType;
  views: string;
  viewsCount: number;
  engagementRate: string;
  ctr: string;
  thumbnail: string;
  videoPreviewUrl?: string;
  badge?: string;
  description: string;
  objective: string;
  strategy: string;
  execution: string;
  results: {
    metric: string;
    value: string;
    detail: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  idealFor: string;
}

export interface CampaignLeadFormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  campaignType: string;
  budgetRange: string;
  timeline: string;
  campaignBrief: string;
}

export interface CreatorApplicationFormData {
  creatorName: string;
  channelName: string;
  channelUrl: string;
  email: string;
  phone: string;
  category: CreatorCategory;
  subscribersCount: string;
  monthlyViews: string;
  primaryLocation: string;
  notes: string;
}
