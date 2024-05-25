import './ProfilePanel.css';
import { AuthContext } from 'context/ContextAuth';
import { useContext, FC, Suspense, lazy, useEffect, useState } from 'react';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import ProfileUserBox from '../../../Components/Panel/ProfileProperties/ProfileUserBox';
import ProfileInfos from '../../../Components/Panel/ProfileProperties/ProfileInfos';

const Error = lazy(() => import('Components/Error/Error'));

const ProfilePanel: FC = () => {
  const { userInfos } = useContext(AuthContext);
  

  

  return (
    <>
      <div className="profile">
        <HelmetTitle title="پروفایل من" />
        {userInfos !== null ? (
          <>
            <div className="profile__cover radius__outter"></div>
            <div className="profile-info">
              <ProfileUserBox
                avatar={userInfos?.avatar ?? ''}
                roleName={userInfos?.role?.name ?? ''}
                mobile={userInfos.mobile}
              />
              <ProfileInfos user={userInfos} />
            </div>
          </>
        ) : (
          <Suspense>
            <Error title="مشکل در دریافت اطلاعات شما" icon="LiaUserAltSlashSolid" />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default ProfilePanel;
