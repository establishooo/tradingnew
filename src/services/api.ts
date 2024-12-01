import { Stock } from '../types';
import { mockStocks } from './mockStocks';

const API_KEY = 'baaf81ba-1174-42dc-b155-74b96c5de680';
const BASE_URL = 'https://api.polygon.io/v3';

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

async function fetchWithErrorHandling(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new APIError(`API request failed: ${response.statusText}`, response.status);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Failed to fetch data from API');
  }
}

export async function getStockQuotes(): Promise<Stock[]> {
  try {
    // Using the free tier endpoint for previous day's close
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'].join(',');
    const data = await fetchWithErrorHandling(
      `${BASE_URL}/quotes/${symbols}?apiKey=${API_KEY}&limit=5`
    );

    if (!data.results || !Array.isArray(data.results)) {
      console.warn('Invalid API response, falling back to mock data');
      return mockStocks;
    }

    return data.results.map((quote: any) => ({
      symbol: quote.T,
      name: mockStocks.find(stock => stock.symbol === quote.T)?.name || quote.T,
      price: quote.c,
      change: quote.c - quote.o,
      changePercent: ((quote.c - quote.o) / quote.o) * 100,
      volume: quote.v
    }));
  } catch (error) {
    console.warn('API request failed, falling back to mock data:', error);
    return mockStocks;
  }
}