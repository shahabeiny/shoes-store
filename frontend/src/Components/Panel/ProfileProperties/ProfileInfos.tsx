import IconLazy from 'Components/Icon/IconLazy';
import Loading from 'Components/Loadings/Loading/Loading';
import BoxTitle from 'Components/Panel/BoxTitle/BoxTitle';
import { useEditProfuleByUserMutation } from 'Redux/store/user/userSlice';
import { AuthContext } from 'context/ContextAuth';
import UserModel from 'models/UserModel';
import { FC, Suspense, lazy, memo, useContext, useState } from 'react';
import { formatDate } from 'utilities/formatDate';
import getFullName from 'utilities/fullName';

const EditProfileModal = lazy(() => import('Components/Modals/EditProfileModal/EditProfileModal'));

type ProfileInfosProps = {
  user: UserModel;
};

const ProfileInfos: FC<ProfileInfosProps> = ({ user }) => {
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const { editMe } = useContext(AuthContext);
  const [editProfile] = useEditProfuleByUserMutation()
  
  const handleEdition = async (formData: FormData) => {
    try {
      const result = await editProfile(formData).unwrap();
      editMe(result)
      setShowModal(false);
      return result;
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <div className="profile-info__desc" data-aos="zoom-in">
        <div className="profile-info__desc-wrapper">
          <span className="profile-info__name">
            سلام، {user.username} عزیز
            <IconLazy
              nameIcon="AiOutlineEdit"
              className="profile-info__desc-edit"
              onClick={() => setShowModal(true)}
            />
          </span>
          <p className="profile-info__forme">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
            است، چاپگرها و متون بلکه روزنامه و
          </p>
          <BoxTitle
            icon="FaRegUser"
            value={getFullName(user.name ?? '', user.family ?? '')}
            title="نام کامل:"
          />

          <BoxTitle icon="AiOutlinePhone" value={user.mobile} title="موبایل:" />

          <BoxTitle icon="MdAlternateEmail" value={user.email} title="ایمیل:" />

          <BoxTitle icon="HiOutlineLocationMarker" value={user.address ?? '_'} title="آدرس:" />

          <BoxTitle
            icon="PiCalendarBold"
            value={formatDate(user.createdAt ?? '')}
            title="تاریخ عضویت:"
          />
        </div>
      </div>

      {ShowModal && (
        <Suspense fallback={<Loading />}>
          <EditProfileModal
            init={{
              name: user.name!,
              family: user.family!,
              username: user.username!,
              address: user.address!
            }}
            onSubmit={handleEdition}
            onHide={() => setShowModal(false)}
          />
        </Suspense>
      )}
    </>
  );
};

export default memo(ProfileInfos);
