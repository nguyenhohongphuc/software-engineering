import { useState } from 'react';
import { Home, Calendar, BookOpen, FileText, MessageSquare, User, Search } from 'lucide-react';
import LayoutHeader from '../LayoutHeader';
import StudentDashboard from './StudentDashboard';
import FindTutor from './FindTutor';
import MySchedule from './MySchedule';
import CourseRegistration from './CourseRegistration';
import Resources from './Resources';
import Feedback from './Feedback';
import Profile from './Profile';
import { User as UserType } from '../../App';

interface StudentLayoutProps {
  user: UserType;
  onLogout: () => void;
}

type StudentPage = 'dashboard' | 'find-tutor' | 'schedule' | 'courses' | 'resources' | 'feedback' | 'profile';

export default function StudentLayout({ user, onLogout }: StudentLayoutProps) {
  const [currentPage, setCurrentPage] = useState<StudentPage>('dashboard');

  const menuItems = [
    { id: 'dashboard' as StudentPage, label: 'Dashboard', icon: Home },
    { id: 'find-tutor' as StudentPage, label: 'Find Tutor', icon: Search },
    { id: 'schedule' as StudentPage, label: 'My Schedule', icon: Calendar },
    { id: 'courses' as StudentPage, label: 'My Courses', icon: BookOpen },
    { id: 'resources' as StudentPage, label: 'Resources', icon: FileText },
    { id: 'feedback' as StudentPage, label: 'Send Feedback', icon: MessageSquare },
    { id: 'profile' as StudentPage, label: 'Profile', icon: User },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'find-tutor':
        return <FindTutor />;
      case 'schedule':
        return <MySchedule />;
      case 'courses':
        return <CourseRegistration />;
      case 'resources':
        return <Resources />;
      case 'feedback':
        return <Feedback />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-sm text-gray-500">Portal</h2>
          <p className="mt-1">Student</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#528DFF] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <LayoutHeader user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}