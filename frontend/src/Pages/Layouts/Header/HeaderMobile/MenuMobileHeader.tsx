import Avatar from 'Components/Avatar/Avatar';
import IconLazy from 'Components/Icon/IconLazy';
import Logo from 'Components/Logo/Logo';
import { AuthContext } from 'context/ContextAuth';
import { BrandModel, UsageModel } from 'models/ProductModels';
import { FC, useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getMenuStyle } from 'utilities/getMenuStyle';
import MobileSubMenu from './MobileSubMenu';

type MenuMobileProps = {
  brands: BrandModel[];
  usages: UsageModel[];
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
};

const MenuMobileHeader: FC<MenuMobileProps> = ({ brands, usages, openMenu, setOpenMenu }) => {
  const location = useLocation();
  const { userInfos, isLoggedIn } = useContext(AuthContext);

  return (
    <div className={`menu-mobile ${openMenu ? 'menu-mobile--open' : ''}`}>
      <div className="menu-mobile__top">
        <Logo showTitle />
        <IconLazy nameIcon="MdOutlineClose" onClick={() => setOpenMenu(false)} />
      </div>

      <ul className="menu-mobile__body">
        <NavLink
          className="menu-mobile__item"
          style={getMenuStyle(location.pathname === '/')}
          to="/">
          خانه
        </NavLink>

        <NavLink
          to="product/list"
          className="menu-mobile__item"
          style={getMenuStyle(location.pathname === '/product/list')}>
          محصولات
        </NavLink>

        <MobileSubMenu
          items={brands}
          pathDropdown="/categories/brands"
          pathDropdownItem="/product/list?brand="
          titleDropdown="برند ها"
        />

        <MobileSubMenu
          items={usages}
          pathDropdown="/categories/usages"
          pathDropdownItem="/product/list?usage="
          titleDropdown="کاربرد ها"
        />
      </ul>

      <div className="menu-mobile__bottom">
        {isLoggedIn !== 'loading' && isLoggedIn === 'authenticated' ? (
          <Link to="/panel/" className="menu-mobile__info-user">
            <Avatar path={userInfos?.avatar ?? ''} size="2.2rem" />
            <span>پنل کاربری</span>
          </Link>
        ) : (
          <Link to="/login" className="menu-mobile__info-user">
            <IconLazy nameIcon="TbLogin2" color="var(--color-blue)" fontSize="2.2rem" />
            <span>ورود | ثبت نام</span>
          </Link>
        )}

        <Link to="/panel/favorites" className="menu-mobile__info-user">
          <IconLazy nameIcon="AiOutlineHeart" color="var(--color-red)" fontSize="2.2rem" />
          <span>علاقه مندی ها</span>
        </Link>
        <Link to="/cart" className="menu-mobile__info-user">
          <IconLazy nameIcon="BsCart3" color="var(--color-green)" fontSize="2.2rem" />
          <span>سبد خرید</span>
        </Link>
      </div>
    </div>
  );
};

export default MenuMobileHeader;
