import { useState } from 'react';
import { Star, Award, BookOpen, Calendar, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';

interface TimeSlot {
  id: number;
  date: string;
  dayOfWeek: string;
  time: string;
  available: boolean;
}

interface TutorDetailProps {
  tutor: {
    id: number;
    name: string;
    avatar: string;
    subjects: string[];
    rating: number;
    totalReviews: number;
    experience: string;
  };
  onClose: () => void;
}

export default function TutorDetail({ tutor, onClose }: TutorDetailProps) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  // Mock time slots for the week
  const timeSlots: TimeSlot[] = [
    { id: 1, date: '2025-10-30', dayOfWeek: 'Thursday', time: '08:00 - 10:00', available: true },
    { id: 2, date: '2025-10-30', dayOfWeek: 'Thursday', time: '14:00 - 16:00', available: true },
    { id: 3, date: '2025-10-31', dayOfWeek: 'Friday', time: '09:00 - 11:00', available: false },
    { id: 4, date: '2025-10-31', dayOfWeek: 'Friday', time: '15:00 - 17:00', available: true },
    { id: 5, date: '2025-11-01', dayOfWeek: 'Saturday', time: '08:00 - 10:00', available: true },
    { id: 6, date: '2025-11-01', dayOfWeek: 'Saturday', time: '10:00 - 12:00', available: true },
    { id: 7, date: '2025-11-02', dayOfWeek: 'Sunday', time: '14:00 - 16:00', available: true },
    { id: 8, date: '2025-11-03', dayOfWeek: 'Monday', time: '16:00 - 18:00', available: true },
  ];

  const handleBooking = () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }

    const slot = timeSlots.find(s => s.id === selectedSlot);
    toast.success(`Successfully booked session with ${tutor.name} on ${slot?.dayOfWeek}, ${slot?.time}`);
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Tutor Info */}
      <div className="flex items-start gap-6">
        <Avatar className="h-32 w-32">
          <AvatarImage src={tutor.avatar} alt={tutor.name} />
          <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h2>{tutor.name}</h2>
          <p className="text-gray-600 mt-1">{tutor.experience}</p>
          
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span>{tutor.rating}</span>
            <span className="text-gray-500">({tutor.totalReviews} reviews)</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {tutor.subjects.map((subject, index) => (
              <Badge key={index} variant="secondary">
                <BookOpen className="h-3 w-3 mr-1" />
                {subject}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Award className="h-5 w-5 text-[#528DFF]" />
          <h3 className="text-sm">About</h3>
        </div>
        <p className="text-sm text-gray-700">
          I am a senior student majoring in {tutor.subjects[0]}. I have experience teaching many students 
          and helping them achieve good results in exams. My teaching method focuses on understanding the nature 
          of the problem and applying it to practical exercises.
        </p>
      </div>

      {/* Available Time Slots */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-[#528DFF]" />
          <h3 className="text-sm">Available slots this week</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => slot.available && setSelectedSlot(slot.id)}
              disabled={!slot.available}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                selectedSlot === slot.id
                  ? 'border-[#528DFF] bg-blue-50'
                  : slot.available
                  ? 'border-gray-200 hover:border-[#528DFF] hover:bg-gray-50'
                  : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">{slot.dayOfWeek}</p>
                  <p className="text-xs text-gray-600">{slot.date}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{slot.time}</span>
                </div>
              </div>
              {!slot.available && (
                <p className="text-xs text-red-600 mt-2">Already booked</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button 
          onClick={handleBooking} 
          disabled={!selectedSlot}
          className="flex-1 bg-[#528DFF] hover:bg-[#3d7ae8]"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
