import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { BarChart2 } from 'lucide-react';

export function AuthPage() {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir="rtl">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BarChart2 className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-500"
            >
              {isLogin
                ? 'ليس لديك حساب؟ سجل الآن'
                : 'لديك حساب بالفعل؟ سجل دخولك'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}