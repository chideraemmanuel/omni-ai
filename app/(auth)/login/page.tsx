'use client';

import FormInput from '@/components/ui/FormInput/FormInput';
import { FC, FormEvent } from 'react';
import {
  LoginForm,
  LoginFormBreak,
  LoginFormHeader,
  LoginPageContainer,
  LoginPageFormContainer,
} from './page.styled';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';
import { FcGoogle } from 'react-icons/fc';
import { StoreTypes } from '@/redux/store';
import { useSelector } from 'react-redux';
import {
  clearLoginEmailError,
  clearLoginPasswordError,
  setLoginEmail,
  setLoginPassword,
} from '@/redux/slices/formInputSlice';
import { useLogin } from '@/lib/hooks/useLogin';
import { generateGoogleOauthUrl } from '@/lib/utils/oauth';
import { useRouter } from 'next/navigation';

interface Props {}

const LoginPage: FC<Props> = () => {
  const { email, password } = useSelector(
    (store: StoreTypes) => store.formInputs.login
  );

  const { isLoading: isLoggingIn } = useSelector(
    (store: StoreTypes) => store.auth
  );

  const router = useRouter();

  const { mutate: login } = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      email: email.value,
      password: password.value,
    });
  };

  return (
    <>
      <LoginPageContainer>
        <LoginPageFormContainer>
          <LoginFormHeader>
            <h2>Login to use OmniAI</h2>
            <p>
              Don't have an account? <Link href={'/register'}>Register</Link>
            </p>
          </LoginFormHeader>

          <LoginForm>
            <form onSubmit={(e) => handleSubmit(e)}>
              <FormInput
                type="email"
                placeholder="Enter your email"
                label="Email"
                value={email.value}
                setValue={setLoginEmail}
                error={email.error}
                clearError={clearLoginEmailError}
              />
              <FormInput
                type="password"
                placeholder="Enter your password"
                label="Password"
                value={password.value}
                setValue={setLoginPassword}
                error={password.error}
                clearError={clearLoginPasswordError}
                forgotPassword={true}
                forgotPasswordAction={() =>
                  router.push('/user/password-reset/initiate')
                }
              />
              <Button tagType="button" disabled={isLoggingIn}>
                {isLoggingIn ? 'Signing in...' : 'Login'}
              </Button>
            </form>

            <LoginFormBreak>
              <div></div>
              <span>or</span>
              <div></div>
            </LoginFormBreak>

            <Button
              width="100%"
              variant="google"
              href={generateGoogleOauthUrl()}
            >
              <FcGoogle />
              <span>Continue with google</span>
            </Button>
          </LoginForm>
        </LoginPageFormContainer>
      </LoginPageContainer>
    </>
  );
};

export default LoginPage;
