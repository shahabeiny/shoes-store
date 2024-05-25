import { FC, memo } from 'react';
import './User.css';
import IconLazy from 'Components/Icon/IconLazy';
import UserModel from 'models/UserModel';
import Avatar from 'Components/Avatar/Avatar';
import { useCheckPermissionHook } from 'hooks/useCheckPermission';

type UserProps = {
  user: UserModel;
  className?: string;
  onEdit: (user: UserModel) => void;
  onEditPass: (user: UserModel) => void;
  onBann?: (user: UserModel) => void;
  onDeleteInactive?: (user: UserModel) => void;
};

const User: FC<UserProps> = memo(
  ({ user, className, onBann, onEdit, onEditPass, onDeleteInactive }) => {
    const [checkPerm] = useCheckPermissionHook();
    return (
      <div className={`user-box__wrapper ${className ? className : ''}`}>
        <div className="user-box radius__outter" key={user._id}>
          {checkPerm('EDIT_USERS') && user.role.nameEng !== 'ADMIN' && (
            <>
              <IconLazy
                nameIcon="AiOutlineEdit"
                title="ویرایش کاربر"
                className="user-box__icon-edit"
                onClick={() => onEdit(user)}
                aos="zoom-in"
              />
              <IconLazy
                nameIcon="MdPassword"
                title="تغییر رمز"
                className="user-box__icon-pass"
                onClick={() => onEditPass(user)}
                aos="zoom-in"
              />

              {user.is_active ? (
                <IconLazy
                  nameIcon={user.is_banned ? 'TbUserCheck' : 'RiUserForbidLine'}
                  title={user.is_banned ? 'رفع مسدودی' : 'مسدود کردن'}
                  className="user-box__icon-bann"
                  onClick={() => onBann?.(user)}
                  aos="zoom-in"
                />
              ) : (
                <IconLazy
                  nameIcon={'LiaUserTimesSolid'}
                  title="حذف کاربر غیر فعال"
                  className="user-box__icon-bann"
                  onClick={() => onDeleteInactive?.(user)}
                  aos="zoom-in"
                />
              )}
            </>
          )}

          <div className="user-box__top">
            <Avatar path={user.avatar ?? ''} />
          </div>
          <div className="user-box__down">
            <span className="user-box__email">({user.role.name})</span>
            <span className="user-box__name">{user.username}</span>
            <span className="user-box__email">{user.email}</span>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.user._id === nextProps.user._id &&
      prevProps.user.name === nextProps.user.name &&
      prevProps.user.family === nextProps.user.family &&
      prevProps.user.username === nextProps.user.username &&
      prevProps.user.email === nextProps.user.email &&
      prevProps.user.mobile === nextProps.user.mobile &&
      prevProps.user.address === nextProps.user.address &&
      prevProps.user.avatar === nextProps.user.avatar &&
      prevProps.user.role._id === nextProps.user.role._id &&
      prevProps.user.is_banned === nextProps.user.is_banned &&
      prevProps.user.is_active === nextProps.user.is_active
    );
  }
);

export default User;
