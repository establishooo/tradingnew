import { useQuery } from '@tanstack/react-query';
import { Stock } from '../types';
import { PolygonService } from '../services/polygon';

export function useStockPrices() {
  const { data: stocks = [], isLoading, error } = useQuery({
    queryKey: ['stocks'],
    queryFn: async () => {
      const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];
      return PolygonService.getStockQuotes(symbols);
    },
    refetchInterval: 10000,
    retry: 2,
    staleTime: 5000,
  });

  return {
    stocks,
    isLoading,
    error,
  };
}