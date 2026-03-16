// ============================================================
// THRYVE — Settings Page
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Bell, Shield, CreditCard, Palette, Zap, 
  Save, Camera, CheckCircle2, LogOut,
  Moon, Sun, Monitor, Link, Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DashboardLayout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { MOCK_PRICING } from '@/data/index';

// ─── Settings Section ─────────────────────────────────────────
type SettingsNavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const NAV_ITEMS: SettingsNavItem[] = [
  { id: 'profile', label: 'PROFIL', icon: User },
  { id: 'notifications', label: 'NOTIFICATIONS', icon: Bell },
  { id: 'security', label: 'SÉCURITÉ', icon: Shield },
  { id: 'billing', label: 'ABONNEMENT', icon: CreditCard, badge: 'PRO' },
  { id: 'appearance', label: 'APPARENCE', icon: Palette },
  { id: 'integrations', label: 'INTÉGRATIONS', icon: Zap },
];

// ─── Profile Section ──────────────────────────────────────────
function ProfileSection() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || 'Sophie Martin',
    email: user?.email || 'sophie@thryve.io',
    bio: 'Content Creator & Social Media Manager ✨',
    website: 'https://sophiemartin.co',
    timezone: 'Europe/Paris',
  });

  const handleSave = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      {/* Avatar Nexus */}
      <div className="glass-master rounded-[3rem] p-10 border-white/40 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.6em] mb-10">IDENTITÉ ALPHA</h3>
        <div className="flex items-center gap-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-black shadow-2xl animate-crystal border border-white/40">
              {form.name.charAt(0)}
            </div>
            <button className="absolute -bottom-2 -right-2 w-12 h-12 glass-master rounded-2xl flex items-center justify-center shadow-xl border-white/40 hover:scale-110 active:scale-95 transition-all">
              <Camera className="w-6 h-6 text-foreground" />
            </button>
          </div>
          <div className="space-y-4">
            <p className="text-xl font-black text-foreground uppercase tracking-tighter">PHOTO DE PROFIL</p>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">JPG, PNG OU GIF · MAX 2 MB</p>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="rounded-2xl glass-master border-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-white px-8 py-6 transition-all duration-500">IMPORTER</Button>
              <Button variant="ghost" size="sm" className="rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 px-8 py-6 transition-all duration-500">SUPPRIMER</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Alpha */}
      <div className="glass-master rounded-[3rem] p-10 border-white/40 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/5 -z-10" />
        <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.6em] mb-12">DONNÉES DE CONFIGURATION</h3>
        <div className="space-y-10">
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] block">NOM COMPLET</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-[1.5rem] py-8 px-8 glass-master border-white/20 focus:border-primary focus:ring-0 text-foreground font-black uppercase tracking-[0.2em]"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] block">TERMINAL EMAIL</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-[1.5rem] py-8 px-8 glass-master border-white/20 focus:border-primary focus:ring-0 text-foreground font-black uppercase tracking-[0.2em]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] block">BIO DESCRIPTIVE</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={4}
              className="w-full px-8 py-6 text-[11px] font-black uppercase tracking-widest glass-master border-white/20 rounded-[1.5rem] focus:outline-none focus:border-primary transition-all resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] block">SITE WEB / NEXUS</label>
              <Input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="rounded-[1.5rem] py-8 px-8 glass-master border-white/20 focus:border-primary focus:ring-0 text-foreground font-black uppercase tracking-[0.2em]"
                placeholder="HTTPS://..."
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] block">FUSEAU HORAIRE ALPHA</label>
              <select
                value={form.timezone}
                onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                className="w-full px-8 py-5 text-[10px] font-black uppercase tracking-widest glass-master border-white/20 rounded-[1.5rem] focus:outline-none focus:border-primary transition-all appearance-none"
              >
                <option value="Europe/Paris">EUROPE/PARIS (UTC+1)</option>
                <option value="Europe/London">EUROPE/LONDON (UTC+0)</option>
                <option value="America/New_York">AMERICA/NEW_YORK (UTC-5)</option>
                <option value="America/Los_Angeles">AMERICA/LOS_ANGELES (UTC-8)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Button
            className="w-full sm:w-auto rounded-[2rem] px-16 py-10 bg-primary text-white font-black uppercase tracking-[0.6em] text-[10px] shadow-2xl transition-all duration-700 hover:scale-105 active:scale-95 border-none group/save"
            onClick={handleSave}
          >
            {saved ? (
              <><CheckCircle2 className="mr-4 w-6 h-6 animate-out fade-out zoom-out" />SYNCHRONISATION RÉUSSIE</>
            ) : (
              <><Save className="mr-4 w-6 h-6 group-hover/save:scale-125 transition-transform" />METTRE À JOUR CONFIG</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Notifications Section ────────────────────────────────────
function NotificationsSection() {
  const [settings, setSettings] = useState({
    postPublished: true,
    scheduledReminder: true,
    weeklyReport: true,
    mentions: false,
    newFollower: false,
    emailDigest: true,
    pushEnabled: false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const groups = [
    {
      title: 'PUBLICATIONS ALPHA',
      items: [
        { key: 'postPublished', label: 'TRANSMISSION RÉUSSIE', desc: 'NOTIFICATION LORSQU\'UN SIGNAL EST DIFFUSÉ' },
        { key: 'scheduledReminder', label: 'RAPPEL DE SÉQUENCE', desc: 'ALERTES 30 MINUTES AVANT LE LANCEMENT' },
      ],
    },
    {
      title: 'FLUX DE DONNÉES',
      items: [
        { key: 'weeklyReport', label: 'RAPPORT DE PERFORMANCE', desc: 'SYNTHÈSE HEBDOMADAIRE DU REACH GLOBAL' },
        { key: 'emailDigest', label: 'DIGEST QUOTIDIEN', desc: 'RÉSUMÉ ANALYTIQUE DE L\'UNITÉ' },
      ],
    },
    {
      title: 'RÉSEAU SOCIAL',
      items: [
        { key: 'mentions', label: 'INTERACTIVE SIGNALS', desc: 'ALERTE LORS DE MENTIONS EXTERNES' },
        { key: 'newFollower', label: 'NOUVEL OPERATEUR', desc: 'NOTIFICATION DE NOUVEL ABONNÉ' },
      ],
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-12 duration-1000">
      {groups.map(({ title, items }) => (
        <div key={title} className="glass-master rounded-[3rem] border-white/40 overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-white/5 -z-10" />
          <div className="px-10 py-8 border-b border-white/20">
            <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.6em]">{title}</h3>
          </div>
          <div className="divide-y divide-white/10">
            {items.map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between px-10 py-8 group/item hover:bg-white/5 transition-all duration-500">
                <div className="space-y-2">
                  <p className="text-sm font-black text-foreground uppercase tracking-wider">{label}</p>
                  <p className="text-[9px] text-foreground/30 font-black uppercase tracking-widest">{desc}</p>
                </div>
                <button
                  onClick={() => toggle(key as keyof typeof settings)}
                  className={`relative inline-flex w-16 h-8 rounded-full transition-all duration-700 shadow-inner group/toggle ${
                    settings[key as keyof typeof settings] ? 'bg-primary' : 'glass-master border-white/20 bg-white/5'
                  }`}
                >
                  <span
                    className={`inline-block w-6 h-6 rounded-full shadow-2xl transition-all duration-700 mt-1 ${
                      settings[key as keyof typeof settings] ? 'translate-x-9 bg-white' : 'translate-x-1 bg-foreground/20'
                    }`}
                  />
                  {settings[key as keyof typeof settings] && (
                    <motion.div layoutId={`glow-${key}`} className="absolute inset-0 bg-primary/20 blur-xl -z-10" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Security Section ─────────────────────────────────────────
function SecuritySection() {
  const [form, setForm] = useState({ current: '', newPwd: '', confirm: '' });
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      {/* Password Reset Nexus */}
      <div className="glass-master rounded-[3rem] p-10 border-white/40 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.6em] mb-12">SÉCURITÉ DU TERMINAL</h3>
        <div className="space-y-8 max-w-xl">
          {[
            { key: 'current', label: 'CODE D\'ACCÈS ACTUEL' },
            { key: 'newPwd', label: 'NOUVEAU CODE ALPHA' },
            { key: 'confirm', label: 'VERIFICATION DU CODE' },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-4">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] block">{label}</label>
              <Input
                type="password"
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="rounded-[1.5rem] py-8 px-8 glass-master border-white/20 focus:border-primary focus:ring-0 text-foreground font-black tracking-[0.5em] placeholder:text-foreground/10"
                placeholder="••••••••"
              />
            </div>
          ))}
          <Button className="rounded-[2rem] px-16 py-10 bg-primary text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:scale-105 transition-all duration-700 border-none group/sec">
            ACTUALISER PROTOCOLE
            <Shield className="ml-4 w-6 h-6 group-hover/sec:animate-pulse transition-transform" />
          </Button>
        </div>
      </div>

      {/* 2FA Flux */}
      <div className="glass-master rounded-[3rem] p-12 border-white/40 shadow-2xl relative overflow-hidden group/2fa">
        <div className="absolute inset-0 bg-secondary/5 -z-10" />
        <div className="flex items-center justify-between gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-foreground uppercase tracking-tighter">AUTHENTIFICATION BIOMÉTRIQUE V2</h3>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.4em] leading-loose">RENFORCEZ LA LIAISON AVEC VOTRE UNITÉ VIA UN SYSTÈME DE VÉRIFICATION DOUBLE CANAL.</p>
          </div>
          <button
            onClick={() => setTwoFactor((v) => !v)}
            className={`relative inline-flex w-20 h-10 rounded-full transition-all duration-700 shadow-inner ${twoFactor ? 'bg-primary' : 'glass-master border-white/20 bg-white/5'}`}
          >
            <span className={`inline-block w-8 h-8 rounded-full shadow-2xl transition-all duration-700 mt-1 ${twoFactor ? 'translate-x-11 bg-white' : 'translate-x-1 bg-foreground/10'}`} />
          </button>
        </div>
      </div>

      {/* Danger Protocol */}
      <div className="glass-master rounded-[3rem] p-12 border-rose-500/20 shadow-2xl relative overflow-hidden group/danger">
        <div className="absolute inset-0 bg-rose-500/5 -z-10" />
        <h3 className="text-xl font-black text-rose-500 uppercase tracking-tighter mb-4">ZONE DE RUPTURE</h3>
        <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.4em] mb-10 leading-loose">LA DÉCONNEXION DÉFINITIVE DU NEXUS EST IRRÉVERSIBLE ET EFFACERA TOUTES LES DONNÉES DE FLUX.</p>
        <Button variant="outline" className="rounded-2xl border-rose-500/40 text-rose-500 hover:bg-rose-500/10 text-[10px] font-black uppercase tracking-widest px-12 py-8 transition-all duration-700">
            DÉSACTIVER L'UNITÉ DÉFINITIVEMENT
        </Button>
      </div>
    </div>
  );
}

// ─── Billing Section ──────────────────────────────────────────
function BillingSection() {
  const currentPlan = MOCK_PRICING[1]; // Pro

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-12 duration-1000">
      {/* Current Plan Crystal */}
      <div
        className="rounded-[4rem] p-12 text-white relative overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.4)] animate-crystal group/plan"
        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' }}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/plan:opacity-100 transition-opacity duration-700" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 relative z-10">
          <div>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.5em] mb-4">UNITÉ D'ABONNEMENT ALPHA</p>
            <h3 className="text-6xl font-black tracking-tighter uppercase">{currentPlan.name}</h3>
          </div>
          <div className="glass-master px-10 py-8 rounded-[2rem] border-white/40 shadow-2xl flex flex-col items-end">
            <span className="text-5xl font-black">{currentPlan.price}€</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">PAR CYCLE MENSUEL</span>
          </div>
        </div>
        
        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-12">RENOUVELLEMENT DE LA LIAISON : 15 AVRIL 2026</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {[
            { label: 'UNITÉS SYNC', value: `${currentPlan.accounts}`, icon: Link },
            { label: 'FLUX MENSUEL', value: `${currentPlan.postsPerMonth}`, icon: Send },
            { label: 'STOCKAGE NEXUS', value: `${currentPlan.mediaStorage} GB`, icon: Zap },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/10 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/20 hover:scale-105 transition-all duration-500">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-black text-3xl tracking-tighter">{value}</p>
              <p className="text-[9px] text-white/40 font-black uppercase tracking-widest mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Nexus */}
      <div className="glass-master rounded-[3.5rem] border-white/40 overflow-hidden shadow-2xl">
        <div className="px-12 py-8 border-b border-white/20 bg-white/5">
          <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.6em]">PLANS D'EXPANSION NEXUS</h3>
        </div>
        <div className="divide-y divide-white/10">
          {MOCK_PRICING.map((plan) => (
            <div key={plan.id} className="flex flex-col md:flex-row md:items-center justify-between px-12 py-10 hover:bg-white/5 transition-all duration-500 group/row">
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <p className="text-2xl font-black text-foreground uppercase tracking-tighter group-hover/row:text-primary transition-colors">{plan.name}</p>
                  {plan.id === currentPlan.id && (
                    <span className="text-[8px] font-black bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20 uppercase tracking-widest animate-pulse">ACTIF</span>
                  )}
                  {plan.isPopular && (
                    <span className="text-[8px] font-black bg-secondary/10 text-secondary px-4 py-1.5 rounded-full border border-secondary/20 uppercase tracking-widest">NEXUS CHOICE</span>
                  )}
                </div>
                <p className="text-[10px] text-foreground/30 font-black uppercase tracking-widest italic">{plan.accounts} UNITÉS · {plan.postsPerMonth} TRANSMISSIONS · {plan.mediaStorage}GB STOCKAGE</p>
              </div>
              <div className="text-right flex flex-col md:items-end gap-6 mt-6 md:mt-0">
                <p className="text-3xl font-black text-foreground tracking-tighter">{plan.price === 0 ? 'SYNCHRONISATION LIBRE' : `${plan.price}€ / MOIS`}</p>
                {plan.id !== currentPlan.id && (
                  <Button size="lg" className="rounded-2xl px-12 py-8 bg-foreground text-background font-black uppercase tracking-widest text-[9px] hover:scale-110 active:scale-95 transition-all border-none">
                    {plan.price > currentPlan.price ? 'UPGRADER L\'UNITÉ' : 'RÉTROGRADER SIGNAL'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Appearance Section ───────────────────────────────────────
function AppearanceSection() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [accent, setAccent] = useState('#4F46E5');
  const [compact, setCompact] = useState(false);

  const themes = [
    { value: 'light', label: 'LUMIERRE', Icon: Sun },
    { value: 'dark', label: 'OBSIDIENNE', Icon: Moon },
    { value: 'system', label: 'NEXUS AUTO', Icon: Monitor },
  ] as const;

  const accents = [
    '#4F46E5', '#14B8A6', '#F43F5E', '#F59E0B', '#8B5CF6', '#10B981',
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-left-12 duration-1000">
      {/* Theme Selector Alpha */}
      <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden">
        <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.6em] mb-12 text-center">MODE DE DIFFUSION VISUELLE</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {themes.map(({ value, label, Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`flex flex-col items-center gap-8 p-12 rounded-[2.5rem] border-2 transition-all duration-700 relative overflow-hidden group/theme
                ${theme === value ? 'border-primary bg-primary/10 shadow-[0_0_60px_rgba(79,70,229,0.2)] scale-105' : 'glass-master border-white/10 hover:border-white/40'}`}
            >
              <div className={`p-6 rounded-3xl transition-all duration-700 ${theme === value ? 'bg-primary text-white scale-125' : 'bg-white/5 text-foreground/40'}`}>
                <Icon className="w-10 h-10 animate-crystal" />
              </div>
              <span className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">{label}</span>
              {theme === value && (
                  <motion.div layoutId="active-theme" className="absolute bottom-6 w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Accent Alpha */}
      <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden">
        <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.6em] mb-12">FRÉQUENCE D'ACCENTUATION</h3>
        <div className="flex flex-wrap gap-8 justify-center">
          {accents.map((color) => (
            <button
              key={color}
              onClick={() => setAccent(color)}
              className={`w-16 h-16 rounded-[1.5rem] transition-all duration-700 relative overflow-hidden
                ${accent === color ? 'ring-4 ring-offset-[8px] ring-offset-background ring-foreground scale-125 shadow-2xl' : 'hover:scale-110'}`}
              style={{ backgroundColor: color }}
            >
                {accent === color && (
                    <motion.div layoutId="active-color" className="absolute inset-0 bg-white/20 animate-pulse" />
                )}
            </button>
          ))}
        </div>
      </div>

      {/* Layout Config */}
      <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-foreground uppercase tracking-tighter">PROTOCOLE COMPACT ALPHA</h3>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.4em] leading-loose">OPTOMISE L'AFFICHAGE POUR LES OPÉRATEURS HAUTE-DENSITÉ. RÉDUIT LA FRICTION VISUELLE.</p>
          </div>
          <button
            onClick={() => setCompact((v) => !v)}
            className={`relative inline-flex w-20 h-10 rounded-full transition-all duration-700 shadow-inner ${compact ? 'bg-primary' : 'glass-master border-white/20 bg-white/5'}`}
          >
            <span className={`inline-block w-8 h-8 rounded-full shadow-2xl transition-all duration-700 mt-1 ${compact ? 'translate-x-11 bg-white' : 'translate-x-1 bg-foreground/10'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Settings Page ───────────────────────────────────────
export default function SettingsPage() {
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <ProfileSection />;
      case 'notifications': return <NotificationsSection />;
      case 'security': return <SecuritySection />;
      case 'billing': return <BillingSection />;
      case 'appearance': return <AppearanceSection />;
      default: return (
        <div className="bg-card rounded-2xl p-12 border border-border text-center" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
          <Zap className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground">Bientôt disponible</p>
          <p className="text-sm text-muted-foreground mt-1">Cette section est en cours de développement.</p>
        </div>
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header Crystal */}
        <div className="mb-16 pb-12 border-b border-white/40">
          <h1 className="text-6xl md:text-[7rem] font-black text-foreground tracking-tighter uppercase leading-[0.8]">
            CRYSTAL<br /><span className="text-reveal">CORE</span>
          </h1>
          <p className="text-[10px] text-foreground/40 mt-8 font-black uppercase tracking-[0.6em]">
            CONFIGUREZ VOTRE ESPACE DE TRAVAIL ALPHA ET VOS PRÉFÉRENCES NEXUS.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Nav Nexus */}
          <div className="w-64 flex-shrink-0 hidden md:block">
            <nav className="space-y-3 sticky top-10">
              {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-[10px] font-black tracking-[0.2em] transition-all duration-500 overflow-hidden relative group
                    ${activeSection === id ? 'glass-master text-primary border-white/40 shadow-xl scale-105' : 'text-foreground/40 hover:text-foreground hover:bg-white/5'}`}
                >
                  {activeSection === id && (
                    <motion.div layoutId="nav-bg" className="absolute inset-0 bg-primary/5 -z-10" />
                  )}
                  <Icon className="w-5 h-5 flex-shrink-0 animate-crystal" />
                  <span className="flex-1 text-left uppercase">{label}</span>
                  {badge && (
                    <span className="text-[8px] font-black bg-primary text-white px-2 py-0.5 rounded-full shadow-lg">{badge}</span>
                  )}
                </button>
              ))}

              <div className="pt-8 mt-8 border-t border-white/20">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-[10px] font-black tracking-[0.2em] text-rose-500 hover:bg-rose-500/10 transition-all duration-500 group/logout"
                >
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="uppercase">TERMINER SESSION</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {renderSection()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
