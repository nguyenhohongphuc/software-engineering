import { useState } from 'react';
import { CheckCircle, FileText, Save } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface Session {
  id: number;
  student: string;
  studentAvatar: string;
  subject: string;
  date: string;
  time: string;
  location: string;
  type: 'online' | 'offline';
  status: 'upcoming' | 'completed';
}

interface ManageSessionProps {
  session: Session;
  onClose: () => void;
}

export default function ManageSession({ session, onClose }: ManageSessionProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(session.status === 'completed');
  const [sessionNotes, setSessionNotes] = useState('');

  const handleCheckIn = () => {
    setIsCheckedIn(!isCheckedIn);
    toast.success(isCheckedIn ? 'Đã hủy điểm danh' : 'Đã điểm danh thành công');
  };

  const handleConcludeSession = () => {
    if (!sessionNotes.trim()) {
      toast.error('Vui lòng nhập ghi chú buổi học');
      return;
    }

    toast.success('Đã lưu biên bản buổi học');
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Session Info */}
      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
        <Avatar className="h-16 w-16">
          <AvatarImage src={session.studentAvatar} alt={session.student} />
          <AvatarFallback>{session.student.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h3>{session.subject}</h3>
          <p className="text-sm text-gray-600 mt-1">Sinh viên: {session.student}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline">{session.date}</Badge>
            <Badge variant="outline">{session.time}</Badge>
            <Badge variant="outline">{session.location}</Badge>
          </div>
        </div>
      </div>

      {/* Check-in */}
      <div className="space-y-3">
        <h3 className="text-sm flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-[#528DFF]" />
          Điểm danh
        </h3>
        <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
          <Checkbox
            id="checkin"
            checked={isCheckedIn}
            onCheckedChange={handleCheckIn}
          />
          <Label htmlFor="checkin" className="cursor-pointer">
            Sinh viên đã có mặt
          </Label>
        </div>
      </div>

      {/* Session Notes */}
      <div className="space-y-3">
        <h3 className="text-sm flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#528DFF]" />
          Ghi chú / Biên bản buổi học
        </h3>
        <Textarea
          value={sessionNotes}
          onChange={(e) => setSessionNotes(e.target.value)}
          placeholder="Ghi chú về buổi học: Những kiến thức đã dạy, tiến độ của sinh viên, bài tập được giao..."
          rows={8}
          className="resize-none"
        />
        <p className="text-xs text-gray-500">
          Ghi chú này sẽ được lưu lại và sinh viên có thể xem được
        </p>
      </div>

      {/* Meeting Link */}
      {session.type === 'online' && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm mb-2">Link học online</h3>
          <p className="text-sm text-gray-700">
            Google Meet: <a href="#" className="text-blue-600 hover:underline">
              https://meet.google.com/abc-defg-hij
            </a>
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Đóng
        </Button>
        <Button 
          onClick={handleConcludeSession} 
          className="flex-1 bg-[#528DFF] hover:bg-[#3d7ae8]"
        >
          <Save className="mr-2 h-4 w-4" />
          Lưu biên bản
        </Button>
      </div>
    </div>
  );
}
