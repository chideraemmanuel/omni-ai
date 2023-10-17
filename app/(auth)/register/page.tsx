'use client';

import { FC, FormEvent } from 'react';
import {
  RegistrationForm,
  RegistrationFormBreak,
  RegistrationFormHeader,
  RegistrationPageContainer,
  RegistrationPageFormContainer,
} from './page.styled';
import {
  clearRegistrationConfirmPasswordError,
  clearRegistrationEmailError,
  clearRegistrationNameError,
  clearRegistrationPasswordError,
  setRegistrationConfirmPassword,
  setRegistrationConfirmPasswordError,
  setRegistrationEmail,
  setRegistrationName,
  setRegistrationPassword,
} from '@/redux/slices/formInputSlice';
import Link from 'next/link';
import FormInput from '@/components/ui/FormInput/FormInput';
import { useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import Button from '@/components/ui/button/Button';
import { FaGoogle } from 'react-icons/fa';
import { useRegister } from '@/lib/hooks/useRegister';
import { generateGoogleOauthUrl } from '@/lib/utils/oauth';
import FullScreenLoader from '@/components/ui/fullScreenLoader/FullScreenLoader';

interface Props {}

const RegistrationPage: FC<Props> = () => {
  const { name, email, password, confirmPassword } = useSelector(
    (store: StoreTypes) => store.formInputs.register
  );

  const { isLoading: isSigningUp } = useSelector(
    (store: StoreTypes) => store.auth
  );

  // REGISTRATION HOOK
  const { mutate: signUp } = useRegister();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signUp({
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
  };

  return (
    <>
      {isSigningUp && <FullScreenLoader />}
      <RegistrationPageContainer>
        <RegistrationPageFormContainer>
          <RegistrationFormHeader>
            <h2>Create an account to use OmniAI</h2>
            <p>
              Have an account? <Link href={'/login'}>Login</Link>
            </p>
          </RegistrationFormHeader>

          <RegistrationForm>
            <form onSubmit={(e) => handleSubmit(e)}>
              <FormInput
                type="text"
                placeholder="Enter your full name"
                label="Name"
                value={name.value}
                setValue={setRegistrationName}
                error={name.error}
                // error={'this is an error'}
                clearError={clearRegistrationNameError}
              />
              <FormInput
                type="email"
                placeholder="Enter your email"
                label="Email"
                value={email.value}
                setValue={setRegistrationEmail}
                error={email.error}
                // error={'this is an error'}
                clearError={clearRegistrationEmailError}
              />
              <FormInput
                type="password"
                placeholder="Pick a password"
                label="Password"
                value={password.value}
                setValue={setRegistrationPassword}
                error={password.error}
                // error={'this is an error'}
                clearError={clearRegistrationPasswordError}
              />
              <FormInput
                type="password"
                placeholder="Confirm your password"
                label="Confirm Password"
                value={confirmPassword.value}
                setValue={setRegistrationConfirmPassword}
                error={confirmPassword.error}
                // error={'this is an error'}
                clearError={clearRegistrationConfirmPasswordError}
              />
              <Button tagType="button" disabled={isSigningUp}>
                {isSigningUp ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <RegistrationFormBreak>
              <div></div>
              <span>or</span>
              <div></div>
            </RegistrationFormBreak>

            <Button
              width="100%"
              variant="google"
              href={generateGoogleOauthUrl()}
            >
              <FaGoogle />
              <span>Sign in with google</span>
            </Button>
          </RegistrationForm>
        </RegistrationPageFormContainer>
      </RegistrationPageContainer>
    </>
  );
};

export default RegistrationPage;
