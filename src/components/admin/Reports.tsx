import { useState } from 'react';
import { Download, Calendar, Users, BookOpen, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { toast } from 'sonner@2.0.3';

export default function Reports() {
  const [startDate, setStartDate] = useState('2025-09-01');
  const [endDate, setEndDate] = useState('2025-10-29');
  const [selectedTutor, setSelectedTutor] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Sample data for charts
  const sessionsByMonth = [
    { month: 'Tháng 6', sessions: 45 },
    { month: 'Tháng 7', sessions: 52 },
    { month: 'Tháng 8', sessions: 48 },
    { month: 'Tháng 9', sessions: 65 },
    { month: 'Tháng 10', sessions: 72 },
  ];

  const sessionsBySubject = [
    { subject: 'Giải tích', sessions: 45, color: '#528DFF' },
    { subject: 'Lập trình', sessions: 38, color: '#10b981' },
    { subject: 'Vật lý', sessions: 28, color: '#f59e0b' },
    { subject: 'CSDL', sessions: 25, color: '#8b5cf6' },
    { subject: 'Khác', sessions: 18, color: '#6b7280' },
  ];

  const tutorPerformance = [
    { tutor: 'Trần Thị B', sessions: 48, rating: 4.8, students: 12 },
    { tutor: 'Nguyễn Văn D', sessions: 38, rating: 4.9, students: 10 },
    { tutor: 'Lê Thị E', sessions: 35, rating: 4.7, students: 8 },
    { tutor: 'Phạm Văn F', sessions: 42, rating: 4.9, students: 11 },
  ];

  const attendanceData = [
    { name: 'Có mặt', value: 245, color: '#10b981' },
    { name: 'Vắng', value: 15, color: '#ef4444' },
    { name: 'Hủy', value: 22, color: '#f59e0b' },
  ];

  const handleExport = (format: 'pdf' | 'excel') => {
    toast.success(`Đang xuất báo cáo dạng ${format.toUpperCase()}...`);
  };

  return (
    <div className="p-6">
      <div>
        <h1>Báo cáo & Thống kê</h1>
        <p className="text-gray-600 mt-1">
          Xem và xuất báo cáo chi tiết về hoạt động hệ thống
        </p>
      </div>

      {/* Filters */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Bộ lọc báo cáo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Từ ngày</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Đến ngày</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Gia sư</Label>
              <Select value={selectedTutor} onValueChange={setSelectedTutor}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn gia sư" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả gia sư</SelectItem>
                  <SelectItem value="tutor1">Trần Thị B</SelectItem>
                  <SelectItem value="tutor2">Nguyễn Văn D</SelectItem>
                  <SelectItem value="tutor3">Lê Thị E</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Môn học</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn môn học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả môn học</SelectItem>
                  <SelectItem value="math">Giải tích 2</SelectItem>
                  <SelectItem value="programming">Lập trình C++</SelectItem>
                  <SelectItem value="physics">Vật lý đại cương</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              Áp dụng bộ lọc
            </Button>
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="mr-2 h-4 w-4" />
              Xuất PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport('excel')}>
              <Download className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng buổi học</p>
                <p className="text-2xl mt-1">282</p>
              </div>
              <BookOpen className="h-8 w-8 text-[#528DFF]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng giờ dạy</p>
                <p className="text-2xl mt-1">564</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Số sinh viên</p>
                <p className="text-2xl mt-1">156</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
                <p className="text-2xl mt-1">87%</p>
              </div>
              <div className="text-2xl text-green-600">✓</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions by Month */}
        <Card>
          <CardHeader>
            <CardTitle>Số buổi học theo tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sessionsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sessions" stroke="#528DFF" name="Buổi học" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sessions by Subject */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố theo môn học</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sessionsBySubject}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ subject, sessions }) => `${subject}: ${sessions}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="sessions"
                >
                  {sessionsBySubject.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tutor Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất gia sư</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tutorPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tutor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" fill="#528DFF" name="Buổi học" />
                <Bar dataKey="students" fill="#10b981" name="Sinh viên" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ tham dự</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Report Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Báo cáo chi tiết hiệu suất gia sư</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Gia sư</th>
                  <th className="text-right py-3 px-4">Số buổi học</th>
                  <th className="text-right py-3 px-4">Số sinh viên</th>
                  <th className="text-right py-3 px-4">Đánh giá TB</th>
                  <th className="text-right py-3 px-4">Tỷ lệ hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                {tutorPerformance.map((tutor, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{tutor.tutor}</td>
                    <td className="text-right py-3 px-4">{tutor.sessions}</td>
                    <td className="text-right py-3 px-4">{tutor.students}</td>
                    <td className="text-right py-3 px-4">{tutor.rating} ⭐</td>
                    <td className="text-right py-3 px-4">
                      <span className="text-green-600">92%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
