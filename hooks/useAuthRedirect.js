'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const useAuthRedirect = (redirectUrl = '/login') => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  return user;
};

export default useAuthRedirect;
