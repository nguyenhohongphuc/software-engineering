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
    { id: '1', name: 'Giải tích 2', code: 'MT1007', registered: true },
    { id: '2', name: 'Đại số tuyến tính', code: 'MT1003', registered: true },
    { id: '3', name: 'Toán rời rạc', code: 'MT1013', registered: true },
    { id: '4', name: 'Xác suất thống kê', code: 'MT2013', registered: false },
    { id: '5', name: 'Giải tích 3', code: 'MT2007', registered: false },
    { id: '6', name: 'Phương trình vi phân', code: 'MT2015', registered: false },
  ]);

  // Time slots with subjects
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 1,
      date: '2025-11-30',
      dayOfWeek: 'Chủ Nhật',
      startTime: '08:00',
      endTime: '10:00',
      status: 'available',
      subjects: ['1', '2'] // Giải tích 2, Đại số tuyến tính
    },
    {
      id: 2,
      date: '2025-11-30',
      dayOfWeek: 'Chủ Nhật',
      startTime: '14:00',
      endTime: '16:00',
      status: 'booked',
      subjects: ['1'],
      studentName: 'Nguyễn Văn A'
    },
    {
      id: 3,
      date: '2025-12-01',
      dayOfWeek: 'Thứ Hai',
      startTime: '09:00',
      endTime: '11:00',
      status: 'available',
      subjects: ['2', '3']
    },
    {
      id: 4,
      date: '2025-12-01',
      dayOfWeek: 'Thứ Hai',
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
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (startTime >= endTime) {
      toast.error('Thời gian kết thúc phải sau thời gian bắt đầu');
      return;
    }

    if (selectedSubjectsForSlot.length === 0) {
      toast.error('Vui lòng chọn ít nhất một môn học');
      return;
    }

    const dayOfWeekMap: { [key: string]: string } = {
      '0': 'Chủ Nhật',
      '1': 'Thứ Hai',
      '2': 'Thứ Ba',
      '3': 'Thứ Tư',
      '4': 'Thứ Năm',
      '5': 'Thứ Sáu',
      '6': 'Thứ Bảy'
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
    toast.success('Đã thêm khe thời gian rảnh mới');
    
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
      toast.error('Không thể xóa khe thời gian đã được đặt');
      return;
    }

    setTimeSlots(timeSlots.filter(s => s.id !== id));
    toast.success('Đã xóa khe thời gian');
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
        <h1>Quản lý giảng dạy</h1>
        <p className="text-gray-600 mt-1">
          Đăng ký môn học có thể dạy và thiết lập lịch rảnh của bạn
        </p>
      </div>

      <Tabs defaultValue="subjects" className="mt-6">
        <TabsList>
          <TabsTrigger value="subjects">
            <BookOpen className="h-4 w-4 mr-2" />
            Đăng ký môn học
          </TabsTrigger>
          <TabsTrigger value="availability">
            <Calendar className="h-4 w-4 mr-2" />
            Thiết lập lịch rảnh
          </TabsTrigger>
        </TabsList>

        {/* Subject Registration Tab */}
        <TabsContent value="subjects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Môn học có thể dạy</CardTitle>
              <p className="text-sm text-gray-600">
                Chọn các môn học bạn có thể hỗ trợ sinh viên
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
                                Mã: {subject.code}
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
                      Đã đăng ký: {registeredSubjects.length} môn học
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
              <h2>Lịch rảnh của bạn</h2>
              <p className="text-sm text-gray-600 mt-1">
                Tạo các khe thời gian rảnh để sinh viên có thể đặt lịch
              </p>
            </div>
            <Button 
              onClick={() => setDialogOpen(true)} 
              className="bg-[#528DFF] hover:bg-[#3d7ae8]"
              disabled={registeredSubjects.length === 0}
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm khe thời gian
            </Button>
          </div>

          {registeredSubjects.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Vui lòng đăng ký môn học trước khi thiết lập lịch rảnh
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
                                    Còn trống
                                  </Badge>
                                ) : (
                                  <div className="mt-2">
                                    <Badge className="bg-blue-600 hover:bg-blue-700">
                                      Đã đặt
                                    </Badge>
                                    <p className="text-xs text-gray-600 mt-1">
                                      SV: {slot.studentName}
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
                      Bạn chưa thiết lập khe thời gian rảnh nào
                    </p>
                    <Button 
                      onClick={() => setDialogOpen(true)} 
                      className="mt-4 bg-[#528DFF] hover:bg-[#3d7ae8]"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm khe thời gian đầu tiên
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
            <DialogTitle>Thêm khe thời gian rảnh</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Ngày</Label>
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
                <Label htmlFor="startTime">Giờ bắt đầu</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Giờ kết thúc</Label>
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
              <Label>Môn học có thể dạy trong khe thời gian này</Label>
              <p className="text-xs text-gray-600">
                Chọn các môn học bạn sẵn sàng dạy trong khe thời gian này
              </p>
              <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                <div className="space-y-3">
                  {registeredSubjects.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Bạn chưa đăng ký môn học nào
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
                  Đã chọn {selectedSubjectsForSlot.length} môn học
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
              Hủy
            </Button>
            <Button onClick={handleAddSlot} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              <Save className="mr-2 h-4 w-4" />
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Time Slot Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Xóa khe thời gian"
        description="Bạn có chắc chắn muốn xóa khe thời gian này không?"
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