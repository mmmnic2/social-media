import React from "react";
import CommentCard from "./CommentCard";

interface CommentListProps {
  comments: any;
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div>
      {comments?.map((comment: any) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
