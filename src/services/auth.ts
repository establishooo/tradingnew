import { User } from '../types';
import { mockUser } from '../store/mockData';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

class AuthService {
  private static readonly STORAGE_KEY = 'trading_simulator_user';

  static async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, accept any credentials and return mock user
    if (credentials.email && credentials.password) {
      const user = { ...mockUser };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return user;
    }

    throw new Error('Invalid credentials');
  }

  static async register(data: RegisterData): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create new user
    const newUser: User = {
      id: crypto.randomUUID(),
      fullName: data.fullName,
      email: data.email,
      balance: 100000, // Initial balance
      portfolioValue: 0,
      trades: [],
      status: 'ACTIVE'
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  }

  static async logout(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static async getCurrentUser(): Promise<User | null> {
    const userData = localStorage.getItem(this.STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  }
}

export default AuthService;