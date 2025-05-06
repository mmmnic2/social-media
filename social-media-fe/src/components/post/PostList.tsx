"use client";
import { useEffect } from "react";
import {
  useGetAllPosts,
  useGetPostByUserId,
} from "@/hooks/api-hooks/post-hooks/usePost";
import { useAppStores } from "@/lib/context/AppStoreContext";
import { createPostStore } from "@/lib/store/postStore";
import { Post } from "@/types/postTypes";
import PostCard from "./PostCard";

interface PostListProps {
  id?: string | number;
  isLogin: boolean;
}

const arrUser = [1, 1, 1, 1, 1];

export const PostList = ({ id, isLogin }: PostListProps) => {
  const { postsStore } = useAppStores();
  const isRefetchAllPosts = postsStore.getState().isPostsRefetch;
  const {
    data: postData,
    error: postError,
    isLoading: postLoading,
    isSuccess: getPostSuccess,
    refetch: refetchGetPostByUserId,
  }: {
    data: any;
    error: any;
    isLoading: boolean;
    isSuccess: boolean;
    refetch: () => void;
  } = useGetPostByUserId(id);
  const { data: allPost, refetch: refecthAllPost } = useGetAllPosts(id);
  useEffect(() => {
    if (id) {
      refetchGetPostByUserId();
    }
  }, [id]);
  useEffect(() => {
    if (postData) {
      postsStore.getState().setPosts(postData);
    }
  }, [postData]);
  useEffect(() => {
    if (isRefetchAllPosts) {
      refecthAllPost();
    } else if (isRefetchAllPosts && id) {
      refetchGetPostByUserId();
    }
    postsStore.getState().setIsPostsRefetch(false);
  }, [isRefetchAllPosts]);

  const renderPosts = () => {
    if (postData?.length > 0 || (allPost && allPost?.length > 0)) {
      return (postData || allPost).map((item: Post) => (
        <PostCard key={item.id} post={item} isLogin={isLogin} />
      ));
    } else if (!isLogin) {
      return arrUser.map((item, idx) => (
        <PostCard key={idx} isLogin={isLogin} />
      ));
    }
    return (
      <div className="bg-white rounded-md py-2 px-4">
        The user has not posted any articles yet!!!
      </div>
    );
  };
  return <>{renderPosts()}</>;
};
