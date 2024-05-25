import { ProductColorModel, ProductSizeModel } from './ProductKindModel';
import { ProductModel } from './ProductModels';
import UserModel from './UserModel';

export interface OrderModel {
  orderInfo:OrderInfoModel,
  products: OrderProductsModel[];
}

export interface OrderInfoModel {
  _id:string,
  orderID:string;
  time_cancel: string;
  finishCart: boolean;
  status_delivery: 'not_delivered'|'delivered'|'not_confirmed'|'canceled';
  createdAt: string;
  user?: UserModel; // for get all orders admin is force.
}

export interface OrderProductsModel {
  _id:string,
  product: ProductModel;
  productColor: ProductColorModel;
  productSize: ProductSizeModel;
  finalPrice?: number | string;
  count: number | string;
}

export interface AddCart {
  productId: string;
  productColorId: string;
  productSizeId: string;
  finalPrice?: number | string;
}

export type  FinishOrderModel = {
  name: string,
  family: string,
  address:string;
  orderId:string
}

