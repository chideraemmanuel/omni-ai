import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendMessage = createAsyncThunk(
  'chat/send-message',
  async (messages: any, thunkAPI) => {
    try {
      const response = await axios.post('/api/chat', messages);
      return response.data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue('An error occured');
    }
  }
);
