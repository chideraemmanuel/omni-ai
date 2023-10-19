'use client';

import { FC } from 'react';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardLinks,
} from './page.styled';
import DashboardHomeLink from '@/components/dashboard/dashboardHomeLink/DashboardHomeLink';
import { tools } from '@/constants';
import { useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';

interface Props {}

const DashboardPage: FC<Props> = () => {
  const { user } = useSelector((store: StoreTypes) => store.auth);

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Welcome, {user?.name}</h2>
        <p>Which AI tool would you like to use?</p>
      </DashboardHeader>

      <DashboardLinks>
        {tools.map((tool, index) => (
          <DashboardHomeLink
            title={tool.name}
            description={tool.description}
            href={tool.href}
            key={index}
          />
        ))}
      </DashboardLinks>
    </DashboardContainer>
  );
};

export default DashboardPage;
