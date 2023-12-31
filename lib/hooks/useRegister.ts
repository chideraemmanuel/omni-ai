import { registerUser } from '@/redux/slices/auth/authService';
import { resetAuthState } from '@/redux/slices/auth/authSlice';
import {
  resetAllForms,
  setRegistrationConfirmPasswordError,
  setRegistrationEmailError,
  setRegistrationFirstNameError,
  setRegistrationLastNameError,
  setRegistrationPasswordError,
} from '@/redux/slices/formInputSlice';
import { StoreTypes } from '@/redux/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface RegistrationCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useRegister = () => {
  // const [isLoading, setIsLoading] = useState(false);

  const { isLoading, isSuccess, isError, error, user } = useSelector(
    (store: StoreTypes) => store.auth
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // MONITOR AUTH STATE AND TREAT ACCORDINGLY
    if (isSuccess) {
      toast.success('Registration successful!');
      // router.replace('/dashboard');
      router.replace('/user/verify');
      dispatch(resetAllForms());
    }

    if (isError) {
      toast.error(error || 'An error occured during sign up.');
    }

    dispatch(resetAuthState());
  }, [isSuccess, isError, error]);

  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

  const mutate = async (credentials: RegistrationCredentials) => {
    const { firstName, lastName, email, password, confirmPassword } =
      credentials;

    if (firstName.length === 0) {
      dispatch(setRegistrationFirstNameError('Please fill out this field'));
      return;
    }
    if (lastName.length === 0) {
      dispatch(setRegistrationLastNameError('Please fill out this field'));
      return;
    }
    if (email.length === 0) {
      dispatch(setRegistrationEmailError('Please fill out this field'));
      return;
    }
    if (!emailRegex.test(email)) {
      dispatch(setRegistrationEmailError('Please enter a valid email'));
      return;
    }
    if (password.length < 6) {
      dispatch(
        setRegistrationPasswordError('Password should be up to 6 characters')
      );
      return;
    }
    if (confirmPassword !== password) {
      dispatch(setRegistrationConfirmPasswordError('Passwords do not match'));
      return;
    }

    if (!navigator.onLine) {
      toast.warning('Please check your internet connection');
      return;
    }

    dispatch(
      // @ts-ignore
      registerUser({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })
    );

    // setIsLoading(true);

    // try {
    //   const response = await axios.post(
    //     '/api/auth/register',
    //     JSON.stringify({
    //       name,
    //       email,
    //       password,
    //     })
    //   );

    //   console.log(response.data);

    //   dispatch(resetAllForms());
    //   setIsLoading(false);
    //   //   router.replace('/dashboard');
    //   router.push('/');
    // } catch (error) {
    //   setIsLoading(false);
    //   //   console.log(error);
    //   //   console.log(error.response.data.error);

    //   //   @ts-ignore
    //   if (error.response.data.error === 'Email has already been used') {
    //     dispatch(setRegistrationEmailError('Email has already been used'));
    //     return;
    //   }

    //   //   toast('Something went wrong. Please try again.');
    //   alert('Something went wrong. Please try again.');
    // }
  };

  return { mutate };
};
