import { useEffect } from 'react';
import { StoreTypes } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { initiatePasswordReset } from '@/redux/slices/auth/authService';
import { toast } from 'react-toastify';
import { setPasswordResetInput } from '@/redux/slices/formInputSlice';

export const usePasswordReset = () => {
  const {
    isInitiatingPasswordReset,
    isInitatedPasswordReset,
    isInitiatingPasswordResetError,
    PasswordResetInitiationError,
  } = useSelector((store: StoreTypes) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitatedPasswordReset) {
      dispatch(setPasswordResetInput(''));
      toast.success('Reset email sent successfully');
      return;
    }

    if (isInitiatingPasswordResetError) {
      toast.error(
        PasswordResetInitiationError ||
          'An error occured while sending reset email.'
      );
      return;
    }
  }, [
    isInitiatingPasswordReset,
    isInitatedPasswordReset,
    isInitiatingPasswordResetError,
    PasswordResetInitiationError,
  ]);

  const sendResetEmail = async (email: string) => {
    if (!navigator.onLine) {
      toast.warning('Please check your internet connection');
      return;
    }
    // @ts-ignore
    dispatch(initiatePasswordReset(email));
  };

  return { sendResetEmail };
};
