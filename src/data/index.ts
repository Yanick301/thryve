// ============================================================
// THRYVE — Mock Data for all sections
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

// ─── Current User ────────────────────────────────────────────
export const MOCK_USER: User = {
  id: 'u1',
  name: 'Sophie Martin',
  email: 'sophie@agencedeos.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie&backgroundColor=b6e3f4',
  plan: 'pro',
  createdAt: '2025-01-15',
};

// ─── Social Accounts ────────────────────────────────────────
export const MOCK_ACCOUNTS: SocialAccount[] = [
  {
    id: 'a1',
    platform: 'instagram',
    username: '@sophiemartin.co',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    followers: 24800,
    isConnected: true,
    lastSync: '2026-03-15T10:30:00',
  },
  {
    id: 'a2',
    platform: 'threads',
    username: '@sophiemartin.co',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    followers: 8420,
    isConnected: true,
    lastSync: '2026-03-15T10:30:00',
  },
  {
    id: 'a3',
    platform: 'instagram',
    username: '@agencecreative',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Agency',
    followers: 51300,
    isConnected: false,
    lastSync: undefined,
  },
];

// ─── Mock Posts ──────────────────────────────────────────────
export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    caption: '✨ La créativité ne dort jamais. Voici nos coulisses du studio ce matin !',
    hashtags: ['#creativite', '#studio', '#behind', '#contentcreator'],
    mediaUrls: [],
    platform: 'instagram',
    status: 'published',
    publishedAt: '2026-03-14T09:00:00',
    createdAt: '2026-03-14T08:00:00',
    likes: 1240,
    comments: 87,
    reach: 18400,
    impressions: 22100,
  },
  {
    id: 'p2',
    caption: 'Le secret des marques qui cartonnent sur les réseaux ? La cohérence 🎯',
    hashtags: ['#socialmedia', '#branding', '#tips', '#marketing'],
    mediaUrls: [],
    platform: 'threads',
    status: 'published',
    publishedAt: '2026-03-13T14:00:00',
    createdAt: '2026-03-13T13:00:00',
    likes: 892,
    comments: 134,
    reach: 12600,
    impressions: 15800,
  },
  {
    id: 'p3',
    caption: 'Nouvelle collection printemps 🌸 — Découvrez les tendances 2026',
    hashtags: ['#printemps2026', '#tendances', '#mode', '#lifestyle'],
    mediaUrls: [],
    platform: 'both',
    status: 'scheduled',
    scheduledAt: '2026-03-16T11:00:00',
    createdAt: '2026-03-15T10:00:00',
    likes: 0,
    comments: 0,
    reach: 0,
    impressions: 0,
  },
  {
    id: 'p4',
    caption: '5 outils indispensables pour les créateurs de contenu en 2026',
    hashtags: ['#tools', '#contentcreator', '#productivity', '#tips'],
    mediaUrls: [],
    platform: 'instagram',
    status: 'scheduled',
    scheduledAt: '2026-03-17T09:00:00',
    createdAt: '2026-03-15T09:30:00',
    likes: 0,
    comments: 0,
    reach: 0,
    impressions: 0,
  },
  {
    id: 'p5',
    caption: 'Throwback à notre campagne la plus mémorable de 2025 🔥',
    hashtags: ['#throwback', '#campaign', '#memories'],
    mediaUrls: [],
    platform: 'both',
    status: 'draft',
    createdAt: '2026-03-15T11:00:00',
    likes: 0,
    comments: 0,
    reach: 0,
    impressions: 0,
  },
  {
    id: 'p6',
    caption: 'La vérité sur les algorithmes Instagram en 2026 📊',
    hashtags: ['#algorithm', '#instagram', '#tips', '#growth'],
    mediaUrls: [],
    platform: 'instagram',
    status: 'scheduled',
    scheduledAt: '2026-03-18T15:00:00',
    createdAt: '2026-03-15T12:00:00',
  },
  {
    id: 'p7',
    caption: 'Rencontre avec des créateurs de génie — Interview exclusive',
    hashtags: ['#interview', '#creators', '#inspiration'],
    mediaUrls: [],
    platform: 'threads',
    status: 'draft',
    createdAt: '2026-03-15T13:00:00',
  },
];

// ─── Mock Media ──────────────────────────────────────────────
export const MOCK_FOLDERS: MediaFolder[] = [
  { id: 'f1', name: 'Campagnes Printemps', count: 24, color: '#4F46E5' },
  { id: 'f2', name: 'Produits', count: 48, color: '#14B8A6' },
  { id: 'f3', name: 'Studio Photos', count: 16, color: '#F43F5E' },
  { id: 'f4', name: 'Coulisses', count: 31, color: '#F59E0B' },
  { id: 'f5', name: 'Branding', count: 12, color: '#8B5CF6' },
];

export const MOCK_MEDIA: MediaFile[] = [
  { id: 'm1', name: 'hero-shot-spring.jpg', url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400', type: 'image', size: 2400000, folder: 'f1', createdAt: '2026-03-10', width: 1080, height: 1350 },
  { id: 'm2', name: 'product-flat-lay.jpg', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', type: 'image', size: 1800000, folder: 'f2', createdAt: '2026-03-09', width: 1080, height: 1080 },
  { id: 'm3', name: 'studio-bts-01.jpg', url: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=400', type: 'image', size: 3100000, folder: 'f3', createdAt: '2026-03-08', width: 1920, height: 1280 },
  { id: 'm4', name: 'lifestyle-coffee.jpg', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', type: 'image', size: 2200000, folder: 'f4', createdAt: '2026-03-07', width: 1080, height: 1350 },
  { id: 'm5', name: 'brand-logo-white.png', url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400', type: 'image', size: 450000, folder: 'f5', createdAt: '2026-03-06', width: 800, height: 800 },
  { id: 'm6', name: 'campaign-video.mp4', url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400', type: 'video', size: 45000000, folder: 'f1', createdAt: '2026-03-05', width: 1920, height: 1080 },
  { id: 'm7', name: 'spring-collection.jpg', url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400', type: 'image', size: 2800000, folder: 'f1', createdAt: '2026-03-04', width: 1080, height: 1350 },
  { id: 'm8', name: 'product-minimal.jpg', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', type: 'image', size: 1600000, folder: 'f2', createdAt: '2026-03-03', width: 1080, height: 1080 },
  { id: 'm9', name: 'team-creative.jpg', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400', type: 'image', size: 2100000, folder: 'f4', createdAt: '2026-03-02', width: 1920, height: 1280 },
  { id: 'm10', name: 'mood-board.jpg', url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', type: 'image', size: 1900000, folder: 'f5', createdAt: '2026-03-01', width: 1080, height: 1080 },
  { id: 'm11', name: 'reel-cover-01.jpg', url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400', type: 'image', size: 1200000, folder: 'f3', createdAt: '2026-02-28', width: 1080, height: 1920 },
  { id: 'm12', name: 'stories-template.jpg', url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400', type: 'image', size: 980000, folder: 'f1', createdAt: '2026-02-27', width: 1080, height: 1920 },
];

// ─── Analytics ───────────────────────────────────────────────
export const MOCK_ANALYTICS_DATA: AnalyticsDataPoint[] = [
  { date: '2026-02-14', likes: 420, comments: 38, reach: 8200, impressions: 10100, followers: 23200 },
  { date: '2026-02-21', likes: 580, comments: 54, reach: 10400, impressions: 13200, followers: 23600 },
  { date: '2026-02-28', likes: 740, comments: 71, reach: 12800, impressions: 16400, followers: 24100 },
  { date: '2026-03-07', likes: 920, comments: 88, reach: 15200, impressions: 19800, followers: 24500 },
  { date: '2026-03-14', likes: 1240, comments: 106, reach: 18400, impressions: 24200, followers: 24800 },
];

export const MOCK_ANALYTICS_SUMMARY: AnalyticsSummary = {
  totalFollowers: 24800,
  followerGrowth: 8.2,
  totalLikes: 3900,
  likesGrowth: 34.8,
  totalComments: 357,
  commentsGrowth: 18.9,
  totalReach: 65000,
  reachGrowth: 24.4,
  avgEngagement: 4.8,
  engagementGrowth: 12.3,
};

// ─── Pricing ─────────────────────────────────────────────────
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

// ─── Testimonials ────────────────────────────────────────────
export const MOCK_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Léa Dupont',
    role: 'Créatrice de contenu lifestyle',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lea&backgroundColor=ffd5dc',
    text: 'Thryve a complètement transformé ma façon de travailler. Je gagne 2h par jour et mes taux d\'engagement ont augmenté de 40% en 3 mois.',
    platform: 'instagram' as const,
    followers: '48K',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Marc Lefebvre',
    role: 'Directeur Agence Pixel+',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marc&backgroundColor=c0aede',
    text: 'Pour notre agence de 15 clients, Thryve est indispensable. L\'interface est magnifique et le support réactif. Je recommande à 100%.',
    platform: 'instagram' as const,
    followers: '12 clients',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Amira Benali',
    role: 'Photographe & Brand Photographer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amira&backgroundColor=b6e3f4',
    text: 'La bibliothèque média est excellente. Je trouve tous mes visuels en quelques secondes. Le calendrier éditorial est intuitif et puissant.',
    platform: 'threads' as const,
    followers: '22K',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Théo Rousseau',
    role: 'Social Media Manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Theo&backgroundColor=d1f0d1',
    text: 'J\'ai testé tous les outils du marché. Thryve est le seul qui combine beauté du design et efficacité réelle. Mon outil de référence.',
    platform: 'instagram' as const,
    followers: '31K',
    rating: 5,
  },
];

// ─── FAQ ─────────────────────────────────────────────────────
export const MOCK_FAQ = [
  {
    q: 'Quelles plateformes sont supportées ?',
    a: 'Thryve supporte actuellement Instagram et Threads. D\'autres plateformes (TikTok, LinkedIn) sont en cours de développement et seront disponibles prochainement.',
  },
  {
    q: 'Puis-je essayer Thryve gratuitement ?',
    a: 'Oui ! Notre plan Starter est gratuit pour toujours. Il vous permet de connecter 1 compte social et de publier jusqu\'à 10 posts par mois sans carte bancaire.',
  },
  {
    q: 'Comment fonctionne la programmation des publications ?',
    a: 'Créez votre post, choisissez une date et une heure, et Thryve s\'occupe de tout. Notre système de planification automatique publie vos contenus au moment optimal.',
  },
  {
    q: 'Mes données sont-elles sécurisées ?',
    a: 'Absolument. Toutes vos données sont chiffrées en transit et au repos. Nous ne partageons jamais vos informations et sommes conformes RGPD.',
  },
  {
    q: 'Puis-je annuler mon abonnement à tout moment ?',
    a: 'Oui, sans engagement ni frais de résiliation. Vous conservez l\'accès jusqu\'à la fin de votre période de facturation.',
  },
  {
    q: 'Thryve fonctionne-t-il sur mobile ?',
    a: 'L\'interface web est 100% responsive et optimisée pour mobile. Une application iOS & Android native est prévue pour le second semestre 2026.',
  },
];

// ─── Notifications ───────────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Publication réussie',
    message: 'Votre post "✨ La créativité ne dort jamais..." a été publié sur Instagram.',
    type: 'success',
    read: false,
    createdAt: '2026-03-14T09:02:00',
  },
  {
    id: 'n2',
    title: 'Milestone atteint !',
    message: 'Félicitations ! Votre compte a atteint 24 000 abonnés sur Instagram 🎉',
    type: 'success',
    read: false,
    createdAt: '2026-03-13T16:20:00',
  },
  {
    id: 'n3',
    title: 'Publication programmée',
    message: '"Nouvelle collection printemps..." est programmé pour le 16 mars à 11h00.',
    type: 'info',
    read: true,
    createdAt: '2026-03-13T10:00:00',
  },
  {
    id: 'n4',
    title: 'Rappel de publication',
    message: 'Vous avez 2 publications programmées cette semaine.',
    type: 'info',
    read: true,
    createdAt: '2026-03-12T09:00:00',
  },
];

// ─── Features ─────────────────────────────────────────────────
export const FEATURES = [
  {
    icon: 'Calendar',
    title: 'Calendrier Editorial',
    description: 'Planifiez votre contenu à l\'avance avec notre calendrier drag-and-drop intuitif. Visualisez votre stratégie en un coup d\'œil.',
    color: '#4F46E5',
  },
  {
    icon: 'Images',
    title: 'Bibliothèque Média',
    description: 'Organisez, importez et retrouvez vos visuels instantanément. Tous vos médias centralisés dans une interface magnifique.',
    color: '#14B8A6',
  },
  {
    icon: 'BarChart3',
    title: 'Analytics Avancés',
    description: 'Suivez vos performances en temps réel. Likes, reach, engagement — toutes les métriques qui comptent vraiment.',
    color: '#F43F5E',
  },
  {
    icon: 'Zap',
    title: 'Publication Automatique',
    description: 'Programmez vos posts et publiez automatiquement aux meilleurs moments. Votre audience vous attend, pas vous.',
    color: '#F59E0B',
  },
  {
    icon: 'Users',
    title: 'Multi-Comptes',
    description: 'Gérez tous vos profils Instagram et Threads depuis une seule interface. Parfait pour les agences et créateurs multi-marques.',
    color: '#8B5CF6',
  },
  {
    icon: 'Sparkles',
    title: 'IA Assistant',
    description: 'Générez des captions percutantes et des hashtags optimisés avec notre assistant IA intégré. Boostez votre créativité.',
    color: '#EC4899',
  },
];
