import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegistrationCredentials {
  name: string;
  email: string;
  password: string;
}

export const register = createAsyncThunk(
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
      thunkAPI.rejectWithValue(error.response.data.error || 'An error occured');
    }
  }
);
