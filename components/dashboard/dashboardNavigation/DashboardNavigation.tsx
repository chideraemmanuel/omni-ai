import { FC } from 'react';
import styles from './DashboardNavigation.module.scss';
import DashboardSideMenu from '../dashboardSideMenu/DashboardSideMenu';
import DashboardMobileMenu from '../dashboardMobileMenu/DashboardMobileMenu';

interface Props {}

const DashboardNavigation: FC<Props> = () => {
  return (
    // <DashboardNavigationContainer>
    <div className={styles.container}>
      <DashboardSideMenu />
      <DashboardMobileMenu />
    </div>
    // </DashboardNavigationContainer>
  );
};

export default DashboardNavigation;
