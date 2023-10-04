import {
  resetAllForms,
  setRegistrationConfirmPasswordError,
  setRegistrationEmailError,
  setRegistrationNameError,
  setRegistrationPasswordError,
} from '@/redux/slices/formInputSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

interface RegistrationCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

  const mutate = async (credentials: RegistrationCredentials) => {
    const { name, email, password, confirmPassword } = credentials;

    if (name.length === 0) {
      dispatch(setRegistrationNameError('Please fill out this field'));
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
      //   toast('Please check your internet connection');
      alert('Please check your internet connection');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        '/api/auth/register',
        JSON.stringify({
          name,
          email,
          password,
        })
      );

      console.log(response.data);

      dispatch(resetAllForms());
      setIsLoading(false);
      //   router.replace('/dashboard');
      router.push('/');
    } catch (error) {
      setIsLoading(false);
      //   console.log(error);
      //   console.log(error.response.data.error);

      //   @ts-ignore
      if (error.response.data.error === 'Email has already been used') {
        dispatch(setRegistrationEmailError('Email has already been used'));
        return;
      }

      //   toast('Something went wrong. Please try again.');
      alert('Something went wrong. Please try again.');
    }
  };

  return { mutate, isLoading };
};
