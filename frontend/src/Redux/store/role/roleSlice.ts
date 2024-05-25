import { GetRolesModel, RoleModel, addRoleModel } from 'models/RoleModel';
import customHeaders from 'services/CustomeHeader';
import { apiSlice } from 'services/ApiSlice';
import {
  addItemToCache,
  handleErrorRTK,
  removeItemFromCache,
  transformResponse,
  updateItemInCache
} from 'utilities/rtkHelpers';

const ROLE_URL = `/api/role-router/role`;
const headers = customHeaders({ authorization: true, contentType: true });

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<GetRolesModel, void>({
      query: () => ({
        url: ROLE_URL,
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
    editRole: builder.mutation<RoleModel,  addRoleModel>({
      query: (init) => ({
        url: ROLE_URL,
        method: 'put',
        body: init,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getRoles', undefined, (draft) => {
              updateItemInCache(draft.roles, data, `نقش ${arg.name} با موفقیت ویرایش شد`);
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    addRole: builder.mutation<RoleModel, addRoleModel>({
      query: (init) => ({
        url: ROLE_URL,
        method: 'post',
        body: init,
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getRoles', undefined, (draft) => {
              addItemToCache(draft.roles, data, `نقش ${arg.name} با موفقیت افزوده شد`);
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    deleteRole: builder.mutation<string, RoleModel>({
      query: (init) => ({
        url: `${ROLE_URL}/${init._id ?? ''}`,
        method: 'delete',
        headers
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getRoles', undefined, (draft) => {
              removeItemFromCache(draft.roles, data, `نقش ${arg.name} با موفقیت حذف شد`);
            })
          );
        } catch (error: any) {
          handleErrorRTK(error, 'toast');
        }
      }
    })
  })
});

export const { useDeleteRoleMutation, useAddRoleMutation, useEditRoleMutation, useGetRolesQuery } =
  extendedApiSlice;
