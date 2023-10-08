import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, loginUser, registerUser } from './authService';

export interface AuthStateTypes {
  user: any;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: AuthStateTypes = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state: AuthStateTypes) => {
      state.error = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state: AuthStateTypes) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state: AuthStateTypes, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state: AuthStateTypes, action) => {
        state.isLoading = false;
        state.isError = true;
        // @ts-ignore
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state: AuthStateTypes) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state: AuthStateTypes, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state: AuthStateTypes, action) => {
        state.isLoading = false;
        state.isError = true;
        // @ts-ignore
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state: AuthStateTypes) => {
        state.isAuthenticating = true;
      })
      .addCase(getCurrentUser.fulfilled, (state: AuthStateTypes, action) => {
        state.isAuthenticating = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state: AuthStateTypes, action) => {
        state.isAuthenticating = false;
        state.isAuthenticated = false;
        // @ts-ignore
        // state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
