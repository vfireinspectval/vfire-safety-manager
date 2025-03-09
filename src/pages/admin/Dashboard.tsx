
import React from 'react';
import { 
  Building, 
  FileText, 
  ClipboardCheck, 
  Users, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminDashboard() {
  // Mock statistics
  const stats = [
    { title: 'Total Establishments', value: 156, icon: Building, color: 'bg-blue-500' },
    { title: 'Pending Applications', value: 23, icon: FileText, color: 'bg-amber-500' },
    { title: 'Scheduled Inspections', value: 18, icon: Calendar, color: 'bg-green-500' },
    { title: 'Total Certificates', value: 412, icon: ClipboardCheck, color: 'bg-purple-500' },
  ];
  
  // Mock recent applications
  const recentApplications = [
    { 
      id: '1',
      establishmentName: 'Sunshine Bakery', 
      type: 'FSIC (Business)', 
      status: 'pending', 
      date: '2023-12-01', 
      time: '10:30 AM' 
    },
    { 
      id: '2',
      establishmentName: 'Golden Retail Center', 
      type: 'FSEC', 
      status: 'for_inspection', 
      date: '2023-11-28', 
      time: '2:15 PM' 
    },
    { 
      id: '3',
      establishmentName: 'City Garden Hotel', 
      type: 'FSIC (Occupancy)', 
      status: 'inspected', 
      date: '2023-11-25', 
      time: '9:00 AM' 
    },
    { 
      id: '4',
      establishmentName: 'Bluesky Apartments', 
      type: 'FSEC', 
      status: 'approved', 
      date: '2023-11-20', 
      time: '11:45 AM' 
    },
  ];
  
  // Mock upcoming inspections
  const upcomingInspections = [
    { 
      id: '1',
      establishmentName: 'Downtown Cafe', 
      inspector: 'John Smith', 
      date: '2023-12-02', 
      time: '9:00 AM' 
    },
    { 
      id: '2',
      establishmentName: 'Plaza Shopping Center', 
      inspector: 'Maria Garcia', 
      date: '2023-12-03', 
      time: '1:30 PM' 
    },
    { 
      id: '3',
      establishmentName: 'Seaside Resort', 
      inspector: 'John Smith', 
      date: '2023-12-05', 
      time: '10:15 AM' 
    },
  ];
  
  // Status badge helper function
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return { icon: CheckCircle, className: 'bg-green-100 text-green-800' };
      case 'pending':
        return { icon: Clock, className: 'bg-amber-100 text-amber-800' };
      case 'for_inspection':
        return { icon: Calendar, className: 'bg-blue-100 text-blue-800' };
      case 'inspected':
        return { icon: ClipboardCheck, className: 'bg-purple-100 text-purple-800' };
      case 'rejected':
        return { icon: XCircle, className: 'bg-red-100 text-red-800' };
      default:
        return { icon: FileText, className: 'bg-gray-100 text-gray-800' };
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            New Application
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
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
        ))}
      </div>
      
      {/* Action Needed */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
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
      
      {/* Recent Activities and Upcoming Inspections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => {
                const statusBadge = getStatusBadge(application.status);
                
                return (
                  <div 
                    key={application.id} 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-900 truncate">{application.establishmentName}</p>
                        <span className="text-sm text-gray-500">{application.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-600">{application.type}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className={`text-sm font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${statusBadge.className}`}>
                          <statusBadge.icon className="h-3 w-3" />
                          <span className="capitalize">{application.status.replace('_', ' ')}</span>
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={`/admin/applications/${application.id}`}>View</a>
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <Button asChild variant="outline" className="w-full">
                <a href="/admin/applications/fsic-business">View All Applications</a>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Inspections</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
                <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <div className="space-y-4">
                  {upcomingInspections.map((inspection) => (
                    <div 
                      key={inspection.id} 
                      className="p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{inspection.establishmentName}</p>
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{inspection.inspector}</span>
                        <span className="text-gray-500">{inspection.date}, {inspection.time}</span>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <Button size="sm" asChild>
                          <a href={`/admin/inspections/${inspection.id}`}>View Details</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="completed">
                <div className="text-center py-12">
                  <ClipboardCheck className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No completed inspections</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Completed inspections will appear here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4 text-center">
              <Button asChild variant="outline" className="w-full">
                <a href="/admin/inspections">View All Inspections</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
