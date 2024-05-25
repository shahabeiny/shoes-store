import React, { FC, useMemo, memo } from 'react';
import { ProductColorModel, ProductSizeModel } from 'models/ProductKindModel';
import Color from 'Components/Color/Color';

type ProductSizeListProps = {
  productColors: ProductColorModel[] | null;
  currentColor: ProductColorModel | null;
  setCurrentSize: (productSize: ProductSizeModel) => void;
  setCurrentColor: (productColor: ProductColorModel) => void;
};

const ProductColorList: FC<ProductSizeListProps> = memo(
  ({ productColors, currentColor, setCurrentSize, setCurrentColor }) => {
    const memoizedCboxes = useMemo(
      () =>
        productColors?.map((kind) => (
          <Color
            color={kind.color.color}
            className={kind._id === currentColor?._id ? 'color__select' : ''}
            onClick={() => {
              setCurrentColor(kind);
              setCurrentSize(kind?.productSizes[0]);
            }}
            key={kind._id}
          />
        )),
      [currentColor]
    );
    console.log('productColor');
    return (
      <div className="detail-page__colors">
        {productColors?.map((kind) => (
          <Color
            color={kind.color.color}
            className={kind._id === currentColor?._id ? 'color__select' : ''}
            onClick={() => {
              setCurrentColor(kind);
              setCurrentSize(kind?.productSizes[0]);
            }}
            key={kind._id}
          />
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps?.currentColor?._id === nextProps?.currentColor?._id;
  }
);

export default ProductColorList;
