import { FC } from 'react';
import styles from './DashboardMobileMenu.module.scss';
import { DashboardNavigationLinks } from '@/constants';
import Logo from '../../ui/logo/Logo';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import { closeDashboardMobileMenu } from '@/redux/slices/navigationSlice';
import DashboardNavigationLink from '../dashboardNavigationLink/DashboardNavigationLink';

interface Props {}

const DashboardMobileMenu: FC<Props> = () => {
  const { dashboardMobileMenuActive } = useSelector(
    (store: StoreTypes) => store.navigation
  );

  const dispatch = useDispatch();

  return (
    <>
      {dashboardMobileMenuActive && (
        <div
          className={styles.overlay}
          onClick={() => dispatch(closeDashboardMobileMenu())}
        ></div>
      )}
      <div
        className={`${styles.menu_container} ${
          dashboardMobileMenuActive && 'active'
        }`}
      >
        <div className={styles.menu_header}>
          <Logo variant="light" />

          <button onClick={() => dispatch(closeDashboardMobileMenu())}>
            <FiX />
          </button>
        </div>

        <div className={styles.menu_links}>
          {DashboardNavigationLinks.map((item, index) => (
            <div key={index}>
              <span>{item.label}</span>
              <ul>
                {item.links.map((link, index) => (
                  <li
                    key={index}
                    onClick={() => dispatch(closeDashboardMobileMenu())}
                  >
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
      </div>
    </>
  );
};

export default DashboardMobileMenu;
