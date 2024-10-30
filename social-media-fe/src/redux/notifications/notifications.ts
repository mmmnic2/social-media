import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

const notiState = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setAllNotifications(state, { payload }) {
      state.allNotifications = payload;
    },
  },
});

const notiStateReducer = notiState.reducer;
export default notiStateReducer;
export const { setAllNotifications } = notiState.actions;
