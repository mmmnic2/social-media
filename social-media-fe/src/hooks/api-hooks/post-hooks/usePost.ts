import { useQuery, useMutation } from "react-query";
import {
  getPostByUserId,
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  likePost,
  savePost,
} from "@/api/post";
import { setAllPost, setRefetchAllPost } from "@/redux/post/post";
import store from "@/redux/store";
export const useGetPostByUserId = (userId: number | string) => {
  return useQuery(["post_user", userId], () => getPostByUserId(userId));
};

export const useGetPostByPostId = (postId: number | string) => {
  return useQuery(["post", postId], () => getPostById(postId));
};
export const useCreatePost = () => {
  return useMutation(createPost);
};

export const useGetAllPosts = () => {
  return useQuery("all_posts", getAllPost, {
    onSuccess: (data) => {
      store.dispatch(setAllPost(data));
    },
  });
};

export const useDeletePost = () => {
  return useMutation(deletePost);
};
export const useSavePost = () => {
  return useMutation(savePost);
};
export const useLikePost = () => {
  return useMutation(likePost);
};
