"use client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import SocialAvatar from "@/components/common/avatar/SocialAvatar";
import { AppButton } from "@/components/common/button/AppButton";
import { useSnackbar } from "@/components/common/snackbar/Snackbar";
import { useCreatePost } from "@/hooks/api-hooks/post-hooks/usePost";
import { useAppStores } from "@/lib/context/AppStoreContext";
interface CreatePostCardProps {
  isLogin: boolean;
}

const CreatePostCard = ({ isLogin }: CreatePostCardProps) => {
  const [caption, setCaption] = useState("");
  const { showSnackbar } = useSnackbar();

  const { mutate: createPostCard } = useCreatePost();
  const { userStore } = useAppStores();

  const currentUser = userStore.getState().user;
  const queryClient = useQueryClient();

  const handleCreatePost = (e: any) => {
    e.preventDefault();
    createPostCard(
      { caption },
      {
        onSuccess: () => {
          showSnackbar("create post successfully!", "success");
          queryClient.invalidateQueries({
            queryKey: ["all_posts"],
            exact: true,
          });
        },
        onError: (error) => {
          showSnackbar(`create post error! ${error}`, "error");
        },
      },
    );
  };

  return (
    <form className="create-post flex gap-3 relative">
      <div className="absolute top-1/2 left-2 -translate-y-1/2">
        <SocialAvatar
          imgUrl={currentUser?.imageUrl || "/"}
          alt={currentUser?.firstName || "Lan Lan"}
        />
      </div>
      <input
        type="text"
        placeholder={`What do you think, ${currentUser?.firstName || "Lan Lan"}?`}
        id="create-post"
        className="w-full rounded-lg py-3 pr-3 pl-14"
        onChange={(e) => setCaption(e.target.value)}
      />
      <AppButton
        type="submit"
        className="bg-accent-color text-white py-2 px-6 transition-all duration-500 disabled:bg-gray disabled:cursor-not-allowed hover:bg-accent-color/50"
        disabled={!isLogin}
        onClick={(e) => handleCreatePost(e)}
      >
        Post
      </AppButton>
    </form>
  );
};

export default CreatePostCard;
