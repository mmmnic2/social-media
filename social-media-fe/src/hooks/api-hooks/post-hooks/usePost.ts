import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getPostByUserId,
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  likePost,
  savePost,
} from "@/api/post";
export const useGetPostByUserId = (userId?: number | string) => {
  return useQuery({
    queryKey: ["post_user", userId],
    queryFn: () => getPostByUserId(userId),
    enabled: !!userId,
  });
};

export const useGetPostByPostId = (postId: number | string) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
  });
};
export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
  });
};

export const useGetAllPosts = (id?: number | string) => {
  return useQuery({
    queryKey: ["all_posts"],
    queryFn: getAllPost,
    enabled: !!!id,
  });
};

export const useDeletePost = () => {
  return useMutation({
    mutationFn: deletePost,
  });
};
export const useSavePost = () => {
  return useMutation({
    mutationFn: savePost,
  });
};
export const useLikePost = () => {
  return useMutation({
    mutationFn: likePost,
  });
};
