'use client';

import { FC } from 'react';
import styles from './DashboardHeader.module.scss';
import Link from 'next/link';
import Logo from '../../ui/logo/Logo';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDashboardHeaderLinks,
  openDashboardMobileMenu,
  toggleDashboardHeaderLinks,
} from '@/redux/slices/navigationSlice';
import { StoreTypes } from '@/redux/store';
import { useLogout } from '@/lib/hooks/useLogout';
import ProfileImage from '@/components/misc/profileImage/ProfileImage';

interface Props {}

const DashboardHeader: FC<Props> = () => {
  const { dashboardHeaderLinksActive } = useSelector(
    (store: StoreTypes) => store.navigation
  );

  const dispatch = useDispatch();

  const { mutate: logout } = useLogout();

  return (
    <div className={styles.container}>
      <div
        className={styles.mobile_menu_toggle}
        onClick={() => dispatch(openDashboardMobileMenu())}
      >
        <FiMenu />
      </div>

      <div className={styles.logo}>
        <Logo variant="dark" />
      </div>

      <div
        className={`${styles.user_button} ${
          dashboardHeaderLinksActive && `active`
        }`}
      >
        {dashboardHeaderLinksActive && (
          <div
            className="overlay"
            onClick={() => dispatch(closeDashboardHeaderLinks())}
          ></div>
        )}
        <button onClick={() => dispatch(toggleDashboardHeaderLinks())}>
          {/* <Image src={image} alt="" /> */}
          <ProfileImage />
        </button>

        <div className={`links ${dashboardHeaderLinksActive && 'active'}`}>
          <li onClick={() => dispatch(closeDashboardHeaderLinks())}>
            <Link href={'/'}>View profile</Link>
          </li>
          <li onClick={() => dispatch(closeDashboardHeaderLinks())}>
            <Link href={'/'}>Settings</Link>
          </li>
          <li onClick={() => dispatch(closeDashboardHeaderLinks())}>
            {/* @ts-ignore */}
            <button onClick={() => logout()}>Logout</button>
          </li>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
