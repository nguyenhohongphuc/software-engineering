import { useState, useRef } from 'react';
import { Calendar, Clock, Save, BookOpen, Check, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

interface Subject {
  id: string;
  name: string;
  code: string;
  registered: boolean;
}

interface TimeSlot {
  id: number;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startHour: number; // 0-23
  endHour: number; // 1-24
  status: 'available' | 'booked';
  subjects: string[]; // Array of subject IDs
  studentName?: string;
}

export default function TutoringSetup() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Calculus 2', code: 'MT1007', registered: true },
    { id: '2', name: 'Linear Algebra', code: 'MT1003', registered: true },
    { id: '3', name: 'Discrete Mathematics', code: 'MT1013', registered: true },
    { id: '4', name: 'Probability & Statistics', code: 'MT2013', registered: false },
    { id: '5', name: 'Calculus 3', code: 'MT2007', registered: false },
    { id: '6', name: 'Differential Equations', code: 'MT2015', registered: false },
  ]);

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 1,
      dayOfWeek: 0,
      startHour: 8,
      endHour: 10,
      status: 'available',
      subjects: ['1', '2']
    },
    {
      id: 2,
      dayOfWeek: 0,
      startHour: 14,
      endHour: 16,
      status: 'booked',
      subjects: ['1'],
      studentName: 'Nguyen Van A'
    },
    {
      id: 3,
      dayOfWeek: 1,
      startHour: 9,
      endHour: 11,
      status: 'available',
      subjects: ['2', '3']
    },
    {
      id: 4,
      dayOfWeek: 1,
      startHour: 15,
      endHour: 17,
      status: 'available',
      subjects: ['1', '2', '3']
    },
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ day: number; hour: number } | null>(null);
  const [dragEnd, setDragEnd] = useState<{ day: number; hour: number } | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6 AM to 9 PM

  const registeredSubjects = subjects.filter(s => s.registered);

  const handleSubjectToggle = (subjectId: string) => {
    setSubjects(subjects.map(s => 
      s.id === subjectId ? { ...s, registered: !s.registered } : s
    ));
  };

  const handleSlotSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const getCellKey = (day: number, hour: number) => `${day}-${hour}`;

  const isSlotOccupied = (day: number, hour: number) => {
    return timeSlots.some(
      slot => slot.dayOfWeek === day && hour >= slot.startHour && hour < slot.endHour
    );
  };

  const getSlotAtCell = (day: number, hour: number) => {
    return timeSlots.find(
      slot => slot.dayOfWeek === day && hour >= slot.startHour && hour < slot.endHour
    );
  };

  const isCellSelected = (day: number, hour: number) => {
    if (!dragStart || !dragEnd) return false;
    
    const minDay = Math.min(dragStart.day, dragEnd.day);
    const maxDay = Math.max(dragStart.day, dragEnd.day);
    const minHour = Math.min(dragStart.hour, dragEnd.hour);
    const maxHour = Math.max(dragStart.hour, dragEnd.hour);
    
    return day >= minDay && day <= maxDay && hour >= minHour && hour <= maxHour;
  };

  const handleMouseDown = (day: number, hour: number) => {
    if (registeredSubjects.length === 0) {
      toast.error('Please register subjects before setting availability');
      return;
    }

    // Don't allow selecting over booked slots
    if (isSlotOccupied(day, hour)) {
      const slot = getSlotAtCell(day, hour);
      if (slot?.status === 'booked') {
        toast.error('Cannot modify booked time slots');
        return;
      }
    }

    setIsDragging(true);
    setDragStart({ day, hour });
    setDragEnd({ day, hour });
  };

  const handleMouseEnter = (day: number, hour: number) => {
    if (isDragging && dragStart) {
      // Restrict to same day for simplicity
      if (day === dragStart.day) {
        setDragEnd({ day, hour });
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging && dragStart && dragEnd) {
      // Check if selection overlaps with existing slots
      const minHour = Math.min(dragStart.hour, dragEnd.hour);
      const maxHour = Math.max(dragStart.hour, dragEnd.hour) + 1;
      
      const hasOverlap = timeSlots.some(
        slot => slot.dayOfWeek === dragStart.day && 
                ((slot.startHour >= minHour && slot.startHour < maxHour) ||
                 (slot.endHour > minHour && slot.endHour <= maxHour) ||
                 (slot.startHour <= minHour && slot.endHour >= maxHour))
      );

      if (hasOverlap) {
        toast.error('Selected time overlaps with existing slots');
        setIsDragging(false);
        setDragStart(null);
        setDragEnd(null);
        return;
      }

      // Open dialog to select subjects
      setDialogOpen(true);
    }
  };

  const handleSaveSlot = () => {
    if (!dragStart || !dragEnd || selectedSubjects.length === 0) {
      toast.error('Please select at least one subject');
      return;
    }

    const minHour = Math.min(dragStart.hour, dragEnd.hour);
    const maxHour = Math.max(dragStart.hour, dragEnd.hour) + 1;

    const newSlot: TimeSlot = {
      id: Math.max(...timeSlots.map(s => s.id), 0) + 1,
      dayOfWeek: dragStart.day,
      startHour: minHour,
      endHour: maxHour,
      status: 'available',
      subjects: selectedSubjects
    };

    setTimeSlots([...timeSlots, newSlot]);
    toast.success('Time slot added successfully');

    // Reset
    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
    setSelectedSubjects([]);
    setDialogOpen(false);
  };

  const handleDeleteSlot = (id: number) => {
    const slot = timeSlots.find(s => s.id === id);
    if (slot?.status === 'booked') {
      toast.error('Cannot delete booked time slots');
      return;
    }

    setTimeSlots(timeSlots.filter(s => s.id !== id));
    toast.success('Time slot deleted');
  };

  const getSubjectName = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId)?.name || '';
  };

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  return (
    <div className="p-6">
      <div>
        <h1>Tutoring Management</h1>
        <p className="text-gray-600 mt-1">
          Register subjects you can teach and set your availability
        </p>
      </div>

      <Tabs defaultValue="subjects" className="mt-6">
        <TabsList>
          <TabsTrigger value="subjects">
            <BookOpen className="h-4 w-4 mr-2" />
            Register Subjects
          </TabsTrigger>
          <TabsTrigger value="availability">
            <Calendar className="h-4 w-4 mr-2" />
            Set Availability
          </TabsTrigger>
        </TabsList>

        {/* Subject Registration Tab */}
        <TabsContent value="subjects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Subjects You Can Teach</CardTitle>
              <p className="text-sm text-gray-600">
                Select subjects you can help students with
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      subject.registered
                        ? 'border-[#528DFF] bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={subject.id}
                        checked={subject.registered}
                        onCheckedChange={() => handleSubjectToggle(subject.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={subject.id}
                          className="cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div>{subject.name}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                Code: {subject.code}
                              </div>
                            </div>
                            {subject.registered && (
                              <Check className="h-5 w-5 text-[#528DFF]" />
                            )}
                          </div>
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-[#528DFF] mt-0.5" />
                  <div>
                    <p className="text-sm">
                      Registered: {registeredSubjects.length} subjects
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {registeredSubjects.map(s => s.name).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Availability Schedule Tab */}
        <TabsContent value="availability" className="mt-6">
          <div className="mb-6">
            <h2>Weekly Availability Calendar</h2>
            <p className="text-sm text-gray-600 mt-1">
              Click and drag on the calendar to select your available hours
            </p>
          </div>

          {registeredSubjects.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Please register subjects before setting availability
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <div 
                    className="inline-block min-w-full select-none"
                    onMouseUp={handleMouseUp}
                    onMouseLeave={() => {
                      if (isDragging) {
                        handleMouseUp();
                      }
                    }}
                  >
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 bg-gray-100 p-2 text-sm w-24">
                            Time
                          </th>
                          {daysOfWeek.map((day, index) => (
                            <th 
                              key={index} 
                              className="border border-gray-300 bg-gray-100 p-2 text-sm min-w-[100px]"
                            >
                              {day}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {hours.map((hour) => (
                          <tr key={hour}>
                            <td className="border border-gray-300 bg-gray-50 p-2 text-xs text-center">
                              {formatHour(hour)}
                            </td>
                            {daysOfWeek.map((_, dayIndex) => {
                              const slot = getSlotAtCell(dayIndex, hour);
                              const isSelected = isCellSelected(dayIndex, hour);
                              const isOccupied = isSlotOccupied(dayIndex, hour);

                              // Check if this is the first cell of a slot
                              const isSlotStart = slot && slot.startHour === hour;

                              return (
                                <td
                                  key={`${dayIndex}-${hour}`}
                                  className={`border border-gray-300 p-0 h-12 cursor-pointer relative ${
                                    isSelected && isDragging
                                      ? 'bg-blue-200 border-blue-400'
                                      : isOccupied
                                      ? slot?.status === 'booked'
                                        ? 'bg-purple-100'
                                        : 'bg-green-100'
                                      : 'bg-white hover:bg-gray-50'
                                  }`}
                                  onMouseDown={() => handleMouseDown(dayIndex, hour)}
                                  onMouseEnter={() => handleMouseEnter(dayIndex, hour)}
                                >
                                  {isSlotStart && slot && (
                                    <div className="absolute inset-0 flex items-center justify-center p-1">
                                      <div className="w-full">
                                        <div className="flex items-center justify-between gap-1">
                                          <div className="flex-1 min-w-0">
                                            <p className="text-xs truncate">
                                              {formatHour(slot.startHour)} - {formatHour(slot.endHour)}
                                            </p>
                                            <div className="flex flex-wrap gap-0.5 mt-0.5">
                                              {slot.subjects.slice(0, 2).map(subjectId => (
                                                <Badge 
                                                  key={subjectId}
                                                  variant="secondary"
                                                  className="text-[10px] px-1 py-0"
                                                >
                                                  {getSubjectName(subjectId).substring(0, 8)}
                                                </Badge>
                                              ))}
                                            </div>
                                            {slot.status === 'booked' && (
                                              <p className="text-[10px] text-purple-700 mt-0.5 truncate">
                                                {slot.studentName}
                                              </p>
                                            )}
                                          </div>
                                          {slot.status === 'available' && (
                                            <Button
                                              size="icon"
                                              variant="ghost"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteSlot(slot.id);
                                              }}
                                              className="h-5 w-5 text-red-600 hover:text-red-700 hover:bg-red-100 flex-shrink-0"
                                            >
                                              <Trash2 className="h-3 w-3" />
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-gray-300 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-100 border border-gray-300 rounded"></div>
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
                    <span>Selecting</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Subject Selection Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        if (!open) {
          setDialogOpen(false);
          setIsDragging(false);
          setDragStart(null);
          setDragEnd(null);
          setSelectedSubjects([]);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Subjects for Time Slot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              Choose which subjects you can teach during this time:
            </p>
            <div className="space-y-3">
              {registeredSubjects.map((subject) => (
                <div key={subject.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`dialog-${subject.id}`}
                    checked={selectedSubjects.includes(subject.id)}
                    onCheckedChange={() => handleSlotSubjectToggle(subject.id)}
                  />
                  <Label
                    htmlFor={`dialog-${subject.id}`}
                    className="cursor-pointer flex-1"
                  >
                    <div className="flex items-center justify-between">
                      <span>{subject.name}</span>
                      <span className="text-xs text-gray-500">{subject.code}</span>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setDialogOpen(false);
                setIsDragging(false);
                setDragStart(null);
                setDragEnd(null);
                setSelectedSubjects([]);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveSlot} 
              className="bg-[#528DFF] hover:bg-[#3d7ae8]"
              disabled={selectedSubjects.length === 0}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Time Slot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
