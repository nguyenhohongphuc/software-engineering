import { useState } from 'react';
import { TrendingUp, Save, Calendar, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';

interface Student {
  id: number;
  name: string;
  avatar: string;
  studentId: string;
  subjects: string[];
  totalSessions: number;
  completedSessions: number;
}

interface SessionHistory {
  id: number;
  date: string;
  subject: string;
  notes: string;
  rating: 'excellent' | 'good' | 'needs-improvement';
}

interface StudentProgressProps {
  student: Student;
  onClose: () => void;
}

export default function StudentProgress({ student, onClose }: StudentProgressProps) {
  const [progressNote, setProgressNote] = useState('');

  const sessionHistory: SessionHistory[] = [
    {
      id: 1,
      date: '2025-10-25',
      subject: 'Giải tích 2',
      notes: 'Sinh viên đã nắm vững khái niệm tích phân. Cần làm thêm bài tập về ứng dụng.',
      rating: 'good'
    },
    {
      id: 2,
      date: '2025-10-20',
      subject: 'Giải tích 2',
      notes: 'Đã hoàn thành tốt các bài tập về giới hạn. Tiến bộ rõ rệt.',
      rating: 'excellent'
    },
    {
      id: 3,
      date: '2025-10-15',
      subject: 'Đại số tuyến tính',
      notes: 'Còn khó khăn trong việc tính định thức ma trận. Cần ôn lại kiến thức cơ bản.',
      rating: 'needs-improvement'
    }
  ];

  const handleSaveProgress = () => {
    if (!progressNote.trim()) {
      toast.error('Vui lòng nhập đánh giá tiến độ');
      return;
    }

    toast.success('Đã lưu đánh giá tiến độ');
    setProgressNote('');
  };

  const getRatingBadge = (rating: string) => {
    if (rating === 'excellent') {
      return <Badge className="bg-green-600 hover:bg-green-700">Xuất sắc</Badge>;
    }
    if (rating === 'good') {
      return <Badge className="bg-blue-600 hover:bg-blue-700">Tốt</Badge>;
    }
    return <Badge className="bg-orange-600 hover:bg-orange-700">Cần cải thiện</Badge>;
  };

  const completionRate = Math.round((student.completedSessions / student.totalSessions) * 100);

  return (
    <div className="space-y-6">
      {/* Student Info */}
      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
        <Avatar className="h-20 w-20">
          <AvatarImage src={student.avatar} alt={student.name} />
          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h2>{student.name}</h2>
          <p className="text-sm text-gray-600 mt-1">MSSV: {student.studentId}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {student.subjects.map((subject, index) => (
              <Badge key={index} variant="secondary">
                {subject}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#528DFF]" />
            <h3 className="text-sm">Tổng quan tiến độ</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Số buổi học</p>
              <p className="text-2xl mt-1">
                {student.completedSessions}/{student.totalSessions}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
              <p className="text-2xl mt-1">{completionRate}%</p>
            </div>
          </div>

          <div>
            <Progress value={completionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Session History */}
      <div>
        <h3 className="text-sm mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#528DFF]" />
          Lịch sử các buổi học
        </h3>
        <div className="space-y-3">
          {sessionHistory.map((session) => (
            <Card key={session.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{session.date}</span>
                      <Badge variant="outline" className="text-xs">
                        {session.subject}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{session.notes}</p>
                  </div>
                  <div className="ml-4">
                    {getRatingBadge(session.rating)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Progress Note */}
      <div className="space-y-3 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-sm flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#528DFF]" />
          Thêm đánh giá tiến độ mới
        </h3>
        <div className="space-y-2">
          <Label htmlFor="progress">Ghi chú về tiến độ học tập</Label>
          <Textarea
            id="progress"
            value={progressNote}
            onChange={(e) => setProgressNote(e.target.value)}
            placeholder="Ví dụ: Sinh viên đã hiểu rõ kiến thức về... Cần cải thiện thêm về... Nên làm thêm bài tập về..."
            rows={4}
            className="resize-none bg-white"
          />
        </div>
        <Button 
          onClick={handleSaveProgress}
          className="w-full bg-[#528DFF] hover:bg-[#3d7ae8]"
        >
          <Save className="mr-2 h-4 w-4" />
          Lưu đánh giá
        </Button>
      </div>

      {/* Close Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Đóng
        </Button>
      </div>
    </div>
  );
}
