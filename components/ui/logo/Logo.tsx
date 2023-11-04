import { FC } from 'react';
import Image from 'next/image';
// import logo from '../../../public/react.svg';
import logo from '@/public/OmniAI Favicon.png';
import styles from './Logo.module.scss';

interface Props {
  variant?: 'dark' | 'light';
}

const Logo: FC<Props> = ({ variant = 'dark' }) => {
  return (
    <a href="/" className={`${styles.container} ${variant}`}>
      <Image src={logo} alt="Logo" />
      <span>OmniAI</span>
    </a>
  );
};

export default Logo;
