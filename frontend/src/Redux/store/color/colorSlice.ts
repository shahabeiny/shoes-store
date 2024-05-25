import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { ColorModel } from 'models/ProductModels';
import { apiSlice } from 'services/ApiSlice';
import customHeaders from 'services/CustomeHeader';
import {
  addItemToCache,
  handleErrorRTK,
  removeItemFromCache,
  transformResponse,
  updateItemInCache
} from 'utilities/rtkHelpers';

const COLOR_URL = `/api/color-router/color`;
const headers = customHeaders({ authorization: true, contentType: true });



export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColors: builder.query<ColorModel[], void>({
      query: () => ({
        url: COLOR_URL,
        headers: customHeaders({ authorization: true })
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data: colors } = await queryFulfilled;
        } catch (error) {
          handleErrorRTK(error, 'alert');
        }
      }
    }),
    editColor: builder.mutation<ColorModel, ColorModel>({
      query: (init:ColorModel) => ({
        url: COLOR_URL,
        method: 'put',
        body: init,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getColors', undefined, (draft) => {
              updateItemInCache(draft, data, `رنگ ${arg.name} با موفقیت ویرایش شد`);
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    addColor: builder.mutation<ColorModel, ColorModel>({
      query: (init: ColorModel) => ({
        url: COLOR_URL,
        method: 'post',
        body: init,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getColors', undefined, (draft) => {
              addItemToCache(draft, data, `رنگ ${arg.name} با موفقیت افزوده شد`);
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    deleteColor: builder.mutation<string, ColorModel>({
      query: (init: ColorModel) => ({
        url: `${COLOR_URL}/${init._id??''}`,
        method: 'delete',
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getColors', undefined, (draft) => {
              removeItemFromCache(draft, data,`رنگ ${arg.name} با موفقیت حذف شد`);
            })
          );
        } catch (error: any) {
          handleErrorRTK(error, 'toast');
        }
      }
    })
  })
});

export const {
  useGetColorsQuery,
  useEditColorMutation,
  useAddColorMutation,
  useDeleteColorMutation
} = extendedApiSlice;
