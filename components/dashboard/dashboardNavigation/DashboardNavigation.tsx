import { FC } from 'react';
import { DashboardNavigationContainer } from './DashboardNavigation.styled';
import DashboardSideMenu from '../dashboardSideMenu/DashboardSideMenu';
import DashboardMobileMenu from '../dashboardMobileMenu/DashboardMobileMenu';

interface Props {}

const DashboardNavigation: FC<Props> = () => {
  return (
    <DashboardNavigationContainer>
      <DashboardSideMenu />
      <DashboardMobileMenu />
    </DashboardNavigationContainer>
  );
};

export default DashboardNavigation;
