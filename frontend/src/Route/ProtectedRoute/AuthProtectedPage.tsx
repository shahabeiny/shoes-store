import { useContext, FC, memo } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'context/ContextAuth';

const AuthProtectedRoute: FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  let storage = localStorage.getItem('user');

  if (storage === null && isLoggedIn !== 'loading' && isLoggedIn === 'unauthenticated') {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default memo(AuthProtectedRoute);
