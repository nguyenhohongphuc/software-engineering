import { useState } from 'react';
import { Calendar, Clock, MapPin, Video, MoreVertical, X, RefreshCw, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

interface Session {
  id: number;
  tutor: string;
  tutorAvatar: string;
  subject: string;
  date: string;
  time: string;
  location: string;
  type: 'online' | 'offline';
  status: 'upcoming' | 'completed' | 'cancelled';
  meetLink?: string;
  rated?: boolean;
}

export default function MySchedule() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      tutor: 'Tran Thi B',
      tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      subject: 'Calculus 2',
      date: '2025-10-30',
      time: '14:00 - 16:00',
      location: 'Google Meet',
      type: 'online',
      status: 'upcoming',
      meetLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      tutor: 'Nguyen Van D',
      tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      subject: 'C++ Programming',
      date: '2025-10-31',
      time: '09:00 - 11:00',
      location: 'Room H1-101',
      type: 'offline',
      status: 'upcoming'
    },
    {
      id: 3,
      tutor: 'Le Thi E',
      tutorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      subject: 'General Physics',
      date: '2025-10-25',
      time: '14:00 - 16:00',
      location: 'Zoom',
      type: 'online',
      status: 'completed'
    },
    {
      id: 4,
      tutor: 'Pham Van F',
      tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      subject: 'Database Systems',
      date: '2025-10-23',
      time: '10:00 - 12:00',
      location: 'Room H6-202',
      type: 'offline',
      status: 'completed'
    },
    {
      id: 5,
      tutor: 'Hoang Thi G',
      tutorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      subject: 'English',
      date: '2025-10-20',
      time: '15:00 - 17:00',
      location: 'Google Meet',
      type: 'online',
      status: 'cancelled'
    }
  ]);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleCancel = () => {
    if (selectedSession) {
      setSessions(sessions.map(s => 
        s.id === selectedSession.id ? { ...s, status: 'cancelled' as const } : s
      ));
      toast.success('Session cancelled successfully');
      setCancelDialogOpen(false);
      setSelectedSession(null);
    }
  };

  const handleReschedule = () => {
    toast.success('Reschedule request sent to tutor');
    setRescheduleDialogOpen(false);
    setSelectedSession(null);
  };

  const handleRating = () => {
    if (selectedSession) {
      setSessions(sessions.map(s => 
        s.id === selectedSession.id ? { ...s, rated: true } : s
      ));
      toast.success('Session rated successfully');
      setRatingDialogOpen(false);
      setSelectedSession(null);
      setRating(0);
      setComment('');
    }
  };

  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const completedSessions = sessions.filter(s => s.status === 'completed');
  const cancelledSessions = sessions.filter(s => s.status === 'cancelled');

  const renderSession = (session: Session) => (
    <Card key={session.id}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={session.tutorAvatar} alt={session.tutor} />
            <AvatarFallback>{session.tutor.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm">{session.subject}</h3>
                <p className="text-sm text-gray-600 mt-1">Tutor: {session.tutor}</p>
              </div>
              
              {session.status === 'upcoming' && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => {
                        setSelectedSession(session);
                        setRescheduleDialogOpen(true);
                      }}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reschedule
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        setSelectedSession(session);
                        setCancelDialogOpen(true);
                      }}
                      className="text-red-600"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{session.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{session.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {session.type === 'online' ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                <span>{session.location}</span>
              </div>
            </div>

            {session.status === 'upcoming' && session.type === 'online' && session.meetLink && (
              <Button 
                className="mt-4 bg-[#528DFF] hover:bg-[#3d7ae8]"
                onClick={() => window.open(session.meetLink, '_blank')}
              >
                <Video className="mr-2 h-4 w-4" />
                Join Online Session
              </Button>
            )}

            {session.status === 'completed' && (
              session.rated ? (
                <Button variant="outline" className="mt-4" disabled>
                  <Star className="mr-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  Rated
                </Button>
              ) : (
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSelectedSession(session);
                  setRatingDialogOpen(true);
                }}>
                  <Star className="mr-2 h-4 w-4" />
                  Rate Session
                </Button>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div>
        <h1>My Schedule</h1>
        <p className="text-gray-600 mt-1">Manage your tutoring sessions</p>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingSessions.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedSessions.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledSessions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map(session => renderSession(session))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">You don't have any upcoming sessions</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedSessions.length > 0 ? (
              completedSessions.map(session => renderSession(session))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-600">No completed sessions yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledSessions.length > 0 ? (
              cancelledSessions.map(session => renderSession(session))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-600">No cancelled sessions</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel the <strong>{selectedSession?.subject}</strong> session with tutor{' '}
              <strong>{selectedSession?.tutor}</strong> on {selectedSession?.date}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} className="bg-red-600 hover:bg-red-700">
              Confirm Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reschedule Dialog */}
      <AlertDialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reschedule Session</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to reschedule the <strong>{selectedSession?.subject}</strong> session with tutor{' '}
              <strong>{selectedSession?.tutor}</strong>? The request will be sent to the tutor for confirmation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReschedule} className="bg-[#528DFF] hover:bg-[#3d7ae8]">
              Send Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rating Dialog */}
      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Session</DialogTitle>
            <DialogDescription>
              Please rate your session with <strong>{selectedSession?.tutor}</strong> for <strong>{selectedSession?.subject}</strong> on {selectedSession?.date}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Star Rating */}
            <div>
              <p className="text-sm mb-2">Rating</p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-8 w-8 cursor-pointer transition-colors ${
                      star <= (hoverRating || rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm text-gray-600">
                    {rating} {rating === 1 ? 'star' : 'stars'}
                  </span>
                )}
              </div>
            </div>

            {/* Comment */}
            <div>
              <p className="text-sm mb-2">Comment (optional)</p>
              <Textarea
                placeholder="Share your experience with this tutoring session..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setRatingDialogOpen(false);
                setRating(0);
                setComment('');
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRating}
              disabled={rating === 0}
              className="bg-[#528DFF] hover:bg-[#3d7ae8]"
            >
              Submit Rating
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}