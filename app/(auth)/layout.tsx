'use client';

import { FC } from 'react';
import { AuthLayoutContainer } from './layout.styled';

interface Props {
  children: React.ReactNode;
}

const AuthPagesLayout: FC<Props> = ({ children }) => {
  return (
    <AuthLayoutContainer>
      <span style={{ background: 'gray' }}>Logo!</span>
      {children}
    </AuthLayoutContainer>
  );
};

export default AuthPagesLayout;
