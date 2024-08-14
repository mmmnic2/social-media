import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

const messageState = createSlice({
  name: "message",
  initialState,
  reducers: {
    setAllMessages(state, { payload }) {
      state.allMessage = payload;
    },
    addMessage(state, { payload }) {
      state.allMessage = [...state.allMessage, payload];
    },
  },
});

const messageStateReducer = messageState.reducer;
export default messageStateReducer;
export const { setAllMessages, addMessage } = messageState.actions;
