import React, { Suspense, useCallback, useMemo } from 'react';
import { useEffect, useState, lazy, FC } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxhook';
import { useParams } from 'react-router-dom';
import Loading from 'Components/Loadings/Loading/Loading';
import AddCategory from 'Components/AddCategory/AddCategory';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import { EditProductSizeModel, ProductColorModel, ProductSizeModel } from 'models/ProductKindModel';
import DetailProductList from 'Components/Panel/DetailProductItem/DetailProductList';
import {
  getKinds,
  addColorKind,
  editColorKind,
  addSizeKind,
  editSizeKind
} from 'Redux/store/productKinds/productKindsThunks';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';

const ProductKindColorModal = lazy(
  () => import('Components/Modals/ProductKindColorModal/ProductKindColorModal')
);
const ProductKindSizeModal = lazy(
  () => import('Components/Modals/ProductKindSizeModal/ProductKindSizeModal')
);

type stateModel = {
  showModalColor: boolean;
  showModalSize: boolean;
  currentColor: ProductColorModel | null;
  currentSize: ProductSizeModel | null;
};

const ProductDetailPanel: FC = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { productColors, product, colors, sizes, loading } = useAppSelector(
    (state) => state.productKind
  );
  const [kind, setKind] = useState<stateModel>({
    showModalColor: false,
    showModalSize: false,
    currentColor: null,
    currentSize: null
  });

  useEffect(() => {
    dispatch(getKinds(slug ?? ''));
  }, []);

  const handleFormColor = async (formData: FormData) => {
    try {
      const result = kind.currentColor
        ? await dispatch(
            editColorKind({ data: formData, nameColor: kind.currentColor!.color!.name })
          )
        : await dispatch(addColorKind(formData)).unwrap();

      handleModal();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleFormSize = async (data: EditProductSizeModel) => {
    try {
      let nameColor = kind.currentColor!.color!.name;

      const result = kind.currentSize
        ? await dispatch(
            editSizeKind({ data, nameColor, nameSize: kind.currentSize!.size!.sizeNumber })
          ).unwrap()
        : await dispatch(addSizeKind({ data, nameColor })).unwrap();

      handleModal();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleModal = useCallback(
    (
      showModalColor: boolean = false,
      showModalSize: boolean = false,
      color: ProductColorModel | null = null,
      size: ProductSizeModel | null = null
    ) => {
      setKind({
        showModalColor,
        showModalSize,
        currentColor: color,
        currentSize: size
      });
    },
    []
  );

  return (
    <main>
      <HelmetTitle title={`تنوع محصول کفش ${product?.name??''}`} />
      {loading ? (
        <CircleSpinner />
      ) : (
        <section>
          <AddCategory
            icon="GiTreeBranch"
            permission="EDIT_PRODUCTS"
            title="افزودن تنوع رنگ"
            className="box-value--center"
            onClick={() => handleModal(true, false)}
          />
          <DetailProductList
            iconError="GiTreeBranch"
            titleError="برای این محصول تنوعی وجود ندارد"
            productColors={productColors}
            onUpdateColor={(colorKind) => handleModal(true, false, colorKind)}
            onUpdateSize={(colorkind, sizeKind) => handleModal(false, true, colorkind, sizeKind)}
            onAddSize={(colorKind) => handleModal(false, true, colorKind)}
          />
        </section>
      )}

      {kind.showModalColor && (
        <Suspense fallback={<Loading />}>
          <ProductKindColorModal
            colors={colors}
            init={kind.currentColor}
            productId={product?._id}
            onSubmit={handleFormColor}
            onHide={() => handleModal()}
          />
        </Suspense>
      )}

      {kind.showModalSize && (
        <Suspense fallback={<Loading />}>
          <ProductKindSizeModal
            sizes={sizes}
            init={kind.currentSize}
            productColorId={kind.currentColor?._id}
            onSubmit={handleFormSize}
            onHide={() => handleModal()}
          />
        </Suspense>
      )}
    </main>
  );
};

export default ProductDetailPanel;
