import { FC, Suspense, lazy, useCallback, useMemo } from 'react';
import { useState } from 'react';
import { SizeModel } from 'models/ProductModels';
import { handleWarningSwal } from 'utilities/sweetalert';
import Loading from 'Components/Loadings/Loading/Loading';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import CategoryList from 'Components/Category/CategoryList';
import AddCategory from 'Components/AddCategory/AddCategory';
import {
  useAddSizeMutation,
  useDeleteSizeMutation,
  useEditSizeMutation,
  useGetSizesQuery
} from 'Redux/store/size/sizeSlice';

const SizeModal = lazy(() => import('Components/Modals/SizeModal/SizeModal'));

const SizesPanel: FC = () => {
  const { data: sizes = [], isLoading } = useGetSizesQuery();
  const [currentSize, setCurrentSize] = useState<SizeModel | null>(null);
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [addSize] = useAddSizeMutation();
  const [editSize] = useEditSizeMutation();
  const [deleteSize] = useDeleteSizeMutation();

  const handleModal = useCallback((showModal: boolean, size: SizeModel | null = null) => {
    setCurrentSize(size);
    setShowModal(showModal);
  }, []);

  const handleDeletion = (size: SizeModel) => {
    handleWarningSwal(() => deleteSize(size), `آیا سایز ${size.sizeNumber} حذف شود؟`);
  };

  const handleForm = async (formData: SizeModel) => {
    try {
      const thunk = currentSize ? editSize : addSize;
      const result = await thunk(formData).unwrap();
      handleModal(false);
      return result;
    } catch (errorr: any) {
      throw errorr;
    }
  };

  const renderAddSize = useMemo(
    () => (
      <AddCategory
        icon="LiaShoePrintsSolid"
        title="افزودن سایز"
        permission="EDIT_PRODUCTS"
        className="box-value--center"
        onClick={() => setShowModal(true)}
      />
    ),
    [handleModal]
  );

  return (
    <>
      <HelmetTitle title="سایز ها" />

      {isLoading ? (
        <CircleSpinner />
      ) : (
        <>
          {renderAddSize}

          <CategoryList
            data={sizes}
            type="Size"
            permission="EDIT_PRODUCTS"
            iconError="LiaShoePrintsSolid"
            onEdit={(size) => handleModal(true, size)}
            onDelete={(size) => handleDeletion(size)}
          />

          {ShowModal && (
            <Suspense fallback={<Loading />}>
              <SizeModal
                init={currentSize}
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

export default SizesPanel;
