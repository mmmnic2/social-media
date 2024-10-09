"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllPosts,
  useGetPostByUserId,
} from "@/hooks/api-hooks/post-hooks/usePost";
import {
  setAllPost,
  setIsFetchAllPosts,
  setRefetchPostByUser,
} from "@/redux/post/post";
import PostCard from "./PostCard";

interface PostListProps {
  id?: string | number;
  isLogin: boolean;
}

const arrUser = [1, 1, 1, 1, 1];

export const PostList = ({ id, isLogin }: PostListProps) => {
  const dispatch = useDispatch();
  const refetchAllPost = useSelector(
    (state: any) => state.post.isAllPostRefetch,
  );
  // hàm getPostByUserId
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
    dispatch(setRefetchPostByUser(refetchGetPostByUserId));
  }, [id]);
  useEffect(() => {
    if (postData) {
      dispatch(setAllPost(postData));
    }
  }, [postData]);
  useEffect(() => {
    if (refetchAllPost) {
      refecthAllPost();
    } else if (refetchAllPost && id) {
      refetchGetPostByUserId();
    }
    dispatch(setIsFetchAllPosts(false));
  }, [refetchAllPost]);

  const renderPosts = () => {
    if (postData?.length > 0 || (allPost && allPost?.length > 0)) {
      return (postData || allPost).map((item: any) => (
        <PostCard key={item.id} post={item} isLogin={isLogin} />
      ));
    } else if (!isLogin) {
      return arrUser.map((item, idx) => (
        <PostCard key={idx} post={[]} isLogin={isLogin} />
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
