
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile, UserRole, EstablishmentInput } from '@/types/application';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  createAdminUser: (email: string, password: string) => Promise<void>;
};

export type SignUpData = {
  email: string;
  password: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  role?: UserRole;
  establishment_name?: string;
  dti_certificate_no?: string;
  establishments?: EstablishmentInput[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Set up auth subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId: string) {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      setProfile(data as Profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch user profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: 'Sign in failed',
        description: error.message || 'An error occurred during sign in',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function createAdminUser(email: string, password: string) {
    try {
      setIsLoading(true);
      
      // Sign up the admin user
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: 'Admin',
            last_name: 'User',
            role: 'admin',
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      // Check if user was created successfully
      if (!data?.user) {
        throw new Error('Failed to create admin user');
      }

      toast({
        title: 'Admin created',
        description: 'Admin user has been created successfully.',
      });
    } catch (error: any) {
      console.error('Admin creation error:', error);
      toast({
        title: 'Admin creation failed',
        description: error.message || 'An error occurred during admin creation',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(userData: SignUpData) {
    try {
      setIsLoading(true);
      const { 
        email, 
        password, 
        first_name, 
        middle_name, 
        last_name, 
        role = 'owner',
        establishments = []
      } = userData;

      // Register user with Supabase Auth
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name,
            middle_name,
            last_name,
            role,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (!data?.user) {
        throw new Error('Failed to create user account');
      }

      // For establishment owners, create establishment record(s)
      if (role === 'owner' && establishments.length > 0) {
        for (const est of establishments) {
          const { error: establishmentError } = await supabase
            .from('establishments')
            .insert({
              owner_id: data.user.id,
              establishment_name: est.name,
              dti_certificate_no: est.dtiNumber,
              status: 'pending',
            });

          if (establishmentError) {
            console.error('Error creating establishment:', establishmentError);
            toast({
              title: 'Establishment Creation Error',
              description: 'Your account was created but there was an error registering your establishment.',
              variant: 'destructive',
            });
          }
        }
      }

      toast({
        title: 'Account created',
        description: 'Your account has been successfully created. Please wait for admin approval.',
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: 'Sign up failed',
        description: error.message || 'An error occurred during sign up',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: 'Sign out failed',
        description: error.message || 'An error occurred during sign out',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const value = {
    user,
    profile,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    createAdminUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
