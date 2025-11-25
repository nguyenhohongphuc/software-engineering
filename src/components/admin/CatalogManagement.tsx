import { useState } from 'react';
import { Plus, BookOpen, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

interface Course {
  id: number;
  code: string;
  name: string;
  faculty: string;
  credits: number;
}

interface Skill {
  id: number;
  name: string;
  category: string;
}

export default function CatalogManagement() {
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);

  // Course form state
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [credits, setCredits] = useState('');

  // Skill form state
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState('');

  const [courses, setCourses] = useState<Course[]>([
    { id: 1, code: 'MT1007', name: 'Calculus 2', faculty: 'Mathematics & CS', credits: 4 },
    { id: 2, code: 'MT2013', name: 'Linear Algebra', faculty: 'Mathematics & CS', credits: 3 },
    { id: 3, code: 'CO1027', name: 'C++ Programming', faculty: 'Computer Science', credits: 4 },
    { id: 4, code: 'CO2013', name: 'Database Systems', faculty: 'Computer Science', credits: 4 },
    { id: 5, code: 'PH1007', name: 'General Physics 2', faculty: 'Physics', credits: 4 },
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: 'Calculus', category: 'Mathematics' },
    { id: 2, name: 'Algebra', category: 'Mathematics' },
    { id: 3, name: 'C++ Programming', category: 'Programming' },
    { id: 4, name: 'Python', category: 'Programming' },
    { id: 5, name: 'SQL', category: 'Database' },
    { id: 6, name: 'IELTS', category: 'Foreign Language' },
  ]);

  const handleAddCourse = () => {
    if (!courseCode || !courseName || !faculty || !credits) {
      toast.error('Please fill in all information');
      return;
    }

    const newCourse: Course = {
      id: Math.max(...courses.map(c => c.id), 0) + 1,
      code: courseCode,
      name: courseName,
      faculty,
      credits: parseInt(credits)
    };

    setCourses([...courses, newCourse]);
    toast.success('Course added successfully');

    // Reset form
    setCourseCode('');
    setCourseName('');
    setFaculty('');
    setCredits('');
    setCourseDialogOpen(false);
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
    toast.success('Course deleted');
  };

  const handleAddSkill = () => {
    if (!skillName || !skillCategory) {
      toast.error('Please fill in all information');
      return;
    }

    const newSkill: Skill = {
      id: Math.max(...skills.map(s => s.id), 0) + 1,
      name: skillName,
      category: skillCategory
    };

    setSkills([...skills, newSkill]);
    toast.success('Skill added successfully');

    // Reset form
    setSkillName('');
    setSkillCategory('');
    setSkillDialogOpen(false);
  };

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
    toast.success('Skill deleted');
  };

  return (
    <div className="p-6">
      <div>
        <h1>Catalog Management</h1>
        <p className="text-gray-600 mt-1">
          Manage courses and skills in the system
        </p>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="courses">
          <TabsList>
            <TabsTrigger value="courses">
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Award className="h-4 w-4 mr-2" />
              Skills
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Course List</CardTitle>
                <Button onClick={() => setCourseDialogOpen(true)} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Course
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Credits</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>{course.code}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.faculty}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Skills List</CardTitle>
                <Button onClick={() => setSkillDialogOpen(true)} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Skill Name</TableHead>
                      <TableHead>Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skills.map((skill) => (
                      <TableRow key={skill.id}>
                        <TableCell>{skill.name}</TableCell>
                        <TableCell>{skill.category}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Course Dialog */}
      <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="courseCode">Course Code</Label>
              <Input
                id="courseCode"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="Example: MT1007"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Example: Calculus 2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">Faculty</Label>
              <Input
                id="faculty"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="Example: Mathematics & CS"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                min="1"
                max="6"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCourseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCourse} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Skill Dialog */}
      <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="skillName">Skill Name</Label>
              <Input
                id="skillName"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="Example: Python"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillCategory">Category</Label>
              <Input
                id="skillCategory"
                value={skillCategory}
                onChange={(e) => setSkillCategory(e.target.value)}
                placeholder="Example: Programming"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSkillDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSkill} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
