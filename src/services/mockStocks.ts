import { Stock } from '../types';

export const mockStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 173.57,
    change: 2.45,
    changePercent: 1.43,
    volume: 52416401
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 406.32,
    change: 5.63,
    changePercent: 1.41,
    volume: 23741092
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 141.16,
    change: 1.98,
    changePercent: 1.42,
    volume: 19234567
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 174.42,
    change: -1.23,
    changePercent: -0.70,
    volume: 31245678
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 484.03,
    change: 6.78,
    changePercent: 1.42,
    volume: 15678901
  }
];