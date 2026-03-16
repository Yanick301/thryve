// ============================================================
// THRYVE — Reusable Cards (Mastery 2.0 Edition)
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { PricingPlan } from '@/lib/index';
import { formatNumber, getGrowthColor, getGrowthPrefix } from '@/lib/index';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/lib/index';

// ─── Feature Card (Alpha Edition) ─────────────────────────────
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  index: number;
}

export function FeatureCard({ icon, title, description, color, index }: FeatureCardProps) {
  const LucideIcon = (Icons as unknown as Record<string, React.ElementType>)[icon] || Icons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative glass-master p-10 rounded-[3rem] border border-white/5 hover:border-iridescent transition-all duration-700 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Icon Wrapper */}
      <div 
        className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8 bg-white/5 group-hover:bg-white/10 transition-colors shadow-2xl"
        style={{ color }}
      >
        <LucideIcon size={40} strokeWidth={1.5} />
      </div>

      <h3 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase">{title}</h3>
      <p className="text-white/40 text-lg leading-relaxed font-medium group-hover:text-white/60 transition-colors">{description}</p>

      {/* Iridescent Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-iris-teal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}

// ─── Stat Card (Nexus Edition) ────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  growth?: number;
  icon: React.ElementType;
  iconColor?: string;
  index?: number;
}

export function StatCard({ label, value, growth, icon: Icon, iconColor = '#8b5cf6', index = 0 }: StatCardProps) {
  const isPositive = growth !== undefined && growth >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      className="glass-master p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-8 relative z-10">
        <p className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">{label}</p>
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 shadow-inner"
          style={{ color: iconColor }}
        >
          <Icon size={24} />
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-5xl font-black text-white mb-4 tracking-tighter">
          {typeof value === 'number' ? formatNumber(value) : value}
        </p>

        {growth !== undefined && (
          <div className="flex items-center gap-2 glass-master px-3 py-1.5 rounded-xl border-white/5 inline-flex">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-iris-teal" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
            <span className={`text-sm font-black ${isPositive ? 'text-iris-teal' : 'text-destructive'}`}>
              {getGrowthPrefix(growth)}{growth}%
            </span>
            <span className="text-[10px] text-white/30 font-bold uppercase">vs mo.</span>
          </div>
        )}
      </div>

      {/* Decorative Glow */}
      <div 
        className="absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-20"
        style={{ backgroundColor: iconColor }}
      />
    </motion.div>
  );
}

// ─── Pricing Card (Mastery Edition) ───────────────────────────
interface PricingCardProps {
  plan: PricingPlan;
  yearly: boolean;
  index: number;
}

export function PricingCard({ plan, yearly, index }: PricingCardProps) {
  const price = yearly ? plan.yearlyPrice : plan.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className={`relative flex flex-col rounded-[3.5rem] p-12 border transition-all duration-700 ${
        plan.highlighted
          ? 'border-iridescent shadow-[0_40px_100px_-20px_rgba(109,40,217,0.3)] z-10'
          : 'border-white/5 glass-master hover:border-white/20'
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] px-8 py-2 rounded-full shadow-2xl">
          {plan.badge}
        </div>
      )}

      <div className="mb-10 text-center">
        <h3 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">{plan.name}</h3>
        <p className="text-white/40 text-sm font-medium tracking-tight h-10">
          {plan.description}
        </p>
      </div>

      <div className="mb-12 text-center relative">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-7xl font-black text-white tracking-tighter">
            {price === 0 ? 'FREE' : `${price}€`}
          </span>
          {price > 0 && <span className="text-sm text-white/30 font-black uppercase tracking-widest">/mois</span>}
        </div>
        {yearly && price > 0 && (
          <p className="text-xs mt-4 text-iris-teal font-black uppercase tracking-widest">
            Fidélité Annuelle active
          </p>
        )}
        {plan.highlighted && (
          <div className="absolute -inset-x-4 top-1/2 -translate-y-1/2 h-16 bg-primary/20 blur-[60px] -z-10" />
        )}
      </div>

      <ul className="space-y-6 mb-16 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full glass-master flex items-center justify-center border-white/10 shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-iris-teal" />
            </div>
            <span className="text-lg font-bold text-white/80 leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      <Link to={ROUTE_PATHS.REGISTER}>
        <Button
          size="lg"
          className={`w-full py-10 rounded-[2rem] font-black uppercase tracking-[0.2em] text-lg transition-all duration-500 hover:scale-105 active:scale-95 ${
            plan.highlighted
              ? 'bg-white text-black shadow-2xl hover:bg-white/90'
              : 'glass-master border-white/10 hover:bg-white/5 text-white'
          }`}
        >
          {plan.id === 'free' ? 'Démarrer' : 'Lancer ascension'}
        </Button>
      </Link>
    </motion.div>
  );
}

// ─── Testimonial Card (High Fidelity) ─────────────────────────
interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  text: string;
  followers: string;
  rating: number;
  index: number;
}

export function TestimonialCard({ name, role, avatar, text, followers, rating, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-master p-12 rounded-[3.5rem] border border-white/5 relative group"
    >
      <div className="flex gap-1 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={`${i < rating ? 'text-iris-teal fill-iris-teal' : 'text-white/10'}`} 
          />
        ))}
      </div>

      <p className="text-xl text-white/70 italic leading-relaxed mb-10 font-medium group-hover:text-white transition-colors">
        "{text}"
      </p>

      <div className="flex items-center gap-5">
        <Avatar className="w-16 h-16 border-2 border-white/10">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-iris-purple/20 text-iris-purple font-black">
            {name.split(' ').map((n) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-black text-white text-xl tracking-tight leading-none mb-1">{name}</h4>
          <p className="text-xs text-white/40 font-black uppercase tracking-widest">
            {role} <span className="text-white/10 mx-2">|</span> {followers}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Post Status Badge ─────────────────────────────────────────
interface StatusBadgeProps {
  status: 'draft' | 'scheduled' | 'published' | 'failed';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const map = {
    draft: { label: 'BROUILLON', color: 'gray' },
    scheduled: { label: 'PLANIFIÉ', color: 'iris-purple' },
    published: { label: 'PROPAGÉ', color: 'iris-teal' },
    failed: { label: 'INTERROMPU', color: 'destructive' },
  };
  const { label, color } = map[status];
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] border border-white/5 glass-master uppercase`}>
      <span className={`w-1.5 h-1.5 rounded-full inline-block mr-2 bg-current`} style={{ color: color === 'destructive' ? 'red' : color }} />
      {label}
    </span>
  );
}

// ─── Platform Badge (Mastery) ─────────────────────────────────
interface PlatformBadgeProps {
  platform: 'instagram' | 'threads' | 'both';
  size?: 'sm' | 'md';
}

export function PlatformBadge({ platform, size = 'sm' }: PlatformBadgeProps) {
  const map = {
    instagram: { label: 'INSTAGRAM', icon: Icons.Instagram, color: '#E1306C' },
    threads: { label: 'THREADS', icon: Icons.AtSign, color: '#FFFFFF' },
    both: { label: 'NEXUS FLOW', icon: Sparkles, color: '#8b5cf6' },
  };
  const { label, icon: Icon, color } = map[platform];
  const sizeClass = size === 'sm' ? 'text-[10px] px-3 py-1' : 'text-xs px-5 py-2';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-black tracking-widest ${sizeClass} border border-white/5 glass-master`}
      style={{ color }}
    >
      <Icon size={size === 'sm' ? 12 : 16} />
      {label}
    </span>
  );
}

// ─── Empty State ──────────────────────────────────────────────
interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-24 h-24 rounded-[2rem] glass-master border-white/5 flex items-center justify-center mb-10 animate-pulse">
        <Icon size={40} className="text-white/20" />
      </div>
      <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">{title}</h3>
      <p className="text-white/40 text-lg max-w-sm leading-relaxed font-medium mb-12">{description}</p>
      {action && (
        <Button onClick={action.onClick} size="sm" className="font-medium">
          {action.label}
        </Button>
      )}
    </div>
  );
}
