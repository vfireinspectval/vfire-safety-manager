
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building, 
  FileText, 
  ClipboardCheck, 
  Users, 
  BarChart3, 
  Calendar, 
  Flame,
  AlertTriangle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import EstablishmentCard from '@/components/EstablishmentCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ApplicationType, ApplicationStatus, Establishment } from '@/types/application';

// Mock data for dashboard
const mockEstablishments: Establishment[] = [
  {
    id: '1',
    owner_id: 'owner1',
    name: 'ABC Restaurant',
    dtiNumber: 'DTI-123456789',
    status: 'registered',
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
    applications: [
      {
        id: 'app1',
        type: 'fsic-business',
        establishment_id: '1',
        owner_id: 'owner1',
        establishment_name: 'ABC Restaurant',
        dti_certificate_no: 'DTI-123456789',
        application_date: '2023-11-15',
        application_time: '09:00 AM',
        status: 'approved',
        created_at: '2023-11-15',
        updated_at: '2023-11-15'
      }
    ]
  },
  {
    id: '2',
    owner_id: 'owner1',
    name: 'XYZ Coffee Shop',
    dtiNumber: 'DTI-987654321',
    status: 'pending',
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '3',
    owner_id: 'owner1',
    name: 'Main Street Mall',
    dtiNumber: 'DTI-456789123',
    status: 'unregistered',
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  }
];

const Dashboard = () => {
  const [userRole, setUserRole] = useState<'admin' | 'inspector' | 'owner'>('admin');
  const [userName, setUserName] = useState('Administrator');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulate authentication check
  useEffect(() => {
    // In a real app, check user authentication status
    // If not authenticated, redirect to login
    // For now, pretend we're logged in as admin
    
    // Simulate loading
    const timer = setTimeout(() => {
      // Show welcome toast
      toast({
        title: `Welcome back, ${userName}`,
        description: "You are now logged in to V-FIRE INSPECT"
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast, userName]);

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Render different dashboard based on user role
  const renderDashboardContent = () => {
    switch(userRole) {
      case 'admin':
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <motion.div 
              variants={containerAnimation}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { title: 'Total Establishments', value: 156, icon: Building, color: 'bg-blue-500' },
                { title: 'Pending Applications', value: 23, icon: FileText, color: 'bg-amber-500' },
                { title: 'Scheduled Inspections', value: 18, icon: Calendar, color: 'bg-green-500' },
                { title: 'Total Certifications', value: 412, icon: ClipboardCheck, color: 'bg-purple-500' },
              ].map((stat, index) => (
                <motion.div key={index} variants={itemAnimation}>
                  <Card>
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg text-white`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Recent Activities */}
            <motion.div variants={itemAnimation} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Sunshine Bakery', type: 'FSIC (Business)', status: 'Pending', date: '2023-12-01', time: '10:30 AM' },
                      { name: 'Golden Retail Center', type: 'FSEC', status: 'Scheduled', date: '2023-11-28', time: '2:15 PM' },
                      { name: 'City Garden Hotel', type: 'FSIC (Occupancy)', status: 'Inspected', date: '2023-11-25', time: '9:00 AM' },
                      { name: 'Bluesky Apartments', type: 'FSEC', status: 'Approved', date: '2023-11-20', time: '11:45 AM' },
                    ].map((application, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="font-medium text-gray-900 truncate">{application.name}</p>
                            <span className="text-sm text-gray-500">{application.date}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-600">{application.type}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                              application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              application.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                              application.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {application.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="w-full">View All Applications</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Upcoming Inspections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Downtown Cafe', inspector: 'John Smith', date: '2023-12-02', time: '9:00 AM' },
                      { name: 'Plaza Shopping Center', inspector: 'Maria Garcia', date: '2023-12-03', time: '1:30 PM' },
                      { name: 'Seaside Resort', inspector: 'John Smith', date: '2023-12-05', time: '10:15 AM' },
                    ].map((inspection, index) => (
                      <div key={index} className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-gray-900">{inspection.name}</p>
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{inspection.inspector}</span>
                          <span className="text-gray-500">{inspection.date}, {inspection.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="w-full">View Schedule</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Action Needed Section */}
            <motion.div variants={itemAnimation}>
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-800 mb-1">Actions Needed</h3>
                      <p className="text-amber-700 mb-4">You have pending items that require your attention.</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
                          7 Pending Registrations
                        </Button>
                        <Button variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
                          4 Applications to Review
                        </Button>
                        <Button variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
                          2 Certificates to Issue
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );
      
      case 'inspector':
        return (
          <div className="space-y-8">
            {/* Inspector Stats */}
            <motion.div 
              variants={containerAnimation}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { title: 'Assigned Inspections', value: 12, icon: ClipboardCheck, color: 'bg-blue-500' },
                { title: 'Completed This Month', value: 28, icon: Calendar, color: 'bg-green-500' },
                { title: 'Pending Reports', value: 3, icon: FileText, color: 'bg-amber-500' },
              ].map((stat, index) => (
                <motion.div key={index} variants={itemAnimation}>
                  <Card>
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg text-white`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Upcoming Inspections */}
            <motion.div variants={itemAnimation}>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Inspections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: '1', name: 'Downtown Cafe', type: 'FSIC (Business)', date: '2023-12-02', time: '9:00 AM', address: '123 Main St.' },
                      { id: '2', name: 'Plaza Shopping Center', type: 'FSEC', date: '2023-12-03', time: '1:30 PM', address: '456 Market Ave.' },
                      { id: '3', name: 'Seaside Resort', type: 'FSIC (Occupancy)', date: '2023-12-05', time: '10:15 AM', address: '789 Ocean Blvd.' },
                    ].map((inspection) => (
                      <div key={inspection.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-lg">{inspection.name}</h4>
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            {inspection.type}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{inspection.address}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1 text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{inspection.date}, {inspection.time}</span>
                          </div>
                          <Button asChild size="sm">
                            <a href={`/inspection/${inspection.id}`}>
                              View Details
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );
      
      case 'owner':
      default:
        return (
          <div className="space-y-8">
            <motion.div 
              variants={containerAnimation}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <motion.div variants={itemAnimation} className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>My Establishments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockEstablishments.map((establishment) => (
                        <EstablishmentCard
                          key={establishment.id}
                          id={establishment.id}
                          name={establishment.name}
                          dtiNumber={establishment.dtiNumber}
                          status={establishment.status}
                          applications={establishment.applications}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemAnimation} className="lg:row-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Application Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Unregistered</span>
                          <span className="text-sm font-medium">1</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Pending</span>
                          <span className="text-sm font-medium">1</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Registered</span>
                          <span className="text-sm font-medium">1</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-4">Certification Status</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-green-500"></div>
                              <span className="text-sm">Approved</span>
                            </div>
                            <span className="text-sm font-medium">1</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                              <span className="text-sm">Pending</span>
                            </div>
                            <span className="text-sm font-medium">0</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-red-500"></div>
                              <span className="text-sm">Rejected</span>
                            </div>
                            <span className="text-sm font-medium">0</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4">
                        Apply for Certification
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemAnimation} className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { icon: Flame, title: 'Certificate Approved', description: 'Your FSIC application for ABC Restaurant has been approved.', time: '2 days ago', color: 'bg-green-100 text-green-600' },
                        { icon: Building, title: 'Establishment Pending', description: 'Your registration for XYZ Coffee Shop is awaiting approval.', time: '5 days ago', color: 'bg-blue-100 text-blue-600' },
                        { icon: Users, title: 'Account Created', description: 'Your account has been successfully created.', time: '1 week ago', color: 'bg-purple-100 text-purple-600' },
                      ].map((notification, index) => (
                        <div key={index} className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className={`h-10 w-10 rounded-full ${notification.color} flex items-center justify-center flex-shrink-0`}>
                            <notification.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium text-gray-900">{notification.title}</p>
                              <span className="text-sm text-gray-500">{notification.time}</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{notification.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        );
    }
  };

  // Demo switch role buttons (for demonstration only)
  const RoleSwitchDemo = () => (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg">
      <p className="text-sm text-gray-500 mb-2">Demo: Switch between user roles to see different dashboards</p>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant={userRole === 'admin' ? 'default' : 'outline'}
          onClick={() => { setUserRole('admin'); setUserName('Administrator'); }}
        >
          Admin View
        </Button>
        <Button 
          size="sm" 
          variant={userRole === 'inspector' ? 'default' : 'outline'}
          onClick={() => { setUserRole('inspector'); setUserName('John Smith'); }}
        >
          Inspector View
        </Button>
        <Button 
          size="sm" 
          variant={userRole === 'owner' ? 'default' : 'outline'}
          onClick={() => { setUserRole('owner'); setUserName('Sarah Johnson'); }}
        >
          Owner View
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {userName}</p>
          </div>
          {userRole === 'owner' && (
            <Button asChild className="bg-safety-blue hover:bg-blue-700">
              <a href="/register-establishment">Register New Establishment</a>
            </Button>
          )}
        </div>
        
        {/* Role switch demo - only for development */}
        <RoleSwitchDemo />
        
        {/* Dashboard content based on role */}
        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default Dashboard;
