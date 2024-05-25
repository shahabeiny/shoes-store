
import { FC, Suspense, lazy, useCallback, useEffect, useState } from 'react';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import { handleWarningSwal } from 'utilities/sweetalert';
import Loading from 'Components/Loadings/Loading/Loading';
import UserModel from 'models/UserModel';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import UserList from 'Components/User/UserList';
import { TabModel } from 'models/TabModel';
import { tabUserDatas } from 'datas/tabData';
import Tabs from 'Components/Panel/Tabs/Tabs';
import './UsersPanel.css';
import BoxLink from 'Components/Panel/BoxLink/BoxLink';
import {
  useBannByAdminMutation,
  useDeleteUserMutation,
  useEditPassByAdminMutation,
  useEditUserByAdminMutation,
  useGetUsersByParamQuery
} from 'Redux/store/user/userSlice';

const EditPassByAdminModal = lazy(
  () => import('Components/Modals/EditPassByAdminModal/EditPassByAdminModal')
);
const EditUserByAdminModal = lazy(
  () => import('Components/Modals/EditUserByAdminModal/EditUserByAdminModal')
);

type stateModel = {
  showModalEdit: boolean;
  showModalEditPass: boolean;
  currentUser: UserModel | null;
};

const UsersPanel: FC = () => {

  const [tab, setTab] = useState<TabModel>(tabUserDatas[0]);
  const [user, setUser] = useState<stateModel>({
    showModalEdit: false,
    showModalEditPass: false,
    currentUser: null
  });

  const {
    data: { users = [], roles = [] } = {},
    refetch,
    isLoading
  } = useGetUsersByParamQuery(`activeTab=${tab.nameEng}`);
  const [editPass] = useEditPassByAdminMutation();
  const [editBann] = useBannByAdminMutation();
  const [editUser] = useEditUserByAdminMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    refetch();
  }, [tab, refetch]);

  const handleEdition = async (formData: FormData) => {
    try {
      const result = await editUser({ kindTab: tab.nameEng, init: formData }).unwrap();
      handleModal();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleEditionPass = async (formData: string) => {
    try {
      const result = await editPass({
        password: formData,
        mobile: user.currentUser?.mobile ?? '',
        username: user.currentUser?.username ?? ''
      }).unwrap();
      handleModal();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleDeletion = (user: UserModel) => {
    handleWarningSwal(
      () => deleteUser({ _id: user._id, username: user.username, kindTab: tab.nameEng }),
      `آیا کاربر ${user.username} حذف شود؟`
    );
  };

  const handleBanned = ({ _id, username, is_banned }: UserModel) => {
    handleWarningSwal(
      () => editBann({ _id, is_banned: !is_banned, username, kindTab: tab.nameEng }),
      `آیا کاربر ${username} ${is_banned ? 'رفع مسدودی' : 'مسدود'} شود؟`,
      `${is_banned ? 'رفع مسدودی' : 'مسدود'}`
    );
  };

  const handleModal = useCallback(
    (
      showModalEdit: boolean = false,
      showModalEditPass: boolean = false,
      user: UserModel | null = null
    ) => {
      setUser({
        showModalEdit,
        showModalEditPass,
        currentUser: user
      });
    },
    []
  );

  return (
    <>
      <HelmetTitle title={`کاربران ${tab.name}`} />

      <section className="user__box-title" data-aos="fade-left">
        <BoxLink
          title="نقش ها"
          link="/panel/users/roles"
          icon="RiAdminLine"
          permission="SHOW_ROLES"
        />
      </section>

      <div className="m-top-16">
        <Tabs tabDatas={tabUserDatas} getNameTab={(tabInfo) => setTab(tabInfo)} />

        {isLoading ? (
          <CircleSpinner />
        ) : (
          <>
            <UserList
              users={users}
              iconError={tab.icon}
              titleError={`کاربر ${tab.name} یافت نشد`}
              onBann={(user) => handleBanned(user)}
              onEdit={(user) => handleModal(true, false, user)}
              onEditPass={(user) => handleModal(false, true, user)}
              onDeleteInactive={(user) => handleDeletion(user)}
            />

            {user.showModalEdit && (
              <Suspense fallback={<Loading />}>
                <EditUserByAdminModal
                  roles={roles}
                  init={user.currentUser}
                  onSubmit={handleEdition}
                  onHide={() => handleModal(false, false)}
                />
              </Suspense>
            )}

            {user.showModalEditPass && (
              <Suspense fallback={<Loading />}>
                <EditPassByAdminModal
                  onSubmit={handleEditionPass}
                  onHide={() => handleModal(false, false)}
                />
              </Suspense>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UsersPanel;
