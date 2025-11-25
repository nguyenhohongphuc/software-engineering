import { useState } from 'react';
import { Calendar, Clock, Plus, X, Save, BookOpen, Check } from 'lucide-react';
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
import { Input } from '../ui/input';
import { ConfirmDialog } from '../ui/confirm-dialog';
import { toast } from 'sonner@2.0.3';

interface Subject {
  id: string;
  name: string;
  code: string;
  registered: boolean;
}

interface TimeSlot {
  id: number;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked';
  subjects: string[]; // Array of subject IDs
  studentName?: string;
}

export default function TutoringSetup() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedSubjectsForSlot, setSelectedSubjectsForSlot] = useState<string[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState<number | null>(null);

  // Available subjects
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Calculus 2', code: 'MT1007', registered: true },
    { id: '2', name: 'Linear Algebra', code: 'MT1003', registered: true },
    { id: '3', name: 'Discrete Mathematics', code: 'MT1013', registered: true },
    { id: '4', name: 'Probability & Statistics', code: 'MT2013', registered: false },
    { id: '5', name: 'Calculus 3', code: 'MT2007', registered: false },
    { id: '6', name: 'Differential Equations', code: 'MT2015', registered: false },
  ]);

  // Time slots with subjects
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 1,
      date: '2025-11-30',
      dayOfWeek: 'Sunday',
      startTime: '08:00',
      endTime: '10:00',
      status: 'available',
      subjects: ['1', '2'] // Calculus 2, Linear Algebra
    },
    {
      id: 2,
      date: '2025-11-30',
      dayOfWeek: 'Sunday',
      startTime: '14:00',
      endTime: '16:00',
      status: 'booked',
      subjects: ['1'],
      studentName: 'Nguyen Van A'
    },
    {
      id: 3,
      date: '2025-12-01',
      dayOfWeek: 'Monday',
      startTime: '09:00',
      endTime: '11:00',
      status: 'available',
      subjects: ['2', '3']
    },
    {
      id: 4,
      date: '2025-12-01',
      dayOfWeek: 'Monday',
      startTime: '15:00',
      endTime: '17:00',
      status: 'available',
      subjects: ['1', '2', '3']
    },
  ]);

  const handleSubjectToggle = (subjectId: string) => {
    setSubjects(subjects.map(s => 
      s.id === subjectId ? { ...s, registered: !s.registered } : s
    ));
  };

  const handleSlotSubjectToggle = (subjectId: string) => {
    setSelectedSubjectsForSlot(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleAddSlot = () => {
    if (!selectedDate || !startTime || !endTime) {
      toast.error('Please fill in all information');
      return;
    }

    if (startTime >= endTime) {
      toast.error('End time must be after start time');
      return;
    }

    if (selectedSubjectsForSlot.length === 0) {
      toast.error('Please select at least one subject');
      return;
    }

    const dayOfWeekMap: { [key: string]: string } = {
      '0': 'Sunday',
      '1': 'Monday',
      '2': 'Tuesday',
      '3': 'Wednesday',
      '4': 'Thursday',
      '5': 'Friday',
      '6': 'Saturday'
    };

    const date = new Date(selectedDate);
    const dayOfWeek = dayOfWeekMap[date.getDay().toString()];

    const newSlot: TimeSlot = {
      id: Math.max(...timeSlots.map(s => s.id), 0) + 1,
      date: selectedDate,
      dayOfWeek,
      startTime,
      endTime,
      status: 'available',
      subjects: selectedSubjectsForSlot
    };

    setTimeSlots([...timeSlots, newSlot]);
    toast.success('New time slot added successfully');
    
    // Reset form
    setSelectedDate('');
    setStartTime('');
    setEndTime('');
    setSelectedSubjectsForSlot([]);
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

  // Group slots by date
  const groupedSlots = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const getSubjectName = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId)?.name || '';
  };

  const registeredSubjects = subjects.filter(s => s.registered);

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
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2>Your Availability</h2>
              <p className="text-sm text-gray-600 mt-1">
                Create time slots for students to book sessions
              </p>
            </div>
            <Button 
              onClick={() => setDialogOpen(true)} 
              className="bg-[#528DFF] hover:bg-[#3d7ae8]"
              disabled={registeredSubjects.length === 0}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Time Slot
            </Button>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Object.entries(groupedSlots)
                .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                .map(([date, slots]) => (
                  <Card key={date}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Calendar className="h-5 w-5 text-[#528DFF]" />
                        <div>
                          <div>{slots[0].dayOfWeek}</div>
                          <div className="text-xs text-gray-500">{date}</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {slots
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map((slot) => (
                          <div
                            key={slot.id}
                            className={`p-3 rounded-lg border-2 ${
                              slot.status === 'available'
                                ? 'border-green-200 bg-green-50'
                                : 'border-blue-200 bg-blue-50'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span className="text-sm">
                                    {slot.startTime} - {slot.endTime}
                                  </span>
                                </div>
                                
                                {/* Subjects for this slot */}
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {slot.subjects.map(subjectId => (
                                    <Badge 
                                      key={subjectId}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {getSubjectName(subjectId)}
                                    </Badge>
                                  ))}
                                </div>

                                {slot.status === 'available' ? (
                                  <Badge className="mt-2 bg-green-600 hover:bg-green-700">
                                    Available
                                  </Badge>
                                ) : (
                                  <div className="mt-2">
                                    <Badge className="bg-blue-600 hover:bg-blue-700">
                                      Booked
                                    </Badge>
                                    <p className="text-xs text-gray-600 mt-1">
                                      Student: {slot.studentName}
                                    </p>
                                  </div>
                                )}
                              </div>
                              {slot.status === 'available' && (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => {
                                    setDeleteConfirmOpen(true);
                                    setSlotToDelete(slot.id);
                                  }}
                                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                ))}

              {Object.keys(groupedSlots).length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      You haven't set up any time slots yet
                    </p>
                    <Button 
                      onClick={() => setDialogOpen(true)} 
                      className="mt-4 bg-[#528DFF] hover:bg-[#3d7ae8]"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Time Slot
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Time Slot Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Time Slot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            {/* Subject Selection */}
            <div className="space-y-2">
              <Label>Subjects Available in This Time Slot</Label>
              <p className="text-xs text-gray-600">
                Select subjects you're ready to teach during this time
              </p>
              <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                <div className="space-y-3">
                  {registeredSubjects.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      You haven't registered any subjects yet
                    </p>
                  ) : (
                    registeredSubjects.map((subject) => (
                      <div key={subject.id} className="flex items-center gap-3">
                        <Checkbox
                          id={`slot-${subject.id}`}
                          checked={selectedSubjectsForSlot.includes(subject.id)}
                          onCheckedChange={() => handleSlotSubjectToggle(subject.id)}
                        />
                        <Label
                          htmlFor={`slot-${subject.id}`}
                          className="cursor-pointer flex-1"
                        >
                          <div className="flex items-center justify-between">
                            <span>{subject.name}</span>
                            <span className="text-xs text-gray-500">{subject.code}</span>
                          </div>
                        </Label>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {selectedSubjectsForSlot.length > 0 && (
                <p className="text-xs text-[#528DFF]">
                  {selectedSubjectsForSlot.length} subject(s) selected
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setDialogOpen(false);
                setSelectedDate('');
                setStartTime('');
                setEndTime('');
                setSelectedSubjectsForSlot([]);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddSlot} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Time Slot Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Time Slot"
        description="Are you sure you want to delete this time slot?"
        onConfirm={() => {
          if (slotToDelete !== null) {
            handleDeleteSlot(slotToDelete);
          }
          setDeleteConfirmOpen(false);
        }}
      />
    </div>
  );
}
