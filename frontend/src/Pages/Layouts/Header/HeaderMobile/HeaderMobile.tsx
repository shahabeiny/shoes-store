import IconLazy from 'Components/Icon/IconLazy';
import Logo from 'Components/Logo/Logo';
import { BrandModel, UsageModel } from 'models/ProductModels';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderMobile.css';
import MenuMobileHeader from './MenuMobileHeader';

type HeaderMobileProps = {
  brands: BrandModel[];
  usages: UsageModel[];
};

const HeaderMobile: FC<HeaderMobileProps> = ({ brands, usages }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <header className="header__mobile">
      <IconLazy nameIcon="FiMenu" fontSize="2.2rem" onClick={() => setOpenMenu((pre) => !pre)} />
      <Logo />
      <Link to="/cart">
        <IconLazy nameIcon="BsCart3" fontSize="2.2rem" />
      </Link>

      <MenuMobileHeader
        brands={brands}
        usages={usages}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />

      <div
        className={`cover-header ${openMenu ? 'cover-header--show' : ''}`}
        onClick={() => setOpenMenu((pre) => !pre)}></div>
    </header>
  );
};

export default HeaderMobile;
