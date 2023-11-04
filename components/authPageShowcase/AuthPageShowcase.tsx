import React from 'react';
import styles from './AuthPageShowcase.module.scss';
import Logo from '../ui/logo/Logo';
import bg from '@/assets/sign_in_showcase.jpg';
import bg2 from '@/assets/sign_in_showcase_2.jpg';

const AuthPageShowcase: React.FC = () => {
  return (
    <div
      className={styles.container}
      style={{ background: `url(${bg2.src}) center center / cover ` }}
    >
      <div className="overlay"></div>
      <div className={styles.logo}>
        <Logo variant="light" />
      </div>

      <div className={styles.text}>
        <h3>AI tools for creativity and productivity.</h3>
        <p>
          OmniAI is easy to use and accessible to everyone, regardless of your
          technical expertise. Simply type in your request and OmniAI will take
          care of the rest. Bask is the perfect tool for students,
          professionals, and creatives alike.
        </p>
      </div>
    </div>
  );
};

export default AuthPageShowcase;
