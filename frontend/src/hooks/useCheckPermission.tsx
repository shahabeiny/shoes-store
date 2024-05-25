import { useCallback, useContext } from 'react';
import { AuthContext } from 'context/ContextAuth';

export const useCheckPermissionHook = () => {
  const { isLoggedIn, userInfos } = useContext(AuthContext);

  const checkPerm = useCallback(
    (permission: string) => {
      if (isLoggedIn !== 'loading') {
        return userInfos && userInfos?.role.permissions?.some((per) => per.nameEng === permission);
      }
      return false;
    },
    [isLoggedIn]
  );

  return [checkPerm];
};
