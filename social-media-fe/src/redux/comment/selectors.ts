import { createSelector } from "@reduxjs/toolkit";
export const allCommentSelector = createSelector(
  (state) => state.comment?.comments,
  (comments) => comments,
);

export const commentSelectedSelector = createSelector(
  (state, postId) =>
    state.comment?.comments?.filter(
      (comment: any) => comment?.postResponse?.id === postId,
    ),
  (filteredComments) => filteredComments,
);

export const refetchAllCommentSelector = createSelector(
  (state) => state.comment?.refetchAllComment,
  (refetchAllComment) => refetchAllComment,
);
