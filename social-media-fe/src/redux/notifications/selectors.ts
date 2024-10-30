import { createSelector } from "@reduxjs/toolkit";

export const allNotiSeletor = createSelector(
  (state) => state.noti?.allNotifications,
  (allNotifications) => allNotifications,
);
