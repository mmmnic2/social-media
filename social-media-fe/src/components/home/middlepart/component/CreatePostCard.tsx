import React from "react";

const CreatePostCard = () => {
  return (
    <form className="create-post">
      <div className="profile-photo">
        <img src="./image/image1.png" alt="" />
      </div>
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
