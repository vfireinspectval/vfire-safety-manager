
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Building,
  Calendar,
  ClipboardCheck,
  FileText,
  Flame,
  Home,
  LayoutDashboard,
  Plus,
  Search,
  User,
  Users,
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface RoleSidebarProps {
  role: string;
}

export function RoleSidebar({ role }: RoleSidebarProps) {
  // Admin navigation items
  const adminItems = [
    {
      group: 'Dashboard',
      items: [
        { icon: LayoutDashboard, label: 'Overview', to: '/admin/dashboard' },
      ],
    },
    {
      group: 'User Management',
      items: [
        { icon: Users, label: 'All Users', to: '/admin/users' },
        { icon: User, label: 'Pending Users', to: '/admin/users/pending' },
      ],
    },
    {
      group: 'Establishments',
      items: [
        { icon: Building, label: 'All Establishments', to: '/admin/establishments' },
        { icon: Building, label: 'Pending Establishments', to: '/admin/establishments/pending' },
      ],
    },
    {
      group: 'Applications',
      items: [
        { icon: FileText, label: 'FSEC Applications', to: '/admin/applications/fsec' },
        { icon: FileText, label: 'FSIC (Occupancy)', to: '/admin/applications/fsic-occupancy' },
        { icon: FileText, label: 'FSIC (Business)', to: '/admin/applications/fsic-business' },
      ],
    },
    {
      group: 'Inspections',
      items: [
        { icon: Search, label: 'View Inspections', to: '/admin/inspections' },
        { icon: Calendar, label: 'Calendar', to: '/calendar' },
      ],
    },
  ];

  // Inspector navigation items
  const inspectorItems = [
    {
      group: 'Dashboard',
      items: [
        { icon: LayoutDashboard, label: 'Overview', to: '/inspector/dashboard' },
      ],
    },
    {
      group: 'Inspections',
      items: [
        { icon: Flame, label: 'Assigned Inspections', to: '/inspector/inspections' },
        { icon: ClipboardCheck, label: 'Completed Inspections', to: '/inspector/inspections/completed' },
        { icon: Calendar, label: 'Calendar', to: '/calendar' },
      ],
    },
  ];

  // Owner navigation items
  const ownerItems = [
    {
      group: 'Dashboard',
      items: [
        { icon: LayoutDashboard, label: 'Overview', to: '/owner/dashboard' },
      ],
    },
    {
      group: 'Establishments',
      items: [
        { icon: Building, label: 'My Establishments', to: '/owner/establishments' },
        { icon: Plus, label: 'Register Establishment', to: '/owner/establishments/register' },
      ],
    },
    {
      group: 'Applications',
      items: [
        { icon: FileText, label: 'Apply for Certification', to: '/owner/applications/apply' },
        { icon: FileText, label: 'My Applications', to: '/owner/applications' },
      ],
    },
  ];

  const navigationItems = 
    role === 'admin' ? adminItems :
    role === 'inspector' ? inspectorItems :
    ownerItems;

  return (
    <div className="py-2">
      {navigationItems.map((group, groupIndex) => (
        <SidebarGroup key={groupIndex}>
          <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item, itemIndex) => (
                <SidebarMenuItem key={itemIndex}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 px-4 py-2 w-full rounded-md text-sm font-medium",
                          isActive
                            ? "text-sidebar-primary-foreground bg-sidebar-primary"
                            : "text-sidebar-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-accent"
                        )
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </div>
  );
}
