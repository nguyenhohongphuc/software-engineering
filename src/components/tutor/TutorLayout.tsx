import { useState } from 'react';
import { Home, Calendar, Clock, Users, FileText, User, BookOpen } from 'lucide-react';
import LayoutHeader from '../LayoutHeader';
import TutorDashboard from './TutorDashboard';
import MySchedule from './MySchedule';
import TutoringSetup from './TutoringSetup';
import MyStudents from './MyStudents';
import ShareResources from './ShareResources';
import UpdateProfile from './UpdateProfile';
import { User as UserType } from '../../App';

interface TutorLayoutProps {
  user: UserType;
  onLogout: () => void;
}

type TutorPage = 'dashboard' | 'schedule' | 'tutoring' | 'students' | 'resources' | 'profile';

export default function TutorLayout({ user, onLogout }: TutorLayoutProps) {
  const [currentPage, setCurrentPage] = useState<TutorPage>('dashboard');

  const menuItems = [
    { id: 'dashboard' as TutorPage, label: 'Trang chủ', icon: Home },
    { id: 'schedule' as TutorPage, label: 'Lịch của tôi', icon: Calendar },
    { id: 'tutoring' as TutorPage, label: 'Quản lý giảng dạy', icon: BookOpen },
    { id: 'students' as TutorPage, label: 'Sinh viên của tôi', icon: Users },
    { id: 'resources' as TutorPage, label: 'Chia sẻ Tài liệu', icon: FileText },
    { id: 'profile' as TutorPage, label: 'Hồ sơ cá nhân', icon: User },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <TutorDashboard />;
      case 'schedule':
        return <MySchedule />;
      case 'tutoring':
        return <TutoringSetup />;
      case 'students':
        return <MyStudents />;
      case 'resources':
        return <ShareResources />;
      case 'profile':
        return <UpdateProfile user={user} />;
      default:
        return <TutorDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-sm text-gray-500">Portal</h2>
          <p className="mt-1">Gia sư</p>
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