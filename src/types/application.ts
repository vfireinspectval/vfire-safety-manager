
export type ApplicationType = 'fsec' | 'fsic-business' | 'fsic-occupancy';
export type UserRole = 'admin' | 'inspector' | 'owner';
export type EstablishmentStatus = 'unregistered' | 'pending' | 'registered' | 'rejected';
export type ApplicationStatus = 'unscheduled' | 'for_inspection' | 'inspected' | 'approved' | 'rejected';
export type InspectionStatus = 'pass' | 'fail' | 'conditional';

export interface Profile {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  role: UserRole;
  position?: string;
  account_status: EstablishmentStatus;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface Establishment {
  id: string;
  owner_id: string;
  name: string; // Changed from establishment_name
  dtiNumber: string; // Changed from dti_certificate_no
  status: EstablishmentStatus;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
  applications?: Application[]; // Added to match Dashboard usage
}

export interface Application {
  id: string;
  type: ApplicationType;
  establishment_id: string;
  owner_id: string;
  establishment_name: string;
  dti_certificate_no: string;
  application_date: string;
  application_time: string;
  status: ApplicationStatus;
  uploaded_files?: Record<string, any>;
  inspection_schedule?: string;
  inspector_id?: string;
  rejection_reason?: string;
  certificate_url?: string;
  created_at: string;
  updated_at: string;
}

export interface InspectionChecklist {
  id: string;
  application_id: string;
  inspector_id: string;
  inspection_date: string;
  inspection_time: string;
  checklist_items: Record<string, any>;
  uploaded_images?: Record<string, any>;
  inspector_signature: string;
  inspection_status: InspectionStatus;
  remarks?: string;
  submitted_at: string;
}
