'use client';

import { FC } from 'react';
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

interface Props {}

const RegistrationPage: FC<Props> = () => {
  const { name, email, password, confirmPassword } = useSelector(
    (store: StoreTypes) => store.formInputs.register
  );

  return (
    <RegistrationPageContainer>
      <RegistrationPageFormContainer>
        <RegistrationFormHeader>
          <h2>Create an account to use OmniAI</h2>
          <p>
            Have an account? <Link href={'/login'}>Login</Link>
          </p>
        </RegistrationFormHeader>

        <RegistrationForm>
          <form>
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
            <Button tagType="button">Create Account</Button>
          </form>

          <RegistrationFormBreak>
            <div></div>
            <span>or</span>
            <div></div>
          </RegistrationFormBreak>

          <Button width="100%" variant="google">
            <FaGoogle />
            <span>Sign in with google</span>
          </Button>
        </RegistrationForm>
      </RegistrationPageFormContainer>
    </RegistrationPageContainer>
  );
};

export default RegistrationPage;
