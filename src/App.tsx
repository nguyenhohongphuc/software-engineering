import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import StudentLayout from './components/student/StudentLayout';
import TutorLayout from './components/tutor/TutorLayout';
import AdminLayout from './components/admin/AdminLayout';

export type UserRole = 'student' | 'tutor' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (role: UserRole) => {
    // Mock login - in real app, this would authenticate with backend
    const mockUsers = {
      student: {
        id: '1',
        name: 'Nguyễn Văn A',
        email: 'student@hcmut.edu.vn',
        role: 'student' as UserRole,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      },
      tutor: {
        id: '2',
        name: 'Trần Thị B',
        email: 'tutor@hcmut.edu.vn',
        role: 'tutor' as UserRole,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      },
      admin: {
        id: '3',
        name: 'Lê Văn C',
        email: 'admin@hcmut.edu.vn',
        role: 'admin' as UserRole,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      }
    };

    if (role) {
      setCurrentUser(mockUsers[role]);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentUser.role === 'student') {
    return <StudentLayout user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.role === 'tutor') {
    return <TutorLayout user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.role === 'admin') {
    return <AdminLayout user={currentUser} onLogout={handleLogout} />;
  }

  return null;
}
