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
      student: 'Nguyễn Văn A',
      studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      tutor: 'Trần Thị B',
      tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      subject: 'Giải tích 2',
      date: '2025-10-25',
      rating: 5,
      comment: 'Gia sư giảng dạy rất dễ hiểu, nhiệt tình. Em đã hiểu rõ hơn về tích phân.',
      status: 'reviewed'
    },
    {
      id: 2,
      student: 'Trần Thị C',
      studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      tutor: 'Nguyễn Văn D',
      tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      subject: 'Lập trình C++',
      date: '2025-10-24',
      rating: 2,
      comment: 'Gia sư đến muộn 15 phút và giảng dạy không rõ ràng. Em vẫn chưa hiểu bài.',
      status: 'action-required'
    },
    {
      id: 3,
      student: 'Lê Văn B',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      tutor: 'Lê Thị E',
      tutorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      subject: 'Vật lý đại cương',
      date: '2025-10-23',
      rating: 4,
      comment: 'Buổi học tốt, gia sư giải thích kỹ càng. Tuy nhiên có một số chỗ còn khó hiểu.',
      status: 'pending'
    },
    {
      id: 4,
      student: 'Phạm Thị D',
      studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      tutor: 'Trần Thị B',
      tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      subject: 'Giải tích 2',
      date: '2025-10-22',
      rating: 5,
      comment: 'Xuất sắc! Gia sư rất tận tâm và có phương pháp giảng dạy hiệu quả.',
      status: 'reviewed'
    },
    {
      id: 5,
      student: 'Hoàng Văn E',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      tutor: 'Phạm Văn F',
      tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      subject: 'Cơ sở dữ liệu',
      date: '2025-10-21',
      rating: 3,
      comment: 'Buổi học bình thường, không có gì đặc biệt.',
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
    toast.success('Đã đánh dấu phản hồi là đã xem xét');
    setDialogOpen(false);
  };

  const handleMarkAsActionRequired = (id: number) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === id ? { ...f, status: 'action-required' as const } : f
    ));
    toast.warning('Đã đánh dấu phản hồi cần hành động');
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
                <p className="text-sm text-gray-600">Đánh giá: {feedback.tutor}</p>
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
              Xem chi tiết
            </Button>
            {feedback.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleMarkAsReviewed(feedback.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Đã xem xét
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleMarkAsActionRequired(feedback.id)}
                  variant="destructive"
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Cần hành động
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
        <h1>Đánh giá Chất lượng</h1>
        <p className="text-gray-600 mt-1">
          Xem xét phản hồi của sinh viên về các buổi học
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng phản hồi</p>
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
                <p className="text-sm text-gray-600">Đánh giá TB</p>
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
                <p className="text-sm text-gray-600">Chờ xem xét</p>
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
                <p className="text-sm text-gray-600">Cần hành động</p>
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
              Chờ xem xét ({pendingFeedbacks.length})
            </TabsTrigger>
            <TabsTrigger value="action-required">
              Cần hành động ({actionRequiredFeedbacks.length})
            </TabsTrigger>
            <TabsTrigger value="reviewed">
              Đã xem xét ({reviewedFeedbacks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {pendingFeedbacks.length > 0 ? (
              pendingFeedbacks.map(feedback => renderFeedback(feedback))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Không có phản hồi chờ xem xét</p>
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
                  <p className="text-gray-600">Không có phản hồi cần hành động</p>
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
                  <p className="text-gray-600">Chưa có phản hồi nào được xem xét</p>
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
            <DialogTitle>Chi tiết phản hồi</DialogTitle>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Sinh viên</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedFeedback.studentAvatar} alt={selectedFeedback.student} />
                      <AvatarFallback>{selectedFeedback.student.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{selectedFeedback.student}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gia sư</p>
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
                <p className="text-sm text-gray-600">Môn học</p>
                <p className="mt-1">{selectedFeedback.subject}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Ngày học</p>
                <p className="mt-1">{selectedFeedback.date}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Đánh giá</p>
                <div className="mt-1">{renderStars(selectedFeedback.rating)}</div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Nhận xét</p>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">{selectedFeedback.comment}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Ghi chú của Admin</p>
                <Textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Thêm ghi chú nội bộ..."
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
                    Đánh dấu đã xem xét
                  </Button>
                )}
                {selectedFeedback.status !== 'action-required' && (
                  <Button
                    onClick={() => handleMarkAsActionRequired(selectedFeedback.id)}
                    variant="destructive"
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    Đánh dấu cần hành động
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
