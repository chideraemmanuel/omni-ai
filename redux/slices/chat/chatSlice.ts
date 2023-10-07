import { createSlice } from '@reduxjs/toolkit';
import { sendMessage } from './chatService';
import { toast } from 'react-toastify';

interface Messagetypes {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatStateTypes {
  userInput: string;
  messages: Messagetypes[] | [];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: ChatStateTypes = {
  userInput: '',
  messages: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUserMessage: (state: ChatStateTypes, action: { payload: string }) => {
      // state.messages.push(action.payload);
      // @ts-ignore
      state.messages.push({ role: 'user', content: action.payload });
    },
    setUserInput: (state: ChatStateTypes, action: { payload: string }) => {
      state.userInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state: ChatStateTypes) => {
        state.isLoading = true;
      })
      .addCase(
        sendMessage.fulfilled,
        (state: ChatStateTypes, action: { payload: Messagetypes }) => {
          state.isLoading = false;
          state.isSuccess = true;
          // @ts-ignore
          state.messages.push({
            role: action.payload.role,
            content: action.payload.content,
          });
        }
      )
      .addCase(
        sendMessage.rejected,
        (state: ChatStateTypes, action: { payload: any }) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
          state.messages.pop();

          toast.error('An error occured');
          // state.messages.push({
          //   role: 'assistant',
          //   content: 'An error occured!',
          // });
        }
      );
  },
});

export const { addUserMessage, setUserInput } = chatSlice.actions;

export default chatSlice.reducer;
