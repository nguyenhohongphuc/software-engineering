import { useState } from 'react';
import { Upload, FileText, Link as LinkIcon, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface Resource {
  id: number;
  title: string;
  type: 'file' | 'link';
  subject: string;
  uploadDate: string;
  url: string;
  description?: string;
}

export default function ShareResources() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: 'Calculus 2 Lecture - Chapter 1',
      type: 'file',
      subject: 'Calculus 2',
      uploadDate: '2025-10-25',
      url: '#',
      description: 'Material on basic integration'
    },
    {
      id: 2,
      title: 'Calculus 2 Exercises - With Solutions',
      type: 'file',
      subject: 'Calculus 2',
      uploadDate: '2025-10-24',
      url: '#'
    },
    {
      id: 3,
      title: 'Matrix Tutorial Video',
      type: 'link',
      subject: 'Linear Algebra',
      uploadDate: '2025-10-20',
      url: 'https://youtube.com/example',
      description: 'Detailed video explaining matrices'
    }
  ]);

  const subjects = ['Calculus 2', 'Linear Algebra', 'Discrete Mathematics'];

  const handleAddResource = () => {
    if (!title || !subject) {
      toast.error('Please fill in all required information');
      return;
    }

    const newResource: Resource = {
      id: Math.max(...resources.map(r => r.id), 0) + 1,
      title,
      type: 'file',
      subject,
      uploadDate: new Date().toISOString().split('T')[0],
      url: '#',
      description
    };

    setResources([...resources, newResource]);
    toast.success('Resource added successfully');

    // Reset form
    setTitle('');
    setSubject('');
    setDescription('');
    setDialogOpen(false);
  };

  const handleDeleteResource = (id: number) => {
    setResources(resources.filter(r => r.id !== id));
    toast.success('Resource deleted');
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1>Share Resources</h1>
          <p className="text-gray-600 mt-1">
            Upload and share learning materials with students
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
          <Plus className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>

      {/* Resources List */}
      <div className="mt-6 space-y-4">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  {resource.type === 'file' ? (
                    <FileText className="h-6 w-6 text-[#528DFF]" />
                  ) : (
                    <LinkIcon className="h-6 w-6 text-[#528DFF]" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm">{resource.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {resource.subject}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {resource.type === 'file' ? 'File' : 'Link'}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Uploaded: {resource.uploadDate}
                        </span>
                      </div>
                      {resource.description && (
                        <p className="text-sm text-gray-600 mt-2">
                          {resource.description}
                        </p>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteResource(resource.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {resources.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                You haven't shared any resources yet
              </p>
              <Button onClick={() => setDialogOpen(true)} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Resource
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Resource Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Resource Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Calculus 2 Lecture - Chapter 1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subj) => (
                    <SelectItem key={subj} value={subj}>
                      {subj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Choose File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
              />
              <p className="text-xs text-gray-500">
                Supported: PDF, Word, PowerPoint (Max 10MB)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the resource..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddResource} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              <Upload className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}