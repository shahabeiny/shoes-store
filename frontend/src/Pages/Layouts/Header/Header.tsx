import { FC, memo, useContext } from 'react';
import './Header.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import IconLazy from 'Components/Icon/IconLazy';
import Logo from 'Components/Logo/Logo';
import HeaderMobile from './HeaderMobile/HeaderMobile';
import { AuthContext } from 'context/ContextAuth';
import Avatar from 'Components/Avatar/Avatar';
import { getMenuStyle } from 'utilities/getMenuStyle';
import { useGetHeaderQuery } from 'Redux/store/home/homeSlice';

const Header: FC = () => {
  const location = useLocation();
  const { userInfos, isLoggedIn } = useContext(AuthContext);
  const { data: { brands = [], usages = [] } = {} } = useGetHeaderQuery();

  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <nav className="nav">
            <Logo showTitle />
            <ul className="menu">
              <NavLink
                className="menu__item"
                style={getMenuStyle(location.pathname === '/')}
                to="/">
                خانه
              </NavLink>

              <NavLink
                to="/product/list"
                className="menu__item"
                style={getMenuStyle(location.pathname === '/product/list')}>
                محصولات
              </NavLink>

              <NavLink
                to="/categories/brands"
                className="menu__item-dropdown"
                style={getMenuStyle(location.pathname === '/categories/brands')}>
                <span className="menu__item-arrow">
                  برند ها
                  <IconLazy nameIcon="IoIosArrowDown" fontSize="1.6rem" />
                </span>
                {brands?.length !== 0 && (
                  <ul className="dropdown-list">
                    {brands &&
                      brands.map((brand) => (
                        <NavLink
                          to={`/product/list?brand=${brand.slug}`}
                          style={getMenuStyle(
                            location.pathname === `/product/list?brand=${brand.slug}`
                          )}
                          className="dropdown-list__item">
                          {brand.name}
                        </NavLink>
                      ))}
                  </ul>
                )}
              </NavLink>

              <NavLink
                to="/categories/usages"
                className="menu__item-dropdown"
                style={getMenuStyle(location.pathname === '/categories/usages')}>
                <span className="menu__item-arrow">
                  کاربرد ها
                  <IconLazy nameIcon="IoIosArrowDown" fontSize="1.6rem" />
                </span>
                {usages?.length !== 0 && (
                  <ul className="dropdown-list">
                    {usages &&
                      usages?.map((usage) => (
                        <NavLink
                          to={`/product/list?usage=${usage.slug}`}
                          style={getMenuStyle(
                            location.pathname === `/product/list?usage=${usage.slug}`
                          )}
                          className="dropdown-list__item">
                          {usage.name}
                        </NavLink>
                      ))}
                  </ul>
                )}
              </NavLink>
            </ul>
          </nav>

          <div className="header__user">
            <Link to="/cart" className='header__user-link'>
              <IconLazy
                nameIcon="BsCart3"
                color="var(--color-green)"
                fontSize="2.2rem"
                aos="zoom-in"
              />
            </Link>
            <Link to="/panel/favorites" className='header__user-link'>
              <IconLazy
                nameIcon="AiOutlineHeart"
                color="var(--color-red)"
                fontSize="2.2rem"
                aos="zoom-in"
              />
            </Link>

            {isLoggedIn !== 'loading' && isLoggedIn === 'authenticated' ? (
              <Link to="/panel/">
                <Avatar path={userInfos?.avatar ?? ''} size="2.8rem" />
              </Link>
            ) : (
              <Link to="/login">
                <span>ورود | ثبت نام</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <HeaderMobile brands={brands} usages={usages} />
    </>
  );
};

export default memo(Header);
