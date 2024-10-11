import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

const postState = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllPost(state, { payload }) {
      state.posts = payload;
    },
    setPostSelected(state, { payload }) {
      state.postSelected = payload;
    },
    setRefetchAllPost(state, { payload }) {
      state.refetchAllPost = payload;
    },
    setRefetchPostByUser(state, { payload }) {
      state.refetchPostByUser = payload;
    },
    updateTotalLikes(state, { payload }) {
      state.posts = state.posts?.map((post: any) => {
        if (post.id === payload.postResponse?.id) {
          post.totalLikes = payload.delete
            ? post.totalLikes - 1
            : post.totalLikes + 1;
        }
        return post;
      });
    },
    increaseTotalComment(state, { payload }) {
      state.posts = state.posts?.map((post: any) => {
        if (post.id === payload.postResponse?.id) {
          post.totalComments += 1;
        }
        return post;
      });
    },
    setIsFetchAllPosts(state, { payload }) {
      state.isAllPostRefetch = payload;
    },
  },
});
const postStateReducer = postState.reducer;
export const {
  setAllPost,
  setPostSelected,
  setRefetchAllPost,
  setRefetchPostByUser,
  setIsFetchAllPosts,
} = postState.actions;
export default postStateReducer;
