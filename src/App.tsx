
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

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/users/UsersList";
import AdminUserDetails from "./pages/admin/users/UserDetails";
import AdminPendingUsers from "./pages/admin/users/PendingUsers";
import AdminEstablishments from "./pages/admin/establishments/EstablishmentsList";
import AdminEstablishmentDetails from "./pages/admin/establishments/EstablishmentDetails";
import AdminPendingEstablishments from "./pages/admin/establishments/PendingEstablishments";
import AdminFsecApplications from "./pages/admin/applications/FsecApplications";
import AdminFsicOccupancyApplications from "./pages/admin/applications/FsicOccupancyApplications";
import AdminFsicBusinessApplications from "./pages/admin/applications/FsicBusinessApplications";
import AdminApplicationDetails from "./pages/admin/applications/ApplicationDetails";
import AdminInspections from "./pages/admin/inspections/InspectionsList";
import AdminInspectionDetails from "./pages/admin/inspections/InspectionDetails";
import AdminScheduleInspection from "./pages/admin/inspections/ScheduleInspection";
import AdminRescheduleInspection from "./pages/admin/inspections/RescheduleInspection";
import AdminUploadCertificate from "./pages/admin/certificates/UploadCertificate";

// Inspector Pages
import InspectorDashboard from "./pages/inspector/Dashboard";
import InspectorInspections from "./pages/inspector/inspections/InspectionsList";
import InspectorInspectionDetails from "./pages/inspector/inspections/InspectionDetails";
import InspectorChecklist from "./pages/inspector/inspections/Checklist";
import InspectorViewChecklist from "./pages/inspector/inspections/ViewChecklist";

// Owner Pages
import OwnerDashboard from "./pages/owner/Dashboard";
import OwnerEstablishments from "./pages/owner/establishments/EstablishmentsList";
import OwnerEstablishmentDetails from "./pages/owner/establishments/EstablishmentDetails";
import OwnerRegisterEstablishment from "./pages/owner/establishments/RegisterEstablishment";
import OwnerApplications from "./pages/owner/applications/ApplicationsList";
import OwnerApplicationDetails from "./pages/owner/applications/ApplicationDetails";
import OwnerApplySelect from "./pages/owner/applications/ApplySelect";
import OwnerFsecApplication from "./pages/owner/applications/FsecApplication";
import OwnerFsicOccupancyApplication from "./pages/owner/applications/FsicOccupancyApplication";
import OwnerFsicBusinessApplication from "./pages/owner/applications/FsicBusinessApplication";
import OwnerApplicationConfirmation from "./pages/owner/applications/ApplicationConfirmation";

// Shared Pages
import CalendarPage from "./pages/shared/CalendarPage";
import ViewCertificate from "./pages/shared/ViewCertificate";

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
