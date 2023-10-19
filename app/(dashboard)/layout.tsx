import DashboardNavigation from '@/components/dashboard/dashboardNavigation/DashboardNavigation';
import { FC } from 'react';
import DashboardHeader from '@/components/dashboard/dashboardHeader/DashboardHeader';
import styles from './layout.module.scss';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    // <AuthProvider>
    <div className={styles.container}>
      <DashboardNavigation />
      <div className={styles.content}>
        <DashboardHeader />

        <section>{children}</section>
      </div>
    </div>
    // </AuthProvider>
  );
};

export default DashboardLayout;
