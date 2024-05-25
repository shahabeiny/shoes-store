import { createAsyncThunk } from '@reduxjs/toolkit';
import apiUrl from 'services/apiUrl';
import axiosConfig from 'services/AxiosConfig';
import { ProductModel } from 'models/ProductModels';
import customHeaders from 'services/CustomeHeader';
import { editResultsSearchSlide } from '../product/productSlice';

const SLIDE_URL = `${apiUrl}/api/slide-router/slide`;

export const getSlides = createAsyncThunk('slides/getSlides', async (_, { getState }) => {
  try {
    const result = await axiosConfig({
      method: 'get',
      url: SLIDE_URL,
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

export const addSlide = createAsyncThunk(
  'slides/addSlide',
  async (data:ProductModel, { dispatch }) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: SLIDE_URL,
        data: JSON.stringify({ productId: data._id }),
        successMessage: `محصول ${data.name} با موفقیت به لیست اسلاید ها اضافه شد`,
        headers: customHeaders({ authorization: true, contentType: true })
      });
      dispatch(editResultsSearchSlide(result))
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteSlide = createAsyncThunk(
  'slides/deleteSlide',
  async (data:ProductModel) => {
    try {
      const result = await axiosConfig({
        method: 'delete',
        url:  `${SLIDE_URL}/delete/${data._id}`,
        data: null,
        successMessage: `محصول ${data.name} با موفقیت از لیست اسلاید ها حذف شد`,
        headers: customHeaders({ authorization: true })
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
);
