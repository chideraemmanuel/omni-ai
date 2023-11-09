'use client';

import { FC } from 'react';
import {
  DashboardHeaderContainer,
  DashboardHeaderLogo,
  DashboardHeaderMobileToggle,
  DashboardHeaderUserButton,
} from './DashboardHeader.styled';
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
    <DashboardHeaderContainer>
      <DashboardHeaderMobileToggle
        onClick={() => dispatch(openDashboardMobileMenu())}
      >
        <FiMenu />
      </DashboardHeaderMobileToggle>

      <DashboardHeaderLogo>
        <Logo variant="dark" />
      </DashboardHeaderLogo>
      <DashboardHeaderUserButton $active={dashboardHeaderLinksActive}>
        {dashboardHeaderLinksActive && (
          <div
            className="overlay"
            onClick={() => dispatch(closeDashboardHeaderLinks())}
          ></div>
        )}
        <button onClick={() => dispatch(toggleDashboardHeaderLinks())}>
          <ProfileImage />
        </button>

        <div className="links">
          {/* <li onClick={() => dispatch(closeDashboardHeaderLinks())}>
            <Link href={'/'}>View profile</Link>
          </li>
          <li onClick={() => dispatch(closeDashboardHeaderLinks())}>
            <Link href={'/'}>Settings</Link>
          </li> */}
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
