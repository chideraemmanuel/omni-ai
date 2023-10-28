import { resendOtp } from '@/redux/slices/auth/authService';
import { resetAuthState } from '@/redux/slices/auth/authSlice';
import { StoreTypes } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const useResendOtp = () => {
  const {
    isResendingOtp,
    isResendOtpSuccess,
    isResendOtpError,
    resendOtpError,
  } = useSelector((store: StoreTypes) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isResendOtpSuccess) {
      toast.success('OTP sent successfully');
    }

    if (isResendOtpError) {
      toast.error(resendOtpError || 'Could not resend OTP');
    }

    dispatch(resetAuthState());
  }, [isResendOtpSuccess, isResendOtpError, resendOtpError]);

  const mutate = async (email: string) => {
    // @ts-ignore
    dispatch(resendOtp(email));
  };

  return { mutate };
};
