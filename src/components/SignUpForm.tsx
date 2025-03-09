
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { EstablishmentInput } from '@/types/application';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm your password'),
  establishments: z.array(
    z.object({
      name: z.string().min(1, 'Establishment name is required'),
      dtiNumber: z.string().min(1, 'DTI certificate number is required'),
    })
  ).min(1, 'At least one establishment is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Form handling
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      establishments: [{ name: '', dtiNumber: '' }],
    },
  });

  // Field array for multiple establishments
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "establishments",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      
      await signUp({
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        role: 'owner',
        establishment_name: data.establishments[0].name,
        dti_certificate_no: data.establishments[0].dtiNumber,
      });

      // For additional establishments (if any), create them after signup
      if (data.establishments.length > 1) {
        // The additional establishments will be created in the AuthContext

        toast({
          title: 'Additional establishments registered',
          description: 'Your additional establishments have been registered and are pending approval.',
        });
      }

      // Show success notification
      toast({
        title: 'Registration successful',
        description: 'Your account has been created. Please wait for admin approval.',
      });

      // Redirect to login page
      navigate('/login/owner');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: 'Registration failed',
        description: error.message || 'An error occurred during sign up',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Michael" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="johndoe@example.com" 
                  disabled={isLoading} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="******" 
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="******" 
                    disabled={isLoading} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Establishment Details</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: '', dtiNumber: '' })}
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Establishment
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Establishment {index + 1}</span>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-destructive hover:text-destructive/90"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name={`establishments.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Establishment Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ABC Company" 
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
                    name={`establishments.${index}.dtiNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DTI Certificate Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="DTI-12345678" 
                            disabled={isLoading} 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your Department of Trade and Industry (DTI) certificate number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
    </Form>
  );
}
