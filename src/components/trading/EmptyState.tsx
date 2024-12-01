import { BookOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex items-center justify-center h-[600px] bg-white rounded-lg shadow-md">
      <div className="text-center">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">لم يتم اختيار سهم</h3>
        <p className="mt-1 text-sm text-gray-500">
          اختر سهماً من القائمة لعرض التفاصيل وبدء التداول
        </p>
      </div>
    </div>
  );
}