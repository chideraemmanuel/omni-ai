import { FC } from 'react';
import styles from './loading.module.scss';

interface Props {}

const DashboardLoadingPage: FC<Props> = () => {
  return (
    <div className={styles.cover}>
      <span>Loading... (dashboard loading page)</span>
    </div>
  );
};

export default DashboardLoadingPage;
