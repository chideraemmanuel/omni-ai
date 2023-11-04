'use client';

import { FC } from 'react';
import styles from './page.module.scss';
import DashboardHomeLink from '@/components/dashboard/dashboardHomeLink/DashboardHomeLink';
import { tools } from '@/constants';
import { useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';

interface Props {}

const DashboardPage: FC<Props> = () => {
  const { user } = useSelector((store: StoreTypes) => store.auth);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Welcome, {user?.name.split(' ')[0]}</h2>
        <p>Which AI tool would you like to use?</p>
      </div>

      <div className={styles.links}>
        {tools.map((tool, index) => (
          <DashboardHomeLink
            title={tool.name}
            description={tool.description}
            href={tool.href}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
