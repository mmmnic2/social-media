import { useMutation, useQuery } from "react-query";
import {
  createComment,
  handleLikeAndUnlikeComment,
  updateComment,
  getByPostId,
  getAllComments,
} from "@/api/comment";
import { setAllComments } from "@/redux/comment/comment";
import store from "@/redux/store";
export const useCreateComment = () => {
  return useMutation(createComment);
};

export const useUpdateComment = () => {
  return useMutation(updateComment);
};

export const useHandleLikeComment = () => {
  return useMutation(handleLikeAndUnlikeComment);
};

export const useGetCommentByPostId = (postId: number, showComment: boolean) => {
  return useQuery(["comment_post", postId], () => getByPostId(postId), {
    enabled: showComment,
  });
};
export const useGetAllComment = () => {
  return useQuery("all_comments", getAllComments, {
    staleTime: Infinity,
    onSuccess: (data) => {
      store.dispatch(setAllComments(data));
    },
  });
};
