import { useState } from 'react';
import { Calendar, Clock, MapPin, Video, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import ManageSession from './ManageSession';

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
  meetLink?: string;
}

export default function MySchedule() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const sessions: Session[] = [
    {
      id: 1,
      student: 'Nguyễn Văn A',
      studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      subject: 'Giải tích 2',
      date: '2025-10-30',
      time: '14:00 - 16:00',
      location: 'Google Meet',
      type: 'online',
      status: 'upcoming',
      meetLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      student: 'Trần Thị C',
      studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      subject: 'Đại số tuyến tính',
      date: '2025-10-31',
      time: '09:00 - 11:00',
      location: 'Phòng H1-101',
      type: 'offline',
      status: 'upcoming'
    },
    {
      id: 3,
      student: 'Lê Văn B',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      subject: 'Toán rời rạc',
      date: '2025-10-25',
      time: '14:00 - 16:00',
      location: 'Zoom',
      type: 'online',
      status: 'completed'
    },
    {
      id: 4,
      student: 'Phạm Thị D',
      studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      subject: 'Giải tích 2',
      date: '2025-10-23',
      time: '10:00 - 12:00',
      location: 'Phòng H6-202',
      type: 'offline',
      status: 'completed'
    }
  ];

  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  const handleManageSession = (session: Session) => {
    setSelectedSession(session);
    setDialogOpen(true);
  };

  const renderSession = (session: Session) => (
    <Card key={session.id}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={session.studentAvatar} alt={session.student} />
            <AvatarFallback>{session.student.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm">{session.subject}</h3>
                <p className="text-sm text-gray-600 mt-1">Sinh viên: {session.student}</p>
              </div>
              <Badge variant={session.status === 'upcoming' ? 'default' : 'secondary'}>
                {session.status === 'upcoming' ? 'Sắp tới' : 'Đã hoàn thành'}
              </Badge>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{session.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{session.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {session.type === 'online' ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                <span>{session.location}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              {session.status === 'upcoming' && session.type === 'online' && session.meetLink && (
                <Button 
                  className="bg-[#528DFF] hover:bg-[#3d7ae8]"
                  onClick={() => window.open(session.meetLink, '_blank')}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Tham gia học
                </Button>
              )}
              <Button 
                variant={session.status === 'upcoming' ? 'default' : 'outline'}
                onClick={() => handleManageSession(session)}
                className={session.status === 'upcoming' ? 'bg-[#528DFF] hover:bg-[#3d7ae8]' : ''}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {session.status === 'upcoming' ? 'Quản lý buổi học' : 'Xem chi tiết'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div>
        <h1>Lịch của tôi</h1>
        <p className="text-gray-600 mt-1">Quản lý các buổi học đã đặt</p>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              Sắp tới ({upcomingSessions.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Đã hoàn thành ({completedSessions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map(session => renderSession(session))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Bạn chưa có buổi học nào sắp tới</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedSessions.length > 0 ? (
              completedSessions.map(session => renderSession(session))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-600">Chưa có buổi học nào được hoàn thành</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Manage Session Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quản lý buổi học</DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <ManageSession session={selectedSession} onClose={() => setDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
