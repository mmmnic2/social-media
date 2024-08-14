import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
const commentState = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setAllComments(state, { payload }) {
      state.comments = payload;
    },
    setCommentSelecteds(state, { payload }) {
      state.commentSelected = payload;
    },
    setRefetchAllComment(state, { payload }) {
      state.refetchAllComment = payload;
    },
    insertComment(state, { payload }) {
      state.comments = [...state.comments, payload];
    },
  },
});

const commentStateReducer = commentState.reducer;
export default commentStateReducer;
export const {
  insertComment,
  setAllComments,
  setCommentSelecteds,
  setRefetchAllComment,
} = commentState.actions;
