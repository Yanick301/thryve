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
// ─── Custom Tooltip ───────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{name: string; value: number; color: string}>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-master border border-white/40 rounded-2xl px-6 py-4 shadow-2xl backdrop-blur-2xl">
      <p className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] mb-4">{label}</p>
      <div className="space-y-3">
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
            <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: p.color, color: p.color }} />
            <span className="text-foreground/60">{p.name}:</span>
            <span className="text-foreground ml-auto">{(p.value || 0).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Top Posts Table ──────────────────────────────────────────
function TopPostsTable() {
  const publishedPosts = MOCK_POSTS.filter((p) => p.status === 'published');

  return (
    <div className="glass-master rounded-[3rem] border border-white/40 overflow-hidden shadow-2xl relative">
       <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="px-10 py-8 border-b border-white/20 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-black text-foreground uppercase tracking-[0.6em]">MEILLEURS SIGNAUX</h3>
          <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest mt-1">Classés par taux d'engagement</p>
        </div>
        <BarChart3 className="w-6 h-6 text-primary animate-crystal" />
      </div>
      <div className="divide-y divide-white/10">
        {publishedPosts.map((post, i) => (
          <div key={post.id} className="px-10 py-8 flex items-center gap-8 hover:bg-white/10 transition-all duration-500 group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl glass-master border-white/40 flex items-center justify-center text-xs font-black text-foreground/40 group-hover:text-primary group-hover:scale-110 transition-all">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-foreground uppercase tracking-widest truncate group-hover:text-primary transition-colors italic">"{post.caption.slice(0, 80)}..."</p>
              <p className="text-[9px] text-foreground/40 font-black uppercase tracking-widest mt-2 flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR') : ''}
              </p>
            </div>
            <div className="hidden lg:grid grid-cols-3 gap-10 text-center flex-shrink-0">
              <div>
                <p className="text-sm font-black text-foreground tracking-tighter">{(post.likes || 0).toLocaleString()}</p>
                <p className="text-[8px] text-foreground/40 font-black uppercase tracking-widest mt-1">LKS</p>
              </div>
              <div>
                <p className="text-sm font-black text-foreground tracking-tighter">{(post.comments || 0).toLocaleString()}</p>
                <p className="text-[8px] text-foreground/40 font-black uppercase tracking-widest mt-1">COM</p>
              </div>
              <div>
                <p className="text-sm font-black text-foreground tracking-tighter">{formatNumber(post.reach || 0)}</p>
                <p className="text-[8px] text-foreground/40 font-black uppercase tracking-widest mt-1">RCH</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-accent bg-accent/10 px-4 py-2 rounded-full flex-shrink-0 border border-accent/20 shadow-lg">
              <ArrowUpRight className="w-4 h-4" />
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
    { name: 'Instagram', value: 68, color: 'var(--primary)' },
    { name: 'Threads', value: 32, color: 'var(--secondary)' },
  ];

  return (
    <div className="glass-master rounded-[3rem] p-10 border border-white/40 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/5 -z-10" />
      <h3 className="text-xs font-black text-foreground uppercase tracking-[0.6em] mb-1">UNITÉ DE RÉPARTITION</h3>
      <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest mb-10 italic">Distribution des transmissions par canal</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            paddingAngle={8}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-[10px] font-black text-foreground/60 uppercase tracking-[0.2em]">{value}</span>}
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
    { value: '7d', label: '7 JOURS' },
    { value: '30d', label: '30 JOURS' },
    { value: '90d', label: '90 JOURS' },
  ];

  const stats = [
    { label: 'OPÉRATEURS REJOINTS', value: summary.totalFollowers, growth: summary.followerGrowth, icon: Users, iconColor: 'var(--primary)' },
    { label: 'RÉACTIONS ALPHA', value: summary.totalLikes, growth: summary.likesGrowth, icon: Heart, iconColor: '#F43F5E' },
    { label: 'ECHO TRANSMISSIONS', value: summary.totalComments, growth: summary.commentsGrowth, icon: MessageCircle, iconColor: '#14B8A6' },
    { label: 'RAYONNEMENT SIGNAL', value: summary.totalReach, growth: summary.reachGrowth, icon: Eye, iconColor: '#F59E0B' },
  ];

  const formatXAxis = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });

  return (
    <DashboardLayout>
      <div className="p-10 space-y-12 w-full max-w-full relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[160px] -z-10 rounded-full animate-crystal" />
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-3 text-primary">
              <TrendingUp className="w-6 h-6 animate-float" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-foreground/40">Nexus Analytics Alpha</span>
            </div>
            <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
              Performance <span className="text-primary italic">Signal</span>
            </h1>
            <p className="text-[10px] text-foreground/40 mt-4 font-black uppercase tracking-[0.3em] italic">
              ANALYSE CHIRURGICALE DES VECTEURS DE CROISSANCE
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Range toggle */}
            <div className="flex items-center glass-master p-1.5 rounded-2xl border-white/40 shadow-inner">
              {rangeOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setRange(value)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black transition-all duration-500 tracking-widest ${
                    range === value ? 'bg-primary text-white shadow-lg scale-105' : 'text-foreground/40 hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <Button className="h-14 px-8 rounded-2xl glass-master border-white/40 font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all duration-500">
              <Download className="mr-3 w-5 h-5 text-primary" />
              EXPORT ALPHA
            </Button>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>

        {/* Engagement Rate highlight */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="rounded-[3.5rem] p-12 text-white relative overflow-hidden group shadow-2xl"
           style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' }}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 blur-[100px] -z-10 rounded-full animate-crystal" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
            <div>
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.6em] mb-4">INTENSITÉ D'ENGAGEMENT MOYENNE</p>
              <p className="text-8xl font-black tracking-tighter leading-none mb-6">{summary.avgEngagement}<span className="text-4xl ml-2">%</span></p>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 w-fit">
                <TrendingUp className="w-5 h-5 text-accent animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">+{summary.engagementGrowth}% VS PÉRIODE ALPHA</span>
              </div>
            </div>
            
            <div className="lg:text-right glass-master p-10 rounded-[3rem] border-white/30 backdrop-blur-xl xl:w-96 shadow-2xl">
              <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em] mb-3">BENCHMARK SECTEUR</p>
              <p className="text-4xl font-black tracking-tighter decoration-primary underline underline-offset-8">~2.4%</p>
              <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-6 leading-relaxed">
                LE SIGNAL THRYVE ÉMET À UNE FRÉQUENCE <span className="text-white">2.5× SUPÉRIEURE</span> AUX STANDARDS. ✨
              </p>
            </div>
          </div>
        </motion.div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Followers Growth */}
          <div className="lg:col-span-2 glass-master rounded-[3.5rem] p-10 border border-white/40 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-primary/5 -z-10" />
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xs font-black text-foreground uppercase tracking-[0.6em]">VECTEUR DE CROISSANCE</h3>
                <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest mt-1 italic">Évolution temporelle de l'infrastructure abonnés</p>
              </div>
              <Users className="w-6 h-6 text-primary animate-crystal" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={MOCK_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="10 10" stroke="var(--foreground)" opacity={0.05} vertical={false} />
                <XAxis dataKey="date" tickFormatter={formatXAxis} tick={{ fontSize: 9, fill: 'var(--foreground)', opacity: 0.4, fontWeight: 'black' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: 'var(--foreground)', opacity: 0.4, fontWeight: 'black' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="followers" name="ABONNÉS" stroke="var(--primary)" strokeWidth={4} fill="url(#gFollowers)" dot={{ r: 4, fill: 'var(--primary)', stroke: 'white', strokeWidth: 2 }} activeDot={{ r: 8, stroke: 'var(--primary)', strokeWidth: 4, fill: 'white' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <PlatformDistribution />
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Likes & Comments */}
          <div className="glass-master rounded-[3.5rem] p-10 border border-white/40 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-accent/5 -z-10" />
            <h3 className="text-xs font-black text-foreground uppercase tracking-[0.6em] mb-1">UNITÉS D'ENGAGEMENT</h3>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest mb-10 italic">Analyse des flux réactifs par intervalle</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={MOCK_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="10 10" stroke="var(--foreground)" opacity={0.05} vertical={false} />
                <XAxis dataKey="date" tickFormatter={formatXAxis} tick={{ fontSize: 9, fill: 'var(--foreground)', opacity: 0.4, fontWeight: 'black' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: 'var(--foreground)', opacity: 0.4, fontWeight: 'black' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="likes" name="REACTIONS" fill="#F43F5E" radius={[8, 8, 0, 0]} opacity={0.6} />
                <Bar dataKey="comments" name="ECHOS" fill="#14B8A6" radius={[8, 8, 0, 0]} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Reach & Impressions */}
          <div className="glass-master rounded-[3.5rem] p-10 border border-white/40 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-primary/5 -z-10" />
            <h3 className="text-xs font-black text-foreground uppercase tracking-[0.6em] mb-1">AMPLITUDE DU SIGNAL</h3>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest mb-10 italic">Couverture volumétrique des transmissions</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={MOCK_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gImpressions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="10 10" stroke="var(--foreground)" opacity={0.05} vertical={false} />
                <XAxis dataKey="date" tickFormatter={formatXAxis} tick={{ fontSize: 9, fill: 'var(--foreground)', opacity: 0.4, fontWeight: 'black' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: 'var(--foreground)', opacity: 0.4, fontWeight: 'black' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="reach" name="RÉSONANCE" stroke="#F59E0B" strokeWidth={3} fill="url(#gReach)" dot={false} strokeDasharray="8 8" />
                <Area type="monotone" dataKey="impressions" name="IMPRESSIONS" stroke="#8B5CF6" strokeWidth={3} fill="url(#gImpressions)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Posts */}
        <div className="pt-8">
          <TopPostsTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
