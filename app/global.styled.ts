import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  background-color: #fff;
  color: ${({ theme }) => theme.colors.light['primary-text-color']};

    /* @media screen and (prefers-color-scheme: dark) {
      color: ${({ theme }) => theme.colors.dark['primary-text-color']};
    } */
}

a {
  color: inherit;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}
`;
