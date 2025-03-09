
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';

export function MainNav() {
  const { profile, user } = useAuth();
  const userRole = profile?.role || 'owner';
  
  const getDashboardPath = () => {
    switch (userRole) {
      case 'admin': return '/admin/dashboard';
      case 'inspector': return '/inspector/dashboard';
      default: return '/owner/dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
          
          <Link to={getDashboardPath()} className="font-semibold text-lg flex items-center gap-2">
            <span className="text-safety-red">V-FIRE</span> INSPECT
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-safety-red rounded-full"></span>
          </Button>
          
          <Button variant="outline" size="sm" asChild>
            <Link to="/profile">Profile</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
