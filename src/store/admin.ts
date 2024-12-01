import { atom } from 'jotai';
import { AdminUser, SystemSettings } from '../types/admin';

export const adminUserAtom = atom<AdminUser | null>(null);

// Initialize admin atom with null to prevent undefined states
adminUserAtom.onMount = (setValue) => {
  setValue(null);
  return () => setValue(null);
};

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