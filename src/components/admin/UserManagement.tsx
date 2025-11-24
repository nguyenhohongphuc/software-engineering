import { useState } from 'react';
import { Search, Filter, Eye, Edit, Ban, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'tutor';
  avatar: string;
  status: 'active' | 'disabled';
  joinedDate: string;
  totalSessions?: number;
  rating?: number;
}

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@hcmut.edu.vn',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      status: 'active',
      joinedDate: '2025-09-01',
      totalSessions: 12
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@hcmut.edu.vn',
      role: 'tutor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      status: 'active',
      joinedDate: '2025-08-15',
      totalSessions: 48,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@hcmut.edu.vn',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      status: 'active',
      joinedDate: '2025-09-10',
      totalSessions: 8
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@hcmut.edu.vn',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      status: 'active',
      joinedDate: '2025-09-05',
      totalSessions: 15
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      email: 'hoangvane@hcmut.edu.vn',
      role: 'tutor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      status: 'active',
      joinedDate: '2025-08-20',
      totalSessions: 35,
      rating: 4.6
    },
    {
      id: 6,
      name: 'Đỗ Thị F',
      email: 'dothif@hcmut.edu.vn',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      status: 'disabled',
      joinedDate: '2025-08-01',
      totalSessions: 3
    },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'disabled' as const : 'active' as const }
        : u
    ));
    toast.success('Đã cập nhật trạng thái người dùng');
  };

  return (
    <div className="p-6">
      <div>
        <h1>Quản lý Người dùng</h1>
        <p className="text-gray-600 mt-1">
          Quản lý tài khoản sinh viên và gia sư
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng người dùng</p>
                <p className="text-2xl mt-1">{users.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-[#528DFF]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sinh viên</p>
                <p className="text-2xl mt-1">
                  {users.filter(u => u.role === 'student').length}
                </p>
              </div>
              <Badge className="text-lg px-3 py-1">SV</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gia sư</p>
                <p className="text-2xl mt-1">
                  {users.filter(u => u.role === 'tutor').length}
                </p>
              </div>
              <Badge className="text-lg px-3 py-1 bg-green-600">GS</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Tìm kiếm và lọc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Lọc theo vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="student">Sinh viên</SelectItem>
                <SelectItem value="tutor">Gia sư</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead>Buổi học</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'tutor' ? 'default' : 'secondary'}>
                      {user.role === 'student' ? 'Sinh viên' : 'Gia sư'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'secondary'}
                      className={user.status === 'active' ? 'bg-green-600' : 'bg-gray-400'}
                    >
                      {user.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinedDate}</TableCell>
                  <TableCell>
                    {user.totalSessions}
                    {user.rating && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({user.rating} ⭐)
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Thao tác
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                          <Ban className="mr-2 h-4 w-4" />
                          {user.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết người dùng</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3>{selectedUser.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge>{selectedUser.role === 'student' ? 'Sinh viên' : 'Gia sư'}</Badge>
                    <Badge variant={selectedUser.status === 'active' ? 'default' : 'secondary'}>
                      {selectedUser.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Ngày tham gia</p>
                  <p className="mt-1">{selectedUser.joinedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng buổi học</p>
                  <p className="mt-1">{selectedUser.totalSessions}</p>
                </div>
                {selectedUser.rating && (
                  <div>
                    <p className="text-sm text-gray-600">Đánh giá</p>
                    <p className="mt-1">{selectedUser.rating} ⭐</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
