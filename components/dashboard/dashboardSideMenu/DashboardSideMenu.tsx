import { FC } from 'react';
import {
  DashboardSideMenuContainer,
  SideMenuLinks,
  SideMenuLogo,
} from './DashboardSideMenu.styled';
import { DashboardNavigationLinks } from '@/constants';
import Logo from '../../ui/logo/Logo';
import DashboardNavigationLink from '../dashboardNavigationLink/DashboardNavigationLink';

interface Props {}

const DashboardSideMenu: FC<Props> = () => {
  return (
    <DashboardSideMenuContainer>
      <SideMenuLogo>
        <Logo variant="light" />
      </SideMenuLogo>

      <SideMenuLinks>
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
      </SideMenuLinks>
    </DashboardSideMenuContainer>
  );
};

export default DashboardSideMenu;
