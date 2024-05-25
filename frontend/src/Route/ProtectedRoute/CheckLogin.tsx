import React, { memo,FC, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'context/ContextAuth';

const CheckLogin : FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  let storage = localStorage.getItem('user');

  if (storage !== null && isLoggedIn !== 'loading' && isLoggedIn === 'authenticated') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default memo(CheckLogin)