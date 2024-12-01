import { Search } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
}

export function SearchInput({ onSearch, className, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        className={cn(
          "pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          className
        )}
        onChange={(e) => onSearch(e.target.value)}
        {...props}
      />
    </div>
  );
}