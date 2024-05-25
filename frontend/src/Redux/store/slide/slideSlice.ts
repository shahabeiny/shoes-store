import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addSlide, deleteSlide, getSlides } from './slideThunks';
import { ProductModel } from 'models/ProductModels';

type ProductState = {
  SlideLoading: boolean;
  error: string | null;
  slides: ProductModel[];
};

const initialState: ProductState = {
  slides: [],
  error: null,
  SlideLoading: false
};

const slice = createSlice({
  name: 'slides',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSlides.pending, (state) => {
        state.SlideLoading = true;
      })
      .addCase(getSlides.fulfilled, (state, action: PayloadAction<ProductModel[]>) => {
        state.SlideLoading = false;
        state.slides = action.payload;
      })
      .addCase(getSlides.rejected, (state, action) => {
        state.SlideLoading = false;
        state.slides = [];
        state.error = action.error.message || 'Error in get of datas';
      })
      .addCase(addSlide.fulfilled, (state, action: PayloadAction<ProductModel>) => {
        state.SlideLoading = false;
        state.slides.unshift(action.payload);
      })
      .addCase(deleteSlide.fulfilled, (state, action: PayloadAction<{ _id: string }>) => {
        state.SlideLoading = false;
        state.slides = state.slides.filter((product) => product._id !== action.payload._id);
      });
  }
});

export default slice.reducer;
