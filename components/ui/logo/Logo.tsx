'use client';

import { FC } from 'react';
import { StyledLogo } from './Logo.styled';
import Image from 'next/image';
import logo from '../../../public/react.svg';

interface Props {
  variant?: 'dark' | 'light';
}

const Logo: FC<Props> = ({ variant }) => {
  return (
    <StyledLogo $variant={variant}>
      <Image src={logo} alt="Logo" />
      <span>OmniAI</span>
    </StyledLogo>
  );
};

export default Logo;
