import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

const discountCouponState = createSlice({
  name: "discountCouponState",
  initialState,
  reducers: {
    setDataStatusProps(state, { payload }) {
      console.log(payload);
      state.statusData = payload;
    },
    setResourceDialogProps(state, { payload }) {
      state.resourceDialogProps = { ...state.resourceDialogProps, ...payload };
    },
    closeResourceDialogProps(state) {
      state.resourceDialogProps = initialState.resourceDialogProps;
    },
    setIsShowCouponDetails(state) {
      state.isShowDetailPage = !state.isShowDetailPage;
    },
    setAllCoupons(state, { payload }) {
      state.coupons = payload;
    },
    setCouponSelected(state, { payload }) {
      state.couponSelected = payload;
    },
    resetCouponSelected(state) {
      state.couponSelected = initialState.couponSelected;
    },
  },
});

const discountCouponStateReducer = discountCouponState.reducer;

export const {
  setDataStatusProps,
  setResourceDialogProps,
  closeResourceDialogProps,
  setIsShowCouponDetails,
  setCouponSelected,
  setAllCoupons,
  resetCouponSelected,
} = discountCouponState.actions;

export default discountCouponStateReducer;
