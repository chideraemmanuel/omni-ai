import { logOutUser } from '@/redux/slices/auth/authService';
import { StoreTypes } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const useLogout = () => {
  const { isLoggingOut, isLoggedOut, logOutError } = useSelector(
    (store: StoreTypes) => store.auth
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedOut) {
      toast.success('Logout successful');
      router.replace('/login');
    }

    if (logOutError) {
      toast.error('Logout failed');
    }
  }, [isLoggedOut, logOutError]);

  const mutate = async () => {
    // @ts-ignore
    dispatch(logOutUser());
  };

  return { mutate };
};
