import { useAtom } from 'jotai';
import { systemSettingsAtom } from '../../store/admin';
import { Save, AlertTriangle } from 'lucide-react';
import { Toggle } from '../ui/Toggle';
import { AdminAlert } from './AdminAlert';

export function SystemConfiguration() {
  const [settings, setSettings] = useAtom(systemSettingsAtom);

  const handleToggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings({ ...settings, [key]: !settings[key] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">إعدادات النظام</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Save className="h-5 w-5 ml-2" />
          حفظ التغييرات
        </button>
      </div>

      {!settings.tradingEnabled && (
        <AdminAlert
          icon={AlertTriangle}
          title="التداول معطل"
          message="التداول معطل حالياً في النظام. لن يتمكن المستخدمون من تنفيذ الصفقات."
          type="warning"
        />
      )}

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white shadow overflow-hidden rounded-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">إعدادات التداول</h3>
          <div className="space-y-4">
            <Toggle
              enabled={settings.tradingEnabled}
              onChange={() => handleToggle('tradingEnabled')}
              label="تفعيل التداول"
              description="السماح للمستخدمين بتنفيذ الصفقات"
            />

            <Toggle
              enabled={settings.maintenanceMode}
              onChange={() => handleToggle('maintenanceMode')}
              label="وضع الصيانة"
              description="تعطيل جميع عمليات التداول"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">الحد الأقصى لقيمة الصفقة</label>
              <input
                type="number"
                value={settings.maxTradeValue}
                onChange={(e) => setSettings({ ...settings, maxTradeValue: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">إعدادات API</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">مفتاح Polygon.io API</label>
              <input
                type="password"
                value={settings.apiKeys.polygonApi}
                onChange={(e) => setSettings({
                  ...settings,
                  apiKeys: { ...settings.apiKeys, polygonApi: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}