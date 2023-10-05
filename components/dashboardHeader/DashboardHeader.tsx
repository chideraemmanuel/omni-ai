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
import Logo from '../ui/logo/Logo';
import { FiMenu } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { openDashboardMobileMenu } from '@/redux/slices/navigationSlice';

interface Props {}

const DashboardHeader: FC<Props> = () => {
  const dispatch = useDispatch();

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
      <DashboardHeaderUserButton>
        <button
        // onClick={() => dispatch(toggleDashboardHeaderLinks())}
        >
          <Image src={image} alt="" />
        </button>

        {false && (
          <div>
            <li
            // onClick={() => dispatch(closeDashboardHeaderLinks())}
            >
              <Link href={'/'}>View profile</Link>
            </li>
            <li
            // onClick={() => dispatch(closeDashboardHeaderLinks())}
            >
              <Link href={'/'}>Settings</Link>
            </li>
            <li
            // onClick={() => dispatch(closeDashboardHeaderLinks())}
            >
              <button>Logout</button>
            </li>
          </div>
        )}
      </DashboardHeaderUserButton>
    </DashboardHeaderContainer>
  );
};

export default DashboardHeader;
