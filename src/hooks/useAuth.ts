import { useState, useEffect, createContext, useContext } from 'react';
import type { User as AppUser } from '@/lib/index';
import { supabase } from '@/lib/supabase';
import { MOCK_USER } from '@/data/index';

interface AuthState {
  user: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export function useAuthState(): AuthState {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('[Auth] Initializing auth state...');
    
    // Check for active session
    if (import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL) {
      console.log('[Auth] Dev mode, no Supabase URL. Enabling pure mock mode.');
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[Auth] getSession result:', session ? 'Session found' : 'No session');
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Utilisateur',
          email: session.user.email || '',
          avatar: session.user.user_metadata.avatar_url,
          plan: (session.user.user_metadata.plan as any) || 'free',
          createdAt: session.user.created_at,
        });
      }
    }).catch(err => {
      console.error('[Auth] Error fetching session:', err);
    }).finally(() => {
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('[Auth] onAuthStateChange event:', _event, session ? 'Session user: ' + session.user.email : 'No session');
      
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Utilisateur',
          email: session.user.email || '',
          avatar: session.user.user_metadata.avatar_url,
          plan: (session.user.user_metadata.plan as any) || 'free',
          createdAt: session.user.created_at,
        });
      } else {
        // Only clear user on SIGNED_OUT or if it was NOT a mock user
        if (_event === 'SIGNED_OUT') {
           console.log('[Auth] Explicit sign out detected.');
           setUser(null);
        } else if (_event === 'INITIAL_SESSION' && !user) {
           // On initial load, if no session, ensure user is null
           setUser(null);
        }
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    console.log('[Auth] Attempting login for:', email);
    setIsLoading(true);
    
    // Check for demo login
    if (email === 'demo@example.com' || (import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL)) {
      console.log('[Auth] Using demo login session');
      setUser(MOCK_USER);
      setIsLoading(false);
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('[Auth] Login error:', error.message);
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        console.log('[Auth] Login success, user:', data.user.email);
        setUser({
          id: data.user.id,
          name: data.user.user_metadata.full_name || data.user.email?.split('@')[0] || 'Utilisateur',
          email: data.user.email || '',
          avatar: data.user.user_metadata.avatar_url,
          plan: (data.user.user_metadata.plan as any) || 'free',
          createdAt: data.user.created_at,
        });
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      console.error('[Auth] Unexpected login error:', err);
      if (import.meta.env.DEV) {
        console.warn('[Auth] Falling back to mock user in dev mode after error');
        setUser(MOCK_USER);
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, error: 'Une erreur inattendue est survenue.' };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    console.log('[Auth] Attempting register for:', email);
    setIsLoading(true);

    if (import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL) {
      console.log('[Auth] Using demo register session');
      setUser({ ...MOCK_USER, name, email });
      setIsLoading(false);
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            plan: 'free',
          },
        },
      });
      
      if (error) {
        console.error('[Auth] Register error:', error.message);
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        console.log('[Auth] Register success, user:', data.user.email);
        // If we have a user but NO session, it might mean email confirmation is required
        if (!data.session) {
          console.warn('[Auth] User created but no session found. Email confirmation likely required.');
          // In this case, we might want to return a specific message
          setIsLoading(false);
          return { success: true, error: 'Compte créé ! Veuillez vérifier votre email pour confirmer votre compte.' };
        }

        setUser({
          id: data.user.id,
          name: data.user.user_metadata.full_name || data.user.email?.split('@')[0] || 'Utilisateur',
          email: data.user.email || '',
          avatar: data.user.user_metadata.avatar_url,
          plan: (data.user.user_metadata.plan as any) || 'free',
          createdAt: data.user.created_at,
        });
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      console.error('[Auth] Unexpected register error:', err);
      if (import.meta.env.DEV) {
        setUser({ ...MOCK_USER, name, email });
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, error: 'Une erreur inattendue est survenue.' };
    }
  };

  const logout = async () => {
    console.log('[Auth] Logging out...');
    await supabase.auth.signOut();
    setUser(null);
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
