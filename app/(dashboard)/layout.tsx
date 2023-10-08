'use client';

import DashboardNavigation from '@/components/dashboard/dashboardNavigation/DashboardNavigation';
import { FC } from 'react';
import {
  DashboardLayoutContent,
  DashboardLayoutContainer,
} from './layout.styled';
import DashboardHeader from '@/components/dashboard/dashboardHeader/DashboardHeader';
import AuthProvider from '@/lib/AuthProvider';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <DashboardLayoutContainer>
        <DashboardNavigation />
        <DashboardLayoutContent>
          <DashboardHeader />

          <section>{children}</section>
        </DashboardLayoutContent>
      </DashboardLayoutContainer>
    </AuthProvider>
  );
};

export default DashboardLayout;
