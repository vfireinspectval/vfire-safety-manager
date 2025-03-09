
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

// Mock inspection data
const mockInspections = [
  {
    id: '1',
    date: '2023-06-15',
    time: '09:00 AM',
    establishmentName: 'Downtown Cafe',
    address: '123 Main St, Anytown, CA',
    type: 'FSIC (Business)',
    inspector: 'John Smith',
    status: 'scheduled'
  },
  {
    id: '2',
    date: '2023-06-15',
    time: '02:00 PM',
    establishmentName: 'City Mall',
    address: '789 Center Ave, Anytown, CA',
    type: 'FSEC',
    inspector: 'Maria Rodriguez',
    status: 'scheduled'
  },
  {
    id: '3',
    date: '2023-06-18',
    time: '10:30 AM',
    establishmentName: 'Harbor Hotel',
    address: '456 Ocean Blvd, Anytown, CA',
    type: 'FSIC (Occupancy)',
    inspector: 'John Smith',
    status: 'scheduled'
  },
  {
    id: '4',
    date: '2023-06-20',
    time: '11:00 AM',
    establishmentName: 'Sunrise Apartments',
    address: '222 Highland Dr, Anytown, CA',
    type: 'FSEC',
    inspector: 'Maria Rodriguez',
    status: 'scheduled'
  },
  {
    id: '5',
    date: '2023-06-22',
    time: '01:30 PM',
    establishmentName: 'Metro Office Building',
    address: '101 Business Park, Anytown, CA',
    type: 'FSIC (Business)',
    inspector: 'John Smith',
    status: 'scheduled'
  },
];

export default function CalendarPage() {
  const { profile } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'day' | 'list'>('month');
  
  const userRole = profile?.role || 'owner';
  
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
  const prevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };
  
  const inspectionsForDate = (date: Date) => {
    return mockInspections.filter(inspection => 
      isSameDay(parseISO(inspection.date), date)
    );
  };
  
  const hasInspectionsOnDate = (date: Date) => {
    return inspectionsForDate(date).length > 0;
  };
  
  // Determine if user can create/edit inspections based on role
  const canManageInspections = userRole === 'admin' || userRole === 'inspector';
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Inspection Calendar</h1>
        
        {canManageInspections && (
          <Button>
            Schedule New Inspection
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="month" onValueChange={(value) => setView(value as 'month' | 'day' | 'list')}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="month" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center py-2 font-medium text-sm">
                    {day}
                  </div>
                ))}
                
                {Array.from({ length: startOfMonth(currentMonth).getDay() }, (_, i) => (
                  <div key={`empty-${i}`} className="bg-white h-24 p-2" />
                ))}
                
                {daysInMonth.map((day) => {
                  const isToday = isSameDay(day, new Date());
                  const isSelectedDay = selectedDate && isSameDay(day, selectedDate);
                  const hasEvents = hasInspectionsOnDate(day);
                  
                  return (
                    <div
                      key={day.toString()}
                      className={cn(
                        "bg-white h-24 p-2 transition-colors hover:bg-gray-50",
                        isToday && "bg-blue-50",
                        isSelectedDay && "ring-2 ring-safety-blue",
                      )}
                      onClick={() => {
                        setSelectedDate(day);
                        setView('day');
                      }}
                    >
                      <div className="flex flex-col h-full">
                        <div className={cn(
                          "w-6 h-6 flex items-center justify-center rounded-full mb-1",
                          isToday && "bg-safety-blue text-white font-medium"
                        )}>
                          {format(day, 'd')}
                        </div>
                        
                        {hasEvents && (
                          <div className="flex flex-col gap-1 overflow-hidden">
                            {inspectionsForDate(day).slice(0, 2).map((event, i) => (
                              <div 
                                key={event.id} 
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs truncate"
                              >
                                {event.time} - {event.establishmentName}
                              </div>
                            ))}
                            
                            {inspectionsForDate(day).length > 2 && (
                              <div className="text-xs text-gray-500 pl-2">
                                +{inspectionsForDate(day).length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="day" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}</span>
                {canManageInspections && selectedDate && (
                  <Button size="sm">Schedule for this day</Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                inspectionsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-4">
                    {inspectionsForDate(selectedDate).map((inspection) => (
                      <div 
                        key={inspection.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{inspection.establishmentName}</h3>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {inspection.type}
                          </span>
                        </div>
                        <div className="text-gray-600 space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{inspection.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{inspection.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>Inspector: {inspection.inspector}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No inspections scheduled</h3>
                    <p className="mt-1 text-gray-500">
                      {canManageInspections 
                        ? "Click the button above to schedule an inspection for this day."
                        : "There are no inspections scheduled for this day."}
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No date selected</h3>
                  <p className="mt-1 text-gray-500">
                    Please select a date from the calendar to view inspections.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Inspections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockInspections.map((inspection) => (
                  <div 
                    key={inspection.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{inspection.establishmentName}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {inspection.type}
                      </span>
                    </div>
                    <div className="text-gray-600 space-y-2">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{format(parseISO(inspection.date), 'EEEE, MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{inspection.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{inspection.address}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
