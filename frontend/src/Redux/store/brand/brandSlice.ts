import { BrandModel } from 'models/ProductModels';
import { apiSlice } from 'services/ApiSlice';
import customHeaders from 'services/CustomeHeader';
import {
  addItemToCache,
  handleErrorRTK,
  removeItemFromCache,
  transformResponse,
  updateItemInCache
} from 'utilities/rtkHelpers';

const BRAND_URL = `/api/brand-router/brand`;
const headers = customHeaders({ authorization: true });

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<BrandModel[], void>({
      query: () => ({
        url: BRAND_URL,
        headers
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
    editBrand: builder.mutation<BrandModel, FormData>({
      query: (init: FormData) => ({
        url: BRAND_URL,
        method: 'put',
        body: init,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getBrands', undefined, (draft) => {
              updateItemInCache(draft, data, `برند ${arg.get('name')} با موفقیت ویرایش شد`);
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    addBrand: builder.mutation<BrandModel, FormData>({
      query: (init: FormData) => ({
        url: BRAND_URL,
        method: 'post',
        body: init,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getBrands', undefined, (draft) => {
              addItemToCache(draft, data, `برند ${arg.get('name')} با موفقیت افزوده شد`);
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    deleteBrand: builder.mutation<string, BrandModel>({
      query: (init: BrandModel) => ({
        url: `${BRAND_URL}/${init._id ?? ''}`,
        method: 'delete',
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getBrands', undefined, (draft) => {
              removeItemFromCache(draft, data, `برند ${arg.name} با موفقیت حذف شد`);
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
  useGetBrandsQuery,
  useAddBrandMutation,
  useEditBrandMutation,
  useDeleteBrandMutation
} = extendedApiSlice;
