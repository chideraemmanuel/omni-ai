import { createSlice } from '@reduxjs/toolkit';

export interface FormInputStateTypes {
  passwordResetInitiationInput: {
    value: string;
    error: string | null;
  };
  otpInput: string;
  resetPassword: {
    newPassword: {
      value: string;
      error: string | null;
    };
    confirmNewPassword: {
      value: string;
      error: string | null;
    };
  };
  register: {
    firstName: {
      value: string;
      error: string | null;
    };
    lastName: {
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
  passwordResetInitiationInput: {
    value: '',
    error: null,
  },
  otpInput: '',
  resetPassword: {
    newPassword: {
      value: '',
      error: null,
    },
    confirmNewPassword: {
      value: '',
      error: null,
    },
  },
  register: {
    firstName: {
      value: '',
      error: null,
    },
    lastName: {
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
    setPasswordResetInitiationInput: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.passwordResetInitiationInput.value = action.payload;
    },
    setPasswordResetInitiationInputError: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.passwordResetInitiationInput.error = action.payload;
    },
    clearPasswordResetInitiationInputError: (state: FormInputStateTypes) => {
      state.passwordResetInitiationInput.error = null;
    },
    setOtpInput: (state: FormInputStateTypes, action: { payload: string }) => {
      state.otpInput = action.payload;
    },
    setNewPassword: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.resetPassword.newPassword.value = action.payload;
    },
    setConfirmNewPassword: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.resetPassword.confirmNewPassword.value = action.payload;
    },
    setNewPasswordError: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.resetPassword.newPassword.error = action.payload;
    },
    setConfirmNewPasswordError: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.resetPassword.confirmNewPassword.error = action.payload;
    },
    clearNewPasswordError: (state: FormInputStateTypes) => {
      state.resetPassword.newPassword.error = null;
    },
    clearConfirmNewPasswordError: (state: FormInputStateTypes) => {
      state.resetPassword.confirmNewPassword.error = null;
    },
    setRegistrationFirstName: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.firstName.value = action.payload;
    },
    setRegistrationLastName: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.lastName.value = action.payload;
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
    setRegistrationFirstNameError: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.firstName.error = action.payload;
    },
    setRegistrationLastNameError: (
      state: FormInputStateTypes,
      action: { payload: string }
    ) => {
      state.register.lastName.error = action.payload;
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
    clearRegistrationFirstNameError: (state: FormInputStateTypes) => {
      state.register.firstName.error = null;
    },
    clearRegistrationLastNameError: (state: FormInputStateTypes) => {
      state.register.lastName.error = null;
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
      state.register.firstName = { value: '', error: null };
      state.register.lastName = { value: '', error: null };
      state.register.email = { value: '', error: null };
      state.register.password = { value: '', error: null };
    },
    resetLoginForm: (state: FormInputStateTypes) => {
      state.login.email = { value: '', error: null };
      state.login.password = { value: '', error: null };
    },
    resetAllForms: (state: FormInputStateTypes) => {
      state.register.firstName = { value: '', error: null };
      state.register.lastName = { value: '', error: null };
      state.register.email = { value: '', error: null };
      state.register.password = { value: '', error: null };
      state.register.confirmPassword = { value: '', error: null };

      state.login.email = { value: '', error: null };
      state.login.password = { value: '', error: null };
    },
    resetErrors: (state: FormInputStateTypes) => {
      state.register.firstName.error = null;
      state.register.lastName.error = null;
      state.register.email.error = null;
      state.register.password.error = null;
      state.register.confirmPassword.error = null;

      state.login.email.error = null;
      state.login.password.error = null;
    },
  },
});

export const {
  setPasswordResetInitiationInput,
  setPasswordResetInitiationInputError,
  clearPasswordResetInitiationInputError,
  setOtpInput,
  setNewPassword,
  setConfirmNewPassword,
  setNewPasswordError,
  setConfirmNewPasswordError,
  clearNewPasswordError,
  clearConfirmNewPasswordError,
  setRegistrationFirstName,
  setRegistrationLastName,
  setRegistrationEmail,
  setRegistrationPassword,
  setRegistrationConfirmPassword,
  setLoginEmail,
  setLoginPassword,
  setRegistrationFirstNameError,
  setRegistrationLastNameError,
  setRegistrationEmailError,
  setRegistrationPasswordError,
  setRegistrationConfirmPasswordError,
  setLoginEmailError,
  setLoginPasswordError,
  clearRegistrationFirstNameError,
  clearRegistrationLastNameError,
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
