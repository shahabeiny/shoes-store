import { FC, memo } from 'react';
import './BoxLink.css';
import { Link } from 'react-router-dom';
import IconLazy from 'Components/Icon/IconLazy';
import { useCheckPermissionHook } from 'hooks/useCheckPermission';

interface BoxLinkProps {
  link: string;
  icon: string;
  permission?: string;
  title?: string;
}

const BoxLink: FC<BoxLinkProps> = ({ link, title, icon, permission }) => {
  const [checkPerm] = useCheckPermissionHook();

  return (
    <Link
      to={link}
      className={`box-title radius__outter ${
        permission && !checkPerm(permission) ? 'box-title--hidden' : ''
      }`}>
      <IconLazy nameIcon={icon} color="var(--color-green)" />
      {title && <span className="box-title__title">{title}</span>}
    </Link>
  );
};

export default memo(BoxLink);
