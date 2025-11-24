import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { ConfirmDialog } from '../ui/confirm-dialog';
import { toast } from 'sonner@2.0.3';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Plus, BookOpen, Users, Edit, Trash2 } from 'lucide-react';

interface TutoringClass {
  id: number;
  name: string;
  subject: string;
  tutor: string;
  tutorAvatar: string;
  maxStudents: number;
  currentStudents: number;
  status: 'active' | 'full' | 'closed';
  createdDate: string;
}

export default function ClassManagement() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [className, setClassName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTutor, setSelectedTutor] = useState('');
  const [maxStudents, setMaxStudents] = useState('10');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<number | null>(null);

  const [classes, setClasses] = useState<TutoringClass[]>([
    {
      id: 1,
      name: 'Calculus 2 - Class A',
      subject: 'Calculus 2',
      tutor: 'Tran Thi B',
      tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      maxStudents: 15,
      currentStudents: 12,
      status: 'active',
      createdDate: '2025-09-01'
    },
    {
      id: 2,
      name: 'Basic C++ Programming',
      subject: 'C++ Programming',
      tutor: 'Nguyen Van D',
      tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      maxStudents: 10,
      currentStudents: 10,
      status: 'full',
      createdDate: '2025-09-05'
    },
    {
      id: 3,
      name: 'Linear Algebra',
      subject: 'Linear Algebra',
      tutor: 'Tran Thi B',
      tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      maxStudents: 12,
      currentStudents: 8,
      status: 'active',
      createdDate: '2025-09-10'
    },
    {
      id: 4,
      name: 'Database Systems',
      subject: 'Database Systems',
      tutor: 'Pham Van F',
      tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      maxStudents: 15,
      currentStudents: 14,
      status: 'active',
      createdDate: '2025-09-12'
    }
  ]);

  const subjects = ['Calculus 2', 'Linear Algebra', 'C++ Programming', 'Database Systems', 'General Physics'];
  const tutors = [
    { name: 'Tran Thi B', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { name: 'Nguyen Van D', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { name: 'Pham Van F', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }
  ];

  const handleCreateClass = () => {
    if (!className || !selectedSubject || !selectedTutor || !maxStudents) {
      toast.error('Please fill in all information');
      return;
    }

    const tutor = tutors.find(t => t.name === selectedTutor);
    const newClass: TutoringClass = {
      id: Math.max(...classes.map(c => c.id), 0) + 1,
      name: className,
      subject: selectedSubject,
      tutor: selectedTutor,
      tutorAvatar: tutor?.avatar || '',
      maxStudents: parseInt(maxStudents),
      currentStudents: 0,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setClasses([...classes, newClass]);
    toast.success('Class created successfully');

    // Reset form
    setClassName('');
    setSelectedSubject('');
    setSelectedTutor('');
    setMaxStudents('10');
    setDialogOpen(false);
  };

  const handleDeleteClass = (id: number) => {
    setClasses(classes.filter(c => c.id !== id));
    toast.success('Class deleted successfully');
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>;
    }
    if (status === 'full') {
      return <Badge className="bg-orange-600 hover:bg-orange-700">Full</Badge>;
    }
    return <Badge className="bg-gray-600">Closed</Badge>;
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1>Class Management</h1>
          <p className="text-gray-600 mt-1">
            Create and manage tutoring classes
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
          <Plus className="mr-2 h-4 w-4" />
          Create Class
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-2xl mt-1">{classes.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-[#528DFF]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Classes</p>
                <p className="text-2xl mt-1">
                  {classes.filter(c => c.status === 'active').length}
                </p>
              </div>
              <Badge className="text-lg px-3 py-1 bg-green-600">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl mt-1">
                  {classes.reduce((sum, c) => sum + c.currentStudents, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Class List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Tutor</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{cls.subject}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={cls.tutorAvatar} alt={cls.tutor} />
                        <AvatarFallback>{cls.tutor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{cls.tutor}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{cls.currentStudents}/{cls.maxStudents}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(cls.status)}</TableCell>
                  <TableCell>{cls.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDeleteConfirmOpen(true);
                          setClassToDelete(cls.id);
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Class Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Class</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="className">Class Name</Label>
              <Input
                id="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Example: Calculus 2 - Class A"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tutor">Assign Tutor</Label>
              <Select value={selectedTutor} onValueChange={setSelectedTutor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tutor" />
                </SelectTrigger>
                <SelectContent>
                  {tutors.map((tutor) => (
                    <SelectItem key={tutor.name} value={tutor.name}>
                      {tutor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStudents">Max Students</Label>
              <Input
                id="maxStudents"
                type="number"
                value={maxStudents}
                onChange={(e) => setMaxStudents(e.target.value)}
                min="1"
                max="50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateClass} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              <Plus className="mr-2 h-4 w-4" />
              Create Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Class Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Class"
        description="Are you sure you want to delete this class? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (classToDelete !== null) {
            handleDeleteClass(classToDelete);
          }
        }}
      />
    </div>
  );
}