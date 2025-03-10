
import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ArrowRight, LucideShieldAlert, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/application';

// Form validation schema
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { role = 'owner' } = useParams<{ role?: UserRole }>();
  
  // Form handling
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: role === 'admin' ? 'vfireinspectval@gmail.com' : '',
      password: role === 'admin' ? 'vfireinspectval2025' : '',
    },
  });

  // Update form fields when role changes
  useEffect(() => {
    if (role === 'admin') {
      form.setValue('email', 'vfireinspectval@gmail.com');
      form.setValue('password', 'vfireinspectval2025');
    } else {
      form.setValue('email', '');
      form.setValue('password', '');
    }
  }, [role, form]);

  // Redirect if already logged in based on role
  useEffect(() => {
    if (user) {
      const dashboardPath = role === 'admin' 
        ? '/admin/dashboard' 
        : role === 'inspector' 
          ? '/inspector/dashboard' 
          : '/owner/dashboard';
      
      navigate(dashboardPath);
    }
  }, [user, role, navigate]);

  // Format role for display
  const getRoleDisplay = () => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'inspector': return 'Fire Inspector';
      default: return 'Establishment Owner';
    }
  };

  const handleAdminQuickLogin = async () => {
    try {
      setIsLoading(true);
      await signIn('vfireinspectval@gmail.com', 'vfireinspectval2025');
      
      // Successful login
      toast({
        title: 'Login successful',
        description: `Welcome back, Administrator.`,
      });
      
      // Will be redirected by the useEffect
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      await signIn(data.email, data.password);
      
      // Successful login
      toast({
        title: 'Login successful',
        description: `Welcome back, ${getRoleDisplay()}.`,
      });

      // Redirect based on role (will be handled by AuthContext)
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return null; // Return null while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center">
          <span className="text-safety-red mr-2">V-FIRE</span> INSPECT
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {getRoleDisplay()} Login
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">Log in to your account</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your {getRoleDisplay().toLowerCase()} dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {role === 'admin' && (
              <Button 
                className="w-full mb-4 flex items-center justify-center"
                onClick={handleAdminQuickLogin}
                disabled={isLoading}
              >
                <Key className="h-4 w-4 mr-2" />
                {isLoading ? 'Logging in...' : 'Quick Login as Verified Admin'}
              </Button>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          autoComplete="current-password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>

                {role === 'owner' && (
                  <div className="mt-4 text-center text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-primary hover:underline">
                      Sign up
                    </Link>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <div className="flex space-x-4">
              {role !== 'admin' && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login/admin">
                    <LucideShieldAlert className="h-4 w-4 mr-2" />
                    Admin Login
                  </Link>
                </Button>
              )}
              
              {role !== 'inspector' && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login/inspector">
                    <LucideShieldAlert className="h-4 w-4 mr-2" />
                    Inspector Login
                  </Link>
                </Button>
              )}
              
              {role !== 'owner' && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login/owner">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Owner Login
                  </Link>
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
