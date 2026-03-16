// ============================================================
// THRYVE — Auth Pages (Login, Register, Forgot Password)
// ============================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Zap, 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTE_PATHS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/Logo';
import { BackgroundVideo } from '@/components/BackgroundVideo';

// ─── Auth Wrapper ──────────────────────────────────────────────
function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex relative overflow-hidden bg-background selection:bg-primary/20">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-mesh opacity-30 -z-10" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] -z-10 animate-crystal" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] -z-10 animate-float" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 py-12 relative z-10 overflow-y-auto w-full">
        {/* Logo Container */}
        <div className="mb-12">
          <Link to={ROUTE_PATHS.HOME}>
            <Logo className="scale-125" />
          </Link>
        </div>

        {/* Master Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl glass-master p-12 lg:p-16 rounded-[4rem] border-white/40 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 -z-10" />
          {children}
        </motion.div>

        {/* Semantic Footer */}
        <p className="text-[10px] text-foreground/30 mt-12 font-black uppercase tracking-[0.5em] text-center">
          © 2026 THRYVE · BY DEOS
        </p>
      </div>

      {/* Decorative Side Decor (Desktop Elite) */}
      <div className="hidden xl:flex w-[500px] 2xl:w-[600px] h-screen relative overflow-hidden border-l border-white/40 glass-master">
        <BackgroundVideo 
          src="https://cdn.pixabay.com/vimeo/459039322/crystal-49938.mp4?width=1280&hash=d3e0f9b6c0e0b3b4f6b4f6b4f6b4f6b4f6b4f6b4"
          overlayOpacity={0.1}
        />
        <div className="relative z-10 flex flex-col justify-center px-12 2xl:px-20 w-full overflow-y-auto py-10">
          <div className="w-20 h-20 rounded-[2rem] glass-master flex items-center justify-center mb-8 border-white/50 shadow-inner shrink-0">
            <Zap className="w-10 h-10 text-primary animate-crystal" />
          </div>
          <h2 className="text-5xl 2xl:text-7xl font-black text-foreground mb-8 tracking-tighter uppercase leading-none">
            THRYVE<br />
            <span className="text-reveal text-3xl 2xl:text-5xl block mt-2">ACCÈS</span>
          </h2>
          <p className="text-foreground/40 text-[10px] font-black uppercase tracking-[0.4em] leading-relaxed mb-12">
            ENTREZ DANS L'ÈRE DU MULTI-RÉSEAUX OPTIMISÉ AVEC THRYVE.
          </p>

          <div className="space-y-6">
            {[
              { value: '12K+', label: 'SYNCHRO ALPHA' },
              { value: '2.4M+', label: 'PORTÉE TOTALE' },
              { value: '4.9/5', label: 'OPTIMISATION' },
            ].map(({ value, label }) => (
              <div key={label} className="glass-master px-8 py-6 2xl:px-10 2xl:py-8 rounded-[2.5rem] border-white/50 shadow-sm transition-transform hover:scale-105 group cursor-default">
                <p className="text-4xl 2xl:text-5xl font-black text-foreground tracking-tighter leading-none group-hover:text-primary transition-colors">{value}</p>
                <p className="text-[8px] 2xl:text-[9px] text-foreground/30 font-black uppercase tracking-[0.5em] mt-3">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Login Page Implementation ─────────────────────────────────
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('COORDONNÉES ABSENTES');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      setLoading(false);
      if (result.success) {
        navigate(ROUTE_PATHS.DASHBOARD);
      } else {
        setError(result.error || 'IDENTIFIANTS INVALIDES');
      }
    } catch (err: any) {
      setError('SIGNAL PERDU : ' + err.message);
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-6xl font-black text-foreground tracking-tighter uppercase leading-tight mb-4">
            RETOUR AU<br />
            <span className="text-reveal text-5xl">CONTRÔLE</span>
          </h1>
          <p className="text-[10px] text-foreground/40 mt-4 font-black uppercase tracking-[0.4em]">
            Authentification requise
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/10 text-destructive text-[10px] font-black uppercase tracking-widest px-8 py-5 rounded-[2rem] border border-destructive/20 text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/50 ml-8">IDENTIFIANT ALPHA (EMAIL)</Label>
            <div className="relative">
              <Mail className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                className="pl-20 h-20 rounded-[2.5rem] glass-master border-white/50 font-black tracking-widest text-xs focus:bg-white/10 focus:ring-primary/20 transition-all duration-500"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-8">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/50">CODE SECRET</Label>
              <Link to={ROUTE_PATHS.FORGOT_PASSWORD} className="text-[8px] text-primary font-black uppercase tracking-widest hover:underline">
                OUBLIÉ ?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-20 pr-20 h-20 rounded-[2.5rem] glass-master border-white/50 font-black text-xs focus:bg-white/10 focus:ring-primary/20 transition-all duration-500"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-20 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs bg-primary text-white hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl border-none mt-4"
            disabled={loading}
          >
            {loading ? (
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>DÉMARRER LA SESSION <ArrowRight className="ml-5 w-6 h-6" /></>
            )}
          </Button>
        </form>

        <div className="pt-10 border-t border-white/30 text-center space-y-10">
          <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest leading-relaxed">
            Nouveau sur Thryve ?{' '}
            <Link to={ROUTE_PATHS.REGISTER} className="text-primary hover:underline">
              CRÉER UN ACCÈS ALPHA
            </Link>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
}

// ─── Register Page Implementation ──────────────────────────────
export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('DONNÉES COMPROMISES');
      return;
    }
    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);
    if (result.success) {
      navigate(ROUTE_PATHS.DASHBOARD);
    } else {
      setError(result.error || 'ERREUR DE CRÉATION');
    }
  };

  return (
    <AuthWrapper>
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-6xl font-black text-foreground tracking-tighter uppercase leading-tight mb-4">
            REJOINDRE LE<br />
            <span className="text-reveal text-5xl">RÉSEAU</span>
          </h1>
          <p className="text-[10px] text-foreground/40 mt-4 font-black uppercase tracking-[0.4em]">
            Initialisation du profil Thryve
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-[10px] font-black uppercase tracking-widest px-8 py-5 rounded-[2rem] border border-destructive/20 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-8">DÉSIGNATION (NOM)</Label>
            <div className="relative">
              <User className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
              <Input
                id="name"
                placeholder="votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-20 h-16 rounded-[2rem] glass-master border-white/50 font-black tracking-widest text-xs"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-8">CANAL DE TRANSMISSION</Label>
            <div className="relative">
              <Mail className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                className="pl-20 h-16 rounded-[2rem] glass-master border-white/50 font-black tracking-widest text-xs"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-8">CLÉ DE CRYPTAGE</Label>
            <div className="relative">
              <Lock className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-20 pr-20 h-16 rounded-[2rem] glass-master border-white/50 font-black text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-foreground/30"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-20 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs bg-primary text-white hover:scale-105 transition-all duration-500 shadow-2xl border-none mt-8"
            disabled={loading}
          >
            {loading ? (
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'VALIDER ACCÈS THRYVE'
            )}
          </Button>
        </form>

        <p className="text-center text-[10px] text-foreground/40 font-black uppercase tracking-widest mt-12">
          Déjà identifié ?{' '}
          <Link to={ROUTE_PATHS.LOGIN} className="text-primary hover:underline">
            CONNEXION
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
}

// ─── Forgot Password Page Implementation ───────────────────────
export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  };

  return (
    <AuthWrapper>
      <div className="space-y-12">
        <Link
          to={ROUTE_PATHS.LOGIN}
          className="flex items-center gap-4 text-[10px] text-foreground/40 hover:text-primary transition-all font-black uppercase tracking-widest mb-10 group"
        >
          <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-3" />
          RETOUR THRYVE
        </Link>

        {!sent ? (
          <>
            <div className="text-center">
              <h1 className="text-6xl font-black text-foreground mb-8 tracking-tighter uppercase leading-tight">
                RÉCUPÉRATION<br />
                <span className="text-reveal text-5xl">DU SIGNAL</span>
              </h1>
              <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.4em]">
                Canal de réinitialisation sécurisé
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-8">EMAIL DE RÉFÉRENCE</Label>
                <div className="relative">
                  <Mail className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="alpha@thryve.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    className="pl-20 rounded-[2.5rem] h-20 glass-master border-white/50 font-black tracking-widest text-xs"
                    autoComplete="email"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-20 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl transition-all duration-700 hover:scale-105 active:scale-95 bg-primary text-white border-none"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'ÉMETTRE SIGNAL DE RÉCUPÉRATION'
                )}
              </Button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center flex flex-col items-center"
          >
            <div className="w-32 h-32 bg-primary/10 rounded-[3rem] flex items-center justify-center mb-12 border border-primary/20 shadow-xl">
              <CheckCircle2 className="w-16 h-16 text-primary animate-crystal" />
            </div>
            <h2 className="text-4xl font-black text-foreground mb-6 tracking-tighter uppercase">SIGNAL ÉMIS</h2>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.3em] leading-relaxed mb-12 px-12">
              Si votre canal <strong className="text-primary">{email}</strong> est reconnu, un signal intercepté apparaîtra dans votre boîte sous peu.
            </p>
            <Link to={ROUTE_PATHS.LOGIN}>
              <Button className="rounded-[2.5rem] glass-master border-white/50 font-black uppercase tracking-widest text-[10px] px-16 h-16 hover:scale-110 transition-all duration-500 shadow-xl">
                RÉINITIALISER LA SESSION
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </AuthWrapper>
  );
}
