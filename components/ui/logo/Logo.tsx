import { FC } from 'react';
import { StyledLogo } from './Logo.styled';
import Image from 'next/image';
import logo from '../../../public/react.svg';

const Logo: FC = () => {
  return (
    <StyledLogo>
      <Image src={logo} alt="Logo" />
      <span>OmniAI</span>
    </StyledLogo>
  );
};

export default Logo;
