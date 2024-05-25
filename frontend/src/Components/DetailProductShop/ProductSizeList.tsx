import React, { FC, useMemo,memo } from 'react';
import { ProductColorModel, ProductSizeModel } from 'models/ProductKindModel';
import Size from 'Components/Size/Size';

type ProductSizeListProps = {
  currentColor: ProductColorModel | null;
  currentSize: ProductSizeModel | null;
  setCurrentSize: (productSize: ProductSizeModel) => void;
};

const ProductSizeList: FC<ProductSizeListProps> = memo(({
  currentColor,
  currentSize,
  setCurrentSize
}) => {
  const memoizedCboxes = useMemo(
    () =>
      currentColor?.productSizes?.map((infoSize: ProductSizeModel) => (
        <Size
          className={infoSize._id === currentSize?._id ? 'size-box--select' : ''}
          size={infoSize.size?.sizeNumber}
          onClick={() => setCurrentSize(infoSize)}
          key={infoSize?._id}
        />
      )),
    [currentColor, currentSize]
  );
  console.log("size product")
  return <div className="detail-page__sizes">{ currentColor?.productSizes?.map((infoSize: ProductSizeModel) => (
    <Size
      className={infoSize._id === currentSize?._id ? 'size-box--select' : ''}
      size={infoSize.size?.sizeNumber}
      onClick={() => setCurrentSize(infoSize)}
      key={infoSize?._id}
    />
  ))}</div>;
},
(prevProps, nextProps) => {
  return (
    prevProps?.currentSize?._id === nextProps?.currentSize?._id &&
    prevProps?.currentColor?._id === nextProps?.currentColor?._id 

  );
})

export default ProductSizeList;
