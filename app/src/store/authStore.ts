import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

interface AuthStore {
  user: User | null;
  session: any | null;
  isAdmin: boolean;
  isTeamMember: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: any | null) => void;
  signOut: () => Promise<void>;
  checkRole: () => Promise<void>;
  dummyLogin: (email: string, password: string) => Promise<{ error: string | null }>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isAdmin: false,
      isTeamMember: false,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null, isAdmin: false, isTeamMember: false });
      },
      checkRole: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // For dummy login, set roles based on email
        if (user.email === 'admin@aakkai.com') {
          set({ isAdmin: true, isTeamMember: false });
        } else if (user.email === 'team@aakkai.com') {
          set({ isAdmin: false, isTeamMember: true });
        }
      },
      dummyLogin: async (email: string, password: string) => {
        if (
          (email === 'admin@aakkai.com' && password === 'aakkaai') ||
          (email === 'team@aakkai.com' && password === 'aakkaai')
        ) {
          const dummyUser = {
            id: uuidv4(),
            email: email,
            role: email === 'admin@aakkai.com' ? 'admin' : 'team_member',
            aud: 'authenticated',
            created_at: new Date().toISOString(),
          } as User;

          const dummySession = {
            access_token: 'dummy-token',
            refresh_token: 'dummy-refresh-token',
            expires_in: 3600,
            user: dummyUser,
          };

          set({ 
            user: dummyUser,
            session: dummySession,
            isAdmin: email === 'admin@aakkai.com',
            isTeamMember: email === 'team@aakkai.com'
          });

          return { error: null };
        }

        return { error: 'Invalid login credentials' };
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);