
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function useCreateVerifiedAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const { toast } = useToast();

  const createVerifiedAdmin = async () => {
    try {
      setIsLoading(true);
      
      const email = 'vfireinspectval@gmail.com';
      const password = 'vfireinspectval2025';
      
      // Check if admin already exists
      const { data: existingUsers } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', email)
        .eq('role', 'admin');
      
      if (existingUsers && existingUsers.length > 0) {
        toast({
          title: 'Admin already exists',
          description: 'The verified admin account already exists in the system.',
        });
        setIsCreated(true);
        return;
      }

      // Create admin user
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

      // Update admin status to registered directly in database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ account_status: 'registered' })
        .eq('id', data.user.id);

      if (updateError) {
        console.error('Error updating admin status:', updateError);
      }

      toast({
        title: 'Verified admin created',
        description: 'The verified admin account has been successfully created.',
      });
      setIsCreated(true);
    } catch (error: any) {
      console.error('Admin creation error:', error);
      toast({
        title: 'Admin creation failed',
        description: error.message || 'An error occurred during admin creation',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createVerifiedAdmin,
    isLoading,
    isCreated
  };
}
