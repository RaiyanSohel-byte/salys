"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTokens } from '@/lib/auth';
import { InfinitySpin, Puff } from 'react-loader-spinner';

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      console.log('🔍 Checking authentication...');
      const tokens = getTokens();

      console.log('📝 Access token:', tokens.access ? 'EXISTS' : 'MISSING');
      console.log('🔄 Refresh token:', tokens.refresh ? 'EXISTS' : 'MISSING');

      if (!tokens.access && !tokens.refresh) {
        console.log('❌ No authentication tokens found - redirecting to home');
        setIsAuthenticated(false);
        setIsLoading(false);
        router.push('/login');
        return;
      }
      
      console.log('✅ Authentication verified');
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();

    // Set up periodic token checking every 30 seconds
    const tokenCheckInterval = setInterval(() => {
      const tokens = getTokens();
      if (!tokens.access && !tokens.refresh && isAuthenticated) {
        console.log('🔄 Tokens removed - logging out');
        setIsAuthenticated(false);
        router.push('/login');
      }
    }, 30000);

    return () => clearInterval(tokenCheckInterval);
  }, [router, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <InfinitySpin
          visible={true}
          color="#ffffff"
          
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Puff
          visible={true}
          height="200"
          width="200"
          color="#ffffff"
          ariaLabel="puff-loading"
        />
      </div>
    );
  }

  return children;
}

