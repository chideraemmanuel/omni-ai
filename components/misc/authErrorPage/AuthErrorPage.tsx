'use client';

import React from 'react';
import styles from './AuthErrorPage.module.scss';
import errorIllustration from '@/assets/error.svg';
import Logo from '@/components/ui/logo/Logo';
import Image from 'next/image';
import Button from '@/components/ui/button/Button';

const AuthErrorPage: React.FC = () => {
  return (
    <div className={styles.page_container}>
      <div className={styles.logo_container}>
        <Logo variant="dark" />
      </div>

      <div className={styles.content_container}>
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
      </div>
    </div>
  );
};

export default AuthErrorPage;
