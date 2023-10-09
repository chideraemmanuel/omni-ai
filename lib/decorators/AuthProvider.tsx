'use client';

import FullScreenLoader from '@/components/ui/fullScreenLoader/FullScreenLoader';
import { getCurrentUser } from '@/redux/slices/auth/authService';
import { StoreTypes } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAuthenticating, isAuthError, authError } =
    useSelector((store: StoreTypes) => store.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // @ts-ignore
    dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    if (isAuthError) {
      router.replace('/login');
    }
  }, [isAuthError, authError]);

  if (isAuthenticating) {
    return <FullScreenLoader />;
  }

  //   if (!isAuthenticated) {
  //     router.push('/login');
  //     return <></>;
  //   }

  return <>{children}</>;
};

export default AuthProvider;
