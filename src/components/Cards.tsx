// ============================================================
// THRYVE — Reusable Cards (Feature, Pricing, Testimonial, Stat)
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, TrendingUp, TrendingDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { PricingPlan } from '@/lib/index';
import { formatNumber, getGrowthColor, getGrowthPrefix } from '@/lib/index';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/lib/index';

// ─── Feature Card ─────────────────────────────────────────────
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  index: number;
}

export function FeatureCard({ icon, title, description, color, index }: FeatureCardProps) {
  // Dynamically get Lucide icon
  const LucideIcon = (Icons as unknown as Record<string, React.ElementType>)[icon] || Icons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-master rounded-[2.5rem] p-10 border-white/40 hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-white/10 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Icon Container */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 shadow-sm border border-white/50"
        style={{ backgroundColor: `${color}15` }}
      >
        <LucideIcon size={28} style={{ color }} className="animate-crystal" />
      </div>

      <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.3em] leading-relaxed group-hover:text-foreground/60 transition-colors">{description}</p>

      {/* Aesthetic Accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  growth?: number;
  icon: React.ElementType;
  iconColor?: string;
  index?: number;
}

export function StatCard({ label, value, growth, icon: Icon, iconColor = '#4F46E5', index = 0 }: StatCardProps) {
  const isPositive = growth !== undefined && growth >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-master rounded-[2.5rem] p-8 border-white/40 shadow-xl hover:shadow-2xl transition-all duration-700 group cursor-default"
    >
      <div className="flex items-center justify-between mb-8">
        <p className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em]">{label}</p>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center scale-110 group-hover:scale-125 transition-all duration-700 shadow-sm border border-white/50"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon size={24} style={{ color: iconColor }} className="animate-crystal" />
        </div>
      </div>

      <p className="text-5xl font-black text-foreground mb-4 tracking-tighter leading-none">
        {typeof value === 'number' ? formatNumber(value) : value}
      </p>

      {growth !== undefined && (
        <div className="flex items-center gap-2">
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${isPositive ? 'bg-accent/10 text-accent' : 'bg-destructive/10 text-destructive'}`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{getGrowthPrefix(growth)}{growth}%</span>
          </div>
          <span className="text-[10px] text-foreground/30 font-black uppercase tracking-widest">vs mois dernier</span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Pricing Card ─────────────────────────────────────────────
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
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col rounded-[3rem] p-12 border border-white/40 transition-all duration-700 glass-master hover:scale-[1.02] hover:shadow-2xl overflow-hidden group ${
        plan.highlighted ? 'ring-2 ring-primary/40 scale-105 z-10' : ''
      }`}
    >
      {plan.highlighted && (
        <div className="absolute inset-0 bg-primary/5 -z-10" />
      )}

      {plan.badge && (
        <div className="absolute top-8 right-8">
          <span className="bg-primary text-white text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-[0.3em] shadow-xl animate-pulse">
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-10">
        <h3 className="text-2xl font-black text-foreground mb-2 uppercase tracking-tighter">{plan.name}</h3>
        <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.3em]">
          {plan.description}
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-end gap-2">
          <span className="text-6xl font-black text-foreground tracking-tighter leading-none">
            {price === 0 ? '0' : `${price}€`}
          </span>
          {price > 0 && (
            <span className="text-[10px] text-foreground/30 font-black uppercase tracking-widest mb-1.5">
              / MOIS
            </span>
          )}
        </div>
        {yearly && price > 0 && (
          <p className="text-[9px] mt-4 text-accent font-black uppercase tracking-widest bg-accent/10 py-1 px-3 rounded-full inline-block">
            SAVE {Math.round(((plan.price - price) / plan.price) * 100)}% ANNUEL
          </p>
        )}
      </div>

      <ul className="space-y-4 mb-12 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-lg glass-master flex items-center justify-center flex-shrink-0 mt-0.5 border-white/50">
              <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
            </div>
            <span className="text-[10px] font-black text-foreground/60 uppercase tracking-widest leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link to={ROUTE_PATHS.REGISTER}>
        <Button
          size="lg"
          className={`w-full py-8 h-auto font-black uppercase tracking-[0.3em] text-[10px] rounded-[1.5rem] transition-all duration-700 shadow-2xl border-none ${
            plan.highlighted
              ? 'bg-primary text-white hover:scale-105 active:scale-95'
              : 'bg-foreground text-background hover:bg-foreground/80'
          }`}
        >
          {plan.id === 'free' ? 'DÉMARRAGE ALPHA' : 'ACTIVER ESSAI'}
        </Button>
      </Link>
    </motion.div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-master rounded-[2.5rem] p-10 border-white/40 hover:shadow-2xl hover:scale-105 transition-all duration-700 relative overflow-hidden group"
    >
      {/* Background Accent */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10 group-hover:bg-primary/10 transition-colors duration-700" />
      
      {/* Stars */}
      <div className="flex gap-1.5 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-primary fill-primary animate-crystal' : 'text-foreground/10'}`} 
            strokeWidth={3}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm font-black text-foreground uppercase tracking-tight leading-relaxed mb-10 italic">
        "{text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-5 pt-8 border-t border-white/20">
        <Avatar className="w-16 h-16 rounded-2xl ring-2 ring-white/60 ring-offset-4 ring-offset-transparent shadow-xl">
          <AvatarImage src={avatar} className="object-cover" />
          <AvatarFallback className="text-xl font-black bg-primary/10 text-primary">
            {name.split(' ').map((n) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-base font-black text-foreground uppercase tracking-tighter">{name}</p>
          <p className="text-[9px] text-foreground/40 font-black uppercase tracking-[0.3em] mt-1">{role} · {followers} REACH</p>
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
    draft: { label: 'BROUILLON', className: 'bg-black/5 text-foreground/40 border-black/5' },
    scheduled: { label: 'SYNC PROGRAMMÉE', className: 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(79,70,229,0.1)]' },
    published: { label: 'OPÉRATIONNEL', className: 'bg-accent/10 text-accent border-accent/20 shadow-[0_0_10px_rgba(20,184,166,0.1)]' },
    failed: { label: 'ERREUR ALPHA', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  };
  const { label, className } = map[status];
  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border shadow-sm ${className}`}>
      {label}
    </span>
  );
}

// ─── Platform Badge ───────────────────────────────────────────
interface PlatformBadgeProps {
  platform: 'instagram' | 'threads' | 'both';
  size?: 'sm' | 'md' | 'lg';
}

export function PlatformBadge({ platform, size = 'sm' }: PlatformBadgeProps) {
  const map = {
    instagram: { label: 'INSTAGRAM', color: 'var(--primary)' },
    threads: { label: 'THREADS', color: 'var(--secondary)' },
    both: { label: 'HYBRID NEXUS', color: '#8b5cf6' },
  };
  const { label, color } = map[platform];
  const sizeMap = {
    sm: 'text-[8px] px-3 py-1',
    md: 'text-[10px] px-4 py-2',
    lg: 'text-[12px] px-6 py-3 font-black tracking-[0.3em]',
  };
  const sizeClass = sizeMap[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-black uppercase tracking-[0.2em] shadow-sm border ${sizeClass}`}
      style={{ backgroundColor: `${color}10`, color, borderColor: `${color}20` }}
    >
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
    <div className="flex flex-col items-center justify-center py-24 text-center glass-master rounded-[4rem] border-dashed border-white/30 p-16">
      <div className="w-24 h-24 rounded-[2rem] glass-master border-white/50 flex items-center justify-center mb-10 shadow-inner group">
        <Icon className="w-10 h-10 text-foreground/20 group-hover:text-primary transition-colors duration-700 group-hover:animate-float" strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter leading-none">{title}</h3>
      <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.4em] max-w-sm leading-relaxed mb-12">{description}</p>
      {action && (
        <Button 
          onClick={action.onClick} 
          size="lg" 
          className="font-black uppercase tracking-[0.3em] text-[10px] rounded-[1.5rem] px-12 py-8 bg-primary text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-700 border-none"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
