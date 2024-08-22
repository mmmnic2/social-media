import React from "react";
import SocialAvatar from "@/components/common/avatar/SocialAvatar";

const CreatePostCard = () => {
  return (
    <form className="create-post">
      <SocialAvatar imgUrl="abc" alt="Lan Lan" />
      <input
        type="text"
        placeholder="What do you think, Lan Lan?"
        id="create-post"
      />
      <input type="submit" value={"Post"} className="btn btn-primary" />
    </form>
  );
};

export default CreatePostCard;
