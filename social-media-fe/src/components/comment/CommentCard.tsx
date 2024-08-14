"use client";
import { Avatar, Divider } from "@mui/material";
import React from "react";

const CommentCard = ({ comment }: { comment: any }) => {
  return (
    <div className="mx-3 space-y-2 my-5 text-sm">
      {/* <div className="flex justify-between items-center"> */}
      <div className="flex items-center space-x-5">
        <Avatar
          sx={{ height: "2.25rem", width: "2.25rem", fontSize: "0.8rem" }}
        ></Avatar>
        <div>
          <p className="font-semibold">
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
