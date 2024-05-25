import './DetailProductItem.css';
import { FC, memo } from 'react';
import Color from 'Components/Color/Color';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Size from 'Components/Size/Size';
import IconLazy from 'Components/Icon/IconLazy';
import { ToRial } from 'utilities/toRial';
import { ProductColorModel, ProductSizeModel } from 'models/ProductKindModel';
import apiUrl from 'services/apiUrl';
import BoxesTitleDetailProduct from './BoxesTitleDetailProduct';

interface DetailProductItemProps {
  onUpdateColor: () => void;
  onAddSize: () => void;
  onUpdateSize: (productSize: ProductSizeModel) => void;
  productColor: ProductColorModel;
}

const DetailProductItem: FC<DetailProductItemProps> = ({
  productColor,
  onUpdateColor,
  onUpdateSize,
  onAddSize
}) => {
  const [currentSize, setCurrentSize] = useState<ProductSizeModel>(productColor.productSizes[0]);

  useEffect(() => {
    setCurrentSize(productColor.productSizes[0]);
  }, [productColor]);

  return (
    <div
      data-aos="fade-in"
      className={`product-kind radius__outter ${
        productColor?.productSizes?.length > 0 ? 'product-kind--with-info' : ''
      }`}>
      {productColor?.productSizes?.length > 0 ? (
        <>
          <div className="product-kind__bottom m-top-12">
            <div className="product-kind__sizes">
              <IconLazy
                nameIcon="IoIosAdd"
                fontSize="2.5rem"
                color="var(--color-green)"
                title="افزودن سایز"
                onClick={() => onAddSize()}
                aos="zoom-in"
              />

              {productColor?.productSizes?.map((size) => (
                <Size
                  key={size?.size?._id}
                  className={`${currentSize?.size?._id === size?.size?._id && 'size-box--select'}`}
                  onClick={() => setCurrentSize(size)}
                  size={size?.size?.sizeNumber}
                />
              ))}
            </div>

            <BoxesTitleDetailProduct productSize={currentSize} />
            <h2 className="product-kind__price">
              <IconLazy
                nameIcon="AiOutlineEdit"
                className="m-left-12"
                color="var(--color-white)"
                onClick={() => onUpdateSize(currentSize)}
                title="ویرایش سایز"
              />
              {currentSize ? ToRial(currentSize.price?.toString()) : ''} تومان
            </h2>
          </div>
        </>
      ) : (
        <div className="product-kind__size">
          <IconLazy
            fontSize="2.5rem"
            nameIcon="IoIosAdd"
            title="افزودن سایز"
            color="var(--color-green)"
            onClick={onAddSize}
   
          />
        </div>
      )}
      <div className="product-kind__top" data-aos="zoom-in">
        <LazyLoadImage
          src={`${apiUrl}/${productColor?.image}`}
          alt={productColor?.color.name}
          effect="blur"
          onClick={onUpdateColor}
          title="ویرایش رنگ و عکس"
          className="product-kind__img"
        />

        <Color
          className="m-top-18"
          color={productColor.color.color}
          title={productColor.color.name}
        />
      </div>
    </div>
  );
};

export default memo(DetailProductItem);
