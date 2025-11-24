import { Bell, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { User } from '../App';
import bkLogo from 'figma:asset/4cb81386d75e55d1b76e03ebb8b574fbb2ada76d.png';

interface LayoutHeaderProps {
  user: User;
  onLogout: () => void;
}

export default function LayoutHeader({ user, onLogout }: LayoutHeaderProps) {
  return (
    <header className="h-16 bg-[#0388B4] border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img src={bkLogo} alt="BK TP.HCM Logo" className="h-10 w-10" />
          <span className="text-white">Tutoring Support System</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative hover:bg-white/10">
          <Bell className="h-5 w-5 text-white" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-white/10">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-white">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">
              <span className="text-gray-500">Email:</span> {user.email}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <span className="text-gray-500">Role:</span> {
                user.role === 'student' ? 'Student' :
                user.role === 'tutor' ? 'Tutor' : 'Administrator'
              }
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}