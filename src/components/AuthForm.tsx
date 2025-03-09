
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserRole = 'admin' | 'inspector' | 'owner';

interface AuthFormProps {
  defaultTab?: 'login' | 'signup';
}

const AuthForm = ({ defaultTab = 'login' }: AuthFormProps) => {
  const [tab, setTab] = useState(defaultTab);
  const [role, setRole] = useState<UserRole>('owner');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [establishmentName, setEstablishmentName] = useState('');
  const [dtiNumber, setDtiNumber] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Temporary login logic - replace with actual auth later
      if (loginEmail === 'vfireinspectval@gmail.com' && loginPassword === 'vfireinspectval2025') {
        // Admin login
        setTimeout(() => {
          toast({
            title: "Login successful",
            description: "Welcome, Administrator!",
          });
          navigate('/dashboard');
        }, 1000);
      } else {
        // Simulate API call
        setTimeout(() => {
          // For now just show error, will integrate with Supabase later
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Password validation
    if (signupPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call for signup - replace with actual auth later
      setTimeout(() => {
        toast({
          title: "Registration successful",
          description: "Your account is pending approval by an administrator.",
        });
        setTab('login');
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Tabs 
      defaultValue={tab} 
      value={tab} 
      onValueChange={(val: string) => setTab(val as 'login' | 'signup')} 
      className="w-full max-w-md"
    >
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login" className="animate-fade-in">
        <Card className="border-none shadow-elevation-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-as">Login as</Label>
                <div className="flex rounded-md overflow-hidden border divide-x">
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={cn(
                      "flex-1 px-3 py-2 text-sm transition-colors",
                      role === 'admin' 
                        ? "bg-safety-blue text-white" 
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('inspector')}
                    className={cn(
                      "flex-1 px-3 py-2 text-sm transition-colors",
                      role === 'inspector' 
                        ? "bg-safety-blue text-white" 
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    Inspector
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('owner')}
                    className={cn(
                      "flex-1 px-3 py-2 text-sm transition-colors",
                      role === 'owner' 
                        ? "bg-safety-blue text-white" 
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    Owner
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Password</Label>
                  <a 
                    href="#" 
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-safety-blue hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      <TabsContent value="signup" className="animate-fade-in">
        <Card className="border-none shadow-elevation-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Enter your information to register as an Establishment Owner
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Juan"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name (Optional)</Label>
                  <Input
                    id="middleName"
                    placeholder="Dela"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Cruz"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="establishment-name">Establishment Name</Label>
                <Input
                  id="establishment-name"
                  placeholder="ABC Company"
                  value={establishmentName}
                  onChange={(e) => setEstablishmentName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dti-number">DTI Certificate Number</Label>
                <Input
                  id="dti-number"
                  placeholder="0123456789"
                  value={dtiNumber}
                  onChange={(e) => setDtiNumber(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-safety-blue hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;
