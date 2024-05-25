import { SizeModel,ColorModel } from "./ProductModels";

export interface ProductColorModel {
  _id:string;
  productSizes: ProductSizeModel[];
  color:ColorModel
  image: string;
};

export  interface ProductSizeModel {
  _id?:string;
  productColor?:string;
  size?: SizeModel;
  sizeId?:string;
  total:number|string
  eachCart:number|string
  frozen:number|string
  sold:number|string
  price:number|string
  createdAt?:string
}

export type EditProductSizeModel = ProductSizeModel & {
  productColorId?:string;
}




 
