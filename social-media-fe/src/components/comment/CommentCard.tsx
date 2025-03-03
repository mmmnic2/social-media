"use client";
import React from "react";
import SocialAvatar from "../common/avatar/SocialAvatar";

const CommentCard = ({ comment }: { comment: any }) => {
  return (
    <div className="mx-3 space-y-2 my-5 text-sm">
      {/* <div className="flex justify-between items-center"> */}
      <div className="flex items-center space-x-5">
        <SocialAvatar
          imgUrl={comment?.userResponse.imageUrl || "abc"}
          alt={comment?.userResponse.firstName}
        />
        <div>
          <p className="font-bold">
            {comment?.userResponse.firstName +
              " " +
              comment?.userResponse.lastName}
          </p>
          <p>{comment?.content}</p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default CommentCard;
