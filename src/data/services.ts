import { ServiceItem } from '../types';

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables?: string[];
  image: string;
  category: 'brands' | 'creators';
  highlightBadge?: string;
}

export const BRAND_SERVICES: ServiceDetail[] = [
  {
    id: 'influencer-marketing',
    number: '01',
    title: 'Influencer Marketing',
    tagline: 'Authentic Creator Advocacy',
    description: 'Build authentic campaigns around creators your audience trusts and watches every day.',
    deliverables: ['Creator audience validation', 'Message-market resonance', 'Cross-platform distribution'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    category: 'brands'
  },
  {
    id: 'creator-campaigns',
    number: '02',
    title: 'Creator Campaigns',
    tagline: 'Targeted Narrative Waves',
    description: 'Campaigns built around relevant creator audiences for product launches and sustained growth.',
    deliverables: ['Custom launch calendars', 'Synchronized release waves', 'Creative storyline angles'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: 'brands'
  },
  {
    id: 'brand-promotions',
    number: '03',
    title: 'Brand Promotions',
    tagline: 'Native Conversation Placement',
    description: 'Put products into the right conversations where high-intent buyers evaluate purchasing decisions.',
    deliverables: ['In-depth product unboxings', 'Hands-on live demonstrations', 'High-conversion offer codes'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    category: 'brands'
  },
  {
    id: 'creator-partnerships',
    number: '04',
    title: 'Creator Partnerships',
    tagline: 'Long-Term Brand Ambassadors',
    description: 'Connect brands with creators that fit your core values and generate compounding organic loyalty.',
    deliverables: ['Quarterly & annual retainers', 'Category exclusivity agreements', 'Perpetual brand alignment'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    category: 'brands'
  },
  {
    id: 'campaign-management',
    number: '05',
    title: 'Campaign Management',
    tagline: 'End-to-End Operational Execution',
    description: 'From creator coordination to campaign execution, we manage the moving parts so your team stays focused on core strategy.',
    deliverables: ['Legal contracts & IP compliance', 'Product courier logistics', 'Draft reviewing & revision cycles', 'Live timeline supervision'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    category: 'brands',
    highlightBadge: 'Full-Lifecycle Agency Service'
  },
  {
    id: 'youtube-promotions',
    number: '06',
    title: 'YouTube Promotions',
    tagline: 'Evergreen High-Retention Video',
    description: 'Mid-roll integrations, dedicated videos, and Shorts engineered for long-term searchable discovery.',
    deliverables: ['60-120s video integrations', 'Dedicated review episodes', 'High-velocity Shorts clips'],
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    category: 'brands'
  },
  {
    id: 'sponsored-content',
    number: '07',
    title: 'Sponsored Content',
    tagline: 'Native Storytelling & Reviews',
    description: 'Native product storytelling that viewers watch, engage with, and remember long after viewing.',
    deliverables: ['Editorial review segments', 'Problem-solution skits', 'Natural lifestyle placement'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    category: 'brands'
  },
  {
    id: 'creator-discovery',
    number: '08',
    title: 'Creator Discovery & Matching',
    tagline: 'Audience-Verified Search',
    description: 'Algorithmic screening to find creators with proven demographic alignment and genuine influence.',
    deliverables: ['Psychographic audience audit', 'Historical retention metrics', 'Sentiment & credibility scoring'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    category: 'brands'
  }
];

export const CREATOR_SERVICES: ServiceDetail[] = [
  {
    id: 'brand-collaborations',
    number: '01',
    title: 'Brand Collaborations',
    tagline: 'Authentic Sponsor Alignment',
    description: 'Work with relevant brands that fit your content style, values, and audience interests.',
    deliverables: ['Category-leading sponsors', 'Creative brief alignment', 'Zero creative compromise'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    category: 'creators'
  },
  {
    id: 'sponsored-campaigns',
    number: '02',
    title: 'Sponsored Campaigns',
    tagline: 'Paid Integration Deals',
    description: 'Discover campaign deals with pre-funded budgets, clear deliverables, and guaranteed terms.',
    deliverables: ['Dedicated video slots', 'Mid-roll integrations', 'High-volume Shorts blitzes'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: 'creators'
  },
  {
    id: 'brand-deals',
    number: '03',
    title: 'Brand Deals',
    tagline: 'Competitive Rate Negotiation',
    description: 'High-ticket sponsorships and commercial terms negotiated to match your true market influence.',
    deliverables: ['Fair commercial valuation', 'Usage rights negotiation', 'Deliverable scope protection'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    category: 'creators'
  },
  {
    id: 'creator-partnerships-talent',
    number: '04',
    title: 'Creator Partnerships',
    tagline: 'Recurring Ambassador Contracts',
    description: 'Long-term multi-month brand relationships that provide stable recurring income.',
    deliverables: ['Multi-quarter contracts', 'Exclusivity premium pricing', 'Co-branded product lines'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    category: 'creators'
  },
  {
    id: 'campaign-opportunities',
    number: '05',
    title: 'Campaign Opportunities',
    tagline: 'Proactive Brand Matching',
    description: 'Get discovered for high-budget campaigns relevant to your audience without cold pitching brands.',
    deliverables: ['Direct brand briefs', 'Priority roster placement', 'Consistent deal pipeline'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    category: 'creators',
    highlightBadge: 'Network Roster Discovery'
  },
  {
    id: 'creator-support',
    number: '06',
    title: 'Creator Support',
    tagline: 'Dedicated Agency Guidance',
    description: 'From brand communications to legal review and revisions, get expert backup on every single deal.',
    deliverables: ['Brief clarification assistance', 'Script & concept feedback', 'Revision limit enforcement'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    category: 'creators'
  },
  {
    id: 'deal-management',
    number: '07',
    title: 'Deal Management',
    tagline: 'Frictionless Invoicing & Logistics',
    description: 'Hassle-free administration: product shipping, clear NDAs, and prompt bank milestone payouts.',
    deliverables: ['Standardized contracts', 'Prompt milestone payments', 'Courier shipment tracking'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    category: 'creators'
  }
];

export const BRAND_CAMPAIGN_FLOW = [
  {
    step: '01',
    title: 'Brief',
    tagline: 'Brand shares campaign goal.',
    desc: 'You outline your campaign objective, target consumer persona, budget, and desired timeline.'
  },
  {
    step: '02',
    title: 'Match',
    tagline: 'Find the right creators.',
    desc: 'Our discovery engine surfaces vetted creators with verified audience demographics and engagement history.'
  },
  {
    step: '03',
    title: 'Deal',
    tagline: 'Coordinate creator partnership.',
    desc: 'We structure contracts, secure product logistics, and collaborate on high-retention creative scripts.'
  },
  {
    step: '04',
    title: 'Launch',
    tagline: 'Campaign goes live.',
    desc: 'Synchronized publishing across channels with live tracking, engagement management, and verified reporting.'
  }
];

export const CREATOR_JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Apply',
    tagline: 'Join the network.',
    desc: 'Submit your channel profile, audience metrics, and preferred collaboration categories.'
  },
  {
    step: '02',
    title: 'Get Discovered',
    tagline: 'Profile enters our network.',
    desc: 'Our curation team verifies your metrics and indexes your audience for incoming brand briefs.'
  },
  {
    step: '03',
    title: 'Get Matched',
    tagline: 'Relevant brands discover you.',
    desc: 'Receive curated sponsorship briefs with clear deliverables, fair market rates, and defined timelines.'
  },
  {
    step: '04',
    title: 'Collaborate',
    tagline: 'Campaign goes live.',
    desc: 'Create authentic content in your native voice, get prompt milestone payouts, and build recurring brand relationships.'
  }
];

export const WHY_US_PILLARS = [
  {
    number: '01',
    title: 'Creator Fit',
    subtitle: 'Relevance Over Vanity',
    description: 'We focus on genuine audience resonance, comment sentiment, and category credibility — not just empty vanity follower counts.'
  },
  {
    number: '02',
    title: 'Campaign Support',
    subtitle: 'Full-Lifecycle Execution',
    description: 'From initial brief to final delivery, we manage product logistics, contract clauses, revisions, and compliance with zero operational friction.'
  },
  {
    number: '03',
    title: 'Real Relationships',
    subtitle: 'Compounding Brand Equity',
    description: 'We build long-term trust between brands and creators, turning one-off promotional posts into sustainable multi-campaign partnerships.'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'creator-discovery',
    number: '01',
    title: 'Creator Discovery',
    shortDesc: 'Find the right creators for your audience, backed by deep demographic fit and genuine authority.',
    fullDesc: 'We move beyond vanity follower counts. Our discovery framework screens creator audience psychographics, historical comment sentiment, geographic density, and brand safety to surface genuine category leaders who actually hold attention.',
    deliverables: [
      'Audience demographic audit (age, location, gender, spending power)',
      'Brand safety and past sponsorship saturation scoring',
      'Historical conversion and engagement rate benchmarking',
      'Shortlist curation with custom rationale per creator'
    ],
    idealFor: 'Brands entering creator marketing or expanding into high-intent niche verticals.'
  },
  {
    id: 'youtube-campaigns',
    number: '02',
    title: 'YouTube Campaigns',
    shortDesc: 'Integrations, dedicated videos, and Shorts engineered for high retention and evergreen search traffic.',
    fullDesc: 'YouTube is the ultimate consideration and high-ticket conversion engine. We structure bespoke long-form integrations (60–120s segments), full dedicated reviews, and coordinated Shorts blitzes that stay searchable for years.',
    deliverables: [
      'Seamless 60–120s mid-roll integrations with custom hooks',
      'Full dedicated product launch masterclasses and teardowns',
      'YouTube Shorts blitzes for viral brand awareness',
      'End screen cards, pinned comment pinning, and description SEO links'
    ],
    idealFor: 'Tech hardware, fintech products, complex software, gaming, and lifestyle brands.'
  },
  {
    id: 'brand-partnerships',
    number: '03',
    title: 'Brand Partnerships',
    shortDesc: 'Long-term ambassador deals that transform transactional sponsorships into deep creator advocacy.',
    fullDesc: 'Single one-off videos only build awareness. Long-term multi-quarter ambassador partnerships embed your product into the creator’s natural lifestyle and regular programming, building compounding trust with recurring customer cohorts.',
    deliverables: [
      'Multi-month and annual ambassador contract structuring',
      'Category exclusivity and competitive lockout terms',
      'Co-branded merchandise, live events, and meet-and-greets',
      'Perpetual or multi-channel paid usage rights (Spark Ads / Whitelisting)'
    ],
    idealFor: 'Established brands looking for sustained category dominance and high brand recall.'
  },
  {
    id: 'campaign-management',
    number: '04',
    title: 'Campaign Management',
    shortDesc: 'End-to-end operational execution: briefing, contracts, product sampling, approvals, and scheduling.',
    fullDesc: 'We remove 100% of the operational friction. From legal contracts and NDAs to prompt product seeding, strict revision management, compliance checks, and synchronized launch windows, we handle everything under one roof.',
    deliverables: [
      'Standardized legal contracts, IP protection, and compliance',
      'Product shipping logistics, tracking, and unboxing guidelines',
      'Script reviews, rough cut reviews, and revision loops',
      'Synchronized publishing schedules and embargo management'
    ],
    idealFor: 'Growth teams and marketing leaders who need hands-off, zero-headache campaign execution.'
  },
  {
    id: 'creative-strategy',
    number: '05',
    title: 'Creative Strategy',
    shortDesc: 'Hooks, storytelling frameworks, and call-to-actions that turn passive viewers into active buyers.',
    fullDesc: 'The biggest reason influencer ads fail is generic corporate messaging. We craft custom narrative hooks, real-world stress tests, humor skits, and psychological CTAs that align with each creator’s native tone of voice.',
    deliverables: [
      'Native script angle development and storyboarding',
      'High-retention video opening hooks (first 5 seconds)',
      'Custom discount mechanics, bonus incentives, and urgency drivers',
      'A/B testing creative concepts across different creator tiers'
    ],
    idealFor: 'Brands that want memorable creator content that viewers actually want to watch.'
  },
  {
    id: 'performance-reporting',
    number: '06',
    title: 'Performance & Reporting',
    shortDesc: 'Transparent analytics, UTM attribution, retention heatmaps, and clear ROI calculations.',
    fullDesc: 'We hold every campaign accountable to real business metrics. Our post-campaign dossier provides audited view counts, retention curves, CTRs, coupon redemptions, brand sentiment analysis, and clear CAC benchmarks.',
    deliverables: [
      'Live UTM and affiliate conversion tracking dashboard',
      'Audience retention drop-off and engagement heatmaps',
      'Sentiment analysis across thousands of viewer comments',
      'Executive-ready ROI and customer acquisition cost (CAC) summary'
    ],
    idealFor: 'Data-driven marketing directors who require clear ROI justification for leadership.'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Brief',
    tagline: 'Define the Goal',
    description: 'You share your target audience, budget, timeline, and campaign objective (launch, conversions, or brand awareness).'
  },
  {
    step: '02',
    title: 'Match',
    tagline: 'Precision Selection',
    description: 'Our team uses the Match Engine to shortlist vetted creators with verified demographic fit and proven engagement history.'
  },
  {
    step: '03',
    title: 'Launch',
    tagline: 'Flawless Execution',
    description: 'We manage briefing, product seeding, script angles, revision loops, and ensure synchronized go-live across channels.'
  },
  {
    step: '04',
    title: 'Impact',
    tagline: 'Measure & Scale',
    description: 'Track real-time views, link clicks, conversion metrics, and detailed performance reports to double down on winning creators.'
  }
];

export const BRAND_FAQS = [
  {
    q: 'How does CreatorsSyncMedia select creators for my brand?',
    a: 'We evaluate creators across 4 dimensions: audience demographic fit (age, location, purchasing capacity), authentic sentiment in their comments, historical video retention rates, and past category saturation. We prioritize relevance and trust over mere subscriber count.'
  },
  {
    q: 'What campaign formats do you specialize in?',
    a: 'We specialize in YouTube 60–120s mid-roll integrations, full dedicated video masterclasses, high-velocity YouTube Shorts blitzes, multi-creator launch campaigns, and long-term brand ambassador programs.'
  },
  {
    q: 'What is the typical timeline for launching a campaign?',
    a: 'A standard campaign takes between 10 to 18 business days from brief finalization to live video publishing, covering creator matching, product delivery, script development, rough cut approval, and synchronized scheduling.'
  },
  {
    q: 'Do you handle contracts, product shipping, and legal compliance?',
    a: 'Yes, 100%. We manage end-to-end contracts with clear deliverable clauses, ASCI influencer guidelines compliance, secure product courier tracking, and payment milestones.'
  },
  {
    q: 'What is the minimum budget required to work with CreatorsSyncMedia?',
    a: 'We tailor campaigns starting from focused ₹2,00,000 pilot tests with mid-tier creators up to multi-crore full-scale national product launches spanning dozens of mega creators.'
  }
];

export const CREATOR_FAQS = [
  {
    q: 'What does it cost for a creator to join the network?',
    a: 'Joining the CreatorsSyncMedia network is 100% free. We never charge creators sign-up or maintenance fees. We make money by connecting you with funded brand budgets that pay top-tier market rates.'
  },
  {
    q: 'What types of brand deals can I expect?',
    a: 'Depending on your niche, you will receive long-form video integrations, dedicated reviews, high-impact Shorts campaigns, long-term annual ambassadorships, and paid event attendance invitations.'
  },
  {
    q: 'Do I lose creative control over my content?',
    a: 'Never. We fiercely protect our creators’ authentic voice. We work with brands to ensure the brief fits your natural presentation style so your audience loves the integration rather than skipping it.'
  },
  {
    q: 'When and how do I get paid?',
    a: 'We ensure prompt, transparent payouts directly to your registered bank account per agreed milestone terms, without prolonged delays.'
  }
];

