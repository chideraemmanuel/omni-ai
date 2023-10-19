import { FC } from 'react';
import { DashboardNavigationLinks } from '@/constants';
import Logo from '../../ui/logo/Logo';
import styles from './DashboardSideMenu.module.scss';
import DashboardNavigationLink from '../dashboardNavigationLink/DashboardNavigationLink';

interface Props {}

const DashboardSideMenu: FC<Props> = () => {
  return (
    <aside className={styles.container}>
      <div className={styles.logo}>
        <Logo variant="light" />
      </div>

      <div className={styles.links}>
        {DashboardNavigationLinks.map((item, index) => (
          <div key={index}>
            <span>{item.label}</span>
            <ul>
              {item.links.map((link, index) => (
                <li key={index}>
                  <DashboardNavigationLink
                    href={link.href}
                    label={link.label}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default DashboardSideMenu;
