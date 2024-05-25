import { Outlet, useLocation } from 'react-router-dom';
import HeaderStore from '../Header/Header';
import Footer from '../Footer/Footer';
import { memo } from 'react';
import './Shop.css';


const Shop = () => {
  const { pathname } = useLocation();

  const getPathWithoutParam = () => pathname.slice(0, pathname.lastIndexOf('/'));

  const shouldRenderFooter = !(pathname === '/cart' || getPathWithoutParam() === '/product/detail');

  return (
    <div>
      <HeaderStore />
      <main className="shop__wrapper">
        <Outlet />
      </main>
      {shouldRenderFooter && <Footer />}
    </div>
  );
};

export default memo(Shop);
