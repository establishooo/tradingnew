import { useState, useEffect } from 'react';
import { User } from '../types';

const mockUsers: User[] = [
  {
    id: '1',
    fullName: 'أحمد محمد',
    email: 'ahmed@example.com',
    balance: 150000,
    portfolioValue: 75000,
    trades: [],
    status: 'ACTIVE',
  },
  {
    id: '2',
    fullName: 'سارة أحمد',
    email: 'sara@example.com',
    balance: 200000,
    portfolioValue: 125000,
    trades: [],
    status: 'ACTIVE',
  },
  {
    id: '3',
    fullName: 'محمد علي',
    email: 'mohamed@example.com',
    balance: 50000,
    portfolioValue: 30000,
    trades: [],
    status: 'SUSPENDED',
  },
];

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(mockUsers);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
    setUsers,
  };
}