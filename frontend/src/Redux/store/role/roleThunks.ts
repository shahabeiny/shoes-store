import { createAsyncThunk } from '@reduxjs/toolkit';
import { RoleModel, addRoleModel } from 'models/RoleModel';
import apiUrl from 'services/apiUrl';
import customHeaders from 'services/CustomeHeader';
import axiosConfig from 'services/AxiosConfig';

const ROLE_URL = `${apiUrl}/api/role-router/role`;

export const getRole = createAsyncThunk('roles/getRole', async (_, { getState }) => {
  try {
    const result = await axiosConfig({
      method: 'get',
      url: ROLE_URL,
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

export const addRole = createAsyncThunk('roles/addRole', async (data: addRoleModel) => {
  try {
    const result = await axiosConfig({
      method: 'post',
      url: ROLE_URL,
      data: JSON.stringify(data),
      successMessage: 'نقش جدید با موفقیت ثبت شد',
      headers: customHeaders({ authorization: true, contentType: true })
    });
    return result;
  } catch (error) {
    throw error;
  }
});

export const editRole = createAsyncThunk('roles/editRole', async (data: addRoleModel) => {
  try {
    const result = await axiosConfig({
      method: 'put',
      url: ROLE_URL,
      data: JSON.stringify(data),
      successMessage: `نقش ${data.name} با موفقیت ویرایش شد`,
      headers: customHeaders({ authorization: true, contentType: true })
    });
    return result;
  } catch (error) {
    throw error;
  }
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (data: RoleModel) => {
  try {
    const result = await axiosConfig({
      method: 'delete',
      data: null,
      url: `${ROLE_URL}/${data._id}`,
      successMessage: `نقش ${data.name} با موفقیت حذف شد`,
      headers: customHeaders({ authorization: true, contentType: true })
    });
    return result;
  } catch (error) {
    throw error;
  }
});
