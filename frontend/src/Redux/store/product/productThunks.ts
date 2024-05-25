import { createAsyncThunk } from '@reduxjs/toolkit';
import apiUrl from 'services/apiUrl';
import axiosConfig from 'services/AxiosConfig';
import customHeaders from 'services/CustomeHeader';

const PRODUCT_URL_BASE = `${apiUrl}/api/product-router/product`;

export const getProducts = createAsyncThunk('products/getProducts', async (slug: string) => {
  try {
    const result = await axiosConfig({
      method: 'get',
      url: PRODUCT_URL_BASE + `${slug && slug}`,
      data: null,
      successMessage: '',
      headers: {},
      kindShowError: 'alert'
    });
    return result;
  } catch (error) {
    throw error;
  }
});

export const addProduct = createAsyncThunk('products/addProduct', async (data: FormData) => {
  try {
    const result = await axiosConfig({
      method: 'post',
      url: PRODUCT_URL_BASE,
      data,
      successMessage: 'اطلاعات محصول جدید با موفقیت ثبت شد',
      headers: customHeaders({ authorization: true })
    });
    return result;
  } catch (error) {
    throw error;
  }
});

export const editProduct = createAsyncThunk('products/editProduct', async (data: FormData) => {
  try {
    const result = await axiosConfig({
      method: 'put',
      url: PRODUCT_URL_BASE,
      data,
      successMessage: `محصول ${data.get('name')} با موفقیت ویرایش شد`,
      headers: customHeaders({ authorization: true })
    });
    return result;
  } catch (error) {
    throw error;
  }
});
