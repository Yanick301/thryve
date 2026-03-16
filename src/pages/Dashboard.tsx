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
import { AutomationControl } from '@/components/AutomationControl';
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
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    
    const [postsRes, accountsRes] = await Promise.all([
      supabase.from('posts').select('*').order('created_at', { ascending: false }),
      supabase.from('social_accounts').select('*')
    ]);
    
    if (postsRes.data) setPosts(postsRes.data as Post[]);
    if (accountsRes.data) setAccounts(accountsRes.data);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // Calculate real stats from posts
  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.comments || 0), 0);
  const totalReach = posts.reduce((sum, p) => sum + (p.reach || 0), 0);
  const totalFollowers = accounts.reduce((sum, a) => sum + (a.followers || 0), 0);
  
  const avgEngagement = totalReach > 0 
    ? (((totalLikes + totalComments) / totalReach) * 100).toFixed(1) 
    : '0.0';

  const recentPosts = posts.slice(0, 4);
  const scheduledPosts = posts.filter((p) => p.status === 'scheduled').slice(0, 3);

  const stats = [
    { label: 'Abonnés totaux', value: totalFollowers, growth: 0, icon: Users, iconColor: '#4F46E5' },
    { label: 'Likes accumulés', value: totalLikes, growth: 0, icon: Heart, iconColor: '#F43F5E' },
    { label: 'Commentaires', value: totalComments, growth: 0, icon: MessageCircle, iconColor: '#14B8A6' },
    { label: 'Reach total', value: totalReach, growth: 0, icon: Eye, iconColor: '#F59E0B' },
  ];

  const currentDate = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <DashboardLayout>
      <div className="p-10 lg:p-16 space-y-16 w-full max-w-full relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-10 border-b border-white/40">
          <div>
            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter uppercase leading-[0.8]">
              ALPHA<br /><span className="text-reveal">WORKSPACE</span>
            </h1>
            <p className="text-[10px] text-foreground/40 mt-6 font-black uppercase tracking-[0.6em]">
              {currentDate} · STATUT : OPÉRATIONNEL
            </p>
          </div>
          <Link to={ROUTE_PATHS.CREATE_POST}>
            <Button
              size="lg"
              className="font-black uppercase tracking-[0.3em] rounded-[2rem] px-12 py-10 text-xs hidden sm:flex bg-primary text-white hover:scale-110 active:scale-95 transition-all duration-700 shadow-2xl border-none"
            >
              <PlusCircle className="mr-3 w-6 h-6" />
              NOUVEL ALPHA
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
        <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-12">
          {/* Growth Chart */}
          <div className="lg:col-span-2 2xl:col-span-3 glass-master rounded-[3.5rem] p-12 border-white/40 shadow-xl transition-all duration-700 hover:shadow-2xl hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-xs font-black text-foreground uppercase tracking-[0.4em]">CROISSANCE ALPHA</h3>
                <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest mt-2 px-4 py-1.5 glass-master rounded-full inline-block">Mobiles & Desktop unifiés</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-primary tracking-tighter">
                  {totalReach > 0 ? '+12.4%' : '0%'}
                </span>
                <p className="text-[8px] text-foreground/30 font-black uppercase tracking-widest mt-1">ROI ESTIMÉ</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={posts.length > 0 ? posts.slice(-7).reverse() : []} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="10 10" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(v: string) => new Date(v).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
                  tick={{ fontSize: 10, fill: 'var(--foreground)', opacity: 0.4, fontWeight: 900 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 10, fill: 'var(--foreground)', opacity: 0.4, fontWeight: 900 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="followers"
                  name="abonnés"
                  stroke="var(--primary)"
                  strokeWidth={4}
                  fill="url(#colorFollowers)"
                  dot={false}
                  activeDot={{ r: 8, fill: 'white', strokeWidth: 4, stroke: 'var(--primary)' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Engagement Summary */}
          <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-xl transition-all duration-700 hover:shadow-2xl hover:scale-[1.01]">
            <h3 className="text-xs font-black text-foreground mb-1 uppercase tracking-[0.4em]">IMPACT RÉSEAU</h3>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest mb-10">Score agrégé nexus</p>

            {/* Big number */}
            <div className="text-center py-10">
              <div className="text-8xl font-black text-primary mb-4 animate-crystal tracking-tighter leading-none">
                {avgEngagement}%
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-black text-accent uppercase tracking-widest">SIGNAL ALPHA ACTIF</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 mt-8">
              {[
                { label: 'Likes', value: totalLikes, color: 'var(--primary)', pct: totalReach > 0 ? (totalLikes / (totalLikes + totalComments || 1)) * 100 : 0 },
                { label: 'Commentaires', value: totalComments, color: 'var(--secondary)', pct: totalReach > 0 ? (totalComments / (totalLikes + totalComments || 1)) * 100 : 0 },
              ].map(({ label, value, color, pct }) => (
                <div key={label} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-foreground/40">{label}</span>
                    <span className="text-foreground">{value.toLocaleString()}</span>
                  </div>
                  <div className="h-2.5 bg-black/5 rounded-full overflow-hidden p-[2px]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full shadow-[0_0_10px_currentColor]" 
                      style={{ backgroundColor: color, color: color }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link to={ROUTE_PATHS.ANALYTICS} className="mt-12 flex items-center justify-center gap-3 py-5 rounded-[2rem] glass-master border-white/50 text-[10px] font-black uppercase tracking-[0.3em] text-foreground hover:bg-white/40 transition-all duration-500 shadow-sm">
              <BarChart3 className="w-5 h-5 text-primary" />
              EXPLORER ALPHA
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-12">
          {/* Recent Posts */}
          <div className="glass-master rounded-[3.5rem] border-white/40 shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl">
            <div className="flex items-center justify-between px-10 py-8 border-b border-white/40">
              <h3 className="text-xs font-black text-foreground uppercase tracking-[0.4em]">ARCHIVES ALPHA</h3>
              <Link to={ROUTE_PATHS.CALENDAR} className="text-[10px] text-primary font-black uppercase tracking-widest hover:underline">
                VOIR TOUT →
              </Link>
            </div>
            <div className="divide-y divide-white/20">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <div key={post.id} className="px-10 py-8 hover:bg-white/40 transition-all duration-500 group">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-foreground uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">{post.caption || 'Sans légende'}</p>
                        <div className="flex items-center gap-4">
                          <PlatformBadge platform={post.platform} />
                          <StatusBadge status={post.status} />
                        </div>
                      </div>
                      {post.likes !== undefined && (
                        <div className="text-right flex-shrink-0">
                          <p className="text-3xl font-black text-foreground leading-none">{post.likes.toLocaleString()}</p>
                          <p className="text-[8px] text-foreground/30 uppercase tracking-[0.3em] font-black mt-2">REACH ACTIVE</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-10 py-16 text-center text-foreground/30 text-[10px] font-black uppercase tracking-[0.4em] italic">
                  AUCUNE ARCHIVE DÉTECTÉE
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Posts + Accounts & Automation */}
          <div className="space-y-8">
            {/* Automation Control Widget */}
            <AutomationControl />

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
                {accounts.length > 0 ? (
                  accounts.filter((a) => a.isConnected).map((account) => (
                    <div key={account.id} className="px-8 py-4.5 flex items-center gap-4 hover:bg-white/5 transition-colors">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-white text-xs font-black shadow-inner"
                        style={{ background: account.platform === 'instagram' ? 'linear-gradient(135deg, #E1306C, #F56040)' : '#000' }}
                      >
                        {account.platform === 'instagram' ? 'IG' : 'TH'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-foreground">{account.username}</p>
                        <p className="text-xs text-muted-foreground font-medium">{account.followers?.toLocaleString() || 0} abonnés</p>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(20,184,166,0.6)]" title="Connecté" />
                    </div>
                  ))
                ) : (
                  <div className="px-8 py-8 text-center text-muted-foreground text-sm italic">
                    Aucun compte synchronisé.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
