import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCreateComment } from "@/hooks/api-hooks/comment-hooks/useComment";
import { insertComment, setIsRefetchAllComment } from "@/redux/comment/comment";
import { setIsFetchAllPosts } from "@/redux/post/post";
import { UserProps } from "@/redux/user";
import SocialAvatar from "../common/avatar/SocialAvatar";
const CreateCommentCard = ({ post }: { post: any }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userInfo = useSelector((state: UserProps) => state.user);
  const { mutate: handleCreateComment } = useCreateComment();
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
        queryClient.invalidateQueries(["comment_post", post.id]);
        dispatch(setIsRefetchAllComment(true));
        dispatch(setIsFetchAllPosts(true));
      },
    });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex items-center space-x-5 mx-3 my-5">
          <SocialAvatar
            alt={userInfo?.first_name || "Lan Lan"}
            imgUrl={userInfo?.image || "abc"}
          />
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
    </>
  );
};

export default CreateCommentCard;
