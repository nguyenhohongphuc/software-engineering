import { useState } from 'react';
import { Search, Star, MapPin, BookOpen, X, Check } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import TutorDetail from './TutorDetail';

interface Tutor {
  id: number;
  name: string;
  avatar: string;
  subjects: string[];
  rating: number;
  totalReviews: number;
  experience: string;
  availability: string;
}

export default function FindTutor() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const tutors: Tutor[] = [
    {
      id: 1,
      name: 'Trần Thị B',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      subjects: ['Calculus 2', 'Linear Algebra', 'Discrete Mathematics'],
      rating: 4.8,
      totalReviews: 42,
      experience: '3 years experience',
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Nguyễn Văn D',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      subjects: ['C++ Programming', 'Data Structures', 'Algorithms'],
      rating: 4.9,
      totalReviews: 38,
      experience: '4 years experience',
      availability: 'Available'
    },
    {
      id: 3,
      name: 'Lê Thị E',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      subjects: ['General Physics', 'Engineering Mechanics'],
      rating: 4.7,
      totalReviews: 35,
      experience: '2 years experience',
      availability: 'Available'
    },
    {
      id: 4,
      name: 'Phạm Văn F',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      subjects: ['Database Systems', 'DBMS', 'SQL'],
      rating: 4.9,
      totalReviews: 51,
      experience: '5 years experience',
      availability: 'Available'
    },
    {
      id: 5,
      name: 'Hoàng Thị G',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      subjects: ['Technical English', 'IELTS', 'TOEIC'],
      rating: 4.8,
      totalReviews: 29,
      experience: '3 years experience',
      availability: 'Busy'
    },
    {
      id: 6,
      name: 'Đặng Văn H',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
      subjects: ['General Chemistry', 'Organic Chemistry'],
      rating: 4.6,
      totalReviews: 24,
      experience: '2 years experience',
      availability: 'Available'
    }
  ];

  const subjects = ['Calculus 2', 'C++ Programming', 'General Physics', 'Database Systems', 'Technical English'];

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubjects.length === 0 || tutor.subjects.some(s => selectedSubjects.includes(s));
    return matchesSearch && matchesSubject;
  });

  const handleTutorClick = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setDialogOpen(true);
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const clearAllSubjects = () => {
    setSelectedSubjects([]);
  };

  return (
    <div className="p-6">
      <div>
        <h1>Find Tutor</h1>
        <p className="text-gray-600 mt-1">Search and book sessions with suitable tutors</p>
      </div>

      {/* Search and Filters */}
      <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by tutor name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-64">
                <BookOpen className="h-4 w-4 mr-2" />
                Filter by Subject
                {selectedSubjects.length > 0 && (
                  <Badge className="ml-2 bg-[#528DFF]">{selectedSubjects.length}</Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Select Subjects</Label>
                  {selectedSubjects.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllSubjects}
                      className="h-auto p-0 text-xs text-[#528DFF] hover:text-[#3d7ae8]"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {subjects.map(subject => (
                    <div key={subject} className="flex items-center gap-2">
                      <Checkbox
                        id={subject}
                        checked={selectedSubjects.includes(subject)}
                        onCheckedChange={() => toggleSubject(subject)}
                      />
                      <Label
                        htmlFor={subject}
                        className="cursor-pointer flex-1 text-sm"
                      >
                        {subject}
                      </Label>
                      {selectedSubjects.includes(subject) && (
                        <Check className="h-4 w-4 text-[#528DFF]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button className="bg-[#528DFF] hover:bg-[#3d7ae8]">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Selected Subjects Display */}
        {selectedSubjects.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Selected:</span>
            {selectedSubjects.map(subject => (
              <Badge
                key={subject}
                variant="secondary"
                className="bg-blue-100 text-[#528DFF] hover:bg-blue-200"
              >
                {subject}
                <button
                  onClick={() => toggleSubject(subject)}
                  className="ml-2 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-4">
          Found {filteredTutors.length} tutor{filteredTutors.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <Card 
              key={tutor.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleTutorClick(tutor)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={tutor.avatar} alt={tutor.name} />
                    <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="mt-4">{tutor.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{tutor.experience}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{tutor.rating}</span>
                    <span className="text-sm text-gray-500">({tutor.totalReviews} reviews)</span>
                  </div>

                  {/* Subjects */}
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {tutor.subjects.slice(0, 2).map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {subject}
                      </Badge>
                    ))}
                    {tutor.subjects.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{tutor.subjects.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="mt-4 w-full">
                    <Badge 
                      variant={tutor.availability === 'Available' ? 'default' : 'secondary'}
                      className={`w-full justify-center ${
                        tutor.availability === 'Available' 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-gray-400'
                      }`}
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      {tutor.availability}
                    </Badge>
                  </div>

                  <Button 
                    className="w-full mt-4 bg-[#528DFF] hover:bg-[#3d7ae8]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTutorClick(tutor);
                    }}
                  >
                    View Details & Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tutor Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tutor Details</DialogTitle>
          </DialogHeader>
          {selectedTutor && (
            <TutorDetail tutor={selectedTutor} onClose={() => setDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}