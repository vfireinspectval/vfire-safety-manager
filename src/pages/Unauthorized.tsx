
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function Unauthorized() {
  const { user, profile } = useAuth();

  // Provide links to all dashboards
  const dashboardLinks = [
    { path: '/admin/dashboard', label: 'Admin Dashboard' },
    { path: '/inspector/dashboard', label: 'Inspector Dashboard' },
    { path: '/owner/dashboard', label: 'Owner Dashboard' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <AlertTriangle className="h-12 w-12 text-safety-red" />
          </div>

          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            This page would normally require special permissions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-4">
              <p className="text-center text-gray-700">
                Since authentication has been disabled, you can navigate to any dashboard:
              </p>
              <div className="flex flex-col space-y-3">
                {dashboardLinks.map((link) => (
                  <Button key={link.path} asChild>
                    <Link to={link.path}>
                      {link.label}
                    </Link>
                  </Button>
                ))}
                <Button asChild variant="outline">
                  <Link to="/">Go to Home Page</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
