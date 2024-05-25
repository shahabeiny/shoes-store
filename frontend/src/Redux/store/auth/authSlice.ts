import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserModel from 'models/UserModel';
import { RoleModel } from 'models/RoleModel';
import { loginAsync, otpCheck, registerAsync } from './authThunks';

type UserState = {
  loading: boolean;
  error: string | null;
  roles: RoleModel[];
  users: UserModel[];
  userInfo: UserModel | null;
};

const initialState: UserState = {
  users: [],
  roles: [],
  userInfo: null,
  error: null,
  loading: false
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<UserModel>) => {
        state.error = null;
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.userInfo = null;
        state.loading = false;
        state.error = action.error.message || 'Error in get of datas';
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<UserModel>) => {
        state.error = null;
        state.userInfo = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.userInfo = null;
        state.error = action.error.message || 'Error in get of datas';
      })
      .addCase(otpCheck.fulfilled, (state, action: PayloadAction<UserModel>) => {
        state.error = null;
        state.userInfo = action.payload;
      })
      .addCase(otpCheck.rejected, (state, action) => {
        state.userInfo = null;
        state.error = action.error.message || 'Error in get of datas';
      });
  }
});

export default slice.reducer;
