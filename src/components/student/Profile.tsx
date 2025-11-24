import { useState } from 'react';
import { User as UserIcon, Mail, Phone, MapPin, Calendar, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { User } from '../../App';
import { toast } from 'sonner@2.0.3';

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '0123456789',
    address: 'Ký túc xá ĐHQG, Khu B, Đông Hòa, Dĩ An, Bình Dương',
    studentId: '2012345',
    major: 'Khoa học Máy tính',
    year: 'Năm 3',
    bio: 'Tôi đang học năm 3 chuyên ngành Khoa học Máy tính. Tôi cần hỗ trợ về các môn Toán và Lập trình.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    toast.success('Cập nhật hồ sơ thành công!');
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div>
        <h1>Hồ sơ cá nhân</h1>
        <p className="text-gray-600 mt-1">Quản lý thông tin cá nhân của bạn</p>
      </div>

      <div className="mt-6 max-w-4xl space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2>{formData.name}</h2>
                <p className="text-gray-600 mt-1">{formData.major} - {formData.year}</p>
                <p className="text-sm text-gray-500 mt-1">MSSV: {formData.studentId}</p>
                
                <div className="flex gap-3 mt-4">
                  <Button
                    variant={isEditing ? 'outline' : 'default'}
                    onClick={() => setIsEditing(!isEditing)}
                    className={!isEditing ? 'bg-[#528DFF] hover:bg-[#3d7ae8]' : ''}
                  >
                    {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa hồ sơ'}
                  </Button>
                  {isEditing && (
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      Lưu thay đổi
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-[#528DFF]" />
              Thông tin liên hệ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#528DFF]" />
              Thông tin học tập
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Mã số sinh viên</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="major">Chuyên ngành</Label>
                <Input
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Năm học</Label>
              <Input
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Giới thiệu bản thân</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                placeholder="Viết vài dòng về bản thân và mục tiêu học tập..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#528DFF]" />
              Thống kê học tập
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl text-[#528DFF]">24</div>
                <p className="text-sm text-gray-600 mt-1">Tổng giờ học</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl text-green-600">12</div>
                <p className="text-sm text-gray-600 mt-1">Buổi học hoàn thành</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl text-purple-600">5</div>
                <p className="text-sm text-gray-600 mt-1">Môn học đang học</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
