import React from "react";
import SocialAvatar from "@/components/common/avatar/SocialAvatar";

const CreatePostCard = () => {
  return (
    <form className="create-post flex gap-3 relative">
      <div className="absolute top-1/2 left-2 -translate-y-1/2">
        <SocialAvatar imgUrl="abc" alt="Lan Lan" />
      </div>
      <input
        type="text"
        placeholder="What do you think, Lan Lan?"
        id="create-post"
        className="w-full rounded-lg py-3 pr-3 pl-14"
      />
      <button
        type="submit"
        className="bg-accent-color rounded-lg py-2 px-6 text-white cursor-pointer hover:bg-secondary transition-all duration-500 absolute right-2 top-1/2 -translate-y-1/2"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePostCard;
