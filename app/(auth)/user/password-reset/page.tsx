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

interface Props {}

const PasswordResetPage: FC<Props> = () => {
  const { newPassword, confirmNewPassword } = useSelector(
    (store: StoreTypes) => store.formInputs.resetPassword
  );

  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const resetString = searchParams.get('reset_string');

  console.log(searchParams.get('email'));
  console.log(searchParams.get('reset_string'));

  const { resetUserPassword } = usePasswordReset();

  const handlePasswordReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetUserPassword({
      email,
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
          <input type="text" value={searchParams.get('email')!} disabled />
          <TextInput
            placeholder="Enter your new password"
            value={newPassword.value}
            setValue={setNewPassword}
            error={newPassword.error}
            clearError={clearNewPasswordError}
          />
          <TextInput
            placeholder="Confirm new password"
            value={confirmNewPassword.value}
            setValue={setConfirmNewPassword}
            error={confirmNewPassword.error}
            clearError={clearConfirmNewPasswordError}
          />

          <Button
            tagType="button"
            width="100%"
            // disabled={}
          >
            {/* {isVerifying ? 'Verifying...' : 'Verify'} */}
            Reset password
          </Button>
        </form>
      </PasswordResetFormContainer>
    </PasswordResetPageContainer>
  );
};

export default PasswordResetPage;
