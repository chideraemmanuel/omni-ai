import styled, { css } from 'styled-components';

export const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 0.375rem; */
  /* width: 100%; */
`;

export const TextInputLabel = styled.span`
  color: ${({ theme }) => theme.colors.light['gray-900']};
  font-size: ${({ theme }) =>
    theme.font['xs-font'] || 'clamp(0.75rem, 0.7021rem + 0.2128vw, 0.875rem)'};
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.225rem */
  letter-spacing: -0.01263rem;
`;

export const TextInputField = styled.input<{ $error?: string | null }>`
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  font-size: ${({ theme }) =>
    theme['sm-font'] || 'clamp(0.875rem, 0.831rem + 0.1878vw, 1rem)'};
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.01438rem;
  width: 100%;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.light['gray-500']};
  border-radius: 5px;
  background-color: #fff;
  transition: 0.2s ease;
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-2']} ${theme.space['fluid-inline-space-2']}`};
  color: ${({ theme }) => theme.colors.light['gray-900']};

  &::placeholder {
    color: ${({ theme }) => theme.colors.light['gray-500']};
  }

  &:hover,
  &:focus {
    border: 1px solid #b5cff8;
    box-shadow: 0px 0px 0px 3px #dee8f8;
  }

  ${({ $error }) =>
    $error &&
    css`
      border: 1px solid #fda29b;

      &:hover,
      &:focus {
        border: 1px solid #fda29b;
        box-shadow: 0px 0px 0px 4px #fee4e2,
          0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      }
    `}
`;

export const TextInputError = styled.span`
  color: #fda29b;
  font-size: ${({ theme }) =>
    theme['xs-font'] || 'clamp(0.75rem, 0.7021rem + 0.2128vw, 0.875rem)'};
  line-height: 140%; /* 1.225rem */
  letter-spacing: -0.01263rem;
`;
