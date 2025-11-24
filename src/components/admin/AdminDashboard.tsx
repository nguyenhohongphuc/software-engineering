import { Users, GraduationCap, BookOpen, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function AdminDashboard() {
  const monthlyData = [
    { month: 'T6', sessions: 45, students: 28 },
    { month: 'T7', sessions: 52, students: 32 },
    { month: 'T8', sessions: 48, students: 30 },
    { month: 'T9', sessions: 65, students: 38 },
    { month: 'T10', sessions: 72, students: 42 },
  ];

  const subjectData = [
    { subject: 'Giải tích', sessions: 45 },
    { subject: 'Lập trình', sessions: 38 },
    { subject: 'Vật lý', sessions: 28 },
    { subject: 'CSDL', sessions: 25 },
    { subject: 'Tiếng Anh', sessions: 18 },
  ];

  const recentActivities = [
    { id: 1, message: 'Sinh viên Nguyễn Văn A đã đặt lịch với gia sư Trần Thị B', time: '10 phút trước', type: 'success' },
    { id: 2, message: 'Gia sư Lê Thị E đã cập nhật lịch rảnh', time: '30 phút trước', type: 'info' },
    { id: 3, message: 'Phản hồi tiêu cực từ sinh viên về buổi học Toán rời rạc', time: '1 giờ trước', type: 'warning' },
    { id: 4, message: 'Lớp học mới "Giải tích nâng cao" đã được tạo', time: '2 giờ trước', type: 'success' },
  ];

  const atRiskClasses = [
    { name: 'Giải tích 2 - Lớp A', tutor: 'Trần Thị B', avgRating: 3.2, totalSessions: 12 },
    { name: 'Vật lý đại cương', tutor: 'Lê Thị E', avgRating: 3.5, totalSessions: 8 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Tổng quan</h1>
        <p className="text-gray-600 mt-1">Thống kê và giám sát hệ thống</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Tổng số buổi học</CardTitle>
            <BookOpen className="h-4 w-4 text-[#528DFF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">282</div>
            <p className="text-xs text-gray-600 mt-1">
              <span className="text-green-600">+12%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Gia sư hoạt động</CardTitle>
            <GraduationCap className="h-4 w-4 text-[#528DFF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">24</div>
            <p className="text-xs text-gray-600 mt-1">
              <span className="text-green-600">+3</span> gia sư mới tháng này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Sinh viên đang học</CardTitle>
            <Users className="h-4 w-4 text-[#528DFF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">156</div>
            <p className="text-xs text-gray-600 mt-1">
              <span className="text-green-600">+8%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Tỷ lệ hài lòng</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">4.6/5.0</div>
            <p className="text-xs text-gray-600 mt-1">Từ 487 đánh giá</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng theo tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sessions" stroke="#528DFF" name="Buổi học" strokeWidth={2} />
                <Line type="monotone" dataKey="students" stroke="#10b981" name="Sinh viên" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố theo môn học</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions" fill="#528DFF" name="Số buổi học" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* At Risk Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Lớp học có rủi ro
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {atRiskClasses.map((cls, index) => (
              <div key={index} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm">{cls.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Gia sư: {cls.tutor}</p>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    {cls.avgRating} ⭐
                  </Badge>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Mức độ hài lòng</span>
                    <span>{cls.avgRating}/5.0</span>
                  </div>
                  <Progress value={(cls.avgRating / 5) * 100} className="h-2" />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {cls.totalSessions} buổi học
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {activity.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                {activity.type === 'info' && <BookOpen className="h-5 w-5 text-blue-500 mt-0.5" />}
                {activity.type === 'warning' && <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
