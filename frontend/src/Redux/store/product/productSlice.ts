import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsageModel, BrandModel, ProductModel } from 'models/ProductModels';
import { addProduct, editProduct, getProducts } from './productThunks';

type ProductState = {
  loading: boolean;
  error: string | null;
  products: ProductModel[];
  productId: string;
  brands: BrandModel[];
  usages: UsageModel[];
};

const initialState: ProductState = {
  products: [],
  productId: '',
  brands: [],
  usages: [],
  error: null,
  loading: false
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    editResultsSearchSlide: (state, action: PayloadAction<ProductModel>) => {
      state.products = state.products.filter(
        (product: ProductModel) => product._id !== action.payload._id
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProducts.fulfilled,
        (
          state,
          action: PayloadAction<{
            products: ProductModel[];
            brands: BrandModel[];
            usages: UsageModel[];
          }>
        ) => {
          state.loading = false;
          if (action.payload.brands || action.payload.usages) {
            state.brands = action.payload.brands;
            state.usages = action.payload.usages;
          }
          state.products = action.payload.products;
        }
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.brands = [];
        state.products = [];
        state.usages = [];
        state.error = action.error.message || 'Error in get of datas';
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<ProductModel>) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action: PayloadAction<ProductModel>) => {
        state.loading = false;
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? { ...product, ...updatedProduct } : product
        );
      });
  }
});

export const { editResultsSearchSlide } = slice.actions;
export default slice.reducer;
