import { createAsyncThunk } from '@reduxjs/toolkit';
import apiUrl from 'services/apiUrl';
import { AddCart } from 'models/OrderModel';
import axiosConfig from 'services/AxiosConfig';
import customHeaders from 'services/CustomeHeader';
import { editCart, deleteAllCart } from './orderSlice';
import { editDetail } from '../productKinds/ProductKindsSlice';

const ORDER_BASE_URL = `${apiUrl}/api/order-router/order`;
const ALL_ORDER_URL = `${ORDER_BASE_URL}/all-orders`;
const ALL_ORDER_ADMIN_URL = `${ORDER_BASE_URL}/all-orders-admin`;
const ADD_CART_URL = `${ORDER_BASE_URL}/add-cart`;
const MUINES_CART_URL = `${ORDER_BASE_URL}/muines-cart`;
const DELETE_CART_URL = `${ORDER_BASE_URL}/delete-cart`;
const FINISH_CART_URL = `${ORDER_BASE_URL}/finish-cart`;
const CONFIRM_ORDER_URL = `${ORDER_BASE_URL}/confirm-order`;
const DELETE_PRODUCT_CART_URL = `${ORDER_BASE_URL}/delete-product`;

export const getOrders = createAsyncThunk('orders/getOrders', async (queyString: string) => {
  try {
    const result = await axiosConfig({
      method: 'get',
      url: `${ALL_ORDER_URL}?${queyString}`,
      data: null,
      successMessage: '',
      headers: customHeaders({ authorization: true }),
      kindShowError: 'alert'
    });
    return result;
  } catch (error) {
    throw error;
  }
});

export const getOrdersAdmin = createAsyncThunk(
  'orders/getOrdersAdmin',
  async (queyString: string) => {
    try {
      const result = await axiosConfig({
        method: 'get',
        url: `${ALL_ORDER_ADMIN_URL}?${queyString}`,
        data: null,
        successMessage: '',
        headers: customHeaders({ authorization: true }),
        kindShowError: 'alert'
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const addCart = createAsyncThunk(
  'orders/addCart',
  async (data: { cartData: AddCart; kindPage: 'shop' | 'cart' }, { dispatch }) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: ADD_CART_URL,
        data: JSON.stringify(data.cartData),
        successMessage: 'سفارش جدید با موفقیت ثبت شد',
        headers: customHeaders({ authorization: true, contentType: true })
      });
      if (data.kindPage === 'cart') dispatch(editCart(result));
      else dispatch(editDetail(result))
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const confirmOrder = createAsyncThunk(
  'orders/confirmOrder',
  async (data: { orderId: string; operate: boolean }, { dispatch }) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: CONFIRM_ORDER_URL,
        data: JSON.stringify(data),
        successMessage: 'سفارش با موفقیت تایید شد',
        headers: customHeaders({ authorization: true, contentType: true })
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const muinesCart = createAsyncThunk(
  'orders/muinesCart',
  async (data: { productSizeId: string; productOrderId: string }) => {
    try {
      const result = await axiosConfig({
        method: 'patch',
        data: JSON.stringify(data),
        url: MUINES_CART_URL,
        successMessage: 'تعداد محصول با موفقیت کسر شد',
        headers: customHeaders({ authorization: true, contentType: true })
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProductCart = createAsyncThunk(
  'orders/deleteProductCart',
  async (productOrderId: string) => {
    try {
      const result = await axiosConfig({
        method: 'delete',
        data: null,
        url: `${DELETE_PRODUCT_CART_URL}/${productOrderId}`,
        successMessage: ' محصول با موفقیت از سبد خرید حذف شد',
        headers: customHeaders({ authorization: true })
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCart = createAsyncThunk(
  'orders/deleteCart',
  async (OrderId: string, { dispatch }) => {
    try {
      const result = await axiosConfig({
        method: 'delete',
        data: null,
        url: `${DELETE_CART_URL}/${OrderId}`,
        successMessage: 'سبد خرید با موفقیت حذف شد',
        headers: customHeaders({ authorization: true })
      });
      dispatch(deleteAllCart(result));
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const finishCart = createAsyncThunk(
  'orders/finishCart',
  async (data: FormData, { dispatch }) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: FINISH_CART_URL,
        data,
        successMessage: 'سفارش شما با موفقیت نهایی شد',
        headers: customHeaders({ authorization: true, contentType: true })
      });

      dispatch(deleteAllCart(result));
      return result;
    } catch (error) {
      throw error;
    }
  }
);
