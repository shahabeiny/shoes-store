import { createAsyncThunk } from '@reduxjs/toolkit';
import LoginModel from 'models/LoginModel';
import apiUrl from 'services/apiUrl';
import axiosConfig from 'services/AxiosConfig';
import customHeaders from 'services/CustomeHeader';

const AUTH_BASE_URL = apiUrl + '/api/auth-router';
const LOGIN_URL = `${AUTH_BASE_URL}/login`;
const REGISTER_URL = `${AUTH_BASE_URL}/register`;
const OTPVERIFY_URL = `${AUTH_BASE_URL}/otp-verify`;
const OTPRESTORE_URL = `${AUTH_BASE_URL}/otp-restore`;
const FORGET_URL = `${AUTH_BASE_URL}/forget`;
const CHANGE_PASS_URL = `${AUTH_BASE_URL}/change-pass`;

export const loginAsync = createAsyncThunk('auth/loginAsync', async (data: LoginModel) => {
  try {
    const result = await axiosConfig({
      method: 'post',
      url: LOGIN_URL,
      data: JSON.stringify(data),
      successMessage: '',
      headers: customHeaders({ contentType: true })
    });
    return result;
  } catch (error) {
    throw error;
  }
});

export const registerAsync = createAsyncThunk('auth/registerAsync', async (data: LoginModel) => {
  try {
    const result = await axiosConfig({
      method: 'post',
      url: REGISTER_URL,
      data: JSON.stringify(data),
      successMessage: '',
      headers: customHeaders({ contentType: true })
    });
    return result;
  } catch (error) {
    throw error;
  }
});

export const otpCheck = createAsyncThunk(
  'auth/otpCheck',
  async (data: { code: string; mobile: string }) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: OTPVERIFY_URL,
        data: JSON.stringify(data),
        successMessage: '',
        headers: customHeaders({ contentType: true })
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const otpRestore = createAsyncThunk(
  'auth/otpRestore',
  async (mobile: string ) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: OTPRESTORE_URL,
        data: JSON.stringify({mobile}),
        successMessage: '',
        headers: customHeaders({ contentType: true })
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const forget = createAsyncThunk(
  'auth/forget',
  async (mobile: string ) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: FORGET_URL,
        data: JSON.stringify({mobile}),
        successMessage: '',
        headers: customHeaders({ contentType: true })
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const changePass = createAsyncThunk(
  'auth/changePass',
  async (data:{mobile:string,password: string} ) => {
    try {
      const result = await axiosConfig({
        method: 'post',
        url: CHANGE_PASS_URL,
        data: JSON.stringify(data),
        successMessage: '',
        headers: customHeaders({ contentType: true })
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
);
