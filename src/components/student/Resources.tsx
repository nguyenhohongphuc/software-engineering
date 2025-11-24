import { useState } from 'react';
import { FileText, Download, ExternalLink, BookOpen, Filter } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Resource {
  id: number;
  title: string;
  type: 'pdf' | 'link' | 'video';
  subject: string;
  tutor: string;
  tutorAvatar: string;
  uploadDate: string;
  size?: string;
  url: string;
}

export default function Resources() {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const resources: Resource[] = [
    {
      id: 1,
      title: 'Calculus 2 Lecture - Chapter 1: Integrals',
      type: 'pdf',
      subject: 'Calculus 2',
      tutor: 'Tran Thi B',
      tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      uploadDate: '2025-10-25',
      size: '2.4 MB',
      url: '#'
    },
    {
      id: 2,
      title: 'Calculus 2 Exercises - With Detailed Solutions',
      type: 'pdf',
      subject: 'Calculus 2',
      tutor: 'Tran Thi B',
      tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      uploadDate: '2025-10-24',
      size: '1.8 MB',
      url: '#'
    },
    {
      id: 3,
      title: 'C++ Tutorial - Pointers and References',
      type: 'video',
      subject: 'C++ Programming',
      tutor: 'Nguyen Van D',
      tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      uploadDate: '2025-10-23',
      url: 'https://www.youtube.com/watch?v=example'
    },
    {
      id: 4,
      title: 'Sample Code - Stack and Queue Implementation',
      type: 'link',
      subject: 'C++ Programming',
      tutor: 'Nguyen Van D',
      tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      uploadDate: '2025-10-22',
      url: 'https://github.com/example'
    },
    {
      id: 5,
      title: 'Physics 2 Theory - Electromagnetism',
      type: 'pdf',
      subject: 'General Physics',
      tutor: 'Le Thi E',
      tutorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      uploadDate: '2025-10-20',
      size: '3.2 MB',
      url: '#'
    },
    {
      id: 6,
      title: 'SQL Tutorial - Joins and Subqueries',
      type: 'link',
      subject: 'Database Systems',
      tutor: 'Pham Van F',
      tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      uploadDate: '2025-10-18',
      url: 'https://example.com'
    },
  ];

  const subjects = ['all', ...Array.from(new Set(resources.map(r => r.subject)))];

  const filteredResources = selectedSubject === 'all' 
    ? resources 
    : resources.filter(r => r.subject === selectedSubject);

  const getTypeIcon = (type: string) => {
    if (type === 'pdf') return <FileText className="h-5 w-5 text-red-500" />;
    if (type === 'video') return <FileText className="h-5 w-5 text-purple-500" />;
    return <ExternalLink className="h-5 w-5 text-blue-500" />;
  };

  const getTypeBadge = (type: string) => {
    if (type === 'pdf') return <Badge variant="secondary" className="bg-red-100 text-red-700">PDF</Badge>;
    if (type === 'video') return <Badge variant="secondary" className="bg-purple-100 text-purple-700">Video</Badge>;
    return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Link</Badge>;
  };

  return (
    <div className="p-6">
      <div>
        <h1>Resources</h1>
        <p className="text-gray-600 mt-1">Learning materials shared by tutors</p>
      </div>

      {/* Filter */}
      <div className="mt-6 flex items-center gap-4">
        <Filter className="h-5 w-5 text-gray-500" />
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.filter(s => s !== 'all').map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Resources List */}
      <div className="mt-6 space-y-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  {getTypeIcon(resource.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm mb-1">{resource.title}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        {getTypeBadge(resource.type)}
                        <Badge variant="outline" className="text-xs">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {resource.subject}
                        </Badge>
                        {resource.size && (
                          <span className="text-xs text-gray-500">{resource.size}</span>
                        )}
                      </div>
                    </div>
                    <Button size="sm" className="bg-[#528DFF] hover:bg-[#3d7ae8]">
                      {resource.type === 'pdf' ? (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={resource.tutorAvatar} alt={resource.tutor} />
                      <AvatarFallback>{resource.tutor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>Shared by {resource.tutor}</span>
                    <span>•</span>
                    <span>{resource.uploadDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredResources.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No resources available</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
