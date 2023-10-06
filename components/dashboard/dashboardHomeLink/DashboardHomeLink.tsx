import { FC } from 'react';
import { LinkContainer } from './DashboardHomeLink.styled';
import { FiArrowDownRight, FiArrowRight } from 'react-icons/fi';

interface Props {
  href: string;
  title: string;
  description: string;
}

const DashboardHomeLink: FC<Props> = ({ href, title, description }) => {
  return (
    <LinkContainer href={href}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <FiArrowRight />
    </LinkContainer>
  );
};

export default DashboardHomeLink;
