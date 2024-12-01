import { ReactNode, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, adminUserAtom } from '../store/atoms';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [, setUser] = useAtom(userAtom);
  const [, setAdminUser] = useAtom(adminUserAtom);

  useEffect(() => {
    const loadAuthState = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedAdmin = localStorage.getItem('adminUser');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        if (storedAdmin) {
          setAdminUser(JSON.parse(storedAdmin));
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
        // Reset auth state on error
        setUser(null);
        setAdminUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('adminUser');
      }
    };

    loadAuthState();

    // Cleanup function
    return () => {
      setUser(null);
      setAdminUser(null);
    };
  }, [setUser, setAdminUser]);

  return <>{children}</>;
}