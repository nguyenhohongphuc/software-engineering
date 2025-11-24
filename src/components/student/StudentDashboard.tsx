import { Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function StudentDashboard() {
  const upcomingSessions = [
    {
      id: 1,
      tutor: 'Tran Thi B',
      tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      subject: 'Calculus 2',
      date: '2025-10-30',
      time: '14:00 - 16:00',
      location: 'Online - Google Meet',
      status: 'confirmed'
    },
    {
      id: 2,
      tutor: 'Nguyen Van D',
      tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      subject: 'C++ Programming',
      date: '2025-10-31',
      time: '09:00 - 11:00',
      location: 'Room H1-101',
      status: 'pending'
    }
  ];

  const notifications = [
    { id: 2, message: 'Reminder: You have a session tomorrow at 14:00', time: '5 hours ago', type: 'info' },
    { id: 3, message: 'Please rate your Discrete Mathematics session', time: '1 day ago', type: 'warning' }
  ];

  const pendingFeedback = [
    { id: 1, subject: 'General Physics', tutor: 'Le Thi E', date: '2025-10-25' },
    { id: 2, subject: 'Database Systems', tutor: 'Pham Van F', date: '2025-10-23' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-[#528DFF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2</div>
            <p className="text-xs text-gray-600 mt-1">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-[#528DFF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">24</div>
            <p className="text-xs text-gray-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Pending Feedback</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2</div>
            <p className="text-xs text-gray-600 mt-1">Need review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <Avatar>
                  <AvatarImage src={session.tutorAvatar} alt={session.tutor} />
                  <AvatarFallback>{session.tutor.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm">{session.subject}</h3>
                      <p className="text-sm text-gray-600">Tutor: {session.tutor}</p>
                    </div>
                    <Badge variant={session.status === 'confirmed' ? 'default' : 'secondary'}>
                      {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{session.date} | {session.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{session.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {notif.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                {notif.type === 'info' && <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />}
                {notif.type === 'warning' && <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Pending Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Feedback Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingFeedback.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="text-sm">{item.subject}</h3>
                  <p className="text-sm text-gray-600">Tutor: {item.tutor} | {item.date}</p>
                </div>
                <Button size="sm" className="bg-[#528DFF] hover:bg-[#3d7ae8]">
                  Rate Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
