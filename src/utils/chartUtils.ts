import { Stock } from '../types';

export function generateChartData(stock: Stock) {
  const today = new Date();
  const data = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate realistic-looking price data
    const randomChange = (Math.random() - 0.5) * 2;
    const price = stock.price * (1 + (randomChange * 0.1));
    
    data.push({
      time: date.toISOString().split('T')[0],
      value: Number(price.toFixed(2))
    });
  }
  
  return data;
}