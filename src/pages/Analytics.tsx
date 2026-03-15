// ============================================================
// THRYVE — Analytics Page
// ============================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Heart, MessageCircle, Eye, Users, BarChart3,
  Download, Calendar, ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/Layout';
import { StatCard } from '@/components/Cards';
import { MOCK_ANALYTICS_DATA, MOCK_ANALYTICS_SUMMARY, MOCK_POSTS } from '@/data/index';
import { formatNumber } from '@/lib/index';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

// ─── Custom Tooltip ───────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{name: string; value: number; color: string}>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs font-semibold text-muted-foreground mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-foreground capitalize">{p.name}:</span>
          <span className="font-semibold text-foreground">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

type RangeType = '7d' | '30d' | '90d';

// ─── Top Posts Table ──────────────────────────────────────────
function TopPostsTable() {
  const publishedPosts = MOCK_POSTS.filter((p) => p.status === 'published');

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Meilleures publications</h3>
        <p className="text-sm text-muted-foreground">Par taux d'engagement</p>
      </div>
      <div className="divide-y divide-border">
        {publishedPosts.map((post, i) => (
          <div key={post.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
            <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{post.caption.slice(0, 60)}...</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR') : ''}
              </p>
            </div>
            <div className="hidden sm:grid grid-cols-3 gap-4 text-center flex-shrink-0">
              <div>
                <p className="text-sm font-bold text-foreground">{(post.likes || 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Likes</p>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{(post.comments || 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Comm.</p>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{formatNumber(post.reach || 0)}</p>
                <p className="text-xs text-muted-foreground">Reach</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full flex-shrink-0">
              <ArrowUpRight className="w-3 h-3" />
              {(((post.likes || 0) + (post.comments || 0)) / (post.reach || 1) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Platform Distribution ────────────────────────────────────
function PlatformDistribution() {
  const data = [
    { name: 'Instagram', value: 68, color: '#E1306C' },
    { name: 'Threads', value: 32, color: '#4F46E5' },
  ];

  return (
    <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
      <h3 className="font-semibold text-foreground mb-1">Répartition plateforme</h3>
      <p className="text-sm text-muted-foreground mb-4">Distribution des publications</p>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            dataKey="value"
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Legend
            formatter={(value) => <span className="text-xs font-medium text-muted-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Main Analytics Page ──────────────────────────────────────
export default function Analytics() {
  const [range, setRange] = useState<RangeType>('30d');
  const summary = MOCK_ANALYTICS_SUMMARY;

  const rangeOptions: { value: RangeType; label: string }[] = [
    { value: '7d', label: '7 jours' },
    { value: '30d', label: '30 jours' },
    { value: '90d', label: '90 jours' },
  ];

  const stats = [
    { label: 'Abonnés totaux', value: summary.totalFollowers, growth: summary.followerGrowth, icon: Users, iconColor: '#4F46E5' },
    { label: 'Total likes', value: summary.totalLikes, growth: summary.likesGrowth, icon: Heart, iconColor: '#F43F5E' },
    { label: 'Commentaires', value: summary.totalComments, growth: summary.commentsGrowth, icon: MessageCircle, iconColor: '#14B8A6' },
    { label: 'Reach total', value: summary.totalReach, growth: summary.reachGrowth, icon: Eye, iconColor: '#F59E0B' },
  ];

  const formatXAxis = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 space-y-10 w-full max-w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Analytics 📊
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Suivez vos performances et optimisez votre stratégie
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Range toggle */}
            <div className="flex items-center bg-muted p-1 rounded-xl">
              {rangeOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setRange(value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    range === value ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="rounded-xl gap-2">
              <Download className="w-3.5 h-3.5" />
              Exporter
            </Button>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>

        {/* Engagement Rate highlight */}
        <div
          className="rounded-2xl p-6 text-white"
          style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm font-medium mb-1">Taux d'engagement moyen</p>
              <p className="text-5xl font-extrabold">{summary.avgEngagement}%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">+{summary.engagementGrowth}% vs période précédente</span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-white/60 text-xs mb-2">Benchmark industrie</p>
              <p className="text-2xl font-bold opacity-80">~2.4%</p>
              <p className="text-white/60 text-xs mt-1">Vous êtes 2× au-dessus ✨</p>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Followers Growth */}
          <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-foreground">Croissance abonnés</h3>
                <p className="text-sm text-muted-foreground">Évolution dans le temps</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={MOCK_ANALYTICS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" tickFormatter={formatXAxis} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="followers" name="abonnés" stroke="#4F46E5" strokeWidth={2.5} fill="url(#gFollowers)" dot={false} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Platform distribution */}
          <PlatformDistribution />
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Likes & Comments */}
          <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold text-foreground mb-1">Likes & Commentaires</h3>
            <p className="text-sm text-muted-foreground mb-5">Engagement par semaine</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MOCK_ANALYTICS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" tickFormatter={formatXAxis} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="likes" name="likes" fill="#F43F5E" radius={[4, 4, 0, 0]} opacity={0.85} />
                <Bar dataKey="comments" name="commentaires" fill="#14B8A6" radius={[4, 4, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Reach & Impressions */}
          <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold text-foreground mb-1">Reach & Impressions</h3>
            <p className="text-sm text-muted-foreground mb-5">Visibilité de vos contenus</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={MOCK_ANALYTICS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gImpressions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" tickFormatter={formatXAxis} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="reach" name="reach" stroke="#F59E0B" strokeWidth={2} fill="url(#gReach)" dot={false} />
                <Area type="monotone" dataKey="impressions" name="impressions" stroke="#8B5CF6" strokeWidth={2} fill="url(#gImpressions)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Posts */}
        <TopPostsTable />
      </div>
    </DashboardLayout>
  );
}
