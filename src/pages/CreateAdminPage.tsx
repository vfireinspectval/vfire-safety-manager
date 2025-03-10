
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, CheckCircle2, Key } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCreateVerifiedAdmin } from '@/hooks/useCreateVerifiedAdmin';
import { Separator } from '@/components/ui/separator';

// Form validation schema
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateAdminPage() {
  const { createAdminUser } = useAuth();
  const { createVerifiedAdmin, isLoading: isVerifiedLoading, isCreated } = useCreateVerifiedAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form handling
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await createAdminUser(data.email, data.password);
      setSuccess(true);
    } catch (err: any) {
      console.error('Admin creation error:', err);
      setError(err.message || 'Failed to create admin user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center">
          <span className="text-safety-red mr-2">V-FIRE</span> INSPECT
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Create Admin Account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <ShieldAlert className="h-6 w-6 mr-2 text-safety-red" />
              Create Admin User
            </CardTitle>
            <CardDescription className="text-center">
              Create a new admin account with custom credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle>Admin Created</AlertTitle>
                <AlertDescription>
                  The admin account has been successfully created. You can now log in.
                </AlertDescription>
              </Alert>
            ) : error ? (
              <Alert className="mb-4 bg-destructive/10 border-destructive/20">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

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
                          placeholder="admin@example.com"
                          type="email"
                          disabled={isLoading || success}
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
                          placeholder="******"
                          type="password"
                          disabled={isLoading || success}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          disabled={isLoading || success}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!success && (
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create Admin User'}
                  </Button>
                )}
              </form>
            </Form>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-md font-medium flex items-center">
                <Key className="h-4 w-4 mr-2" />
                Create Verified Admin
              </h3>
              <p className="text-sm text-gray-500">
                Create the predefined admin account with email: vfireinspectval@gmail.com
              </p>
              
              <Button 
                onClick={createVerifiedAdmin}
                variant="outline"
                className="w-full"
                disabled={isVerifiedLoading || isCreated}
              >
                {isVerifiedLoading ? 'Creating...' : isCreated ? 'Admin Created' : 'Create Verified Admin'}
              </Button>

              {isCreated && (
                <Alert className="mt-4 bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle>Verified Admin Created</AlertTitle>
                  <AlertDescription>
                    The verified admin account (vfireinspectval@gmail.com) has been successfully created.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <Link to="/login/admin">Go to Admin Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
