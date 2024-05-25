import { FC, memo } from 'react';
import { BrandModel, ColorModel, SizeModel, UsageModel } from 'models/ProductModels';
import { RoleModel } from 'models/RoleModel';
import IconLazy from 'Components/Icon/IconLazy';
import apiUrl from 'services/apiUrl';

type CategoryType = 'Brand' | 'Usage' | 'Color' | 'Size' | 'Role';

interface CategoryItemProps<T> {
  data: T & { categoryType: CategoryType };
}

export const CategoryItem: FC<
  CategoryItemProps<BrandModel | ColorModel | SizeModel | UsageModel | RoleModel>
> = memo(({ data }) => {

  switch (data.categoryType) {
    case 'Brand':
      return renderBrand(data as BrandModel);
    case 'Usage':
      return renderUsage(data as UsageModel);
    case 'Color':
      return renderColor(data as ColorModel);
    case 'Size':
      return renderSize(data as SizeModel);
    case 'Role':
      return renderRole(data as RoleModel);
    default:
      return null;
  }
});

const renderBrand = (brand: BrandModel) => (
  <>
    <img src={`${apiUrl}/${brand.image}`} alt={brand.name} className="circle-color m-left-12" />
    <span className="category__title">{brand.name + ' '}</span>
  </>
);

const renderUsage = (usage: UsageModel) => (
  <>
    <IconLazy nameIcon={usage.icon} className="m-left-12" />
    <span className="category__title">{usage.name + ' '}</span>
  </>
);

const renderColor = (color: ColorModel) => (
  <>
    <span className="circle-color m-left-12" style={{ backgroundColor: color.color }} />
    <span className="category__title">{color.name + ' '}</span>
  </>
);

const renderSize = (size: SizeModel) => (
  <>
    <span className="circle-color m-left-12">{size.sizeNumber}</span>
    <span className="category__title">{'سایز ' + size.sizeNumber.toString()}</span>
  </>
);

const renderRole = (role: RoleModel) => (
  <>
    <span className="circle-color m-left-12">{role.nameEng.toUpperCase().slice(0, 1)}</span>
    <span className="category__title">{role.name}</span>
  </>
);
