import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: number | null;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6", className)}>
      <div className="flex items-center justify-between">
        <Icon className="h-8 w-8 text-blue-600" />
        {trend !== null && (
          <span className={`text-sm font-medium ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
          </span>
        )}
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-gray-900">{value}</h3>
      <p className="mt-1 text-sm text-gray-600">{title}</p>
    </div>
  );
}