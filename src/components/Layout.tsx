// ============================================================
// THRYVE — Landing Page Layout (Header + Footer)
// ============================================================

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, LayoutDashboard, Images, PlusSquare, Calendar, 
  BarChart3, Users, Settings, Bell, ChevronRight, LogOut, Crown, 
  TrendingUp, Sparkles, Clock, Target, PlusCircle, Heart, MessageCircle, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/lib/index';
import { Logo, DeOsBranding } from './Logo';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MOCK_NOTIFICATIONS } from '@/data/index';

// ─── Nav links ───────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Témoignages', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

// ─── Header ──────────────────────────────────────────────────
export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTE_PATHS.HOME}>
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 rounded-lg hover:bg-muted/60"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to={ROUTE_PATHS.LOGIN}>
              <Button variant="ghost" size="sm" className="font-medium">
                Se connecter
              </Button>
            </Link>
            <Link to={ROUTE_PATHS.REGISTER}>
              <Button
                size="sm"
                className="font-semibold shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                }}
              >
                Commencer gratuitement
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-white border-b border-border px-4 pb-4"
          >
            <nav className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-3 border-t border-border mt-3">
              <Link to={ROUTE_PATHS.LOGIN} onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full">Se connecter</Button>
              </Link>
              <Link to={ROUTE_PATHS.REGISTER} onClick={() => setMenuOpen(false)}>
                <Button className="w-full font-semibold" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)' }}>
                  Commencer gratuitement
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────────
export function LandingFooter() {
  const currentYear = 2026;

  const footerLinks = {
    Produit: [
      { label: 'Fonctionnalités', href: '#features' },
      { label: 'Tarifs', href: '#pricing' },
      { label: 'Témoignages', href: '#testimonials' },
      { label: 'Changelog', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
    Ressources: [
      { label: 'Documentation', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Support', href: '#' },
    ],
    Entreprise: [
      { label: 'À propos', href: '#' },
      { label: 'Carrières', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Presse', href: '#' },
    ],
    Légal: [
      { label: 'Confidentialité', href: '#' },
      { label: 'CGU', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'RGPD', href: '#' },
    ],
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2">
            <Link to={ROUTE_PATHS.HOME} className="inline-block mb-4">
              <Logo className="text-white" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              La plateforme sociale des créateurs qui veulent grandir sans effort.
              Programmez, publiez, analysez.
            </p>
            <DeOsBranding />
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm text-white/40">
            © {currentYear} Thryve by DeOs. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/30">Fait avec ❤️ pour les créateurs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Dashboard Layout ─────────────────────────────────────────
const SIDEBAR_LINKS = [
  { label: 'Vue d\'ensemble', href: ROUTE_PATHS.DASHBOARD, icon: LayoutDashboard },
  { label: 'Bibliothèque', href: ROUTE_PATHS.MEDIA, icon: Images },
  { label: 'Créer un post', href: ROUTE_PATHS.CREATE_POST, icon: PlusSquare },
  { label: 'Calendrier', href: ROUTE_PATHS.CALENDAR, icon: Calendar },
  { label: 'Analytics', href: ROUTE_PATHS.ANALYTICS, icon: BarChart3 },
  { label: 'Comptes', href: ROUTE_PATHS.ACCOUNTS, icon: Users },
  { label: 'Paramètres', href: ROUTE_PATHS.SETTINGS, icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate(ROUTE_PATHS.HOME);
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const planBadgeColor: Record<string, string> = {
    free: 'bg-muted text-muted-foreground',
    pro: 'bg-primary/10 text-primary',
    agency: 'bg-accent/10 text-accent',
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <div className="absolute inset-0 bg-mesh opacity-30 -z-10" />
      
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-md md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed width 280px */}
      <aside
        className={`fixed lg:relative z-50 lg:z-auto flex flex-col w-80 h-full glass-master border-r border-white/40 transition-transform duration-500 ease-in-out shadow-2xl
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="flex items-center px-8 h-24 border-b border-white/40 flex-shrink-0">
          <Logo className="scale-110 origin-left" />
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-8 px-4 custom-scrollbar">
          <div className="space-y-3">
            {SIDEBAR_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-3xl text-sm font-black transition-all duration-500 group relative overflow-hidden
                    ${isActive
                      ? 'bg-primary text-white shadow-xl scale-105'
                      : 'text-foreground/40 hover:text-foreground hover:bg-white/40'
                    }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-500 group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
                  <span className="uppercase tracking-[0.2em]">{link.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]"
                    />
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Branding Sticky */}
        <div className="px-5 py-3 border-t border-sidebar-border mt-auto">
          <div className="flex justify-center">
            <DeOsBranding />
          </div>
        </div>

        {/* Plan Badge */}
        <div className="px-6 py-4">
          <div className="rounded-[2.5rem] glass-master p-6 flex items-center gap-4 relative overflow-hidden border-white/50 shadow-inner group cursor-pointer hover:scale-105 transition-all duration-700">
            <div className="absolute inset-0 bg-primary/5 -z-10" />
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Crown className="w-6 h-6 text-primary animate-crystal" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-foreground uppercase tracking-widest">
                {user?.plan || 'Starter'} ALPHA
              </p>
              <p className="text-[8px] text-primary font-black uppercase tracking-[0.3em] mt-1">Upgrade →</p>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="px-4 py-6 border-t border-white/40">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-4 px-4 py-3 rounded-[2rem] glass-master border-white/50 hover:bg-white/20 transition-all duration-500 group shadow-sm">
                <Avatar className="w-10 h-10 flex-shrink-0 border-2 border-white/50 shadow-inner">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary font-black uppercase tracking-widest">
                    {user ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-black text-foreground uppercase tracking-widest truncate">{user?.name}</p>
                  <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest truncate">{user?.plan} ALPHA</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 glass-master border-white/40 p-2 rounded-3xl shadow-2xl">
              <DropdownMenuItem onClick={() => navigate(ROUTE_PATHS.SETTINGS)} className="rounded-2xl p-4 font-black uppercase tracking-widest text-[10px]">
                <Settings className="mr-3 h-4 w-4 text-primary" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/40 my-2" />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive rounded-2xl p-4 font-black uppercase tracking-widest text-[10px]">
                <LogOut className="mr-3 h-4 w-4" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex-shrink-0 h-24 bg-white/20 backdrop-blur-3xl border-b border-white/40 flex items-center justify-between px-8 relative z-30">
          <button
            className="lg:hidden p-3 rounded-2xl glass-master border-white/50 hover:bg-white/40 transition-all duration-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>

          <div className="flex items-center gap-6 ml-auto">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative w-12 h-12 rounded-2xl glass-master border-white/50 hover:bg-white/40 transition-all duration-500 flex items-center justify-center group shadow-sm">
                  <Bell className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-[10px] text-white font-black flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 glass-master border-white/40 p-4 rounded-[2rem] shadow-2xl mt-4">
                <div className="px-6 py-4 border-b border-white/40 mb-2">
                  <h3 className="font-black text-xs uppercase tracking-widest">Notifications</h3>
                  <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest mt-1">{unreadCount} non lues</p>
                </div>
                <div className="max-h-96 overflow-y-auto custom-scrollbar px-2">
                  {MOCK_NOTIFICATIONS.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-6 py-4 rounded-2xl mb-2 hover:bg-white/40 transition-all duration-500 cursor-pointer border border-transparent hover:border-white/50 ${!notif.read ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 shadow-[0_0_10px_currentColor] ${!notif.read ? 'bg-primary text-primary' : 'bg-transparent'}`} />
                        <div>
                          <p className="text-xs font-black text-foreground uppercase tracking-widest">{notif.title}</p>
                          <p className="text-[10px] text-foreground/50 font-bold mt-1 leading-relaxed">{notif.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar Nexus */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-4 pl-4 pr-10 py-3 rounded-[1.5rem] glass-master border-white/40 hover:bg-white/40 transition-all duration-700 group shadow-lg">
                  <Avatar className="w-8 h-8 border-2 border-white/50 shadow-inner">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-[10px] bg-primary/20 text-primary font-black uppercase tracking-widest">
                      {user ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-[10px] font-black text-foreground uppercase tracking-[0.4em]">{user?.name?.split(' ')[0]}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 glass-master border-white/40 p-2 rounded-3xl shadow-2xl mt-4">
                <DropdownMenuItem onClick={() => navigate(ROUTE_PATHS.SETTINGS)} className="rounded-2xl p-4 font-black uppercase tracking-widest text-[10px]">
                  <Settings className="mr-3 h-4 w-4 text-primary" />
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/40 my-2" />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive rounded-2xl p-4 font-black uppercase tracking-widest text-[10px]">
                  <LogOut className="mr-3 h-4 w-4" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-h-0 relative">
          <div className="flex h-full min-w-0">
            {/* Center Content - Independent Scroll */}
            <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
              <div className="min-h-full w-full">
                {children}
              </div>
            </div>

            {/* Right Panel (Desktop Command Center Nexus) */}
            <aside className="hidden xl:flex flex-col w-[360px] 2xl:w-[420px] glass-master border-l border-white/40 overflow-y-auto relative z-20">
              <div className="absolute inset-0 bg-primary/5 -z-10" />
              <div className="p-10 space-y-12">
                {/* AI Insights Alpha */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-primary">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.6em]">NEXUS ANALYTICA</h3>
                  </div>
                  <div className="glass-master rounded-[2.5rem] p-8 border-white/40 shadow-2xl relative overflow-hidden group/insight">
                    <div className="absolute inset-0 bg-primary/10 -z-10 animate-crystal" />
                    <p className="text-[11px] text-foreground font-black uppercase tracking-widest leading-loose">
                      "FRACTIONNEMENT DU FLUX DÉTECTÉ SUR THREADS (+12%). OPTIMISATION DU SIGNAL RECOMMANDÉE À 08:00."
                    </p>
                    <Button variant="link" className="p-0 h-auto text-[9px] text-primary font-black uppercase tracking-[0.4em] mt-6 hover:translate-x-2 transition-transform">
                      LANCER OPTIMISATION →
                    </Button>
                  </div>
                </div>

                {/* Quick Stats Rays */}
                <div className="space-y-6">
                   <div className="flex items-center gap-4 text-foreground/40">
                    <TrendingUp className="w-5 h-5" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.6em]">VECTEURS DE CROISSANCE</h3>
                  </div>
                  <div className="space-y-8">
                    {[
                      { label: 'OPÉRATEURS REJOINTS', count: 124, target: 200, color: 'var(--primary)' },
                      { label: 'RAYONNEMENT SIGNAL', count: 850, target: 1000, color: 'var(--secondary)' },
                    ].map((goal) => (
                      <div key={goal.label} className="space-y-3">
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                          <span className="text-foreground/40">{goal.label}</span>
                          <span className="text-foreground">{goal.count} / {goal.target}</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(goal.count / goal.target) * 100}%` }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                            style={{ backgroundColor: goal.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Transmission */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-foreground/40">
                    <Clock className="w-5 h-5" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.6em]">PROCHAINE TRANSMISSION</h3>
                  </div>
                  <div className="glass-master rounded-[2.5rem] p-6 border-white/20 hover:border-primary/40 transition-all duration-700 cursor-pointer group/next shadow-xl">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 rounded-2xl glass-master border-white/40 overflow-hidden flex-shrink-0 animate-pulse">
                         <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-black text-foreground uppercase tracking-widest truncate">SPRING COLLECTION ALPHA</p>
                        <p className="text-[9px] text-primary font-black uppercase tracking-[0.4em] mt-2 italic">H-4 | INSTAGRAM UNIT</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DeOs Nexus Tips */}
                <div className="glass-master rounded-[2rem] border-secondary/20 p-8 mt-auto shadow-2xl relative overflow-hidden">
                   <div className="absolute inset-0 bg-secondary/5 -z-10" />
                   <div className="flex items-center gap-4 text-secondary mb-6">
                     <Target className="w-5 h-5" />
                     <span className="text-[10px] font-black uppercase tracking-[0.6em]">PROTOCOLE ALPHA</span>
                   </div>
                   <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest leading-loose italic">
                     "LA PERSISTANCE DU SIGNAL EST LE FONDEMENT DE L'EXPANSION. UNE TRANSMISSION QUOTIDIENNE EST PRÉFÉRABLE À UNE SATURATION PONCTUELLE."
                   </p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
