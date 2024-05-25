import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorModel, ProductModel, SizeModel } from 'models/ProductModels';
import {
  addColorKind,
  addSizeKind,
  editColorKind,
  getKinds,
  getShopKinds
} from './productKindsThunks';
import { ProductColorModel, ProductSizeModel } from 'models/ProductKindModel';

type GetKinds = {
  sizes: SizeModel[];
  colors: ColorModel[];
  product: ProductModel;
  productColors: ProductColorModel[];
};

type ProductKindsState = {
  loading: boolean;
  error: string | null;
  productColors: ProductColorModel[];
  product: ProductModel | null;
  colors: ColorModel[];
  isFavorite: boolean;
  rate: number;
  sizes: SizeModel[];
};

const initialState: ProductKindsState = {
  product: null,
  isFavorite: false,
  rate: 0,
  productColors: [],
  colors: [],
  sizes: [],
  error: null,
  loading: false
};

const slice = createSlice({
  name: 'ProductKinds',
  initialState,
  reducers: {
    editDetail: (state, action: PayloadAction<ProductSizeModel>) => {
      state.productColors.forEach((product) => {
        product?.productSizes?.forEach((info) => {
          if (info._id === action.payload._id) {
            info.size = action.payload.size;
            info.total = action.payload.total;
            info.eachCart = action.payload.eachCart;
            info.frozen = action.payload.frozen;
            info.sold = action.payload.sold;
            info.price = action.payload.price;
          }
        });
      });
    },
    editFavoriteToDetail: (state, action: PayloadAction<{ isFavorite: boolean }>) => {
      state.isFavorite = action.payload.isFavorite;
    },
    editRateToDetail: (state, action: PayloadAction<{ rate: number }>) => {
      state.rate = action.payload.rate;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKinds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getKinds.fulfilled, (state, action: PayloadAction<GetKinds>) => {
        state.loading = false;
        state.sizes = action.payload.sizes;
        state.colors = action.payload.colors;
        state.product = action.payload.product;
        state.productColors = action.payload.productColors;
      })
      .addCase(getKinds.rejected, (state, action) => {
        state.loading = false;
        state.sizes = [];
        state.colors = [];
        state.productColors = [];
        state.product = null;
        state.error = action.error.message || 'Error in get of datas';
      })
      .addCase(getShopKinds.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getShopKinds.fulfilled,
        (
          state,
          action: PayloadAction<{
            product: ProductModel;
            rate: number;
            isFavorite: boolean;
            productColors: ProductColorModel[];
          }>
        ) => {
          state.loading = false;
          state.isFavorite = action.payload.isFavorite;
          state.rate = action.payload.rate;
          state.product = action.payload.product;
          state.productColors = action.payload.productColors;
        }
      )
      .addCase(getShopKinds.rejected, (state, action) => {
        state.loading = false;
        state.productColors = [];
        state.product = null;
        state.error = action.error.message || 'Error in get of datas';
      })
      .addCase(addColorKind.fulfilled, (state, action: PayloadAction<ProductColorModel>) => {
        state.loading = false;
        state.productColors.push(action.payload);
      })

      .addCase(editColorKind.fulfilled, (state, action: PayloadAction<ProductColorModel>) => {
        state.loading = false;
        state.productColors.forEach((product) => {
          if (product._id === action.payload._id) {
            product.image = action.payload.image;
            product.color = action.payload.color;
          }
        });
      })

      .addCase(addSizeKind.fulfilled, (state, action: PayloadAction<ProductSizeModel>) => {
        state.loading = false;
        console.log(action.payload);
        state.productColors.forEach((product: ProductColorModel) => {
          if (product._id === action.payload.productColor) {
            product.productSizes.push(action.payload);
          }
        });
      });
  }
});

export const { editDetail, editFavoriteToDetail, editRateToDetail } = slice.actions;
export default slice.reducer;
