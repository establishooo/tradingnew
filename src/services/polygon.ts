import { Stock } from '../types';
import { mockStocks } from './mockStocks';

const API_KEY = 'baaf81ba-1174-42dc-b155-74b96c5de680';
const BASE_URL = 'https://api.polygon.io/v2';

export class PolygonService {
  static async getStockQuotes(symbols: string[]): Promise<Stock[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/snapshot/locale/us/markets/stocks/tickers?tickers=${symbols.join(',')}&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.tickers || !Array.isArray(data.tickers)) {
        console.warn('Invalid API response, using mock data');
        return mockStocks;
      }

      return data.tickers.map((ticker: any) => ({
        symbol: ticker.ticker,
        name: mockStocks.find(stock => stock.symbol === ticker.ticker)?.name || ticker.ticker,
        price: ticker.lastTrade?.p || ticker.lastQuote?.p || 0,
        change: ticker.todaysChange || 0,
        changePercent: ticker.todaysChangePerc || 0,
        volume: ticker.day?.v || 0
      }));
    } catch (error) {
      console.warn('Failed to fetch stock quotes, using mock data:', error);
      return mockStocks;
    }
  }
}