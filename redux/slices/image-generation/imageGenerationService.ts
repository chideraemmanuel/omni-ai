import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface PayloadTypes {
  prompt: string;
  amount: string;
  size: string;
}

// interface ResultTypes {
//   url: string;
// }

export const generateImage = createAsyncThunk(
  'generate-image',
  async (payload: PayloadTypes, thunkAPI) => {
    try {
      const response = await axios.post('/api/generate-image', payload);
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue('The image could not be generated');
    }
  }
);
