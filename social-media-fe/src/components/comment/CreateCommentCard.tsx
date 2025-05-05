import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useCreateComment } from "@/hooks/api-hooks/comment-hooks/useComment";
import { useAppStores } from "@/lib/context/AppStoreContext";
import { createPostStore } from "@/lib/store/postStore";
import SocialAvatar from "../common/avatar/SocialAvatar";
const CreateCommentCard = ({ post }: { post: any }) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const { userStore } = useAppStores();
  const userInfo = userStore.getState().user;
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
        setComment("");
        queryClient.invalidateQueries({
          queryKey: ["comment_post", post.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["all_posts"],
          exact: true,
        });
      },
    });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex items-center space-x-5 mx-3 my-5">
          <SocialAvatar
            alt={userInfo?.firstName || "Lan Lan"}
            imgUrl={userInfo?.imageUrl || "abc"}
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
