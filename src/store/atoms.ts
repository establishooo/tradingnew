import { atom } from 'jotai';
import { User } from '../types';
import { AdminUser, SystemSettings } from '../types/admin';

export const userAtom = atom<User | null>(null);
export const adminUserAtom = atom<AdminUser | null>(null);

export const systemSettingsAtom = atom<SystemSettings>({
  tradingEnabled: true,
  maintenanceMode: false,
  maxTradeValue: 1000000,
  allowedOrderTypes: ['MARKET', 'LIMIT', 'STOP_LOSS'],
  registrationEnabled: true,
  defaultInitialBalance: 100000,
  apiKeys: {
    polygonApi: 'baaf81ba-1174-42dc-b155-74b96c5de680',
  },
});

// Initialize atoms with stored values
userAtom.onMount = (setValue) => {
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setValue(JSON.parse(storedUser));
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    localStorage.removeItem('user');
  }
};

adminUserAtom.onMount = (setValue) => {
  try {
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      setValue(JSON.parse(storedAdmin));
    }
  } catch (error) {
    console.error('Error loading admin data:', error);
    localStorage.removeItem('adminUser');
  }
};