'use client';

import { FC, FormEvent } from 'react';
import {
  PasswordResetInitiationFormContainer,
  PasswordResetInitiationFormHeader,
  PasswordResetInitiationPageContainer,
} from './page.styled';
import TextInput from '@/components/ui/textInput/TextInput';
import Button from '@/components/ui/button/Button';
import { useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import { setPasswordResetInitiationInput } from '@/redux/slices/formInputSlice';
import { usePasswordReset } from '@/lib/hooks/usePasswordReset';

interface Props {}

const PasswordResetInitiationPage: FC<Props> = () => {
  const { passwordResetInitiationInput } = useSelector(
    (store: StoreTypes) => store.formInputs
  );

  const { isInitiatingPasswordReset } = useSelector(
    (store: StoreTypes) => store.auth
  );

  const { sendResetEmail } = usePasswordReset();

  const handlePasswordResetInitiation = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await sendResetEmail(passwordResetInitiationInput.value);
  };

  return (
    <PasswordResetInitiationPageContainer>
      <PasswordResetInitiationFormContainer>
        <PasswordResetInitiationFormHeader>
          <h2>Reset your password</h2>
          <p>
            Please enter the email address associated with your account. We wil
            send you an email with instructions on how to recover your password.
          </p>
        </PasswordResetInitiationFormHeader>

        <form onSubmit={(e) => handlePasswordResetInitiation(e)}>
          {/* <input type="text" maxLength={6} placeholder="Enter OTP" />
          <button>Verify</button> */}
          <TextInput
            placeholder="Enter your email address"
            value={passwordResetInitiationInput.value}
            setValue={setPasswordResetInitiationInput}
            error={passwordResetInitiationInput.error}
          />

          <Button
            tagType="button"
            width="100%"
            disabled={isInitiatingPasswordReset}
          >
            {isInitiatingPasswordReset
              ? 'Sending reset email..'
              : 'Send reset email'}
          </Button>

          <Button
            tagType="a"
            href="/login"
            width="100%"
            background="transparent"
            border="1px solid #1b1b1b"
            color="#171717"
          >
            Return to Login
          </Button>
        </form>
      </PasswordResetInitiationFormContainer>
    </PasswordResetInitiationPageContainer>
  );
};

export default PasswordResetInitiationPage;
