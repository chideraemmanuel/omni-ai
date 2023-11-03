'use client';

import { notFound, useSearchParams } from 'next/navigation';
import { FC, FormEvent } from 'react';
import {
  PasswordResetFormContainer,
  PasswordResetFormHeader,
  PasswordResetPageContainer,
} from './page.styled';
import TextInput from '@/components/ui/textInput/TextInput';
import { useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import {
  clearConfirmNewPasswordError,
  clearNewPasswordError,
  setConfirmNewPassword,
  setNewPassword,
} from '@/redux/slices/formInputSlice';
import Button from '@/components/ui/button/Button';
import { usePasswordReset } from '@/lib/hooks/usePasswordReset';
import FormInput from '@/components/ui/FormInput/FormInput';

interface Props {}

const PasswordResetPage: FC<Props> = () => {
  const { newPassword, confirmNewPassword } = useSelector(
    (store: StoreTypes) => store.formInputs.resetPassword
  );

  const { isResettingPassword, isPasswordResetError, isPasswordResetSuccess } =
    useSelector((store: StoreTypes) => store.auth);

  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const resetString = searchParams.get('reset_string');

  console.log(searchParams.get('email'));
  console.log(searchParams.get('reset_string'));

  const { resetUserPassword } = usePasswordReset();

  const handlePasswordReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetUserPassword({
      email: decodeURIComponent(email as string),
      resetString,
      password: newPassword.value,
      confirmPassword: confirmNewPassword.value,
    });
  };

  if (!email || !resetString) {
    notFound();
  }

  return (
    <PasswordResetPageContainer>
      <PasswordResetFormContainer>
        <PasswordResetFormHeader>
          <h2>Reset your password</h2>
          {/* <p>
            Please enter the email address associated with your account. We wil
            send you an email with instructions on how to recover your password.
          </p> */}
        </PasswordResetFormHeader>

        <form onSubmit={(e) => handlePasswordReset(e)}>
          <input
            type="text"
            value={decodeURIComponent(searchParams.get('email')!)}
            disabled
          />
          <FormInput
            type="password"
            label="New password"
            placeholder="Enter your new password"
            value={newPassword.value}
            setValue={setNewPassword}
            error={newPassword.error}
            clearError={clearNewPasswordError}
          />

          <FormInput
            type="password"
            label="Confirm password"
            placeholder="Confirm your new password"
            value={confirmNewPassword.value}
            setValue={setConfirmNewPassword}
            error={confirmNewPassword.error}
            clearError={clearConfirmNewPasswordError}
          />

          <Button tagType="button" width="100%" disabled={isResettingPassword}>
            {isResettingPassword ? 'Resetting password...' : 'Reset password'}
          </Button>
        </form>
      </PasswordResetFormContainer>
    </PasswordResetPageContainer>
  );
};

export default PasswordResetPage;
