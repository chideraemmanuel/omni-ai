import { ChangeEvent } from 'react';

export interface ComponentProps {
  type: 'text' | 'email' | 'password';
  label: string;
  placeholder: string;
  value: string;
  setValue: any;
  error?: null | string;
  clearError?: any;
  forgotPassword?: boolean;
  forgotPasswordAction?: () => void;
}

export interface FormInputFieldProps {
  error: boolean;
}
