export type AdminRole = 'ADMIN' | 'SUPER_ADMIN' | 'MODERATOR';

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
  permissions: Permission[];
  lastLogin: Date;
  createdAt: Date;
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  description: string;
  category: 'USER_MANAGEMENT' | 'TRADING' | 'CONTENT' | 'SYSTEM' | 'REPORTS';
}

export interface SystemSettings {
  tradingEnabled: boolean;
  maintenanceMode: boolean;
  maxTradeValue: number;
  allowedOrderTypes: ('MARKET' | 'LIMIT' | 'STOP_LOSS')[];
  registrationEnabled: boolean;
  defaultInitialBalance: number;
  apiKeys: {
    polygonApi: string;
  };
  maintenanceSchedule?: {
    startTime: Date;
    endTime: Date;
    message: string;
  };
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  status: 'SUCCESS' | 'FAILURE';
  metadata?: Record<string, unknown>;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalTrades: number;
  dailyTradeVolume: number;
  systemHealth: {
    status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
    lastCheck: Date;
    issues: string[];
  };
}