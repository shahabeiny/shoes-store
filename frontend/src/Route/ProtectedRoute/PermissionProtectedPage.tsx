import { useContext, useEffect, FC, memo, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckPermissionHook } from 'hooks/useCheckPermission';
import { showToast } from 'utilities/tostifyalert';
import { AuthContext } from 'context/ContextAuth';

const PermissionProtectedPage: FC<PropsWithChildren<{ permission: string }>> = ({
  children,
  permission
}) => {
  const navigate = useNavigate();
  const [checkPerm] = useCheckPermissionHook();
  const { userInfos, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn !== 'loading') {
      if (!checkPerm(permission)) {
        showToast('شما اجازه دسترسی به صفحه درخواستی را ندارید', 'error');
        navigate('/panel/');
      }
    }
  }, [isLoggedIn]);

  return <>{children}</>;
};

export default memo(PermissionProtectedPage);
