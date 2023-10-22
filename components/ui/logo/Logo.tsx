'use client';

import { FC } from 'react';
import { StyledLogo } from './Logo.styled';
import Image from 'next/image';
// import logo from '../../../public/react.svg';
import logo from '@/public/OmniAI Favicon.png';

interface Props {
  variant?: 'dark' | 'light';
}

const Logo: FC<Props> = ({ variant }) => {
  return (
    <StyledLogo $variant={variant} href="/">
      <Image src={logo} alt="Logo" />
      <span>OmniAI</span>
    </StyledLogo>
  );
};

export default Logo;
