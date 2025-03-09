
export type ApplicationType = 'fsec' | 'fsic-business' | 'fsic-occupancy';

export interface Application {
  id: string;
  type: ApplicationType;
  status: string;
  date: string;
}

export interface Establishment {
  id: string;
  name: string;
  dtiNumber: string;
  status: 'registered' | 'pending' | 'unregistered';
  applications?: Application[];
}
