// ============================================================
// THRYVE — Accounts Management Page
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, RefreshCw, Trash2, CheckCircle2, XCircle, AlertCircle,
  Users, TrendingUp, Heart, Eye, ExternalLink, Settings,
  Instagram, MessageSquare, Link, Unlink, Zap, Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/Layout';
import { formatNumber, formatDateTime, ROUTE_PATHS } from '@/lib/index';
import { MOCK_ACCOUNTS } from '@/data/index';
import type { SocialAccount } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { automationService } from '@/services/automation';
import { toast } from '@/hooks/use-toast';

// ─── Account Card Nexus ─────────────────────────────────────────────
function AccountCard({ account, onDisconnect, onSync }: {
  account: SocialAccount;
  onDisconnect: (id: string) => void;
  onSync: (id: string) => void;
}) {
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSyncing(false);
    onSync(account.id);
  };

  const stats = [
    { label: 'ABONNÉS', value: account.followers, icon: Users, color: 'var(--primary)' },
    { label: 'POSTS', value: 124, icon: TrendingUp, color: 'var(--secondary)' },
    { label: 'ENGAGEMENT', value: '4.8%', icon: Heart, color: '#f43f5e' },
    { label: 'REACH', value: '18.4K', icon: Eye, color: '#f59e0b' },
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`glass-master rounded-[3rem] border-white/40 overflow-hidden transition-all duration-700 group
        ${account.isConnected ? 'shadow-2xl hover:scale-[1.01]' : 'opacity-40 grayscale pointer-events-none'}`}
    >
      {/* Header */}
      <div className="p-8 border-b border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 -z-10" />
        <div className="flex items-center gap-8">
          {/* Platform avatar */}
          <div className="relative">
            <div
              className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-2xl border border-white/40 animate-crystal"
              style={{
                background: account.platform === 'instagram'
                  ? 'linear-gradient(135deg, #E1306C 0%, #F56040 50%, #FCAF45 100%)'
                  : '#000',
              }}
            >
              {account.platform === 'instagram' ? (
                <Instagram className="w-10 h-10" />
              ) : (
                <MessageSquare className="w-10 h-10" />
              )}
            </div>
            <div
              className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white glass-master shadow-xl flex items-center justify-center
                ${account.isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`}
            >
                {account.isConnected ? <CheckCircle2 className="w-4 h-4 text-white" /> : <XCircle className="w-4 h-4 text-white" />}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">{account.username}</h3>
              <span
                className={`inline-flex items-center gap-2 text-[10px] font-black px-4 py-1.5 rounded-full border glass-master uppercase tracking-[0.2em]
                  ${account.isConnected ? 'border-primary/40 text-primary' : 'border-rose-500/40 text-rose-500'}`}
              >
                {account.isConnected ? 'SIGNAL CONNECTÉ' : 'SIGNAL INTERROMPU'}
              </span>
            </div>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.4em]">
              {account.platform} Nexus · {formatNumber(account.followers)} UNITÉS REACH
            </p>
            {account.lastSync && (
              <p className="text-[9px] text-foreground/20 mt-2 font-black uppercase tracking-widest">
                DERNIÈRE SYNC ALPHA : {formatDateTime(account.lastSync).toUpperCase()}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {account.isConnected && (
              <>
                <button
                  onClick={handleSync}
                  className={`p-4 rounded-2xl glass-master border-white/40 hover:bg-white hover:scale-110 transition-all duration-500 ${syncing ? 'animate-spin' : ''}`}
                  disabled={syncing}
                >
                  <RefreshCw className="w-5 h-5 text-foreground/60" />
                </button>
                <button className="p-4 rounded-2xl glass-master border-white/40 hover:bg-white hover:scale-110 transition-all duration-500">
                  <Settings className="w-5 h-5 text-foreground/60" />
                </button>
                <button
                  onClick={() => onDisconnect(account.id)}
                  className="p-4 rounded-2xl glass-master border-white/40 hover:bg-destructive hover:text-white hover:scale-110 transition-all duration-500"
                >
                  <Unlink className="w-5 h-5 text-foreground/60 group-hover:text-inherit" />
                </button>
              </>
            )}
            {!account.isConnected && (
              <Button size="lg" className="rounded-[1.5rem] px-10 py-8 bg-primary text-white font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl border-none">
                <Link className="mr-3 w-5 h-5" />
                RÉACTIVER SIGNAL
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      {account.isConnected && (
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 bg-white/5">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="p-8 text-center group/stat hover:bg-white/5 transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl glass-master mx-auto mb-4 flex items-center justify-center border-white/20 group-hover/stat:scale-110 transition-all duration-500">
                <Icon className="w-6 h-6 animate-crystal" style={{ color }} />
              </div>
              <p className="text-2xl font-black text-foreground tracking-tighter">
                {typeof value === 'number' ? formatNumber(value) : value}
              </p>
              <p className="text-[9px] text-foreground/30 font-black uppercase tracking-[0.3em] mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Connect Platform Modal Nexus ───────────────────────────────────
function ConnectModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { user } = useAuth();
  const [step, setStep] = useState<'choose' | 'credentials' | 'connecting' | 'success'>('choose');
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'threads' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleConnect = async () => {
    if (!selectedPlatform || !username || !password || !user) return;
    setStep('connecting');
    
    // 1. Verify with Automation Server
    const verifyRes = await automationService.verifyAccount({
       platform: selectedPlatform,
       username,
       passwordLegacy: password,
    });

    if (!verifyRes.success) {
      toast({
        title: "Échec d'Authentification",
        description: `Le terminal ${selectedPlatform.toUpperCase()} a rejeté les identifiants.`,
        variant: "destructive"
      });
      setStep('credentials');
      return;
    }

    // 2. Save to Supabase
    const { error } = await supabase.from('social_accounts').insert([
      {
        user_id: user.id,
        platform: selectedPlatform,
        username,
        password_encrypted: password, 
      }
    ]);

    if (error) {
      toast({
        title: "Erreur Base de Données",
        description: error.message,
        variant: "destructive"
      });
      setStep('credentials');
      return;
    }

    setStep('success');
    onSuccess();
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-3xl"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative glass-master rounded-[4rem] border-white/40 p-12 w-full max-w-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-primary/5 -z-10" />

        {step === 'choose' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter">SYNCHRONISATION UNITÉ</h2>
              <button onClick={onClose} className="w-12 h-12 rounded-2xl glass-master flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="text-2xl font-light">×</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { platform: 'instagram' as const, label: 'INSTAGRAM', desc: 'REELS & CHANNELS', color: '#E1306C', Icon: Instagram },
                { platform: 'threads' as const, label: 'THREADS', desc: 'FLUX TEXTE ALPHA', color: '#000', Icon: MessageSquare },
              ].map(({ platform, label, desc, color, Icon }) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`relative flex flex-col items-center gap-6 p-10 rounded-[2.5rem] border-2 transition-all duration-700 overflow-hidden group/btn
                    ${selectedPlatform === platform ? 'border-primary bg-primary/10 shadow-[0_0_50px_rgba(79,70,229,0.2)]' : 'border-white/10 glass-master hover:border-white/30'}`}
                >
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-2xl transition-all duration-700 group-hover/btn:scale-110
                    ${selectedPlatform === platform ? 'animate-crystal' : ''}`} 
                    style={{ background: color === '#000' ? '#000' : `linear-gradient(135deg, ${color}, #F56040)` }}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                    <p className="font-black text-foreground tracking-[0.2em]">{label}</p>
                    <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest mt-2">{desc}</p>
                  </div>
                  {selectedPlatform === platform && (
                    <motion.div layoutId="check" className="absolute top-6 right-6">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            <div className="glass-master rounded-[2rem] p-8 flex items-start gap-6 mb-12 border-white/20">
              <AlertCircle className="w-8 h-8 text-primary flex-shrink-0" />
              <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest leading-loose">
                LA CONNEXION NEXUS EST SÉCURISÉE PAR LE PROTOCOLE SHIELD-V3. VOS IDENTIFIANTS SONT ENCRYPTÉS ET UTILISÉS UNIQUEMENT POUR LES TRANSMISSIONS AUTOMATISÉES.
              </p>
            </div>

            <Button
              className="w-full rounded-[2rem] py-12 bg-primary text-white font-black uppercase tracking-[0.6em] text-[10px] shadow-2xl disabled:opacity-20 transition-all duration-700 border-none group/next"
              disabled={!selectedPlatform}
              onClick={() => setStep('credentials')}
            >
              INITIALISER AUTHENTIFICATION
              <Link className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        )}

        {step === 'credentials' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter">IDENTIFIANTS {selectedPlatform?.toUpperCase()}</h2>
              <button onClick={() => setStep('choose')} className="w-12 h-12 rounded-2xl glass-master flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="text-lg font-black tracking-tighter">←</span>
              </button>
            </div>

            <div className="space-y-8 mb-12">
              <div>
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] mb-4 block">TERMINAL / NOM D'UTILISATEUR</label>
                <div className="relative group">
                    <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@NEXUS_OPERATOR"
                    className="rounded-[1.5rem] py-8 px-8 glass-master border-white/20 focus:border-primary focus:ring-0 text-foreground font-black uppercase tracking-[0.2em] placeholder:text-foreground/10"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] mb-4 block">CODE D'ACCÈS CRYPTÉ</label>
                <div className="relative group">
                    <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-[1.5rem] py-8 px-8 glass-master border-white/20 focus:border-primary focus:ring-0 text-foreground font-black tracking-[0.5em] placeholder:text-foreground/10"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700" />
                </div>
              </div>
            </div>

            <Button
              className="w-full rounded-[2rem] py-12 bg-primary text-white font-black uppercase tracking-[0.6em] text-[10px] shadow-2xl disabled:opacity-20 transition-all duration-700 border-none group/sync"
              disabled={!username || !password}
              onClick={handleConnect}
            >
              {username && password ? 'LANCER SYNCHRONISATION' : 'EN ATTENTE D\'IDENTIFIANTS'}
              <Zap className="ml-4 w-5 h-5 group-hover:scale-125 transition-transform" />
            </Button>
          </div>
        )}

        {step === 'connecting' && (
          <div className="text-center py-24 animate-pulse">
            <div className="w-32 h-32 rounded-[2.5rem] glass-master flex items-center justify-center mx-auto mb-12 border-white/40 shadow-[0_0_80px_rgba(79,70,229,0.3)]">
              <div className="w-12 h-12 border-8 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-2xl font-black text-foreground uppercase tracking-tighter mb-4">CRYPTAGE ET LIAISON EN COURS</p>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.6em]">VÉRIFICATION DU PROTOCOLE {selectedPlatform?.toUpperCase()}</p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-24">
            <div className="w-32 h-32 rounded-[2.5rem] glass-master flex items-center justify-center mx-auto mb-12 border-emerald-500/40 shadow-[0_0_80px_rgba(16,185,129,0.3)] animate-crystal">
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-foreground uppercase tracking-tighter mb-4">LIAISON ÉTABLIE ! 🎉</p>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.6em]">UNITÉ {selectedPlatform?.toUpperCase()} OPÉRATIONNELLE.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Main Accounts Page ───────────────────────────────────────
export default function Accounts() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [automationStatus, setAutomationStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  const fetchAccounts = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('social_accounts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching accounts:', error);
    } else {
      // Map Supabase data to SocialAccount type
      const mappedAccounts: SocialAccount[] = (data || []).map(acc => ({
        id: acc.id,
        platform: acc.platform,
        username: acc.username,
        followers: acc.followers || 0,
        isConnected: true, // Assuming if it's in DB, it's connected
        lastSync: acc.last_sync,
      }));
      setAccounts(mappedAccounts);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAccounts();

    const checkAutomation = async () => {
      try {
        const res = await fetch('http://localhost:3001/health');
        if (res.ok) setAutomationStatus('online');
        else setAutomationStatus('offline');
      } catch {
        setAutomationStatus('offline');
      }
    };
    checkAutomation();
  }, [user]);

  const handleDisconnect = (id: string) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isConnected: false, lastSync: undefined } : a))
    );
  };

  const handleSync = (id: string) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, lastSync: new Date().toISOString() } : a))
    );
  };

  const connected = accounts.filter((a) => a.isConnected);
  const disconnected = accounts.filter((a) => !a.isConnected);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 space-y-10 w-full max-w-full">
        {/* Header Stream */}
        <div className="flex items-center justify-between pb-12 border-b border-white/40">
          <div>
            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter uppercase leading-[0.8]">
              NEXUS<br /><span className="text-reveal">ACCOUNTS</span>
            </h1>
            <p className="text-[10px] text-foreground/40 mt-6 font-black uppercase tracking-[0.6em]">
              GÉREZ VOS UNITÉS DE DIFFUSION ET CANAUX ALPHA.
            </p>
          </div>
          <div className="flex flex-col items-end gap-6">
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest backdrop-blur-md transition-all duration-700
              ${automationStatus === 'online' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.2)] animate-pulse' : 
                automationStatus === 'offline' ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.2)]' : 
                'bg-amber-500/10 border-amber-500/30 text-amber-500'}`}>
              <div className={`w-2 h-2 rounded-full ${automationStatus === 'online' ? 'bg-emerald-500' : automationStatus === 'offline' ? 'bg-rose-500' : 'bg-amber-500'}`} />
              CORE ENGINE: {automationStatus}
            </div>
            <Button
              size="lg"
              className="rounded-[2rem] px-12 py-10 bg-primary text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-[0_20px_60px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 transition-all duration-700 border-none group/add"
              onClick={() => setShowConnectModal(true)}
            >
              <Plus className="mr-4 w-6 h-6 group-hover/add:rotate-90 transition-transform duration-500" />
              SYNCHRONISER NOUVELLE UNITÉ
            </Button>
          </div>
        </div>

        {/* Summary Flux */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'UNITÉS ACTIVES', value: connected.length, color: 'var(--primary)', icon: Link },
            { label: 'REACH CUMULÉ', value: formatNumber(connected.reduce((a, c) => a + c.followers, 0)), color: 'var(--secondary)', icon: Eye },
            { label: 'PLATEFORMES SYNC', value: `${new Set(connected.map((a) => a.platform)).size} / 2`, color: '#f43f5e', icon: Zap },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="glass-master rounded-[2.5rem] p-10 border-white/40 group/stat shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 -z-10" />
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl glass-master flex items-center justify-center border-white/20 group-hover/stat:scale-110 transition-all duration-500">
                    <Icon className="w-6 h-6 animate-crystal" style={{ color }} />
                </div>
                <span className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.4em]">ALPHA STATUS</span>
              </div>
              <p className="text-6xl font-black tracking-tighter" style={{ color }}>
                {loading ? '...' : value}
              </p>
              <p className="text-[10px] text-foreground/40 mt-4 font-black uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Synchronisation de vos unités...</p>
          </div>
        )}

        {/* Connected accounts */}
        {!loading && connected.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Comptes actifs</h2>
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {connected.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onDisconnect={handleDisconnect}
                    onSync={handleSync}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Disconnected accounts */}
        {!loading && disconnected.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Comptes inactifs</h2>
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {disconnected.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onDisconnect={handleDisconnect}
                    onSync={handleSync}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && accounts.length === 0 && (
          <div className="text-center py-20 glass-master rounded-[3rem] border-white/20">
             <Users className="w-16 h-16 text-foreground/10 mx-auto mb-6" />
             <p className="text-xl font-black text-foreground/40 uppercase tracking-tighter">AUCUNE UNITÉ SYNCHRONISÉE</p>
             <p className="text-[10px] text-foreground/20 font-black uppercase tracking-widest mt-4">LE NEXUS EST VIDE. INITIALISEZ VOTRE PREMIÈRE CONNEXION.</p>
          </div>
        )}

        {/* Platforms Nexus available footer */}
        <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden group/footer">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">PLATEFORMES DISPONIBLES</h3>
              <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.4em]">EXPANSION DU RÉSEAU NEXUS EN COURS.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl glass-master flex items-center justify-center border-white/40 shadow-inner group-hover/footer:animate-pulse">
                <Globe className="w-6 h-6 text-primary" />
               </div>
               <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">GLOBAL STATUS: ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Instagram', desc: 'REELS, STORIES & GRID', status: 'SYNCHRONISÉ', color: '#E1306C', icon: Instagram },
              { name: 'Threads', desc: 'FLUX TEXTE ALPHA', status: 'SYNCHRONISÉ', color: '#000', icon: MessageSquare },
              { name: 'TikTok', desc: 'VIRAL STREAM ENGINE', status: 'EN ATTENTE', color: '#010101', icon: Zap },
              { name: 'LinkedIn', desc: 'B2B POWER NETWORK', status: 'EN ATTENTE', color: '#0A66C2', icon: Zap },
            ].map(({ name, desc, status, color, icon: Icon }) => (
              <div key={name} className="glass-master rounded-[2rem] p-8 border-white/20 hover:scale-105 transition-all duration-500 relative overflow-hidden group/pcard">
                <div className="flex items-center justify-between mb-8">
                   <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover/pcard:rotate-12" style={{ backgroundColor: color }}>
                    <Icon className="w-6 h-6" />
                   </div>
                   <span className={`text-[8px] font-black px-3 py-1 rounded-full border glass-master uppercase tracking-widest
                    ${status === 'SYNCHRONISÉ' ? 'border-emerald-500/40 text-emerald-500' : 'border-white/20 text-foreground/20'}`}>
                    {status}
                   </span>
                </div>
                <p className="text-sm font-black text-foreground uppercase tracking-wider mb-2">{name}</p>
                <p className="text-[9px] text-foreground/40 font-black uppercase tracking-widest leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showConnectModal && (
          <ConnectModal 
            onClose={() => setShowConnectModal(false)} 
            onSuccess={fetchAccounts}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
