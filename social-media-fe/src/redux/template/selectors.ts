import { createSelector } from "@reduxjs/toolkit";

export const selectResourceDialogProps = createSelector(
  (state) => state.discountCoupon.resourceDialogProps,
  (resourceDialogProps) => resourceDialogProps
);

export const allCouponsSelector = createSelector(
  (state) => state.discountCoupon.coupons,
  (coupons) => coupons
);

export const couponSelectedSelector = createSelector(
  (state) => state.discountCoupon.couponSelected,
  (couponSelected) => couponSelected
);

export const showDetailPage = createSelector(
  (state) => state.discountCoupon.isShowDetailPage,
  (showDetailPage) => showDetailPage
);

export const statusData = createSelector(
  (state) => state.discountCoupon.statusData,
  (statusData) => statusData
);
