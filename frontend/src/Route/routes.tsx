import Shop from '../Pages/Layouts/ShopMaster/Shop';
import { LazyLoadRoutes } from './LazyLoadRoutes';
import { useRoutes } from 'react-router-dom';
import AuthProtectedPage from './ProtectedRoute/AuthProtectedPage';
import PermissionProtectedPage from './ProtectedRoute/PermissionProtectedPage';
import CheckLogin from './ProtectedRoute/CheckLogin';
import Panel from '../Pages/Layouts/PanelMaster/Panel';

export function RouterElement() {
  
  const routes = [
    {
      path: '/panel/*',
      element: (
        <AuthProtectedPage>
          <Panel />
        </AuthProtectedPage>
      ),
      children: [
        {
          path: '',
          element: LazyLoadRoutes('Panel/ProfilePanel/ProfilePanel')
        },
        {
          path: 'slides',
          element: (
            <PermissionProtectedPage permission="SHOW_PRODUCTS">
              {LazyLoadRoutes('Panel/SlidesPanel/SlidesPanel')}
            </PermissionProtectedPage>
          )
        },
        {
          path: 'products/',
          element: (
            <PermissionProtectedPage permission="SHOW_PRODUCTS">
              {LazyLoadRoutes('Panel/ProductsPanel/ProductsPanel')}
            </PermissionProtectedPage>
          )
        },
        {
          path: 'favorites',
          element: LazyLoadRoutes('Panel/FavoritesPanel/FavoritesPanel')
        },
        {
          path: 'products/kinds/:slug',
          element: (
            <PermissionProtectedPage permission="SHOW_PRODUCTS">
              {LazyLoadRoutes('Panel/ProductDetailPanel/ProductDetailPanel')}
            </PermissionProtectedPage>
          )
        },
        {
          path: 'products/colors',
          element: (
            <PermissionProtectedPage permission="SHOW_PRODUCTS">
              {LazyLoadRoutes('Panel/ColorsPanel/ColorsPanel')}
            </PermissionProtectedPage>
          )
        },
        {
          path: 'products/brands',
          element: (
            <PermissionProtectedPage permission="SHOW_PRODUCTS">
              {LazyLoadRoutes('Panel/BrandsPanel/BrandsPanel')}
            </PermissionProtectedPage>
          )
        },
        {
          path: 'products/sizes',
          element: (
            <PermissionProtectedPage permission="SHOW_PRODUCTS">
              {LazyLoadRoutes('Panel/SizesPanel/SizesPanel')}
            </PermissionProtectedPage>
          )
        },
        {
          path: 'products/usages',
          element: (
            <PermissionProtectedPage permission="SHOW_PRODUCTS">
              {LazyLoadRoutes('Panel/UsagesPanel/UsagesPanel')}
            </PermissionProtectedPage>
          )
        },
        {
          path: 'orders',
          element: (
            <PermissionProtectedPage permission="SHOW_ORDERS">
              {LazyLoadRoutes('Panel/OrderPanel/OrderPanel')}
            </PermissionProtectedPage>
          )
        },
        {
          path: 'orders/me',
          element: LazyLoadRoutes('Panel/OrderPanel/MyOrderPanel')
        },
        {
          path: 'users',
          element: (
            <PermissionProtectedPage permission="SHOW_USERS">
              {LazyLoadRoutes('Panel/UsersPanel/UsersPanel')}
            </PermissionProtectedPage>
          )
        },
        {
          path: 'users/banned',
          element: (
            <PermissionProtectedPage permission="SHOW_USERS">
              {LazyLoadRoutes('Panel/UsersPanel/UsersPanel')}
            </PermissionProtectedPage>
          )
        },
        {
          path: 'users/roles',
          element: (
            <PermissionProtectedPage permission="SHOW_ROLES">
              {LazyLoadRoutes('Panel/RolesPanel/RolesPanel')}
            </PermissionProtectedPage>
          )
        },
        {
          path: '*',
          element: LazyLoadRoutes('Error/NotFoundPage')
        }
      ]
    },
    {
      path: '/login',
      element: <CheckLogin>{LazyLoadRoutes('Auth/Login/Login')}</CheckLogin>
    },
    {
      path: '/register',
      element: <CheckLogin>{LazyLoadRoutes('Auth/Register/Register')}</CheckLogin>
    },
    {
      path: '/otp',
      element: <CheckLogin>{LazyLoadRoutes('Auth/Otp/Otp')}</CheckLogin>
    },
    {
      path: '/forget',
      element: <CheckLogin>{LazyLoadRoutes('Auth/Forget/Forget')}</CheckLogin>
    },
    {
      path: '/change-pass',
      element: <CheckLogin>{LazyLoadRoutes('Auth/ChangePass/ChangePass')}</CheckLogin>
    },
    {
      path: '/*',
      element: <Shop />,
      children: [
        { path: '', element: LazyLoadRoutes('Shop/HomePage/HomePage') },
        { path: 'cart', element: LazyLoadRoutes('Shop/CartPage/CartPage') },
        {
          path: 'product/detail/:slug',
          element: LazyLoadRoutes('Shop/DetailPage/DetailPage')
        },
        {
          path: 'product/list',
          element: LazyLoadRoutes('Shop/ListProductPage/ListProductPage')
        },
        {
          path: 'categories/:slug',
          element: LazyLoadRoutes('Shop/CategoryPage/CategoryPage')
        },
        {
          path: '*',
          element: LazyLoadRoutes('Error/NotFoundPage')
        }
      ]
    }
  ];
  return useRoutes(routes);
}
