import { useState } from 'react';
import { LayoutDashboard, Users, GraduationCap, BookOpen, BarChart3, Star } from 'lucide-react';
import LayoutHeader from '../LayoutHeader';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import ClassManagement from './ClassManagement';
import CatalogManagement from './CatalogManagement';
import Reports from './Reports';
import SessionEvaluation from './SessionEvaluation';
import { User as UserType } from '../../App';

interface AdminLayoutProps {
  user: UserType;
  onLogout: () => void;
}

type AdminPage = 'dashboard' | 'users' | 'classes' | 'catalog' | 'reports' | 'evaluation';

export default function AdminLayout({ user, onLogout }: AdminLayoutProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');

  const menuItems = [
    { id: 'dashboard' as AdminPage, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users' as AdminPage, label: 'User Management', icon: Users },
    { id: 'classes' as AdminPage, label: 'Class Management', icon: GraduationCap },
    { id: 'catalog' as AdminPage, label: 'Catalog Management', icon: BookOpen },
    { id: 'reports' as AdminPage, label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'evaluation' as AdminPage, label: 'Quality Evaluation', icon: Star },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'classes':
        return <ClassManagement />;
      case 'catalog':
        return <CatalogManagement />;
      case 'reports':
        return <Reports />;
      case 'evaluation':
        return <SessionEvaluation />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-sm text-gray-500">Portal</h2>
          <p className="mt-1">Administrator</p>
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
