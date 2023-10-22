import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Messagetypes {
  role: 'user' | 'assistant';
  content: string;
}

export const sendMessage = createAsyncThunk(
  'chat/send-message',
  async (messages: Messagetypes[] | [], thunkAPI) => {
    console.log('before async', messages);
    try {
      const response = await axios.post('/api/chat', messages);
      return response.data;
    } catch (error: any) {
      console.log(error);

      return thunkAPI.rejectWithValue('An error occured');
    }
  }
);
