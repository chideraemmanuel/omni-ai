import { FC } from 'react';
import {
  DashboardMobileMenuContainer,
  DashboardMobileMenuHeader,
  DashboardMobileMenuOverlay,
  MobileMenuLinks,
} from './DashboardMobileMenu.styled';
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
        <DashboardMobileMenuOverlay
          onClick={() => dispatch(closeDashboardMobileMenu())}
        />
      )}
      <DashboardMobileMenuContainer $menuActive={dashboardMobileMenuActive}>
        <DashboardMobileMenuHeader>
          <Logo variant="light" />

          <button onClick={() => dispatch(closeDashboardMobileMenu())}>
            <FiX />
          </button>
        </DashboardMobileMenuHeader>

        <MobileMenuLinks>
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
        </MobileMenuLinks>
      </DashboardMobileMenuContainer>
    </>
  );
};

export default DashboardMobileMenu;
