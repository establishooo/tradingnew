import { useQuery } from '@tanstack/react-query';
import { getStockQuotes } from '../services/api';

export function useStocks() {
  return useQuery({
    queryKey: ['stocks'],
    queryFn: getStockQuotes,
    refetchInterval: 10000, // Refresh every 10 seconds to stay within rate limits
    retry: 2,
    staleTime: 5000,
    refetchOnWindowFocus: true,
    onError: (error) => {
      console.error('Failed to fetch stocks:', error);
    },
  });
}