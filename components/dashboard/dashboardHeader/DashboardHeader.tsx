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
import ProfileImage from '@/components/misc/profileImage/ProfileImage';

interface Props {}

const DashboardHeader: FC<Props> = () => {
  const { dashboardHeaderLinks } = useSelector(
    (store: StoreTypes) => store.navigation
  );

  const dispatch = useDispatch();

  const { mutate: logout } = useLogout();

  return (
    <DashboardHeaderContainer>
      <DashboardHeaderMobileToggle
        onClick={() => dispatch(openDashboardMobileMenu())}
      >
        <FiMenu />
      </DashboardHeaderMobileToggle>

      <DashboardHeaderLogo>
        <Logo variant="dark" />
      </DashboardHeaderLogo>
      {/* <UserButtonOverlay /> */}
      <DashboardHeaderUserButton $active={dashboardHeaderLinks}>
        <button onClick={() => dispatch(toggleDashboardHeaderLinks())}>
          {/* <Image src={image} alt="" /> */}
          <ProfileImage />
        </button>

        <div>
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
      </DashboardHeaderUserButton>
    </DashboardHeaderContainer>
  );
};

export default DashboardHeader;
