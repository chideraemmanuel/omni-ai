import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegistrationCredentials {
  firstName: string;
  lastName: string;
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
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'An error occured during registration'
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
    } catch (error: any) {
      console.log('from auth service login error:', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'An error occured during login'
      );
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/auth/logout');

      return response.data;
    } catch (error: any) {
      console.log('from auth service logout error:', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'An error occured during logout'
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
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'An error occured'
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verify-otp',
  async (credentials: { otp: string; email: string }, thunkAPI) => {
    const { otp, email } = credentials;
    try {
      const otpVerificationResponse = await axios.post(
        '/api/auth/user/verify',
        JSON.stringify({
          otp,
          email,
        })
      );
      console.log('otp verification response', otpVerificationResponse.data);

      return otpVerificationResponse.data;
    } catch (error: any) {
      console.log('otp verification error', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'OTP Verification Failed'
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  'auth/resend-otp',
  async (email: string, thunkAPI) => {
    try {
      const response = await axios.post(
        '/api/auth/user/resend-otp',
        JSON.stringify({ email })
      );

      return response.data;
    } catch (error: any) {
      thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Error resending OTP'
      );
    }
  }
);

export const initiatePasswordReset = createAsyncThunk(
  'auth/reset-password/initiate',
  async (email: string, thunkAPI) => {
    try {
      const response = await axios.post(
        '/api/auth/user/reset-password/initiate',
        JSON.stringify({
          email,
          redirectUrl: 'http://localhost:3000/user/password-reset',
        })
      );

      return response.data;
    } catch (error: any) {
      console.log('Initiate password reset error', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Error initiating password reset'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (
    credentials: { email: string; resetString: string; newPassword: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        '/api/auth/user/reset-password',
        JSON.stringify(credentials)
      );

      return response.data;
    } catch (error: any) {
      console.log('Initiate password reset error', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Error resetting password'
      );
    }
  }
);
