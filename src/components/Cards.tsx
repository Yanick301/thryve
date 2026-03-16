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
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}15` }}
      >
        <LucideIcon size={22} style={{ color }} />
      </div>

      <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

      {/* Gradient accent line on hover */}
      <div
        className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-card rounded-2xl p-5 border border-border"
      style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}12` }}
        >
          <Icon size={17} style={{ color: iconColor }} />
        </div>
      </div>

      <p className="text-2xl font-bold text-foreground mb-1">{typeof value === 'number' ? formatNumber(value) : value}</p>

      {growth !== undefined && (
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-accent" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-destructive" />
          )}
          <span className={`text-xs font-semibold ${getGrowthColor(growth)}`}>
            {getGrowthPrefix(growth)}{growth}%
          </span>
          <span className="text-xs text-muted-foreground">vs mois dernier</span>
        </div>
      )}
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-3xl p-8 border transition-all duration-300 ${plan.highlighted
          ? 'border-primary shadow-xl'
          : 'border-border bg-card hover:border-primary/30 hover:shadow-lg'
        }`}
      style={
        plan.highlighted
          ? {
            background: 'linear-gradient(145deg, #4F46E5 0%, #14B8A6 100%)',
          }
          : { boxShadow: '0 4px 20px -6px rgba(0,0,0,0.08)' }
      }
    >
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-foreground text-background text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
            {plan.badge}
          </span>
        </div>
      )}

      <div className={`mb-6 ${plan.highlighted ? 'text-white' : 'text-foreground'}`}>
        <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
        <p className={`text-sm ${plan.highlighted ? 'text-white/70' : 'text-muted-foreground'}`}>
          {plan.description}
        </p>
      </div>

      <div className={`mb-8 ${plan.highlighted ? 'text-white' : 'text-foreground'}`}>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-extrabold">{price === 0 ? 'Gratuit' : `${price}€`}</span>
          {price > 0 && (
            <span className={`text-sm mb-1 ${plan.highlighted ? 'text-white/60' : 'text-muted-foreground'}`}>
              /mois
            </span>
          )}
        </div>
        {yearly && price > 0 && (
          <p className={`text-xs mt-1 ${plan.highlighted ? 'text-white/70' : 'text-accent font-medium'}`}>
            Facturé annuellement — Économisez {Math.round(((plan.price - price) / plan.price) * 100)}%
          </p>
        )}
        {plan.highlighted && (
          <div className="absolute -inset-x-4 top-1/2 -translate-y-1/2 h-16 bg-primary/20 blur-[60px] -z-10" />
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? 'bg-white/20' : 'bg-primary/10'
              }`}>
              <Check className={`w-3 h-3 ${plan.highlighted ? 'text-white' : 'text-primary'}`} />
            </div>
            <span className={`text-sm ${plan.highlighted ? 'text-white/90' : 'text-foreground'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link to={ROUTE_PATHS.REGISTER}>
        <Button
          className={`w-full font-semibold rounded-xl py-5 transition-all duration-200 ${plan.highlighted
              ? 'bg-white text-primary hover:bg-white/90 shadow-lg'
              : 'bg-primary text-primary-foreground hover:opacity-90'
            }`}
        >
          {plan.id === 'free' ? 'Commencer gratuitement' : 'Démarrer l\'essai gratuit'}
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-6 border border-border"
      style={{ boxShadow: '0 4px 20px -6px rgba(0,0,0,0.08)' }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-foreground leading-relaxed mb-5">"{text}"</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatar} />
          <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
            {name.split(' ').map((n) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{role} · {followers} abonnés</p>
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
    draft: { label: 'Brouillon', className: 'bg-muted text-muted-foreground' },
    scheduled: { label: 'Programmé', className: 'bg-primary/10 text-primary' },
    published: { label: 'Publié', className: 'bg-accent/10 text-accent' },
    failed: { label: 'Échec', className: 'bg-destructive/10 text-destructive' },
  };
  const { label, color } = map[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}

// ─── Platform Badge (Mastery) ─────────────────────────────────
interface PlatformBadgeProps {
  platform: 'instagram' | 'threads' | 'both';
  size?: 'sm' | 'md' | 'lg';
}

export function PlatformBadge({ platform, size = 'sm' }: PlatformBadgeProps) {
  const map = {
    instagram: { label: 'Instagram', color: '#E1306C' },
    threads: { label: 'Threads', color: '#000000' },
    both: { label: 'IG + Threads', color: '#4F46E5' },
  };
  const { label, color } = map[platform];
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${sizeClass}`}
      style={{ backgroundColor: `${color}15`, color }}
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
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-5">{description}</p>
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
