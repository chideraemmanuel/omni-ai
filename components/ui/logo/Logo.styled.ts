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
    background-image: ${({ theme, $variant }) =>
      $variant === 'dark'
        ? theme.colors.dark['text-gradient']
        : theme.colors.light['text-gradient']};
    background-clip: text;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
