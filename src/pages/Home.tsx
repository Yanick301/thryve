// ============================================================
// THRYVE — Landing Page (Home)
// ============================================================

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Zap,
  ChevronDown,
  CheckCircle2,
  Instagram,
  BarChart3,
  Calendar,
  Images,
  PlusSquare,
  Users,
  Sparkles,
  Shield,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/lib/index';
import { LandingHeader, LandingFooter } from '@/components/Layout';
import { FeatureCard, PricingCard, TestimonialCard } from '@/components/Cards';
import { MOCK_PRICING, MOCK_TESTIMONIALS, MOCK_FAQ, FEATURES } from '@/data/index';
import { springPresets } from '@/lib/motion';
import { IMAGES } from '@/assets/images';

// ─── Hero Section (Mastery 2.0) ────────────────────────────────
function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // High-quality abstract tech loop (Mastery Feel)
  const videoUrl = "https://cdn.pixabay.com/video/2020/09/11/49609-458925232_large.mp4";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,70,229,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(20,184,166,0.08) 0%, transparent 50%), #F9FAFB',
        }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 -right-32 w-96 h-96 rounded-full -z-10 opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.5) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full -z-10 opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.6) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-primary/15"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nouveau — IA Caption Generator disponible</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold text-foreground leading-[1.08] tracking-tight mb-6"
            >
              Thryve —<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Grow your social
              </span>
              <br />
              presence effortlessly
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
            >
              Plan, create and manage your Instagram and Threads content from one powerful platform. Built for creators who want to grow without the hustle.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link to={ROUTE_PATHS.REGISTER}>
                <Button
                  size="lg"
                  className="font-bold text-base px-8 py-6 rounded-2xl shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)',
                    boxShadow: '0 8px 30px rgba(79,70,229,0.3)',
                  }}
                >
                  Get Started — Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold text-base px-8 py-6 rounded-2xl border-2"
              >
                <Play className="mr-2 w-4 h-4 fill-current" />
                View Demo
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              {[
                { label: '12 000+ créateurs actifs', icon: Users },
                { label: 'Instagram & Threads', icon: Instagram },
                { label: 'Sans CB requise', icon: CheckCircle2 },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:block"
          >
            {/* Main Dashboard card */}
            <div
              className="relative rounded-3xl overflow-hidden border border-border bg-card"
              style={{
                boxShadow: '0 24px 80px -16px rgba(79,70,229,0.2), 0 8px 32px -8px rgba(0,0,0,0.12)',
              }}
            >
              {/* Fake topbar */}
              <div className="bg-foreground/5 px-4 py-3 flex items-center gap-2 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                </div>
                <div className="mx-auto text-xs font-mono text-muted-foreground bg-muted rounded-full px-4 py-1">
                  app.thryve.io/dashboard
                </div>
              </div>

              {/* Dashboard content preview */}
              <div className="flex h-[420px]">
                {/* Sidebar mini */}
                <div className="w-14 bg-sidebar border-r border-border flex flex-col items-center py-4 gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-white" fill="currentColor" />
                  </div>
                  {[BarChart3, Calendar, Images, PlusSquare, Users].map((Icon, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${i === 0 ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                        }`}
                    >
                      <Icon size={15} />
                    </div>
                  ))}
                </div>

                {/* Main area */}
                <div className="flex-1 p-5 overflow-hidden">
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-foreground mb-1">Vue d'ensemble</h3>
                    <p className="text-xs text-muted-foreground">Aujourd'hui, 15 mars 2026</p>
                  </div>

                  {/* Stats mini grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: 'Abonnés', value: '24.8K', color: '#4F46E5', trend: '+8.2%' },
                      { label: 'Engagement', value: '4.8%', color: '#14B8A6', trend: '+12.3%' },
                      { label: 'Reach', value: '65K', color: '#F43F5E', trend: '+24.4%' },
                      { label: 'Posts', value: '7', color: '#F59E0B', trend: '+2' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-muted/50 rounded-xl p-3 border border-border"
                      >
                        <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-base font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs font-semibold" style={{ color: stat.color }}>{stat.trend}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mini chart preview */}
                  <div className="bg-muted/30 rounded-xl p-3 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-foreground">Croissance des abonnés</p>
                      <span className="text-xs text-accent font-semibold">+8.2% ↑</span>
                    </div>
                    {/* Fake sparkline */}
                    <div className="flex items-end gap-1 h-12">
                      {[30, 45, 35, 55, 48, 70, 60, 80, 75, 95, 88, 100].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm opacity-80 transition-all duration-500"
                          style={{
                            height: `${h}%`,
                            background: `linear-gradient(180deg, #4F46E5, #14B8A6)`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-border"
            >
              <p className="text-xs font-semibold text-foreground">✅ Post publié sur Instagram</p>
              <p className="text-xs text-muted-foreground">Il y a 2 min · 14.2K reach</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-border"
            >
              <p className="text-xs font-semibold text-foreground">🚀 +247 abonnés ce mois</p>
              <p className="text-xs text-accent font-medium">+8.2% de croissance</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
      >
        <span className="text-xs">Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Social Proof Banner ──────────────────────────────────────
function SocialProofBanner() {
  const logos = ['FORBES', 'TECHCRUNCH', 'WIRED', 'VERGE', 'ACCEL', 'SEQUOIA'];
  return (
    <section className="py-12 border-y border-border bg-muted/20">
      <div className="max-w-full mx-auto px-6 lg:px-12">
        <p className="text-center text-sm text-muted-foreground font-medium mb-8 uppercase tracking-widest">
          Ils font confiance à Thryve pour leur social media
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-30 invert dark:invert-0 grayscale">
          {logos.map((logo) => (
            <span key={logo} className="text-xl font-black text-foreground tracking-tighter">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Section (Advanced Layout) ───────────────────────
function FeaturesSection() {
  const features = [
    { title: 'AUTO-PILOT', desc: 'Domination totale des flux sans intervention humaine.', icon: Zap, color: '#8b5cf6' },
    { title: 'IA CAPTIONS', desc: 'Sémantique prédictive pour une conversion maximale.', icon: Sparkles, color: '#14b8a6' },
    { title: 'SMART CALENDAR', desc: 'Planification chirurgicale de votre influence mondiale.', icon: Calendar, color: '#3b82f6' },
    { title: 'DEEP ANALYTICS', desc: 'Insights profonds transformés en leviers de croissance.', icon: BarChart3, color: '#f59e0b' },
    { title: 'MEDIA NEXUS', desc: 'Bibliothèque quantique pour vos actifs haute fidélité.', icon: Images, color: '#ec4899' },
    { title: 'THREADS FLOW', desc: 'Pionnier mondial de l\'automatisation Threads native.', icon: Globe, color: '#06b6d4' },
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/8 text-primary text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/15 mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            Tout ce dont vous avez besoin,<br />
            <span style={{ color: '#4F46E5' }}>réuni en un seul endroit</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            De la création à l'analyse, Thryve couvre tout le cycle de vie de votre contenu social media.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to={ROUTE_PATHS.REGISTER}>
            <Button
              size="lg"
              className="font-bold rounded-2xl px-8 py-6"
              style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}
            >
              Essayer gratuitement
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Benefits Sections ────────────────────────────────────────
function BenefitsSection() {
  const creatorBenefits = [
    'Programmez 1 semaine de contenu en 30 minutes',
    'Analysez vos meilleurs posts et reproduisez leur succès',
    'Gérez Instagram et Threads depuis une seule interface',
    'Optimisez vos hashtags avec l\'IA intégrée',
    'Recevez des alertes en temps réel sur vos performances',
  ];

  const agencyBenefits = [
    'Gérez jusqu\'à 20 comptes clients depuis un tableau de bord',
    'Collaborez en équipe avec des rôles et permissions',
    'Générez des rapports clients professionnels en PDF',
    'Workflow de validation et approbation des contenus',
    'API ouverte pour intégrer vos outils existants',
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Creators */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold border border-primary/15 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Pour les Créateurs
            </div>
            <h2 className="text-3xl font-extrabold text-foreground mb-4 tracking-tight">
              Consacrez votre temps à créer,<br />
              pas à gérer
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Thryve automatise tout ce qui est répétitif pour que vous puissiez vous concentrer sur ce qui compte vraiment : votre créativité et votre communauté.
            </p>
            <ul className="space-y-3">
              {creatorBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Agencies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold border border-accent/20 mb-6">
              <Globe className="w-3.5 h-3.5" />
              Pour les Agences
            </div>
            <h2 className="text-3xl font-extrabold text-foreground mb-4 tracking-tight">
              Scalez votre agence sans<br />
              scaler vos équipes
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Multi-comptes, collaboration en équipe, rapports automatiques — Thryve Agency est conçu pour les agences qui veulent délivrer plus avec moins.
            </p>
            <ul className="space-y-3">
              {agencyBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────
function StatsSection() {
  const stats = [
    { value: '12K+', label: 'Elite Creators', icon: Users, color: '#8b5cf6' },
    { value: '2.4M+', label: 'Strategic Posts', icon: TrendingUp, color: '#14b8a6' },
    { value: '99.9%', label: 'Mastery Uptime', icon: Shield, color: '#3b82f6' },
    { value: '4.9/5', label: 'Victory Rank', icon: Sparkles, color: '#ec4899' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="max-w-full mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map(({ value, label, icon: Icon, color }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-3xl glass-master mx-auto mb-6 flex items-center justify-center border-white/40 shadow-xl group hover:scale-110 transition-transform duration-500">
                <Icon className="w-8 h-8" style={{ color }} />
              </div>
              <p className="text-5xl font-black text-foreground mb-2 tracking-tighter">{value}</p>
              <p className="text-xs text-foreground/40 font-black uppercase tracking-[0.4em]">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials (Elite Voices) ──────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    { name: 'Sarah K.', role: 'Elite Creator', text: "Thryve a multiplié mon reach par 8. C'est l'épitomé de l'outil social.", avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Marc D.', role: 'CEO Global Agency', text: "Une infrastructure de guerre. On gère 40+ comptes en flux tendu.", avatar: 'https://i.pravatar.cc/150?u=marc' },
    { name: 'Julie L.', role: 'Brand Strategist', text: "L'automatisation Threads est une révolution pure. On a 1 an d'avance.", avatar: 'https://i.pravatar.cc/150?u=julie' },
    { name: 'Thomas R.', role: 'Content Lead', text: "Design divin, efficacité chirurgicale. Ma routine matinale a changé.", avatar: 'https://i.pravatar.cc/150?u=thomas' }
  ];

  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-yellow-50 text-yellow-600 text-sm font-semibold px-4 py-1.5 rounded-full border border-yellow-200 mb-4">
            ⭐ Témoignages
          </span>
          <h2 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            Ils ont transformé leur social media
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Rejoignez des milliers de créateurs et agences qui font confiance à Thryve.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {MOCK_TESTIMONIALS.map((t, index) => (
            <TestimonialCard key={t.id} {...t} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, content, avatar, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-master p-16 rounded-[4.5rem] border-white/40 hover:border-primary/50 transition-all duration-1000 shadow-2xl group flex flex-col justify-between"
    >
      <p className="text-2xl text-foreground font-black italic leading-tight tracking-tight mb-16 group-hover:text-primary transition-colors duration-700">&ldquo;{content}&rdquo;</p>

      <div className="flex items-center gap-6 pt-12 border-t border-white/10">
        <img src={avatar} alt={name} className="w-20 h-20 rounded-[1.5rem] border-2 border-white/30 shadow-2xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
        <div>
          <h4 className="text-xl font-black text-foreground tracking-tighter uppercase leading-none">{name}</h4>
          <p className="text-[9px] text-foreground/40 font-black uppercase tracking-[0.4em] mt-3 italic">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Pricing (Choosing Destiny) ──────────────────────────────
function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const plans = [
    { id: 'origin', name: 'ORIGIN', price: 0, features: ['1 Compte Social', '15 Posts / mois', 'Basic Stats', 'Community Support'] },
    { id: 'dominion', name: 'DOMINION', price: 29, features: ['5 Comptes Sociaux', 'Post Illimités', 'IA Full Access', '24/7 Priority', 'Threads Pro'], popular: true },
    { id: 'universe', name: 'UNIVERSE', price: 99, features: ['20 Comptes Sociaux', 'Multi-User Nexus', 'White-Label Reports', 'API Mastery', 'Dedicated Lead'] }
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/20">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/8 text-primary text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/15 mb-4">
            Tarifs
          </span>
          <h2 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            Des tarifs clairs, sans surprise
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Commencez gratuitement, upgradez quand vous êtes prêt.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-muted p-1.5 rounded-2xl">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${!isYearly ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground'
                }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${isYearly ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground'
                }`}
            >
              Annuel
              <span className="bg-accent/10 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </motion.div>
 
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {MOCK_PRICING.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} yearly={isYearly} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, yearly, index }: any) {
  const isFeatured = index === 1;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-master p-20 rounded-[5rem] relative flex flex-col h-full border-white/40 transition-all duration-1000 hover:scale-[1.05] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] group overflow-hidden ${isFeatured ? 'border-primary/50 shadow-2xl scale-105 z-10' : ''
        }`}
    >
      <div className={`absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${isFeatured ? 'opacity-50' : ''}`} />

      {isFeatured && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-black uppercase tracking-[0.8em] px-12 py-4 rounded-full shadow-2xl animate-pulse">
          SÉLECTION ALPHA
        </div>
      )}
      <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase leading-none relative z-10">{plan.name}</h3>
      <div className="flex items-baseline gap-3 mb-12 relative z-10">
        <span className="text-7xl font-black tracking-tighter text-foreground decoration-primary underline underline-offset-[12px]">
          {yearly ? plan.priceYearly : plan.priceMonthly}€
        </span>
        <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest italic">/ MOIS TRANSMISSION</span>
      </div>
      <ul className="space-y-8 mb-20 flex-1 relative z-10">
        {plan.features.map((f: string) => (
          <li key={f} className="flex items-center gap-5 text-lg font-black text-foreground/50 tracking-tight uppercase group/item">
            <CheckCircle2 className="w-6 h-6 text-primary group-hover/item:scale-125 transition-transform duration-500" />
            <span className="group-hover/item:text-foreground transition-colors">{f}</span>
          </li>
        ))}
      </ul>
      <Link to={ROUTE_PATHS.REGISTER} className="w-full relative z-10">
        <Button
          className={`w-full h-24 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-700 border-none ${isFeatured
              ? 'bg-primary text-white shadow-[0_30px_60px_-15px_rgba(79,70,229,0.5)]'
              : 'glass-master border-white/50 text-foreground hover:bg-white/20'
            }`}
        >
          DÉPLOIEMENT THRYVE
        </Button>
      </Link>
    </motion.div>
  );
}

// ─── FAQ (Clarté Absolue) ────────────────────────────────────
function FAQSection() {
  const [active, setActive] = useState(null);
  const items = [
    { q: "SÉCURITÉ TOTALE ?", a: "Nos protocoles imitent l'empreinte humaine pour une invisibilité algorithmique parfaite." },
    { q: "MASTERY THREADS ?", a: "Nous sommes les pionniers mondiaux de l'automatisation native sur Threads." },
    { q: "SANS ENGAGEMENT ?", a: "Liberté totale. Annulez votre ascension à tout moment sans friction." },
    { q: "GAIN DE TEMPS ?", a: "Nos utilisateurs récupèrent en moyenne 15h de liberté créative par semaine." }
  ];

  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/8 text-primary text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/15 mb-4">
            FAQ
          </span>
          <h2 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground">
            Vous avez une question ? Consultez notre FAQ ou contactez notre support.
          </p>
        </motion.div>

        <div className="space-y-3">
          {MOCK_FAQ.map(({ q, a }, index) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/30 transition-colors"
                onClick={() => setActive(active === index ? null : index)}
              >
                <span className="font-semibold text-foreground text-sm">{q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${active === index ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {active === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 pb-5"
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-full mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center text-white"
          style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #6D28D9 50%, #14B8A6 100%)',
          }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-7 h-7 text-white" fill="currentColor" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Prêt à faire évoluer<br />votre présence ?
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-lg mx-auto">
              Rejoignez les créateurs qui utilisent Thryve pour grandir plus vite et travailler plus intelligemment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={ROUTE_PATHS.REGISTER}>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-bold rounded-2xl px-10 py-6 text-base shadow-xl"
                >
                  Commencer gratuitement
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 font-semibold rounded-2xl px-10 py-6 text-base"
              >
                Parler à l'équipe
              </Button>
            </div>
            <p className="text-white/50 text-sm mt-6">Aucune carte bancaire requise · Annulation à tout moment</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Constants & Mock Data ─────────────────────────────────────

const FEATURES = [
  {
    title: 'AUTO-PILOT',
    description: 'Automatisation totale des posts, stories et reels sans intervention humaine.',
    icon: Zap,
  },
  {
    title: 'IA CAPTIONS',
    description: 'Intelligence artificielle de pointe pour des légendes qui convertissent instantanément.',
    icon: Sparkles,
  },
  {
    title: 'SMART CALENDAR',
    description: 'Planifiez vos campagnes stratégiques avec une précision millimétrée.',
    icon: Calendar,
  },
  {
    title: 'DEEP ANALYTICS',
    description: 'Données brutes transformées en insights actionnables pour une croissance exponentielle.',
    icon: BarChart3,
  },
  {
    title: 'MEDIA LIBRARY',
    description: 'Bibliothèque cloud ultra-organisée pour tous vos actifs visuels haute fidélité.',
    icon: Images,
  },
  {
    title: 'THREADS FLOW',
    description: 'Première plateforme au monde à supporter l\'automatisation threads native.',
    icon: Globe,
  },
];

const MOCK_TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah K.',
    role: 'Top 1% Creator',
    content: 'Thryve a multiplié mon reach par 8 en seulement 3 mois. C\'est l\'outil que j\'attendais depuis des années.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 2,
    name: 'Marc D.',
    role: 'CEO Luxury Agency',
    content: 'Une infrastructure solide qui nous permet de gérer 40+ clients sans recruter de nouveaux account managers.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 3,
    name: 'Julie L.',
    role: 'Influence Strategist',
    content: 'La fluidité avec Threads est bluffante. On a pris une avance considérable sur la concurrence.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 4,
    name: 'Thomas R.',
    role: 'Brand Manager',
    content: 'L\'interface est une œuvre d\'art. Travailler dessus chaque matin est un plaisir pur.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
  },
];

const MOCK_PRICING = [
  {
    id: 'starter',
    name: 'ORIGIN',
    priceMonthly: 0,
    priceYearly: 0,
    features: ['1 Compte Social', '15 Posts / mois', 'Analytics de base', 'Support communautaire'],
  },
  {
    id: 'pro',
    name: 'DOMINION',
    priceMonthly: 29,
    priceYearly: 24,
    features: ['5 Comptes Sociaux', 'Illimité', 'IA Capacité Full', 'Support Prioritaire 24/7', 'Threads Automation'],
  },
  {
    id: 'agency',
    name: 'UNIVERSE',
    priceMonthly: 99,
    priceYearly: 79,
    features: ['20 Comptes Sociaux', 'Équipe illimitée', 'Rapports Marque Blanche', 'API Access', 'Account Manager dédié'],
  },
];

const MOCK_FAQ = [
  {
    q: 'EST-CE SÉCURISÉ POUR MON COMPTE ?',
    a: 'Absolument. Nos algorithmes imitent le comportement humain avec des délais aléatoires et des mouvements naturels pour garantir la sécurité totale de vos comptes.',
  },
  {
    q: 'EST-CE QUE ÇA FONCTIONNE SUR THREADS ?',
    a: 'Oui, nous sommes les pionniers de l\'automatisation Threads. Vous pouvez programmer des threads et des réponses automatiquement.',
  },
  {
    q: 'BESOIN D\'UNE CARTE POUR ESSAYER ?',
    a: 'Non. Le plan "ORIGIN" est gratuit à vie et ne nécessite aucune information bancaire.',
  },
  {
    q: 'COMBIEN DE TEMPS JE GAGNE ?',
    a: 'En moyenne, nos utilisateurs rapportent un gain de 15h par semaine sur leur gestion social media.',
  },
];

// ─── Main Landing Page ────────────────────────────────────────
export default function Home() {
  return (
    <>
      <LandingHeader />
      <main>
        <HeroSection />
        <SocialProofBanner />
        <FeaturesSection />
        <StatsSection />
        <BenefitsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <LandingFooter />
    </>
  );
}
