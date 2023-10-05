'use client';

import DashboardNavigation from '@/components/dashboardNavigation/DashboardNavigation';
import { FC } from 'react';
import {
  DashboardLayoutContent,
  DashboardLayoutContainer,
} from './layout.styled';
import DashboardHeader from '@/components/dashboardHeader/DashboardHeader';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <DashboardLayoutContainer>
      <DashboardNavigation />
      <DashboardLayoutContent>
        <DashboardHeader />

        <section>{children}</section>
      </DashboardLayoutContent>
    </DashboardLayoutContainer>
  );
};

export default DashboardLayout;
