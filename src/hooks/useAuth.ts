import { useState, useEffect, createContext, useContext } from 'react';
import type { User as AppUser } from '@/lib/index';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export function useAuthState(): AuthState {
  const [user, setUser] = useState<AppUser | null>({
    id: 'alpha-user-id',
    name: 'Alpha User',
    email: 'alpha@thryve.io',
    avatar: 'https://i.pravatar.cc/150?u=alpha',
    plan: 'agency',
    createdAt: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('[Auth] Bypass active: Alpha mode engaged.');
  }, []);

    const login = async (): Promise<{ success: boolean }> => {
    return { success: true };
  };

  const register = async (): Promise<{ success: boolean }> => {
    return { success: true };
  };

  const logout = async () => {
    console.log('[Auth] Logout disabled in Alpha mode.');
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
}

// ─── Context ─────────────────────────────────────────────────
import React from 'react';

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthState();
  return React.createElement(AuthContext.Provider, { value: auth }, children);
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
