import { FC, memo, Suspense, lazy, useEffect, useState } from 'react';
import ImageMagnifier from 'Components/MagnifyImg/ImageMagnifier';
import RatingStar from './RatingStar/RatingStar';
import { ToRial } from 'utilities/toRial';
import apiUrl from 'services/apiUrl';
import Button from 'Components/Buttons/Button/Button';
import TomanSvg from 'Components/Icon/TomanSvg';
import { ProductColorModel, ProductSizeModel } from 'models/ProductKindModel';
import './DetailProductShop.css';
import { ProductModel } from 'models/ProductModels';
import Favorite from './Favorite/Favorite';
import ProductSizeList from './ProductSizeList';
import ProductColorList from './ProductColorList';

const MoreText = lazy(() => import('Components/MoreText/MoreText'));

interface DetailProductShopProps {
  product: ProductModel | null;
  rate: number;
  isFavorite: boolean;
  productColors: any[];
  submitAddCart: (productColorId: string, productSizeId: string) => Promise<any>;
}

const DetailProductShop: FC<DetailProductShopProps> = ({
  rate,
  product,
  isFavorite,
  productColors,
  submitAddCart
}) => {
  const [currentColor, setCurrentColor] = useState<ProductColorModel | null>(null);
  const [currentSize, setCurrentSize] = useState<ProductSizeModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentColor(productColors && productColors[0]);
    setCurrentSize(productColors && productColors[0]?.productSizes[0]);
  }, [productColors]);


  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const result = await submitAddCart(currentColor?._id ?? '', currentSize?._id ?? '');
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="detail-page__wrapper radius__outter">
      <div className="detail-page__right">
        <div className="detail-page__img-wrapper radius__inner">
          <Favorite product={product} isFavorite={isFavorite} className="detail-page__favorite" />

          <span className="detail-page__brand">{product?.brand.nameEng}</span>
          <ImageMagnifier
            src={(currentColor?.image && `${apiUrl}/${currentColor?.image}`) ?? ''}
            className="detail-page__img"
          
          />
        </div>
      </div>
      <div className="detail-page__left">
        <div className="detail-page__infos">
          <h1 className="detail-page__product-name">کفش {product?.name}</h1>
          <RatingStar value={rate} className="detail__star" id={product?._id!} />
          <div className="detail-page__colors-wrapper">
            <div className="detail-page__colors-title">
              <h2 className="detail-page__title">رنگ</h2>
              <span className="detail-page__color-name">{currentColor?.color?.name}</span>
            </div>

            <ProductColorList
              productColors={productColors}
              currentColor={currentColor}
              setCurrentSize={(productSize) => setCurrentSize(productSize)}
              setCurrentColor={(productColor) => setCurrentColor(productColor)}
            />
          </div>
          <div className="detail-page__sizes-wrapper">
            <h2 className="detail-page__title">سایز</h2>

            <ProductSizeList
              currentColor={currentColor}
              currentSize={currentSize}
              setCurrentSize={(productSize) => setCurrentSize(productSize)}
            />
          </div>
          <div className="detail-page__desc-wrapper">
            <h2 className="detail-page__title">توضیحات</h2>
            <Suspense>
              <MoreText text={product?.desc ?? ''} />
            </Suspense>
          </div>
        </div>
        <div className="detail-page__cart">
          {currentSize?.total !== 0 ? (
            <>
              <span className="detail-page__price">
                {ToRial(currentSize ? currentSize.price.toString() : '')} <TomanSvg />
              </span>
              <Button
                className="btn-public--green width-100"
                title={isLoading ? 'در حال ثبت...' : 'افزودن به سبد'}
                onClick={handleAddToCart}
                disabled={isLoading}
              />
            </>
          ) : (
            <span className="detail-page__cart-empty">موجود نیست!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(DetailProductShop);
