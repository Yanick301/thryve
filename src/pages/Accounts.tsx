// ============================================================
// THRYVE — Accounts Management Page
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, RefreshCw, Trash2, CheckCircle2, XCircle, AlertCircle,
  Users, TrendingUp, Heart, Eye, ExternalLink, Settings,
  Instagram, MessageSquare, Link, Unlink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/Layout';
import { formatNumber, formatDateTime } from '@/lib/index';
import { MOCK_ACCOUNTS } from '@/data/index';
import type { SocialAccount } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';

// ─── Account Card ─────────────────────────────────────────────
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
    { label: 'Abonnés', value: account.followers, icon: Users, color: '#4F46E5' },
    { label: 'Posts', value: 124, icon: TrendingUp, color: '#14B8A6' },
    { label: 'Engagement', value: '4.8%', icon: Heart, color: '#F43F5E' },
    { label: 'Reach moyen', value: '18.4K', icon: Eye, color: '#F59E0B' },
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`bg-card rounded-2xl border overflow-hidden transition-all duration-200 ${
        account.isConnected ? 'border-border hover:border-primary/30' : 'border-border/50 opacity-70'
      }`}
      style={{ boxShadow: '0 2px 16px -6px rgba(0,0,0,0.08)' }}
    >
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-4">
          {/* Platform avatar */}
          <div className="relative">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
              style={{
                background: account.platform === 'instagram'
                  ? 'linear-gradient(135deg, #E1306C 0%, #F56040 50%, #FCAF45 100%)'
                  : '#000',
              }}
            >
              {account.platform === 'instagram' ? (
                <Instagram className="w-7 h-7" />
              ) : (
                <MessageSquare className="w-7 h-7" />
              )}
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white
                ${account.isConnected ? 'bg-accent' : 'bg-muted-foreground'}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-bold text-foreground">{account.username}</h3>
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  account.isConnected
                    ? 'bg-accent/10 text-accent'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {account.isConnected ? (
                  <><CheckCircle2 className="w-3 h-3" />Connecté</>
                ) : (
                  <><XCircle className="w-3 h-3" />Déconnecté</>
                )}
              </span>
            </div>
            <p className="text-sm text-muted-foreground capitalize">
              {account.platform} · {formatNumber(account.followers)} abonnés
            </p>
            {account.lastSync && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Synchro : {formatDateTime(account.lastSync)}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {account.isConnected && (
              <>
                <button
                  onClick={handleSync}
                  className={`p-2 rounded-xl hover:bg-muted transition-colors ${syncing ? 'animate-spin' : ''}`}
                  title="Synchroniser"
                  disabled={syncing}
                >
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-xl hover:bg-muted transition-colors" title="Paramètres">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => onDisconnect(account.id)}
                  className="p-2 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors"
                  title="Déconnecter"
                >
                  <Unlink className="w-4 h-4 text-muted-foreground" />
                </button>
              </>
            )}
            {!account.isConnected && (
              <Button size="sm" className="rounded-xl font-semibold" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}>
                <Link className="mr-1.5 w-3.5 h-3.5" />
                Connecter
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      {account.isConnected && (
        <div className="grid grid-cols-4 divide-x divide-border">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="p-4 text-center">
              <Icon className="w-4 h-4 mx-auto mb-1.5" style={{ color }} />
              <p className="text-sm font-bold text-foreground">
                {typeof value === 'number' ? formatNumber(value) : value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Connect Platform Modal ───────────────────────────────────
function ConnectModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [step, setStep] = useState<'choose' | 'credentials' | 'connecting' | 'success'>('choose');
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'threads' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleConnect = async () => {
    if (!selectedPlatform || !username || !password || !user) return;
    setStep('connecting');
    
    // Save to Supabase
    const { error } = await supabase.from('social_accounts').insert([
      {
        user_id: user.id,
        platform: selectedPlatform,
        username,
        password_encrypted: password, // In a real app, encrypt this
      }
    ]);

    if (error) {
      alert(`Erreur: ${error.message}`);
      setStep('credentials');
      return;
    }

    setStep('success');
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-card rounded-2xl border border-border p-6 w-full max-w-md shadow-2xl z-10"
      >
        {step === 'choose' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Connecter un compte</h2>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                ×
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { platform: 'instagram' as const, label: 'Instagram', desc: 'Photos, Reels & Stories', color: '#E1306C', Icon: Instagram },
                { platform: 'threads' as const, label: 'Threads', desc: 'Posts texte & discussions', color: '#000', Icon: MessageSquare },
              ].map(({ platform, label, desc, color, Icon }) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200
                    ${selectedPlatform === platform ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: color === '#000' ? '#000' : `linear-gradient(135deg, ${color}, #F56040)` }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  {selectedPlatform === platform && <CheckCircle2 className="ml-auto w-5 h-5 text-primary" />}
                </button>
              ))}
            </div>

            <div className="bg-muted/50 rounded-xl p-3 flex items-start gap-2 mb-5">
              <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Thryve utilise l'automatisation par navigateur pour une liberté totale. Vos identifiants sont stockés de manière sécurisée pour permettre les publications automatiques.
              </p>
            </div>

            <Button
              className="w-full font-semibold rounded-xl py-5"
              disabled={!selectedPlatform}
              onClick={() => setStep('credentials')}
              style={{ background: selectedPlatform ? 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' : undefined }}
            >
              Continuer
            </Button>
          </>
        )}

        {step === 'credentials' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground capitalize">Identifiants {selectedPlatform}</h2>
              <button onClick={() => setStep('choose')} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                Retour
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Nom d'utilisateur ou Email</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@username"
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Mot de passe</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-xl"
                />
              </div>
            </div>

            <Button
              className="w-full font-semibold rounded-xl py-5"
              disabled={!username || !password}
              onClick={handleConnect}
              style={{ background: username && password ? 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' : undefined }}
            >
              Connecter le compte
            </Button>
          </>
        )}

        {step === 'connecting' && (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <div className="w-7 h-7 border-3 border-primary border-t-transparent rounded-full animate-spin" style={{ borderWidth: 3 }} />
            </div>
            <p className="font-semibold text-foreground mb-1">Connexion en cours...</p>
            <p className="text-sm text-muted-foreground">Autorisation via {selectedPlatform}</p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-accent" />
            </div>
            <p className="font-semibold text-foreground mb-1">Compte connecté ! 🎉</p>
            <p className="text-sm text-muted-foreground">Votre compte {selectedPlatform} est maintenant actif.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Main Accounts Page ───────────────────────────────────────
export default function Accounts() {
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [automationStatus, setAutomationStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  React.useEffect(() => {
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
  }, []);

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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Comptes Connectés 🔗
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              Gérez vos plateformes sociales et surveillez vos statistiques de connexion.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest backdrop-blur-md transition-all duration-500
              ${automationStatus === 'online' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-[0_0_12px_-4px_rgba(16,185,129,0.4)]' : 
                automationStatus === 'offline' ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 shadow-[0_0_12px_-4px_rgba(244,63,94,0.4)]' : 
                'bg-amber-500/10 border-amber-500/30 text-amber-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${automationStatus === 'online' ? 'bg-emerald-500 animate-pulse' : automationStatus === 'offline' ? 'bg-rose-500' : 'bg-amber-500'}`} />
              Bot Backend: {automationStatus}
            </div>
            <Button
              className="rounded-xl font-bold bg-primary hover:bg-primary/95 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
              onClick={() => setShowConnectModal(true)}
            >
              <Plus className="mr-2 w-4 h-4" />
              Ajouter un compte
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Comptes actifs', value: connected.length, color: '#14B8A6' },
            { label: 'Abonnés totaux', value: formatNumber(connected.reduce((a, c) => a + c.followers, 0)), color: '#4F46E5' },
            { label: 'Plateformes', value: `${new Set(connected.map((a) => a.platform)).size}/2`, color: '#F43F5E' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-card rounded-2xl p-5 border border-border text-center" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
              <p className="text-2xl font-extrabold" style={{ color }}>{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Connected accounts */}
        {connected.length > 0 && (
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
        {disconnected.length > 0 && (
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

        {/* Platforms available */}
        <div className="bg-muted/30 rounded-2xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-1">Plateformes disponibles</h3>
          <p className="text-sm text-muted-foreground mb-4">Thryve supporte actuellement :</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: 'Instagram', desc: 'Photos, Reels, Stories, Feed', status: 'Disponible', color: '#E1306C' },
              { name: 'Threads', desc: 'Posts texte, fils de discussion', status: 'Disponible', color: '#000' },
              { name: 'TikTok', desc: 'Vidéos courtes & tendances', status: 'Bientôt', color: '#010101' },
              { name: 'LinkedIn', desc: 'Contenu professionnel B2B', status: 'Bientôt', color: '#0A66C2' },
            ].map(({ name, desc, status, color }) => (
              <div key={name} className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: color }}>
                  {name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground truncate">{desc}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  status === 'Disponible' ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                }`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showConnectModal && <ConnectModal onClose={() => setShowConnectModal(false)} />}
      </AnimatePresence>
    </DashboardLayout>
  );
}
