// ============================================================
// THRYVE — Main App Router
// ============================================================

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/lib/index';
import { useAuth, AuthProvider } from '@/hooks/useAuth';

// Pages
import Home from '@/pages/Home';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import MediaLibrary from '@/pages/MediaLibrary';
import CreatePost from '@/pages/CreatePost';
import CalendarPage from '@/pages/Calendar';
import Analytics from '@/pages/Analytics';
import Accounts from '@/pages/Accounts';
import SettingsPage from '@/pages/Settings';

// ─── Protected Route wrapper ──────────────────────────────────
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('[Route] ProtectedRoute:', { isAuthenticated, isLoading, path: window.location.pathname });

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('[Route] Not authenticated, redirecting to login');
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }
  return <>{children}</>;
}

// ─── Public Route (redirect if logged in) ─────────────────────
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('[Route] PublicRoute:', { isAuthenticated, isLoading, path: window.location.pathname });

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    console.log('[Route] Authenticated, redirecting to dashboard');
    return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path={ROUTE_PATHS.HOME} element={<Home />} />
          <Route path={ROUTE_PATHS.LOGIN} element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path={ROUTE_PATHS.REGISTER} element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path={ROUTE_PATHS.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />

          {/* Protected Dashboard */}
          <Route path={ROUTE_PATHS.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path={ROUTE_PATHS.MEDIA} element={<ProtectedRoute><MediaLibrary /></ProtectedRoute>} />
          <Route path={ROUTE_PATHS.CREATE_POST} element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path={ROUTE_PATHS.CALENDAR} element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path={ROUTE_PATHS.ANALYTICS} element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path={ROUTE_PATHS.ACCOUNTS} element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path={ROUTE_PATHS.SETTINGS} element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
