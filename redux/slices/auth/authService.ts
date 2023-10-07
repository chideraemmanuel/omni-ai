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

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.error || 'An error occured'
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
      // const res = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   body: JSON.stringify(credentials),
      // });
      // if (!res.ok) {
      //   throw new Error('Res not okay!');
      // }

      // const data = await res.json();
      // console.log('from auth service:', data);
      // return data;
    } catch (error) {
      console.log('from auth service error:', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.error || 'An error occured'
      );
    }
  }
);
