import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { UserRole } from '../App';
import bkLogo from 'figma:asset/4cb81386d75e55d1b76e03ebb8b574fbb2ada76d.png';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login logic based on username
    if (username.includes('student')) {
      onLogin('student');
    } else if (username.includes('tutor')) {
      onLogin('tutor');
    } else if (username.includes('admin')) {
      onLogin('admin');
    } else {
      // Default to student for demo
      onLogin('student');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-white p-4 rounded-lg mb-4">
            <img src={bkLogo} alt="BK TP.HCM Logo" className="h-20 w-20" />
          </div>
          <h2 className="mt-4 mb-2">Tutoring Support System Login</h2>
          <p className="text-gray-600 text-sm">Sign in via HCMUT SSO</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-[#528DFF] hover:bg-[#3d7ae8]">
            Sign In
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm mb-2">Demo accounts:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Student: student@hcmut.edu.vn</li>
            <li>• Tutor: tutor@hcmut.edu.vn</li>
            <li>• Admin: admin@hcmut.edu.vn</li>
          </ul>
        </div>
      </div>
    </div>
  );
}