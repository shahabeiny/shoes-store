import { FC, Suspense, lazy, useMemo, useCallback } from 'react';
import { useState } from 'react';
import { handleWarningSwal } from 'utilities/sweetalert';
import Loading from 'Components/Loadings/Loading/Loading';
import { UsageModel } from 'models/ProductModels';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import CategoryList from 'Components/Category/CategoryList';
import AddCategory from 'Components/AddCategory/AddCategory';
import {
  useAddUsageMutation,
  useDeleteUsageMutation,
  useEditUsageMutation,
  useGetUsagesQuery
} from 'Redux/store/usage/usageSlice';

const UsageModal = lazy(() => import('Components/Modals/UsageModal/UsageModal'));

const UsagesPanel: FC = () => {
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [currentUsage, setCurrentUsage] = useState<UsageModel | null>(null);
  const [addUsage] = useAddUsageMutation();
  const [editUsage] = useEditUsageMutation();
  const [deleteUsage] = useDeleteUsageMutation();
  const { data: usages = [], isLoading } = useGetUsagesQuery();

  const handleModal = useCallback((showModal: boolean, usage: UsageModel | null = null) => {
    setCurrentUsage(usage);
    setShowModal(showModal);
  }, []);

  const renderAddUsage = useMemo(
    () => (
      <AddCategory
        icon="GiMountainCave"
        permission="EDIT_PRODUCTS"
        title="افزودن کاربرد"
        className="box-value--center"
        onClick={() => setShowModal(true)}
      />
    ),
    [handleModal]
  );

  const handleForm = async (formData: UsageModel) => {
    try {
      const thunk = currentUsage ? editUsage : addUsage;
      const result = await thunk(formData).unwrap();
      handleModal(false);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleDeletion = (usage: UsageModel) => {
    handleWarningSwal(() => deleteUsage(usage), `آیا کاربرد ${usage.name} حذف شود؟`);
  };

  return (
    <>
      <HelmetTitle title="کاربرد ها" />
      {isLoading ? (
        <CircleSpinner />
      ) : (
        <>
          {renderAddUsage}

          <CategoryList
            data={usages}
            type="Usage"
            permission="EDIT_PRODUCTS"
            iconError="GiMountainCave"
            onEdit={(usage) => handleModal(true, usage)}
            onDelete={(usage) => handleDeletion(usage)}
          />

          {ShowModal && (
            <Suspense fallback={<Loading />}>
              <UsageModal
                init={currentUsage}
                onSubmit={handleForm}
                onHide={() => handleModal(false)}
              />
            </Suspense>
          )}
        </>
      )}
    </>
  );
};

export default UsagesPanel;
