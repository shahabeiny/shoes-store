import UserModel, { GetUsersModel, UserHistoryModel } from 'models/UserModel';
import { apiSlice } from 'services/ApiSlice';
import customHeaders from 'services/CustomeHeader';
import {
  handleErrorRTK,
  removeItemFromCache,
  transformResponse,
  updateItemInCache
} from 'utilities/rtkHelpers';
import { showToast } from 'utilities/tostifyalert';

const USER_BASE_URL = `/api/user-router/user`;
const EDIT_PROFILE_URL = `${USER_BASE_URL}/edit-profile`;
const LOGIN_USER_URL = `${USER_BASE_URL}/login-info`;
const headers = customHeaders({ authorization: true });

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersByParam: builder.query<GetUsersModel, string>({
      query: (init) => ({
        url: `${USER_BASE_URL}?${init}`,
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
    getLoginHistories: builder.query<UserHistoryModel[], void>({
      query: () => ({
        url: LOGIN_USER_URL,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    editUserByAdmin: builder.mutation<UserModel, { kindTab: string; init: FormData }>({
      query: (data) => ({
        url: USER_BASE_URL,
        method: 'put',
        body: data.init,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              'getUsersByParam',
              `activeTab=${arg.kindTab}`,
              (draft) => {
                updateItemInCache(
                  draft.users,
                  data,
                  `کاربر ${arg.init.get('name')} با موفقیت ویرایش شد`
                );
              }
            )
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    editPassByAdmin: builder.mutation<void, { mobile: string; password: string; username: string }>(
      {
        query: ({ password, mobile }) => ({
          url: USER_BASE_URL,
          method: 'post',
          body: { password, mobile },
          headers: customHeaders({ authorization: true, contentType: true })
        }),
        onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
          try {
            showToast(`رمز ${arg.username} با موفقیت تغییر یافت`, 'success');
          } catch (error) {
            handleErrorRTK(error, 'toast');
          }
        }
      }
    ),
    editProfuleByUser: builder.mutation<UserModel, FormData>({
      query: (init) => ({
        url: EDIT_PROFILE_URL,
        method: 'post',
        body: init,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          showToast(`اطلاعات شما با موفقیت ویرایش شد`, 'success');
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    bannByAdmin: builder.mutation<
      { _id: string; is_banned: boolean },
      { _id: string; is_banned: boolean; username: string; kindTab: string }
    >({
      query: ({ is_banned, _id }) => ({
        url: USER_BASE_URL,
        method: 'PATCH',
        body: { is_banned, _id },
        headers: customHeaders({ authorization: true, contentType: true })
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            extendedApiSlice.util.updateQueryData(
              'getUsersByParam',
              `activeTab=${arg.kindTab}`,
              (draft) => {
                removeItemFromCache(
                  draft.users,
                  data._id,
                  `${data.is_banned ? `حذف` : `بازیابی`} کاربر ${arg.username} با موفقیت انجام شد`
                );
              }
            )
          );
        } catch (error) {
          console.log(error);
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    deleteUser: builder.mutation<
      string,
      {
        _id: string;
        username: string;
        kindTab: string;
      }
    >({
      query: ({ _id }) => ({
        url: `${USER_BASE_URL}/${_id ?? ''}`,
        method: 'delete',
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              'getUsersByParam',
              `activeTab=${arg.kindTab}`,
              (draft) => {
                removeItemFromCache(draft.users, data, `کاربر ${arg.username} با موفقیت حذف شد`);
              }
            )
          );
        } catch (error: any) {
          handleErrorRTK(error, 'toast');
        }
      }
    })
  })
});

export const {
  useGetUsersByParamQuery,
  useLazyGetLoginHistoriesQuery,
  useEditUserByAdminMutation,
  useEditPassByAdminMutation,
  useBannByAdminMutation,
  useDeleteUserMutation,
  useEditProfuleByUserMutation
} = extendedApiSlice;
