import { FC } from 'react';
import Logo from '@/components/ui/logo/Logo';
import styles from './layout.module.scss';

interface Props {
  children: React.ReactNode;
}

const AuthPagesLayout: FC<Props> = ({ children }) => {
  return (
    <main className={styles.container}>
      <div style={{ background: 'gray' }}>
        <Logo />
      </div>
      {children}
    </main>
  );
};

export default AuthPagesLayout;
