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
    { month: 'June', sessions: 45 },
    { month: 'July', sessions: 52 },
    { month: 'August', sessions: 48 },
    { month: 'September', sessions: 65 },
    { month: 'October', sessions: 72 },
  ];

  const sessionsBySubject = [
    { subject: 'Calculus', sessions: 45, color: '#528DFF' },
    { subject: 'Programming', sessions: 38, color: '#10b981' },
    { subject: 'Physics', sessions: 28, color: '#f59e0b' },
    { subject: 'Database', sessions: 25, color: '#8b5cf6' },
    { subject: 'Others', sessions: 18, color: '#6b7280' },
  ];

  const tutorPerformance = [
    { tutor: 'Tran Thi B', sessions: 48, rating: 4.8, students: 12 },
    { tutor: 'Nguyen Van D', sessions: 38, rating: 4.9, students: 10 },
    { tutor: 'Le Thi E', sessions: 35, rating: 4.7, students: 8 },
    { tutor: 'Pham Van F', sessions: 42, rating: 4.9, students: 11 },
  ];

  const attendanceData = [
    { name: 'Present', value: 245, color: '#10b981' },
    { name: 'Absent', value: 15, color: '#ef4444' },
    { name: 'Cancelled', value: 22, color: '#f59e0b' },
  ];

  const handleExport = (format: 'pdf' | 'excel') => {
    toast.success(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="p-6">
      <div>
        <h1>Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">
          View and export detailed reports on system activities
        </p>
      </div>

      {/* Filters */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">From Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">To Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Tutor</Label>
              <Select value={selectedTutor} onValueChange={setSelectedTutor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tutor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tutors</SelectItem>
                  <SelectItem value="tutor1">Tran Thi B</SelectItem>
                  <SelectItem value="tutor2">Nguyen Van D</SelectItem>
                  <SelectItem value="tutor3">Le Thi E</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Calculus 2</SelectItem>
                  <SelectItem value="programming">C++ Programming</SelectItem>
                  <SelectItem value="physics">General Physics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport('excel')}>
              <Download className="mr-2 h-4 w-4" />
              Export Excel
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
                <p className="text-sm text-gray-600">Total Sessions</p>
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
                <p className="text-sm text-gray-600">Total Hours</p>
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
                <p className="text-sm text-gray-600">Total Students</p>
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
                <p className="text-sm text-gray-600">Completion Rate</p>
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
            <CardTitle>Sessions by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sessionsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sessions" stroke="#528DFF" name="Sessions" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sessions by Subject */}
        <Card>
          <CardHeader>
            <CardTitle>Distribution by Subject</CardTitle>
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
            <CardTitle>Tutor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tutorPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tutor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" fill="#528DFF" name="Sessions" />
                <Bar dataKey="students" fill="#10b981" name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate</CardTitle>
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
          <CardTitle>Detailed Tutor Performance Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Tutor</th>
                  <th className="text-right py-3 px-4">Sessions</th>
                  <th className="text-right py-3 px-4">Students</th>
                  <th className="text-right py-3 px-4">Avg. Rating</th>
                  <th className="text-right py-3 px-4">Completion Rate</th>
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
