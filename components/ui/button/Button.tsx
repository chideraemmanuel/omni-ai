'use client';

import React from 'react';
import { StyledButton } from './Button.styled';
import { FaGoogle } from 'react-icons/fa';
import { ComponentProps } from './Button.types';

const Button: React.FC<ComponentProps> = ({
  children,
  tagType = 'a',
  href,
  size = 'md',
  variant = 'primary',
  // custom styling
  borderRadius,
  padding,
  background,
  color,
  width,
  fontSize,
  hover,
  focus,
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <>
      <StyledButton
        href={tagType === 'a' ? href : undefined}
        as={tagType}
        $variant={variant}
        $borderRadius={borderRadius}
        $padding={padding}
        $background={background}
        $color={color}
        $width={width}
        $fontSize={fontSize}
        //
        $size={size}
        $hover={hover}
        $focus={focus}
        $disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {/* <FaGoogle /> */}
        {children}
      </StyledButton>
    </>
  );
};

export default Button;
