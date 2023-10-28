import { useEffect } from 'react';
import { getCurrentUser, verifyOtp } from '@/redux/slices/auth/authService';
import { StoreTypes } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { resetAuthState } from '@/redux/slices/auth/authSlice';

export const useVerifyOtp = () => {
  const { isVerifying, isVerified, isVerificationError, verificationError } =
    useSelector((store: StoreTypes) => store.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isVerified) {
      toast.success('Email Verified Successfully');
      // get current user again to update state
      // @ts-ignore
      dispatch(getCurrentUser());
      router.replace('/dashboard');
    }

    if (isVerificationError) {
      toast.error(verificationError || 'Verification Failed');
    }

    dispatch(resetAuthState());
  }, [isVerified, isVerificationError]);

  const mutate = async (credentials: { otp: string; email: string }) => {
    // if (otp.length !== 6) {
    //     toast.error()
    // }

    // @ts-ignore
    dispatch(verifyOtp(credentials));
  };

  return { mutate };
};
