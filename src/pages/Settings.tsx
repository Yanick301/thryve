// ============================================================
// THRYVE — Settings Page
// ============================================================

import React, { useState } from 'react';
import {
  User, Bell, Shield, CreditCard, Palette, Zap, 
  Save, Camera, CheckCircle2, LogOut,
  Moon, Sun, Monitor,
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
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Sécurité', icon: Shield },
  { id: 'billing', label: 'Abonnement', icon: CreditCard, badge: 'Pro' },
  { id: 'appearance', label: 'Apparence', icon: Palette },
  { id: 'integrations', label: 'Intégrations', icon: Zap },
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
    <div className="space-y-6">
      {/* Avatar */}
      <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
        <h3 className="font-semibold text-foreground mb-4">Photo de profil</h3>
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
              {form.name.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Changer la photo</p>
            <p className="text-xs text-muted-foreground mb-3">JPG, PNG ou GIF · Max 2 MB</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl text-xs">Importer</Button>
              <Button variant="ghost" size="sm" className="rounded-xl text-xs text-destructive hover:text-destructive">Supprimer</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
        <h3 className="font-semibold text-foreground mb-5">Informations personnelles</h3>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Nom complet</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Adresse email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Site web</label>
              <Input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="rounded-xl"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Fuseau horaire</label>
              <select
                value={form.timezone}
                onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                <option value="Europe/London">Europe/London (UTC+0)</option>
                <option value="America/New_York">America/New_York (UTC-5)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (UTC-8)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Button
            className="font-semibold rounded-xl"
            onClick={handleSave}
            style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}
          >
            {saved ? <><CheckCircle2 className="mr-2 w-4 h-4" />Sauvegardé !</> : <><Save className="mr-2 w-4 h-4" />Sauvegarder</>}
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
      title: 'Publications',
      items: [
        { key: 'postPublished', label: 'Post publié avec succès', desc: 'Quand une publication est envoyée' },
        { key: 'scheduledReminder', label: 'Rappel avant publication', desc: '30 minutes avant un post programmé' },
      ],
    },
    {
      title: 'Rapports',
      items: [
        { key: 'weeklyReport', label: 'Rapport hebdomadaire', desc: 'Résumé de vos performances chaque lundi' },
        { key: 'emailDigest', label: 'Digest email quotidien', desc: 'Résumé de l\'activité de la journée' },
      ],
    },
    {
      title: 'Social',
      items: [
        { key: 'mentions', label: 'Mentions', desc: 'Quand quelqu\'un vous mentionne' },
        { key: 'newFollower', label: 'Nouveau follower', desc: 'Notification de nouvel abonné' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {groups.map(({ title, items }) => (
        <div key={title} className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
          <div className="divide-y divide-border">
            {items.map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => toggle(key as keyof typeof settings)}
                  className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ${
                    settings[key as keyof typeof settings] ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 mt-1 ${
                      settings[key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
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
    <div className="space-y-6">
      <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
        <h3 className="font-semibold text-foreground mb-5">Changer le mot de passe</h3>
        <div className="space-y-4 max-w-sm">
          {[
            { key: 'current', label: 'Mot de passe actuel' },
            { key: 'newPwd', label: 'Nouveau mot de passe' },
            { key: 'confirm', label: 'Confirmer le mot de passe' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{label}</label>
              <Input
                type="password"
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="rounded-xl"
                placeholder="••••••••"
              />
            </div>
          ))}
          <Button className="rounded-xl font-semibold" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}>
            Mettre à jour
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Authentification à 2 facteurs</h3>
            <p className="text-sm text-muted-foreground mt-1">Renforcez la sécurité de votre compte avec un code temporaire.</p>
          </div>
          <button
            onClick={() => setTwoFactor((v) => !v)}
            className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ${twoFactor ? 'bg-primary' : 'bg-muted'}`}
          >
            <span className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 mt-1 ${twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="bg-destructive/5 rounded-2xl p-6 border border-destructive/20">
        <h3 className="font-semibold text-destructive mb-2">Zone de danger</h3>
        <p className="text-sm text-muted-foreground mb-4">La suppression du compte est permanente et irréversible.</p>
        <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/5 rounded-xl">
          Supprimer mon compte
        </Button>
      </div>
    </div>
  );
}

// ─── Billing Section ──────────────────────────────────────────
function BillingSection() {
  const currentPlan = MOCK_PRICING[1]; // Pro

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div
        className="rounded-2xl p-6 text-white"
        style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-sm mb-1">Votre abonnement actuel</p>
            <h3 className="text-2xl font-extrabold">{currentPlan.name}</h3>
          </div>
          <span className="bg-white/20 px-4 py-2 rounded-xl text-sm font-bold">{currentPlan.price}€/mois</span>
        </div>
        <p className="text-white/70 text-sm mb-4">Renouvellement le 15 avril 2026</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Comptes', value: `${currentPlan.accounts}` },
            { label: 'Posts/mois', value: `${currentPlan.postsPerMonth}` },
            { label: 'Médias', value: `${currentPlan.mediaStorage} GB` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/10 rounded-xl p-3 text-center">
              <p className="font-bold text-lg">{value}</p>
              <p className="text-xs text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Changer de plan</h3>
        </div>
        <div className="divide-y divide-border">
          {MOCK_PRICING.map((plan) => (
            <div key={plan.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{plan.name}</p>
                  {plan.id === currentPlan.id && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Actuel</span>
                  )}
                  {plan.isPopular && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold">Populaire</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.accounts} compte(s) · {plan.postsPerMonth} posts/mois</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{plan.price === 0 ? 'Gratuit' : `${plan.price}€/mois`}</p>
                {plan.id !== currentPlan.id && (
                  <Button variant="outline" size="sm" className="mt-1 rounded-xl text-xs">
                    {plan.price > currentPlan.price ? 'Upgrader' : 'Rétrograder'}
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
    { value: 'light', label: 'Clair', Icon: Sun },
    { value: 'dark', label: 'Sombre', Icon: Moon },
    { value: 'system', label: 'Système', Icon: Monitor },
  ] as const;

  const accents = [
    '#4F46E5', '#14B8A6', '#F43F5E', '#F59E0B', '#8B5CF6', '#10B981',
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
        <h3 className="font-semibold text-foreground mb-4">Thème</h3>
        <div className="grid grid-cols-3 gap-3">
          {themes.map(({ value, label, Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200
                ${theme === value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
            >
              <Icon className={`w-5 h-5 ${theme === value ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-xs font-semibold text-foreground">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
        <h3 className="font-semibold text-foreground mb-4">Couleur d'accent</h3>
        <div className="flex gap-3">
          {accents.map((color) => (
            <button
              key={color}
              onClick={() => setAccent(color)}
              className={`w-9 h-9 rounded-xl transition-all duration-200 ${accent === color ? 'ring-2 ring-offset-2 ring-foreground scale-110' : 'hover:scale-105'}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Mode compact</h3>
            <p className="text-sm text-muted-foreground mt-1">Réduit les espacements pour afficher plus de contenu.</p>
          </div>
          <button
            onClick={() => setCompact((v) => !v)}
            className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ${compact ? 'bg-primary' : 'bg-muted'}`}
          >
            <span className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 mt-1 ${compact ? 'translate-x-6' : 'translate-x-1'}`} />
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Paramètres ⚙️</h1>
          <p className="text-sm text-muted-foreground mt-1">Gérez votre compte et vos préférences</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Nav */}
          <div className="w-52 flex-shrink-0 hidden md:block">
            <nav className="space-y-1">
              {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${activeSection === id ? 'bg-primary/8 text-primary font-semibold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left">{label}</span>
                  {badge && (
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{badge}</span>
                  )}
                </button>
              ))}

              <div className="pt-4 mt-4 border-t border-border">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/8 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
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
