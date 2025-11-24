import { Calendar, Clock, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function TutorDashboard() {
  const upcomingSessions = [
    {
      id: 1,
      student: 'Nguyễn Văn A',
      studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      subject: 'Giải tích 2',
      date: '2025-10-30',
      time: '14:00 - 16:00',
      location: 'Online - Google Meet',
      status: 'confirmed'
    },
    {
      id: 2,
      student: 'Trần Thị C',
      studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      subject: 'Đại số tuyến tính',
      date: '2025-10-31',
      time: '09:00 - 11:00',
      location: 'Phòng H1-101',
      status: 'confirmed'
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      student: 'Phạm Văn D',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      subject: 'Toán rời rạc',
      requestedTime: '2025-11-02, 15:00 - 17:00',
      requestedAt: '2 gi�� trước'
    }
  ];

  const notifications = [
    { id: 1, message: 'Sinh viên Nguyễn Văn A đã đánh giá 5 sao cho buổi học', time: '1 giờ trước', type: 'success' },
    { id: 2, message: 'Nhắc nhở: Bạn có buổi học vào ngày mai lúc 14:00', time: '3 giờ trước', type: 'info' },
    { id: 3, message: 'Bạn có yêu cầu đặt lịch mới cần duyệt', time: '5 giờ trước', type: 'warning' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Trang chủ</h1>
        <p className="text-gray-600 mt-1">Chào mừng bạn quay trở lại!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Buổi học sắp tới</CardTitle>
            <Calendar className="h-4 w-4 text-[#528DFF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2</div>
            <p className="text-xs text-gray-600 mt-1">Trong tuần này</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Tổng giờ dạy</CardTitle>
            <Clock className="h-4 w-4 text-[#528DFF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">48</div>
            <p className="text-xs text-gray-600 mt-1">Trong tháng này</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Đánh giá trung bình</CardTitle>
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">4.8</div>
            <p className="text-xs text-gray-600 mt-1">42 đánh giá</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Yêu cầu chờ duyệt</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1</div>
            <p className="text-xs text-gray-600 mt-1">Cần xử lý</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Buổi học sắp tới</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <Avatar>
                  <AvatarImage src={session.studentAvatar} alt={session.student} />
                  <AvatarFallback>{session.student.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm">{session.subject}</h3>
                      <p className="text-sm text-gray-600">Sinh viên: {session.student}</p>
                    </div>
                    <Badge variant="default" className="bg-green-500">
                      Đã xác nhận
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
                  <Button size="sm" className="mt-3 bg-[#528DFF] hover:bg-[#3d7ae8]">
                    Quản lý buổi học
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Yêu cầu đặt lịch chờ duyệt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={request.studentAvatar} alt={request.student} />
                    <AvatarFallback>{request.student.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-sm">{request.subject}</h3>
                    <p className="text-sm text-gray-600">Sinh viên: {request.student}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Thời gian: {request.requestedTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{request.requestedAt}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Chấp nhận
                      </Button>
                      <Button size="sm" variant="outline">
                        Từ chối
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {pendingRequests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Không có yêu cầu nào
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Thông báo</CardTitle>
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
  );
}
