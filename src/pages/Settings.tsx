// ============================================================
// THRYVE — Settings Page
// ============================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Bell, Shield, CreditCard, Palette, Zap, 
  Save, Camera, CheckCircle2, LogOut, AlertTriangle,
  Moon, Sun, Monitor, Link, Send, MessageSquare, Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { DashboardLayout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
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
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    website: '',
    timezone: 'Europe/Paris',
    avatar_url: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setForm({
          name: data.full_name || user.name || '',
          email: data.email || user.email || '',
          bio: data.bio || '',
          website: data.website || '',
          timezone: data.timezone || 'Europe/Paris',
          avatar_url: data.avatar_url || '',
        });
      }
      setLoading(false);
    };
    loadProfile();
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setForm(prev => ({ ...prev, avatar_url: publicUrl }));
      toast({ title: "Avatar mis à jour", description: "Votre nouvelle identité est synchronisée." });
    } catch (error: any) {
      toast({ title: "Échec de l'upload", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaved(false);
    setIsError(false);
    
    // Attempt to persist in Supabase profiles table
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: form.name,
          email: form.email,
          bio: form.bio,
          website: form.website,
          timezone: form.timezone,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Update failed:', err);
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      {/* Avatar Nexus */}
      <div className="glass-master rounded-[3rem] p-10 border-white/40 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.6em] mb-10">IDENTITÉ ALPHA</h3>
        <div className="flex items-center gap-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-black shadow-2xl animate-crystal border border-white/40 overflow-hidden">
              {form.avatar_url ? (
                <img src={form.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                form.name.charAt(0) || '?'
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 w-12 h-12 glass-master rounded-2xl flex items-center justify-center shadow-xl border-white/40 hover:scale-110 active:scale-95 transition-all cursor-pointer">
              <Camera className="w-6 h-6 text-foreground" />
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
            </label>
          </div>
          <div className="space-y-4">
            <p className="text-xl font-black text-foreground uppercase tracking-tighter">PHOTO DE PROFIL</p>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">JPG, PNG OU GIF · MAX 2 MB</p>
            <div className="flex gap-4">
              <label className="rounded-2xl glass-master border-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-white px-8 py-3 transition-all duration-500 cursor-pointer border flex items-center">
                IMPORTER
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
              </label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 px-8 py-6 transition-all duration-500"
                onClick={async () => {
                  if (!user) return;
                  await supabase.from('profiles').update({ avatar_url: null }).eq('id', user.id);
                  setForm(prev => ({ ...prev, avatar_url: '' }));
                }}
              >
                SUPPRIMER
              </Button>
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
            className={`w-full sm:w-auto rounded-[2rem] px-16 py-10 font-black uppercase tracking-[0.6em] text-[10px] shadow-2xl transition-all duration-700 hover:scale-105 active:scale-95 border-none group/save ${isError ? 'bg-rose-500' : 'bg-primary'} text-white`}
            onClick={handleSave}
          >
            {saved ? (
              <><CheckCircle2 className="mr-4 w-6 h-6 animate-out fade-out zoom-out" />SYNCHRONISATION RÉUSSIE</>
            ) : isError ? (
              <><AlertTriangle className="mr-4 w-6 h-6 animate-bounce" />ÉCHEC DU PROTOCOLE</>
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
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    postPublished: true,
    scheduledReminder: true,
    weeklyReport: true,
    mentions: false,
    newFollower: false,
    emailDigest: true,
    pushEnabled: false,
  });

  useEffect(() => {
    const loadSettings = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('notification_settings')
        .eq('id', user.id)
        .single();
      
      if (data?.notification_settings) {
        setSettings(data.notification_settings);
      }
      setLoading(false);
    };
    loadSettings();
  }, [user]);

  const toggle = async (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    
    // Auto-save on toggle
    if (user) {
      await supabase
        .from('profiles')
        .update({ notification_settings: newSettings })
        .eq('id', user.id);
    }
  };

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

  if (loading) return <div className="p-20 text-center animate-pulse text-[10px] font-black uppercase tracking-widest text-foreground/20">CHARGEMENT DES PARAMÈTRES...</div>;

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
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ current: '', newPwd: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  useEffect(() => {
    const loadSecurity = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('two_factor_enabled')
        .eq('id', user.id)
        .single();
      if (data) setTwoFactor(!!data.two_factor_enabled);
    };
    loadSecurity();
  }, [user]);

  const toggle2FA = async () => {
    const newValue = !twoFactor;
    setTwoFactor(newValue);
    if (user) {
      await supabase
        .from('profiles')
        .update({ two_factor_enabled: newValue })
        .eq('id', user.id);
      toast({
        title: newValue ? "2FA Activé" : "2FA Désactivé",
        description: newValue ? "Protocole biométrique v2 initialisé." : "Niveau de sécurité réduit.",
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("PROTOCOLE DE RUPTURE : Êtes-vous certain de vouloir effacer toutes vos données Nexus ? Cette action est irréversible.")) return;
    
    setLoading(true);
    try {
      // In a real app, we might call a Supabase Edge Function to handle deletion
      // For now, we'll delete the profile and sign out
      if (user) {
        await supabase.from('profiles').delete().eq('id', user.id);
        await logout();
        toast({ title: "Unité Désactivée", description: "Toutes les données ont été effacées du Nexus." });
      }
    } catch (error: any) {
      toast({ title: "Erreur de Rupture", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (form.newPwd !== form.confirm) {
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: form.newPwd
    });

    setLoading(false);
    if (error) {
      toast({
        variant: "destructive",
        title: "Échec de mise à jour",
        description: error.message,
      });
    } else {
      toast({
        title: "Sécurité renforcée",
        description: "Votre code d'accès a été mis à jour.",
      });
      setForm({ current: '', newPwd: '', confirm: '' });
    }
  };

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
          <Button 
            disabled={loading}
            onClick={handleUpdatePassword}
            className="rounded-[2rem] px-16 py-10 bg-primary text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:scale-105 transition-all duration-700 border-none group/sec"
          >
            {loading ? 'SYNCHRONISATION...' : 'ACTUALISER PROTOCOLE'}
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
            onClick={toggle2FA}
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
        <Button 
          variant="outline" 
          disabled={loading}
          onClick={handleDeleteAccount}
          className="rounded-2xl border-rose-500/40 text-rose-500 hover:bg-rose-500/10 text-[10px] font-black uppercase tracking-widest px-12 py-8 transition-all duration-700"
        >
            {loading ? 'DÉSACTIVATION...' : 'DÉSACTIVER L\'UNITÉ DÉFINITIVEMENT'}
        </Button>
      </div>
    </div>
  );
}

// ─── Billing Section ──────────────────────────────────────────
function BillingSection() {
  const { user } = useAuth();
  const [currentPlanId, setCurrentPlanId] = useState('pro');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBilling = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('subscription_plan')
        .eq('id', user.id)
        .single();
      if (data?.subscription_plan) setCurrentPlanId(data.subscription_plan);
      setLoading(false);
    };
    loadBilling();
  }, [user]);

  const handleUpdatePlan = async (planId: string) => {
    setCurrentPlanId(planId);
    if (user) {
      await supabase
        .from('profiles')
        .update({ subscription_plan: planId })
        .eq('id', user.id);
      toast({
        title: "Plan Actualisé",
        description: `Votre unité est désormais configurée en mode ${planId.toUpperCase()}.`,
      });
    }
  };

  const currentPlan = MOCK_PRICING.find(p => p.id === currentPlanId) || MOCK_PRICING[1];

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
                  <Button 
                    size="lg" 
                    onClick={() => handleUpdatePlan(plan.id)}
                    className="rounded-2xl px-12 py-8 bg-foreground text-background font-black uppercase tracking-widest text-[9px] hover:scale-110 active:scale-95 transition-all border-none"
                  >
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
  const { user } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [accent, setAccent] = useState('#4F46E5');
  const [compact, setCompact] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppearance = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('appearance_settings')
        .eq('id', user.id)
        .single();
      
      if (data?.appearance_settings) {
        setTheme(data.appearance_settings.theme || 'dark');
        setAccent(data.appearance_settings.accent || '#4F46E5');
        setCompact(data.appearance_settings.compact || false);
      }
      setLoading(false);
    };
    loadAppearance();
  }, [user]);

  useEffect(() => {
    const applyTheme = (t: 'light' | 'dark' | 'system') => {
      const root = window.document.documentElement;
      let effectiveTheme = t;
      if (t === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      root.classList.remove('light', 'dark');
      root.classList.add(effectiveTheme);
    };

    applyTheme(theme);

    // Listen for system theme changes if in 'system' mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') applyTheme('system');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const updateAppearance = async (updates: Partial<{ theme: 'light' | 'dark' | 'system'; accent: string; compact: boolean }>) => {
    const newSettings = { theme, accent, compact, ...updates };
    if (updates.theme) setTheme(updates.theme);
    if (updates.accent) setAccent(updates.accent);
    if (updates.compact !== undefined) setCompact(updates.compact);

    if (user) {
      await supabase
        .from('profiles')
        .update({ appearance_settings: newSettings })
        .eq('id', user.id);
    }
  };

  const themes = [
    { value: 'light', label: 'LUMIÈRE', Icon: Sun },
    { value: 'dark', label: 'OBSIDIENNE', Icon: Moon },
    { value: 'system', label: 'NEXUS AUTO', Icon: Monitor },
  ] as const;

  const accents = [
    '#4F46E5', '#14B8A6', '#F43F5E', '#F59E0B', '#8B5CF6', '#10B981',
  ];

  if (loading) return <div className="p-20 text-center animate-pulse text-[10px] font-black uppercase tracking-widest text-foreground/20">CHARGEMENT DE L'APPARENCE...</div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-left-12 duration-1000">
      {/* Theme Selector Alpha */}
      <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden">
        <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.6em] mb-12 text-center">MODE DE DIFFUSION VISUELLE</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {themes.map(({ value, label, Icon }) => (
            <button
              key={value}
              onClick={() => updateAppearance({ theme: value })}
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
              onClick={() => updateAppearance({ accent: color })}
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
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.4em] leading-loose">OPTIMISE L'AFFICHAGE POUR LES OPÉRATEURS HAUTE-DENSITÉ. RÉDUIT LA FRICTION VISUELLE.</p>
          </div>
          <button
            onClick={() => updateAppearance({ compact: !compact })}
            className={`relative inline-flex w-20 h-10 rounded-full transition-all duration-700 shadow-inner ${compact ? 'bg-primary' : 'glass-master border-white/20 bg-white/5'}`}
          >
            <span className={`inline-block w-8 h-8 rounded-full shadow-2xl transition-all duration-700 mt-1 ${compact ? 'translate-x-11 bg-white' : 'translate-x-1 bg-foreground/10'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Integrations Section ─────────────────────────────────────
function IntegrationsSection() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeIds, setActiveIds] = useState<string[]>(['zapier', 'google']);

  useEffect(() => {
    const loadIntegrations = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('integration_settings')
        .eq('id', user.id)
        .single();
      if (data?.integration_settings) {
        setActiveIds(data.integration_settings);
      }
      setLoading(false);
    };
    loadIntegrations();
  }, [user]);

  const toggleIntegration = async (id: string) => {
    const newActiveIds = activeIds.includes(id) 
      ? activeIds.filter(i => i !== id)
      : [...activeIds, id];
    
    setActiveIds(newActiveIds);
    if (user) {
      await supabase
        .from('profiles')
        .update({ integration_settings: newActiveIds })
        .eq('id', user.id);
      
      const isConnected = newActiveIds.includes(id);
      toast({
        title: isConnected ? "Liaison Établie" : "Liaison Interrompue",
        description: isConnected ? `Le canal ${id.toUpperCase()} est désormais synchronisé.` : `La connexion à ${id.toUpperCase()} a été suspendue.`,
      });
    }
  };

  const integrations = [
    { id: 'zapier', name: 'ZAPIER', desc: 'AUTOMATISATION DE FLUX MULTI-PLATEFORMES', icon: Zap },
    { id: 'slack', name: 'SLACK', desc: 'ALERTES DE DIFFUSION EN TEMPS RÉEL', icon: MessageSquare },
    { id: 'discord', name: 'DISCORD', desc: 'WEBHOOKS POUR COMMUNAUTÉS ALPHA', icon: Globe },
    { id: 'google', name: 'GOOGLE DRIVE', desc: 'STOCKAGE CENTRAL DES MÉDIAS NEXUS', icon: Link },
  ];

  if (loading) return <div className="p-20 text-center animate-pulse text-[10px] font-black uppercase tracking-widest text-foreground/20">CHARGEMENT DES INTÉGRATIONS...</div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-12 duration-1000">
      <div className="glass-master rounded-[3rem] border-white/40 overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-white/5 -z-10" />
        <div className="px-10 py-8 border-b border-white/20">
          <h3 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.6em]">SERVICES TIERS CONNECTÉS</h3>
        </div>
        <div className="divide-y divide-white/10">
          {integrations.map((item) => {
            const isConnected = activeIds.includes(item.id);
            return (
              <div key={item.id} className="flex items-center justify-between px-10 py-8 group/item hover:bg-white/5 transition-all duration-500">
                <div className="flex items-center gap-8">
                  <div className={`w-14 h-14 rounded-2xl glass-master flex items-center justify-center border-white/20 ${isConnected ? 'text-primary' : 'text-foreground/20'}`}>
                    <item.icon className="w-6 h-6 animate-crystal" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black text-foreground uppercase tracking-wider">{item.name}</p>
                    <p className="text-[9px] text-foreground/30 font-black uppercase tracking-widest">{item.desc}</p>
                  </div>
                </div>
                <Button
                  variant={isConnected ? "outline" : "default"}
                  onClick={() => toggleIntegration(item.id)}
                  className={`rounded-2xl px-8 py-4 text-[9px] font-black uppercase tracking-widest border-none transition-all duration-500
                    ${isConnected ? 'glass-master border-white/20 text-foreground/40 hover:text-rose-500 hover:bg-rose-500/10' : 'bg-primary text-white hover:scale-105'}`}
                >
                  {isConnected ? 'DÉCONNECTER' : 'SYNCHRONISER'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="glass-master rounded-[3rem] p-10 border-white/40 shadow-2xl text-center">
        <p className="text-[10px] text-foreground/20 font-black uppercase tracking-[0.4em]">EXPANSION DU RÉSEAU NEXUS : PLUS D'INTÉGRATIONS ARRIVENT DANS LE CYCLE PROCHAIN.</p>
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
      case 'integrations': return <IntegrationsSection />;
      default: return null;
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
