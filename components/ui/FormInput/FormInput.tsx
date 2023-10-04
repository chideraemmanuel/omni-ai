'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  FormInputBottom,
  FormInputContainer,
  FormInputField,
  FormInputIcon,
  FormInputLabel,
  PasswordToggleIcon,
} from './FormInput.styled';
import { ComponentProps } from './FormInput.types';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

const FormInput: FC<ComponentProps> = ({
  type,
  label,
  placeholder,
  value,
  setValue,
  error,
  clearError,
  forgotPassword,
  forgotPasswordAction,
}) => {
  const [passwordCurrentType, setPasswordCurrentType] = useState<
    'text' | 'password'
  >('password');

  const dispatch = useDispatch();

  const handleVisibilityToggle = () => {
    if (passwordCurrentType === 'password') {
      setPasswordCurrentType('text');
    } else {
      setPasswordCurrentType('password');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(clearError());
    dispatch(setValue(e.target.value));
  };

  return (
    <FormInputContainer
    // htmlFor={label}
    >
      <FormInputLabel>{label}</FormInputLabel>

      <FormInputField error={error && error.length > 0 ? true : false}>
        <FormInputIcon>
          {type === 'text' ? (
            <FiUser />
          ) : type === 'email' ? (
            <FiMail />
          ) : type === 'password' ? (
            <FiLock />
          ) : null}
        </FormInputIcon>

        <input
          id={label}
          placeholder={placeholder}
          type={type === 'password' ? passwordCurrentType : 'text'}
          value={value}
          onChange={(e) => handleChange(e)}
        />

        {type === 'password' && (
          <PasswordToggleIcon onClick={handleVisibilityToggle}>
            {passwordCurrentType === 'password' ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggleIcon>
        )}
      </FormInputField>

      <FormInputBottom>
        <span className="error">{error}</span>
        {forgotPassword && forgotPasswordAction && (
          <span onClick={() => {}} className="forgot-password">
            Forgot password?
          </span>
        )}
      </FormInputBottom>
    </FormInputContainer>
  );
};

export default FormInput;
