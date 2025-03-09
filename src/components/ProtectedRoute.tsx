
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'inspector' | 'owner';
}

export default function ProtectedRoute({ 
  children, 
  requiredRole 
}: ProtectedRouteProps) {
  const { user, profile, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <Skeleton className="h-[250px] w-full rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Skeleton className="h-[125px] rounded-lg" />
          <Skeleton className="h-[125px] rounded-lg" />
          <Skeleton className="h-[125px] rounded-lg" />
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check for required role if specified
  if (requiredRole && profile?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
