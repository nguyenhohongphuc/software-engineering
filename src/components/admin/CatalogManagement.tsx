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
    { id: 1, code: 'MT1007', name: 'Giải tích 2', faculty: 'Toán - Tin học', credits: 4 },
    { id: 2, code: 'MT2013', name: 'Đại số tuyến tính', faculty: 'Toán - Tin học', credits: 3 },
    { id: 3, code: 'CO1027', name: 'Lập trình C++', faculty: 'Khoa học máy tính', credits: 4 },
    { id: 4, code: 'CO2013', name: 'Hệ cơ sở dữ liệu', faculty: 'Khoa học máy tính', credits: 4 },
    { id: 5, code: 'PH1007', name: 'Vật lý đại cương 2', faculty: 'Vật lý', credits: 4 },
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: 'Giải tích', category: 'Toán học' },
    { id: 2, name: 'Đại số', category: 'Toán học' },
    { id: 3, name: 'Lập trình C++', category: 'Lập trình' },
    { id: 4, name: 'Python', category: 'Lập trình' },
    { id: 5, name: 'SQL', category: 'Cơ sở dữ liệu' },
    { id: 6, name: 'IELTS', category: 'Ngoại ngữ' },
  ]);

  const handleAddCourse = () => {
    if (!courseCode || !courseName || !faculty || !credits) {
      toast.error('Vui lòng điền đầy đủ thông tin');
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
    toast.success('Đã thêm môn học mới');

    // Reset form
    setCourseCode('');
    setCourseName('');
    setFaculty('');
    setCredits('');
    setCourseDialogOpen(false);
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
    toast.success('Đã xóa môn học');
  };

  const handleAddSkill = () => {
    if (!skillName || !skillCategory) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const newSkill: Skill = {
      id: Math.max(...skills.map(s => s.id), 0) + 1,
      name: skillName,
      category: skillCategory
    };

    setSkills([...skills, newSkill]);
    toast.success('Đã thêm kỹ năng mới');

    // Reset form
    setSkillName('');
    setSkillCategory('');
    setSkillDialogOpen(false);
  };

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
    toast.success('Đã xóa kỹ năng');
  };

  return (
    <div className="p-6">
      <div>
        <h1>Quản lý Chuyên mục</h1>
        <p className="text-gray-600 mt-1">
          Quản lý danh sách môn học và kỹ năng trong hệ thống
        </p>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="courses">
          <TabsList>
            <TabsTrigger value="courses">
              <BookOpen className="h-4 w-4 mr-2" />
              Môn học
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Award className="h-4 w-4 mr-2" />
              Kỹ năng
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Danh sách môn học</CardTitle>
                <Button onClick={() => setCourseDialogOpen(true)} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm môn học
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã môn học</TableHead>
                      <TableHead>Tên môn học</TableHead>
                      <TableHead>Khoa</TableHead>
                      <TableHead>Tín chỉ</TableHead>
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
                <CardTitle>Danh sách kỹ năng</CardTitle>
                <Button onClick={() => setSkillDialogOpen(true)} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm kỹ năng
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên kỹ năng</TableHead>
                      <TableHead>Danh mục</TableHead>
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
            <DialogTitle>Thêm môn học mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="courseCode">Mã môn học</Label>
              <Input
                id="courseCode"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="Ví dụ: MT1007"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseName">Tên môn học</Label>
              <Input
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Ví dụ: Giải tích 2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">Khoa</Label>
              <Input
                id="faculty"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="Ví dụ: Toán - Tin học"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="credits">Số tín chỉ</Label>
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
              Hủy
            </Button>
            <Button onClick={handleAddCourse} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              <Plus className="mr-2 h-4 w-4" />
              Thêm môn học
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Skill Dialog */}
      <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm kỹ năng mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="skillName">Tên kỹ năng</Label>
              <Input
                id="skillName"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="Ví dụ: Python"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillCategory">Danh mục</Label>
              <Input
                id="skillCategory"
                value={skillCategory}
                onChange={(e) => setSkillCategory(e.target.value)}
                placeholder="Ví dụ: Lập trình"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSkillDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddSkill} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              <Plus className="mr-2 h-4 w-4" />
              Thêm kỹ năng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}