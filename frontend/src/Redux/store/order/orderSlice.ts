import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import {
  confirmOrder,
  deleteProductCart,
  getOrders,
  getOrdersAdmin,
  muinesCart
} from './orderThunks';
import { AddCart, OrderInfoModel, OrderModel, OrderProductsModel } from 'models/OrderModel';
import { ProductSizeModel } from 'models/ProductKindModel';
import { apiSlice } from 'services/ApiSlice';
import customHeaders from 'services/CustomeHeader';
import {
  handleErrorRTK,
  removeItemFromCache,
  transformResponse,
  updateProductCount
} from 'utilities/rtkHelpers';
import { showToast } from 'utilities/tostifyalert';
import UserModel from 'models/UserModel';

const ORDER_BASE_URL = `/api/order-router/order`;
const ORDERS_BY_USER_URL = `${ORDER_BASE_URL}/all-orders`;
const ORDERs_BY_ADMIN_URL = `${ORDER_BASE_URL}/all-orders-admin`;
const ADD_CART_URL = `${ORDER_BASE_URL}/add-cart`;
const MUINES_CART_URL = `${ORDER_BASE_URL}/muines-cart`;
const DELETE_CART_URL = `${ORDER_BASE_URL}/delete-cart`;
const FINISH_CART_URL = `${ORDER_BASE_URL}/finish-cart`;
const CONFIRM_ORDER_URL = `${ORDER_BASE_URL}/confirm-order`;
const DELETE_PRODUCT_CART_URL = `${ORDER_BASE_URL}/delete-product`;

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByUser: builder.query<OrderModel[], string>({
      query: (init) => ({
        url: `${ORDERS_BY_USER_URL}?${init}`,
        headers: customHeaders({ authorization: true })
      }),
      transformResponse,
      providesTags: ['CART'],
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data: colors } = await queryFulfilled;
        } catch (error) {
          handleErrorRTK(error, 'alert');
        }
      },keepUnusedDataFor:10
    }),
    getOrdersByAdmin: builder.query<OrderModel[], string>({
      query: (init) => ({
        url: `${ORDERs_BY_ADMIN_URL}?${init}`,
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
    addToCart: builder.mutation<ProductSizeModel, { orderSlug: string; cartData: AddCart }>({
      query: ({ cartData }) => ({
        url: ADD_CART_URL,
        method: 'post',
        body: cartData,
        headers: customHeaders({ authorization: true, contentType: true })
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getOrdersByUser', arg.orderSlug, (draft) => {
              updateProductCount(draft, data, true);
              showToast('محصول مورد نظر با موفقیت به سبد خرید افزوده شد', 'success');
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    muinesFromCart: builder.mutation<
      ProductSizeModel,
      { orderSlug: string; cartData: { productSizeId: string; productOrderId: string } }
    >({
      query: ({ cartData }) => ({
        url: MUINES_CART_URL,
        method: 'PATCH',
        body: cartData,
        headers: customHeaders({ authorization: true, contentType: true })
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getOrdersByUser', arg.orderSlug, (draft) => {
              updateProductCount(draft, data, false);

              showToast('تعداد محصول با موفقیت کسر شد', 'success');
            })
          );
        } catch (error) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    deleteCart: builder.mutation<void, { orderSlug: string; OrderId: string }>({
      query: ({ OrderId }) => ({
        url: `${DELETE_CART_URL}/${OrderId}`,
        method: 'delete',
        headers: customHeaders({ authorization: true })
      }),
      transformResponse,
      onQueryStarted: async (arg, { dispatch }) => {
        try {
          dispatch(
            extendedApiSlice.util.updateQueryData('getOrdersByUser', arg.orderSlug, (draft) => {
              draft.length = 0;
              showToast('سبد خرید با موفقیت حذف شد', 'success');
            })
          );
        } catch (error: any) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    deleteProductCart: builder.mutation<
      ProductSizeModel,
      { orderSlug: string; productOrderId: string }
    >({
      query: ({ productOrderId }) => ({
        url: `${DELETE_PRODUCT_CART_URL}/${productOrderId}`,
        method: 'delete',
        headers: customHeaders({ authorization: true })
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getOrdersByUser', arg.orderSlug, (draft) => {
              draft.forEach((order) => {
                const index = order.products.findIndex(
                  (product) => product.productSize._id === data._id
                );
                if (index !== -1) {
                  order.products.splice(index, 1);
                  showToast('محصول با موفقیت از سبد خرید حذف شد', 'success');
                }
              });
            })
          );
        } catch (error: any) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    finishCart: builder.mutation<UserModel, { orderSlug: string; orderData: FormData }>({
      query: ({ orderData }) => ({
        url: FINISH_CART_URL,
        method: 'post',
        body: orderData,
        headers: customHeaders({ authorization: true })
      }),
      transformResponse,
      onQueryStarted: async (arg, { dispatch }) => {
        try {
          dispatch(
            extendedApiSlice.util.updateQueryData('getOrdersByUser', arg.orderSlug, (draft) => {
              draft.length = 0;
              showToast('سفارش شما با موفقیت نهایی شد', 'success');
            })
          );
        } catch (error: any) {
          handleErrorRTK(error, 'toast');
        }
      }
    }),
    confirmOrder: builder.mutation<
      OrderInfoModel,
      { orderSlug: string; orderData: { orderId: string; operate: boolean } }
    >({
      query: ({ orderData }) => ({
        url: CONFIRM_ORDER_URL,
        method: 'post',
        body: orderData,
        headers: customHeaders({ authorization: true })
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData('getOrdersByAdmin', arg.orderSlug, (draft) => {
              const index = draft.findIndex((order) => order.orderInfo._id === data._id);
              if (index !== -1) {
                draft.splice(index, 1);
                showToast(
                  `سفارش با موفقیت ${arg.orderData.operate ? 'تایید' : 'کنسل'} شد`,
                  'success'
                );
              }
            })
          );
        } catch (error: any) {
          handleErrorRTK(error, 'toast');
        }
      }
    })
  })
});

type SizeState = {
  loadingOrder: boolean;
  error: string | null;
  orders: OrderModel[];
};

const initialState: SizeState = {
  error: null,
  loadingOrder: false,
  orders: []
};

const slice = createSlice({
  name: 'orders', //Reducer اسم مجموعه
  initialState,
  reducers: {
    // Reducer مجموعه ای از
    //هستند Reducer  هر کدوم از توابع پایین یک
    // نام اکشن
    editCart: (state, action: PayloadAction<ProductSizeModel>) => {
      state.orders.forEach((order) =>
        order.products.forEach((product: OrderProductsModel) => {
          if (product.productSize._id === action.payload._id) {
            product.productSize = action.payload;
            product.count = +product.count + 1;
          }
        })
      );
    },
    deleteAllCart: (state, action) => {
      state.orders.length = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loadingOrder = true;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<OrderModel[]>) => {
        state.loadingOrder = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loadingOrder = false;
        state.orders = [];
        // state.error = action.error.message || 'Error in get of datas';
      })
      .addCase(getOrdersAdmin.pending, (state) => {
        state.loadingOrder = true;
      })
      .addCase(getOrdersAdmin.fulfilled, (state, action: PayloadAction<OrderModel[]>) => {
        state.loadingOrder = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersAdmin.rejected, (state, action) => {
        state.loadingOrder = false;
        state.orders = [];
        // state.error = action.error.message || 'Error in get of datas';
      })
      .addCase(confirmOrder.fulfilled, (state, action: PayloadAction<OrderInfoModel>) => {
        state.loadingOrder = false;
        state.orders = state.orders.filter((order) => order.orderInfo._id !== action.payload._id);
      })
      .addCase(muinesCart.fulfilled, (state, action: PayloadAction<ProductSizeModel>) => {
        state.loadingOrder = false;
        state.orders.forEach((order) =>
          order.products.forEach((product: OrderProductsModel) => {
            if (product.productSize._id === action.payload._id) {
              product.productSize = action.payload;
              product.count = +product.count - 1;
            }
          })
        );
      })
      .addCase(deleteProductCart.fulfilled, (state, action: PayloadAction<ProductSizeModel>) => {
        state.loadingOrder = false;
        state.orders = state.orders.map((order) => ({
          ...order,
          products: order.products.filter(
            (product: OrderProductsModel) => product.productSize._id !== action.payload._id
          )
        }));
      });
  }
});

export const { editCart, deleteAllCart } = slice.actions;
export default slice.reducer;

export const {
  useGetOrdersByUserQuery,
  useAddToCartMutation,
  useMuinesFromCartMutation,
  useDeleteProductCartMutation,
  useDeleteCartMutation,
  useFinishCartMutation,
  useGetOrdersByAdminQuery,
  useConfirmOrderMutation
} = extendedApiSlice;
