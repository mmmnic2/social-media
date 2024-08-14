import { createSlice } from "@reduxjs/toolkit";
import { access } from "fs";
const initialState: {
  accessToken: null | string;
  refreshToken: null | string;
  expireTime: number | null;
} = {
  accessToken: null,
  refreshToken: null,
  expireTime: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, { payload }) {
      const { accessToken, refreshToken, expireTime } = payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expireTime = expireTime;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.expireTime = null;
    },
  },
});
export const { loginSuccess, logout } = auth.actions;
export default auth.reducer;
