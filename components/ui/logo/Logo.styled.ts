import styled from 'styled-components';

interface LogoProps {
  $variant?: 'dark' | 'light';
}

export const StyledLogo = styled.a<LogoProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['fluid-inline-space-1']};

  img {
    width: ${({ theme }) => theme.space['fluid-inline-space-7']};
    height: ${({ theme }) => theme.space['fluid-block-space-7']};
    border-radius: 0.5rem;
  }

  span {
    font-size: ${({ theme }) => theme.font['md-font']};
    font-weight: bolder;
    color: ${({ $variant }) =>
      $variant === 'dark'
        ? '#1b1b1b'
        : $variant === 'light'
        ? '#fff'
        : '#1b1b1b'};
  }
`;
