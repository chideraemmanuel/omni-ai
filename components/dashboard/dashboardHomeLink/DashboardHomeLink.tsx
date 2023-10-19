import { FC } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import styles from './DashboardHomeLink.module.scss';

interface Props {
  href: string;
  title: string;
  description: string;
}

const DashboardHomeLink: FC<Props> = ({ href, title, description }) => {
  return (
    <a href={href} className={styles.link_container}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <FiArrowRight />
    </a>
  );
};

export default DashboardHomeLink;
