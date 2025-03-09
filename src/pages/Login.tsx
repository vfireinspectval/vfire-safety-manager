
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user && !isLoading) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center">
          <span className="text-safety-red mr-2">V-FIRE</span> INSPECT
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Sign in to your account to manage fire safety certifications
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </motion.div>
    </div>
  );
}
