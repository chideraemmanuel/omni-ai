'use client';

import { FC } from 'react';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardLinks,
} from './page.styled';
import DashboardHomeLink from '@/components/dashboard/dashboardHomeLink/DashboardHomeLink';
import { tools } from '@/constants';

interface Props {}

const DashboardPage: FC<Props> = () => {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Welcome, Chidera!</h2>
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
