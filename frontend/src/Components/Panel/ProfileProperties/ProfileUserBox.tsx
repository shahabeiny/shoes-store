import Avatar from 'Components/Avatar/Avatar';
import IconLazy from 'Components/Icon/IconLazy';
import Loading from 'Components/Loadings/Loading/Loading';
import {
  useEditPassByAdminMutation,
  useLazyGetLoginHistoriesQuery
} from 'Redux/store/user/userSlice';
import { FC, Suspense, lazy, useState, memo } from 'react';

const HistoryModal = lazy(() => import('Components/Modals/HistoryModal/HistoryModal'));
const EditPassByAdminModal = lazy(
  () => import('Components/Modals/EditPassByAdminModal/EditPassByAdminModal')
);

type ProfileUserBoxProps = {
  avatar: string;
  roleName: string;
  mobile: string;
};

const ProfileUserBox: FC<ProfileUserBoxProps> = ({ avatar, roleName, mobile }) => {
  const [editPass] = useEditPassByAdminMutation();
  const [showModalEditPass, setShowModalEditPass] = useState<boolean>(false);
  const [showModalHistory, setShowModalHistory] = useState<boolean>(false);
  const [trigger, { data = [], isLoading }, lastPromiseInfo] = useLazyGetLoginHistoriesQuery();

  const handleEditionPass = async (formData: string) => {
    try {
      const result = await editPass({
        mobile: mobile,
        password: formData,
        username: 'شما'
      }).unwrap();
      setShowModalEditPass(false);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="profile-info__box radius__inner">
      <Avatar path={avatar} size="5rem" className="profile-info__avatar" />
      <span className="profile-info__role" data-aos="zoom-in">{`نقش: ${roleName}`}</span>
      <span
        className="profile-info__pass"
        onClick={() => setShowModalEditPass(true)}
        data-aos="zoom-in">
        <IconLazy nameIcon="BiLockAlt" fontSize="1.4rem" color="var(--color-green)" /> تغییر رمز
      </span>
      <IconLazy
        nameIcon="AiOutlineUserSwitch"
        className="profile-info__saved"
        color="var(--color-green)"
        aos="zoom-in"
        title="تاریخچه ورود"
        onClick={() => {
          trigger();
          setShowModalHistory(true);
        }}
      />

      {showModalEditPass && (
        <Suspense fallback={<Loading />}>
          <EditPassByAdminModal
            onSubmit={handleEditionPass}
            onHide={() => setShowModalEditPass(false)}
          />
        </Suspense>
      )}

      {data && showModalHistory && (
        <Suspense fallback={<Loading />}>
          <HistoryModal histories={data} onHide={() => setShowModalHistory(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default memo(ProfileUserBox);
