import React from 'react';
import { Building, Calendar, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Application, Establishment } from '@/types/application';

interface EstablishmentCardProps extends Omit<Establishment, 'owner_id' | 'created_at' | 'updated_at'> {}

const EstablishmentCard = ({ 
  id, 
  name, 
  dtiNumber, 
  status,
  applications 
}: EstablishmentCardProps) => {
  
  const getStatusBadgeClasses = () => {
    switch(status) {
      case 'registered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'unregistered':
      default:
        return 'bg-amber-100 text-amber-800';
    }
  };

  const getStatusText = () => {
    switch(status) {
      case 'registered':
        return 'Registered';
      case 'pending':
        return 'Pending Registration';
      case 'unregistered':
      default:
        return 'Unregistered';
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-elevation-2">
      <div className="h-2 bg-safety-blue"></div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Building className="h-5 w-5 text-safety-blue" />
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses()}`}>
            {getStatusText()}
          </span>
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{name}</h3>
        <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
          <FileText className="h-4 w-4" />
          DTI: {dtiNumber}
        </p>
        
        {applications && applications.length > 0 && (
          <div className="border-t border-gray-100 pt-4 mt-2">
            <p className="text-sm font-medium mb-2">Latest Application</p>
            {applications.map((app) => (
              <div key={app.id} className="text-sm flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">{app.type}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    app.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                    app.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{app.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-gray-50 border-t">
        {status === 'registered' ? (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
            <Button size="sm" className="w-full">
              Apply
            </Button>
          </div>
        ) : status === 'pending' ? (
          <Button variant="outline" size="sm" className="w-full" disabled>
            Pending Approval
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="w-full">
            Register Establishment
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EstablishmentCard;
