import { UsageModel, BrandModel, ProductModel } from './ProductModels';

export type GetHeaderModel = { brands: BrandModel[]; usages: UsageModel[] };

export type GetMainInfoModel = {
  newest: ProductModel[];
  mainSlider: ProductModel[];
  sellingProducts: ProductModel[];
};
