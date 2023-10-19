'use client';

import { FC } from 'react';
import { DashboardNavigationLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import Logo from '../../ui/logo/Logo';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import { closeDashboardMobileMenu } from '@/redux/slices/navigationSlice';
import styles from './DashboardMobileMenu.module.scss';
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
          dashboardMobileMenuActive && styles.menu_container_active
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
                      label={link.label}
                      href={link.href}
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
