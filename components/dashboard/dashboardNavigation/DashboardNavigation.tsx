'use client';

import { FC } from 'react';
import DashboardSideMenu from '../dashboardSideMenu/DashboardSideMenu';
import DashboardMobileMenu from '../dashboardMobileMenu/DashboardMobileMenu';
import styles from './DashboardNavigation.module.scss';

interface Props {}

const DashboardNavigation: FC<Props> = () => {
  return (
    <div className={styles.container}>
      <DashboardSideMenu />
      <DashboardMobileMenu />
    </div>
  );
};

export default DashboardNavigation;
