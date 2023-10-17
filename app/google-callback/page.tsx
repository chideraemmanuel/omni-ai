'use client';

import FullScreenLoader from '@/components/ui/fullScreenLoader/FullScreenLoader';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Props {}

const GoogleCallbackPage: FC<Props> = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const router = useRouter();

  useEffect(() => {
    if (code) {
      const authenticate = async () => {
        try {
          await axios.post('/api/auth/google', {
            code,
          });
          // toast and navigate to dashboard on successful google verification
          toast.success('Registration successful!');
          router.replace('/dashboard');
        } catch (error: any) {
          toast.error(
            error?.response?.data?.message ||
              'An error occured during authentication'
          );
          router.replace('/register');
        }
      };

      authenticate();
    } else {
      toast.error('Authentication failed');
      router.replace('/register');
    }
  }, [searchParams, code]);

  return (
    <>
      <FullScreenLoader />
    </>
  );
};

export default GoogleCallbackPage;
