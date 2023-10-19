'use client';

import { FC } from 'react';
import styles from './error.module.scss';

interface Props {
  error: Error;
  reset: () => void;
}

const DashboardErrorPage: FC<Props> = ({ error, reset }) => {
  return (
    <div className={styles.cover}>
      <span>An error occured (dashboard error page)</span>
      <span>{error.message}</span>
      <button onClick={() => reset()}>retry</button>
    </div>
  );
};

export default DashboardErrorPage;
