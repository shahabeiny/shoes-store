import axios, { AxiosResponse } from 'axios';
import { showToast } from '../utilities/tostifyalert';
import { showErrorSwal } from '../utilities/sweetalert';
import apiUrl from './apiUrl';
import { error } from 'console';
import { config } from 'process';

type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface AxiosConfigParams {
  method: RequestMethod;
  url: string;
  data?: any;
  successMessage?: string;
  headers?: Record<string, any>;
  kindShowError?: 'toast' | 'alert';
}

const handleSuccess = (successMessage: string): void => {
  successMessage && showToast(successMessage, 'success');
};

const handleFailure = (message: string, kindShowError: 'toast' | 'alert'): void => {
  if (kindShowError === 'toast') {
    showToast(message, 'error');
  } else showErrorSwal(message);
  throw new Error(message);
};

const axiosConfig = async ({
  method,
  url,
  data,
  successMessage = '',
  headers = {},
  kindShowError = 'toast'
}: AxiosConfigParams): Promise<any> => {
  try {
    const response: AxiosResponse =
      method === 'post' || method === 'put' || method === 'patch'
        ? await axios[method](url, data, { headers })
        : await axios[method](url, { headers });

    handleSuccess(successMessage);

    return response.data.data;
  } catch (error: any) {
    let message = error.response ? error.response.data.message : 'خطا در انجام درخواست';
    handleFailure(message, kindShowError);
  }
};

export const axiosCreate = axios.create({
  baseURL: apiUrl
});

export const axiosPrivate = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export const axiosResponseInterseptor = axiosPrivate.interceptors.response.eject(
  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config; // گرفتن درخواست قبلی
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        // فقط یکبار میخواهیم چک کند
        prevRequest.sent = true;
        // const newAccessToken = await refresh();   // گرفتن یک اکسس جدید
        // prevRequest.headers['Autorization'] = `Bearer ${newAccessToken}`
        return axiosPrivate(prevRequest); // دوباره درخواست قبلی که 403 شده بود رو میفرستیم
      }
      return Promise.reject(error); // درخواست اگر 403 نبود یا اینکه بعد از ارسال درخواست توکن جدید باز هم ارور داشتیم ارور رو برای کاربر ارسال کن
    }
  )
);

export const axiosRequestInterseptor = axiosPrivate.interceptors.request.eject(  
  axiosPrivate.interceptors.request.use(
    (config) => {   
      // چک میکند که آیا اولین درخواست این هدر رو دارد
      if(!config.headers['Autorization']){
        config.headers['Autorization']  = `Bearer `
      }
      return config;
    },(error)=>Promise.reject(error)
  )
)

export default axiosConfig;
