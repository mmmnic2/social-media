"use client";
import { Avatar, Card, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./component/StoryCircle";
import PostCard from "@/components/post/PostCard";
import CreatePost from "@/components/post/CreatePost";
import { useSelector } from "react-redux";
const arrUser = [1, 1, 1, 1, 1];

const MiddlePart = () => {
  const postSelector = useSelector((state: any) => state.post);
  return (
    <div className="w-full">
      {/* mỗi section là một component trong miđlepart */}
      <section className="w-full py-5 flex items-center rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar
            sx={{ width: "5rem", height: "5rem" }}
            // src="https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-dark-gray-simple-avatar-png-image_3418404.jpg"
          >
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {arrUser.map((user, index) => (
          <StoryCircle key={index} />
        ))}
      </section>
      {/* create-post */}
      <section className="w-full ">
        <CreatePost />
      </section>
      {/* Post here */}
      <section className="mt-5 space-y-5">
        {postSelector?.posts?.map((post: any) => (
          <PostCard key={post} post={post} />
        ))}
      </section>
    </div>
  );
};
export default MiddlePart;
