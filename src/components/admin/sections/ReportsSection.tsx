import { useState } from 'react';
import { BarChart2, Download, Calendar } from 'lucide-react';
import { Button } from '../../ui/Button';

export function ReportsSection() {
  const [selectedReport, setSelectedReport] = useState<string>('trading');
  const [dateRange, setDateRange] = useState('week');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">التقارير</h2>
        <Button
          variant="secondary"
          icon={Download}
          onClick={() => {}}
        >
          تصدير التقرير
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex space-x-2">
            {[
              { id: 'trading', label: 'التداول' },
              { id: 'users', label: 'المستخدمين' },
              { id: 'performance', label: 'الأداء' },
              { id: 'revenue', label: 'الإيرادات' },
            ].map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md
                  ${selectedReport === report.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {report.label}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="today">اليوم</option>
              <option value="week">آخر أسبوع</option>
              <option value="month">آخر شهر</option>
              <option value="year">آخر سنة</option>
            </select>
          </div>
        </div>

        <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
          <div className="text-center">
            <BarChart2 className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">تقرير {
              selectedReport === 'trading' ? 'التداول' :
              selectedReport === 'users' ? 'المستخدمين' :
              selectedReport === 'performance' ? 'الأداء' : 'الإيرادات'
            }</h3>
            <p className="mt-1 text-sm text-gray-500">
              سيتم عرض الرسوم البيانية والإحصائيات هنا
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}