import { useState } from 'react';
import { Calendar, Clock, Plus, X, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner@2.0.3';

interface TimeSlot {
  id: number;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked';
  studentName?: string;
}

export default function SetAvailability() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 1,
      date: '2025-10-30',
      dayOfWeek: 'Thứ Năm',
      startTime: '08:00',
      endTime: '10:00',
      status: 'available'
    },
    {
      id: 2,
      date: '2025-10-30',
      dayOfWeek: 'Thứ Năm',
      startTime: '14:00',
      endTime: '16:00',
      status: 'booked',
      studentName: 'Nguyễn Văn A'
    },
    {
      id: 3,
      date: '2025-10-31',
      dayOfWeek: 'Thứ Sáu',
      startTime: '09:00',
      endTime: '11:00',
      status: 'available'
    },
    {
      id: 4,
      date: '2025-10-31',
      dayOfWeek: 'Thứ Sáu',
      startTime: '15:00',
      endTime: '17:00',
      status: 'available'
    },
    {
      id: 5,
      date: '2025-11-01',
      dayOfWeek: 'Thứ Bảy',
      startTime: '08:00',
      endTime: '10:00',
      status: 'available'
    },
    {
      id: 6,
      date: '2025-11-01',
      dayOfWeek: 'Thứ Bảy',
      startTime: '10:00',
      endTime: '12:00',
      status: 'available'
    }
  ]);

  const handleAddSlot = () => {
    if (!selectedDate || !startTime || !endTime) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (startTime >= endTime) {
      toast.error('Thời gian kết thúc phải sau thời gian bắt đầu');
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
      status: 'available'
    };

    setTimeSlots([...timeSlots, newSlot]);
    toast.success('Đã thêm khe thời gian rảnh mới');
    
    // Reset form
    setSelectedDate('');
    setStartTime('');
    setEndTime('');
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

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1>Thiết lập lịch rảnh</h1>
          <p className="text-gray-600 mt-1">
            Tạo các khe thời gian rảnh để sinh viên có thể đặt lịch
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
          <Plus className="mr-2 h-4 w-4" />
          Thêm khe thời gian
        </Button>
      </div>

      {/* Calendar View */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                            onClick={() => handleDeleteSlot(slot.id)}
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

      {/* Add Time Slot Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddSlot} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              <Save className="mr-2 h-4 w-4" />
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
