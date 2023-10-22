'use client';

import React from 'react';
import {
  AuthShowcaseContainer,
  AuthShowcaseLogo,
  AuthShowcaseText,
} from './AuthPageShowcase.styled';
import Logo from '../ui/logo/Logo';
import bg from '@/assets/sign_in_showcase.jpg';
import bg2 from '@/assets/sign_in_showcase_2.jpg';

const AuthPageShowcase: React.FC = () => {
  return (
    <AuthShowcaseContainer
      style={{ background: `url(${bg2.src}) center center / cover ` }}
    >
      <div className="overlay"></div>
      <AuthShowcaseLogo>
        <Logo variant="light" />
      </AuthShowcaseLogo>

      <AuthShowcaseText>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          placeat aperiam accusantium saepe praesentium dicta, veniam ipsam nisi
          possimus sapiente temporibus omnis eos libero reiciendis velit officia
          iure nobis illo.
        </p>
      </AuthShowcaseText>
    </AuthShowcaseContainer>
  );
};

export default AuthPageShowcase;
