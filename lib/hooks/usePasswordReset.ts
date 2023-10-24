import { useEffect } from 'react';
import { StoreTypes } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  initiatePasswordReset,
  resetPassword,
} from '@/redux/slices/auth/authService';
import { toast } from 'react-toastify';
import {
  setConfirmNewPassword,
  setConfirmNewPasswordError,
  setNewPassword,
  setNewPasswordError,
  setPasswordResetInitiationInput,
  setPasswordResetInitiationInputError,
} from '@/redux/slices/formInputSlice';

interface PasswordResetCredentials {
  email: string;
  resetString: string;
  password: string;
  confirmPassword: string;
}

export const usePasswordReset = () => {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

  const {
    isInitiatingPasswordReset,
    isInitatedPasswordReset,
    isInitiatingPasswordResetError,
    PasswordResetInitiationError,
    //
    isResettingPassword,
    isPasswordResetSuccess,
    isPasswordResetError,
    passwordResetError,
  } = useSelector((store: StoreTypes) => store.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isInitatedPasswordReset) {
      dispatch(setPasswordResetInitiationInput(''));
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
    isInitatedPasswordReset,
    isInitiatingPasswordResetError,
    PasswordResetInitiationError,
  ]);

  const sendResetEmail = async (email: string) => {
    if (!emailRegex.test(email)) {
      dispatch(
        setPasswordResetInitiationInputError(
          'Please enter a valid email address'
        )
      );
      return;
    }

    if (!navigator.onLine) {
      toast.warning('Please check your internet connection');
      return;
    }
    // @ts-ignore
    dispatch(initiatePasswordReset(email));
  };

  useEffect(() => {
    if (isPasswordResetSuccess) {
      dispatch(setNewPassword(''));
      dispatch(setConfirmNewPassword(''));

      toast.success('Password reset successfully');
      router.replace('/login');
      return;
    }

    if (isPasswordResetError) {
      toast.error(
        passwordResetError || 'An error occured while resetting password.'
      );
      return;
    }
  }, [isPasswordResetSuccess, isPasswordResetError, passwordResetError]);

  const resetUserPassword = async (credentials: PasswordResetCredentials) => {
    const { email, resetString, password, confirmPassword } = credentials;

    if (password.length < 6) {
      dispatch(setNewPasswordError('Password should be up to 6 characters'));
      return;
    }

    if (confirmPassword !== password) {
      dispatch(setConfirmNewPasswordError('Passwords do not match'));
      return;
    }

    // @ts-ignore
    dispatch(resetPassword({ email, resetString, newPassword: password }));
  };

  return { sendResetEmail, resetUserPassword };
};
