
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";

// Auth Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import ProfilePage from "./pages/ProfilePage";

// Placeholder component for missing pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container mx-auto py-10">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

// Admin Pages
const AdminDashboard = () => <PlaceholderPage title="Admin Dashboard" />;
const AdminUsers = () => <PlaceholderPage title="Admin Users" />;
const AdminUserDetails = () => <PlaceholderPage title="Admin User Details" />;
const AdminPendingUsers = () => <PlaceholderPage title="Admin Pending Users" />;
const AdminEstablishments = () => <PlaceholderPage title="Admin Establishments" />;
const AdminEstablishmentDetails = () => <PlaceholderPage title="Admin Establishment Details" />;
const AdminPendingEstablishments = () => <PlaceholderPage title="Admin Pending Establishments" />;
const AdminFsecApplications = () => <PlaceholderPage title="Admin FSEC Applications" />;
const AdminFsicOccupancyApplications = () => <PlaceholderPage title="Admin FSIC Occupancy Applications" />;
const AdminFsicBusinessApplications = () => <PlaceholderPage title="Admin FSIC Business Applications" />;
const AdminApplicationDetails = () => <PlaceholderPage title="Admin Application Details" />;
const AdminInspections = () => <PlaceholderPage title="Admin Inspections" />;
const AdminInspectionDetails = () => <PlaceholderPage title="Admin Inspection Details" />;
const AdminScheduleInspection = () => <PlaceholderPage title="Admin Schedule Inspection" />;
const AdminRescheduleInspection = () => <PlaceholderPage title="Admin Reschedule Inspection" />;
const AdminUploadCertificate = () => <PlaceholderPage title="Admin Upload Certificate" />;

// Inspector Pages
const InspectorDashboard = () => <PlaceholderPage title="Inspector Dashboard" />;
const InspectorInspections = () => <PlaceholderPage title="Inspector Inspections" />;
const InspectorInspectionDetails = () => <PlaceholderPage title="Inspector Inspection Details" />;
const InspectorChecklist = () => <PlaceholderPage title="Inspector Checklist" />;
const InspectorViewChecklist = () => <PlaceholderPage title="Inspector View Checklist" />;

// Owner Pages
const OwnerDashboard = () => <PlaceholderPage title="Owner Dashboard" />;
const OwnerEstablishments = () => <PlaceholderPage title="Owner Establishments" />;
const OwnerEstablishmentDetails = () => <PlaceholderPage title="Owner Establishment Details" />;
const OwnerRegisterEstablishment = () => <PlaceholderPage title="Owner Register Establishment" />;
const OwnerApplications = () => <PlaceholderPage title="Owner Applications" />;
const OwnerApplicationDetails = () => <PlaceholderPage title="Owner Application Details" />;
const OwnerApplySelect = () => <PlaceholderPage title="Owner Apply Select" />;
const OwnerFsecApplication = () => <PlaceholderPage title="Owner FSEC Application" />;
const OwnerFsicOccupancyApplication = () => <PlaceholderPage title="Owner FSIC Occupancy Application" />;
const OwnerFsicBusinessApplication = () => <PlaceholderPage title="Owner FSIC Business Application" />;
const OwnerApplicationConfirmation = () => <PlaceholderPage title="Owner Application Confirmation" />;

// Shared Pages
const CalendarPage = () => <PlaceholderPage title="Calendar" />;
const ViewCertificate = () => <PlaceholderPage title="View Certificate" />;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Authenticated Routes with AppLayout */}
            <Route element={<AppLayout />}>
              {/* Shared Routes */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/applications/:id/certificate" element={<ViewCertificate />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/users/:id" element={<AdminUserDetails />} />
              <Route path="/admin/users/pending" element={<AdminPendingUsers />} />
              <Route path="/admin/establishments" element={<AdminEstablishments />} />
              <Route path="/admin/establishments/:id" element={<AdminEstablishmentDetails />} />
              <Route path="/admin/establishments/pending" element={<AdminPendingEstablishments />} />
              <Route path="/admin/applications/fsec" element={<AdminFsecApplications />} />
              <Route path="/admin/applications/fsic-occupancy" element={<AdminFsicOccupancyApplications />} />
              <Route path="/admin/applications/fsic-business" element={<AdminFsicBusinessApplications />} />
              <Route path="/admin/applications/:id" element={<AdminApplicationDetails />} />
              <Route path="/admin/inspections" element={<AdminInspections />} />
              <Route path="/admin/inspections/:id" element={<AdminInspectionDetails />} />
              <Route path="/admin/schedule/:applicationId" element={<AdminScheduleInspection />} />
              <Route path="/admin/reschedule/:applicationId" element={<AdminRescheduleInspection />} />
              <Route path="/admin/applications/:id/upload-certificate" element={<AdminUploadCertificate />} />
              
              {/* Inspector Routes */}
              <Route path="/inspector/dashboard" element={<InspectorDashboard />} />
              <Route path="/inspector/inspections" element={<InspectorInspections />} />
              <Route path="/inspector/inspections/completed" element={<InspectorInspections />} />
              <Route path="/inspector/inspections/:id" element={<InspectorInspectionDetails />} />
              <Route path="/inspector/inspections/:id/checklist" element={<InspectorChecklist />} />
              <Route path="/inspector/inspections/:id/checklist/view" element={<InspectorViewChecklist />} />
              
              {/* Owner Routes */}
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/owner/establishments" element={<OwnerEstablishments />} />
              <Route path="/owner/establishments/:id" element={<OwnerEstablishmentDetails />} />
              <Route path="/owner/establishments/register" element={<OwnerRegisterEstablishment />} />
              <Route path="/owner/applications" element={<OwnerApplications />} />
              <Route path="/owner/applications/:id" element={<OwnerApplicationDetails />} />
              <Route path="/owner/applications/apply" element={<OwnerApplySelect />} />
              <Route path="/owner/applications/fsec" element={<OwnerFsecApplication />} />
              <Route path="/owner/applications/fsic-occupancy" element={<OwnerFsicOccupancyApplication />} />
              <Route path="/owner/applications/fsic-business" element={<OwnerFsicBusinessApplication />} />
              <Route path="/owner/applications/:id/confirmation" element={<OwnerApplicationConfirmation />} />
            </Route>
            
            {/* Error Pages */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
