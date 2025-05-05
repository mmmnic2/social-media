import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createComment,
  handleLikeAndUnlikeComment,
  updateComment,
  getByPostId,
  getAllComments,
} from "@/api/comment";
export const useCreateComment = () => {
  return useMutation({
    mutationFn: createComment,
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: updateComment,
  });
};

export const useHandleLikeComment = () => {
  return useMutation({
    mutationFn: handleLikeAndUnlikeComment,
  });
};

export const useGetCommentByPostId = (
  postId: number | null,
  showComment: boolean,
) => {
  return useQuery({
    queryKey: ["comment_post", postId],
    queryFn: () => getByPostId(postId),
    enabled: showComment && !!postId,
  });
};
export const useGetAllComment = () => {
  return useQuery({
    queryKey: ["all_comments"],
    queryFn: getAllComments,
    staleTime: Infinity,
  });
};
