// ============================================================
// THRYVE — Auth Pages (Login, Register, Forgot Password)
// ============================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Zap, ArrowLeft, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTE_PATHS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/Logo';

// ─── Auth Wrapper ──────────────────────────────────────────────
function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 py-12 bg-background">
        {/* Logo */}
        <Link to={ROUTE_PATHS.HOME} className="mb-10">
          <Logo />
        </Link>

        <div className="w-full max-w-md">{children}</div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground mt-8">
          © 2026 Thryve by <span className="font-bold text-foreground">DeOs</span>. Tous droits réservés.
        </p>
      </div>

      {/* Right Panel — Decorative */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-center items-center px-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #4F46E5 0%, #6D28D9 40%, #14B8A6 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

        <div className="relative text-white text-center max-w-sm z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-8">
            <Zap className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h2 className="text-3xl font-extrabold mb-4 tracking-tight">
            Votre présence sociale,<br />amplifiée
          </h2>
          <p className="text-white/70 leading-relaxed mb-8">
            Rejoignez 12 000+ créateurs et agences qui utilisent Thryve pour gérer leur contenu Instagram et Threads.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '12K+', label: 'Utilisateurs' },
              { value: '2.4M+', label: 'Posts publiés' },
              { value: '4.9/5', label: 'Satisfaction' },
              { value: '99.9%', label: 'Uptime' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/10 rounded-2xl p-4">
                <p className="text-2xl font-extrabold">{value}</p>
                <p className="text-white/60 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────
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
    console.log('[LoginUI] Form submitted with:', { email });
    setError('');
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      console.log('[LoginUI] result:', result);
      setLoading(false);
      if (result.success) {
        console.log('[LoginUI] Success, navigating to dashboard');
        navigate(ROUTE_PATHS.DASHBOARD);
      } else {
        console.error('[LoginUI] Expected failure:', result.error);
        setError(result.error || 'Email ou mot de passe incorrect.');
      }
    } catch (err: any) {
      console.error('[LoginUI] Catch error:', err);
      setError('Erreur technique: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-foreground mb-2">Bon retour ! 👋</h1>
          <p className="text-muted-foreground text-sm">
            Connectez-vous à votre espace Thryve
          </p>
        </div>

        {error && (
          <div className="bg-destructive/8 text-destructive text-sm px-4 py-3 rounded-xl border border-destructive/15 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 rounded-xl h-11"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
              <Link to={ROUTE_PATHS.FORGOT_PASSWORD} className="text-xs text-primary hover:underline font-medium">
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 rounded-xl h-11"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl font-bold text-sm"
            disabled={loading}
            style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Se connecter <ArrowRight className="ml-2 w-4 h-4" /></>
            )}
          </Button>
        </form>

        {/* Demo hint */}
        <div className="mt-4 p-3 bg-muted/50 rounded-xl border border-border">
          <p className="text-xs text-muted-foreground text-center">
            <span className="font-semibold">Démo :</span> Entrez n'importe quel email/mot de passe pour accéder au dashboard
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Pas encore de compte ?{' '}
          <Link to={ROUTE_PATHS.REGISTER} className="text-primary font-semibold hover:underline">
            Créer un compte
          </Link>
        </p>
      </motion.div>
    </AuthWrapper>
  );
}

// ─── Register Page ────────────────────────────────────────────
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
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);
    if (result.success) {
      if (result.error) {
        // Success but with a message (e.g. email confirmation)
        console.log('[Register] Success with info:', result.error);
        setError(result.error);
        return;
      }
      console.log('[Register] Success, navigating to dashboard');
      navigate(ROUTE_PATHS.DASHBOARD);
    } else {
      console.error('[Register] Failed:', result.error);
      setError(result.error || 'Une erreur est survenue lors de l\'inscription.');
    }
  };

  const features = [
    'Plan Starter gratuit pour toujours',
    'Aucune carte bancaire requise',
    'Accès immédiat au dashboard',
  ];

  return (
    <AuthWrapper>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-foreground mb-2">Créez votre compte 🚀</h1>
          <p className="text-muted-foreground text-sm">
            Rejoignez 12 000+ créateurs sur Thryve. Gratuit.
          </p>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-3 mb-6">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span>{f}</span>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-destructive/8 text-destructive text-sm px-4 py-3 rounded-xl border border-destructive/15 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium">Nom complet</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Sophie Martin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 rounded-xl h-11"
                autoComplete="name"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium">Email professionnel</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 rounded-xl h-11"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 6 caractères"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 rounded-xl h-11"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl font-bold text-sm mt-2"
            disabled={loading}
            style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Créer mon compte gratuit <ArrowRight className="ml-2 w-4 h-4" /></>
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          En vous inscrivant, vous acceptez nos{' '}
          <a href="#" className="text-primary hover:underline">CGU</a>{' '}
          et notre{' '}
          <a href="#" className="text-primary hover:underline">Politique de confidentialité</a>.
        </p>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Déjà un compte ?{' '}
          <Link to={ROUTE_PATHS.LOGIN} className="text-primary font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </motion.div>
    </AuthWrapper>
  );
}

// ─── Forgot Password Page ─────────────────────────────────────
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
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link
          to={ROUTE_PATHS.LOGIN}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Retour à la connexion
        </Link>

        {!sent ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-extrabold text-foreground mb-2">Mot de passe oublié ?</h1>
              <p className="text-muted-foreground text-sm">
                Pas de panique ! Entrez votre email et nous vous enverrons un lien de réinitialisation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">Votre email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="vous@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-xl h-11"
                    autoComplete="email"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-xl font-bold text-sm"
                disabled={loading}
                style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Envoyer le lien de réinitialisation'
                )}
              </Button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-xl font-extrabold text-foreground mb-3">Email envoyé ! ✉️</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Si un compte Thryve est associé à <strong>{email}</strong>, vous recevrez un email avec les instructions dans les prochaines minutes.
            </p>
            <p className="text-xs text-muted-foreground">
              Vérifiez vos spams si vous ne voyez rien sous 5 minutes.
            </p>
            <Link to={ROUTE_PATHS.LOGIN} className="mt-6 inline-block">
              <Button variant="outline" className="rounded-xl font-medium">
                Retour à la connexion
              </Button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </AuthWrapper>
  );
}
