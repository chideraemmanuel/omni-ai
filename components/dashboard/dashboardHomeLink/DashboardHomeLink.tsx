'use client';

import { FC } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { LinkContainer } from './DashboardHomeLink.styled';

interface Props {
  href: string;
  title: string;
  description: string;
}

const DashboardHomeLink: FC<Props> = ({ href, title, description }) => {
  return (
    <LinkContainer>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <FiArrowRight />
    </LinkContainer>
  );
};

export default DashboardHomeLink;
