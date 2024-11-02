"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocialAvatar from "@/components/common/avatar/SocialAvatar";
import { AppButton } from "@/components/common/button/AppButton";
import { useSnackbar } from "@/components/common/snackbar/Snackbar";
import { useCreatePost } from "@/hooks/api-hooks/post-hooks/usePost";
import { setIsFetchAllPosts } from "@/redux/post/post";
import { UserProps } from "@/redux/user";

interface CreatePostCardProps {
  isLogin: boolean;
}

const CreatePostCard = ({ isLogin }: CreatePostCardProps) => {
  const [caption, setCaption] = useState("");
  const { showSnackbar } = useSnackbar();

  const { mutate: createPostCard } = useCreatePost();

  const currentUser = useSelector((state: UserProps) => state.user);
  const dispatch = useDispatch();

  const handleCreatePost = (e: any) => {
    e.preventDefault();
    createPostCard(
      { caption },
      {
        onSuccess: () => {
          showSnackbar("create post successfully!", "success");
          dispatch(setIsFetchAllPosts(true));
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
          imgUrl={currentUser.imageUrl || "/"}
          alt={currentUser.first_name || "Lan Lan"}
        />
      </div>
      <input
        type="text"
        placeholder={`What do you think, ${currentUser.first_name || "Lan Lan"}?`}
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
