import { FC, memo } from 'react';
import Avatar from 'Components/Avatar/Avatar';
import UserModel from 'models/UserModel';
import './UserPopUp.css';
import BoxTitle from '../BoxTitle/BoxTitle';

type UserPopUpProps = {
  user: UserModel;
};

const UserPopUp: FC<UserPopUpProps> = ({ user }) => {
  return (
    <div className="user-popup radius__inner">
      <div className="user-popup__wrapper">
        <Avatar path={user.avatar ?? ''} size="4rem" />
        <div className="user-popup__infos">
          <BoxTitle icon="FaRegUser" value={user.username} title="یوزرنیم:" />

          <BoxTitle icon="AiOutlinePhone" value={user.mobile} title="موبایل:" />

          <BoxTitle icon="MdAlternateEmail" value={user.email} title="ایمیل:" />

          <BoxTitle icon="HiOutlineLocationMarker" value={user?.address} title="آدرس:" />
        </div>
      </div>
    </div>
  );
};

export default memo(UserPopUp);
