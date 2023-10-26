import { FC } from 'react';
import styles from './NotFound.module.scss';
import Logo from '@/components/ui/logo/Logo';
import notFound from '@/assets/not-found.svg';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';

interface Props {}

const NotFound: FC<Props> = () => {
  return (
    <main className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.content}>
        <div className={styles.image}>
          <Image src={notFound} alt="" />
        </div>

        <div className={styles.text}>
          <h2>Page Not Found.</h2>
          <p>Sorry, we couldn't find the page you're looking for.</p>

          <Button tagType="a" href="/">
            Back to homepage
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
