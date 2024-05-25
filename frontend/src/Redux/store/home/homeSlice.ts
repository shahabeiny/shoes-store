import { GetHeaderModel, GetMainInfoModel } from 'models/HomeModel';
import { apiSlice } from 'services/ApiSlice';
import { handleErrorRTK, transformResponse } from 'utilities/rtkHelpers';

const HOME_URL_BASE = `/api/home-router`;
const MAIN_URL = `${HOME_URL_BASE}/main`;
const HEADER_URL = `${HOME_URL_BASE}/header`;

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeader: builder.query<GetHeaderModel, void>({
      query: () => ({
        url: HEADER_URL
      }),
      transformResponse
    }),
    getMainInfo: builder.query<GetMainInfoModel, void>({
      query: () => ({
        url: MAIN_URL
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          handleErrorRTK(error, 'alert');
        }
      }
    })
  })
});

export const { useGetHeaderQuery, useGetMainInfoQuery } = extendedApiSlice;
