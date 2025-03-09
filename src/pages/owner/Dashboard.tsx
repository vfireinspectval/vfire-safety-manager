
import React from 'react';
import { 
  Building,
  FileText, 
  FileCheck, 
  Plus,
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function OwnerDashboard() {
  const { profile } = useAuth();
  const { toast } = useToast();
  
  // Mock establishment data
  const establishments = [
    {
      id: '1',
      name: 'ABC Restaurant',
      dtiNumber: 'DTI-123456789',
      status: 'registered',
      applications: [
        {
          id: 'app1',
          type: 'FSIC (Business)',
          status: 'approved',
          application_date: '2023-11-15',
        }
      ]
    },
    {
      id: '2',
      name: 'XYZ Coffee Shop',
      dtiNumber: 'DTI-987654321',
      status: 'pending',
      applications: []
    },
    {
      id: '3',
      name: 'Main Street Mall',
      dtiNumber: 'DTI-456789123',
      status: 'unregistered',
      applications: []
    }
  ];
  
  // Stats
  const stats = {
    registered: 1,
    pending: 1,
    unregistered: 1,
    total: 3,
    applications: {
      approved: 1,
      pending: 0,
      rejected: 0
    }
  };
  
  // Mock recent notifications
  const notifications = [
    { 
      id: '1', 
      icon: FileCheck, 
      title: 'Certificate Approved', 
      description: 'Your FSIC application for ABC Restaurant has been approved.', 
      time: '2 days ago',
      color: 'bg-green-100 text-green-600'
    },
    { 
      id: '2', 
      icon: Building, 
      title: 'Establishment Pending', 
      description: 'Your registration for XYZ Coffee Shop is awaiting approval.', 
      time: '5 days ago',
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      id: '3', 
      icon: Clock, 
      title: 'Inspection Scheduled', 
      description: 'An inspection for ABC Restaurant has been scheduled for December 15.', 
      time: '1 week ago',
      color: 'bg-purple-100 text-purple-600'
    },
  ];
  
  // Function to handle registration action
  const handleRegisterEstablishment = () => {
    toast({
      title: "Registration Started",
      description: "You'll be redirected to the establishment registration form.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Owner Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {profile?.first_name || 'User'}</p>
        </div>
        
        <Button asChild className="gap-2">
          <a href="/owner/establishments/register">
            <Plus className="h-4 w-4" />
            Register New Establishment
          </a>
        </Button>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-blue-800">Register Establishment</h3>
                <p className="text-sm text-blue-600 mt-1">Register your business for fire safety certification</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <Button className="w-full mt-4" onClick={handleRegisterEstablishment} asChild>
              <a href="/owner/establishments/register">Start Registration</a>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-green-800">Apply for Certification</h3>
                <p className="text-sm text-green-600 mt-1">Apply for FSIC or FSEC for your establishment</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <Button className="w-full mt-4" asChild>
              <a href="/owner/applications/apply">New Application</a>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-purple-800">Track Applications</h3>
                <p className="text-sm text-purple-600 mt-1">Check the status of your pending applications</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <Button className="w-full mt-4" asChild>
              <a href="/owner/applications">View Applications</a>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Alert for unregistered establishments */}
      {stats.unregistered > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-1">Action Required</h3>
                <p className="text-amber-700 mb-4">You have {stats.unregistered} unregistered establishment(s). Register them to apply for fire safety certificates.</p>
                <Button className="border-amber-300 bg-amber-500 hover:bg-amber-600" asChild>
                  <a href="/owner/establishments">View Establishments</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Establishments and Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>My Establishments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {establishments.map((establishment) => (
                  <div 
                    key={establishment.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="h-2 bg-safety-blue"></div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Building className="h-4 w-4 text-safety-blue" />
                          </div>
                          <h3 className="font-semibold">{establishment.name}</h3>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          establishment.status === 'registered' 
                            ? 'bg-green-100 text-green-800' 
                            : establishment.status === 'pending' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {establishment.status === 'registered' 
                            ? 'Registered' 
                            : establishment.status === 'pending' 
                            ? 'Pending Registration' 
                            : 'Unregistered'}
                        </span>
                      </div>
                      
                      <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        DTI: {establishment.dtiNumber}
                      </p>
                      
                      {establishment.applications && establishment.applications.length > 0 ? (
                        <div className="border-t border-gray-100 pt-3 mt-2">
                          <p className="text-sm font-medium mb-2">Latest Application</p>
                          {establishment.applications.map((app) => (
                            <div key={app.id} className="text-sm flex flex-col gap-1">
                              <div className="flex justify-between">
                                <span className="text-gray-600">{app.type}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                  app.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                  app.status === 'unscheduled' ? 'bg-amber-100 text-amber-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {app.status}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span>{app.application_date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          No applications yet
                        </div>
                      )}
                      
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href={`/owner/establishments/${establishment.id}`}>
                            View Details
                          </a>
                        </Button>
                        
                        {establishment.status === 'registered' ? (
                          <Button size="sm" className="flex-1" asChild>
                            <a href="/owner/applications/apply">
                              Apply
                            </a>
                          </Button>
                        ) : establishment.status === 'pending' ? (
                          <Button size="sm" className="flex-1" disabled>
                            Pending Approval
                          </Button>
                        ) : (
                          <Button size="sm" className="flex-1" asChild>
                            <a href="/owner/establishments/register">
                              Register
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Status Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">Establishments</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Registered</span>
                      </div>
                      <span className="text-sm font-medium">{stats.registered}</span>
                    </div>
                    <Progress 
                      value={(stats.registered / stats.total) * 100} 
                      className="h-2 bg-gray-200" 
                      indicatorClassName="bg-green-500" 
                    />
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                      <span className="text-sm font-medium">{stats.pending}</span>
                    </div>
                    <Progress 
                      value={(stats.pending / stats.total) * 100} 
                      className="h-2 bg-gray-200" 
                      indicatorClassName="bg-blue-500" 
                    />
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm">Unregistered</span>
                      </div>
                      <span className="text-sm font-medium">{stats.unregistered}</span>
                    </div>
                    <Progress 
                      value={(stats.unregistered / stats.total) * 100} 
                      className="h-2 bg-gray-200" 
                      indicatorClassName="bg-amber-500" 
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-4">Certificates</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Approved</span>
                      </div>
                      <span className="text-sm font-medium">{stats.applications.approved}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-600" />
                        <span className="text-sm">Pending</span>
                      </div>
                      <span className="text-sm font-medium">{stats.applications.pending}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm">Rejected</span>
                      </div>
                      <span className="text-sm font-medium">{stats.applications.rejected}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4" asChild>
                  <a href="/owner/applications/apply">
                    Apply for Certification
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
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
          
          <div className="mt-4 text-center">
            <Button variant="outline" className="w-full">
              View All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
