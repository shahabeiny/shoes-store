import { FC } from 'react';
import './Brand.css';
import Brand from './Brand';
import { BrandModel } from 'models/ProductModels';

type BrandListProps = {
  brands: BrandModel[];
  className?: string;
  limit?: number;
};

const BrandList: FC<BrandListProps> = ({ brands, className, limit}) => {
  const displayLimit = limit || brands.length;
  return (
    <div className={`grid-box ${className || ''}`}>
      {brands?.slice(0, displayLimit)?.map((brand) => <Brand key={brand._id} brand={brand} />)}
    </div>
  );
};

export default BrandList;
