import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  className?: string;
}

export function Table<T>({ columns, data, keyExtractor, className }: TableProps<T>) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={keyExtractor(item)}>
              {columns.map((column, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof column.accessor === 'function'
                    ? column.accessor(item)
                    : String(item[column.accessor])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}