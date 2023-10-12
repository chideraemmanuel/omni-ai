import { createSlice } from '@reduxjs/toolkit';

export interface FormInputStateTypes {
  otpInput: string;
  register: {
    name: {
      value: string;
      error: string | null;
    };
    email: {
      value: string;
      error: string | null;
    };
    password: {
      value: string;
      error: string | null;
    };
    confirmPassword: {
      value: string;
      error: string | null;
    };
  };
  login: {
    email: {
      value: string;
      error: string | null;
    };
    password: {
      value: string;
      error: string | null;
    };
  };
}

const initialState: FormInputStateTypes = {
  otpInput: '',
  register: {
    name: {
      value: '',
      error: null,
    },
    email: {
      value: '',
      error: null,
    },
    password: {
      value: '',
      error: null,
    },
    confirmPassword: {
      value: '',
      error: null,
    },
  },
  login: {
    email: {
      value: '',
      error: null,
    },
    password: {
      value: '',
      error: null,
    },
  },
};

// const initialState = {} as FormInputStateTypes;

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setOtpInput: (state: FormInputStateTypes, action: { payload: string }) => {
      state.otpInput = action.payload;
    },
    setRegistrationName: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.name.value = action.payload;
    },
    setRegistrationEmail: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.email.value = action.payload;
    },
    setRegistrationPassword: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.password.value = action.payload;
    },
    setRegistrationConfirmPassword: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.confirmPassword.value = action.payload;
    },
    setLoginEmail: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.login.email.value = action.payload;
    },
    setLoginPassword: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.login.password.value = action.payload;
    },
    // ERRORS
    setRegistrationNameError: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.name.error = action.payload;
    },
    setRegistrationEmailError: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.email.error = action.payload;
    },
    setRegistrationPasswordError: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.password.error = action.payload;
    },
    setRegistrationConfirmPasswordError: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.confirmPassword.error = action.payload;
    },
    setLoginEmailError: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.login.email.error = action.payload;
    },
    setLoginPasswordError: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.login.password.error = action.payload;
    },
    clearRegistrationNameError: (state: FormInputStateTypes) => {
      state.register.name.error = null;
    },
    clearRegistrationEmailError: (state: FormInputStateTypes) => {
      state.register.email.error = null;
    },
    clearRegistrationPasswordError: (state: FormInputStateTypes) => {
      state.register.password.error = null;
    },
    clearRegistrationConfirmPasswordError: (state: FormInputStateTypes) => {
      state.register.confirmPassword.error = null;
    },
    clearLoginEmailError: (state: FormInputStateTypes) => {
      state.login.email.error = null;
    },
    clearLoginPasswordError: (state: FormInputStateTypes) => {
      state.login.password.error = null;
    },
    resetRegistrationForm: (state: FormInputStateTypes) => {
      state.register.name = { value: '', error: null };
      state.register.email = { value: '', error: null };
      state.register.password = { value: '', error: null };
    },
    resetLoginForm: (state: FormInputStateTypes) => {
      state.login.email = { value: '', error: null };
      state.login.password = { value: '', error: null };
    },
    resetAllForms: (state: FormInputStateTypes) => {
      state.register.name = { value: '', error: null };
      state.register.email = { value: '', error: null };
      state.register.password = { value: '', error: null };
      state.register.confirmPassword = { value: '', error: null };

      state.login.email = { value: '', error: null };
      state.login.password = { value: '', error: null };
    },
    resetErrors: (state: FormInputStateTypes) => {
      state.register.name.error = null;
      state.register.email.error = null;
      state.register.password.error = null;
      state.register.confirmPassword.error = null;

      state.login.email.error = null;
      state.login.password.error = null;
    },
  },
});

export const {
  setOtpInput,
  setRegistrationName,
  setRegistrationEmail,
  setRegistrationPassword,
  setRegistrationConfirmPassword,
  setLoginEmail,
  setLoginPassword,
  setRegistrationNameError,
  setRegistrationEmailError,
  setRegistrationPasswordError,
  setRegistrationConfirmPasswordError,
  setLoginEmailError,
  setLoginPasswordError,
  clearRegistrationNameError,
  clearRegistrationEmailError,
  clearRegistrationPasswordError,
  clearRegistrationConfirmPasswordError,
  clearLoginEmailError,
  clearLoginPasswordError,
  resetLoginForm,
  resetAllForms,
  resetErrors,
} = signInSlice.actions;

export default signInSlice.reducer;
