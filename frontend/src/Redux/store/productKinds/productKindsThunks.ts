import { createAsyncThunk } from '@reduxjs/toolkit';
import apiUrl from 'services/apiUrl';
import { EditProductSizeModel } from 'models/ProductKindModel';
import axiosConfig from 'services/AxiosConfig';
import customHeaders from 'services/CustomeHeader';
import { editDetail } from './ProductKindsSlice';

const KIND_URL_BASE = `${apiUrl}/api/productkind-router/productkind`;
const GET_LIST_KINDS_PANEL = `${KIND_URL_BASE}/all`;
const GET_LIST_KINDS_SHOP = `${KIND_URL_BASE}/all/shop`;
const COLOR_KINDS = `${KIND_URL_BASE}/color`;
const SIZE_KINDS = `${KIND_URL_BASE}/size`;

export const getKinds = createAsyncThunk('ProductKinds/getKinds', async (slug: string) => {
  try {
    const result = await axiosConfig({
      method: 'get',
      url: `${GET_LIST_KINDS_PANEL}/${slug}`,
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

export const getShopKinds = createAsyncThunk('ProductKinds/getShopKinds', async (slug: string) => {
  try {
    const result = await axiosConfig({
      method: 'get',
      url: `${GET_LIST_KINDS_SHOP}/${slug}`,
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

export const addColorKind = createAsyncThunk(
  'ProductKinds/addColorKind',
  async (data: FormData) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: COLOR_KINDS,
        data,
        successMessage: 'اطلاعات تنوع جدید با موفقیت ثبت شد',
        headers: customHeaders({ authorization: true })
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const editColorKind = createAsyncThunk(
  'ProductKinds/editColorKind',
  async (kind: { data: FormData; nameColor: string }) => {
    try {
      const result = await axiosConfig({
        method: 'put',
        url: COLOR_KINDS,
        data: kind.data,
        successMessage: `تنوع رنگ ${kind.nameColor} با موفقیت ویرایش شد`,
        headers: customHeaders({ authorization: true })
      });
    
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const addSizeKind = createAsyncThunk(
  'ProductKinds/addSizeKind',
  async (kind: { data: EditProductSizeModel; nameColor: string }) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: SIZE_KINDS,
        data: JSON.stringify(kind.data),
        successMessage: `اطلاعات سایز جدید برای تنوع رنگ ${kind.nameColor} با موفقیت ثبت شد`,
        headers: customHeaders({ authorization: true, contentType: true })
      });
      console.log(result)
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const editSizeKind = createAsyncThunk(
  'ProductKinds/editSizeKind',
  async (kind: { data: EditProductSizeModel; nameColor: string; nameSize: number },{dispatch}) => {
    try {
      const result = await axiosConfig({
        method: 'put',
        url: SIZE_KINDS,
        data: JSON.stringify(kind.data),
        successMessage: `ویرایش سایز ${kind.nameSize} برای تنوع رنگ ${kind.nameColor} با موفقیت ثبت شد`,
        headers: customHeaders({ authorization: true, contentType: true })
      });
      dispatch(editDetail(result))
      return result;
    } catch (error) {
      throw error;
    }
  }
);
