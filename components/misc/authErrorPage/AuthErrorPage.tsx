'use client';

import React from 'react';
import errorIllustration from '@/assets/error.svg';
import {
  ContentContainer,
  LogoContainer,
  PageContainer,
} from './AuthErrorPage.styled';
import Logo from '@/components/ui/logo/Logo';
import Image from 'next/image';
import Button from '@/components/ui/button/Button';

const AuthErrorPage: React.FC = () => {
  return (
    <PageContainer>
      <LogoContainer>
        <Logo variant="dark" />
      </LogoContainer>

      <ContentContainer>
        <div className="image">
          <Image src={errorIllustration} alt="" />
        </div>

        <div className="text">
          <h2>Authentication Error.</h2>
          <p>
            An error occured while authenticating user. Please check your
            internet connection and try refreshing the page.
          </p>

          <Button tagType="button" onClick={() => location.reload()}>
            Refresh
          </Button>
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default AuthErrorPage;
