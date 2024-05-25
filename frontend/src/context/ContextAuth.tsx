import { memo, createContext, useCallback, useEffect, useState, FC } from 'react';
import UserModel from 'models/UserModel';
import axios from 'axios';
import apiUrl from 'services/apiUrl';

type IsLoggin = 'loading' | 'authenticated' | 'unauthenticated';

type AuthContextType = {
  isLoggedIn: IsLoggin;
  token: string | null;
  userInfos: UserModel | null;
  login: (userInfos: UserModel | null, token: string | null) => void;
  editMe: (userInfos: UserModel | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: 'unauthenticated',
  token: null,
  userInfos: null,
  editMe: (userInfos: UserModel | null) => {},
  login: (userInfos: UserModel | null, token: string | null) => {},
  logout: () => {}
});

const AuthContextProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userInfos, setUserInfos] = useState<UserModel | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<IsLoggin>('loading');

  const login = useCallback((userInfos: UserModel | null, token: string | null) => {
    setUserInfos(userInfos);
    setIsLoggedIn('authenticated');
    setToken(token);
    localStorage.setItem('user', JSON.stringify({ token }));
  }, []);

  const editMe = useCallback((userInfos: UserModel | null) => {
    setUserInfos(userInfos);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn('unauthenticated');
    setUserInfos(null);
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user') || '{}');
    axios
      .get(`${apiUrl}/api/user-router/user/me`, {
        headers: { Authorization: `Bearer ${localStorageData ? localStorageData.token : ''}` }
      })
      .then((allData) => {
        setIsLoggedIn('authenticated');
        setUserInfos(allData.data.data);
      })
      .catch((error) => {
        setIsLoggedIn('unauthenticated');
      });
  }, [login, logout]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
        editMe
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default memo(AuthContextProvider);
