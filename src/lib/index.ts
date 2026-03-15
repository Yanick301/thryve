// ============================================================
// THRYVE — Route Constants, Types, and Shared Utilities
// ============================================================

// ─── Route Paths ────────────────────────────────────────────
export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  MEDIA: '/dashboard/media',
  CREATE_POST: '/dashboard/create',
  CALENDAR: '/dashboard/calendar',
  ANALYTICS: '/dashboard/analytics',
  ACCOUNTS: '/dashboard/accounts',
  SETTINGS: '/dashboard/settings',
} as const;

// ─── User Types ──────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'agency';
  createdAt: string;
}

export interface SocialAccount {
  id: string;
  platform: 'instagram' | 'threads';
  username: string;
  profilePicture?: string;
  followers: number;
  isConnected: boolean;
  lastSync?: string;
}

// ─── Post Types ──────────────────────────────────────────────
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';
export type PostPlatform = 'instagram' | 'threads' | 'both';

export interface Post {
  id: string;
  caption: string;
  hashtags: string[];
  mediaUrls: string[];
  platform: PostPlatform;
  status: PostStatus;
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
  accountId?: string;
  likes?: number;
  comments?: number;
  reach?: number;
  impressions?: number;
}

// ─── Media Types ─────────────────────────────────────────────
export type MediaType = 'image' | 'video';

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  path?: string;
  type: MediaType;
  size: number;
  folder?: string;
  createdAt: string;
  width?: number;
  height?: number;
}

export interface MediaFolder {
  id: string;
  name: string;
  count: number;
  color: string;
}

// ─── Analytics Types ─────────────────────────────────────────
export interface AnalyticsDataPoint {
  date: string;
  likes: number;
  comments: number;
  reach: number;
  impressions: number;
  followers: number;
}

export interface AnalyticsSummary {
  totalFollowers: number;
  followerGrowth: number;
  totalLikes: number;
  likesGrowth: number;
  totalComments: number;
  commentsGrowth: number;
  totalReach: number;
  reachGrowth: number;
  avgEngagement: number;
  engagementGrowth: number;
}

// ─── Pricing Plan Types ──────────────────────────────────────
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  isPopular?: boolean;
  accounts: number;
  postsPerMonth: number;
  mediaStorage: number;
}

// ─── Notification Types ──────────────────────────────────────
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

// ─── Utility Functions ───────────────────────────────────────
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getGrowthColor(value: number): string {
  return value >= 0 ? 'text-accent' : 'text-destructive';
}

export function getGrowthPrefix(value: number): string {
  return value >= 0 ? '+' : '';
}
