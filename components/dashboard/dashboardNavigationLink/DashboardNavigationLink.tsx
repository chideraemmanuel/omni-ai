'use client';

import Link from 'next/link';
import { FC } from 'react';
import styles from './DashboardNavigationLink.module.scss';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  label: string;
}

const DashboardNavigationLink: FC<Props> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`${styles.link} ${pathname === href && styles.active}`}
    >
      {label}
    </Link>
  );
};

export default DashboardNavigationLink;
