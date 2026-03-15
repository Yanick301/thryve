// ============================================================
// THRYVE — Landing Page (Home)
// ============================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import { LandingHeader, LandingFooter } from '@/components/Layout';
import { FeatureCard, PricingCard, TestimonialCard } from '@/components/Cards';
import { ROUTE_PATHS } from '@/lib/index';
import { MOCK_PRICING, MOCK_TESTIMONIALS, MOCK_FAQ, FEATURES } from '@/data/index';
import { springPresets } from '@/lib/motion';
import { IMAGES } from '@/assets/images';

// ─── Hero Section ─────────────────────────────────────────────
function HeroSection() {
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
                      className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                        i === 0 ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
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

// ─── Social Proof Banner ───────────────────────────────────────
function SocialProofBanner() {
  const logos = ['Netflix', 'Spotify', 'Figma', 'Notion', 'Linear', 'Vercel', 'Stripe'];
  return (
    <section className="py-12 border-y border-border bg-muted/20">
      <div className="max-w-full mx-auto px-6 lg:px-12">
        <p className="text-center text-sm text-muted-foreground font-medium mb-8">
          Ils font confiance à Thryve pour leur social media
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
          {logos.map((logo) => (
            <span key={logo} className="text-lg font-bold text-foreground tracking-tight">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────
function FeaturesSection() {
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
    { value: '12 000+', label: 'Créateurs actifs', icon: Users },
    { value: '2.4M+', label: 'Posts publiés', icon: TrendingUp },
    { value: '99.9%', label: 'Uptime garanti', icon: Shield },
    { value: '4.9/5', label: 'Note moyenne', icon: Sparkles },
  ];

  return (
    <section className="py-16" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}>
      <div className="max-w-full mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8 gap-8">
          {stats.map(({ value, label, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="text-center text-white"
            >
              <Icon className="w-6 h-6 mx-auto mb-3 opacity-80" />
              <p className="text-3xl font-extrabold mb-1">{value}</p>
              <p className="text-sm text-white/70">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────
function TestimonialsSection() {
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

// ─── Pricing Section ──────────────────────────────────────────
function PricingSection() {
  const [yearly, setYearly] = useState(false);

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
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                !yearly ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                yearly ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground'
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
            <PricingCard key={plan.id} plan={plan} yearly={yearly} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

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
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className="font-semibold text-foreground text-sm">{q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${
                    open === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === index && (
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

// ─── CTA Section ──────────────────────────────────────────────
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
