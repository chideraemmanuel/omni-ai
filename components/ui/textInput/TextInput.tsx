import { ChangeEvent, FC } from 'react';
import {
  TextInputContainer,
  TextInputField,
  TextInputLabel,
} from './TextInput.styled';
import { useDispatch } from 'react-redux';

interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  setValue: any;
}

const TextInput: FC<Props> = ({ label, placeholder, value, setValue }) => {
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      />
    </TextInputContainer>
  );
};

export default TextInput;
