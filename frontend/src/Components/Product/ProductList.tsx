import { FC, Suspense, useMemo, lazy } from 'react';
import { ProductModel } from 'models/ProductModels';
import Product from './Product';

const Error = lazy(() => import('Components/Error/Error'));

type ProductListProps = {
  products: ProductModel[];
  link?: string;
  className?: string;
  permission?: string;
  iconError?: string;
  titleError?: string;
  isShowIconKind?: boolean;
  onEdit?: (product: ProductModel) => void;
  onDelete?: (product: ProductModel) => void;
};

const ProductList: FC<ProductListProps> = ({
  products,
  link,
  className,
  permission,
  iconError,
  titleError,
  isShowIconKind = false,
  onEdit,
  onDelete
}) => {

  return (
    <>
      {products.length === 0 ? (
        <Suspense>
          <Error
            title={titleError ? titleError : 'موردی یافت نشد'}
            icon={iconError ? iconError : 'GiConverseShoe'}
          />
        </Suspense>
      ) : (
        <div className="grid-box m-top-16">{ products.map((product) => (
          <Product
            key={product._id}
            product={product}
            permission={permission}
            link={link}
            className={className}
            isShowIconKind={isShowIconKind}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}</div>
      )}
    </>
  );
};

export default ProductList;
