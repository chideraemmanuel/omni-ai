import styled, { css } from 'styled-components';
import { StyledButtonProps, StyledIconProps } from './Button.types';

export const StyledButton = styled.a<StyledButtonProps>`
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  border: ${({ border, background, theme }) =>
    border ||
    `1px solid ${background || theme.colors['primary-color'] || '#121212'}`};
  gap: ${({ theme }) => theme.space['fluid-inline-space-1']};
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  /* CUSTOM */
  border-radius: ${({ borderRadius }) => borderRadius || '0.5rem'};
  background: ${({ background, theme }) =>
    background || theme.colors['primary-color'] || '#121212'};
  color: ${({ color }) => color || '#313131'};
  width: ${({ width }) => width};
  transition: 0.2s ease;

  font-size: ${({ fontSize, theme }) =>
    fontSize === 'xs' ||
    fontSize === 'sm' ||
    fontSize === 'base' ||
    fontSize === 'md' ||
    fontSize === 'lg' ||
    fontSize === 'xl' ||
    fontSize === '2xl' ||
    fontSize === '3xl'
      ? `${theme.font[`${fontSize}-font`]}`
      : fontSize};

  &:hover {
    transform: scale(1.015);
  }

  &:focus {
    box-shadow: 0px 0px 0px 4px #dee8f8, 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    outline: none;
    transform: scale(1.015);
  }

  &:disabled {
    border: 1px solid #e0e0e0;
    background: #e0e0e0;
    color: #fff;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      border: 1px solid #e0e0e0;
      background: #e0e0e0;
      color: #fff;
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      cursor: not-allowed;

      &:hover {
        border: 1px solid #e0e0e0;
        background: #e0e0e0;
        color: #fff;
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
        transform: scale(1);
      }
    `}

  /************************************
   Type Variants 
  *************************************/
    ${({ variant, color, background, hover, focus, theme }) =>
    variant === 'google' &&
    css`
      border: 1px solid ${theme.colors.light['gray-500']};
      background: transparent;
      color: ${color || '#313131'};
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

      &:hover {
      }

      &:focus {
      }

      &:disabled {
      }
    `}
      ${({ variant, disabled }) =>
    variant === 'google' &&
    disabled &&
    css`
      cursor: not-allowed;

      &:hover {
      }
    `}

  /************************************
   Size Variants 
  *************************************/
  ${({ size, padding, theme, fontSize }) =>
    size === 'sm' &&
    css`
      padding: ${padding && padding.length > 0
        ? padding
        : `${theme.space['fluid-block-space-1']} ${theme.space['fluid-inline-space-3']}`} !important;
      // '0.5rem 0.88rem'
      font-size: ${!fontSize || fontSize?.length < 1
        ? theme.font['xs-font']
        : undefined};

      svg {
        width: ${!fontSize || fontSize?.length < 1
          ? theme.font['xs-font']
          : undefined};
        aspect-ratio: 1 / 1;
      }
    `}

  ${({ size, padding, theme, fontSize }) =>
    size === 'md' &&
    css`
      padding: ${padding && padding.length > 0
        ? padding
        : `${theme.space['fluid-block-space-2']} ${theme.space['fluid-inline-space-3']}`} !important;
      font-size: ${!fontSize || fontSize?.length < 1
        ? theme.font['xs-font']
        : undefined};

      svg {
        width: ${!fontSize || fontSize?.length < 1
          ? theme.font['xs-font']
          : undefined};
        aspect-ratio: 1 / 1;
      }
    `}

  ${({ size, padding, theme, fontSize }) =>
    size === 'lg' &&
    css`
      padding: ${padding && padding.length > 0
        ? padding
        : `${theme.space['fluid-block-space-2']} ${theme.space['fluid-inline-space-4']}`} !important;
      /* : '0.62rem 1.12rem'} !important; */
      font-size: ${!fontSize || fontSize?.length < 1
        ? theme.font['sm-font']
        : undefined};

      svg {
        width: ${!fontSize || fontSize?.length < 1
          ? theme.font['sm-font']
          : undefined};
        aspect-ratio: 1 / 1;
      }
    `}

  ${({ size, padding, theme, fontSize }) =>
    size === 'xl' &&
    css`
      padding: ${padding && padding.length > 0
        ? padding
        : `${theme.space['fluid-block-space-3']} ${theme.space['fluid-inline-space-5']}`} !important;
      /* : '0.75rem 1.25rem'} !important; */
      font-size: ${({ theme }) => theme.font['sm-font']} !important;

      svg {
        font-size: ${!fontSize || fontSize?.length < 1
          ? theme.font['sm-font']
          : undefined};
        aspect-ratio: 1 / 1;
      }
    `}

  ${({ size, padding, theme, fontSize }) =>
    size === '2xl' &&
    css`
      padding: ${padding && padding.length > 0
        ? padding
        : `${theme.space['fluid-block-space-3']} ${theme.space['fluid-inline-space-6']}`} !important;
      /* : '1rem 1.75rem'} !important; */
      font-size: ${({ theme }) => theme.font['base-font']} !important;

      svg {
        width: ${theme.font['base-font']};
        font-size: ${!fontSize || fontSize?.length < 1
          ? theme.font['base-font']
          : undefined};
        aspect-ratio: 1 / 1;
      }
    `}
`;
