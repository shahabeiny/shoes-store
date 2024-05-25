import { FC, lazy, Suspense, useCallback, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxhook';
import { handleWarningSwal } from 'utilities/sweetalert';
import Loading from 'Components/Loadings/Loading/Loading';
import { ColorModel } from 'models/ProductModels';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import CategoryList from 'Components/Category/CategoryList';
import AddCategory from 'Components/AddCategory/AddCategory';
import {
  useAddColorMutation,
  useEditColorMutation,
  useGetColorsQuery,
  useDeleteColorMutation
} from 'Redux/store/color/colorSlice';

const ColorModal = lazy(() => import('Components/Modals/ColorModal/ColorModal'));

const ColorsPanel: FC = () => {
  const dispatch = useAppDispatch();

  const {
    data: allColors = [], // داده ها
    isLoading
  } = useGetColorsQuery();

  const [addNewColor] = useAddColorMutation();

  const [edittColor] = useEditColorMutation();

  const [deletteColor] = useDeleteColorMutation()

  const [currentColor, setCurrentColor] = useState<ColorModel | null>(null);
  const [ShowModal, setShowModal] = useState<boolean>(false);

  const handleForm = useCallback(
    async (formData: ColorModel) => {
      try {
        const thunk = currentColor ? edittColor : addNewColor;
        const result = await thunk(formData).unwrap();

        handleModal(false);
        return result;
      } catch (error) {
        throw error;
      }
    },
    [currentColor, dispatch]
  );

  const handleDeletion = useCallback(
    (color: ColorModel) => {
      handleWarningSwal(() => deletteColor(color), `آیا رنگ ${color.name} حذف شود؟`);
    },
    [dispatch]
  );

  const handleModal = useCallback((showModal: boolean, color: ColorModel | null = null) => {
    setCurrentColor(color);
    setShowModal(showModal);
  }, []);

  const renderAddColor = useMemo(
    () => (
      <AddCategory
        icon="IoMdColorFill"
        permission="EDIT_PRODUCTS"
        title="افزودن رنگ"
        className="box-value--center"
        onClick={() => setShowModal(true)}
      />
    ),
    [handleModal]
  );

  return (
    <div>
      <HelmetTitle title="رنگ ها" />
      {isLoading ? (
        <CircleSpinner />
      ) : (
        <>
          {renderAddColor}

          <CategoryList
            data={allColors}
            type="Color"
            permission="EDIT_PRODUCTS"
            iconError="IoMdColorFill"
            onEdit={(color) => handleModal(true, color)}
            onDelete={(color) => handleDeletion(color)}
          />

          {ShowModal && (
            <Suspense fallback={<Loading />}>
              <ColorModal
                init={currentColor}
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

export default ColorsPanel;
