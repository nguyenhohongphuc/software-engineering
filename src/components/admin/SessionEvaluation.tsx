import { useState } from 'react';
import { Star, AlertCircle, CheckCircle, Eye, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

interface Feedback {
  id: number;
  student: string;
  studentAvatar: string;
  tutor: string;
  tutorAvatar: string;
  subject: string;
  date: string;
  rating: number;
  comment: string;
  status: 'pending' | 'reviewed' | 'action-required';
}

export default function SessionEvaluation() {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminNote, setAdminNote] = useState('');

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      student: 'Nguyen Van A',
      studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      tutor: 'Tran Thi B',
      tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      subject: 'Calculus 2',
      date: '2025-10-25',
      rating: 5,
      comment: 'The tutor explained very clearly and was enthusiastic. I now understand integrals much better.',
      status: 'reviewed'
    },
    {
      id: 2,
      student: 'Tran Thi C',
      studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      tutor: 'Nguyen Van D',
      tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      subject: 'C++ Programming',
      date: '2025-10-24',
      rating: 2,
      comment: 'Tutor arrived 15 minutes late and the teaching was not clear. I still don\'t understand the material.',
      status: 'action-required'
    },
    {
      id: 3,
      student: 'Le Van B',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      tutor: 'Le Thi E',
      tutorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      subject: 'General Physics',
      date: '2025-10-23',
      rating: 4,
      comment: 'Good session, tutor explained thoroughly. However, some parts were still difficult to understand.',
      status: 'pending'
    },
    {
      id: 4,
      student: 'Pham Thi D',
      studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      tutor: 'Tran Thi B',
      tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      subject: 'Calculus 2',
      date: '2025-10-22',
      rating: 5,
      comment: 'Excellent! The tutor is very dedicated and has an effective teaching method.',
      status: 'reviewed'
    },
    {
      id: 5,
      student: 'Hoang Van E',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      tutor: 'Pham Van F',
      tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      subject: 'Database Systems',
      date: '2025-10-21',
      rating: 3,
      comment: 'Average session, nothing special.',
      status: 'pending'
    }
  ]);

  const pendingFeedbacks = feedbacks.filter(f => f.status === 'pending');
  const actionRequiredFeedbacks = feedbacks.filter(f => f.status === 'action-required');
  const reviewedFeedbacks = feedbacks.filter(f => f.status === 'reviewed');

  const handleViewDetails = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setDialogOpen(true);
  };

  const handleMarkAsReviewed = (id: number) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === id ? { ...f, status: 'reviewed' as const } : f
    ));
    toast.success('Feedback marked as reviewed');
    setDialogOpen(false);
  };

  const handleMarkAsActionRequired = (id: number) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === id ? { ...f, status: 'action-required' as const } : f
    ));
    toast.warning('Feedback marked as requiring action');
    setDialogOpen(false);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderFeedback = (feedback: Feedback) => (
    <Card key={feedback.id}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={feedback.studentAvatar} alt={feedback.student} />
                <AvatarFallback>{feedback.student.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm">{feedback.student}</h3>
                <p className="text-sm text-gray-600">Rating: {feedback.tutor}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{feedback.subject}</Badge>
                  <span className="text-xs text-gray-500">{feedback.date}</span>
                </div>
              </div>
            </div>
            {renderStars(feedback.rating)}
          </div>

          {/* Comment */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">{feedback.comment}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewDetails(feedback)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
            {feedback.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleMarkAsReviewed(feedback.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark Reviewed
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleMarkAsActionRequired(feedback.id)}
                  variant="destructive"
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Needs Action
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Calculate average rating
  const averageRating = (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1);

  return (
    <div className="p-6">
      <div>
        <h1>Quality Evaluation</h1>
        <p className="text-gray-600 mt-1">
          Review student feedback on tutoring sessions
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Feedback</p>
                <p className="text-2xl mt-1">{feedbacks.length}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl mt-1">{averageRating} ⭐</p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl mt-1">{pendingFeedbacks.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Action Required</p>
                <p className="text-2xl mt-1">{actionRequiredFeedbacks.length}</p>
              </div>
              <Flag className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <div className="mt-6">
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">
              Pending Review ({pendingFeedbacks.length})
            </TabsTrigger>
            <TabsTrigger value="action-required">
              Action Required ({actionRequiredFeedbacks.length})
            </TabsTrigger>
            <TabsTrigger value="reviewed">
              Reviewed ({reviewedFeedbacks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {pendingFeedbacks.length > 0 ? (
              pendingFeedbacks.map(feedback => renderFeedback(feedback))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No pending feedback</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="action-required" className="space-y-4 mt-4">
            {actionRequiredFeedbacks.length > 0 ? (
              actionRequiredFeedbacks.map(feedback => renderFeedback(feedback))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No feedback requiring action</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reviewed" className="space-y-4 mt-4">
            {reviewedFeedbacks.length > 0 ? (
              reviewedFeedbacks.map(feedback => renderFeedback(feedback))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-600">No reviewed feedback yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Feedback Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Student</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedFeedback.studentAvatar} alt={selectedFeedback.student} />
                      <AvatarFallback>{selectedFeedback.student.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{selectedFeedback.student}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tutor</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedFeedback.tutorAvatar} alt={selectedFeedback.tutor} />
                      <AvatarFallback>{selectedFeedback.tutor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{selectedFeedback.tutor}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Subject</p>
                <p className="mt-1">{selectedFeedback.subject}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Session Date</p>
                <p className="mt-1">{selectedFeedback.date}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <div className="mt-1">{renderStars(selectedFeedback.rating)}</div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Comment</p>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">{selectedFeedback.comment}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Admin Note</p>
                <Textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Add internal notes..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2 pt-4 border-t">
                {selectedFeedback.status !== 'reviewed' && (
                  <Button
                    onClick={() => handleMarkAsReviewed(selectedFeedback.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Reviewed
                  </Button>
                )}
                {selectedFeedback.status !== 'action-required' && (
                  <Button
                    onClick={() => handleMarkAsActionRequired(selectedFeedback.id)}
                    variant="destructive"
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    Mark as Action Required
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
