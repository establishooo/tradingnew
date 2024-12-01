export interface User {
  id: string;
  fullName: string;
  email: string;
  balance: number;
  portfolioValue: number;
  trades: Trade[];
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
}

export interface Trade {
  id: string;
  userId: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  orderType: 'MARKET' | 'LIMIT' | 'STOP_LOSS';
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  timestamp: Date;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}