
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Flame, Menu, X, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavbarProps = {
  userRole?: 'admin' | 'inspector' | 'owner' | null;
  userName?: string;
};

const Navbar = ({ userRole, userName }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // For now this just navigates to login
    // In the future, this will clear auth state
    navigate('/login');
  };

  // Menu items based on role
  const menuItems = userRole 
    ? userRole === 'admin' 
      ? [
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'User Accounts', path: '/user-accounts' },
          { name: 'Establishments', path: '/establishments' },
          { name: 'Applications', path: '/applications' },
        ] 
      : userRole === 'inspector' 
        ? [
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Assigned Inspections', path: '/assigned-inspections' },
          ]
        : // Owner role
          [
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'My Establishments', path: '/my-establishments' },
            { name: 'My Applications', path: '/my-applications' },
          ]
    : // Not logged in
      [
        { name: 'Home', path: '/' },
        { name: 'Login', path: '/login' },
      ];

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-subtle fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-safety-blue hover:text-primary transition-colors"
            >
              <Flame className="h-6 w-6 text-safety-red" />
              <span className="font-bold text-xl">V-FIRE INSPECT</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200",
                    location.pathname === item.path
                      ? "border-safety-blue text-safety-blue"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white hover:border-gray-300"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* User account section */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {userRole ? (
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {userRole === 'admin' ? 'Administrator' : userRole === 'inspector' ? 'Fire Inspector' : 'Establishment Owner'}
                  </span>
                  <span className="font-medium">{userName || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-md border border-transparent p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus-visible:outline-none transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-safety-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none transition-colors"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus-visible:outline-none transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Main menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-800 animate-slide-in-top">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "block py-2 pl-3 pr-4 text-base font-medium border-l-4",
                location.pathname === item.path
                  ? "border-safety-blue text-safety-blue bg-blue-50 dark:bg-blue-900/20"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {userRole && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-left block py-2 pl-3 pr-4 text-base font-medium border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Logout
            </button>
          )}
        </div>
        
        {userRole && (
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">{userName || 'User'}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {userRole === 'admin' ? 'Administrator' : userRole === 'inspector' ? 'Fire Inspector' : 'Establishment Owner'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
