import { Avatar, Backdrop, CircularProgress, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useCreateComment } from "@/hooks/api-hooks/comment-hooks/useComment";
import LoadingOverlay from "../common/loading/LoadingOverlay";
import { useSelector } from "react-redux";
import { refetchPostByUserSelector } from "@/redux/post/selectors";
import { useDispatch } from "react-redux";
import { insertComment } from "@/redux/comment/comment";
import { useQueryClient } from "react-query";
const CreateCommentCard = ({ post }: { post: any }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const refetchAllPostByUser = useSelector(refetchPostByUserSelector);
  const {
    mutate: handleCreateComment,
    isLoading,
    isError,
  } = useCreateComment();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let payload: { postId: number; postRequest: { content: string } } = {
      postId: post.id,
      postRequest: {
        content: comment,
      },
    };
    handleCreateComment(payload, {
      onSuccess: (data) => {
        dispatch(insertComment(data));
        setComment("");
        // queryClient.setQueryData("all_comments", (old: any) => [...old, data]);
        queryClient.invalidateQueries(["comment_post", post.id]);
        queryClient.invalidateQueries("all_posts");
        refetchAllPostByUser();
        // refetchAllComment(); "post_user", userId
      },
    });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex items-center space-x-5 mx-3 my-5">
          <Avatar />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            required
            className="w-full outline-none bg-transparent border
        border-[#3b4054] rounded-full px-5 py-2"
            placeholder="Write your comment"
          />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </div>
      </form>
      <LoadingOverlay isLoading={isLoading} />
    </>
  );
};

export default CreateCommentCard;
