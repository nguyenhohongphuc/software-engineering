import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

interface CompletedSession {
  id: number;
  tutor: string;
  subject: string;
  date: string;
}

export default function Feedback() {
  const [selectedSession, setSelectedSession] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const completedSessions: CompletedSession[] = [
    { id: 1, tutor: 'Tran Thi B', subject: 'Calculus 2', date: '2025-10-25' },
    { id: 2, tutor: 'Le Thi E', subject: 'General Physics', date: '2025-10-24' },
    { id: 3, tutor: 'Pham Van F', subject: 'Database Systems', date: '2025-10-23' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSession) {
      toast.error('Please select a session to rate');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a star rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please enter your feedback');
      return;
    }

    toast.success('Thank you for your feedback!');
    
    // Reset form
    setSelectedSession('');
    setRating(0);
    setComment('');
  };

  return (
    <div className="p-6">
      <div>
        <h1>Submit Feedback</h1>
        <p className="text-gray-600 mt-1">
          Rate completed sessions to help improve quality
        </p>
      </div>

      <div className="mt-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#528DFF]" />
              Session Feedback Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Session */}
              <div className="space-y-2">
                <Label>Select Completed Session</Label>
                <Select value={selectedSession} onValueChange={setSelectedSession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a session..." />
                  </SelectTrigger>
                  <SelectContent>
                    {completedSessions.map((session) => (
                      <SelectItem key={session.id} value={session.id.toString()}>
                        {session.subject} - {session.tutor} ({session.date})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Rate Session Quality</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-10 w-10 ${
                          star <= (hoverRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-gray-600">
                      {rating === 1 && 'Very Bad'}
                      {rating === 2 && 'Bad'}
                      {rating === 3 && 'Average'}
                      {rating === 4 && 'Good'}
                      {rating === 5 && 'Excellent'}
                    </span>
                  )}
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <Label>Detailed Feedback</Label>
                <Textarea
                  placeholder="Share your experience about the session... (Example: The tutor explained very clearly, materials were comprehensive, helped me understand the concepts well...)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  Your feedback will help tutors improve their teaching quality
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectedSession('');
                    setRating(0);
                    setComment('');
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#528DFF] hover:bg-[#3d7ae8]">
                  Submit Feedback
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="text-sm mb-2">💡 Tips for Good Feedback</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Share specific details about the tutor's teaching method</li>
              <li>• Comment on the materials and session preparation</li>
              <li>• Mention what you learned from the session</li>
              <li>• Provide constructive suggestions if any</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
