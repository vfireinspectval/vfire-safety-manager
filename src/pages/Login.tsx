
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AuthForm from '@/components/AuthForm';
import { Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex flex-col items-center justify-center px-6 py-12 bg-white">
        <Link to="/" className="flex items-center gap-2 mb-12 text-safety-blue">
          <Flame className="h-8 w-8 text-safety-red" />
          <span className="font-bold text-2xl">V-FIRE INSPECT</span>
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <AuthForm />
        </motion.div>
      </div>
      
      {/* Right side - Image and content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:block relative overflow-hidden bg-safety-blue"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-safety-blue to-blue-800 opacity-90 z-10"></div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-12 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md text-center"
          >
            <Flame className="h-12 w-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Streamlined Fire Safety Certification Management</h2>
            <p className="text-lg text-blue-100">
              V-FIRE INSPECT connects establishment owners, fire inspectors, and administrators in one unified digital platform.
            </p>
            
            <div className="mt-10 pt-10 border-t border-blue-400/30">
              <blockquote className="italic text-blue-100">
                "Ensuring safety through efficient certification, one establishment at a time."
              </blockquote>
            </div>
          </motion.div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1512223792601-592a9809eed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" 
          alt="Firefighter in action"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default Login;
