import { FC, Suspense, lazy, useCallback } from 'react';
import { useState } from 'react';
import { RoleModel, addRoleModel } from 'models/RoleModel';
import { handleWarningSwal } from 'utilities/sweetalert';
import Loading from 'Components/Loadings/Loading/Loading';
import CategoryList from 'Components/Category/CategoryList';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import AddCategory from 'Components/AddCategory/AddCategory';
import {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useEditRoleMutation,
  useGetRolesQuery
} from 'Redux/store/role/roleSlice';

const RoleModal = lazy(() => import('Components/Modals/RoleModal/RoleModal'));

const Roles: FC = () => {
  const { data: { roles = [], permissions = [] } = {}, isLoading } = useGetRolesQuery();
  const [addRole] = useAddRoleMutation();
  const [editRole] = useEditRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();

  const [currentRole, setCurrentRole] = useState<RoleModel | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleForm = 
    async (formData: addRoleModel) => {
      try {
        const thunk = currentRole ? editRole : addRole;
        const result = await thunk(formData).unwrap();
        handleModal(false);
        return result;
      } catch (error) {
        throw error;
      }
    }

  const handleModal = useCallback((showModal: boolean, role: RoleModel | null = null) => {
    setCurrentRole(role);
    setShowModal(showModal);
  }, []);

  const handleDeletion = (role: RoleModel) => {
    handleWarningSwal(() => deleteRole(role), `آیا نقش ${role.name} حذف شود؟`);
  };

  return (
    <div>
      <HelmetTitle title="نقش ها" />
      {isLoading ? (
        <CircleSpinner />
      ) : (
        <>
          <AddCategory
            icon="RiAdminLine"
            permission="EDIT_ROLES"
            title="افزودن نقش"
            className="box-value--center"
            onClick={() => setShowModal(true)}
          />
          <CategoryList
            data={roles}
            type="Role"
            permission="EDIT_ROLES"
            iconError="RiAdminLine"
            onEdit={(role) => handleModal(true, role)}
            onDelete={(role) => handleDeletion(role)}
          />

          {showModal && (
            <Suspense fallback={<Loading />}>
              <RoleModal
                init={currentRole}
                permissions={permissions}
                onSubmit={handleForm}
                onHide={() => handleModal(false)}
              />
            </Suspense>
          )}
        </>
      )}
    </div>
  );
};

export default Roles;
