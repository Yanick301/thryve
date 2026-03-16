import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  Globe,
  Shield,
  Clock,
  Layout as LayoutIcon,
  Play,
  MousePointer2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/lib/index';
import { LandingHeader, LandingFooter } from '@/components/Layout';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

// ─── Hero Section (Mastery 2.0) ────────────────────────────────
function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // High-quality abstract tech loop (Mastery Feel)
  const videoUrl = "https://cdn.pixabay.com/video/2020/09/11/49609-458925232_large.mp4";

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-[#020617] text-white">
      {/* Immersive Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="full-screen-video opacity-40 brightness-[0.6]"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-vignette z-10" />
        <div className="video-overlay z-20" />
      </div>

      {/* Dynamic Animated Mesh Elements */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-glow mix-blend-screen" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] animate-glow mix-blend-screen" style={{ animationDelay: '3s' }} />

      <motion.div 
        style={{ y: y1, opacity }}
        className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 w-full relative z-30 text-center"
      >
        {/* Iridescent Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: springPresets.smooth }}
          className="inline-flex items-center gap-2 glass-master border-iridescent px-6 py-2 rounded-full text-sm font-black mb-12 tracking-[0.3em] uppercase"
        >
          <Sparkles className="w-4 h-4 text-iris-teal animate-pulse" />
          <span className="text-white/90">Système de Domination Sociale</span>
        </motion.div>

        {/* Cinematic Headline */}
        <div className="relative mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl lg:text-[160px] font-black leading-[0.8] tracking-tighter"
          >
            THRYVE<span className="text-iris-teal">.</span><br />
            <span className="text-iridescent block mt-4">UNIVERSE</span>
          </motion.h1>
          
          {/* Subtle glow behind headline */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-primary/20 blur-[100px] -z-10" />
        </div>

        {/* Sophisticated Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-xl md:text-3xl text-white/50 leading-relaxed mb-16 max-w-4xl mx-auto font-medium tracking-tight"
        >
          L'épitomé de l'automatisation. Orchestrez votre présence sur Instagram & Threads avec une précision chirurgicale et une élégance technologique absolue.
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap gap-8 justify-center items-center"
        >
          <Link to={ROUTE_PATHS.REGISTER}>
            <Button
              size="lg"
              className="relative group overflow-hidden font-black text-xl px-16 py-10 rounded-3xl transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_0_50px_rgba(109,40,217,0.4)]"
              style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #1d4ed8 100%)' }}
            >
              <span className="relative z-10 flex items-center gap-3">
                LANCER L'ASCENSION
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-iris-pink to-iris-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="lg"
            className="glass-master font-bold text-lg px-12 py-10 rounded-3xl border-white/10 hover:bg-white/5 transition-all duration-300 text-white min-w-[240px]"
          >
            EXPLORER LE NEXUS
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-iris-teal animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Stats Section (Enhanced 2.0) ──────────────────────────────
function StatsSection() {
  const stats = [
    { value: '12K+', label: 'Elite Creators', icon: Users, color: '#8b5cf6' },
    { value: '2.4M+', label: 'Strategic Posts', icon: TrendingUp, color: '#14b8a6' },
    { value: '99.9%', label: 'Mastery Uptime', icon: Shield, color: '#3b82f6' },
    { value: '4.9/5', label: 'Victory Rank', icon: Sparkles, color: '#ec4899' },
  ];

  return (
    <section className="py-40 relative bg-[#020617] overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map(({ value, label, icon: Icon, color }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group text-center"
            >
              <div 
                className="w-24 h-24 mx-auto mb-8 rounded-[2rem] glass-master flex items-center justify-center transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110"
                style={{ borderColor: `${color}20` }}
              >
                <Icon className="w-10 h-10 text-white transition-colors group-hover:text-iridescent" style={{ color }} />
              </div>
              <p className="text-6xl md:text-7xl font-black mb-2 text-white tracking-tighter">{value}</p>
              <p className="text-sm text-white/40 uppercase font-black tracking-[0.4em]">{label}</p>
            </motion.div>
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
    <section id="features" className="py-40 bg-[#020617] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <span className="glass-master border-iridescent px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.5em] text-white/90 mb-8 inline-block shadow-2xl">
            Arsenal de Guerre Digitale
          </span>
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
            L'EXCELLENCE N'EST PAS<br /> UN CHOIX. C'EST UN <span className="text-iridescent">PROTOCOLE</span>.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="glass-master p-12 rounded-[3rem] border-white/5 group hover:border-iris-purple/30 transition-all duration-700"
            >
              <div 
                className="w-20 h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center mb-10 group-hover:bg-white/10 transition-colors"
                style={{ color: f.color }}
              >
                <f.icon size={36} />
              </div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-tight uppercase">{f.title}</h3>
              <p className="text-white/40 text-lg leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Benefits Section (Alpha Edition) ──────────────────────────
function BenefitsSection() {
  const benefits = [
    {
      title: "ALPHA CREATORS",
      headline: "Créez l'impact, automatisez le reste.",
      desc: "Thryve transcende la gestion habituelle pour devenir l'extension naturelle de votre vision créative.",
      items: ["Domination temporelle : 1 semaine en 30 min", "Intelligence prédictive sur vos performances", "Omniprésence : IG & Threads unifiés", "Sémantique assistée par IA de haut niveau"],
      color: "iris-purple"
    },
    {
      title: "STRATEGIC AGENCIES",
      headline: "Scalez sans friction.",
      desc: "Une infrastructure robuste bâtie pour les agences qui redéfinissent les standards du marché.",
      items: ["Nexus multi-comptes hyperscalable", "Protocoles de collaboration sécurisés", "Rapports analytiques chirurgicaux", "Validation asynchrone ultra-fluide"],
      color: "iris-teal"
    }
  ];

  return (
    <section className="py-40 bg-[#020617] relative">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-24">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-master p-16 rounded-[4rem] border-white/5 relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-${b.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="glass-master border-iridescent px-6 py-2 rounded-full text-xs font-black text-white/80 mb-10 inline-block uppercase tracking-widest">
                {b.title}
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
                {b.headline.split(' ').map((word, index) => (
                  <span key={index} className={word === 'reste.' || word === 'friction.' ? 'text-iridescent' : ''}>{word} </span>
                ))}
              </h2>
              <p className="text-white/40 text-xl leading-relaxed mb-12 font-medium">{b.desc}</p>
              <ul className="space-y-6">
                {b.items.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-lg font-bold text-white/90">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-iris-teal/50 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-iris-teal" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
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
    <section className="py-40 bg-[#020617]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-32">
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase">
            VOIX DE LA <span className="text-iridescent">DOMINATION</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-master p-12 rounded-[3rem] border-white/5 hover:border-iridescent transition-all duration-500"
            >
              <p className="text-xl text-white/70 italic leading-relaxed mb-10 font-medium">"{t.text}"</p>
              <div className="flex items-center gap-5">
                <img src={t.avatar} className="w-14 h-14 rounded-full border-2 border-white/10" alt={t.name} />
                <div>
                  <h4 className="font-black text-white text-lg">{t.name}</h4>
                  <p className="text-xs text-white/40 font-black uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
    <section id="pricing" className="py-40 bg-[#020617]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
           <h2 className="text-6xl md:text-8xl font-black text-white mb-12 tracking-tighter uppercase">
             VOTRE <span className="text-iridescent">DESTIN</span>
           </h2>
           <div className="inline-flex glass-master p-1.5 rounded-2xl border-white/10">
              <button 
                onClick={() => setIsYearly(false)}
                className={`px-8 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${!isYearly ? 'bg-white text-black' : 'text-white/40'}`}
              >Mensuel</button>
              <button 
                onClick={() => setIsYearly(true)}
                className={`px-8 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${isYearly ? 'bg-white text-black' : 'text-white/40'}`}
              >Annuel (-20%)</button>
           </div>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              className={`glass-master p-16 rounded-[4rem] relative flex flex-col border-white/5 transition-all duration-500 hover:scale-105 ${p.popular ? 'border-iridescent shadow-2xl scale-105 z-10' : ''}`}
            >
              {p.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black tracking-[0.3em] px-8 py-2 rounded-full shadow-2xl">POPULAIRE</div>
              )}
              <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">{p.name}</h3>
              <div className="flex items-baseline gap-2 mb-10">
                 <span className="text-6xl font-black tracking-tighter text-white">{isYearly ? Math.floor(p.price * 0.8) : p.price}€</span>
                 <span className="text-sm text-white/40 font-black uppercase tracking-widest">/ mois</span>
              </div>
              <ul className="space-y-5 mb-12 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-lg font-bold text-white/70">
                    <CheckCircle2 className="w-5 h-5 text-iris-teal" /> {f}
                  </li>
                ))}
              </ul>
              <Button className={`w-full py-10 rounded-[2rem] font-black uppercase tracking-widest text-lg transition-all ${p.popular ? 'bg-white text-black hover:scale-105 shadow-2xl' : 'glass-master border-white/10 hover:bg-white/5'}`}>
                SÉLECTIONNER
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
    <section className="py-40 bg-[#020617]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
           <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">CLARTÉ <span className="text-iridescent">ABSOLUE</span></h2>
        </div>
        <div className="space-y-6">
          {items.map((it, i) => (
            <motion.div key={i} className="glass-master rounded-3xl border-white/5 overflow-hidden">
               <button 
                 onClick={() => setActive(active === i ? null : i)}
                 className="w-full flex items-center justify-between px-12 py-10 text-left"
               >
                 <span className="text-lg font-black text-white uppercase tracking-widest">{it.q}</span>
                 <ChevronDown className={`w-6 h-6 text-white/40 transition-transform duration-500 ${active === i ? 'rotate-180 text-iris-teal' : ''}`} />
               </button>
               <AnimatePresence>
                 {active === i && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="px-12 pb-10"
                   >
                     <p className="text-xl text-white/40 font-medium leading-relaxed">{it.a}</p>
                   </motion.div>
                 )}
               </AnimatePresence>
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
    <section className="py-60 relative overflow-hidden bg-[#020617] text-center">
       <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/20 blur-[180px] animate-glow" />
       </div>
       <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-master border-iridescent p-40 rounded-[6rem] shadow-2xl relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-iris-purple/10 to-iris-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
             <h2 className="text-7xl md:text-[120px] font-black mb-12 tracking-tighter uppercase leading-[0.8]">
                L'AVENIR EST <span className="text-iridescent">MAINTENANT.</span>
             </h2>
             <p className="text-3xl text-white/50 mb-20 font-medium tracking-tight max-w-3xl mx-auto">
                Rejoignez le cercle fermé des créateurs qui ont choisi la domination technologique.
             </p>
             <Link to={ROUTE_PATHS.REGISTER}>
                <Button size="lg" className="bg-white text-black hover:scale-110 active:scale-95 transition-all duration-500 px-24 py-16 rounded-[3rem] font-black text-3xl shadow-[0_40px_100px_rgba(255,255,255,0.3)]">
                   LANCER LE PROTOCOLE
                </Button>
             </Link>
          </motion.div>
       </div>
    </section>
  );
}

// ─── Main Landing Page ────────────────────────────────────────
export default function Home() {
  return (
    <div className="bg-[#020617] selection:bg-iris-purple/40 text-white min-h-screen">
      <LandingHeader />
      <main className="space-y-0">
        <HeroSection />
        
        {/* Iridescent Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-iris-purple/30 to-transparent relative z-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-iris-purple/5 blur-[120px]" />
        </div>

        <div className="relative z-20">
          <StatsSection />
          <FeaturesSection />

          {/* Large Visual Intervention Section */}
          <section className="py-40 bg-[#020617]">
             <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-32">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="flex-1"
                >
                  <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-[0.85]">
                     DOMINATION<br /><span className="text-iridescent">TEMPORELLE.</span>
                  </h2>
                  <p className="text-2xl text-white/40 leading-relaxed font-bold uppercase tracking-widest mb-12">
                     Gérez une semaine de contenu en moins de 30 minutes. Regagnez votre liberté créative.
                  </p>
                  <Button variant="outline" className="glass-master border-white/10 px-10 py-8 rounded-2xl text-lg font-black tracking-widest uppercase text-white hover:bg-white/5 transition-all">
                     Voir le protocole
                  </Button>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, rotateY: -20, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 perspective-[2000px]"
                >
                  <div className="glass-master border-iridescent rounded-[3rem] overflow-hidden shadow-[0_50px_150px_-30px_rgba(109,40,217,0.3)]">
                     <img 
                       src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200" 
                       className="w-full h-auto object-cover opacity-80"
                       alt="Dashboard Preview"
                     />
                  </div>
                </motion.div>
             </div>
          </section>

        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
