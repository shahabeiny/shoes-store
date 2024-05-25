import { configureStore } from '@reduxjs/toolkit';
import authSlice from './store/auth/authSlice';




import orderSlice from './store/order/orderSlice';
import slideSlice from './store/slide/slideSlice';
import productSlice from './store/product/productSlice';
import favoriteSlice from './store/favorite/favoriteSlice';
import productKindSlice from './store/productKinds/ProductKindsSlice';
import { apiSlice } from 'services/ApiSlice';


const store = configureStore({
  reducer: {
    auth: authSlice,

    order: orderSlice,
    slides: slideSlice,

    products: productSlice,
    favorites: favoriteSlice,
    productKind: productKindSlice,
    [apiSlice.reducerPath]:apiSlice.reducer
  },middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(apiSlice.middleware)
});



export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
