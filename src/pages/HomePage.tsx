import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { BarChart2 } from 'lucide-react';
import { useState } from 'react';

export function HomePage() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (user) {
    return null; // User will be redirected by AuthRoute
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <BarChart2 className="h-16 w-16 text-blue-600 mx-auto" />
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">
            منصة التداول التعليمية
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            تعلم التداول في بيئة آمنة مع رصيد افتراضي
          </p>
        </div>

        <div className="mt-12 max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {showLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
              </h2>
            </div>

            {showLogin ? <LoginForm /> : <RegisterForm />}

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                {showLogin
                  ? 'ليس لديك حساب؟ سجل الآن'
                  : 'لديك حساب بالفعل؟ سجل دخولك'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <Feature
            title="تداول بدون مخاطر"
            description="ابدأ التداول برصيد افتراضي قدره 100,000 دولار"
          />
          <Feature
            title="بيانات حية"
            description="أسعار مباشرة لأكثر من 100 سهم"
          />
          <Feature
            title="أدوات متقدمة"
            description="رسوم بيانية ومؤشرات فنية احترافية"
          />
        </div>
      </div>
    </div>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}