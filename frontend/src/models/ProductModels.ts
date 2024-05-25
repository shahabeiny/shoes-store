import { ProductColorModel } from "./ProductKindModel";

export  interface ProductModel {
  name: string;
  nameEng:string
  desc:string
  image: string;
  brand: BrandModel;
  usage: UsageModel;
  slug: string;
  _id:string;
  rates?:number;
  productColors?:ProductColorModel[];
};

export type SizeModel = {
  _id:string;
  sizeNumber: number;
  createdAt?: string;
}

export type editSizeModel = Omit<SizeModel,"_id">

export interface ColorModel
 {
  _id?:string
  name: string;
  nameEng:string
  color:string,
  createdAt?: string;
};

export  interface UsageModel {
  _id?:string;
  name: string;
  nameEng:string
  icon: string;
  slug?: string;
};

export  type BrandModel ={
  _id?:string;
  name: string;
  nameEng:string
  desc:string
  image: string;
  slug?: string;
};



