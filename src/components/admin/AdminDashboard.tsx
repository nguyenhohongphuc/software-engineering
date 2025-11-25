import { Users, GraduationCap, BookOpen, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function AdminDashboard() {
  const monthlyData = [
    { month: 'Jun', sessions: 45, students: 28 },
    { month: 'Jul', sessions: 52, students: 32 },
    { month: 'Aug', sessions: 48, students: 30 },
    { month: 'Sep', sessions: 65, students: 38 },
    { month: 'Oct', sessions: 72, students: 42 },
  ];

  const subjectData = [
    { subject: 'Calculus', sessions: 45 },
    { subject: 'Programming', sessions: 38 },
    { subject: 'Physics', sessions: 28 },
    { subject: 'Database', sessions: 25 },
    { subject: 'English', sessions: 18 },
  ];

  const recentActivities = [
    { id: 1, message: 'Student Nguyen Van A booked a session with tutor Tran Thi B', time: '10 minutes ago', type: 'success' },
    { id: 2, message: 'Tutor Le Thi E updated their availability schedule', time: '30 minutes ago', type: 'info' },
    { id: 3, message: 'Negative feedback from student about Discrete Math session', time: '1 hour ago', type: 'warning' },
    { id: 4, message: 'New class "Advanced Calculus" has been created', time: '2 hours ago', type: 'success' },
  ];

  const atRiskClasses = [
    { name: 'Calculus 2 - Class A', tutor: 'Tran Thi B', avgRating: 3.2, totalSessions: 12 },
    { name: 'General Physics', tutor: 'Le Thi E', avgRating: 3.5, totalSessions: 8 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-gray-600 mt-1">System statistics and monitoring</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Sessions</CardTitle>
            <BookOpen className="h-4 w-4 text-[#528DFF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">282</div>
            <p className="text-xs text-gray-600 mt-1">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Active Tutors</CardTitle>
            <GraduationCap className="h-4 w-4 text-[#528DFF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">24</div>
            <p className="text-xs text-gray-600 mt-1">
              <span className="text-green-600">+3</span> new tutors this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Active Students</CardTitle>
            <Users className="h-4 w-4 text-[#528DFF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">156</div>
            <p className="text-xs text-gray-600 mt-1">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Satisfaction Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">4.6/5.0</div>
            <p className="text-xs text-gray-600 mt-1">From 487 reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sessions" stroke="#528DFF" name="Sessions" strokeWidth={2} />
                <Line type="monotone" dataKey="students" stroke="#10b981" name="Students" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions" fill="#528DFF" name="Sessions" />
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
              At-Risk Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {atRiskClasses.map((cls, index) => (
              <div key={index} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm">{cls.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Tutor: {cls.tutor}</p>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    {cls.avgRating} ⭐
                  </Badge>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Satisfaction Level</span>
                    <span>{cls.avgRating}/5.0</span>
                  </div>
                  <Progress value={(cls.avgRating / 5) * 100} className="h-2" />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {cls.totalSessions} sessions
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
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
