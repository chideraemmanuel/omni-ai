import { FC } from 'react';
import DashboardHomeLink from '@/components/dashboard/dashboardHomeLink/DashboardHomeLink';
import { tools } from '@/constants';
import styles from './page.module.scss';
import { getCurrentUser } from '@/lib/getCurrentUser';

interface Props {}

const DashboardPage: FC<Props> = async () => {
  // const { user } = useSelector((store: StoreTypes) => store.auth);
  const user = await getCurrentUser();

  return (
    <div className={styles.dashboard_container}>
      <div className={styles.dashboard_header}>
        <h2>Welcome, {user?.name}</h2>
        <p>Which AI tool would you like to use?</p>
      </div>

      <div className={styles.dashboard_links}>
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
