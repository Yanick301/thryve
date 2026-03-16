import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Instagram, 
  TrendingUp, 
  Users, 
  Zap, 
  BarChart3, 
  Calendar, 
  Images, 
  PlusSquare, 
  CheckCircle2, 
  ChevronDown,
  Play,
  Globe,
  Shield,
  MessageSquare,
  Clock,
  Layout as LayoutIcon,
  MousePointer2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/lib/index';
import { LandingHeader, LandingFooter } from '@/components/Layout';
import { springPresets } from '@/lib/motion';

import { BackgroundVideo } from '@/components/BackgroundVideo';

// ─── Hero Section ─────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 bg-mesh selection:bg-primary/20">
      {/* Immersive Video Layer */}
      <BackgroundVideo 
        src="https://cdn.pixabay.com/vimeo/459039322/crystal-49938.mp4?width=1280&hash=d3e0f9b6c0e0b3b4f6b4f6b4f6b4f6b4f6b4f6b4"
        overlayOpacity={0.25}
      />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 w-full relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Elite Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-master px-10 py-4 rounded-full text-[10px] font-black mb-16 tracking-[0.6em] uppercase text-primary border-primary/20 shadow-[0_0_30px_rgba(79,70,229,0.2)]"
          >
            <div className="flex items-center gap-4">
              <Sparkles className="w-5 h-5 animate-crystal" />
              <span>Crystal Protocol v2.0</span>
            </div>
          </motion.div>

          {/* Master Headline */}
          <div className="relative mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.8] tracking-tighter text-foreground relative z-10"
            >
              THRYVE<span className="text-secondary">.</span><br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-crystal">EVOLUTION</span>
            </motion.h1>
            
            {/* Ghost Layer for Depth */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 1.1 }}
              animate={{ opacity: 0.1, y: 20, scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.8] tracking-tighter text-primary blur-2xl select-none pointer-events-none"
            >
              THRYVE<br />EVOLUTION
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-2xl md:text-3xl text-foreground/50 leading-relaxed mb-20 max-w-4xl font-black uppercase tracking-tight italic"
          >
            "L'excellence n'est pas une option, c'est un protocole de transmission." <br />
            <span className="text-foreground/80 not-italic">Dominez Instagram & Threads avec une clarté technologique absolue.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap gap-10 mb-32 justify-center"
          >
            <Link to={ROUTE_PATHS.REGISTER}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
                <Button
                  className="h-24 px-20 rounded-[2.5rem] bg-foreground text-background font-black text-2xl uppercase tracking-[0.2em] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] transition-all duration-700 relative z-10 overflow-hidden glass-shine"
                >
                  ACCÉDER À L'EXPÉRIENCE
                  <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-3 transition-transform duration-700" />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="h-24 px-20 rounded-[2.5rem] glass-master border-white/50 font-black text-2xl uppercase tracking-[0.2em] text-foreground hover:bg-white/20 transition-all duration-700"
              >
                MANIFESTE
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual Preview */}
          <motion.div
            initial={{ opacity: 0, y: 150, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[1400px] perspective-[3000px]"
          >
            <div className="glass-master rounded-[5rem] overflow-hidden shadow-[0_120px_200px_-50px_rgba(0,0,0,0.2)] relative group p-6 border-white/30 backdrop-blur-3xl">
              <div className="rounded-[4rem] overflow-hidden relative border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1600" 
                  alt="Crystal Workspace" 
                  className="w-full h-auto object-cover opacity-95 transition-transform duration-3000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                
                {/* Floating Elements on Preview */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 glass-master rounded-[2rem] border-white/50 flex items-center justify-center animate-float shadow-2xl">
                   <Play className="w-16 h-16 text-primary fill-primary/20 ml-2" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof Banner ───────────────────────────────────────
function SocialProofBanner() {
  const logos = ['Netflix', 'Spotify', 'Figma', 'Notion', 'Linear', 'Vercel', 'Stripe'];
  return (
    <section className="py-32 border-y border-foreground/5 bg-white/[0.02] backdrop-blur-3xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
      <div className="max-w-full mx-auto px-6 lg:px-12 text-center relative z-10">
        <p className="text-[10px] text-foreground/30 font-black tracking-[0.8em] uppercase mb-20 leading-none">
          L'ÉLITE TECHNOLOGIQUE NOUS FAIT CONFIANCE
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {logos.map((logo) => (
            <span key={logo} className="text-2xl md:text-4xl font-black text-foreground/20 hover:text-primary transition-all duration-1000 cursor-default tracking-tighter uppercase grayscale hover:grayscale-0 hover:scale-125">
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
    <section id="features" className="py-64 relative overflow-hidden">
       {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full" />
      
      <div className="max-w-[1700px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-40"
        >
          <span className="glass-master px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.6em] text-primary border-primary/20 mb-12 inline-block">
            Technologie Propriétaire THRYVE
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-foreground mb-10 tracking-tighter leading-none">
            L'excellence est un<br /><span className="text-reveal italic">standard</span>.
          </h2>
          <p className="text-2xl text-foreground/40 max-w-4xl mx-auto font-black uppercase tracking-widest italic mt-8 leading-relaxed">
            Des outils de pointe conçus pour ceux qui exigent la perfection absolue dans chaque transmission.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, icon: Icon, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-master p-16 rounded-[4.5rem] border-white/40 group hover:border-primary/60 transition-all duration-1000 shadow-2xl relative overflow-hidden glass-shine select-none"
    >
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="w-24 h-24 rounded-[2rem] glass-master border-white/50 flex items-center justify-center mb-12 group-hover:scale-110 transition-all duration-700 shadow-inner group-hover:bg-primary/20 relative z-10">
        <Icon className="w-12 h-12 text-primary animate-crystal" />
      </div>
      <h3 className="text-3xl font-black text-foreground mb-8 tracking-tighter uppercase leading-none relative z-10 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-foreground/40 leading-relaxed font-black uppercase tracking-widest text-xs relative z-10 group-hover:text-foreground/60 transition-colors">{description}</p>
    </motion.div>
  );
}

// ─── Benefits Sections ────────────────────────────────────────
function BenefitsSection() {
  const creatorBenefits = [
    'Domination temporelle : Flux optimisés',
    'Intelligence prédictive de signal',
    'Omniprésence : Flux unifié',
    'IA Sémantique de haut niveau',
  ];

  const agencyBenefits = [
    'Scalabilité multi-vecteurs',
    'Protocoles de sécurité Alpha',
    'Rapports analytiques laser',
    'Validation asynchrone pure',
  ];

  return (
    <section className="py-64 relative">
      <div className="absolute inset-0 bg-primary/5 blur-[200px] -z-10" />
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-40 items-center">
          {/* Creators */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-master px-10 py-3 rounded-full text-[10px] font-black text-primary border-primary/20 mb-12 inline-block uppercase tracking-[0.6em] shadow-lg">
              PROTOCOLE CRÉATEUR
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-foreground mb-12 tracking-tighter uppercase leading-[0.8]">
              Impact total.<br />Friction <span className="text-primary italic">nulle</span>.
            </h2>
            <p className="text-foreground/40 text-2xl leading-relaxed mb-16 font-black uppercase tracking-widest italic">
              Thryve transcende la gestion habituelle pour devenir l'extension pure de votre vision créative.
            </p>
            <ul className="space-y-10">
              {creatorBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-8 group">
                  <div className="w-12 h-12 rounded-2xl glass-master border-white/50 flex items-center justify-center group-hover:scale-125 transition-all duration-700 shadow-xl">
                    <CheckCircle2 className="w-6 h-6 text-primary animate-crystal" />
                  </div>
                  <span className="text-foreground/80 font-black text-xl tracking-[0.1em] uppercase">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Agencies */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-master p-20 rounded-[5rem] border-white/40 relative overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.3)] backdrop-blur-3xl"
          >
            <div className="absolute inset-0 bg-secondary/5 -z-10" />
            <div className="glass-master px-10 py-3 rounded-full text-[10px] font-black text-secondary border-secondary/20 mb-12 inline-block uppercase tracking-[0.6em] shadow-lg">
              PROTOCOLE AGENCE
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-foreground mb-12 tracking-tighter uppercase leading-[0.8]">
              Volume.<br /> <span className="text-secondary italic">Précision</span>.
            </h2>
            <p className="text-foreground/40 text-xl leading-relaxed mb-16 font-black uppercase tracking-widest italic">
              Une infrastructure robuste bâtie pour les agences qui redéfinissent les limites du possible.
            </p>
            <ul className="grid grid-cols-1 gap-8">
              {agencyBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-8 glass-master p-8 rounded-[2.5rem] border-white/30 shadow-xl group hover:scale-105 transition-all duration-700 hover:border-secondary/40">
                  <Globe className="w-10 h-10 text-secondary animate-pulse" />
                  <span className="text-foreground font-black text-xl tracking-[0.1em] uppercase">{benefit}</span>
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
    { value: '12K+', label: 'UNITÉS ALPHA', icon: Users },
    { value: '2.4M+', label: 'TRANSMISSIONS', icon: TrendingUp },
    { value: '99.9%', label: 'STABILITÉ SIGNAL', icon: Shield },
    { value: '4.9/5', label: 'ACCORDS THRYVE', icon: Sparkles },
  ];

  return (
    <section className="py-64 relative overflow-hidden bg-white/[0.01]">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-20" />
      <div className="max-w-full mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-32">
          {stats.map(({ value, label, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
            >
              <div className="w-32 h-32 mx-auto mb-16 rounded-[2.5rem] glass-master border-white/40 flex items-center justify-center group-hover:scale-125 transition-all duration-1000 shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <Icon className="w-12 h-12 text-primary animate-crystal relative z-10" />
              </div>
              <p className="text-5xl md:text-7xl lg:text-9xl font-black mb-6 text-foreground tracking-tighter leading-none">{value}</p>
              <p className="text-[10px] text-foreground/30 uppercase font-black tracking-[0.8em]">{label}</p>
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
    <section id="testimonials" className="py-64 bg-background relative overflow-hidden">
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />
      <div className="max-w-[1700px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-40"
        >
          <span className="glass-master px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.6em] text-primary border-primary/20 mb-12 inline-block">
            VÉHICULES DE RÉUSSITE
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-foreground mb-10 tracking-tighter leading-none">
            La voix des <span className="text-primary italic">élites</span>.
          </h2>
          <p className="text-xl text-foreground/40 font-black uppercase tracking-[0.4em] italic">Témoignages de domination pure</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
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

// ─── Pricing Section ──────────────────────────────────────────
function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-64 relative overflow-hidden bg-white/[0.01]">
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-foreground relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-40"
        >
          <span className="glass-master px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.6em] text-primary border-primary/20 mb-12 inline-block">
            INVESTISSEMENT STRATÉGIQUE
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black mb-10 tracking-tighter leading-none uppercase">
            Choisissez votre <span className="text-primary italic">statut</span>.
          </h2>

          <div className="inline-flex items-center gap-6 glass-master p-3 rounded-[2rem] border-white/40 shadow-inner mt-8">
            <button
              onClick={() => setYearly(false)}
              className={`px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 ${
                !yearly ? 'bg-foreground text-background shadow-2xl scale-105' : 'text-foreground/40 hover:text-foreground'
              }`}
            >
              MENSUEL
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 flex items-center gap-3 ${
                yearly ? 'bg-foreground text-background shadow-2xl scale-105' : 'text-foreground/40 hover:text-foreground'
              }`}
            >
              ANNUEL
              <span className="bg-primary text-white text-[8px] px-3 py-1 rounded-full animate-crystal">
                -25%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {MOCK_PRICING.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} yearly={yearly} index={index} />
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
      className={`glass-master p-20 rounded-[5rem] relative flex flex-col h-full border-white/40 transition-all duration-1000 hover:scale-[1.05] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] group overflow-hidden ${
        isFeatured ? 'border-primary/50 shadow-2xl scale-105 z-10' : ''
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
          className={`w-full h-24 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-700 border-none ${
            isFeatured 
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

// ─── FAQ Section ─────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-64 relative bg-background overflow-hidden">
       <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full" />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-40"
        >
          <span className="glass-master px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.6em] text-primary border-primary/20 mb-12 inline-block">
            ORACLE DE CONFORMITÉ
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-black text-foreground mb-10 tracking-tighter leading-none uppercase">
            Clarté <span className="text-reveal">Absolue</span>.
          </h2>
          <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.4em] italic">Intelligence stratégique et conformité</p>
        </motion.div>

        <div className="space-y-8">
          {MOCK_FAQ.map(({ q, a }, index) => (
            <motion.div
              key={q}
              className={`glass-master rounded-[2.5rem] border-white/10 overflow-hidden transition-all duration-700 ${open === index ? 'border-primary/40 shadow-2xl scale-105' : 'hover:border-white/30'}`}
            >
              <button
                className="w-full flex items-center justify-between px-12 py-10 text-left transition-all"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className={`font-black uppercase tracking-[0.2em] text-sm transition-colors duration-500 ${open === index ? 'text-primary' : 'text-foreground/80'}`}>{q}</span>
                <div className={`w-10 h-10 rounded-xl glass-master border-white/40 flex items-center justify-center transition-all duration-700 ${open === index ? 'bg-primary text-white rotate-180' : 'text-foreground/40'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              {open === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="px-12 pb-12"
                >
                  <div className="h-px w-full bg-white/10 mb-8" />
                  <p className="text-xl text-foreground/40 font-black uppercase tracking-widest leading-loose italic">{a}</p>
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
    <section className="py-64 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[6rem] overflow-hidden p-32 md:p-64 text-center border-white/50 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.4)]"
        >
          {/* Intense CTA Video Background */}
          <BackgroundVideo 
            src="https://cdn.pixabay.com/vimeo/459039322/crystal-49938.mp4?width=1280&hash=d3e0f9b6c0e0b3b4f6b4f6b4f6b4f6b4f6b4f6b4"
            overlayOpacity={0.5}
            blur="10px"
          />

          <div className="relative z-10">
            <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-40 h-40 rounded-[4rem] glass-master flex items-center justify-center mx-auto mb-20 border-white/60 shadow-[0_0_80px_rgba(79,70,229,0.3)]"
            >
              <Zap className="w-20 h-20 text-primary animate-crystal" />
            </motion.div>
            <h2 className="text-6xl md:text-[10rem] font-black mb-16 tracking-tighter uppercase leading-[0.75] font-black text-foreground decoration-secondary underline underline-offset-[20px]">
              DÉPLOYER<br /><span className="text-reveal">THRYVE</span>
            </h2>
            <p className="text-3xl text-foreground/50 mb-24 max-w-4xl mx-auto font-black uppercase tracking-[0.5em] italic">
              "L'avenir appartient à ceux qui émettent à la fréquence Thryve."
            </p>
            <div className="flex flex-wrap justify-center gap-16">
              <Link to={ROUTE_PATHS.REGISTER}>
                <Button
                  className="h-28 px-24 rounded-[3rem] bg-foreground text-background font-black text-3xl uppercase tracking-[0.3em] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 transition-all duration-700 border-none group"
                >
                  DEVENIR ALPHA
                  <ArrowRight className="ml-10 w-12 h-12 group-hover:translate-x-5 transition-all duration-700" />
                </Button>
              </Link>
            </div>
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
    <div className="bg-background selection:bg-primary/30 text-foreground min-h-screen">
      <LandingHeader />
      <main className="space-y-0 relative">
        <HeroSection />
        
        {/* Subtle separator with crystal glow */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent relative z-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[120px]" />
        </div>

        <div className="bg-mesh relative z-20">
          <SocialProofBanner />
          <FeaturesSection />
          <StatsSection />
          <BenefitsSection />
          <TestimonialsSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
