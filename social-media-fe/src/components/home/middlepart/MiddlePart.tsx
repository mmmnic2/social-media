import { cookies } from "next/headers";
import React from "react";
import { PostList } from "@/components/post/PostList";
import CreatePostCard from "./component/CreatePostCard";
import Stories from "./component/Stories";

const MiddlePart = async () => {
  const token = (await cookies()).get("sessionToken");
  return (
    <React.Fragment>
      <Stories />
      <div className="mt-4">
        <CreatePostCard isLogin={!!token} />
      </div>
      {/* <div className="feeds mt-4">
        {arrUser.map((item, idx) => (
          <PostCard key={idx} post={[]} />
        ))}
      </div> */}
      <div className="mt-4">
        <PostList isLogin={!!token} />
      </div>
    </React.Fragment>
  );
};
export default MiddlePart;
