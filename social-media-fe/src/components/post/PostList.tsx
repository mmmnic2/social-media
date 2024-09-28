"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetPostByUserId } from "@/hooks/api-hooks/post-hooks/usePost";
import { setAllPost, setRefetchPostByUser } from "@/redux/post/post";
import PostCardV2 from "./PostCardV2";

interface PostListProps {
  id: string | number;
  isLogin: boolean;
}

const arrUser = [1, 1, 1, 1, 1];

export const PostList = ({ id, isLogin }: PostListProps) => {
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(setRefetchPostByUser(refetchGetPostByUserId));
  }, [id]);
  useEffect(() => {
    if (postData) {
      dispatch(setAllPost(postData));
    }
  }, [postData]);
  const renderPosts = () => {
    if (postData?.length > 0) {
      return postData.map((item: any) => (
        <PostCardV2 key={item.id} post={[]} />
      ));
    } else if (!isLogin) {
      return arrUser.map((item, idx) => <PostCardV2 key={idx} post={[]} />);
    }
    return (
      <div className="bg-white rounded-md py-2 px-4">
        The user has not posted any articles yet!!!
      </div>
    );
  };
  return <>{renderPosts()}</>;
};
