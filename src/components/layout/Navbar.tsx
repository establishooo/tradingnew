import { User as UserIcon, BarChart3 } from 'lucide-react';
import { User } from '../../types';

interface NavbarProps {
  user: User;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Trading Simulator</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Balance: ${user.balance.toLocaleString()}
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <UserIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}