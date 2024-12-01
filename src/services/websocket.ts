import { Stock } from '../types';
import { mockStocks } from './mockStocks';

class StockWebSocket {
  private mockInterval: number | null = null;
  private subscribers: Set<(stock: Stock) => void> = new Set();

  constructor() {
    this.startMockUpdates();
  }

  private startMockUpdates() {
    if (this.mockInterval) return;

    this.mockInterval = window.setInterval(() => {
      mockStocks.forEach(stock => {
        const randomChange = (Math.random() - 0.5) * 2;
        const updatedStock: Stock = {
          ...stock,
          price: Number((stock.price * (1 + randomChange * 0.01)).toFixed(2)),
          change: Number((stock.price * randomChange * 0.01).toFixed(2)),
          changePercent: Number(randomChange.toFixed(2)),
          volume: stock.volume + Math.floor(Math.random() * 1000)
        };
        this.subscribers.forEach(callback => callback(updatedStock));
      });
    }, 2000);
  }

  public subscribe(callback: (stock: Stock) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  public disconnect() {
    if (this.mockInterval) {
      clearInterval(this.mockInterval);
      this.mockInterval = null;
    }
    this.subscribers.clear();
  }
}

export const stockWebSocket = new StockWebSocket();