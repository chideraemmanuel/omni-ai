import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegistrationCredentials {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: RegistrationCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        '/api/auth/register',
        JSON.stringify(credentials)
      );

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        // @ts-ignore
        error?.response?.data?.message || 'An error occured'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        '/api/auth/login',
        JSON.stringify(credentials)
      );

      return response.data;
    } catch (error) {
      console.log('from auth service error:', error);
      return thunkAPI.rejectWithValue(
        // @ts-ignore
        error?.response?.data?.message || 'An error occured'
      );
    }
  }
);

// const axiosInstance = axios.create();

// axiosInstance.interceptors.response.use(
//   (response) => {
//     // console.log(response);
//     return response;
//   },
//   (error) => {
//     // console.log(error);
//     if (error.response.status === 401) {
//       window.location.href = '/login';
//     }

//     return Promise.reject(error);
//   }
// );

export const getCurrentUser = createAsyncThunk(
  'auth/get-user',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/auth/user');
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        // @ts-ignore
        error?.response?.data?.message || 'An error occureddd'
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verify-otp',
  async (otp: string, thunkAPI) => {
    try {
      const userResponse = await axios.get('/api/auth/user');

      console.log('user response', userResponse);

      const { email } = userResponse.data;

      const otpVerificationResponse = await axios.post(
        '/api/auth/otp/verify',
        JSON.stringify({
          otp,
          email,
        })
      );
      console.log('otp verification response', otpVerificationResponse.data);

      return otpVerificationResponse.data;
    } catch (error) {
      console.log('otp verification error', error);
      return thunkAPI.rejectWithValue(
        // @ts-ignore
        error?.response?.data?.message || 'Otp Verification Failed'
      );
    }
  }
);
