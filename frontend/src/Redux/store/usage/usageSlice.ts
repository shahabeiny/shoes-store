import { UsageModel } from 'models/ProductModels';
import { apiSlice } from 'services/ApiSlice';
import customHeaders from 'services/CustomeHeader';
import {
  addItemToCache,
  handleErrorRTK,
  removeItemFromCache,
  transformResponse,
  updateItemInCache
} from 'utilities/rtkHelpers';

const USAGE_URL = `/api/usage-router/usage`;
const headers = customHeaders({ authorization: true, contentType: true });

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsages: builder.query<UsageModel[], void>({
      query: () => ({
        url: USAGE_URL,
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
    editUsage: builder.mutation<UsageModel, UsageModel>({
      query: (init: UsageModel) => ({
        url: USAGE_URL,
        method: 'put',
        body: init,
        
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getUsages', undefined, (draft) => {
              updateItemInCache(draft, data, `کاربرد ${arg.name} با موفقیت ویرایش شد`);
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    addUsage: builder.mutation<UsageModel, UsageModel>({
      query: (init: UsageModel) => ({
        url: USAGE_URL,
        method: 'post',
        body: init,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getUsages', undefined, (draft) => {
              addItemToCache(draft, data, `کاربرد ${arg.name} با موفقیت افزوده شد`);
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    deleteUsage: builder.mutation<string, UsageModel>({
      query: (init: UsageModel) => ({
        url: `${USAGE_URL}/${init._id ?? ''}`,
        method: 'delete',
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getUsages', undefined, (draft) => {
              removeItemFromCache(draft, data, `کاربرد ${arg.name} با موفقیت حذف شد`);
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
  useGetUsagesQuery,
  useAddUsageMutation,
  useEditUsageMutation,
  useDeleteUsageMutation
} = extendedApiSlice;
