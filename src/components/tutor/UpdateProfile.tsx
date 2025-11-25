import { useState } from 'react';
import { User as UserIcon, Mail, Phone, Award, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { User } from '../../App';
import { toast } from 'sonner@2.0.3';

interface UpdateProfileProps {
  user: User;
}

export default function UpdateProfile({ user }: UpdateProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '0987654321',
    experience: '3 years of teaching experience',
    bio: 'I am a final-year student majoring in Mathematics. I have 3 years of tutoring experience and have helped many students achieve high grades in exams. My teaching method focuses on helping students understand the essence of problems rather than rote learning.',
    specialization: 'Mathematics, Calculus, Algebra'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div>
        <h1>Profile</h1>
        <p className="text-gray-600 mt-1">Update your tutor profile information</p>
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
                <p className="text-gray-600 mt-1">{formData.specialization}</p>
                <p className="text-sm text-gray-500 mt-1">{formData.experience}</p>
                
                <div className="flex gap-3 mt-4">
                  <Button
                    variant={isEditing ? 'outline' : 'default'}
                    onClick={() => setIsEditing(!isEditing)}
                    className={!isEditing ? 'bg-[#528DFF] hover:bg-[#3d7ae8]' : ''}
                  >
                    {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                  </Button>
                  {isEditing && (
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
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
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
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
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="pl-10 bg-gray-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teaching Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#528DFF]" />
              Teaching Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="e.g., 3 years of teaching experience"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="e.g., Mathematics, Calculus, Algebra"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">About Yourself</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={5}
                placeholder="Write a few lines about yourself, your experience and teaching methods..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Teaching Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl text-[#528DFF]">48</div>
                <p className="text-sm text-gray-600 mt-1">Total Teaching Hours</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl text-green-600">4.8</div>
                <p className="text-sm text-gray-600 mt-1">Average Rating</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl text-purple-600">4</div>
                <p className="text-sm text-gray-600 mt-1">Current Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
