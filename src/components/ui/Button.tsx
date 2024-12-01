import { ButtonHTMLAttributes, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: LucideIcon;
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  icon: Icon,
  children,
  className,
  ...props 
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5 mr-2" />}
      {children}
    </button>
  );
}