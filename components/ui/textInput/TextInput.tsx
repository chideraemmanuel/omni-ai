import { ChangeEvent, FC } from 'react';
import {
  TextInputContainer,
  TextInputError,
  TextInputField,
  TextInputLabel,
} from './TextInput.styled';
import { useDispatch } from 'react-redux';

interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  setValue: any;
  error?: null | string;
  clearError?: any;
}

const TextInput: FC<Props> = ({
  label,
  placeholder,
  value,
  setValue,
  error,
  clearError,
}) => {
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearError && dispatch(clearError());
    dispatch(setValue(e.target.value));
  };

  return (
    <TextInputContainer>
      <TextInputLabel>{label}</TextInputLabel>

      <TextInputField
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
        $error={error}
      />

      <TextInputError>{error}</TextInputError>
    </TextInputContainer>
  );
};

export default TextInput;
