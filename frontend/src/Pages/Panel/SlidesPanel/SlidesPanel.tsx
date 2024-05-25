import { lazy, Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxhook';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import { ProductModel } from 'models/ProductModels';
import DetailModal from 'Components/Modals/ModalBase/DetailModal';
import Loading from 'Components/Loadings/Loading/Loading';
import { handleWarningSwal } from 'utilities/sweetalert';
import { addSlide, deleteSlide, getSlides } from 'Redux/store/slide/slideThunks';
import ProductList from 'Components/Product/ProductList';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';

const SearchProduct = lazy(() => import('Components/Form/FormListt/SearchProduct/SearchProduct'));
const AddCategory = lazy(() => import('Components/AddCategory/AddCategory'));

const SlidesPanel = () => {
  const dispatch = useAppDispatch();
  const { slides, SlideLoading } = useAppSelector((state) => state.slides);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getSlides());
  }, []);

  const handleDelition = (product: ProductModel) => {
    handleWarningSwal(
      () => dispatch(deleteSlide(product)),
      `آیا محصول ${product.name} از اسلایدها حذف شود؟`
    );
  };

  return (
    <div>
          <HelmetTitle title="مدیریت اسلایدر" />
      {SlideLoading ? (
        <CircleSpinner />
      ) : (
        <>
          <AddCategory
            title="افزودن اسلاید"
            permission="EDIT_PRODUCTS"
            icon="BiSlideshow"
            className="box-value--center"
            onClick={() => setShowModal(true)}
          />

          <ProductList
            products={slides}
            permission="EDIT_PRODUCTS"
            iconError="BiSlideshow"
            onDelete={(product) => handleDelition(product)}
          />

          {showModal && (
            <Suspense fallback={<Loading />}>
              <DetailModal onHide={() => setShowModal(false)}>
                <SearchProduct selectedProduct={(product) => dispatch(addSlide(product))} />
              </DetailModal>
            </Suspense>
          )}
        </>
      )}
    </div>
  );
};

export default SlidesPanel;
