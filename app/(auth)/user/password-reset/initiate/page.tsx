'use client';

import { FC, FormEvent } from 'react';
import {
  PasswordResetFormContainer,
  PasswordResetFormHeader,
  PasswordResetPageContainer,
} from './page.styled';
import TextInput from '@/components/ui/textInput/TextInput';
import Button from '@/components/ui/button/Button';
import { useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import { setPasswordResetInput } from '@/redux/slices/formInputSlice';
import { usePasswordReset } from '@/lib/hooks/usePasswordReset';

interface Props {}

const PasswordResetInitiationPage: FC<Props> = () => {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

  const { passwordResetInput } = useSelector(
    (store: StoreTypes) => store.formInputs
  );

  const { sendResetEmail } = usePasswordReset();

  const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendResetEmail(passwordResetInput);
  };

  return (
    <PasswordResetPageContainer>
      <PasswordResetFormContainer>
        <PasswordResetFormHeader>
          <h2>Reset your password</h2>
          <p>
            Please enter the email address associated with your account. We wil
            send you an email with instructions on how to recover your password.
          </p>
        </PasswordResetFormHeader>

        <form onSubmit={(e) => handlePasswordReset(e)}>
          {/* <input type="text" maxLength={6} placeholder="Enter OTP" />
          <button>Verify</button> */}
          <TextInput
            placeholder="Enter your email address"
            value={passwordResetInput}
            setValue={setPasswordResetInput}
          />

          <Button
            tagType="button"
            width="100%"
            disabled={!emailRegex.test(passwordResetInput)}
          >
            {/* {isVerifying ? 'Verifying...' : 'Verify'} */}
            Send reset email
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
      </PasswordResetFormContainer>
    </PasswordResetPageContainer>
  );
};

export default PasswordResetInitiationPage;
