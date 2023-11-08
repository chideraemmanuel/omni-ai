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
  clearRegistrationFirstNameError,
  clearRegistrationLastNameError,
  clearRegistrationPasswordError,
  setRegistrationConfirmPassword,
  setRegistrationConfirmPasswordError,
  setRegistrationEmail,
  setRegistrationFirstName,
  setRegistrationLastName,
  setRegistrationPassword,
} from '@/redux/slices/formInputSlice';
import Link from 'next/link';
import FormInput from '@/components/ui/FormInput/FormInput';
import { useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import Button from '@/components/ui/button/Button';
import { FcGoogle } from 'react-icons/fc';
import { useRegister } from '@/lib/hooks/useRegister';
import { generateGoogleOauthUrl } from '@/lib/utils/oauth';

interface Props {}

const RegistrationPage: FC<Props> = () => {
  const { firstName, lastName, email, password, confirmPassword } = useSelector(
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
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
  };

  return (
    <>
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
              <div className="name">
                <FormInput
                  type="text"
                  placeholder="Enter your first name"
                  label="First Name"
                  value={firstName.value}
                  setValue={setRegistrationFirstName}
                  error={firstName.error}
                  clearError={clearRegistrationFirstNameError}
                />
                <FormInput
                  type="text"
                  placeholder="Enter your last name"
                  label="Last Name"
                  value={lastName.value}
                  setValue={setRegistrationLastName}
                  error={lastName.error}
                  clearError={clearRegistrationLastNameError}
                />
              </div>
              <FormInput
                type="email"
                placeholder="Enter your email"
                label="Email"
                value={email.value}
                setValue={setRegistrationEmail}
                error={email.error}
                clearError={clearRegistrationEmailError}
              />
              <FormInput
                type="password"
                placeholder="Pick a password"
                label="Password"
                value={password.value}
                setValue={setRegistrationPassword}
                error={password.error}
                clearError={clearRegistrationPasswordError}
              />
              <FormInput
                type="password"
                placeholder="Confirm your password"
                label="Confirm Password"
                value={confirmPassword.value}
                setValue={setRegistrationConfirmPassword}
                error={confirmPassword.error}
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
              <FcGoogle />
              <span>Sign in with google</span>
            </Button>
          </RegistrationForm>
        </RegistrationPageFormContainer>
      </RegistrationPageContainer>
    </>
  );
};

export default RegistrationPage;
