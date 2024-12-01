import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Toggle } from '../components/ui/Toggle';
import { Button } from '../components/ui/Button';
import { Save } from 'lucide-react';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    darkMode: false,
    autoRefresh: true,
    language: 'ar',
    chartType: 'candlestick',
  });

  const handleSave = () => {
    // Implement settings save logic
    console.log('Saving settings:', settings);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">الإعدادات</h2>
          <Button
            variant="primary"
            icon={Save}
            onClick={handleSave}
          >
            حفظ التغييرات
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            تخصيص الواجهة
          </h3>
          <div className="space-y-4">
            <Toggle
              enabled={settings.notifications}
              onChange={() => setSettings(s => ({ ...s, notifications: !s.notifications }))}
              label="الإشعارات"
              description="تلقي إشعارات عن تحديثات الأسعار والصفقات"
            />

            <Toggle
              enabled={settings.sound}
              onChange={() => setSettings(s => ({ ...s, sound: !s.sound }))}
              label="الأصوات"
              description="تفعيل التنبيهات الصوتية"
            />

            <Toggle
              enabled={settings.darkMode}
              onChange={() => setSettings(s => ({ ...s, darkMode: !s.darkMode }))}
              label="الوضع الليلي"
              description="تفعيل المظهر الداكن للواجهة"
            />

            <Toggle
              enabled={settings.autoRefresh}
              onChange={() => setSettings(s => ({ ...s, autoRefresh: !s.autoRefresh }))}
              label="تحديث تلقائي"
              description="تحديث البيانات تلقائياً كل 5 ثواني"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اللغة
              </label>
              <select
                value={settings.language}
                onChange={(e) => setSettings(s => ({ ...s, language: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نوع الرسم البياني
              </label>
              <select
                value={settings.chartType}
                onChange={(e) => setSettings(s => ({ ...s, chartType: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="candlestick">شموع يابانية</option>
                <option value="line">خط بياني</option>
                <option value="area">مساحة</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}