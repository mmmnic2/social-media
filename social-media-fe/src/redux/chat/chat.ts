import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

const chatState = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setAllChats(state, { payload }) {
      state.allChats = payload;
    },
    setChatSelected(state, { payload }) {
      state.chatSelected = payload;
    },
    
  },
});

const chatStateReducer = chatState.reducer;
export default chatStateReducer;
export const { setAllChats, setChatSelected } = chatState.actions;
