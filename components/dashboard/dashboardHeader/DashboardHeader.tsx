'use client';

import { FC } from 'react';
import {
  DashboardHeaderContainer,
  DashboardHeaderLogo,
  DashboardHeaderMobileToggle,
  DashboardHeaderUserButton,
  //   UserButtonOverlay,
} from './DashboardHeader.styled';
import Image from 'next/image';
import image from '@/assets/profile.jpg';
import Link from 'next/link';
import Logo from '../../ui/logo/Logo';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDashboardHeaderLinks,
  openDashboardMobileMenu,
  toggleDashboardHeaderLinks,
} from '@/redux/slices/navigationSlice';
import { logOutUser } from '@/redux/slices/auth/authService';
import { StoreTypes } from '@/redux/store';
import { useLogout } from '@/lib/hooks/useLogout';
import styles from './DashboardHeader.module.scss';

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
        className={styles.toggle}
        onClick={() => dispatch(openDashboardMobileMenu())}
      >
        <FiMenu />
      </div>

      <div className={styles.logo}>
        <Logo variant="dark" />
      </div>
      <div
        className={`${styles.user_button} ${
          dashboardHeaderLinksActive && styles.user_button_active
        }`}
      >
        <button onClick={() => dispatch(toggleDashboardHeaderLinks())}>
          <Image src={image} alt="" />
        </button>

        <div className={dashboardHeaderLinksActive ? styles.active : undefined}>
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
