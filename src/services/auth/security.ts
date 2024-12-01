import { jwtDecode } from 'jwt-decode';
import bcrypt from 'bcryptjs';
import { User } from '../../types';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: User): string {
  // In a real app, this would be handled by the backend
  const token = btoa(JSON.stringify({
    id: user.id,
    email: user.email,
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  }));
  return token;
}

export function verifyToken(token: string): any {
  try {
    const decoded = jwtDecode(token);
    if (!decoded || typeof decoded !== 'object') return null;
    
    const exp = (decoded as any).exp;
    if (exp && Date.now() >= exp) return null;
    
    return decoded;
  } catch {
    return null;
  }
}

export function generateResetToken(email: string): string {
  return btoa(JSON.stringify({
    email,
    exp: Date.now() + (60 * 60 * 1000) // 1 hour
  }));
}

export function isValidResetToken(token: string): boolean {
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.exp > Date.now();
  } catch {
    return false;
  }
}