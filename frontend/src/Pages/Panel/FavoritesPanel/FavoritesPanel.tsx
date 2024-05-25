import { FC } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxhook';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import { handleWarningSwal } from 'utilities/sweetalert';
import { ProductModel } from 'models/ProductModels';
import { deleteFavorite, getFavorites } from 'Redux/store/favorite/favoriteThunks';
import ProductList from 'Components/Product/ProductList';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';

const FavoritesPanel: FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(getFavorites());
  }, []);

  const handleProductDelete = (product: ProductModel) => {
    handleWarningSwal(
      () => dispatch(deleteFavorite({ product, kindPage: 'panel' })),
      `آیا محصول ${product.name} از علاقه‌مندی‌ها حذف شود؟`
    );
  };

  return (
    <>
     <HelmetTitle title="علاقه مندی ها" />
      {loading ? (
        <CircleSpinner />
      ) : (
        <section>
          <ProductList
            products={products}
            permission="EDIT_PRODUCTS"
            titleError="شما به محصولی علاقه ندارید"
            iconError="LuHeartOff"
            onDelete={(product) => handleProductDelete(product)}
          />
        </section>
      )}
    </>
  );
};

export default FavoritesPanel;
