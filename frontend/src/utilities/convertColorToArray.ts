import { ProductColorModel } from '../models/ProductKindModel';
import { ColorModel } from '../models/ProductModels';

export const convertColorToArray = (productColors: ProductColorModel[]): ColorModel[] => {
  return productColors && productColors.map((productColor) => productColor.color);
};
