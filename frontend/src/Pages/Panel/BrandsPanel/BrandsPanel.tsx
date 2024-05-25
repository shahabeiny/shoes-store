import { FC, Suspense, lazy, useMemo, useCallback } from 'react';
import { useState } from 'react';
import { handleWarningSwal } from 'utilities/sweetalert';
import Loading from 'Components/Loadings/Loading/Loading';
import { BrandModel } from 'models/ProductModels';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import CategoryList from 'Components/Category/CategoryList';
import AddCategory from 'Components/AddCategory/AddCategory';
import {
  useAddBrandMutation,
  useDeleteBrandMutation,
  useEditBrandMutation,
  useGetBrandsQuery
} from 'Redux/store/brand/brandSlice';

const BrandModal = lazy(() => import('Components/Modals/BrandModal/BrandModal'));

const BrandsPanel: FC = () => {
  const [ShowModal, setShowModalModal] = useState<boolean>(false);
  const [currentBrand, setCurrentBrand] = useState<BrandModel | null>(null);
  const [addBrand] = useAddBrandMutation();
  const [editBrand] = useEditBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();
  const { data: brands = [], isLoading } = useGetBrandsQuery();

  const handleModal = useCallback((showModal: boolean, brand: BrandModel | null = null) => {
    setShowModalModal(showModal);
    setCurrentBrand(brand);
  }, []);

  const renderAddBrand = useMemo(
    () => (
      <AddCategory
        icon="BiCategory"
        permission="EDIT_PRODUCTS"
        title="افزودن برند"
        className="box-value--center"
        onClick={() => setShowModalModal(true)}
      />
    ),
    [handleModal]
  );

  const handleForm = async (formData: FormData) => {
    try {
      const thunk = currentBrand ? editBrand : addBrand;
      const result = await thunk(formData).unwrap();
      handleModal(false);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleDeletion = (brand: BrandModel) => {
    handleWarningSwal(() => deleteBrand(brand), `آیا برند ${brand.name} حذف شود؟`);
  };

  return (
    <>
      <HelmetTitle title="برند ها" />
      {isLoading ? (
        <CircleSpinner />
      ) : (
        <>
          {renderAddBrand}

          <CategoryList
            data={brands}
            type="Brand"
            permission="EDIT_PRODUCTS"
            iconError="BiCategory"
            onEdit={(brand) => handleModal(true, brand)}
            onDelete={(brand) => handleDeletion(brand)}
          />

          {ShowModal && (
            <Suspense fallback={<Loading />}>
              <BrandModal
                init={currentBrand}
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

export default BrandsPanel;
