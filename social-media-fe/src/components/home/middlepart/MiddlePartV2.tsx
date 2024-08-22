"use client";
import React from "react";
import { useSelector } from "react-redux";
import PostCardV2 from "@/components/post/PostCardV2";
import CreatePostCard from "./component/CreatePostCard";
import Stories from "./component/Stories";
const arrUser = [1, 1, 1, 1, 1];

const MiddlePartV2 = () => {
  const postSelector = useSelector((state: any) => state.post);
  return (
    <React.Fragment>
      <Stories />
      <CreatePostCard />
      <div className="feeds">
        {arrUser.map((item, idx) => (
          <PostCardV2 key={idx} post={[]} />
        ))}
      </div>
    </React.Fragment>
  );
};
export default MiddlePartV2;
