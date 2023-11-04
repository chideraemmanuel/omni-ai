import { FC } from 'react';
import styles from './layout.module.scss';
import AuthPageShowcase from '@/components/authPageShowcase/AuthPageShowcase';

interface Props {
  children: React.ReactNode;
}

const AuthPagesLayout: FC<Props> = ({ children }) => {
  return (
    <main className={styles.container}>
      <AuthPageShowcase />
      {children}
    </main>
  );
};

export default AuthPagesLayout;
