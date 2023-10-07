import styled from 'styled-components';

interface LogoProps {
  $variant?: 'dark' | 'light';
}

export const StyledLogo = styled.div<LogoProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['fluid-inline-space-2']};

  img {
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
