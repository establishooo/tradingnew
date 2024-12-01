import { LucideIcon } from 'lucide-react';

interface AdminAlertProps {
  icon: LucideIcon;
  title: string;
  message: string;
  type: 'warning' | 'error' | 'success' | 'info';
}

const alertStyles = {
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  success: 'bg-green-50 text-green-800 border-green-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

export function AdminAlert({ icon: Icon, title, message, type }: AdminAlertProps) {
  return (
    <div className={`mb-6 p-4 rounded-lg border ${alertStyles[type]}`}>
      <div className="flex items-center">
        <Icon className="h-5 w-5 ml-3" />
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="mt-1 text-sm opacity-90">{message}</p>
        </div>
      </div>
    </div>
  );
}