import {
  resetAllForms,
  setLoginEmailError,
  setLoginPasswordError,
} from '@/redux/slices/formInputSlice';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginUser } from '@/redux/slices/auth/authService';
import { StoreTypes } from '@/redux/store';
import { resetAuthState } from '@/redux/slices/auth/authSlice';
import { toast } from 'react-toastify';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  // const [isLoading, setIsLoading] = useState(false);

  const { isLoading, isSuccess, isError, error } = useSelector(
    (store: StoreTypes) => store.auth
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // MONITOR AUTH STATE AND TREAT ACCORDINGLY
    if (isSuccess) {
      // alert('Registration Successful!');
      toast.success('Login successful!');
      dispatch(resetAllForms());
      router.replace('/dashboard');
    }

    if (isError) {
      alert(error || 'An error occured during sign up.');
    }

    dispatch(resetAuthState());
  }, [isSuccess, isError, error]);

  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

  const mutate = async (credentials: LoginCredentials) => {
    const { email, password } = credentials;

    if (email.length === 0) {
      dispatch(setLoginEmailError('Please enter your email'));
      return;
    }
    if (!emailRegex.test(email)) {
      dispatch(setLoginEmailError('Please enter a valid email'));
      return;
    }
    if (password.length === 0) {
      dispatch(setLoginPasswordError('Please enter your password'));
      return;
    }

    if (!navigator.onLine) {
      //   toast('Please check your internet connection');
      alert('Please check your internet connection');
      return;
    }

    // @ts-ignore
    dispatch(loginUser(credentials));

    // setIsLoading(true);

    // try {
    //   const response = await axios.post(
    //     '/api/auth/login',
    //     JSON.stringify({
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

    //   if (
    //     //   @ts-ignore
    //     error.response.data.error === 'No user with the provided email' ||
    //     //   @ts-ignore
    //     error.response.data.error === 'Incorrect password'
    //   ) {
    //     //    dispatch(setLoginEmailError('No user with the provided email'));
    //     //   @ts-ignore
    //     dispatch(setLoginPasswordError(error.response.data.error));
    //     return;
    //   }

    //   //   toast('Something went wrong. Please try again.');
    //   alert('Something went wrong. Please try again.');
    // }
  };

  return { mutate };
};
