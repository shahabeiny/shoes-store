import { createAsyncThunk } from '@reduxjs/toolkit';
import apiUrl from 'services/apiUrl';
import { BrandModel } from 'models/ProductModels';
import axiosConfig from 'services/AxiosConfig';
import customHeaders from 'services/CustomeHeader';

const BRAND_URL = `${apiUrl}/api/brand-router/brand`;

export const getBrands = createAsyncThunk('brands/getBrands', async (_, { getState }) => {
  try {
    const result = await axiosConfig({
      method: 'get',
      url: BRAND_URL,
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

export const addBrand = createAsyncThunk('brands/addBrand', async (data: FormData,thunkAPI) => {
  try {
    const result = await axiosConfig({
      method: 'post',
      url: BRAND_URL,
      data,
      successMessage: 'برند جدید با موفقیت ثبت شد',
      headers: customHeaders({ authorization: true })
    });
    return result;
  } catch (error) {
    throw error;
  }
});

export const editBrand = createAsyncThunk('brands/editBrand', async (data: FormData) => {
  try {
    const result = await axiosConfig({
      method: 'put',
      url: BRAND_URL,
      data,
      successMessage: `برند ${data.get('name')} با موفقیت ویرایش شد`,
      headers: customHeaders({ authorization: true })
    });
    return result;
  } catch (error) {
    throw error;
  }
});

export const deleteBrand = createAsyncThunk('brands/deleteBrand', async (data: BrandModel) => {
  try {
    const result = await axiosConfig({
      method: 'delete',
      url: `${BRAND_URL}/${data._id}`,
      data: null,
      successMessage: `برند ${data.name} با موفقیت حذف شد`,
      headers: customHeaders({ authorization: true })
    });
  
    return result;
  } catch (error) {
    throw error;
  }
});
