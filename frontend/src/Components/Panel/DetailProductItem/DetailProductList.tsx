import { FC, Suspense, lazy, useMemo } from 'react';
import { ProductColorModel, ProductSizeModel } from 'models/ProductKindModel';
import DetailProductItem from './DetailProductItem';

const Error = lazy(() => import('Components/Error/Error'));

interface DetailProductListProps {
  iconError: string;
  titleError?: string;
  productColors: ProductColorModel[];
  onUpdateColor: (colorkind: ProductColorModel) => void;
  onUpdateSize: (colorkind: ProductColorModel, sizeKind: ProductSizeModel) => void;
  onAddSize: (colorkind: ProductColorModel) => void;
}

const DetailProductList: FC<DetailProductListProps> = ({
  iconError,
  titleError,
  productColors,
  onUpdateColor,
  onUpdateSize,
  onAddSize
}) => {
  const memoizedCboxes = useMemo(
    () =>
      productColors?.map((colorKind) => (
        <DetailProductItem
          key={colorKind._id}
          productColor={colorKind}
          onUpdateColor={() => onUpdateColor(colorKind)}
          onUpdateSize={(infoKind) => onUpdateSize(colorKind, infoKind)}
          onAddSize={() => onAddSize(colorKind)}
        />
      )),
    [productColors]
  );

  return (
    <>
      {productColors.length === 0 ? (
        <Suspense>
          <Error title={titleError ? titleError : 'موردی یافت نشد'} icon={iconError} />
        </Suspense>
      ) : (
        <div className="grid-box m-top-16"> {memoizedCboxes}</div>
      )}
    </>
  );
};

export default DetailProductList;
