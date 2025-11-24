import { useState } from 'react';
import { BookOpen, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface Course {
  id: number;
  code: string;
  name: string;
  faculty: string;
  credits: number;
}

export default function CourseRegistration() {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([1, 2, 5]);

  const courses: Course[] = [
    { id: 1, code: 'MT1007', name: 'Calculus 2', faculty: 'Mathematics & Computer Science', credits: 4 },
    { id: 2, code: 'PH1007', name: 'General Physics 2', faculty: 'Physics', credits: 4 },
    { id: 3, code: 'CH1007', name: 'General Chemistry', faculty: 'Chemistry', credits: 3 },
    { id: 4, code: 'MT2013', name: 'Linear Algebra', faculty: 'Mathematics & Computer Science', credits: 3 },
    { id: 5, code: 'MT2003', name: 'Discrete Mathematics', faculty: 'Mathematics & Computer Science', credits: 4 },
    { id: 6, code: 'CO1027', name: 'C++ Programming', faculty: 'Computer Science', credits: 4 },
    { id: 7, code: 'CO2003', name: 'Data Structures and Algorithms', faculty: 'Computer Science', credits: 4 },
    { id: 8, code: 'CO2013', name: 'Database Systems', faculty: 'Computer Science', credits: 4 },
    { id: 9, code: 'CO3001', name: 'Software Engineering', faculty: 'Computer Science', credits: 4 },
    { id: 10, code: 'ME2013', name: 'Engineering Mechanics', faculty: 'Mechanical Engineering', credits: 3 },
    { id: 11, code: 'EE2003', name: 'Electric Circuits', faculty: 'Electrical & Electronics', credits: 4 },
    { id: 12, code: 'FL1007', name: 'Technical English', faculty: 'Foreign Languages', credits: 3 },
  ];

  const toggleCourse = (courseId: number) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSave = () => {
    toast.success(`Saved ${selectedCourses.length} courses for tutoring support`);
  };

  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.faculty]) {
      acc[course.faculty] = [];
    }
    acc[course.faculty].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1>My Courses</h1>
          <p className="text-gray-600 mt-1">
            Select the courses you need tutoring support for
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          <Check className="mr-1 h-4 w-4" />
          {selectedCourses.length} selected
        </Badge>
      </div>

      <div className="mt-6 space-y-6">
        {Object.entries(groupedCourses).map(([faculty, facultyCourses]) => (
          <Card key={faculty}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <BookOpen className="h-5 w-5 text-[#528DFF]" />
                {faculty}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {facultyCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      selectedCourses.includes(course.id)
                        ? 'border-[#528DFF] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleCourse(course.id)}
                  >
                    <Checkbox
                      checked={selectedCourses.includes(course.id)}
                      onCheckedChange={() => toggleCourse(course.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm">{course.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {course.code}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {course.credits} credits
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button 
          variant="outline"
          onClick={() => setSelectedCourses([])}
        >
          Deselect All
        </Button>
        <Button 
          onClick={handleSave}
          className="bg-[#528DFF] hover:bg-[#3d7ae8]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
