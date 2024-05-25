import { FC, memo } from 'react';
import './Breadcrumb.css';
import { Link } from 'react-router-dom';
import IconLazy from 'Components/Icon/IconLazy';

interface BreadcrumbProps {
  link: string;
  title?: string;
  icon?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ link, icon, title }) => {
  return (
    <div className="breadcrumb">
      <Link to={link} className="breadcrumb__link">
        {icon && <IconLazy nameIcon={icon} />}
        {title && <span>{title}</span>}
      </Link>
    </div>
  );
};

export default memo(Breadcrumb);
