import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductModel } from 'models/ProductModels';
import { deleteFavorite, getFavorites } from './favoriteThunks';

type ProductState = {
  loading: boolean;
  error: string | null;
  products: ProductModel[];
};

const initialState: ProductState = {
  products: [],
  error: null,
  loading: false
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    editListFavorite: (state, action: PayloadAction<{ idProduct: string }>) => {
      state.products = state.products.filter((product) => product._id !== action.payload.idProduct);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action: PayloadAction<ProductModel[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error in get of datas';
      })
  }
});

export const { editListFavorite } = slice.actions;

export default slice.reducer;
