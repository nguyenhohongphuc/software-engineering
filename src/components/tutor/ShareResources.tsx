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
  const [resourceType, setResourceType] = useState<'file' | 'link'>('file');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: 'Bài giảng Giải tích 2 - Chương 1',
      type: 'file',
      subject: 'Giải tích 2',
      uploadDate: '2025-10-25',
      url: '#',
      description: 'Tài liệu về tích phân cơ bản'
    },
    {
      id: 2,
      title: 'Bài tập Giải tích 2 - Có lời giải',
      type: 'file',
      subject: 'Giải tích 2',
      uploadDate: '2025-10-24',
      url: '#'
    },
    {
      id: 3,
      title: 'Video hướng dẫn Ma trận',
      type: 'link',
      subject: 'Đại số tuyến tính',
      uploadDate: '2025-10-20',
      url: 'https://youtube.com/example',
      description: 'Video giải thích chi tiết về ma trận'
    }
  ]);

  const subjects = ['Giải tích 2', 'Đại số tuyến tính', 'Toán rời rạc'];

  const handleAddResource = () => {
    if (!title || !subject) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (resourceType === 'link' && !url) {
      toast.error('Vui lòng nhập URL');
      return;
    }

    const newResource: Resource = {
      id: Math.max(...resources.map(r => r.id), 0) + 1,
      title,
      type: resourceType,
      subject,
      uploadDate: new Date().toISOString().split('T')[0],
      url: resourceType === 'file' ? '#' : url,
      description
    };

    setResources([...resources, newResource]);
    toast.success('Đã thêm tài liệu thành công');

    // Reset form
    setTitle('');
    setSubject('');
    setUrl('');
    setDescription('');
    setDialogOpen(false);
  };

  const handleDeleteResource = (id: number) => {
    setResources(resources.filter(r => r.id !== id));
    toast.success('Đã xóa tài liệu');
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1>Chia sẻ Tài liệu</h1>
          <p className="text-gray-600 mt-1">
            Tải lên và chia sẻ tài liệu học tập với sinh viên
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
          <Plus className="mr-2 h-4 w-4" />
          Thêm tài liệu
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
                          Tải lên: {resource.uploadDate}
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
                Bạn chưa chia sẻ tài liệu nào
              </p>
              <Button onClick={() => setDialogOpen(true)} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
                <Plus className="mr-2 h-4 w-4" />
                Thêm tài liệu đầu tiên
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Resource Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm tài liệu mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Loại tài liệu</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={resourceType === 'file' ? 'default' : 'outline'}
                  onClick={() => setResourceType('file')}
                  className={resourceType === 'file' ? 'bg-[#528DFF] hover:bg-[#3d7ae8]' : ''}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Tải lên file
                </Button>
                <Button
                  type="button"
                  variant={resourceType === 'link' ? 'default' : 'outline'}
                  onClick={() => setResourceType('link')}
                  className={resourceType === 'link' ? 'bg-[#528DFF] hover:bg-[#3d7ae8]' : ''}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Thêm link
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề tài liệu</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Bài giảng Giải tích 2 - Chương 1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Môn học</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn môn học" />
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

            {resourceType === 'file' ? (
              <div className="space-y-2">
                <Label htmlFor="file">Chọn file</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
                <p className="text-xs text-gray-500">
                  Hỗ trợ: PDF, Word, PowerPoint (Tối đa 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả (tùy chọn)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả ngắn về tài liệu..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddResource} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              <Upload className="mr-2 h-4 w-4" />
              Thêm tài liệu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
