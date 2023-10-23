import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  initiatePasswordReset,
  logOutUser,
  loginUser,
  registerUser,
  resendOtp,
  verifyOtp,
} from './authService';

export interface AuthStateTypes {
  user: any;
  isVerifying: boolean;
  isVerified: boolean;
  isVerificationError: boolean;
  verificationError: null | string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isAuthError: boolean;
  authError: null | string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: null | string;
  isLoggingOut: boolean;
  isLoggedOut: boolean;
  logOutError: null | string;
  isInitiatingPasswordReset: boolean;
  isInitatedPasswordReset: boolean;
  isInitiatingPasswordResetError: boolean;
  PasswordResetInitiationError: null | string;
}

const initialState: AuthStateTypes = {
  user: null,
  isVerifying: false,
  isVerified: false,
  isVerificationError: false,
  verificationError: null,
  isAuthenticated: false,
  isAuthenticating: true,
  isAuthError: false,
  authError: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  isLoggingOut: false,
  isLoggedOut: false,
  logOutError: null,
  isInitiatingPasswordReset: false,
  isInitatedPasswordReset: false,
  isInitiatingPasswordResetError: false,
  PasswordResetInitiationError: null,
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

      state.isVerified = false;
      state.isVerifying = false;
      state.isVerificationError = false;
      state.verificationError = null;

      state.authError = null;
      state.isAuthError = false;
      state.isAuthenticated = false;
      state.isAuthenticating = false;

      state.isLoggingOut = false;
      state.isLoggedOut = false;
      state.logOutError = null;
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
        state.isAuthError = true;
        // @ts-ignore
        state.authError = action.payload;
      })
      .addCase(verifyOtp.pending, (state: AuthStateTypes) => {
        state.isVerifying = true;
      })
      .addCase(verifyOtp.fulfilled, (state: AuthStateTypes, action) => {
        state.isVerifying = false;
        state.isVerified = true;
        // state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state: AuthStateTypes, action) => {
        state.isVerifying = false;
        state.isVerificationError = true;
        // @ts-ignore
        state.verificationError = action.payload;
      })
      .addCase(resendOtp.pending, (state: AuthStateTypes) => {})
      .addCase(resendOtp.fulfilled, (state: AuthStateTypes) => {})
      .addCase(resendOtp.rejected, (state: AuthStateTypes) => {})
      .addCase(logOutUser.pending, (state: AuthStateTypes) => {
        state.isLoggingOut = true;
      })
      .addCase(logOutUser.fulfilled, (state: AuthStateTypes) => {
        state.isLoggingOut = false;
        state.isLoggedOut = true;
        state.user = null;
      })
      .addCase(
        logOutUser.rejected,
        (state: AuthStateTypes, action: { payload: any }) => {
          state.isLoggingOut = false;
          state.isLoggedOut = false;
          state.logOutError = action.payload;
        }
      )
      .addCase(initiatePasswordReset.pending, (state: AuthStateTypes) => {
        state.isInitiatingPasswordReset = true;
      })
      .addCase(initiatePasswordReset.fulfilled, (state: AuthStateTypes) => {
        state.isInitiatingPasswordReset = false;
        state.isInitatedPasswordReset = true;
      })
      .addCase(
        initiatePasswordReset.rejected,
        (state: AuthStateTypes, action: { payload: any }) => {
          state.isInitiatingPasswordReset = false;
          state.isInitiatingPasswordResetError = true;
          state.PasswordResetInitiationError = action.payload;
        }
      );
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
