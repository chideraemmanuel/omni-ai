import { createSlice } from '@reduxjs/toolkit';
import { register } from './authService';

export interface AuthStateTypes {
  user: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: AuthStateTypes = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: AuthStateTypes) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state: AuthStateTypes, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state: AuthStateTypes, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
