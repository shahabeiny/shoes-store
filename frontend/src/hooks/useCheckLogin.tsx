import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/ContextAuth';

const useCheckLogin = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const checkLogin = useCallback(() => {
    if (isLoggedIn !== 'loading' && isLoggedIn === 'unauthenticated') {
      navigate('/login');
      return false;
    }
    return true;
  }, [isLoggedIn, navigate]);

  return { checkLogin };
};

export default useCheckLogin;
