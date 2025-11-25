import { useState } from 'react';
import { Users, TrendingUp, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import StudentProgress from './StudentProgress';

interface Student {
  id: number;
  name: string;
  avatar: string;
  studentId: string;
  subjects: string[];
  totalSessions: number;
  completedSessions: number;
  lastSession: string;
}

export default function MyStudents() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const students: Student[] = [
    {
      id: 1,
      name: 'Nguyen Van A',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      studentId: '2012345',
      subjects: ['Calculus 2', 'Linear Algebra'],
      totalSessions: 8,
      completedSessions: 6,
      lastSession: '2025-10-25'
    },
    {
      id: 2,
      name: 'Tran Thi C',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      studentId: '2012346',
      subjects: ['Linear Algebra', 'Discrete Mathematics'],
      totalSessions: 10,
      completedSessions: 8,
      lastSession: '2025-10-24'
    },
    {
      id: 3,
      name: 'Le Van B',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      studentId: '2012347',
      subjects: ['Calculus 2'],
      totalSessions: 4,
      completedSessions: 3,
      lastSession: '2025-10-22'
    },
    {
      id: 4,
      name: 'Pham Thi D',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      studentId: '2012348',
      subjects: ['Calculus 2', 'Discrete Mathematics'],
      totalSessions: 6,
      completedSessions: 5,
      lastSession: '2025-10-23'
    }
  ];

  const handleViewProgress = (student: Student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div>
        <h1>My Students</h1>
        <p className="text-gray-600 mt-1">
          List of students you are supporting
        </p>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-[#528DFF]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed Sessions</p>
                <p className="text-2xl">
                  {students.reduce((sum, s) => sum + s.completedSessions, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl">
                  {Math.round(
                    (students.reduce((sum, s) => sum + s.completedSessions, 0) /
                      students.reduce((sum, s) => sum + s.totalSessions, 0)) *
                      100
                  )}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {students.map((student) => (
          <Card key={student.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="text-sm">{student.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Student ID: {student.studentId}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {student.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p>
                      Sessions: {student.completedSessions}/{student.totalSessions}
                    </p>
                    <p>Last Session: {student.lastSession}</p>
                  </div>

                  <Button
                    onClick={() => handleViewProgress(student)}
                    className="mt-4 w-full bg-[#528DFF] hover:bg-[#3d7ae8]"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Progress
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Progress Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Track Student Progress</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <StudentProgress student={selectedStudent} onClose={() => setDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
