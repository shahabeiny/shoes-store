import {  SizeModel } from 'models/ProductModels';
import { apiSlice } from 'services/ApiSlice';
import customHeaders from 'services/CustomeHeader';
import {
  addItemToCache,
  handleErrorRTK,
  removeItemFromCache,
  transformResponse,
  updateItemInCache
} from 'utilities/rtkHelpers';

const SIZE_URL = `/api/size-router/size`;
const headers = customHeaders({ authorization: true, contentType: true });

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSizes: builder.query<SizeModel[], void>({
      query: () => ({
        url: SIZE_URL,
        headers: customHeaders({ authorization: true })
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          handleErrorRTK(error, 'alert');
        }
      }
    }),
    editSize: builder.mutation<SizeModel, SizeModel>({
      query: (init: SizeModel) => ({
        url: SIZE_URL,
        method: 'put',
        body: init,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getSizes', undefined, (draft) => {
              updateItemInCache(draft, data, `سایز ${arg.sizeNumber} با موفقیت ویرایش شد`);
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    addSize: builder.mutation<SizeModel, SizeModel>({
      query: (init: SizeModel) => ({
        url: SIZE_URL,
        method: 'post',
        body: init,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getSizes', undefined, (draft) => {
              addItemToCache(draft, data, `سایز ${arg.sizeNumber} با موفقیت افزوده شد`);
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    deleteSize: builder.mutation<string, SizeModel>({
      query: (init: SizeModel) => ({
        url: `${SIZE_URL}/${init._id ?? ''}`,
        method: 'delete',
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getSizes', undefined, (draft) => {
              removeItemFromCache(draft, data, `سایز ${arg.sizeNumber} با موفقیت حذف شد`);
            })
          );
        } catch (error: any) {
          handleErrorRTK(error, 'toast');
        }
      }
    })
  })
});

export const { useGetSizesQuery, useAddSizeMutation, useEditSizeMutation, useDeleteSizeMutation } =
  extendedApiSlice;
