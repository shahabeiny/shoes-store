import { FC, Suspense, lazy, useEffect } from 'react';
import './DetailPage.css';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxhook';
import { useParams } from 'react-router-dom';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import { getShopKinds } from 'Redux/store/productKinds/productKindsThunks';
import { addCart } from 'Redux/store/order/orderThunks';
import DetailProductShop from 'Components/DetailProductShop/DetailProductShop';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import BreadcrumbList from 'Components/DetailProductShop/Breadcrumb/BreadcrumbList';

const Error = lazy(() => import('Components/Error/Error'));

const Detail: FC = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { product, isFavorite, rate, productColors, loading } = useAppSelector(
    (state) => state.productKind
  );

  useEffect(() => {
    dispatch(getShopKinds(slug ?? ''));
  }, []);

  const submitAddCart = async (productColorId: string, productSizeId: string) => {
    try {
      const result = await dispatch(
        addCart({
          cartData: {
            productId: product?._id ?? '',
            productColorId,
            productSizeId
          },
          kindPage: 'shop'
        })
      );
      return result;
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <div className="detail-page">
      <HelmetTitle title={`جزییات کفش ${product?.name??''}`} />

      {loading ? (
        <CircleSpinner />
      ) : (
        <div className="container">
          {product ? (
            <>
              <BreadcrumbList slugPage={slug ?? ''} product={product} />
              <DetailProductShop
                product={product}
                rate={rate}
                isFavorite={isFavorite}
                productColors={productColors}
                submitAddCart={submitAddCart}
              />
            </>
          ) : (
            <Suspense>
              <Error title="مشکل در دریافت اطلاعات" icon="GiTreeBranch" />
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
};

export default Detail;
