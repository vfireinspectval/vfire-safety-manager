
import { Building, Calendar, ClipboardCheck, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

type EstablishmentStatus = 'unregistered' | 'pending' | 'registered';
type ApplicationType = 'fsec' | 'fsic-occupancy' | 'fsic-business';

interface EstablishmentCardProps {
  id: string;
  name: string;
  dtiNumber: string;
  status: EstablishmentStatus;
  applications?: {
    id: string;
    type: ApplicationType;
    status: string;
    date: string;
  }[];
}

const EstablishmentCard = ({
  id,
  name,
  dtiNumber,
  status,
  applications = [],
}: EstablishmentCardProps) => {
  const getStatusClass = (status: EstablishmentStatus) => {
    switch (status) {
      case 'unregistered':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'pending':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'registered':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getApplicationTypeLabel = (type: ApplicationType) => {
    switch (type) {
      case 'fsec':
        return 'FSEC';
      case 'fsic-occupancy':
        return 'FSIC (Occupancy)';
      case 'fsic-business':
        return 'FSIC (Business)';
      default:
        return type;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-elevation-2 bg-white border border-gray-200">
      <div className={cn("h-2", status === 'registered' ? "bg-green-500" : status === 'pending' ? "bg-blue-500" : "bg-amber-500")} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold line-clamp-1">{name}</CardTitle>
          <Badge className={cn(getStatusClass(status), "capitalize")}>
            {status}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 text-sm">
          <span className="font-medium">DTI:</span> {dtiNumber}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-0">
        {applications.length > 0 ? (
          <>
            <p className="text-sm font-medium text-gray-700 mb-2">Recent Applications:</p>
            <ul className="space-y-2">
              {applications.slice(0, 2).map((app) => (
                <li key={app.id} className="flex items-center gap-2 text-sm p-2 rounded-md bg-gray-50">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{getApplicationTypeLabel(app.type)}</p>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs py-0 h-5">
                        {app.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{app.date}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : status === 'registered' ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <ClipboardCheck className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-gray-600 mb-1">No applications yet</p>
            <p className="text-sm text-gray-500">Apply for certification now</p>
          </div>
        ) : status === 'pending' ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-gray-600 mb-1">Registration pending</p>
            <p className="text-sm text-gray-500">Awaiting administrator approval</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
              <Building className="h-6 w-6 text-amber-600" />
            </div>
            <p className="text-gray-600 mb-1">Unregistered establishment</p>
            <p className="text-sm text-gray-500">Complete registration to apply for certifications</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-6">
        {status === 'unregistered' && (
          <Button asChild className="w-full bg-safety-blue hover:bg-blue-700">
            <Link to={`/register-establishment/${id}`}>
              Register Establishment
            </Link>
          </Button>
        )}
        
        {status === 'pending' && (
          <Button disabled className="w-full bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200">
            Awaiting Approval
          </Button>
        )}
        
        {status === 'registered' && (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              <Link to={`/establishment/${id}`}>
                View Details
              </Link>
            </Button>
            <Button asChild className="bg-safety-blue hover:bg-blue-700">
              <Link to={`/apply-certification/${id}`}>
                Apply for Certificate
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EstablishmentCard;
