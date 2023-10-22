import { FC } from 'react';
import Logo from '@/components/ui/logo/Logo';
import styles from './layout.module.scss';
import AuthPageShowcase from '@/components/authPageShowcase/AuthPageShowcase';

interface Props {
  children: React.ReactNode;
}

const AuthPagesLayout: FC<Props> = ({ children }) => {
  return (
    <main className={styles.container}>
      {/* <div style={{ background: 'gray' }}>
        <Logo />
      </div> */}
      <AuthPageShowcase />
      {children}
    </main>
  );
};

export default AuthPagesLayout;
