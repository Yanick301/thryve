// ============================================================
// THRYVE — Dashboard Overview Page
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Heart, MessageCircle, TrendingUp, Eye, Zap,
  ArrowRight, PlusCircle, Calendar, BarChart3, Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/Layout';
import { StatCard, StatusBadge, PlatformBadge } from '@/components/Cards';
import { ROUTE_PATHS, formatDateTime } from '@/lib/index';
import { MOCK_ANALYTICS_DATA, MOCK_ANALYTICS_SUMMARY, MOCK_ACCOUNTS } from '@/data/index';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { Post } from '@/lib/index';
import { useEffect, useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
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

// ─── Dashboard Overview ───────────────────────────────────────
export default function Dashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setPosts(data as Post[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const summary = MOCK_ANALYTICS_SUMMARY;
  const recentPosts = posts.slice(0, 4);
  const scheduledPosts = posts.filter((p) => p.status === 'scheduled').slice(0, 3);

  const stats = [
    { label: 'Abonnés totaux', value: summary.totalFollowers, growth: summary.followerGrowth, icon: Users, iconColor: '#4F46E5' },
    { label: 'Likes ce mois', value: summary.totalLikes, growth: summary.likesGrowth, icon: Heart, iconColor: '#F43F5E' },
    { label: 'Commentaires', value: summary.totalComments, growth: summary.commentsGrowth, icon: MessageCircle, iconColor: '#14B8A6' },
    { label: 'Reach total', value: summary.totalReach, growth: summary.reachGrowth, icon: Eye, iconColor: '#F59E0B' },
  ];

  const currentDate = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 space-y-10 w-full max-w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
              Vue d'ensemble 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1 capitalize">
              {currentDate} · Voici l'état de vos comptes
            </p>
          </div>
          <Link to={ROUTE_PATHS.CREATE_POST}>
            <Button
              className="font-semibold rounded-xl hidden sm:flex"
              style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}
            >
              <PlusCircle className="mr-2 w-4 h-4" />
              Nouveau post
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {/* Growth Chart */}
          <div className="lg:col-span-2 2xl:col-span-3 bg-card/40 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm transition-all hover:bg-card/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-foreground">Croissance des abonnés</h3>
                <p className="text-sm text-muted-foreground">Performances sur les 30 derniers jours</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-accent bg-accent/10 px-4 py-1.5 rounded-full">
                  +{summary.followerGrowth}% ↑
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={MOCK_ANALYTICS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(v: string) => new Date(v).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
                  tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="followers"
                  name="abonnés"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  fill="url(#colorFollowers)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#4F46E5' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Engagement Summary */}
          <div className="bg-card/40 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm transition-all hover:bg-card/50">
            <h3 className="text-lg font-bold text-foreground mb-1">Engagement</h3>
            <p className="text-sm text-muted-foreground mb-8">Taux moyen ce mois</p>

            {/* Big number */}
            <div className="text-center py-6">
              <div className="text-6xl font-black text-primary mb-3 bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                {summary.avgEngagement}%
              </div>
              <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-accent">
                <TrendingUp className="w-4.5 h-4.5" />
                <span>+{summary.engagementGrowth}% vs mois dernier</span>
              </div>
            </div>

            <div className="space-y-5 mt-6">
              {[
                { label: 'Likes', value: summary.totalLikes, color: '#F43F5E', pct: 68 },
                { label: 'Commentaires', value: summary.totalComments, color: '#14B8A6', pct: 32 },
              ].map(({ label, value, color, pct }) => (
                <div key={label} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-bold">{label}</span>
                    <span className="font-black text-foreground">{value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full" 
                      style={{ backgroundColor: color }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link to={ROUTE_PATHS.ANALYTICS} className="mt-8 flex items-center justify-center gap-2 py-3 rounded-2xl bg-secondary/50 text-xs font-bold text-foreground hover:bg-secondary transition-colors">
              <BarChart3 className="w-4 h-4" />
              Analyse complète
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <div className="bg-card/40 backdrop-blur-sm rounded-3xl border border-border/50 shadow-sm transition-all hover:bg-card/50 overflow-hidden">
            <div className="flex items-center justify-between px-8 py-5 border-b border-border/50">
              <h3 className="text-lg font-bold text-foreground">Publications récentes</h3>
              <Link to={ROUTE_PATHS.CALENDAR} className="text-xs text-primary font-bold hover:underline">
                Voir tout
              </Link>
            </div>
            <div className="divide-y divide-border/30">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <div key={post.id} className="px-8 py-5 hover:bg-white/5 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate mb-2">{post.caption || 'Sans légende'}</p>
                        <div className="flex items-center gap-3">
                          <PlatformBadge platform={post.platform} />
                          <StatusBadge status={post.status} />
                        </div>
                      </div>
                      {post.likes !== undefined && (
                        <div className="text-right flex-shrink-0">
                          <p className="text-base font-black text-foreground">{post.likes.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">likes</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-8 py-10 text-center text-muted-foreground text-sm italic">
                  Aucun post récent pour le moment.
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Posts + Accounts */}
          <div className="space-y-8">
            {/* Scheduled */}
            <div className="bg-card/40 backdrop-blur-sm rounded-3xl border border-border/50 shadow-sm transition-all hover:bg-card/50 overflow-hidden">
              <div className="flex items-center justify-between px-8 py-5 border-b border-border/50">
                <h3 className="text-lg font-bold text-foreground">À venir</h3>
                <Link to={ROUTE_PATHS.CALENDAR} className="text-xs text-primary font-bold hover:underline">
                  Calendrier
                </Link>
              </div>
              <div className="divide-y divide-border/30">
                {scheduledPosts.length > 0 ? (
                  scheduledPosts.map((post) => (
                    <div key={post.id} className="px-8 py-4.5 flex items-center gap-4 hover:bg-white/5 transition-colors">
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{post.caption || 'Sans légende'}</p>
                        {post.scheduledAt && (
                          <p className="text-xs text-muted-foreground mt-1 font-medium">{formatDateTime(post.scheduledAt)}</p>
                        )}
                      </div>
                      <PlatformBadge platform={post.platform} />
                    </div>
                  ))
                ) : (
                  <div className="px-8 py-8 text-center text-muted-foreground text-sm italic">
                    Aucun post programmé.
                  </div>
                )}
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="bg-card/40 backdrop-blur-sm rounded-3xl border border-border/50 shadow-sm transition-all hover:bg-card/50 overflow-hidden">
              <div className="flex items-center justify-between px-8 py-5 border-b border-border/50">
                <h3 className="text-lg font-bold text-foreground">Comptes connectés</h3>
                <Link to={ROUTE_PATHS.ACCOUNTS} className="text-xs text-primary font-bold hover:underline">
                  Gérer
                </Link>
              </div>
              <div className="divide-y divide-border/30">
                {MOCK_ACCOUNTS.filter((a) => a.isConnected).map((account) => (
                  <div key={account.id} className="px-8 py-4.5 flex items-center gap-4 hover:bg-white/5 transition-colors">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-white text-xs font-black shadow-inner"
                      style={{ background: account.platform === 'instagram' ? 'linear-gradient(135deg, #E1306C, #F56040)' : '#000' }}
                    >
                      {account.platform === 'instagram' ? 'IG' : 'TH'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-foreground">{account.username}</p>
                      <p className="text-xs text-muted-foreground font-medium">{account.followers.toLocaleString()} abonnés</p>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(20,184,166,0.6)]" title="Connecté" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
