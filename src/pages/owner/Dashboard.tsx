
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { Building, CheckCircle, Clock, FileText, XCircle } from 'lucide-react';

export default function OwnerDashboard() {
  const { profile } = useAuth();
  
  // Mock data - would normally come from an API call
  const establishments = [
    {
      id: '1',
      name: 'Sample Business 1',
      status: 'registered',
      applications: [
        { id: '1', type: 'fsec', status: 'approved', application_date: '2023-05-15' },
        { id: '2', type: 'fsic-business', status: 'for_inspection', application_date: '2023-06-20' }
      ]
    },
  ];
  
  const recentApplications = [
    { 
      id: '1', 
      type: 'fsec', 
      status: 'approved', 
      establishment_name: 'Sample Business 1',
      application_date: '2023-05-15'
    },
    { 
      id: '2', 
      type: 'fsic-business', 
      status: 'for_inspection',
      establishment_name: 'Sample Business 1',
      application_date: '2023-06-20'
    },
    { 
      id: '3', 
      type: 'fsic-occupancy', 
      status: 'unscheduled',
      establishment_name: 'Sample Business 1',
      application_date: '2023-07-10'
    }
  ];
  
  // Calculate application stats
  const totalApplications = recentApplications.length;
  const approvedApplications = recentApplications.filter(app => app.status === 'approved').length;
  const pendingApplications = recentApplications.filter(app => ['unscheduled', 'for_inspection', 'inspected'].includes(app.status)).length;
  const rejectedApplications = recentApplications.filter(app => app.status === 'rejected').length;
  
  const approvedPercentage = Math.round((approvedApplications / totalApplications) * 100);
  const pendingPercentage = Math.round((pendingApplications / totalApplications) * 100);
  const rejectedPercentage = Math.round((rejectedApplications / totalApplications) * 100);
  
  // Get certification type name
  const getTypeName = (type: string) => {
    switch (type) {
      case 'fsec': return 'FSEC';
      case 'fsic-business': return 'FSIC (Business)';
      case 'fsic-occupancy': return 'FSIC (Occupancy)';
      default: return type;
    }
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Rejected</span>;
      case 'for_inspection':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">For Inspection</span>;
      case 'inspected':
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">Inspected</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Unscheduled</span>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {profile?.first_name}!</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Establishments</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{establishments.length}</div>
            <p className="text-xs text-muted-foreground">
              {establishments.filter(e => e.status === 'registered').length} registered
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              Across all establishments
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedApplications}</div>
            <p className="text-xs text-muted-foreground">
              {approvedPercentage}% of applications
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApplications}</div>
            <p className="text-xs text-muted-foreground">
              {pendingPercentage}% of applications
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Your recently submitted applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map(app => (
                <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{getTypeName(app.type)}</h3>
                    <p className="text-sm text-muted-foreground">{app.establishment_name}</p>
                    <p className="text-xs text-muted-foreground">Submitted: {new Date(app.application_date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(app.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Distribution of your applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm">Approved</span>
                <span className="text-sm font-medium">{approvedPercentage}%</span>
              </div>
              <Progress 
                value={approvedPercentage} 
                className="h-2 bg-gray-100" 
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending</span>
                <span className="text-sm font-medium">{pendingPercentage}%</span>
              </div>
              <Progress 
                value={pendingPercentage} 
                className="h-2 bg-gray-100" 
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm">Rejected</span>
                <span className="text-sm font-medium">{rejectedPercentage}%</span>
              </div>
              <Progress 
                value={rejectedPercentage} 
                className="h-2 bg-gray-100" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
