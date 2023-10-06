import { FC } from 'react';
import {
  DashboardSideMenuContainer,
  SideMenuLinks,
  SideMenuLogo,
} from './DashboardSideMenu.styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardNavigationLinks } from '@/constants';
import Logo from '../../ui/logo/Logo';

interface Props {}

const DashboardSideMenu: FC<Props> = () => {
  const pathname = usePathname();

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
                  <Link
                    href={link.href}
                    className={pathname === link.href ? 'active' : undefined}
                  >
                    {link.label}
                  </Link>
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
