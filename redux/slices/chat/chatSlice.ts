import { createSlice } from '@reduxjs/toolkit';
import { sendMessage } from './chatService';

interface Messagetypes {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatStateTypes {
  messages: Messagetypes[] | [];
  isResponding: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: ChatStateTypes = {
  messages: [],
  isResponding: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUserMessage: (
      state: ChatStateTypes,
      action: { payload: { role: 'user'; content: string } }
    ) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state: ChatStateTypes) => {
        state.isResponding = true;
      })
      .addCase(sendMessage.fulfilled, (state: ChatStateTypes, action) => {
        state.isResponding = false;
        state.isSuccess = true;
        state.messages.push(action.payload);
      })
      .addCase(
        sendMessage.rejected,
        (state: ChatStateTypes, action: { payload: any }) => {
          state.isResponding = false;
          state.isError = true;
          state.error = action.payload;
        }
      );
  },
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
