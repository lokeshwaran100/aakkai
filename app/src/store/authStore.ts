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
  signInWithGoogle: () => Promise<{ error: string | null }>;
}

// Admin email addresses
const ADMIN_EMAILS = [
  'devwithloki@gmail.com',
  'artsofshree@gmail.com'
];

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
        if (!user?.email) return;

        const isAdmin = ADMIN_EMAILS.includes(user.email);
        
        try {
          // Check if user role exists in database
          const { data: existingRole, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .maybeSingle();

          if (roleError && roleError.code !== 'PGRST116') {
            console.error('Error checking user role:', roleError);
          }

          if (!existingRole) {
            // Create user role based on email
            const role = isAdmin ? 'admin' : 'team_member';
            
            const { error: insertError } = await supabase
              .from('user_roles')
              .insert([{
                user_id: user.id,
                role: role
              }]);

            if (insertError) {
              console.error('Error creating user role:', insertError);
              // Don't throw error, just log it and continue
            }
          }

          // Set role state
          set({ 
            isAdmin: isAdmin,
            isTeamMember: !isAdmin
          });

          // Create team member profile if user is team member and doesn't have one
          if (!isAdmin) {
            const { data: existingProfile, error: profileError } = await supabase
              .from('team_members')
              .select('id')
              .eq('user_id', user.id)
              .maybeSingle();

            if (profileError && profileError.code !== 'PGRST116') {
              console.error('Error checking team member profile:', profileError);
            }

            if (!existingProfile) {
              const { error: profileInsertError } = await supabase
                .from('team_members')
                .insert([{
                  user_id: user.id,
                  role: 'Team Member',
                  expertise: [],
                  experience: '',
                  is_available: true,
                  projects_collaborated: 0
                }]);

              if (profileInsertError) {
                console.error('Error creating team member profile:', profileInsertError);
                // Don't throw error, just log it
              }
            }
          }
        } catch (error) {
          console.error('Error in checkRole:', error);
          // Set role state based on email even if database operations fail
          set({ 
            isAdmin: isAdmin,
            isTeamMember: !isAdmin
          });
        }
      },
      signInWithGoogle: async () => {
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/`
            }
          });

          if (error) {
            return { error: error.message };
          }

          return { error: null };
        } catch (err: any) {
          return { error: err.message || 'Failed to sign in with Google' };
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);