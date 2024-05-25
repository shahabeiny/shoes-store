import { BrandModel, ColorModel, SizeModel, UsageModel } from "./ProductModels";
import { RoleModel } from "./RoleModel";

type CommonProps = {

  className?: string;
  permission:string;
  onEdit: () => void;
  onDelete: () => void;
};

type ColorCategoryType = CommonProps & {
  color: ColorModel;
  brand?: never;
  usage?: never;
  size?: never;
  role?: never;
};

type BrandCategoryType = CommonProps & {
  brand: BrandModel;
  color?: never;
  usage?: never;
  size?: never;
  role?: never;
};

type UsageCategoryType = CommonProps & {
  usage: UsageModel;
  Brand?: never;
  color?: never;
  size?: never;
  role?: never;
};

type SizeCategoryType = CommonProps & {
  size: SizeModel;
  color?: never;
  usage?: never;
  brand?: never;
  role?: never;
};

type RoleCategoryType = CommonProps & {
  role: RoleModel;
  brand?: never;
  size?: never;
  color?: never;
  usage?: never;
};

export type CategoryProps =
  | ColorCategoryType
  | BrandCategoryType
  | UsageCategoryType
  | SizeCategoryType
  | RoleCategoryType;
