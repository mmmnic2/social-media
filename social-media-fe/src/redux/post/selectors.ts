import { createSelector } from "@reduxjs/toolkit";
export const refetchAllPostSelector = createSelector(
  (state: any) => state.post?.refetchAllPost,
  (refetchAllPost) => refetchAllPost,
);
export const refetchPostByUserSelector = createSelector(
  (state: any) => state.post?.refetchPostByUser,
  (refetchPostByUser) => refetchPostByUser,
);
export const listUserLikePostSelector = createSelector(
  (state: any, postId: any) =>
    state.post?.posts?.find((post: any) => post.id === postId),
  (foundPost: any) => foundPost?.listUserLiked,
);
