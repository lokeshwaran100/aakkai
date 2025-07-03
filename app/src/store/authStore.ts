import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

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
          (email === 'admin@aakkai.com' && password === 'aakkai') ||
          (email === 'team@aakkai.com' && password === 'aakkai')
        ) {
          // Use predefined UUIDs that match the database
          const userId = email === 'admin@aakkai.com' 
            ? '00000000-0000-0000-0000-000000000001'
            : '00000000-0000-0000-0000-000000000002';

          const dummyUser = {
            id: userId,
            email: email,
            role: email === 'admin@aakkai.com' ? 'admin' : 'team_member',
            aud: 'authenticated',
            created_at: new Date().toISOString(),
            app_metadata: {},
            user_metadata: {},
            identities: [],
            confirmed_at: new Date().toISOString(),
            email_confirmed_at: new Date().toISOString(),
            phone: '',
            last_sign_in_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as User;

          const dummySession = {
            access_token: `dummy-token-${userId}`,
            refresh_token: `dummy-refresh-token-${userId}`,
            expires_in: 3600,
            expires_at: Math.floor(Date.now() / 1000) + 3600,
            token_type: 'bearer',
            user: dummyUser,
          };

          // Mock the Supabase auth state
          // We'll override the auth.getUser method temporarily
          const originalGetUser = supabase.auth.getUser;
          supabase.auth.getUser = async () => ({
            data: { user: dummyUser },
            error: null
          });

          // Mock the auth.uid() function for RLS
          const originalUid = (supabase as any).auth.uid;
          (supabase as any).auth.uid = () => userId;

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