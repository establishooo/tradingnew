import { format } from 'date-fns';
import { Trade } from '../../types';
import { Table } from '../ui/Table';

interface TradeHistoryProps {
  trades: Trade[];
  className?: string;
}

export function TradeHistory({ trades, className }: TradeHistoryProps) {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4">سجل التداول</h2>
      <Table
        columns={[
          {
            header: 'التاريخ',
            accessor: (trade) => format(trade.timestamp, 'yyyy-MM-dd HH:mm:ss')
          },
          { header: 'الرمز', accessor: 'symbol' },
          {
            header: 'النوع',
            accessor: (trade) => (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                trade.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {trade.type === 'BUY' ? 'شراء' : 'بيع'}
              </span>
            )
          },
          { header: 'الكمية', accessor: 'quantity' },
          {
            header: 'السعر',
            accessor: (trade) => `$${trade.price.toFixed(2)}`
          },
          {
            header: 'القيمة',
            accessor: (trade) => `$${(trade.price * trade.quantity).toFixed(2)}`
          },
          {
            header: 'الحالة',
            accessor: (trade) => (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                trade.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                trade.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {trade.status === 'COMPLETED' ? 'مكتمل' :
                 trade.status === 'PENDING' ? 'معلق' : 'ملغي'}
              </span>
            )
          }
        ]}
        data={trades}
        keyExtractor={(trade) => trade.id}
      />
    </div>
  );
}