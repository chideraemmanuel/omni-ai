'use client';

import FormInput from '@/components/ui/FormInput/FormInput';
import { FC } from 'react';
import {
  LoginForm,
  LoginFormBreak,
  LoginFormHeader,
  LoginPageContainer,
  LoginPageFormContainer,
} from './page.styled';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';
import { FaGoogle } from 'react-icons/fa';
import { StoreTypes } from '@/redux/store';
import { useSelector } from 'react-redux';
import {
  clearLoginEmailError,
  clearLoginPasswordError,
  setLoginEmail,
  setLoginPassword,
} from '@/redux/slices/formInputSlice';

interface Props {}

const LoginPage: FC<Props> = () => {
  const { email, password } = useSelector(
    (store: StoreTypes) => store.formInputs.login
  );

  return (
    <LoginPageContainer>
      <LoginPageFormContainer>
        <LoginFormHeader>
          <h2>Login to use OmniAI</h2>
          <p>
            Don't have an account? <Link href={'/register'}>Register</Link>
          </p>
        </LoginFormHeader>

        <LoginForm>
          <form>
            <FormInput
              type="email"
              placeholder="Enter your email"
              label="Email"
              value={email.value}
              setValue={setLoginEmail}
              error={email.error}
              // error={'this is an error'}
              clearError={clearLoginEmailError}
            />
            <FormInput
              type="password"
              placeholder="Pick a password"
              label="Password"
              value={password.value}
              setValue={setLoginPassword}
              error={password.error}
              // error={'this is an error'}
              clearError={clearLoginPasswordError}
            />
            <Button tagType="button">Create Account</Button>
          </form>

          <LoginFormBreak>
            <div></div>
            <span>or</span>
            <div></div>
          </LoginFormBreak>

          <Button width="100%" variant="google">
            <FaGoogle />
            <span>Continue with google</span>
          </Button>
        </LoginForm>
      </LoginPageFormContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
