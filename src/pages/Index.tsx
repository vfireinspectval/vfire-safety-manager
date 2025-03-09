import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Shield, ClipboardCheck, Building, CheckCircle } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-24">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            className="flex flex-col items-center text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white">
              <span className="text-safety-red">Fire Safety</span> Certification Management
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              A streamlined platform for managing fire safety certifications and inspections for business establishments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="bg-safety-red hover:bg-red-700">
                <Link to="/signup">Register Your Establishment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-24 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Streamlined Fire Safety Certification
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Our platform simplifies the process of obtaining and managing fire safety certifications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="p-3 bg-safety-red bg-opacity-10 rounded-full mb-4">
                <Building className="h-6 w-6 text-safety-red" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Establishment Registration</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Easily register your establishment and manage all its fire safety requirements
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="p-3 bg-safety-blue bg-opacity-10 rounded-full mb-4">
                <Shield className="h-6 w-6 text-safety-blue" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Fire Safety Certificates</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Apply for FSEC and FSIC certifications through our user-friendly platform
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="p-3 bg-safety-yellow bg-opacity-10 rounded-full mb-4">
                <ClipboardCheck className="h-6 w-6 text-safety-yellow" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Inspection Management</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Streamlined inspection scheduling and reporting for fire safety compliance
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="p-3 bg-safety-green bg-opacity-10 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-safety-green" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Approval Tracking</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Real-time updates on application status and certificate approvals
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-6 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-safety-red" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2023 V-FIRE INSPECT. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
