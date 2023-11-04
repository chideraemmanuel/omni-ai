'use client';

import FormInput from '@/components/ui/FormInput/FormInput';
import { FC, FormEvent } from 'react';
import styles from './page.module.scss';
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
      <section className={styles.page_container}>
        <div className={styles.form_container}>
          <div className={styles.form_header}>
            <h2>Login to use OmniAI</h2>
            <p>
              Don't have an account? <Link href={'/register'}>Register</Link>
            </p>
          </div>

          <div className={styles.login_form}>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                placeholder="Enter your password"
                label="Password"
                value={password.value}
                setValue={setLoginPassword}
                error={password.error}
                // error={'this is an error'}
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

            <div className={styles.login_form_break}>
              <div></div>
              <span>or</span>
              <div></div>
            </div>

            <Button
              width="100%"
              variant="google"
              href={generateGoogleOauthUrl()}
            >
              <FcGoogle />
              <span>Continue with google</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
