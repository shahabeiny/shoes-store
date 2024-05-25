import { createAsyncThunk } from '@reduxjs/toolkit';
import apiUrl from 'services/apiUrl';
import axiosConfig from 'services/AxiosConfig';
import customHeaders from 'services/CustomeHeader';
import { editFavoriteToDetail, editRateToDetail } from '../productKinds/ProductKindsSlice';
import { editListFavorite } from './favoriteSlice';
import { ProductModel } from 'models/ProductModels';

const RATE_URL = `${apiUrl}/api/favorite-router/rate/add`;
const FAVORITE_URL = `${apiUrl}/api/favorite-router/favorite`;

export const getFavorites = createAsyncThunk('favorites/getFavorites', async (_, { getState }) => {
  try {
    const result = await axiosConfig({
      method: 'get',
      url: FAVORITE_URL,
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
export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async (data: ProductModel, { dispatch }) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: FAVORITE_URL,
        data: JSON.stringify({ productId: data._id }),
        successMessage: `محصول ${data.name} با موفقیت به لیست علاقه مندی ها اضافه شد`,
        headers: customHeaders({ authorization: true, contentType: true })
      });
      dispatch(editFavoriteToDetail({ isFavorite: true }));
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  'favorites/deleteFavorite',
  async (
    data: { product: ProductModel;  kindPage: 'shop' | 'panel' },
    { dispatch }
  ) => {
    try {
      const result = await axiosConfig({
        method: 'delete',
        url: `${FAVORITE_URL}/delete/${data.product._id}`,
        data: null,
        successMessage: `محصول ${data.product.name} با موفقیت از لیست علاقه مندی ها حذف شد`,
        headers: customHeaders({ authorization: true })
      });
      if (data.kindPage === 'shop') dispatch(editFavoriteToDetail({ isFavorite: false }));
      else dispatch(editListFavorite({ idProduct: result._id }));
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const addRate = createAsyncThunk(
  'favorites/addRate',
  async (data: { productId: string; rate: number }, { dispatch }) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: RATE_URL,
        data: JSON.stringify({ productId: data.productId, rate: data.rate }),
        successMessage: 'امتیاز شما با موفقیت ثبت شد',
        headers: customHeaders({ authorization: true, contentType: true })
      });
      dispatch(editRateToDetail({ rate: result }));
      return result;
    } catch (error) {
      throw error;
    }
  }
);
