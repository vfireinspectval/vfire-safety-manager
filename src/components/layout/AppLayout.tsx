
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { MainNav } from './MainNav';
import { RoleSidebar } from './RoleSidebar';
import { useToast } from '@/hooks/use-toast';

export function AppLayout() {
  const { user, profile, signOut, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Show loading state while checking auth (but don't redirect)
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Default to 'owner' role if no user is authenticated
  const userRole = profile?.role || 'owner';
  
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <Sidebar>
        <SidebarHeader className="border-b pb-4">
          <div className="flex items-center gap-2 px-4">
            <div className="h-8 w-8 rounded-full bg-safety-red flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">V-FIRE INSPECT</h1>
              <p className="text-xs text-muted-foreground">{userRole === 'admin' ? 'Administrator' : userRole === 'inspector' ? 'Fire Inspector' : 'Establishment Owner'}</p>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <RoleSidebar role={userRole} />
        </SidebarContent>
        
        <SidebarFooter className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <div className="text-sm">
                <p className="font-medium">{profile?.first_name || 'Guest'} {profile?.last_name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'Not logged in'}</p>
              </div>
            </div>
            {user && (
              <Button size="icon" variant="ghost" onClick={handleLogout} title="Logout">
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <div className="flex-1 flex flex-col min-h-screen">
        <MainNav />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
