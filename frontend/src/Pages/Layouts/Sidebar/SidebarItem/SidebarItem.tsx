import { FC, ReactNode } from "react";
import "./SidebarItem.css";
import { NavLink, useLocation } from "react-router-dom";
import IconLazy from "../../../../Components/Icon/IconLazy";

interface SidebarItemProps {
  icon?: string;
  link: string;
  title: string;
  children?: ReactNode;
  onClick?: () => void;
}

const SidebarItem: FC<SidebarItemProps> = ({
  link,
  title,
  icon,
  children,
  onClick,
}) => {

  const location = useLocation();

  const isActive = () => {
    return location.pathname === link || location.pathname === `${link}/`;
  };

  return (
    <>
      {onClick ? (
        <div className="sidebar-item__link" onClick={() =>  onClick?.()} >
          {icon && <IconLazy nameIcon={icon} className="sidebar-item__icon" />}
          <span className="sidebar-item__title">{title}</span>
        </div>
      ) : (
        <NavLink
          to={link}
          className={`sidebar-item__link ${isActive() ? "active" : ""}`}
        >
          {icon && <IconLazy nameIcon={icon} className="sidebar-item__icon"/>}
          {children}
          <span className="sidebar-item__title">{title}</span>
        </NavLink>
      )}
    </>
  );
};

export default SidebarItem;
