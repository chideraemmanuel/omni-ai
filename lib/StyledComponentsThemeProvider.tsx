'use client';

import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/app/global.styled';
import theme from '@/app/theme';

interface Props {
  children: React.ReactNode;
}

const StyledComponentsThemeProvider: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default StyledComponentsThemeProvider;
