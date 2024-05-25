import { FC, memo } from 'react';
import { ProductModel } from 'models/ProductModels';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import apiUrl from 'services/apiUrl';
import { convertColorToArray } from 'utilities/convertColorToArray';
import IconLazy from 'Components/Icon/IconLazy';
import Color from 'Components/Color/Color';
import { useCheckPermissionHook } from 'hooks/useCheckPermission';
import './Product.css';
import React from 'react';

type ProductProps = {
  product: ProductModel;
  link?: string;
  permission?: string;
  className?: string;
  isShowIconKind?: boolean;
  onEdit?: (product: ProductModel) => void;
  onDelete?: (product: ProductModel) => void;
};

const Product: FC<ProductProps> = memo(
  ({ product, link = '#', permission, className, isShowIconKind = false, onEdit, onDelete }) => {
    const [checkPerm] = useCheckPermissionHook();
    console.log("product")
    return (
      <article className={`product-box radius__outter ${className || ''}`} key={product._id}>
        <span className="product-box__brand">{product.brand.nameEng}</span>
        <Link
          to={link ? `${link}/${product.slug}` : '#'}
          onClick={(event) => !link && event.preventDefault()}
          className="product-box__wrapper">
          <div className="product-box__top">
            <LazyLoadImage
              src={`${apiUrl}/${product.image}`}
              alt={product.name}
              effect="blur"
              className="product-box__img"
              data-aos="zoom-in"
            />
          </div>
          <div className="product-box__down">
            <span className="product-box__name">کفش {product.name}</span>
            <div className="product-box__infos">
              <div
                className="product-box__colors"
                title={`در ${product.productColors!.length} تنوع رنگی `}>
                {product?.productColors!.length > 0 ? (
                  <>
                    {convertColorToArray(product.productColors!)
                      ?.slice(0, 3)
                      ?.map((color) => <Color color={color.color} className="box-color" />)}
                    {product.productColors!.length > 3 && <IconLazy nameIcon="GoPlus" />}
                  </>
                ) : (
                  <span className="product-box__color-empty">تنوع رنگ ندارد</span>
                )}
              </div>
              <div className="product-box__star">
                <span className="product-box__star-num">{product.rates}</span>
                <IconLazy color="var(--color-yellow)" nameIcon="AiFillStar" />
              </div>
            </div>
          </div>
        </Link>

        {isShowIconKind && (
          <Link to={`${link}/${product.slug}`} className="product-box__icon" data-aos="zoom-in">
            <IconLazy nameIcon="GiTreeBranch" color="var(--color-green)" title="تنوع محصول" />
          </Link>
        )}
        {permission && checkPerm(permission) && (
          <>
            {onEdit && (
              <IconLazy
                nameIcon="AiOutlineEdit"
                className="product-box__icon product-box__icon--edit"
                color="var(--color-blue)"
                title="ویرایش دمو محصول"
                onClick={() => onEdit(product)}
                aos="zoom-in"
              />
            )}
            {onDelete && (
              <IconLazy
                nameIcon="GrClose"
                className="product-box__icon"
                color="var(--color-pink)"
                title="حذف محصول"
                onClick={() => onDelete(product)}
                aos="zoom-in"
              />
            )}
          </>
        )}
      </article>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.product._id === nextProps.product._id &&
      prevProps.product.name === nextProps.product.name &&
      prevProps.product.nameEng === nextProps.product.nameEng &&
      prevProps.product.desc === nextProps.product.desc &&
      prevProps.product.image === nextProps.product.image &&
      prevProps.product.brand._id === nextProps.product.brand._id &&
      prevProps.product.usage._id === nextProps.product.usage._id
    );
  }
);

export default Product;
