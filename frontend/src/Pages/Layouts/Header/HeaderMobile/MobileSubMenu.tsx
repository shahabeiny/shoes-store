import { useState,memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import IconLazy from 'Components/Icon/IconLazy';
import { getMenuStyle } from 'utilities/getMenuStyle';
import { BrandModel, UsageModel } from 'models/ProductModels';

interface Props<T> {
  titleDropdown: string;
  items: T[];
  pathDropdown: string;
  pathDropdownItem: string;
}

const MobileSubMenu = <T extends BrandModel | UsageModel>({
  titleDropdown,
  items,
  pathDropdown,
  pathDropdownItem
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="menu-mobile__sub-arrow">
        <NavLink
          to={pathDropdown}
          style={getMenuStyle(location.pathname === pathDropdown)}>
          {titleDropdown}
        </NavLink>
        <IconLazy
          nameIcon={isOpen ? 'IoIosArrowUp' : 'IoIosArrowDown'}
          fontSize="1.6rem"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      <ul className={`menu-mobile__dropdown ${!isOpen ? 'menu-mobile__dropdown--hidden' : ''}`}>
        {items &&
          items.map((item, index) => (
            <NavLink
              key={index}
              to={`${pathDropdownItem}${item.slug}`}
              className="menu-mobile__dropdown-item">
              {item.name}
            </NavLink>
          ))}
      </ul>
    </>
  );
};

export default memo(MobileSubMenu);
