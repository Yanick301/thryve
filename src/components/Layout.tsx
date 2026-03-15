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
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed width 280px */}
      <aside
        className={`fixed lg:relative z-50 lg:z-auto flex flex-col w-72 h-full bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="flex items-center px-5 h-16 border-b border-sidebar-border flex-shrink-0">
          <Logo className="scale-90 origin-left" />
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {SIDEBAR_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                    ${isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent'
                    }`}
                >
                  <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} size={18} />
                  <span>{link.label}</span>
                  {isActive && <ChevronRight className="ml-auto w-3.5 h-3.5 opacity-60" />}
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
        <div className="px-3 py-3 border-t border-sidebar-border">
          <div className="rounded-xl bg-muted/50 p-3 flex items-center gap-3">
            <Crown className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground capitalize">
                Plan {user?.plan || 'Starter'}
              </p>
              <p className="text-xs text-muted-foreground truncate">Passer à Agency →</p>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="px-3 py-3 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sidebar-accent transition-colors duration-150 group">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                    {user ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate(ROUTE_PATHS.SETTINGS)}>
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex-shrink-0 h-16 bg-background border-b border-border flex items-center justify-between px-4 sm:px-6">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1 md:gap-2 ml-auto">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  <p className="text-xs text-muted-foreground">{unreadCount} non lues</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors ${!notif.read ? 'bg-primary/3' : ''}`}
                    >
                      <div className="flex items-start gap-2">
                        {!notif.read && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        )}
                        <div className={!notif.read ? '' : 'pl-4'}>
                          <p className="text-sm font-medium text-foreground">{notif.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notif.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-2 rounded-xl hover:bg-muted transition-colors p-1.5">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                      {user ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium text-foreground">{user?.name?.split(' ')[0]}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate(ROUTE_PATHS.SETTINGS)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-h-0">
          <div className="flex h-full min-w-0">
            {/* Center Content - Independent Scroll - Takes remaining space */}
            <div className="flex-1 min-w-0 overflow-y-auto">
              <div className="min-h-full w-full">
                {children}
              </div>
            </div>

            {/* Right Panel (Desktop Command Center) - Fixed width 350px */}
            <aside className="hidden xl:flex flex-col w-[340px] 2xl:w-[380px] border-l border-border bg-card/40 backdrop-blur-xl overflow-y-auto">
              <div className="p-6 space-y-8">
                {/* AI Insights */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">AI Insights</h3>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/10">
                    <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                      "Votre engagement sur Threads a augmenté de 12% le matin. Essayez de publier à 8h demain."
                    </p>
                    <Button variant="link" className="p-0 h-auto text-xs text-primary font-bold mt-2">
                      Optimiser mon calendrier →
                    </Button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4">
                   <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Objectifs Hebdo</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Nouveaux abonnés', count: 124, target: 200, color: 'bg-primary' },
                      { label: 'Reach posts', count: 850, target: 1000, color: 'bg-accent' },
                    ].map((goal) => (
                      <div key={goal.label} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{goal.label}</span>
                          <span className="font-bold">{goal.count} / {goal.target}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${goal.color}`}
                            style={{ width: `${(goal.count / goal.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Up */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Prochain Post</h3>
                  </div>
                  <div className="bg-muted/40 rounded-2xl p-4 border border-border group hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-xl bg-card border border-border overflow-hidden flex-shrink-0">
                         {/* Placeholder for media preview */}
                         <div className="w-full h-full bg-muted animate-pulse" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">Collection Printemps 2026</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">H-4 | Instagram</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DeOs Tips */}
                <div className="bg-accent/5 rounded-2xl border border-accent/10 p-5 mt-auto">
                   <div className="flex items-center gap-2 text-accent mb-2">
                     <Target className="w-4 h-4" />
                     <span className="text-xs font-bold">Conseil DeOs</span>
                   </div>
                   <p className="text-xs text-muted-foreground leading-relaxed italic">
                     "La constance est la clé. Un post par jour vaut mieux qu'une explosion mensuelle."
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
