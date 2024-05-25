import { useContext, FC, memo } from 'react';
import './Sidebar.css';
import SidebarItem from 'Pages/Layouts/Sidebar/SidebarItem/SidebarItem';
import { useCheckPermissionHook } from 'hooks/useCheckPermission';
import { AuthContext } from 'context/ContextAuth';
import { useNavigate } from 'react-router-dom';
import { handleWarningSwal } from 'utilities/sweetalert';


const Sidebar: FC = () => {
  const navigate = useNavigate();
  const [checkPerm] = useCheckPermissionHook();
  const authContext = useContext(AuthContext);

  const logoutUser = () => {
   
    authContext.logout();
    navigate('/login');
  };

  return (
    <aside className="nav-sidebar" >
      <nav className="menu-sidebar" >
        <SidebarItem link="/" title="فروشگاه">
          <img
            src="/images/logo.png"
            alt="logo"
            className="sidebar-item__icon sidebar-item__icon--img"
          />
        </SidebarItem>

        <SidebarItem link="/panel/" title="پروفایل" icon="ImProfile" />

        <SidebarItem link="/panel/favorites" title="علاقه مندی ها" icon="HiOutlineHeart" />

        {checkPerm('SHOW_PRODUCTS') && (
          <SidebarItem link="/panel/slides" title="اسلاید" icon="BiSlideshow" />
        )}

        {checkPerm('SHOW_PRODUCTS') && (
          <SidebarItem link="/panel/products" title="محصولات" icon="BiStore" />
        )}

        {checkPerm('SHOW_ORDERS') && (
          <SidebarItem link="/panel/orders" title="سفارشات" icon="RiFileList3Line" />
        )}

        {!checkPerm('SHOW_ORDERS') && (
          <SidebarItem link="/panel/orders/me" title="سفارشات من" icon="BsCart3" />
        )}

        {checkPerm('SHOW_USERS') && (
          <SidebarItem link="/panel/users" title="کاربران" icon="PiUsersBold" />
        )}

        <SidebarItem
          link="/panel/exit"
          title="خروج"
          icon="BiExit"
          onClick={() => handleWarningSwal(logoutUser, `آیا می خواهید خارج شوید؟`, 'خارج')}
        />
      </nav>
    </aside>
  );
};

export default memo(Sidebar);
