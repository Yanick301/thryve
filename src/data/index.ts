// ============================================================
// THRYVE — Application Data & Config
// ============================================================

import type {
  User,
  SocialAccount,
  Post,
  MediaFile,
  MediaFolder,
  AnalyticsDataPoint,
  AnalyticsSummary,
  PricingPlan,
  Notification,
} from '@/lib/index';

// ─── Current User (ALPHA) ────────────────────────────────────
export const MOCK_USER: User = {
  id: '00000000-0000-0000-0000-000000000000',
  name: 'Alpha Operator',
  email: 'operator@thryve.nexus',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha&backgroundColor=b6e3f4',
  plan: 'agency',
  createdAt: new Date().toISOString(),
};

// ─── Social Accounts (REAL DATA FALLBACK) ────────────────────
export const MOCK_ACCOUNTS: SocialAccount[] = [];

// ─── Mock Posts ──────────────────────────────────────────────
export const MOCK_POSTS: Post[] = [];

// ─── Mock Media ──────────────────────────────────────────────
export const MOCK_FOLDERS: MediaFolder[] = [];
export const MOCK_MEDIA: MediaFile[] = [];

// ─── Analytics ───────────────────────────────────────────────
export const MOCK_ANALYTICS_DATA: AnalyticsDataPoint[] = [];

export const MOCK_ANALYTICS_SUMMARY: AnalyticsSummary = {
  totalFollowers: 0,
  followerGrowth: 0,
  totalLikes: 0,
  likesGrowth: 0,
  totalComments: 0,
  commentsGrowth: 0,
  totalReach: 0,
  reachGrowth: 0,
  avgEngagement: 0,
  engagementGrowth: 0,
};

// ─── Pricing (Marketing Content - kept as structure) ──────────
export const MOCK_PRICING: PricingPlan[] = [
  {
    id: 'free',
    name: 'Starter',
    price: 0,
    yearlyPrice: 0,
    description: 'Parfait pour débuter et tester la plateforme',
    features: [
      '1 compte social connecté',
      '10 publications/mois',
      'Bibliothèque média (500 MB)',
      'Calendrier éditorial',
      'Analytics basiques',
    ],
    highlighted: false,
    accounts: 1,
    postsPerMonth: 10,
    mediaStorage: 0.5,
  },
  {
    id: 'pro',
    name: 'Creator',
    price: 19,
    yearlyPrice: 15,
    description: 'Pour les créateurs qui veulent passer au niveau supérieur',
    features: [
      '5 comptes sociaux connectés',
      'Publications illimitées',
      'Bibliothèque média (10 GB)',
      'Calendrier & drag and drop',
      'Analytics avancés',
      'Programmation automatique',
      'Support prioritaire',
    ],
    highlighted: true,
    badge: 'Le plus populaire',
    isPopular: true,
    accounts: 5,
    postsPerMonth: 999,
    mediaStorage: 10,
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 79,
    yearlyPrice: 63,
    description: 'La solution complète pour les agences ambitieuses',
    features: [
      '20 comptes sociaux connectés',
      'Publications illimitées',
      'Bibliothèque média illimitée',
      'Multi-utilisateurs (jusqu\'à 10)',
      'Analytics & rapports exportables',
      'API Access',
      'Onboarding dédié',
      'Support 24/7',
    ],
    highlighted: false,
    accounts: 20,
    postsPerMonth: 9999,
    mediaStorage: 999,
  },
];

// ─── Testimonials (Empty as requested) ────────────────────────
export const MOCK_TESTIMONIALS: any[] = [];

// ─── FAQ ─────────────────────────────────────────────────────
export const MOCK_FAQ = [
  {
    q: 'Quelles plateformes sont supportées ?',
    a: 'Thryve supporte actuellement Instagram et Threads.',
  },
  {
    q: 'Comment fonctionne la programmation ?',
    a: 'Créez votre post, choisissez une date, et notre moteur Playwright s\'occupe du reste.',
  },
];

// ─── Notifications ───────────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [];

// ─── Features ─────────────────────────────────────────────────
export const FEATURES = [
  {
    icon: 'Calendar',
    title: 'Calendrier Editorial',
    description: 'Planifiez votre contenu à l\'avance avec notre calendrier intuitif.',
    color: '#4F46E5',
  },
  {
    icon: 'Images',
    title: 'Bibliothèque Média',
    description: 'Organisez, importez et retrouvez vos visuels instantanément.',
    color: '#14B8A6',
  },
  {
    icon: 'BarChart3',
    title: 'Analytics Réels',
    description: 'Suivez vos performances basées sur vos vraies publications.',
    color: '#F43F5E',
  },
  {
    icon: 'Zap',
    title: 'Automatisation Alpha',
    description: 'Programmez vos posts et laissez Playwright simuler l\'humain.',
    color: '#F59E0B',
  },
];
