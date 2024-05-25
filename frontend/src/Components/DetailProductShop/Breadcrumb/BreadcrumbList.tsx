import React, { FC } from 'react';
import { ProductModel } from 'models/ProductModels';
import Breadcrumb from './Breadcrumb';

type BreadcrumbListProps = {
  slugPage: string;
  product: ProductModel|null;
};

const BreadcrumbList: FC<BreadcrumbListProps> = ({ product, slugPage }) => {
  return (
    <div className="breadcrumb__wrapper radius__outter">
      <Breadcrumb link="/" icon="BiHomeAlt" />
      <Breadcrumb link="/product/list" title="محصولات" />
      <Breadcrumb link={`/product/list?usage=${product?.usage.slug}`} title={product?.usage.name} />
      <Breadcrumb
        link={`/product/list?brand=${product?.brand.slug}`}
        title={`برند ${product?.brand.name}`}
      />
      <Breadcrumb link={`/product/detail/${slugPage}`} title={`کفش ${product?.name}`} />
    </div>
  );
};

export default BreadcrumbList;
